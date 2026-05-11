"use client";

import { useEffect, useState } from "react";
import { Zap, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ProductCard from "./ProductCard";

export default function ProductsSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        // Mapear datos de BD al formato del componente
        const mapped = data.map(p => ({
          id: p.id,
          name: p.name,
          flavor: p.flavor,
          price: p.price,
          formattedPrice: `$${p.price.toLocaleString()}`,
          description: p.description,
          image: p.image_url || "/images/products/kreatonite-limon.jfif",
          accentColor: p.accent_color || "lime",
          content: "300g", // Valores por defecto si no están en BD
          creatinePerServing: "4.5g"
        }));
        setProducts(mapped);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product: any) => {
    // Placeholder para futura lógica de carrito
    console.log("Añadido al carrito:", product.name);
    alert(`¡${product.name} añadido al carrito!`);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#a3e635]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635] text-[10px] font-bold tracking-[0.3em] uppercase">
            <Zap size={12} fill="#a3e635" />
            Catálogo Oficial
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
            ELIGE TU <span className="text-[#a3e635] text-stroke-white">ENERGÍA</span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
            Tres sabores. Una misma fórmula. Creatina, electrolitos, magnesio y vitamina B12 para llevar tu rendimiento al siguiente nivel.
          </p>
          
          <div className="pt-4 flex items-center justify-center gap-4 text-[10px] font-bold text-gray-500 tracking-widest uppercase">
            <span>300G POR ENVASE</span>
            <div className="w-1 h-1 rounded-full bg-gray-700" />
            <span>60 PORCIONES</span>
            <div className="w-1 h-1 rounded-full bg-gray-700" />
            <span>FÓRMULA 3 EN 1</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <Loader2 className="animate-spin text-[#a3e635] mx-auto" size={48} />
              <p className="mt-4 text-gray-500 uppercase tracking-widest text-xs">Sincronizando catálogo...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl">
              <p className="text-gray-500 uppercase tracking-widest text-xs">No hay productos disponibles por ahora</p>
            </div>
          ) : (
            products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))
          )}
        </div>

        <div className="mt-20 p-10 bg-gradient-to-r from-[#111] to-black border border-[#a3e635]/10 rounded-[40px] text-center space-y-6">
          <p className="text-xl text-gray-300 font-medium">
            "KREATONITE está diseñado para quienes entrenan en serio: fuerza, hidratación, energía y recuperación en una sola fórmula."
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[#a3e635]/30" />
            <Zap size={20} className="text-[#a3e635]" />
            <div className="h-px w-12 bg-[#a3e635]/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
