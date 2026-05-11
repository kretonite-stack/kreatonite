"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminSidebar from "@/components/AdminSidebar";
import { Loader2 } from "lucide-react";

export default function ErpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/sistema/login";

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session && !isLoginPage) {
        router.push("/sistema/login");
      }
      setLoading(false);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session && !isLoginPage) {
        router.push("/sistema/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router, isLoginPage]);

  if (loading && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="text-[#a3e635] animate-spin" size={40} />
      </div>
    );
  }

  // If on login page, just show children
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-sans">
      <AdminSidebar />
      <div className="flex-grow flex flex-col">
        <header className="h-16 border-b border-[#a3e635]/20 flex items-center px-8 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
          <h1 className="text-[#a3e635] font-bold tracking-widest text-sm uppercase">KREATONITE CONTROL</h1>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
