import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

/* ─── Shader for AI Core Orb ────────────────────────────────────────── */
const coreVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uNoiseFreq;
  uniform float uNoiseAmp;
  uniform float uDeformSpeed;
  varying vec3 vNormal;
  varying vec3 vPos;
  varying float vNoise;

  // Simplex Noise 3D
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    float noise = snoise(position * uNoiseFreq + uTime * uDeformSpeed);
    vNoise = noise;
    vec3 newPosition = position + normal * noise * uNoiseAmp;
    vPos = newPosition;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const coreFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uProximityGlow;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vNormal;
  varying vec3 vPos;
  varying float vNoise;

  void main() {
    vec3 lightDir = normalize(vec3(1.0, 1.0, 2.0));
    float diff = max(dot(vNormal, lightDir), 0.0);

    // Fresnel glow
    vec3 viewDir = normalize(-vPos);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);

    // Highly intense green-to-blue mix
    vec3 baseColor = mix(uColorA, uColorB, vNoise * 0.5 + 0.5);
    vec3 finalColor = baseColor + (fresnel * uColorB * (5.5 + uProximityGlow * 12.0));

    // Specular reflections for metallic look
    vec3 reflectDir = reflect(-lightDir, vNormal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    finalColor += vec3(0.0, 0.71, 1.0) * spec * 3.5;

    gl_FragColor = vec4(finalColor, 0.95);
  }
`;

/* ─── AICore centerpiece component ──────────────────────────────────── */
function AICore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse } = useThree();
  const [hovered, setHovered] = useState(false);
  const smoothMouse = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNoiseFreq: { value: 1.2 },
      uNoiseAmp: { value: 0.25 }, // Higher surface deformation
      uDeformSpeed: { value: 1.2 },
      uProximityGlow: { value: 0 },
      uColorA: { value: new THREE.Color("#010828") },
      uColorB: { value: new THREE.Color("#6FFF00") }, // Neon Green
    }),
    []
  );

  useFrame((state, dt) => {
    const time = state.clock.getElapsedTime();

    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mouse.x, 0.05);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mouse.y, 0.05);

    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = time;
      const dist = mouse.length();
      const prox = Math.max(0, 1.5 - dist * 1.0);
      shaderRef.current.uniforms.uProximityGlow.value = THREE.MathUtils.lerp(
        shaderRef.current.uniforms.uProximityGlow.value,
        prox + (hovered ? 1.5 : 0),
        0.05
      );
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.25 + smoothMouse.current.x * 1.0;
      meshRef.current.rotation.x = time * 0.12 + smoothMouse.current.y * -1.0;
      meshRef.current.rotation.z = time * 0.08;
      meshRef.current.position.y = Math.sin(time * 1.2) * 0.25;
    }
  });

  return (
    <group>
      {/* Large 3D Core Orb (Radius 2.6 for huge visual presence) */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[2.5, 64]} />
        <shaderMaterial
          ref={shaderRef}
          uniforms={uniforms}
          vertexShader={coreVertexShader}
          fragmentShader={coreFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Cyberpunk Outer Wireframe Ring */}
      <Float speed={3} rotationIntensity={1.2} floatIntensity={0.8}>
        <mesh>
          <sphereGeometry args={[3.2, 14, 14]} />
          <meshBasicMaterial color="#00B7FF" wireframe transparent opacity={0.35} />
        </mesh>
      </Float>
    </group>
  );
}

/* ─── Neural Network Node System ─────────────────────────────────────── */
function NeuralNetwork() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const { mouse } = useThree();

  const count = 55; // Increased node density
  const { positions, linesGeom } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 3.2 + Math.random() * 2.2;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }

    const lines = new THREE.BufferGeometry();
    return { positions: pos, linesGeom: lines };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const linePositions: number[] = [];

    for (let i = 0; i < count; i++) {
      const waveX = Math.sin(time * 0.5 + i) * 0.005;
      const waveY = Math.cos(time * 0.6 + i) * 0.005;
      const waveZ = Math.sin(time * 0.7 + i) * 0.005;

      positions[i * 3] += waveX;
      positions[i * 3 + 1] += waveY;
      positions[i * 3 + 2] += waveZ;

      const dx = positions[i * 3] - mouse.x * 5;
      const dy = positions[i * 3 + 1] - mouse.y * 5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2.0) {
        const force = (2.0 - dist) * 0.04;
        positions[i * 3] += (dx / dist) * force;
        positions[i * 3 + 1] += (dy / dist) * force;
      }

      for (let j = i + 1; j < count; j++) {
        const p1x = positions[i * 3];
        const p1y = positions[i * 3 + 1];
        const p1z = positions[i * 3 + 2];
        const p2x = positions[j * 3];
        const p2y = positions[j * 3 + 1];
        const p2z = positions[j * 3 + 2];

        const d = Math.sqrt((p1x - p2x) ** 2 + (p1y - p2y) ** 2 + (p1z - p2z) ** 2);
        if (d < 2.8) {
          linePositions.push(p1x, p1y, p1z, p2x, p2y, p2z);
        }
      }
    }

    if (lineRef.current) {
      linesGeom.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
      linesGeom.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <lineSegments ref={lineRef} geometry={linesGeom}>
        <lineBasicMaterial color="#6FFF00" transparent opacity={0.5} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00B7FF"
          size={0.12} // Visually prominent nodes
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* ─── Massive Particle Field ─────────────────────────────────────────── */
function EnergyParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const count = 350; // Massively increased particle density
  const [positions, speeds, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3.0 + Math.random() * 4.5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;

      sp[i] = 0.4 + Math.random() * 0.6;
      ph[i] = Math.random() * 100;
    }
    return [pos, sp, ph];
  }, []);

  useFrame((state, dt) => {
    const time = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const angle = (time * speeds[i] * 0.15) + phases[i];
      const radius = Math.sqrt(positions[i * 3] ** 2 + positions[i * 3 + 1] ** 2);
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] += Math.sin(time + phases[i]) * 0.005;

      const dx = positions[i * 3] - mouse.x * 6;
      const dy = positions[i * 3 + 1] - mouse.y * 6;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 1.8) {
        const force = (1.8 - d) * 0.04;
        positions[i * 3] += (dx / d) * force;
        positions[i * 3 + 1] += (dy / d) * force;
      }
    }
    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#6FFF00"
        size={0.095} // Large visible particles
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── Expanding Energy Pulses ─────────────────────────────────────────── */
function EnergyPulseWave({ delay = 0, color = "#6FFF00" }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.RingMaterial>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const cycle = (elapsed + delay) % 3;
    const scale = cycle * 4.2; // Massive expansion diameter
    const opacity = Math.max(0, 1 - (cycle / 3.0)) * 0.75; // Highly visible glow

    if (meshRef.current) {
      meshRef.current.scale.set(scale, scale, 1);
    }
    if (matRef.current) {
      matRef.current.opacity = opacity;
    }
  });

  return (
    <mesh ref={meshRef}>
      <ringGeometry args={[1.5, 1.55, 64]} />
      <meshBasicMaterial
        ref={matRef}
        color={color}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ─── Ambient Geometry ─────────────────────────────────────────────────── */
function FloatingShapes() {
  const shapes = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      scale: 0.3 + Math.random() * 0.35,
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
      ] as [number, number, number],
      speed: 0.5 + Math.random() * 0.8,
      type: i % 2 === 0 ? "cube" : "tetra",
    }));
  }, []);

  return (
    <group>
      {shapes.map((s, idx) => (
        <Float key={idx} speed={s.speed} floatIntensity={2.0} floatingRange={[-0.6, 0.6]}>
          <mesh position={s.position} scale={s.scale}>
            {s.type === "cube" ? (
              <boxGeometry args={[1, 1, 1]} />
            ) : (
              <tetrahedronGeometry args={[1]} />
            )}
            <meshBasicMaterial color="#00B7FF" wireframe transparent opacity={0.35} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ─── Camera Interactive Rig ─────────────────────────────────────────── */
function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 1.0 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 0.8 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ─── Main 3D ContactScene Container ────────────────────────────────── */
export default function ContactScene() {
  // Floating HTML code fragments (Rendered outside Canvas to prevent Suspension)
  const fragments = ["</>", "AI", "{ }", "const", "neural", "010101", "API", "React", "Python", "ML"];
  const [elements, setElements] = useState<{ id: number; text: string; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    const list = fragments.map((f, i) => ({
      id: i,
      text: f,
      x: 10 + Math.random() * 70, // Horizontal distribution percentage
      y: 20 + Math.random() * 60, // Vertical distribution percentage
      delay: Math.random() * 5,
    }));
    setElements(list);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Cybersecurity Scanning Line */}
      <div className="absolute inset-y-0 left-0 w-full pointer-events-none z-10 overflow-hidden">
        <div className="scanner-line" />
      </div>

      {/* Floating HTML Code elements */}
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute font-mono text-xs text-[#EFF4FF] opacity-15 pointer-events-none select-none select-text"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            animation: `floatUp 10s linear infinite`,
            animationDelay: `${el.delay}s`,
            textShadow: "0 0 10px rgba(111,255,0,0.5)",
          }}
        >
          {el.text}
        </div>
      ))}

      {/* WebGL Canvas */}
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <color attach="background" args={["#010828"]} />
        <fog attach="fog" args={["#010828", 6, 16]} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[4, 4, 4]} intensity={3.5} color="#6FFF00" />
          <pointLight position={[-4, -4, 4]} intensity={2.5} color="#00B7FF" />
          
          <AICore />
          <NeuralNetwork />
          <EnergyParticles />
          <FloatingShapes />

          {/* Pulse waves */}
          <EnergyPulseWave delay={0} color="#6FFF00" />
          <EnergyPulseWave delay={1.0} color="#00B7FF" />
          <EnergyPulseWave delay={2.0} color="#6FFF00" />

          <Stars radius={60} depth={20} count={950} factor={3} fade speed={1.2} />
          
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
}
