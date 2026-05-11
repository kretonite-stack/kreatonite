"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  Loader2, 
  Filter,
  CreditCard
} from "lucide-react";

interface Profile {
  id: string;
  full_name: string;
  rut: string;
  phone: string;
  region: string;
  comuna: string;
  address_street: string;
  address_number: string;
}

export default function ClientesAdminPage() {
  const [clients, setClients] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "customer")
      .order("full_name", { ascending: true });

    if (error) {
      console.error("Error fetching clients:", error);
    } else {
      setClients(data || []);
    }
    setLoading(false);
  }

  const filteredClients = clients.filter(c => 
    c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.rut?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#a3e635] tracking-tight uppercase">Base de Clientes</h1>
          <p className="text-gray-500 mt-1 tracking-widest text-xs uppercase">Gestión de usuarios registrados en KREATONITE</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex gap-4">
        <div className="relative flex-grow group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#a3e635] transition-colors" size={18} />
          <input 
            type="text"
            className="w-full bg-[#111] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:border-[#a3e635] outline-none transition-all"
            placeholder="Buscar por nombre, RUT o teléfono..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="px-6 py-4 bg-[#111] border border-white/10 rounded-2xl text-gray-500 hover:text-white transition-colors">
          <Filter size={18} />
        </button>
      </div>

      {/* Clients Table/Grid */}
      <div className="bg-[#111] border border-[#a3e635]/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#a3e635]/5 bg-black/20 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                <th className="px-6 py-5">Nombre / RUT</th>
                <th className="px-6 py-5">Contacto</th>
                <th className="px-6 py-5">Ubicación</th>
                <th className="px-6 py-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#a3e635]/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <Loader2 className="animate-spin text-[#a3e635] mx-auto" size={32} />
                  </td>
                </tr>
              ) : filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-gray-500 uppercase tracking-widest text-xs">
                    No se encontraron clientes
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-white uppercase text-xs tracking-wider">{client.full_name}</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mt-1">
                          <CreditCard size={10} />
                          {client.rut}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <Phone size={12} className="text-[#a3e635]" />
                          {client.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <MapPin size={12} className="text-[#a3e635]" />
                          {client.comuna}, {client.region}
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1">
                          {client.address_street} #{client.address_number}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[10px] font-black text-[#a3e635] uppercase tracking-widest hover:underline">
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
