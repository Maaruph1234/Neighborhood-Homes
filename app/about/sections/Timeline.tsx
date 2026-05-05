"use client";
import { motion } from "framer-motion";
import FadeIn from "../../components/FadeIn";
import SectionLabel from "../../components/SectionLabel";

const milestones = [
  {
    year: "2017",
    title: "The Beginning",
    text: "Neighbourhood Homes Ecosystem Ltd was founded in Abuja with a small but passionate team and a commitment to honest real estate.",
    accent: "#C9A84C",
  },
  {
    year: "2018",
    title: "First Major Sales",
    text: "Closed our first high-value transactions in Maitama and Asokoro, establishing our reputation for premium residential sales.",
    accent: "#1A4B8C",
  },
  {
    year: "2019",
    title: "Lagos Expansion",
    text: "Extended operations to Lagos — bringing our standards to Victoria Island, Ikoyi, and Lekki's competitive property market.",
    accent: "#C9A84C",
  },
  {
    year: "2020",
    title: "Land Division Launched",
    text: "Formally launched our land acquisition division, helping investors and families secure verified, titled plots across key locations.",
    accent: "#1A4B8C",
  },
  {
    year: "2021",
    title: "Northern Expansion",
    text: "Expanded into northern Nigeria — Kaduna and Kano — bringing our trusted service to two of the fastest-growing property markets in the country.",
    accent: "#C9A84C",
  },
  {
    year: "2022",
    title: "The Ecosystem Forms",
    text: "Formalised our partnership with Neighbourhood Solicitors, creating a true end-to-end property ecosystem for our clients.",
    accent: "#1A4B8C",
  },
  {
    year: "2023",
    title: "Off-plan Portfolio",
    text: "Launched our first off-plan developments, giving buyers the opportunity to invest early and build equity from the ground up.",
    accent: "#C9A84C",
  },
  {
    year: "Today",
    title: "Growing Strong",
    text: "With active listings across four cities, a trusted legal partner, and hundreds of completed transactions — we're just getting started.",
    accent: "#C9A84C",
    isToday: true,
  },
];

export default function Timeline() {
  return (
    <section className="px-[5vw] py-28 bg-[#071629] overflow-hidden relative">
      {/* subtle background texture lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 80px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn className="mb-20">
          <SectionLabel text="Our Journey" light />
          <h2
            className="text-white leading-[1.05] tracking-tight"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 300,
            }}
          >
            How We Got{" "}
            <em style={{ fontStyle: "italic" }} className="text-[#E8C97A]">Here</em>
          </h2>
        </FadeIn>

        {/* Desktop: alternating two-column timeline */}
        <div className="relative hidden lg:block">
          {/* Central spine */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A84C]/60 via-[#C9A84C]/30 to-[#C9A84C]/10" />

          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.05 }}
                className="relative grid grid-cols-2 mb-2"
              >
                {/* Left cell */}
                <div className={`py-8 ${isLeft ? "pr-16" : "pr-16 invisible"}`}>
                  {isLeft && <TimelineCard m={m} align="right" />}
                </div>

                {/* Centre dot + year bubble */}
                <div className="absolute left-1/2 -translate-x-1/2 top-8 z-10 flex flex-col items-center gap-2">
                  <motion.div
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    style={{
                      background: m.isToday ? m.accent : "#071629",
                      borderColor: m.accent,
                      boxShadow: `0 0 12px ${m.accent}50`,
                    }}
                  >
                    {m.isToday && <div className="w-2 h-2 rounded-full bg-[#071629]" />}
                  </motion.div>
                  <div
                    className="text-[10px] tracking-[0.14em] uppercase font-semibold px-2 py-0.5"
                    style={{ color: m.accent, background: `${m.accent}18`, border: `1px solid ${m.accent}40` }}
                  >
                    {m.year}
                  </div>
                </div>

                {/* Right cell */}
                <div className={`py-8 ${!isLeft ? "pl-16" : "pl-16 invisible"}`}>
                  {!isLeft && <TimelineCard m={m} align="left" />}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: vertical list */}
        <div className="lg:hidden flex flex-col gap-0">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="relative pl-10 pb-10"
            >
              {/* Spine */}
              {i < milestones.length - 1 && (
                <div className="absolute left-[9px] top-5 bottom-0 w-px bg-[#C9A84C]/20" />
              )}
              {/* Dot */}
              <div
                className="absolute left-0 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                style={{ background: m.isToday ? m.accent : "#071629", borderColor: m.accent }}
              />
              <div
                className="text-[10px] tracking-[0.14em] uppercase font-semibold mb-2"
                style={{ color: m.accent }}
              >
                {m.year}
              </div>
              <TimelineCard m={m} align="left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ m, align }: { m: typeof milestones[0]; align: "left" | "right" }) {
  return (
    <div
      className={`relative p-7 border max-w-sm ${align === "right" ? "ml-auto" : ""} ${
        m.isToday ? "border-[#C9A84C]/50 bg-[#C9A84C]/08" : "border-white/08 bg-white/04"
      }`}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 h-0.5 w-12 transition-all duration-300"
        style={{ background: m.accent }}
      />
      <h3
        className="text-white text-[19px] font-light leading-tight mb-3"
        style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
      >
        {m.title}
      </h3>
      <p className="text-white/45 text-[13px] leading-[1.8] font-light">
        {m.text}
      </p>
      {m.isToday && (
        <div className="mt-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
          <span className="text-[10px] tracking-[0.14em] uppercase text-[#C9A84C]">Present day</span>
        </div>
      )}
    </div>
  );
}
