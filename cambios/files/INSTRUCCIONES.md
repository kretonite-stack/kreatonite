# 🔥 KREATONITE — MODO DIOS: Guía de Integración

## 📁 Archivos que debes copiar a tu proyecto

```
Hero.jsx    →  components/Hero.jsx
Scene3D.jsx →  components/Scene3D.jsx
```

---

## 📦 Instalar dependencias (OBLIGATORIO)

En la raíz de tu proyecto Next.js:

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing postprocessing
```

---

## 🔧 Configuración Next.js

Agrega esto a tu `next.config.js` (requerido para Three.js):

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  webpack: (config) => {
    config.externals = [...(config.externals || [])];
    return config;
  },
};

module.exports = nextConfig;
```

---

## 📄 Uso en tu página principal

En tu `app/page.jsx` o `pages/index.jsx`:

```jsx
import dynamic from "next/dynamic";

// CRÍTICO: Three.js no funciona en SSR → usar dynamic import
const Hero = dynamic(() => import("../components/Hero"), { ssr: false });

export default function Home() {
  return (
    <main>
      <Hero />
      {/* resto de tu página */}
    </main>
  );
}
```

---

## 🚀 Por qué `dynamic` con `ssr: false`

Three.js usa APIs del navegador (`window`, `WebGL`).
En Next.js, los componentes se renderizan en el servidor primero.
Sin `ssr: false` → crash en build/deploy de Vercel.

---

## ⚡ Qué incluye el modo dios

| Feature | Técnica |
|---|---|
| Flash de entrada cinemática | Estado React + transición CSS |
| Diamante 3D con energía | Shader GLSL custom (EnergyMaterial) |
| Grietas luminosas internas | Fragment shader con noise + step |
| Fresnel (bordes brillantes) | Cálculo dot(normal, viewDir) en shader |
| Respiración del diamante | scale.setScalar + sin(time) |
| Reacción al mouse | rotation.y/x = mouse.x/y |
| Rayos eléctricos | Line de drei con puntos aleatorios |
| Partículas orbitales | Points + PointMaterial |
| Cámara cinematográfica | CameraRig con lerp al mouse |
| Glow/Bloom profesional | @react-three/postprocessing Bloom |
| Aberración cromática | ChromaticAberration effect |
| Entrada staggered de texto | CSS transitions con delay escalonado |

---

## 🎨 Personalización rápida

### Cambiar color principal (verde → otro):
En `Scene3D.jsx` busca `#aaff00` y reemplaza.
En `Hero.jsx` busca `#aaff00` y reemplaza.

### Ajustar intensidad del Bloom:
```jsx
// En Scene3D.jsx, línea del Bloom:
<Bloom intensity={4.5} />  // ← sube/baja este número
```

### Velocidad de respiración del diamante:
```js
// En Scene3D.jsx, función Diamond:
const breathe = 1 + Math.sin(t * 1.8) * 0.03;
//                          ^^^          ^^^^
//                    velocidad    magnitud
```

---

## ⚠️ Rendimiento

- El hero con Three.js usa GPU → solo úsalo en el hero (ya lo estás haciendo bien)
- En móvil, considera reducir el count de partículas de 600 → 200
- Bloom intensity alta en móvil puede bajar FPS → bájalo a 2.5

---

## 🌐 Deploy en Vercel

```bash
git add .
git commit -m "feat: hero modo dios kreatonite"
git push
```

Vercel detecta Next.js automáticamente. No requiere configuración extra.
