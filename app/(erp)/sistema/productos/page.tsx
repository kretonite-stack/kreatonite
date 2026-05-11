"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Package, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Infinity, 
  DollarSign, 
  Tag,
  Loader2,
  AlertCircle
} from "lucide-react";

interface ProductDB {
  id: string;
  name: string;
  flavor: string;
  price: number;
  description: string;
  image_url: string;
  stock: number;
  is_unlimited: boolean;
  accent_color: string;
}

export default function ProductosAdminPage() {
  const [products, setProducts] = useState<ProductDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductDB | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    flavor: "",
    price: 0,
    description: "",
    image_url: "",
    stock: 0,
    is_unlimited: false,
    accent_color: "lime"
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (editingProduct) {
      const { error } = await supabase
        .from("products")
        .update(formData)
        .eq("id", editingProduct.id);
      
      if (error) alert("Error al actualizar: " + error.message);
    } else {
      const { error } = await supabase
        .from("products")
        .insert([formData]);
      
      if (error) alert("Error al crear: " + error.message);
    }

    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      flavor: "",
      price: 0,
      description: "",
      image_url: "",
      stock: 0,
      is_unlimited: false,
      accent_color: "lime"
    });
    fetchProducts();
  }

  async function deleteProduct(id: string) {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;
    
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) alert("Error al eliminar: " + error.message);
    else fetchProducts();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#a3e635] tracking-tight uppercase">Gestión de Tienda</h1>
          <p className="text-gray-500 mt-1 tracking-widest text-xs uppercase">Administra el catálogo y stock de KREATONITE</p>
        </div>
        <button 
          onClick={() => {
            setEditingProduct(null);
            setFormData({
              name: "",
              flavor: "",
              price: 0,
              description: "",
              image_url: "",
              stock: 0,
              is_unlimited: false,
              accent_color: "lime"
            });
            setShowModal(true);
          }}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#a3e635] text-black font-black rounded-xl hover:bg-[#84cc16] transition-all uppercase tracking-widest text-xs"
        >
          <Plus size={18} />
          Nuevo Producto
        </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#111] border border-[#a3e635]/10 rounded-2xl">
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Total Productos</div>
          <div className="text-3xl font-black text-white">{products.length}</div>
        </div>
        <div className="p-6 bg-[#111] border border-[#a3e635]/10 rounded-2xl">
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Stock Crítico</div>
          <div className="text-3xl font-black text-red-500">{products.filter(p => !p.is_unlimited && p.stock < 5).length}</div>
        </div>
        <div className="p-6 bg-[#111] border border-[#a3e635]/10 rounded-2xl">
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Valor Inventario</div>
          <div className="text-3xl font-black text-[#a3e635]">
            ${products.reduce((acc, p) => acc + (p.is_unlimited ? 0 : p.price * p.stock), 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#111] border border-[#a3e635]/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#a3e635]/5 bg-black/20 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                <th className="px-6 py-5">Producto</th>
                <th className="px-6 py-5">Sabor</th>
                <th className="px-6 py-5">Precio</th>
                <th className="px-6 py-5">Stock</th>
                <th className="px-6 py-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#a3e635]/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <Loader2 className="animate-spin text-[#a3e635] mx-auto" size={32} />
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-gray-500 uppercase tracking-widest text-xs">
                    No hay productos en la tienda
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black rounded-lg border border-white/5 overflow-hidden">
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-contain" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-700">
                              <Package size={20} />
                            </div>
                          )}
                        </div>
                        <span className="font-bold text-white uppercase text-xs tracking-wider">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.flavor || "-"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-black text-white">${product.price.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      {product.is_unlimited ? (
                        <div className="flex items-center gap-1.5 text-emerald-500 font-black text-xs uppercase">
                          <Infinity size={14} /> Ilimitado
                        </div>
                      ) : (
                        <div className={`font-black text-xs ${product.stock < 5 ? "text-red-500" : "text-white"}`}>
                          {product.stock} UNID.
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => {
                            setEditingProduct(product);
                            setFormData({
                              name: product.name,
                              flavor: product.flavor,
                              price: product.price,
                              description: product.description,
                              image_url: product.image_url,
                              stock: product.stock,
                              is_unlimited: product.is_unlimited,
                              accent_color: product.accent_color
                            });
                            setShowModal(true);
                          }}
                          className="p-2 hover:bg-[#a3e635]/10 rounded-lg text-gray-400 hover:text-[#a3e635] transition-colors"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#111] border border-[#a3e635]/20 rounded-[32px] p-8 max-h-[90vh] overflow-y-auto shadow-[0_0_100px_rgba(0,0,0,0.8)]">
            <h2 className="text-2xl font-black text-[#a3e635] uppercase tracking-tighter mb-8">
              {editingProduct ? "Editar Producto" : "Nuevo Producto"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Nombre</label>
                  <input 
                    required
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#a3e635] outline-none transition-all"
                    placeholder="Ej: KREATONITE Limón"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Sabor</label>
                  <input 
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#a3e635] outline-none transition-all"
                    placeholder="Ej: Limón"
                    value={formData.flavor}
                    onChange={e => setFormData({...formData, flavor: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Precio ($)</label>
                  <input 
                    type="number"
                    required
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#a3e635] outline-none transition-all"
                    placeholder="24990"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Color Acento</label>
                  <select 
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#a3e635] outline-none transition-all appearance-none"
                    value={formData.accent_color}
                    onChange={e => setFormData({...formData, accent_color: e.target.value})}
                  >
                    <option value="lime">Verde Neón (Lima)</option>
                    <option value="red">Rojo Frutal</option>
                    <option value="green">Verde Esmeralda (Manzana)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Descripción</label>
                <textarea 
                  rows={3}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#a3e635] outline-none transition-all"
                  placeholder="Descripción corta para la tienda..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">URL de Imagen</label>
                <input 
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#a3e635] outline-none transition-all"
                  placeholder="/images/products/kreatonite-limon.jfif"
                  value={formData.image_url}
                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                />
              </div>

              <div className="flex items-center gap-8 p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="flex-grow space-y-1">
                  <label className="text-xs font-bold text-white uppercase tracking-wider">Control de Stock</label>
                  <p className="text-[10px] text-gray-500">Define si el stock es limitado o infinito</p>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox"
                      className="hidden"
                      checked={formData.is_unlimited}
                      onChange={e => setFormData({...formData, is_unlimited: e.target.checked})}
                    />
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${formData.is_unlimited ? "bg-[#a3e635]" : "bg-gray-800"}`}>
                      <div className={`absolute top-1 w-3 h-3 bg-black rounded-full transition-all ${formData.is_unlimited ? "left-6" : "left-1"}`} />
                    </div>
                    <span className="text-[10px] font-black uppercase text-gray-400 group-hover:text-white transition-colors">Ilimitado</span>
                  </label>
                  
                  {!formData.is_unlimited && (
                    <input 
                      type="number"
                      className="w-20 bg-black border border-[#a3e635]/30 rounded-lg px-2 py-1.5 text-xs text-center font-black focus:border-[#a3e635] outline-none"
                      value={formData.stock}
                      onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})}
                    />
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 px-4 bg-white/5 hover:bg-white/10 text-gray-400 font-bold rounded-xl transition-all uppercase tracking-widest text-xs"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 px-4 bg-[#a3e635] text-black font-black rounded-xl hover:bg-[#84cc16] transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : (editingProduct ? "Guardar Cambios" : "Crear Producto")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
