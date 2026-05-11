"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Zap, Loader2, Mail, Lock } from "lucide-react";

export default function ErpLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Por ahora redirigimos al dashboard. 
      // En una etapa posterior verificaremos el rol 'colaborador' en la tabla profiles.
      router.push("/sistema/dashboard");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,230,53,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-md w-full space-y-8 p-10 bg-[#111] border border-[#a3e635]/20 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[#a3e635] to-[#84cc16] shadow-[0_0_20px_rgba(163,230,53,0.4)] mb-6">
            <Zap size={32} fill="#000" color="#000" />
          </div>
          <h2 className="text-3xl font-black tracking-[0.15em] text-[#a3e635] uppercase">KREATONITE</h2>
          <p className="mt-2 text-sm text-gray-500 tracking-widest uppercase">Sistema de Control Interno</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="email"
                required
                className="w-full pl-12 pr-4 py-4 bg-black border border-[#a3e635]/10 rounded-xl text-white focus:outline-none focus:border-[#a3e635] transition-colors placeholder:text-gray-700"
                placeholder="Correo corporativo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="password"
                required
                className="w-full pl-12 pr-4 py-4 bg-black border border-[#a3e635]/10 rounded-xl text-white focus:outline-none focus:border-[#a3e635] transition-colors placeholder:text-gray-700"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-4 px-4 bg-[#a3e635] hover:bg-[#84cc16] text-black font-bold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(163,230,53,0.3)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Ingresar al Panel"}
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="/" className="text-xs text-gray-600 hover:text-[#a3e635] transition-colors uppercase tracking-widest">
            Volver al sitio público
          </a>
        </div>
      </div>
    </div>
  );
}
