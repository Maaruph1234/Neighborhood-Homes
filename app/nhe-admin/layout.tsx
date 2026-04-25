"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Building2, MessageSquare,
  Star, LogOut, Menu, X, ChevronRight
} from "lucide-react";
import { createClient } from "../../lib/supabase/client";

const navItems = [
  { href: "/nhe-admin/dashboard",    icon: LayoutDashboard, label: "Dashboard" },
  { href: "/nhe-admin/properties",   icon: Building2,       label: "Properties" },
  { href: "/nhe-admin/enquiries",    icon: MessageSquare,   label: "Enquiries"  },
  { href: "/nhe-admin/testimonials", icon: Star,            label: "Testimonials" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed]         = useState(false);
  const [checking, setChecking]     = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unread, setUnread]         = useState(0);
  const router   = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  // Skip layout for login page
  const isLogin = pathname === "/nhe-admin/login";

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && !isLogin) {
        router.push("/nhe-admin/login");
      } else {
        setAuthed(true);
        // Get unread enquiry count
        const { count } = await supabase
          .from("enquiries")
          .select("*", { count: "exact", head: true })
          .eq("read", false);
        setUnread(count || 0);
      }
      setChecking(false);
    };
    check();
  }, [pathname, isLogin, router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/nhe-admin/login");
  };

  if (isLogin) return <>{children}</>;
  if (checking) {
    return (
      <div className="min-h-screen bg-[#071629] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
      </div>
    );
  }
  if (!authed) return null;

  return (
    <div className="min-h-screen bg-[#F9F6F0] flex">
      {/* ── Sidebar ── */}
      <>
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-60 bg-[#071629] min-h-screen flex-shrink-0">
          {/* Logo */}
          <div className="px-6 py-7 border-b border-white/06">
            <div
              className="text-white text-[16px] font-semibold tracking-wide leading-none mb-0.5"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Neighbourhood Homes
            </div>
            <div className="text-[8px] tracking-[0.2em] text-[#C9A84C] uppercase">
              Admin Panel
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-5 space-y-1">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-[13px] font-light transition-all duration-200 ${
                    active
                      ? "bg-[#C9A84C]/15 text-[#C9A84C] border-l-2 border-[#C9A84C]"
                      : "text-white/50 hover:bg-white/04 hover:text-white border-l-2 border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <item.icon size={15} strokeWidth={1.5} />
                    {item.label}
                  </span>
                  {item.label === "Enquiries" && unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#C9A84C] text-[#071629] text-[10px] font-medium flex items-center justify-center">
                      {unread}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="px-3 py-5 border-t border-white/06">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-white/40 hover:text-red-400 hover:bg-red-400/06 transition-all duration-200 font-light"
            >
              <LogOut size={15} strokeWidth={1.5} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />
              <motion.aside
                initial={{ x: -240 }}
                animate={{ x: 0 }}
                exit={{ x: -240 }}
                transition={{ duration: 0.25 }}
                className="fixed left-0 top-0 bottom-0 w-60 bg-[#071629] z-50 flex flex-col lg:hidden"
              >
                <div className="px-6 py-6 border-b border-white/06 flex items-center justify-between">
                  <div>
                    <div className="text-white text-[15px] font-semibold" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                      NHE Admin
                    </div>
                    <div className="text-[8px] tracking-[0.2em] text-[#C9A84C] uppercase">Panel</div>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="text-white/40 hover:text-white">
                    <X size={18} />
                  </button>
                </div>
                <nav className="flex-1 px-3 py-5 space-y-1">
                  {navItems.map((item) => {
                    const active = pathname.startsWith(item.href);
                    return (
                      <button
                        key={item.href}
                        onClick={() => { router.push(item.href); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-light transition-all ${
                          active ? "bg-[#C9A84C]/15 text-[#C9A84C]" : "text-white/50 hover:text-white"
                        }`}
                      >
                        <item.icon size={15} strokeWidth={1.5} />
                        {item.label}
                        {item.label === "Enquiries" && unread > 0 && (
                          <span className="ml-auto w-5 h-5 rounded-full bg-[#C9A84C] text-[#071629] text-[10px] font-medium flex items-center justify-center">
                            {unread}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
                <div className="px-3 py-5 border-t border-white/06">
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-white/40 hover:text-red-400 transition-colors font-light">
                    <LogOut size={15} strokeWidth={1.5} />
                    Sign Out
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-[#0B1F3A]/08 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#6B7280] hover:text-[#0B1F3A] transition-colors"
            >
              <Menu size={20} />
            </button>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[12px] text-[#9CA3AF]">
              <span>Admin</span>
              <ChevronRight size={12} />
              <span className="text-[#0B1F3A] font-medium capitalize">
                {pathname.split("/").pop()?.replace("-", " ") || "Dashboard"}
              </span>
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.1em] uppercase text-[#9CA3AF] hover:text-[#C9A84C] transition-colors"
          >
            View Site ↗
          </a>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
