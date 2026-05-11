import AdminSidebar from "@/components/AdminSidebar";

export default function ErpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-sans">
      <AdminSidebar />
      <div className="flex-grow flex flex-col">
        <header className="h-16 border-b border-[#a3e635]/20 flex items-center px-8 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
          <h1 className="text-[#a3e635] font-bold tracking-widest text-sm">KREATONITE CONTROL</h1>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
