import ProductsSection from "@/components/public/ProductsSection";

export default function ProductosPage() {
  return (
    <div className="pt-20">
      <ProductsSection />
      
      {/* Additional info for the products page */}
      <section className="py-20 bg-black/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <h4 className="text-[#a3e635] font-bold tracking-widest uppercase text-sm">Envíos Rápidos</h4>
            <p className="text-gray-400 text-sm">Despacho en 24-48 horas a todo Chile. Retiro inmediato en puntos autorizados.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[#a3e635] font-bold tracking-widest uppercase text-sm">Pago Seguro</h4>
            <p className="text-gray-400 text-sm">Integración con Webpay y Flow para una transacción 100% protegida.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[#a3e635] font-bold tracking-widest uppercase text-sm">Calidad Garantizada</h4>
            <p className="text-gray-400 text-sm">Producto certificado con estándares de pureza y rendimiento deportivo.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
