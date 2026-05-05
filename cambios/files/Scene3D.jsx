"use client";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { Float, Points, PointMaterial, Line } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { shaderMaterial } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { Vector2 } from "three";

/* ═══════════════════════════════════════════════════════════
   SHADER DE ENERGÍA INTERNA DEL DIAMANTE
═══════════════════════════════════════════════════════════ */
const EnergyMaterial = shaderMaterial(
  { time: 0, intensity: 0 },
  /* vertex */
  `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  /* fragment */
  `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i+vec2(1,0)), f.x),
               mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
  }

  void main() {
    // Venas de energía animadas
    float vein1 = sin(vPosition.y * 8.0 + time * 3.0) * 0.5 + 0.5;
    float vein2 = sin(vPosition.x * 12.0 - time * 2.0) * 0.5 + 0.5;
    float vein3 = noise(vPosition.xy * 4.0 + time * 0.5);

    // Pulso de energía
    float pulse = sin(time * 2.0) * 0.5 + 0.5;
    float pulse2 = sin(time * 5.0 + vPosition.y * 3.0) * 0.5 + 0.5;

    // Fresnel (borde brillante)
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 3.0);

    // Color base cristal verde
    vec3 darkGreen = vec3(0.02, 0.15, 0.01);
    vec3 brightGreen = vec3(0.5, 1.0, 0.05);
    vec3 neonGreen = vec3(0.67, 1.0, 0.0);
    vec3 white = vec3(0.9, 1.0, 0.8);

    // Mezcla de colores
    vec3 col = mix(darkGreen, brightGreen, vein1 * 0.6);
    col = mix(col, neonGreen, vein2 * vein3 * 0.8);
    col += white * fresnel * 0.5;
    col += neonGreen * pulse2 * 0.3;

    // Brillo de energía en bordes
    float energyEdge = fresnel * (0.8 + pulse * 0.5);
    col += neonGreen * energyEdge * intensity;

    // Grietas luminosas internas
    float crack = step(0.85, noise(vPosition.xy * 15.0 + time * 0.2));
    col += neonGreen * crack * (0.4 + pulse * 0.6) * intensity;

    gl_FragColor = vec4(col, 0.92);
  }
  `
);

extend({ EnergyMaterial });

/* ═══════════════════════════════════════════════════════════
   DIAMANTE PRINCIPAL
═══════════════════════════════════════════════════════════ */
function Diamond({ phase }) {
  const meshRef = useRef();
  const matRef = useRef();
  const intensity = useRef(0);

  const targetIntensity = phase === "full" ? 1 : phase === "reveal" ? 0.5 : 0;

  useFrame(({ clock, mouse }) => {
    if (!meshRef.current || !matRef.current) return;
    const t = clock.getElapsedTime();

    // Fade in de intensidad
    intensity.current += (targetIntensity - intensity.current) * 0.03;
    matRef.current.uniforms.time.value = t;
    matRef.current.uniforms.intensity.value = intensity.current;

    // Respiración de escala
    const breathe = 1 + Math.sin(t * 1.8) * 0.03;
    meshRef.current.scale.setScalar(breathe);

    // Reacción al mouse
    meshRef.current.rotation.y = mouse.x * 0.8 + t * 0.12;
    meshRef.current.rotation.x = mouse.y * 0.5 + Math.sin(t * 0.5) * 0.1;
    meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.05;
  });

  return (
    <Float speed={1.5} floatIntensity={0.5} rotationIntensity={0.2}>
      <mesh ref={meshRef} position={[1.5, 0, 0]}>
        {/* Forma octaedro = diamante */}
        <octahedronGeometry args={[2.2, 0]} />
        <energyMaterial ref={matRef} transparent side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════════════
   SPIKES / CRISTALES SECUNDARIOS
═══════════════════════════════════════════════════════════ */
function CrystalSpikes({ phase }) {
  const spikes = useMemo(() => {
    const configs = [
      { pos: [1.5, -1.8, 0.3], scale: [0.25, 1.2, 0.25], rot: [0, 0, 0.15] },
      { pos: [0.3, -1.6, 0.2], scale: [0.2, 1.5, 0.2], rot: [0, 0, -0.25] },
      { pos: [2.7, -1.5, 0.1], scale: [0.2, 1.3, 0.2], rot: [0, 0, 0.3] },
      { pos: [-0.2, -1.4, 0], scale: [0.15, 1.0, 0.15], rot: [0, 0, -0.4] },
      { pos: [3.2, -1.2, 0], scale: [0.15, 0.9, 0.15], rot: [0, 0, 0.5] },
      { pos: [1.0, -1.9, -0.3], scale: [0.18, 1.1, 0.18], rot: [0.1, 0.2, 0.2] },
      { pos: [2.2, -1.7, -0.2], scale: [0.22, 1.4, 0.22], rot: [-0.1, 0.1, -0.1] },
    ];
    return configs;
  }, []);

  const refs = useRef([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    refs.current.forEach((r, i) => {
      if (!r) return;
      r.material.emissiveIntensity = (0.4 + Math.sin(t * 2 + i) * 0.3) * (phase === "full" ? 1 : 0);
    });
  });

  return (
    <>
      {spikes.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => (refs.current[i] = el)}
          position={s.pos}
          scale={s.scale}
          rotation={s.rot}
        >
          <coneGeometry args={[1, 2, 4]} />
          <meshStandardMaterial
            color="#1a4d00"
            emissive="#aaff00"
            emissiveIntensity={0}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   RAYOS ELÉCTRICOS
═══════════════════════════════════════════════════════════ */
function LightningBolt({ start, end, active }) {
  const [points, setPoints] = useState([]);

  const generateBolt = (s, e, depth = 0, maxDepth = 4) => {
    if (depth > maxDepth) return [s, e];
    const mid = [
      (s[0] + e[0]) / 2 + (Math.random() - 0.5) * (1.5 / (depth + 1)),
      (s[1] + e[1]) / 2 + (Math.random() - 0.5) * (1.5 / (depth + 1)),
      (s[2] + e[2]) / 2 + (Math.random() - 0.5) * (0.5 / (depth + 1)),
    ];
    return [
      ...generateBolt(s, mid, depth + 1, maxDepth),
      ...generateBolt(mid, e, depth + 1, maxDepth),
    ];
  };

  useFrame(({ clock }) => {
    if (!active) return;
    const t = clock.getElapsedTime();
    if (Math.floor(t * 8) % 3 === 0) {
      setPoints(generateBolt(start, end));
    }
  });

  if (!active || points.length < 2) return null;

  return (
    <Line
      points={points}
      color="#aaff00"
      lineWidth={1.5}
      transparent
      opacity={0.8}
    />
  );
}

function Lightnings({ phase }) {
  const active = phase === "full";
  const boltPairs = useMemo(
    () => [
      { start: [1.5, 2.5, 0], end: [1.5, -3.5, 0.5] },
      { start: [1.5, 2.2, 0], end: [3.5, -3, -0.3] },
      { start: [1.5, 2.0, 0], end: [-0.5, -3.2, 0.2] },
      { start: [1.5, 1.8, 0], end: [2.8, -2.8, 0.4] },
    ],
    []
  );

  return (
    <>
      {boltPairs.map((b, i) => (
        <LightningBolt key={i} {...b} active={active} />
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   PARTÍCULAS 3D
═══════════════════════════════════════════════════════════ */
function Particles3D({ phase }) {
  const count = 600;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      arr[i * 3] = 1.5 + r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 1;
    }
    return arr;
  }, []);

  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} limit={count}>
      <PointMaterial
        size={0.04}
        color="#aaff00"
        transparent
        opacity={phase === "full" ? 0.65 : 0}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

/* ═══════════════════════════════════════════════════════════
   LUCES DE LA ESCENA
═══════════════════════════════════════════════════════════ */
function Lights({ phase }) {
  const pLight = useRef();
  const pLight2 = useRef();

  useFrame(({ clock }) => {
    if (!pLight.current) return;
    const t = clock.getElapsedTime();
    const intensity = phase === "full" ? 8 + Math.sin(t * 2) * 3 : 0;
    pLight.current.intensity = intensity;
    if (pLight2.current) {
      pLight2.current.intensity = phase === "full" ? 4 + Math.sin(t * 1.5 + 1) * 2 : 0;
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} color="#001100" />
      <pointLight ref={pLight} position={[1.5, 2, 2]} color="#aaff00" intensity={0} castShadow />
      <pointLight ref={pLight2} position={[0, -2, 1]} color="#44ff00" intensity={0} />
      <pointLight position={[1.5, 0, 4]} color="#88ff00" intensity={2} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   CÁMARA CINEMATOGRÁFICA (reacciona al mouse)
═══════════════════════════════════════════════════════════ */
function CameraRig({ phase }) {
  const { camera, mouse } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Movimiento suave hacia el mouse
    camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.04;
    camera.position.y += (mouse.y * 1.0 - camera.position.y) * 0.04;

    // Leve movimiento orbital cinematográfico
    if (phase === "full") {
      camera.position.x += Math.sin(t * 0.15) * 0.003;
      camera.position.z = 7 + Math.sin(t * 0.2) * 0.3;
    }

    camera.lookAt(1.5, 0, 0);
  });

  return null;
}

/* ═══════════════════════════════════════════════════════════
   GROUND GLOW PLANE
═══════════════════════════════════════════════════════════ */
function GroundGlow({ phase }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.material.opacity = phase === "full" ? 0.3 + Math.sin(t * 1.5) * 0.1 : 0;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[1.5, -2.5, 0]}>
      <planeGeometry args={[8, 8]} />
      <meshBasicMaterial color="#aaff00" transparent opacity={0} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════
   ESCENA COMPLETA
═══════════════════════════════════════════════════════════ */
export default function Scene3D({ phase, mousePos }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <CameraRig phase={phase} />
      <Lights phase={phase} />

      <Diamond phase={phase} />
      <CrystalSpikes phase={phase} />
      <Lightnings phase={phase} />
      <Particles3D phase={phase} />
      <GroundGlow phase={phase} />

      {/* POSTPROCESADO - EL SECRETO DEL LOOK PREMIUM */}
      <EffectComposer>
        <Bloom
          intensity={phase === "full" ? 4.5 : phase === "reveal" ? 2 : 0}
          luminanceThreshold={0.05}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          offset={new Vector2(0.001, 0.001)}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </Canvas>
  );
}
