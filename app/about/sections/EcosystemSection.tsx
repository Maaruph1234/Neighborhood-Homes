"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Home, Scale } from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionLabel from "../../components/SectionLabel";

const entities = [
  {
    icon: Home,
    tag: "Real Estate",
    name: "Neighbourhood Homes",
    sub: "Ecosystem Ltd.",
    description:
      "Our flagship company. We source, list, and sell residential houses, land, and off-plan developments across Abuja, Lagos, Kaduna, and Kano. We also bridge developers and property owners through our agency and liaison services — from first enquiry to handing over the keys.",
    services: [
      "Property Sales",
      "Land Acquisition",
      "Off-plan Developments",
      "Property Management",
      "Investment Consulting",
      "Developer–Owner Agency",
      "Owner & Developer Liaison",
    ],
    cta: "View Properties",
    ctaHref: "/properties",
    accent: "#C9A84C",
    dark: true,
  },
  {
    icon: Scale,
    tag: "Legal Services",
    name: "Neighbourhood Solicitors",
    sub: "",
    description:
      "An independent law firm and trusted partner of Neighbourhood Homes. They provide comprehensive legal support for property transactions — title searches, deed of assignment, C of O processing, due diligence, and dispute resolution.",
    services: [
      "Title Verification & Search",
      "Deed of Assignment",
      "C of O Processing",
      "Property Due Diligence",
      "Dispute Resolution",
    ],
    cta: "Contact the Firm",
    ctaHref: "/contact",
    accent: "#1A4B8C",
    dark: false,
  },
];

export default function EcosystemSection() {
  return (
    <section className="bg-[#071629] px-[5vw] py-28">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <FadeIn className="max-w-2xl mb-16">
          <SectionLabel text="The Ecosystem" light />
          <h2
            className="text-white leading-[1.05] tracking-tight mb-5"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 300,
            }}
          >
            One Vision,{" "}
            <em style={{ fontStyle: "italic" }} className="text-[#E8C97A]">
              Two Experts.
            </em>
          </h2>
          <p className="text-white/50 text-[15px] leading-[1.85] font-light">
            The Neighbourhood brand brings together two independent entities — each
            expert in their field — to give you a seamless, fully supported property
            journey from discovery, developer matching, and liaison support, through to
            legal completion.
          </p>
        </FadeIn>

        {/* Entity cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {entities.map((entity, i) => (
            <motion.div
              key={entity.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.15 }}
              className="relative bg-[#0B1F3A] border border-white/06 p-10 flex flex-col"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: entity.accent }}
              />

              {/* Tag */}
              <div
                className="inline-flex items-center gap-2 self-start mb-6 px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase font-medium"
                style={{
                  background: `${entity.accent}20`,
                  color: entity.accent,
                }}
              >
                <entity.icon size={11} strokeWidth={2} />
                {entity.tag}
              </div>

              {/* Name */}
              <h3
                className="text-white leading-[1.1] mb-1"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(24px, 3vw, 34px)",
                  fontWeight: 300,
                }}
              >
                {entity.name}
              </h3>
              {entity.sub && (
                <p
                  className="text-[10px] tracking-[0.18em] uppercase mb-6"
                  style={{ color: entity.accent }}
                >
                  {entity.sub}
                </p>
              )}
              {!entity.sub && <div className="mb-6" />}

              <p className="text-white/50 text-[14px] leading-[1.85] font-light mb-8">
                {entity.description}
              </p>

              {/* Services list */}
              <ul className="space-y-2 mb-10 flex-1">
                {entity.services.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-[13px] text-white/60 font-light">
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: entity.accent }}
                    />
                    {s}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={entity.ctaHref}
                className="self-start flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase font-medium transition-all duration-200 group"
                style={{ color: entity.accent }}
              >
                {entity.cta}
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Ecosystem connector bar */}
        <FadeIn delay={0.2}>
          <div className="border border-white/08 p-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-5 flex-wrap justify-center sm:justify-start">
              <div className="text-center sm:text-left">
                <div
                  className="text-white text-[15px] font-light"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  Neighbourhood Homes
                </div>
                <div className="text-[10px] tracking-widest uppercase text-[#C9A84C]">Ecosystem Ltd.</div>
              </div>
              <div className="text-white/20 text-[20px] font-light hidden sm:block">+</div>
              <div className="text-center sm:text-left">
                <div
                  className="text-white text-[15px] font-light"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  Neighbourhood Solicitors
                </div>
                <div className="text-[10px] tracking-widest uppercase text-[#1A4B8C]">Independent Legal Partner</div>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-white/30 text-[12px] font-light leading-relaxed max-w-xs">
                Together we provide a complete, trusted path — from property search and developer introductions to legal completion — all under the Neighbourhood name.
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
