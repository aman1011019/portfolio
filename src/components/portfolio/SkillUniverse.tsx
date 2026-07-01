import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

const SKILLS = [
  // Languages
  { name: "Python", color: "#FFD43B" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "Java", color: "#E76F00" },
  // ML / AI
  { name: "Gemini API", color: "#6FFF00" },
  { name: "OCR Pipelines", color: "#A855F7" },
  { name: "Prompt Eng.", color: "#00B7FF" },
  { name: "Conv. AI", color: "#FF6B9D" },
  // Frontend
  { name: "React", color: "#61DAFB" },
  { name: "Tailwind CSS", color: "#38BDF8" },
  { name: "HTML/CSS", color: "#E34F26" },
  // Backend
  { name: "Flask", color: "#EFF4FF" },
  { name: "REST APIs", color: "#8CC84B" },
  // Databases
  { name: "MongoDB", color: "#47A248" },
  { name: "Firebase", color: "#FFCA28" },
  // Tools
  { name: "Git/GitHub", color: "#F05032" },
  { name: "Figma", color: "#F24E1E" },
  // CS Core
  { name: "DSA", color: "#A855F7" },
  { name: "OOP", color: "#00B7FF" },
];

function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.4;
      ref.current.rotation.x += dt * 0.15;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.9, 2]} />
      <meshStandardMaterial
        color="#6FFF00"
        emissive="#6FFF00"
        emissiveIntensity={0.6}
        wireframe
      />
    </mesh>
  );
}

function Planet({
  index,
  total,
  skill,
  onHover,
}: {
  index: number;
  total: number;
  skill: { name: string; color: string };
  onHover: (n: string | null) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const radius = 2.2 + (index % 4) * 0.55;
  const speed = 0.12 + (index % 5) * 0.04;
  const offset = (index / total) * Math.PI * 2;
  const tilt = (index / total) * Math.PI;
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    group.current.position.x = Math.cos(t) * radius;
    group.current.position.z = Math.sin(t) * radius;
    group.current.position.y = Math.sin(t * 1.3 + tilt) * 0.6;
  });
  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1} floatIntensity={0.8}>
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            onHover(skill.name);
          }}
          onPointerOut={() => {
            setHovered(false);
            onHover(null);
          }}
          scale={hovered ? 1.6 : 1}
        >
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={hovered ? 1.4 : 0.6}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function SkillUniverse() {
  const [active, setActive] = useState<string | null>(null);
  const stars = useMemo(() => {
    const arr = new Float32Array(900 * 3);
    for (let i = 0; i < 900; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return arr;
  }, []);
  return (
    <div className="relative h-[560px] w-full">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.5, 6], fov: 55 }}>
        <color attach="background" args={["#010828"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={3} color="#6FFF00" />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#00B7FF" />
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[stars, 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.03} color="#EFF4FF" transparent opacity={0.6} />
        </points>
        <Core />
        {SKILLS.map((s, i) => (
          <Planet key={s.name} index={i} total={SKILLS.length} skill={s} onHover={setActive} />
        ))}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="liquid-glass rounded-full px-6 py-2 font-display text-sm tracking-[0.4em] text-[#EFF4FF]">
          {active ?? "SKILL · CORE"}
        </div>
      </div>
    </div>
  );
}