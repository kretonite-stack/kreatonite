import { 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Ventas Totales", value: "$1.240.900", icon: DollarSign, color: "#a3e635", trend: "+12%" },
    { label: "Nuevos Clientes", value: "124", icon: Users, color: "#22d3ee", trend: "+5%" },
    { label: "Pedidos Pendientes", value: "12", icon: AlertTriangle, color: "#fbbf24", trend: "-2" },
    { label: "Stock Bajo", value: "3", icon: Package, color: "#f87171", trend: "Crítico" },
    { label: "Entregas Exitosas", value: "89", icon: CheckCircle2, color: "#4ade80", trend: "100%" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-[#a3e635] tracking-tight uppercase">Dashboard Operativo</h1>
        <p className="text-gray-500 mt-1 tracking-widest text-xs uppercase">Visión general del ecosistema KREATONITE</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 bg-[#111] border border-[#a3e635]/10 rounded-2xl relative overflow-hidden group hover:border-[#a3e635]/30 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon size={48} color={stat.color} />
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: stat.color }} />
              {stat.label}
            </div>
            <div className="text-2xl font-black text-white">{stat.value}</div>
            <div className="mt-2 text-[10px] font-bold" style={{ color: stat.color }}>
              {stat.trend} <span className="text-gray-600 ml-1">vs mes anterior</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 bg-[#111] border border-[#a3e635]/10 rounded-3xl min-h-[400px]">
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
            <TrendingUp size={18} className="text-[#a3e635]" />
            Actividad de Ventas
          </h3>
          <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-800 rounded-2xl text-gray-700 text-xs uppercase tracking-[0.2em]">
            Gráfico de actividad en desarrollo...
          </div>
        </div>

        <div className="p-8 bg-[#111] border border-[#a3e635]/10 rounded-3xl">
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">Pedidos Recientes</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#a3e635]/10 flex items-center justify-center text-[#a3e635] font-bold text-xs">
                    #{1020 + i}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Cliente K-{i}</div>
                    <div className="text-[10px] text-gray-600 uppercase">Hace {i * 15} min</div>
                  </div>
                </div>
                <div className="text-xs font-bold text-[#a3e635]">$24.990</div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-[10px] font-black text-gray-500 hover:text-[#a3e635] transition-colors uppercase tracking-[0.3em] border-t border-white/5">
            Ver todos los pedidos
          </button>
        </div>
      </div>
    </div>
  );
}
