"use client";
import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-[60vh] flex items-end overflow-hidden bg-[#071629]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80"
          alt="About Neighbourhood Homes"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071629]/95 via-[#071629]/70 to-[#071629]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/60 via-transparent to-transparent" />
      </div>

      {/* Decorative ring */}
      <motion.div
        className="absolute top-12 right-[8%] w-72 h-72 rounded-full border border-[#C9A84C]/10 z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 px-[5vw] pb-20 pt-40 max-w-3xl">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-8 text-[11px] tracking-[0.14em] uppercase"
        >
          <a href="/" className="text-white/40 hover:text-[#C9A84C] transition-colors">Home</a>
          <span className="text-white/20">/</span>
          <span className="text-[#C9A84C]">About Us</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-10 h-px bg-[#C9A84C]" />
          <span className="text-[11px] tracking-[0.22em] uppercase text-[#C9A84C]">Our Story</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white leading-[1.05] tracking-tight mb-6"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(44px, 6vw, 76px)",
            fontWeight: 300,
          }}
        >
          Built on Trust,{" "}
          <em style={{ fontStyle: "italic" }} className="text-[#E8C97A]">
            Driven by Purpose.
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-white/55 text-[15px] leading-[1.85] font-light max-w-xl"
        >
          Neighbourhood Homes Ecosystem Ltd was founded with one belief — that every
          Nigerian family deserves access to quality property, handled with honesty,
          professionalism, and care.
        </motion.p>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#C9A84C]/60 via-[#C9A84C]/20 to-transparent z-10" />
    </section>
  );
}
