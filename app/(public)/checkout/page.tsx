"use client";

import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
// Forzar actualización v2
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <main className="min-h-screen bg-[#050505]">
      <Header />
      
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-[#a3e635]/10 pb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635] text-[10px] font-bold tracking-widest uppercase mb-4">
                <ShoppingBag size={12} />
                Tu Selección
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.8]">
                CARRITO DE <span className="text-[#a3e635]">COMPRAS</span>
              </h1>
            </div>
            <div className="text-right">
              <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Resumen Parcial</p>
              <p className="text-3xl font-black text-white">${totalPrice.toLocaleString()}</p>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="py-32 text-center space-y-8 bg-[#0a0a0a] rounded-[40px] border border-dashed border-white/10">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag size={40} className="text-gray-700" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Tu carrito está vacío</h2>
                <p className="text-gray-500 max-w-xs mx-auto">Parece que aún no has añadido nada a tu arsenal de suplementación.</p>
              </div>
              <Link 
                href="/productos"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#a3e635] text-black font-black rounded-2xl hover:scale-105 transition-all uppercase tracking-widest text-xs"
              >
                Ir a Productos
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-6">
                {cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="group bg-[#0a0a0a] border border-white/5 hover:border-[#a3e635]/20 rounded-[32px] p-6 transition-all duration-500 flex flex-col md:flex-row items-center gap-8"
                  >
                    <div className="w-32 h-32 bg-black rounded-2xl border border-white/5 p-4 flex items-center justify-center overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    
                    <div className="flex-grow space-y-1 text-center md:text-left">
                      <div className="text-[10px] font-bold text-[#a3e635] uppercase tracking-widest">Sabor {item.flavor}</div>
                      <h3 className="text-xl font-bold text-white uppercase tracking-tight">{item.name}</h3>
                      <p className="text-sm text-gray-500 font-bold">${item.price.toLocaleString()} c/u</p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-4">
                      <div className="flex items-center bg-black border border-white/10 rounded-xl overflow-hidden p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-black text-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <span className="font-black text-white text-xl">${(item.price * item.quantity).toLocaleString()}</span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-[#111] border border-[#a3e635]/20 rounded-[40px] p-8 sticky top-32 space-y-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Resumen de Orden</h2>
                    <div className="h-1 w-12 bg-[#a3e635]" />
                  </div>

                  <div className="space-y-4 border-b border-white/5 pb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 uppercase tracking-widest font-bold">Subtotal ({totalItems} items)</span>
                      <span className="text-white font-bold">${totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 uppercase tracking-widest font-bold">Despacho</span>
                      <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px]">Por Calcular</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <span className="text-gray-400 uppercase tracking-widest text-xs font-black">Total Final</span>
                      <span className="text-4xl font-black text-[#a3e635] tracking-tighter">${totalPrice.toLocaleString()}</span>
                    </div>

                    <button className="w-full py-5 bg-[#a3e635] text-black font-black rounded-2xl hover:bg-[#84cc16] hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3">
                      Proceder al Pago
                      <ArrowRight size={18} />
                    </button>
                    
                    <p className="text-[10px] text-gray-600 text-center uppercase tracking-widest leading-relaxed">
                      Pago 100% seguro y encriptado. <br />
                      Aceptamos Webpay, Flow y Transferencia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
