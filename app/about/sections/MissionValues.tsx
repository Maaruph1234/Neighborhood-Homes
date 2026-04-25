"use client";
import { motion } from "framer-motion";
import { Eye, Heart, Scale, Zap } from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionLabel from "../../components/SectionLabel";

const values = [
  { icon: Scale, title: "Integrity", text: "Honest and transparent in every transaction." },
  { icon: Zap, title: "Excellence", text: "Delivering quality beyond expectations." },
  { icon: Heart, title: "Trust", text: "Building relationships that last beyond the deal." },
  { icon: Eye, title: "Innovation", text: "Embracing modern solutions in real estate." },
  { icon: Scale, title: "Community", text: "Committed to the growth of the people and places we serve." },
];

export default function MissionValues() {
  return (
    <section className="bg-[#F9F6F0] px-[5vw] py-28">
      <div className="max-w-7xl mx-auto">

        {/* Mission statement — full width */}
        <FadeIn className="max-w-4xl mx-auto text-center mb-24">
          <SectionLabel text="Our Mission" centered />
          <blockquote
            className="text-[#0B1F3A] leading-[1.25] tracking-tight"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(26px, 3.5vw, 44px)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            To provide reliable, innovative, and client-centered real estate services that create lasting value for property buyers, sellers, and investors across Nigeria.
          </blockquote>
          <div className="mt-6 text-[15px] text-[#6B7280] font-light">
            <p><strong>Vision:</strong> To be Nigeria's most trusted real estate brand — recognized for excellence, innovation, integrity, and the transformation of communities through quality property development.</p>
          </div>
          <div className="w-16 h-px bg-[#C9A84C] mx-auto mt-6" />
        </FadeIn>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#0B1F3A]/10">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`bg-white p-10 group hover:bg-[#0B1F3A] transition-colors duration-300 ${
                i < 3 ? "border-r border-[#0B1F3A]/10" : ""
              }`}
            >
              <div className="w-11 h-11 bg-[#F9F6F0] group-hover:bg-[#C9A84C]/15 flex items-center justify-center mb-6 transition-colors duration-300">
                <value.icon
                  size={18}
                  strokeWidth={1.5}
                  className="stroke-[#0B1F3A] group-hover:stroke-[#C9A84C] transition-colors duration-300"
                />
              </div>
              <h3
                className="text-[#0B1F3A] group-hover:text-white text-[18px] font-light leading-tight mb-3 transition-colors duration-300"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                {value.title}
              </h3>
              <p className="text-[#6B7280] group-hover:text-white/50 text-[13px] leading-[1.85] font-light transition-colors duration-300">
                {value.text}
              </p>
              <div className="w-0 group-hover:w-8 h-px bg-[#C9A84C] mt-6 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
