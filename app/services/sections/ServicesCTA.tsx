"use client";
import { motion } from "framer-motion";
import { Phone, Calendar } from "lucide-react";
import FadeIn from "../../components/FadeIn";

export default function ServicesCTA() {
  return (
    <section className="bg-[#F9F6F0] px-[5vw] py-24 border-t border-[#0B1F3A]/08">
      <FadeIn className="max-w-5xl mx-auto text-center mb-14">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-9 h-px bg-[#C9A84C]" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#A8893E]">Get Started</span>
          <div className="w-9 h-px bg-[#C9A84C]" />
        </div>
        <h2
          className="text-[#0B1F3A] leading-[1.08] tracking-tight mb-4"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(30px, 4vw, 50px)",
            fontWeight: 300,
          }}
        >
          Ready to Take the{" "}
          <em style={{ fontStyle: "italic" }}>Next Step?</em>
        </h2>
        <p className="text-[#6B7280] text-[15px] leading-relaxed font-light max-w-xl mx-auto">
          Whether you know exactly what you need or you're still figuring it out —
          our team is here to help. No pressure, no obligation.
        </p>
      </FadeIn>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-[#0B1F3A] p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#C9A84C]" />
          <div className="w-10 h-10 bg-[#C9A84C]/15 flex items-center justify-center mb-6">
            <Phone size={16} strokeWidth={1.5} className="stroke-[#C9A84C]" />
          </div>
          <h3
            className="text-white text-[22px] font-light leading-tight mb-3"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Speak to our team
          </h3>
          <p className="text-white/50 text-[13px] leading-relaxed font-light mb-8">
            Call us directly and speak with a specialist within minutes. We're available
            across all three locations.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#C9A84C] text-[#071629] text-[12px] tracking-[0.1em] uppercase font-medium px-8 py-3.5 hover:bg-[#E8C97A] transition-colors"
          >
            Call Our Team
          </a>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-white border border-[#0B1F3A]/10 p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#0B1F3A]/15" />
          <div className="w-10 h-10 bg-[#0B1F3A]/06 flex items-center justify-center mb-6">
            <Calendar size={16} strokeWidth={1.5} className="stroke-[#0B1F3A]" />
          </div>
          <h3
            className="text-[#0B1F3A] text-[22px] font-light leading-tight mb-3"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Schedule a free consultation
          </h3>
          <p className="text-[#6B7280] text-[13px] leading-relaxed font-light mb-8">
            Book a time that works for you — in person or virtual — and we'll walk you
            through whatever service you need at your own pace.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#0B1F3A] text-white text-[12px] tracking-[0.1em] uppercase font-medium px-8 py-3.5 hover:bg-[#1A4B8C] transition-colors"
          >
            Book a Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
