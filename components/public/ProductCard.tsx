"use client";

import Image from "next/image";
import { Zap, ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const accentColors = {
    lime: {
      border: "border-[#a3e635]/20",
      glow: "shadow-[0_0_20px_rgba(163,230,53,0.1)]",
      hoverBorder: "hover:border-[#a3e635]/50",
      text: "text-[#a3e635]",
      btn: "bg-[#a3e635] shadow-[0_0_15px_rgba(163,230,53,0.3)]"
    },
    red: {
      border: "border-red-500/20",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.1)]",
      hoverBorder: "hover:border-red-500/50",
      text: "text-red-500",
      btn: "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
    },
    green: {
      border: "border-emerald-500/20",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.1)]",
      hoverBorder: "hover:border-emerald-500/50",
      text: "text-emerald-500",
      btn: "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
    }
  };

  const style = accentColors[product.accentColor];

  return (
    <div className={`group relative bg-[#111] rounded-3xl border ${style.border} ${style.hoverBorder} transition-all duration-500 overflow-hidden flex flex-col ${style.glow}`}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl -mr-16 -mt-16 group-hover:opacity-100 transition-opacity opacity-0" />
      
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
          {product.content}
        </span>
        <span className={`px-3 py-1 bg-black/60 backdrop-blur-md border ${style.border} rounded-full text-[10px] font-bold ${style.text} uppercase tracking-widest`}>
          {product.creatinePerServing} Creatina
        </span>
      </div>

      {/* Image Container */}
      <div className="relative h-72 w-full p-8 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_100%)]" />
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="object-contain w-full h-full transform group-hover:scale-110 transition-transform duration-700 relative z-0"
        />
        {/* Glow behind product */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity z-[-1]`} style={{ backgroundColor: product.accentColor === 'lime' ? '#a3e635' : product.accentColor === 'red' ? '#ef4444' : '#10b829' }} />
      </div>

      {/* Info Container */}
      <div className="p-6 pt-2 flex flex-col flex-grow">
        <div className="mb-1">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${style.text}`}>
            Sabor {product.flavor}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-[#a3e635] transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Formula Badge */}
        <div className="mt-auto mb-6 p-3 bg-black/30 rounded-xl border border-white/5">
          <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Fórmula Premium</div>
          <div className="text-[10px] text-gray-300 font-medium leading-tight">
            Creatina + Electrolitos + Magnesio + B12
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="text-2xl font-black text-white tracking-tighter">
            {product.formattedPrice}
          </div>
          <div className="flex gap-2">
            <button 
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all"
              title="Ver detalles"
            >
              <Eye size={18} />
            </button>
            <button 
              onClick={() => onAddToCart?.(product)}
              className={`p-3 ${style.btn} text-black rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center`}
              title="Agregar al carrito"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
