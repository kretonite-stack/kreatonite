# KREATONITE — The Game Changer

Landing page oficial de KREATONITE, construida con **Next.js 15**, **Tailwind CSS**, **Lucide React**. Lista para deploy en **Vercel** con integración **Supabase** y **GitHub**.

---

## 🚀 Stack Técnico

- **Framework**: Next.js 15 (App Router)
- **Estilos**: Tailwind CSS v3
- **Iconos**: Lucide React
- **Host**: Vercel
- **Base de datos**: Supabase
- **Repositorio**: GitHub

---

## 📦 Estructura del Proyecto

```
kreatonite/
├── app/
│   ├── globals.css       # Variables CSS, tema neon green
│   ├── layout.tsx        # Metadata SEO
│   └── page.tsx          # Página principal
├── components/
│   ├── Header.tsx        # Nav + Logo + Carrito
│   ├── Hero.tsx          # Sección principal hero
│   ├── Benefits.tsx      # 4 beneficios en grid
│   ├── Flavors.tsx       # 3 sabores con cards
│   ├── Comparison.tsx    # VS creatina básica
│   ├── Contact.tsx       # Formulario + WhatsApp
│   ├── Community.tsx     # Grid comunidad Instagram
│   └── Footer.tsx        # Footer completo
├── public/               # Assets estáticos
├── package.json
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## 🛠️ Setup Local

```bash
# 1. Instalar dependencias
npm install

# 2. Variables de entorno (copia y edita)
cp .env.example .env.local

# 3. Correr en desarrollo
npm run dev
# → http://localhost:3000

# 4. Build producción
npm run build
npm start
```

---

## 🌐 Deploy en Vercel

### Opción A — Via CLI (recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Opción B — Via GitHub (automático)

1. Sube el proyecto a GitHub:
```bash
git init
git add .
git commit -m "feat: initial kreatonite landing page"
git remote add origin https://github.com/TU_USER/kreatonite.git
git push -u origin main
```

2. Ve a [vercel.com](https://vercel.com) → **New Project** → **Import Git Repository**
3. Selecciona tu repo `kreatonite`
4. Vercel detecta Next.js automáticamente → **Deploy**
5. ✅ Cada push a `main` hace deploy automático

---

## 🗄️ Configuración Supabase

### 1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) → New Project
2. Guarda las credenciales: **Project URL** y **anon key**

### 2. Crear tabla de contacto

En el SQL Editor de Supabase ejecuta:

```sql
-- Tabla para mensajes de contacto
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para newsletter
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: solo inserts anónimos permitidos
CREATE POLICY "Allow insert contact" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
```

### 3. Instalar cliente Supabase

```bash
npm install @supabase/supabase-js
```

### 4. Variables de entorno

Crea `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://XXXXXXXXXX.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5. Cliente Supabase

Crea `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 6. Conectar formulario de contacto

En `components/Contact.tsx`, reemplaza el `handleSubmit`:

```typescript
import { supabase } from '@/lib/supabase'

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  const { error } = await supabase
    .from('contact_messages')
    .insert([{ nombre: form.nombre, email: form.email, mensaje: form.mensaje }])
  
  if (!error) {
    setSent(true)
    setForm({ nombre: '', email: '', mensaje: '' })
    setTimeout(() => setSent(false), 3000)
  } else {
    console.error('Error:', error)
  }
}
```

### 7. Conectar newsletter en Footer

```typescript
import { supabase } from '@/lib/supabase'

const handleNewsletterSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email }])
  
  if (!error) {
    setEmail('')
    alert('¡Suscrito exitosamente!')
  }
}
```

---

## 📱 Configuración en Vercel — Variables de Entorno

En tu proyecto Vercel: **Settings → Environment Variables** → Agrega:

```
NEXT_PUBLIC_SUPABASE_URL     = https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ...
```

---

## 🔗 Links Configurados

| Destino | URL |
|---------|-----|
| WhatsApp | https://wa.me/56951143426 |
| Instagram | https://www.instagram.com/kreatonite/ |
| TikTok | https://www.tiktok.com/@kreatonite |

---

## 🎨 Design Tokens

```css
--neon:    #a3e635  /* Neon Green principal */
--black:   #000000  /* Fondo principal */
--dark:    #0a0a0a  /* Cards oscuras */
--white:   #ffffff  /* Títulos */
--gray:    #9ca3af  /* Texto secundario */
```

---

## 📋 Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm start        # Servidor de producción
npm run lint     # Linting
```

---

## 🔧 Antigraviti / CMS Integration

Si usas **Antigraviti** como headless CMS:

1. Obtén tu API key de Antigraviti
2. Agrega a `.env.local`:
```env
ANTIGRAVITI_API_KEY=tu_api_key
ANTIGRAVITI_SPACE_ID=tu_space_id
```
3. Reemplaza el contenido estático de los sabores, beneficios y testimonios con fetch al API de Antigraviti en los Server Components.

---

© 2026 KREATONITE. Todos los derechos reservados.
