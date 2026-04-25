"use client";
import { motion } from "framer-motion";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";

const steps = [
  {
    num: "01",
    title: "Browse & Search",
    text: "Explore thousands of verified listings filtered by location, budget, and property type.",
  },
  {
    num: "02",
    title: "Speak to Our Team",
    text: "Get matched with our team — we will understand your exact needs and find the right fit.",
  },
  {
    num: "03",
    title: "Schedule a Viewing",
    text: "Tour properties in person or via immersive virtual walkthrough at your convenience.",
  },
  {
    num: "04",
    title: "Close the Deal",
    text: "Our team — alongside Neighbourhood Solicitors — handles all documentation, title verification, and finalization. You simply move in.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#071629] px-[5vw] py-28">
      <FadeIn className="text-center max-w-xl mx-auto mb-20">
        <SectionLabel text="Work Flow" centered light />
        <h2
          className="text-white leading-[1.05] tracking-tight"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(34px, 4vw, 54px)",
            fontWeight: 300,
          }}
        >
          How It <em style={{ fontStyle: "italic" }} className="text-[#E8C97A]">Works</em>
        </h2>
        <p className="text-white/40 text-[15px] leading-relaxed font-light mt-4">
          Four simple steps to your perfect property — we handle everything in between.
        </p>
      </FadeIn>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Connector line (desktop) */}
        <div
          className="hidden lg:block absolute top-7 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px"
          style={{
            background: "linear-gradient(90deg, #C9A84C 0%, rgba(201,168,76,0.15) 100%)",
          }}
        />

        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="text-center relative"
          >
            {/* Number circle */}
            <motion.div
              className="w-14 h-14 rounded-full mx-auto mb-7 flex items-center justify-center relative z-10"
              style={{
                background: "#152d4f",
                border: "1px solid rgba(201,168,76,0.3)",
              }}
              whileHover={{
                borderColor: "#C9A84C",
                boxShadow: "0 0 0 8px rgba(201,168,76,0.08)",
                transition: { duration: 0.2 },
              }}
            >
              <span
                className="text-[#C9A84C]"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "20px",
                  fontWeight: 300,
                }}
              >
                {step.num}
              </span>
            </motion.div>

            <h3 className="text-white text-[15px] font-medium mb-3 tracking-wide">
              {step.title}
            </h3>
            <p className="text-white/40 text-[13px] leading-[1.85] font-light max-w-[200px] mx-auto">
              {step.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
