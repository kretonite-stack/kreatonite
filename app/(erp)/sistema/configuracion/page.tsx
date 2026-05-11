"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Settings, 
  CreditCard, 
  Save, 
  Loader2, 
  ShieldCheck, 
  Globe,
  Mail,
  Zap,
  Key
} from "lucide-react";

export default function ConfiguracionPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("pagos");

  // State para Flow
  const [flowSettings, setFlowSettings] = useState({
    apiKey: "",
    secretKey: "",
    isTestMode: true,
  });

  // State para Tienda
  const [storeSettings, setStoreSettings] = useState({
    storeName: "KREATONITE",
    contactEmail: "contacto@kreatonite.cl",
    freeShippingThreshold: 50000,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);
    const { data, error } = await supabase
      .from("settings")
      .select("*");

    if (data) {
      const flow = data.find(s => s.key === "flow_credentials");
      if (flow) setFlowSettings(flow.value);

      const store = data.find(s => s.key === "store_general");
      if (store) setStoreSettings(store.value);
    }
    setLoading(false);
  }

  async function saveFlowSettings() {
    setSaving(true);
    const { error } = await supabase
      .from("settings")
      .upsert({ 
        key: "flow_credentials", 
        value: flowSettings,
        updated_at: new Date().toISOString()
      });

    if (error) alert("Error al guardar: " + error.message);
    else alert("Configuración de Flow guardada con éxito");
    setSaving(false);
  }

  async function saveStoreSettings() {
    setSaving(true);
    const { error } = await supabase
      .from("settings")
      .upsert({ 
        key: "store_general", 
        value: storeSettings,
        updated_at: new Date().toISOString()
      });

    if (error) alert("Error al guardar: " + error.message);
    else alert("Configuración de Tienda guardada con éxito");
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-[#a3e635]" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#a3e635]/10 pb-8">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Configuración <span className="text-[#a3e635]">Global</span></h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Gestiona llaves de API y parámetros del sistema</p>
        </div>
      </div>

      <div className="flex gap-4 p-1 bg-black border border-white/5 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab("pagos")}
          className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "pagos" ? "bg-[#a3e635] text-black shadow-[0_0_20px_rgba(163,230,53,0.2)]" : "text-gray-500 hover:text-white"}`}
        >
          Pasarela Flow
        </button>
        <button 
          onClick={() => setActiveTab("tienda")}
          className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "tienda" ? "bg-[#a3e635] text-black shadow-[0_0_20px_rgba(163,230,53,0.2)]" : "text-gray-500 hover:text-white"}`}
        >
          Ajustes Tienda
        </button>
      </div>

      {activeTab === "pagos" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-[#0a0a0a] border border-[#a3e635]/20 rounded-[32px] p-8 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#a3e635]/10 rounded-xl flex items-center justify-center text-[#a3e635]">
                <CreditCard size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-tight">Credenciales de Flow</h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Conecta tu cuenta para procesar pagos</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Flow API Key</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" size={16} />
                  <input 
                    type="password"
                    className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:border-[#a3e635] outline-none transition-all"
                    placeholder="Tu API Key de Flow..."
                    value={flowSettings.apiKey}
                    onChange={e => setFlowSettings({...flowSettings, apiKey: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Flow Secret Key</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" size={16} />
                  <input 
                    type="password"
                    className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:border-[#a3e635] outline-none transition-all"
                    placeholder="Tu Secret Key de Flow..."
                    value={flowSettings.secretKey}
                    onChange={e => setFlowSettings({...flowSettings, secretKey: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="flex-grow">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Modo de Pruebas (Sandbox)</h3>
                  <p className="text-[10px] text-gray-500">Actívalo para hacer pruebas sin cobros reales</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={flowSettings.isTestMode}
                    onChange={e => setFlowSettings({...flowSettings, isTestMode: e.target.checked})}
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#a3e635]"></div>
                </label>
              </div>
            </div>

            <button 
              onClick={saveFlowSettings}
              disabled={saving}
              className="w-full py-4 bg-[#a3e635] text-black font-black rounded-2xl hover:bg-[#84cc16] transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              Guardar Credenciales
            </button>
          </div>
        </div>
      )}

      {activeTab === "tienda" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-[#0a0a0a] border border-[#a3e635]/20 rounded-[32px] p-8 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#a3e635]/10 rounded-xl flex items-center justify-center text-[#a3e635]">
                <Globe size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-tight">Ajustes de la Tienda</h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Configuración general del ecommerce</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Nombre de la Tienda</label>
                <input 
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:border-[#a3e635] outline-none transition-all"
                  value={storeSettings.storeName}
                  onChange={e => setStoreSettings({...storeSettings, storeName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email de Contacto</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" size={16} />
                  <input 
                    type="email"
                    className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:border-[#a3e635] outline-none transition-all"
                    value={storeSettings.contactEmail}
                    onChange={e => setStoreSettings({...storeSettings, contactEmail: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Umbral Envío Gratis ($)</label>
                <input 
                  type="number"
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:border-[#a3e635] outline-none transition-all"
                  value={storeSettings.freeShippingThreshold}
                  onChange={e => setStoreSettings({...storeSettings, freeShippingThreshold: parseInt(e.target.value)})}
                />
              </div>
            </div>

            <button 
              onClick={saveStoreSettings}
              disabled={saving}
              className="w-full py-4 bg-[#a3e635] text-black font-black rounded-2xl hover:bg-[#84cc16] transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              Guardar Ajustes Tienda
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
