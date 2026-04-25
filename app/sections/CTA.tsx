"use client";
import { motion } from "framer-motion";
import FadeIn from "../components/FadeIn";

export default function CTA() {
  return (
    <section
      id="cta"
      className="relative px-[5vw] py-36 overflow-hidden text-center"
      style={{
        background: "linear-gradient(135deg, #071629 0%, #1A4B8C 100%)",
      }}
    >
      {/* Decorative rings */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-[#C9A84C]/10 pointer-events-none"
      />
      <div
        className="absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full border border-[#C9A84C]/08 pointer-events-none"
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#C9A84C]/05 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      <FadeIn className="relative z-10 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-9 h-px bg-[#C9A84C]/60" />
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#C9A84C]/80">Get Started</span>
          <div className="w-9 h-px bg-[#C9A84C]/60" />
        </div>

        <h2
          className="text-white leading-[1.05] tracking-tight mb-5"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(38px, 6vw, 70px)",
            fontWeight: 300,
          }}
        >
          Ready to Find Your{" "}
          <br />
          <em style={{ fontStyle: "italic" }} className="text-[#E8C97A]">
            Dream Home?
          </em>
        </h2>
        <p className="text-white/50 text-[15px] leading-[1.85] font-light max-w-lg mx-auto mb-12">
          Let our team guide you to the perfect property. Book a free
          consultation today — no obligations.
        </p>

        <div className="flex justify-center gap-5 flex-wrap">
          <motion.a
            href="tel:+2348001234567"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#C9A84C] text-[#071629] text-[12px] tracking-[0.1em] uppercase font-medium px-10 py-4 hover:bg-[#E8C97A] transition-colors"
          >
            Call Us Now
          </motion.a>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="border border-white/30 text-white text-[12px] tracking-[0.1em] uppercase font-light px-10 py-4 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
          >
            Schedule Online
          </motion.a>
        </div>
        <p className="text-white/25 text-[12px] mt-8 font-light">
          Need legal support?{" "}
          <a href="/about" className="text-[#1A4B8C] hover:text-[#2563B0] transition-colors underline underline-offset-2">
            Neighbourhood Solicitors
          </a>{" "}
          handles all property documentation and title verification.
        </p>
      </FadeIn>
    </section>
  );
}
