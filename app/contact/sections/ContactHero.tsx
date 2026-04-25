"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative w-full min-h-[48vh] flex items-end overflow-hidden bg-[#071629]">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
          alt="Contact us"
          fill
          style={{ objectFit: "cover", opacity: 0.2 }}
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071629]/95 via-[#071629]/75 to-[#071629]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/70 via-transparent to-transparent" />
      </div>

      {/* Decorative rings removed for a cleaner look */}

      <div className="relative z-10 px-[5vw] pb-20 pt-40 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-8 text-[11px] tracking-[0.14em] uppercase"
        >
          <a href="/" className="text-white/40 hover:text-[#C9A84C] transition-colors">Home</a>
          <span className="text-white/20">/</span>
          <span className="text-[#C9A84C]">Contact</span>
        </motion.div>

        {/* Eyebrow removed for a cleaner look */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="flex items-center gap-3 mb-6">
          <span className="text-[11px] tracking-[0.22em] uppercase text-[#C9A84C]">Get In Touch</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white leading-[1.05] tracking-tight mb-6"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(38px, 5vw, 68px)",
            fontWeight: 300,
          }}
        >
          We're Here,{" "}
          <em style={{ fontStyle: "italic" }} className="text-[#E8C97A]">
            Let's Talk.
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-white/55 text-[15px] leading-[1.85] font-light max-w-xl"
        >
          Whether you're buying, selling, investing in land, or need legal support —
          reach out to the right team and we'll respond within 24 hours.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#C9A84C]/60 via-[#C9A84C]/20 to-transparent z-10" />
    </section>
  );
}
