"use client";
import { motion } from "framer-motion";
import FadeIn from "../../components/FadeIn";
import SectionLabel from "../../components/SectionLabel";

const milestones = [
  {
    year: "2017",
    title: "The Beginning",
    text: "Neighbourhood Homes Ecosystem Ltd was founded in Abuja with a small but passionate team and a commitment to honest real estate.",
  },
  {
    year: "2018",
    title: "First Major Sales",
    text: "Closed our first high-value transactions in Maitama and Asokoro, establishing our reputation for premium residential sales.",
  },
  {
    year: "2019",
    title: "Lagos Expansion",
    text: "Extended operations to Lagos — bringing our standards to Victoria Island, Ikoyi, and Lekki's competitive property market.",
  },
  {
    year: "2020",
    title: "Land Division Launched",
    text: "Formally launched our land acquisition division, helping investors and families secure verified, titled plots across key locations.",
  },
  {
    year: "2021",
    title: "Northern Expansion",
    text: "Expanded into northern Nigeria — Kaduna and Kano — bringing our trusted service to two of the fastest-growing property markets in the country.",
  },
  {
    year: "2022",
    title: "The Ecosystem Forms",
    text: "Formalised our partnership with Neighbourhood Solicitors, creating a true end-to-end property ecosystem for our clients.",
  },
  {
    year: "2023",
    title: "Off-plan Portfolio",
    text: "Launched our first off-plan developments, giving buyers the opportunity to invest early and build equity from the ground up.",
  },
  {
    year: "Today",
    title: "Growing Strong",
    text: "With active listings across three cities, a trusted legal partner, and hundreds of completed transactions — we're just getting started.",
  },
];

export default function Timeline() {
  return (
    <section className="px-[5vw] py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-16">
          <SectionLabel text="Our Journey" />
          <h2
            className="text-[#0B1F3A] leading-[1.05] tracking-tight"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 300,
            }}
          >
            How We Got <em style={{ fontStyle: "italic" }}>Here</em>
          </h2>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-[#0B1F3A]/08 hidden lg:block" />

          <div className="space-y-0">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className={`relative grid grid-cols-1 lg:grid-cols-2 gap-0 ${
                    i < milestones.length - 1 ? "" : ""
                  }`}
                >
                  {/* Left content or spacer */}
                  <div
                    className={`py-10 ${
                      isLeft
                        ? "lg:pr-16 text-left lg:text-right"
                        : "hidden lg:block"
                    }`}
                  >
                    {isLeft && (
                      <TimelineCard year={m.year} title={m.title} text={m.text} isHighlight={m.year === "Today"} />
                    )}
                  </div>

                  {/* Centre dot */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-10 z-10 items-center justify-center">
                    <motion.div
                      className={`w-4 h-4 rounded-full border-2 ${
                        m.year === "Today"
                          ? "bg-[#C9A84C] border-[#C9A84C]"
                          : "bg-white border-[#C9A84C]/60"
                      }`}
                      whileInView={{ scale: [0.5, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  {/* Right content or spacer */}
                  <div
                    className={`py-10 ${
                      !isLeft
                        ? "lg:pl-16"
                        : "hidden lg:block"
                    }`}
                  >
                    {!isLeft && (
                      <TimelineCard year={m.year} title={m.title} text={m.text} isHighlight={m.year === "Today"} />
                    )}
                  </div>

                  {/* Mobile: always show */}
                  <div className="lg:hidden col-span-1 pb-10 border-l-2 border-[#C9A84C]/20 pl-6 ml-4 relative">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-[#C9A84C]/60" />
                    <TimelineCard year={m.year} title={m.title} text={m.text} isHighlight={m.year === "Today"} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  year, title, text, isHighlight,
}: {
  year: string;
  title: string;
  text: string;
  isHighlight: boolean;
}) {
  return (
    <div className={`inline-block max-w-sm ${isHighlight ? "bg-[#0B1F3A] p-7" : ""}`}>
      <div
        className={`text-[11px] tracking-[0.18em] uppercase font-medium mb-2 ${
          isHighlight ? "text-[#C9A84C]" : "text-[#C9A84C]"
        }`}
      >
        {year}
      </div>
      <h3
        className={`text-[18px] font-light leading-tight mb-2 ${
          isHighlight ? "text-white" : "text-[#0B1F3A]"
        }`}
        style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
      >
        {title}
      </h3>
      <p
        className={`text-[13px] leading-[1.8] font-light ${
          isHighlight ? "text-white/60" : "text-[#6B7280]"
        }`}
      >
        {text}
      </p>
    </div>
  );
}
