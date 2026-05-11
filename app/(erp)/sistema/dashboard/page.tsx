export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#a3e635] tracking-tight">Dashboard</h1>
      <p className="text-gray-400">Panel interno de administración KREATONITE.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 bg-[#111] border border-[#a3e635]/10 rounded-xl">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Métrica {i}</div>
            <div className="text-2xl font-bold text-white">0</div>
          </div>
        ))}
      </div>
    </div>
  );
}
