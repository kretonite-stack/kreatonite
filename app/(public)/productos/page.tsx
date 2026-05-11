export default function ProductosPage() {
  return (
    <div className="py-20 px-8 max-w-7xl mx-auto space-y-12">
      <h1 className="text-5xl font-bold text-[#a3e635] tracking-tight">TIENDA KREATONITE</h1>
      <p className="text-xl text-gray-400">Explora los sabores oficiales de KREATONITE.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Aquí irán las tarjetas de productos en la siguiente etapa */}
        <div className="h-64 bg-[#111] border border-[#a3e635]/10 rounded-2xl flex items-center justify-center">
          <span className="text-gray-600">Próximamente: Sabores</span>
        </div>
      </div>
    </div>
  );
}
