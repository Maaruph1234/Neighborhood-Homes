"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/",           anchor: "#hero", label: "Home" },
  { href: "/about",      anchor: null,    label: "About" },
  { href: "/services",   anchor: null,    label: "Services" },
  { href: "/properties", anchor: null,    label: "Properties" },
  { href: "/contact",    anchor: null,    label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string, anchor: string | null) => {
    setMobileOpen(false);
    if (href === "/" && anchor) {
      if (pathname === "/") {
        const el = document.querySelector(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/");
      }
    } else {
      router.push(href);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] transition-all duration-500 ${
          scrolled
            ? "h-[64px] bg-[#071629]/95 backdrop-blur-xl shadow-2xl"
            : "h-[80px] bg-[#071629]/75 backdrop-blur-md"
        }`}
        style={{ borderBottom: "1px solid rgba(201,168,76,0.12)" }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav("/", "#hero")}
          className="flex flex-col gap-0.5 text-left"
        >
          <span
            className="text-white font-serif text-xl font-semibold tracking-wide leading-none"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Neighbourhood Homes
          </span>
          <span className="text-[9px] tracking-[0.22em] text-[#C9A84C] uppercase font-light">
            Ecosystem Ltd.
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href, link.anchor)}
                className={`relative text-[13px] tracking-[0.04em] transition-colors duration-200 pb-1 ${
                  isActive(link.href)
                    ? "text-[#C9A84C]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A84C]"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNav("/contact", null)}
            className="hidden lg:block bg-[#C9A84C] text-[#071629] text-[11px] tracking-[0.1em] uppercase font-medium px-6 py-3 transition-all duration-200 hover:bg-[#E8C97A] active:scale-95"
          >
            Schedule Viewing
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[64px] left-0 right-0 z-40 bg-[#071629]/98 backdrop-blur-xl border-b border-[#C9A84C]/20 py-6 px-[5vw] flex flex-col gap-4"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleNav(link.href, link.anchor)}
                className={`text-left text-[15px] py-2 border-b border-white/5 transition-colors ${
                  isActive(link.href) ? "text-[#C9A84C]" : "text-white/80 hover:text-[#C9A84C]"
                }`}
              >
                {link.label}
              </motion.button>
            ))}
            <button
              onClick={() => handleNav("/contact", null)}
              className="mt-2 bg-[#C9A84C] text-[#071629] text-[12px] tracking-widest uppercase font-medium py-3"
            >
              Schedule Viewing
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
