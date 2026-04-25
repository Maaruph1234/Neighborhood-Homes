"use client";
import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <section className="relative w-full min-h-[52vh] flex items-end overflow-hidden bg-[#071629]">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1600&q=80"
          alt="Our services"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071629]/95 via-[#071629]/75 to-[#071629]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/70 via-transparent to-transparent" />
      </div>

      <motion.div
        className="absolute top-16 right-[8%] w-72 h-72 rounded-full border border-[#C9A84C]/08 z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-24 right-[12%] w-40 h-40 rounded-full border border-[#C9A84C]/12 z-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 px-[5vw] pb-20 pt-40 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-8 text-[11px] tracking-[0.14em] uppercase"
        >
          <a href="/" className="text-white/40 hover:text-[#C9A84C] transition-colors">Home</a>
          <span className="text-white/20">/</span>
          <span className="text-[#C9A84C]">Services</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-10 h-px bg-[#C9A84C]" />
          <span className="text-[11px] tracking-[0.22em] uppercase text-[#C9A84C]">What We Offer</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white leading-[1.05] tracking-tight mb-6"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(40px, 5.5vw, 72px)",
            fontWeight: 300,
          }}
        >
          Everything You Need,{" "}
          <em style={{ fontStyle: "italic" }} className="text-[#E8C97A]">
            Under One Roof.
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-white/55 text-[15px] leading-[1.85] font-light max-w-xl"
        >
          From finding the right property to completing the paperwork, we offer a
          full suite of real estate services — backed by our dedicated team and a trusted
          legal partner — so every step of your journey is covered.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#C9A84C]/60 via-[#C9A84C]/20 to-transparent z-10" />
    </section>
  );
}
