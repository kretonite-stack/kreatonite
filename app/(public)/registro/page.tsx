"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  CreditCard,
  Loader2,
  CheckCircle2,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function RegistroPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    rut: "",
    phone: "",
    region: "",
    comuna: "",
    street: "",
    number: ""
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Crear usuario en Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Crear perfil en la tabla 'profiles'
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: authData.user.id,
              full_name: formData.fullName,
              rut: formData.rut,
              phone: formData.phone,
              region: formData.region,
              comuna: formData.comuna,
              address_street: formData.street,
              address_number: formData.number,
              role: "customer"
            }
          ]);

        if (profileError) throw profileError;
        
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error durante el registro");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#0a0a0a]">
        <div className="max-w-md w-full text-center space-y-6 p-10 bg-[#111] border border-[#a3e635]/20 rounded-[40px] shadow-[0_0_50px_rgba(163,230,53,0.1)]">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#a3e635]/10 text-[#a3e635] mb-4">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">¡Registro Exitoso!</h2>
          <p className="text-gray-400 leading-relaxed">
            Hemos enviado un correo de confirmación a <span className="text-[#a3e635]">{formData.email}</span>. 
            Por favor, revisa tu bandeja de entrada para activar tu cuenta y comenzar a comprar.
          </p>
          <button 
            onClick={() => router.push("/acceso-cliente")}
            className="w-full py-4 bg-[#a3e635] text-black font-black rounded-2xl hover:bg-[#84cc16] transition-all uppercase tracking-widest text-sm"
          >
            Ir al Inicio de Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32 px-4 relative overflow-hidden flex items-center justify-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_10%,rgba(163,230,53,0.08),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-2xl w-full bg-[#111]/80 backdrop-blur-xl border border-[#a3e635]/10 rounded-[40px] p-8 md:p-12 relative z-10 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a3e635]/10 border border-[#a3e635]/20 rounded-full text-[#a3e635] text-[10px] font-black tracking-widest uppercase mb-4">
            <Zap size={12} fill="#a3e635" /> Join the community
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
            ÚNETE A <span className="text-[#a3e635]">KREATONITE</span>
          </h1>
          <p className="text-gray-500 mt-4 text-sm uppercase tracking-widest">Completa tus datos para empezar a comprar</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-8">
          {/* Datos de Cuenta */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] border-b border-white/5 pb-2">Información de Cuenta</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#a3e635] transition-colors" size={18} />
                <input 
                  type="email" required
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white text-sm focus:border-[#a3e635] focus:outline-none transition-all"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#a3e635] transition-colors" size={18} />
                <input 
                  type="password" required
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white text-sm focus:border-[#a3e635] focus:outline-none transition-all"
                  placeholder="Contraseña (mín. 6 car.)"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Datos Personales */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] border-b border-white/5 pb-2">Datos Personales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#a3e635] transition-colors" size={18} />
                <input 
                  type="text" required
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white text-sm focus:border-[#a3e635] focus:outline-none transition-all"
                  placeholder="Nombre completo"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div className="relative group">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#a3e635] transition-colors" size={18} />
                <input 
                  type="text" required
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white text-sm focus:border-[#a3e635] focus:outline-none transition-all"
                  placeholder="RUT (ej: 12.345.678-9)"
                  value={formData.rut}
                  onChange={e => setFormData({...formData, rut: e.target.value})}
                />
              </div>
              <div className="relative group md:col-span-2">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#a3e635] transition-colors" size={18} />
                <input 
                  type="tel" required
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white text-sm focus:border-[#a3e635] focus:outline-none transition-all"
                  placeholder="Teléfono móvil (ej: +569 1234 5678)"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Dirección */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] border-b border-white/5 pb-2">Dirección de Despacho</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#a3e635] transition-colors" size={18} />
                <input 
                  type="text" required
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white text-sm focus:border-[#a3e635] focus:outline-none transition-all"
                  placeholder="Región"
                  value={formData.region}
                  onChange={e => setFormData({...formData, region: e.target.value})}
                />
              </div>
              <div className="relative group">
                <input 
                  type="text" required
                  className="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-2xl text-white text-sm focus:border-[#a3e635] focus:outline-none transition-all"
                  placeholder="Comuna"
                  value={formData.comuna}
                  onChange={e => setFormData({...formData, comuna: e.target.value})}
                />
              </div>
              <div className="relative group md:col-span-3/4">
                <input 
                  type="text" required
                  className="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-2xl text-white text-sm focus:border-[#a3e635] focus:outline-none transition-all"
                  placeholder="Calle / Avenida"
                  value={formData.street}
                  onChange={e => setFormData({...formData, street: e.target.value})}
                />
              </div>
              <div className="relative group">
                <input 
                  type="text" required
                  className="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-2xl text-white text-sm focus:border-[#a3e635] focus:outline-none transition-all"
                  placeholder="Número"
                  value={formData.number}
                  onChange={e => setFormData({...formData, number: e.target.value})}
                />
              </div>
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
            className="w-full py-5 bg-[#a3e635] text-black font-black rounded-[20px] hover:bg-[#84cc16] transition-all uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(163,230,53,0.2)] disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "CREAR MI CUENTA"}
          </button>

          <p className="text-center text-xs text-gray-500 tracking-widest uppercase">
            ¿Ya tienes cuenta?{" "}
            <Link href="/acceso-cliente" className="text-[#a3e635] hover:underline font-black">
              Inicia Sesión aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
