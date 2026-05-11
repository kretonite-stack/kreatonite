"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  ClipboardList,
  Zap
} from "lucide-react";

const MENU_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Pedidos", href: "/pedidos", icon: ClipboardList },
  { label: "Productos", href: "/productos", icon: Package },
  { label: "Inventario", href: "/inventario", icon: ShoppingCart },
  { label: "Clientes", href: "/clientes", icon: Users },
  { label: "Configuración", href: "/configuracion", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-[#a3e635]/20 flex flex-col h-screen sticky top-0 bg-[#0a0a0a]">
      <div className="p-6 flex items-center gap-3 border-b border-[#a3e635]/10">
        <div className="w-8 h-8 bg-gradient-to-br from-[#a3e635] to-[#84cc16] rounded flex items-center justify-center shadow-[0_0_15px_rgba(163,230,53,0.4)]">
          <Zap size={18} fill="#000" color="#000" />
        </div>
        <span className="font-bold tracking-[0.2em] text-[#a3e635] text-lg">SYSTEM</span>
      </div>

      <nav className="flex-grow p-4 space-y-2">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? "bg-[#a3e635]/10 text-[#a3e635] shadow-[0_0_20px_rgba(163,230,53,0.1)] border border-[#a3e635]/20" 
                  : "text-gray-400 hover:text-[#a3e635] hover:bg-[#a3e635]/5"
              }`}
            >
              <Icon size={18} className={isActive ? "text-[#a3e635]" : "group-hover:text-[#a3e635]"} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#a3e635]/10">
        <Link 
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-xs text-gray-500 hover:text-[#a3e635] transition-colors"
        >
          <Zap size={14} />
          Ver Sitio Público
        </Link>
      </div>
    </aside>
  );
}
