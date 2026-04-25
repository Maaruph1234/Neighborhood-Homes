"use client";
import { motion } from "framer-motion";
import { Phone, Scale } from "lucide-react";
import FadeIn from "../../components/FadeIn";

export default function AboutCTA() {
  return (
    <section className="bg-white px-[5vw] py-28 border-t border-[#0B1F3A]/08">
      <FadeIn className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Homes CTA */}
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
              Ready to find your property?
            </h3>
            <p className="text-white/50 text-[13px] leading-relaxed font-light mb-8">
              Speak directly with our team today. We will match you with the right
              property across Abuja, Lagos, Kaduna, or Kano.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#C9A84C] text-[#071629] text-[12px] tracking-[0.1em] uppercase font-medium px-8 py-3.5 hover:bg-[#E8C97A] transition-colors"
            >
              Contact Our Team
            </a>
          </motion.div>

          {/* Solicitors CTA */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-[#F9F6F0] border border-[#0B1F3A]/10 p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#1A4B8C]" />
            <div className="w-10 h-10 bg-[#1A4B8C]/10 flex items-center justify-center mb-6">
              <Scale size={16} strokeWidth={1.5} className="stroke-[#1A4B8C]" />
            </div>
            <h3
              className="text-[#0B1F3A] text-[22px] font-light leading-tight mb-3"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Need legal support for your transaction?
            </h3>
            <p className="text-[#6B7280] text-[13px] leading-relaxed font-light mb-8">
              Neighbourhood Solicitors is an independent law firm handling all property
              documentation, title verification, and legal compliance.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#0B1F3A] text-white text-[12px] tracking-[0.1em] uppercase font-medium px-8 py-3.5 hover:bg-[#1A4B8C] transition-colors"
            >
              Reach the Solicitors
            </a>
          </motion.div>

        </div>
      </FadeIn>
    </section>
  );
}
