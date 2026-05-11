"use client";

import { 
  Dumbbell, 
  Droplets, 
  Brain, 
  Zap, 
  ShieldCheck, 
  Target,
  Trophy,
  Flame
} from "lucide-react";

const BENEFITS = [
  {
    Icon: Dumbbell,
    title: "MÁS FUERZA",
    subtitle: "EXPLOSIVA",
    desc: "Aumenta tus niveles de ATP para una potencia muscular sin precedentes en cada set.",
    color: "#a3e635",
    glow: "rgba(163,230,53,0.15)"
  },
  {
    Icon: Droplets,
    title: "HIDRATACIÓN",
    subtitle: "CELULAR",
    desc: "Electrolitos clave que mantienen el equilibrio osmótico y evitan la fatiga prematura.",
    color: "#00f2ff",
    glow: "rgba(0,242,255,0.1)"
  },
  {
    Icon: Brain,
    title: "ENFOQUE",
    subtitle: "NEURAL",
    desc: "Vitamina B12 de alta pureza para una conexión mente-músculo inquebrantable.",
    color: "#ff00e1",
    glow: "rgba(255,0,225,0.1)"
  },
  {
    Icon: Trophy,
    title: "RECUPERACIÓN",
    subtitle: "ELITE",
    desc: "Acelera la síntesis de proteínas y reduce el tiempo de descanso entre sesiones.",
    color: "#ffbb00",
    glow: "rgba(255,187,0,0.1)"
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="py-32 px-6 bg-[#050505] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(163,230,53,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635] text-[10px] font-black tracking-[0.3em] uppercase">
            <ShieldCheck size={14} />
            The Ultimate Formula
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            MÁS QUE UN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] via-white to-[#a3e635] animate-gradient-x">SUPLEMENTO</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl font-medium pt-4">
            Combinamos los 3 pilares del rendimiento en una sola toma épica.
          </p>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFITS.map((benefit, i) => (
            <div 
              key={i}
              className="group relative bg-[#0a0a0a] border border-white/5 hover:border-[#a3e635]/30 rounded-[40px] p-8 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Card Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl z-0" 
                style={{ background: `radial-gradient(circle at 50% 50%, ${benefit.glow}, transparent 70%)` }}
              />

              <div className="relative z-10 space-y-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ backgroundColor: `${benefit.color}15`, border: `1px solid ${benefit.color}30` }}
                >
                  <benefit.Icon size={32} style={{ color: benefit.color }} />
                </div>

                <div className="space-y-1">
                  <h3 className="text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase">
                    {benefit.title}
                  </h3>
                  <h4 className="text-3xl font-black text-white uppercase tracking-tighter">
                    {benefit.subtitle}
                  </h4>
                </div>

                <div className="h-px w-12 bg-white/10 group-hover:w-full transition-all duration-700" />

                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                  {benefit.desc}
                </p>
              </div>

              {/* Number indicator */}
              <div className="absolute top-8 right-8 text-4xl font-black text-white/5 group-hover:text-[#a3e635]/10 transition-colors italic">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA / Highlight */}
        <div className="mt-24 p-1 rounded-[40px] bg-gradient-to-r from-transparent via-[#a3e635]/20 to-transparent">
          <div className="bg-[#0a0a0a] rounded-[39px] p-12 text-center flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
            <div className="text-left space-y-2">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">¿Listo para cambiar el juego?</h3>
              <p className="text-gray-500 font-medium italic">"La mediocridad no es una opción en KREATONITE"</p>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-[#a3e635]">100%</span>
                <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Pureza</span>
              </div>
              <div className="w-px h-12 bg-white/5" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-[#a3e635]">0%</span>
                <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Relleno</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
