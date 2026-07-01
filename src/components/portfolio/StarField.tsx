import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles({ count = 1800 }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 14;
      const a = Math.random() * Math.PI * 2;
      const b = (Math.random() - 0.5) * Math.PI;
      arr[i * 3] = Math.cos(a) * Math.cos(b) * r;
      arr[i * 3 + 1] = Math.sin(b) * r;
      arr[i * 3 + 2] = Math.sin(a) * Math.cos(b) * r;
    }
    return arr;
  }, [count]);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.03;
      ref.current.rotation.x += dt * 0.01;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#EFF4FF" transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

export function StarField() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 55 }} gl={{ antialias: true }}>
      <color attach="background" args={["#010828"]} />
      <fog attach="fog" args={["#010828", 6, 22]} />
      <Particles />
      <mesh position={[3, 0, -2]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="#6FFF00" transparent opacity={0.06} />
      </mesh>
      <mesh position={[-4, -1, -3]}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshBasicMaterial color="#A855F7" transparent opacity={0.05} />
      </mesh>
    </Canvas>
  );
}