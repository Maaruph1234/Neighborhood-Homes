"use client";
import { motion } from "framer-motion";
import FadeIn from "../../components/FadeIn";
import SectionLabel from "../../components/SectionLabel";

export default function TeamPreview() {
  return (
    <section className="px-[5vw] py-28 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="max-w-2xl">
          <SectionLabel text="Our People" />
          <h2
            className="text-[#0B1F3A] leading-[1.05] tracking-tight mb-5"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 300,
            }}
          >
            A Small Team,{" "}
            <em style={{ fontStyle: "italic" }}>Big Commitment.</em>
          </h2>
          <p className="text-[#6B7280] text-[15px] font-light leading-[1.85] max-w-xl">
            Neighbourhood Homes Ecosystem Ltd is a boutique real estate firm. We are
            a small, dedicated team — which means every client gets direct access to
            the people making decisions. No middlemen, no call centres, no chasing.
            Just honest, expert service from people who genuinely care about your outcome.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-0 border border-[#0B1F3A]/10">
            {[
              { num: "4", label: "Cities Covered" },
              { num: "100%", label: "Client Focus" },
              { num: "Direct", label: "Access to Decision Makers" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`py-8 px-6 text-center bg-white ${
                  i < 2 ? "border-b sm:border-b-0 sm:border-r border-[#0B1F3A]/10" : ""
                }`}
              >
                <div
                  className="text-[#0B1F3A] leading-none mb-2"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "38px",
                    fontWeight: 300,
                  }}
                >
                  {stat.num}
                </div>
                <div className="text-[11px] tracking-[0.12em] uppercase text-[#9CA3AF] font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
