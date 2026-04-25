"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Play } from "lucide-react";

const stats = [
  { num: "2,500+", label: "Properties Listed" },
  { num: "1,200+", label: "Happy Clients" },
  { num: "8+", label: "Years Experience" },
  { num: "4", label: "Cities Covered" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const scrollDown = () => {
    document.querySelector("#featured")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full h-screen min-h-[700px] flex flex-col justify-end overflow-hidden"
    >
      {/* Full-screen parallax background */}
      <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85"
          alt="Luxury home"
          className="w-full h-full object-cover"
        />
        {/* Deep overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071629]/90 via-[#071629]/60 to-[#071629]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/80 via-transparent to-[#071629]/30" />
      </motion.div>



      {/* Floating gold orb decorations */}
      <motion.div
        className="absolute top-1/4 right-[8%] w-64 h-64 rounded-full border border-[#C9A84C]/10 z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/4 right-[8%] w-44 h-44 rounded-full border border-[#C9A84C]/15 z-0"
        style={{ top: "calc(25% + 40px)", right: "calc(8% + 40px)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 px-[5vw] pb-24 max-w-3xl"
        style={{ opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-10 h-px bg-[#C9A84C]" />
          <span className="text-[11px] tracking-[0.22em] uppercase text-[#C9A84C]">
            Premium Real Estate
          </span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-white leading-[1.0] tracking-tight"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(52px, 7.5vw, 96px)",
              fontWeight: 300,
            }}
          >
            Find Your{" "}
            <em className="text-[#E8C97A] not-italic" style={{ fontStyle: "italic" }}>
              Perfect
            </em>
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-7">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="text-white leading-[1.0] tracking-tight"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(52px, 7.5vw, 96px)",
              fontWeight: 300,
            }}
          >
            Home With Us.
          </motion.h1>
        </div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-white/60 text-[15px] max-w-md leading-[1.85] font-light mb-12"
        >
          Nigeria's trusted real estate company — specialising in land sales, property
          brokerage, and residential development across Abuja, Lagos, Kaduna, and Kano.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex items-center gap-5 flex-wrap"
        >
          <button
            onClick={scrollDown}
            className="bg-[#C9A84C] text-[#071629] text-[12px] tracking-[0.1em] uppercase font-medium px-9 py-4 hover:bg-[#E8C97A] active:scale-95 transition-all duration-200"
          >
            Explore Properties
          </button>
          <button className="flex items-center gap-3 text-white/70 text-[13px] hover:text-white transition-colors group">
            <span className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center group-hover:border-[#C9A84C] transition-colors">
              <Play size={13} className="ml-0.5 group-hover:stroke-[#C9A84C] transition-colors" fill="currentColor" />
            </span>
            Watch Tour
          </button>
        </motion.div>
      </motion.div>

      {/* Floating stats bar */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-wrap"
        style={{
          background: "rgba(7,22,41,0.88)",
          backdropFilter: "blur(12px)",
          borderTop: "2px solid #C9A84C",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`flex-1 min-w-[120px] px-8 py-6 ${
              i < stats.length - 1 ? "border-r border-white/08" : ""
            }`}
          >
            <div
              className="text-white leading-none mb-2"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "32px",
                fontWeight: 300,
              }}
            >
              {stat.num.replace("+", "")}
              {stat.num.includes("+") && (
                <span className="text-[#C9A84C] text-[18px]">+</span>
              )}
            </div>
            <div className="text-[10px] tracking-[0.14em] uppercase text-white/40">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2 text-white/30 hover:text-[#C9A84C] transition-colors"
        aria-label="Scroll down"
      >
        <span
          className="text-[9px] tracking-[0.18em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  );
}
