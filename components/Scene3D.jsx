"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Points, PointMaterial, Line, Text } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { Vector2 } from "three";

/* ═══════════════════════════════
   GOTAS DE CONDENSACIÓN (separado)
═══════════════════════════════ */
const DROP_CONFIGS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2 + i * 0.37;
  const y = -0.8 + (i / 12) * 1.6;
  return { angle, y };
});

function WaterDrops() {
  return (
    <>
      {DROP_CONFIGS.map((d, i) => (
        <mesh
          key={i}
          position={[Math.cos(d.angle) * 1.07, d.y, Math.sin(d.angle) * 1.07]}
          rotation={[0, -d.angle, 0]}
        >
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial
            color="#aaffaa"
            transparent
            opacity={0.45}
            metalness={0.1}
            roughness={0.2}
          />
        </mesh>
      ))}
    </>
  );
}

/* ═══════════════════════════════
   TARRO DE CREATINA 3D
═══════════════════════════════ */
function CreatineTub({ phase }) {
  const groupRef = useRef();
  const lidRef = useRef();
  const glowRef = useRef();
  const intensity = useRef(0);
  const targetIntensity = phase === "full" ? 1 : phase === "reveal" ? 0.5 : 0;

  const bodyMat  = useMemo(() => new THREE.MeshStandardMaterial({ color: "#0a0a0a", metalness: 0.6, roughness: 0.25 }), []);
  const labelMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#001a00", emissive: "#aaff00", emissiveIntensity: 0.4, metalness: 0.3, roughness: 0.5, transparent: true, opacity: 0.95 }), []);
  const lidMat   = useMemo(() => new THREE.MeshStandardMaterial({ color: "#111111", metalness: 0.8, roughness: 0.15 }), []);
  const rimMat   = useMemo(() => new THREE.MeshStandardMaterial({ color: "#223300", emissive: "#44ff00", emissiveIntensity: 0.6, metalness: 0.9, roughness: 0.1 }), []);
  const badgeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#aaff00", emissive: "#aaff00", emissiveIntensity: 0.5 }), []);
  const glowMat  = useMemo(() => new THREE.MeshBasicMaterial({ color: "#aaff00", transparent: true, opacity: 0, depthWrite: false }), []);

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    intensity.current += (targetIntensity - intensity.current) * 0.03;
    groupRef.current.rotation.y = mouse.x * 0.6 + t * 0.08;
    groupRef.current.rotation.x = mouse.y * 0.2 + Math.sin(t * 0.4) * 0.05;
    const breathe = 1 + Math.sin(t * 1.5) * 0.015;
    groupRef.current.scale.setScalar(breathe);
    if (glowRef.current) glowRef.current.material.opacity = (0.25 + Math.sin(t * 2) * 0.1) * intensity.current;
    if (lidRef.current) lidRef.current.position.y = 1.62 + Math.sin(t * 1.8) * 0.03;
    // Pulso emissivo de la etiqueta
    labelMat.emissiveIntensity = 0.3 + Math.sin(t * 2.5) * 0.15;
  });

  return (
    <Float speed={1.2} floatIntensity={0.4} rotationIntensity={0.1}>
      <group ref={groupRef} position={[1.8, 0.1, 0]}>
        {/* Cuerpo principal */}
        <mesh material={bodyMat} castShadow>
          <cylinderGeometry args={[1.05, 1.15, 3.0, 64, 1]} />
        </mesh>
        {/* Etiqueta */}
        <mesh material={labelMat} position={[0, -0.1, 0]}>
          <cylinderGeometry args={[1.066, 1.066, 2.2, 64, 1, true]} />
        </mesh>
        {/* Bordes metálicos */}
        <mesh material={rimMat} position={[0, 1.45, 0]}>
          <torusGeometry args={[1.06, 0.06, 16, 64]} />
        </mesh>
        <mesh material={rimMat} position={[0, -1.45, 0]}>
          <torusGeometry args={[1.12, 0.05, 16, 64]} />
        </mesh>
        {/* Base */}
        <mesh material={bodyMat} position={[0, -1.52, 0]}>
          <cylinderGeometry args={[1.15, 1.1, 0.1, 64]} />
        </mesh>
        {/* Tapa */}
        <mesh ref={lidRef} material={lidMat} position={[0, 1.62, 0]}>
          <cylinderGeometry args={[1.1, 1.06, 0.24, 64]} />
        </mesh>
        <mesh material={lidMat} position={[0, 1.75, 0]}>
          <cylinderGeometry args={[1.1, 1.1, 0.02, 64]} />
        </mesh>
        {/* Textos */}
        <Text position={[0, 0.58, 1.09]} fontSize={0.20} color="#ccff88" anchorX="center" anchorY="middle" maxWidth={2}>
          DIKLATONITE®
        </Text>
        <Text position={[0, 0.18, 1.09]} fontSize={0.40} color="#aaff00" anchorX="center" anchorY="middle" maxWidth={2.1}>
          KREATONITE
        </Text>
        <Text position={[0, -0.18, 1.09]} fontSize={0.10} color="#ccffaa" anchorX="center" anchorY="middle" maxWidth={2}>
          ENERGÍA LIMPIA · FOCO COGNITIVO · SISTEMA 3EN1
        </Text>
        <Text position={[0, -0.42, 1.09]} fontSize={0.095} color="#aaffaa" anchorX="center" anchorY="middle" maxWidth={2}>
          MAYOR FUERZA · FOCO MENTAL · RECUPERACIÓN
        </Text>
        {/* Badge verde */}
        <mesh material={badgeMat} position={[0, -0.80, 1.066]}>
          <planeGeometry args={[1.55, 0.20]} />
        </mesh>
        <Text position={[0, -0.80, 1.076]} fontSize={0.095} color="#000000" anchorX="center" anchorY="middle" maxWidth={1.6}>
          MEJOR VERSIÓN MÁS RÁPIDO
        </Text>
        {/* Gotas */}
        <WaterDrops />
        {/* Glow base */}
        <mesh ref={glowRef} material={glowMat} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.58, 0]}>
          <circleGeometry args={[2.4, 64]} />
        </mesh>
      </group>
    </Float>
  );
}

/* ═══════════════════════════════
   CRISTALES ORGÁNICOS
═══════════════════════════════ */
const CRYSTAL_CONFIGS = [
  { pos: [0.8,  -2.2, -0.5], h: 3.8, w: 0.18, rotZ: -0.08, rotX: 0.05,  ph: 0 },
  { pos: [1.4,  -2.4, -0.3], h: 4.5, w: 0.22, rotZ:  0.05, rotX: -0.04, ph: 1 },
  { pos: [2.0,  -2.3, -0.2], h: 5.2, w: 0.28, rotZ:  0.00, rotX:  0.00, ph: 2 },
  { pos: [2.6,  -2.2, -0.4], h: 4.0, w: 0.20, rotZ:  0.07, rotX:  0.03, ph: 3 },
  { pos: [3.1,  -2.4, -0.3], h: 3.2, w: 0.16, rotZ:  0.14, rotX: -0.02, ph: 4 },
  { pos: [0.3,  -2.6, -0.8], h: 2.5, w: 0.14, rotZ: -0.18, rotX:  0.10, ph: 5 },
  { pos: [3.6,  -2.6, -0.6], h: 2.0, w: 0.12, rotZ:  0.20, rotX: -0.08, ph: 6 },
  { pos: [1.1,  -2.8, -1.2], h: 3.0, w: 0.16, rotZ: -0.06, rotX:  0.00, ph: 7 },
  { pos: [2.4,  -2.8, -1.1], h: 2.8, w: 0.14, rotZ:  0.10, rotX:  0.00, ph: 8 },
  { pos: [0.6,  -2.9, -0.2], h: 1.2, w: 0.10, rotZ: -0.30, rotX:  0.15, ph: 9 },
  { pos: [3.3,  -2.9, -0.1], h: 1.4, w: 0.09, rotZ:  0.28, rotX: -0.10, ph: 10 },
  { pos: [1.7,  -3.0,  0.2], h: 1.0, w: 0.08, rotZ:  0.05, rotX:  0.00, ph: 11 },
];

function OrganicCrystals({ phase }) {
  const refs = useRef([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    refs.current.forEach((r, i) => {
      if (!r) return;
      const pulse = 0.3 + Math.sin(t * 1.8 + CRYSTAL_CONFIGS[i].ph * 0.7) * 0.25;
      r.material.emissiveIntensity = pulse * (phase === "full" ? 1 : phase === "reveal" ? 0.3 : 0);
    });
  });

  return (
    <>
      {CRYSTAL_CONFIGS.map((c, i) => (
        <mesh
          key={i}
          ref={el => (refs.current[i] = el)}
          position={c.pos}
          rotation={[c.rotX, 0, c.rotZ]}
        >
          <cylinderGeometry args={[0.01, c.w, c.h, 6, 1]} />
          <meshStandardMaterial
            color="#071a00"
            emissive="#aaff00"
            emissiveIntensity={0}
            metalness={0.7}
            roughness={0.15}
            transparent
            opacity={0.88}
          />
        </mesh>
      ))}
      {/* Glow elíptico base — circle escalado */}
      <group rotation={[-Math.PI / 2, 0, 0]} position={[1.8, -2.65, -0.3]} scale={[2.2, 1.2, 1]}>
        <mesh>
          <circleGeometry args={[1, 48]} />
          <meshBasicMaterial
            color="#aaff00"
            transparent
            opacity={phase === "full" ? 0.14 : 0}
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
}

/* ═══════════════════════════════
   RAYOS ELÉCTRICOS
═══════════════════════════════ */
function LightningBolt({ start, end, active }) {
  const [points, setPoints] = useState([]);

  const generateBolt = (s, e, depth = 0, maxDepth = 4) => {
    if (depth > maxDepth) return [s, e];
    const mid = [
      (s[0] + e[0]) / 2 + (Math.random() - 0.5) * (1.5 / (depth + 1)),
      (s[1] + e[1]) / 2 + (Math.random() - 0.5) * (1.5 / (depth + 1)),
      (s[2] + e[2]) / 2 + (Math.random() - 0.5) * (0.5 / (depth + 1)),
    ];
    return [...generateBolt(s, mid, depth + 1, maxDepth), ...generateBolt(mid, e, depth + 1, maxDepth)];
  };

  useFrame(({ clock }) => {
    if (!active) return;
    if (Math.floor(clock.getElapsedTime() * 8) % 3 === 0) setPoints(generateBolt(start, end));
  });

  if (!active || points.length < 2) return null;
  return <Line points={points} color="#aaff00" lineWidth={1.5} transparent opacity={0.75} />;
}

function Lightnings({ phase }) {
  const active = phase === "full";
  const boltPairs = useMemo(() => [
    { start: [1.8, 1.8, 0], end: [1.0, -2.8,  0.3] },
    { start: [1.8, 1.6, 0], end: [2.8, -2.6, -0.2] },
    { start: [1.8, 1.4, 0], end: [0.4, -2.4,  0.1] },
  ], []);
  return <>{boltPairs.map((b, i) => <LightningBolt key={i} {...b} active={active} />)}</>;
}

/* ═══════════════════════════════
   PARTÍCULAS 3D
═══════════════════════════════ */
function Particles3D({ phase }) {
  const count = 500;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      arr[i * 3]     = 1.8 + r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 1;
    }
    return arr;
  }, []);

  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.04;
  });

  return (
    <Points ref={ref} positions={positions} limit={count}>
      <PointMaterial
        size={0.04}
        color="#aaff00"
        transparent
        opacity={phase === "full" ? 0.6 : 0}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

/* ═══════════════════════════════
   LUCES
═══════════════════════════════ */
function Lights({ phase }) {
  const p1 = useRef();
  const p2 = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (p1.current) p1.current.intensity = phase === "full" ? 8 + Math.sin(t * 2) * 3 : 0;
    if (p2.current) p2.current.intensity = phase === "full" ? 5 + Math.sin(t * 1.5) * 2 : 0;
  });
  return (
    <>
      <ambientLight intensity={0.2} color="#001100" />
      <pointLight ref={p1} position={[1.8,  3, 2]} color="#aaff00" intensity={0} castShadow />
      <pointLight ref={p2} position={[0,   -2, 1]} color="#44ff00" intensity={0} />
      <pointLight          position={[1.8,  0, 4]} color="#88ff00" intensity={2.5} />
      <pointLight          position={[3.5,  1, 1]} color="#aaff00" intensity={1.5} />
    </>
  );
}

/* ═══════════════════════════════
   CÁMARA
═══════════════════════════════ */
function CameraRig({ phase }) {
  const { camera, mouse } = useThree();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.04;
    camera.position.y += (mouse.y * 0.8 - camera.position.y) * 0.04;
    if (phase === "full") camera.position.z = 7.5 + Math.sin(t * 0.2) * 0.3;
    camera.lookAt(1.8, 0, 0);
  });
  return null;
}

/* ═══════════════════════════════
   ESCENA COMPLETA
═══════════════════════════════ */
export default function Scene3D({ phase }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <CameraRig phase={phase} />
      <Lights phase={phase} />
      <CreatineTub phase={phase} />
      <OrganicCrystals phase={phase} />
      <Lightnings phase={phase} />
      <Particles3D phase={phase} />
      <EffectComposer>
        <Bloom
          intensity={phase === "full" ? 2.8 : phase === "reveal" ? 1.2 : 0}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
        <ChromaticAberration
          offset={new Vector2(0.0008, 0.0008)}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </Canvas>
  );
}
