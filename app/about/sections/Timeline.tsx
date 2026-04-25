"use client";
import { motion } from "framer-motion";
import FadeIn from "../../components/FadeIn";
import SectionLabel from "../../components/SectionLabel";

const milestones = [
  { year: '2018', title: 'Founded', text: 'Established in Abuja with a commitment to honest, premium real estate.' },
  { year: '2019', title: 'First Sales', text: 'Closed high-value residential transactions, building trust in our process.' },
  { year: '2020', title: 'Lagos Launch', text: 'Expanded to Lagos to serve Victoria Island, Ikoyi and Lekki.' },
  { year: '2021', title: 'Land Division', text: 'Launched land acquisition services for verified, titled plots.' },
  { year: '2022', title: 'Northern Reach', text: 'Entered Kaduna and Kano markets with trusted local partners.' },
  { year: '2023', title: 'Ecosystem', text: 'Partnered with Neighbourhood Solicitors for end-to-end service.' },
  { year: '2024', title: 'Off-plan', text: 'Began off-plan developments, inviting early investor participation.' },
  { year: 'Today', title: '8+ years', text: "Over 8 years of trusted property experience across major Nigerian cities." },
];

export default function Timeline() {
  return (
    <section className="px-[5vw] py-24 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-12 md:mb-16">
          <SectionLabel text="Our Journey" />
          <h2
            className="text-[#0B1F3A] leading-[1.05] tracking-tight"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(28px, 3.6vw, 52px)",
              fontWeight: 300,
            }}
          >
            8+ Years of <em style={{ fontStyle: "italic" }}>Experience</em>
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
                  initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.04 }}
                  className={`relative grid grid-cols-1 lg:grid-cols-2 gap-0`}
                >
                  {/* Left content or spacer */}
                  <div
                    className={`py-8 md:py-10 ${
                      isLeft
                        ? "lg:pr-20 text-left lg:text-right"
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
                      initial={{ scale: 0.6 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45 }}
                    />
                  </div>

                  {/* Right content or spacer */}
                  <div
                    className={`py-8 md:py-10 ${
                      !isLeft
                        ? "lg:pl-20"
                        : "hidden lg:block"
                    }`}
                  >
                    {!isLeft && (
                      <TimelineCard year={m.year} title={m.title} text={m.text} isHighlight={m.year === "Today"} />
                    )}
                  </div>

                  {/* Mobile: always show */}
                  <div className="lg:hidden col-span-1 pb-8 border-l-2 border-[#C9A84C]/20 pl-6 ml-4 relative">
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
