"use client";

import Image from "next/image";
import { 
  Zap, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  Package, 
  Clock, 
  ArrowRight,
  AlertCircle,
  TrendingUp,
  HeadphonesIcon
} from "lucide-react";

export default function CentrosRetiroPage() {
  const benefits = [
    { icon: <ShieldCheck size={20} />, title: "COMPRA SEGURA", desc: "Tus datos protegidos" },
    { icon: <Package size={20} />, title: "SEGUIMIENTO", desc: "Te mantenemos informado" },
    { icon: <Zap size={20} />, title: "CONFIABLE", desc: "Cumplimos lo prometido" },
    { icon: <HeadphonesIcon size={20} />, title: "ATENCIÓN", desc: "Estamos para ayudarte" },
  ];

  const infoBlocks = [
    { 
      icon: <MapPin size={24} className="text-[#a3e635]" />, 
      title: "ZONAS DE DESPACHO", 
      desc: "Reñaca, Viña del Mar y Concón. Pronto más comunas." 
    },
    { 
      icon: <TrendingUp size={24} className="text-[#a3e635]" />, 
      title: "COSTO DE DESPACHO", 
      desc: "El despacho a domicilio tiene un valor fijo de $7.000." 
    },
    { 
      icon: <Clock size={24} className="text-[#a3e635]" />, 
      title: "TIEMPOS DE ENTREGA", 
      desc: "Retiro en local: 4 días hábiles. Despacho a domicilio: 5 días hábiles." 
    },
    { 
      icon: <Package size={24} className="text-[#a3e635]" />, 
      title: "EMPAQUE SEGURO", 
      desc: "Tu pedido llega en perfectas condiciones." 
    },
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,rgba(163,230,53,0.08),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-10">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
                RETIRO / <br />
                <span className="text-[#a3e635]">DESPACHO</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-bold tracking-widest text-[#a3e635]/80 uppercase">
                TU KREATONITE, DONDE LA NECESITES
              </h2>
              <p className="max-w-xl text-gray-400 text-lg leading-relaxed">
                Compra online de forma rápida y segura. Elige retirar tu pedido en nuestros puntos disponibles o recibirlo directamente en tu domicilio.
              </p>
            </div>

            {/* Quick Benefits Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-white/5">
              {benefits.map((b, i) => (
                <div key={i} className="space-y-2 group">
                  <div className="text-[#a3e635] group-hover:scale-110 transition-transform duration-300">
                    {b.icon}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black tracking-widest uppercase">{b.title}</p>
                    <p className="text-[10px] text-gray-500 font-medium uppercase">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-[#a3e635]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform hover:scale-[1.02] transition-transform duration-700">
              <Image 
                src="/kreatonite_delivery_van_hero_1778502424406.png" 
                alt="KREATONITE Delivery Van" 
                width={800} 
                height={600} 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Cards Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Reñaca */}
          <div className="group relative bg-[#0a0a0a] rounded-[40px] overflow-hidden border border-white/5 hover:border-[#a3e635]/30 transition-all duration-500 shadow-2xl">
            <div className="relative h-48">
              <Image 
                src="/renaca_pickup_point_1778502577665.png" 
                alt="Reñaca Pickup" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
              <div className="absolute top-6 left-6 w-12 h-12 bg-[#a3e635] rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(163,230,53,0.4)]">
                <MapPin size={24} />
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">RETIRO EN <span className="text-[#a3e635]">REÑACA</span></h3>
                <div className="inline-block px-3 py-1 bg-[#a3e635]/10 border border-[#a3e635]/20 rounded-lg text-[#a3e635] text-[10px] font-bold tracking-widest uppercase">
                  GRATIS
                </div>
                <p className="text-sm text-gray-400 leading-relaxed pt-2">
                  Compra online y retira tu pedido en Reñaca. Punto exacto por confirmar.
                </p>
              </div>
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-gray-500" />
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">LISTO EN 4 DÍAS</p>
                    <p className="text-[9px] text-gray-600 uppercase font-bold">A partir de la compra</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: GreenMarket */}
          <div className="group relative bg-[#0a0a0a] rounded-[40px] overflow-hidden border border-white/5 hover:border-[#a3e635]/30 transition-all duration-500 shadow-2xl">
            <div className="relative h-48">
              <Image 
                src="/greenmarket_vina_pickup_1778503133029.png" 
                alt="GreenMarket Viña" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
              <div className="absolute top-6 left-6 w-12 h-12 bg-[#a3e635] rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(163,230,53,0.4)]">
                <Package size={24} />
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">RETIRO EN <span className="text-[#a3e635]">VIÑA</span></h3>
                </div>
                <p className="text-[10px] font-black text-emerald-500 tracking-[0.3em] uppercase">LOCAL GREENMARKET</p>
                <div className="inline-block px-3 py-1 bg-[#a3e635]/10 border border-[#a3e635]/20 rounded-lg text-[#a3e635] text-[10px] font-bold tracking-widest uppercase">
                  GRATIS
                </div>
                <p className="text-sm text-gray-400 leading-relaxed pt-2">
                  Retira tu KREATONITE en Local GreenMarket, Viña del Mar.
                </p>
              </div>
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-gray-500" />
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">LISTO EN 4 DÍAS</p>
                    <p className="text-[9px] text-gray-600 uppercase font-bold">A partir de la compra</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Domicilio */}
          <div className="group relative bg-[#0a0a0a] rounded-[40px] overflow-hidden border border-white/5 hover:border-[#a3e635]/30 transition-all duration-500 shadow-2xl">
            <div className="relative h-48">
              <Image 
                src="/kreatonite_shipping_box_1778503163885.png" 
                alt="Home Delivery" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
              <div className="absolute top-6 left-6 w-12 h-12 bg-[#a3e635] rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(163,230,53,0.4)]">
                <Truck size={24} />
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">DESPACHO A <span className="text-[#a3e635]">DOMICILIO</span></h3>
                <div className="inline-block px-3 py-1 bg-[#a3e635]/10 border border-[#a3e635]/20 rounded-lg text-[#a3e635] text-[10px] font-bold tracking-widest uppercase">
                  $7.000
                </div>
                <p className="text-sm text-gray-400 leading-relaxed pt-2">
                  Recibe tu KREATONITE en la comodidad de tu hogar, oficina o donde prefieras.
                </p>
              </div>
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-gray-500" />
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">ENTREGA EN 5 DÍAS</p>
                    <p className="text-[9px] text-gray-600 uppercase font-bold">A partir de la compra</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Info Grid Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-[#0a0a0a] border border-white/5 rounded-[40px] p-10">
            {infoBlocks.map((block, i) => (
              <div key={i} className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  {block.icon}
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest">{block.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium uppercase">{block.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Important Banner */}
          <div className="mt-8 p-6 bg-[#a3e635]/5 border border-[#a3e635]/10 rounded-2xl flex items-center gap-4">
            <div className="text-[#a3e635] shrink-0">
              <AlertCircle size={24} />
            </div>
            <p className="text-xs md:text-sm font-bold text-[#a3e635] uppercase tracking-wider leading-relaxed">
              IMPORTANTE: Los plazos de entrega comienzan a contar desde la confirmación de tu compra.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
            ELIGE LA OPCIÓN QUE <br /> <span className="text-[#a3e635]">MÁS TE CONVENGA</span>
          </h2>
          <div className="flex justify-center">
            <a 
              href="/productos"
              className="group flex items-center gap-3 px-12 py-5 bg-[#a3e635] text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-[0.2em] text-sm shadow-[0_0_30px_rgba(163,230,53,0.3)]"
            >
              COMPRAR AHORA
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
