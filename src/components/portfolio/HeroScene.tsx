import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, Environment } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;
  varying vec3 vNormal;
  varying vec3 vPos;
  varying float vDistort;

  // simplex noise (Ashima)
  vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
  vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
  vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1./6., 1./3.);
    const vec4 D = vec4(0., .5, 1., 2.);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0., i1.z, i2.z, 1.))
            + i.y + vec4(0., i1.y, i2.y, 1.))
            + i.x + vec4(0., i1.x, i2.x, 1.));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m*m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main(){
    vec3 p = position;
    float n = snoise(p * 1.4 + uTime * 0.35);
    float n2 = snoise(p * 3.0 - uTime * 0.2);
    float d = n * 0.32 + n2 * 0.08 + uHover * 0.18;
    vec3 newPos = p + normal * d;
    vDistort = d;
    vNormal = normalize(normalMatrix * normal);
    vPos = newPos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec3 vNormal;
  varying vec3 vPos;
  varying float vDistort;
  void main(){
    vec3 light = normalize(vec3(1.0, 1.0, 1.0));
    float diff = max(dot(vNormal, light), 0.0);
    float fres = pow(1.0 - max(dot(vNormal, vec3(0.,0.,1.)), 0.0), 2.5);
    vec3 base = mix(uColorA, uColorB, vDistort + 0.5);
    base = mix(base, uColorC, fres);
    base += diff * 0.4;
    base += fres * uColorC * 1.4;
    gl_FragColor = vec4(base, 1.0);
  }
`;

function Artifact() {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { mouse } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uColorA: { value: new THREE.Color("#0a1a4a") },
      uColorB: { value: new THREE.Color("#6FFF00") },
      uColorC: { value: new THREE.Color("#00B7FF") },
    }),
    [],
  );

  useFrame((state, dt) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value += dt;
      mat.current.uniforms.uMouse.value.set(mouse.x, mouse.y);
      mat.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        mat.current.uniforms.uHover.value,
        0.4 + Math.abs(mouse.x) * 0.5,
        0.05,
      );
    }
    if (mesh.current) {
      mesh.current.rotation.y += dt * 0.15;
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, mouse.y * 0.3, 0.04);
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.4, 64]} />
        <shaderMaterial
          ref={mat}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshBasicMaterial color="#6FFF00" wireframe transparent opacity={0.12} />
      </mesh>
    </Float>
  );
}

function OrbitalRing({ radius = 2.6, color = "#6FFF00", speed = 0.5, tilt = 0.4 }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * speed;
  });
  const points = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      arr.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
    }
    return arr;
  }, [radius]);
  const geom = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  return (
    <group ref={ref} rotation={[tilt, tilt * 0.7, 0]}>
      <line>
        <primitive object={geom} attach="geometry" />
        <lineBasicMaterial color={color} transparent opacity={0.55} />
      </line>
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 0.7 - camera.position.x) * 0.04;
    camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#010828"]} />
      <fog attach="fog" args={["#010828", 6, 14]} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#6FFF00" />
        <pointLight position={[-5, -3, 4]} intensity={1.2} color="#00B7FF" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#A855F7" />
        <Stars radius={50} depth={30} count={2500} factor={4} fade speed={1} />
        <Artifact />
        <OrbitalRing radius={2.4} color="#6FFF00" speed={0.4} tilt={0.5} />
        <OrbitalRing radius={2.9} color="#00B7FF" speed={-0.3} tilt={-0.6} />
        <OrbitalRing radius={3.3} color="#A855F7" speed={0.2} tilt={1.1} />
        <Environment preset="night" />
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}