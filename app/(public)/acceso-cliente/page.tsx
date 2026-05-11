"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Lock, 
  Loader2,
  Zap,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AccesoClientePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;
      
      router.push("/");
    } catch (err: any) {
      setError("Credenciales inválidas. Por favor verifica tu correo y contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(163,230,53,0.05),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-md w-full bg-[#111]/80 backdrop-blur-xl border border-[#a3e635]/10 rounded-[40px] p-8 md:p-12 relative z-10 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a3e635]/10 border border-[#a3e635]/20 rounded-full text-[#a3e635] text-[10px] font-black tracking-widest uppercase mb-4">
              <Zap size={12} fill="#a3e635" /> Acceso Cliente
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
              BIENVENIDO <br /><span className="text-[#a3e635]">DE VUELTA</span>
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#a3e635] transition-colors" size={18} />
                <input 
                  type="email" required
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white text-sm focus:border-[#a3e635] focus:outline-none transition-all"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#a3e635] transition-colors" size={18} />
                <input 
                  type="password" required
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white text-sm focus:border-[#a3e635] focus:outline-none transition-all"
                  placeholder="Contraseña"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs text-center font-bold">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-[#a3e635] text-black font-black rounded-2xl hover:bg-[#84cc16] transition-all uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(163,230,53,0.2)] disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "INICIAR SESIÓN"}
              {!loading && <ArrowRight size={18} />}
            </button>

            <div className="space-y-4 pt-4">
              <p className="text-center text-xs text-gray-500 tracking-widest uppercase">
                ¿Aún no tienes cuenta?{" "}
                <Link href="/registro" className="text-[#a3e635] hover:underline font-black">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
