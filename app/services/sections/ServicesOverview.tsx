"use client";
import { motion } from "framer-motion";
import { Home, Building2, MapPin, Settings, TrendingUp, FileText, Handshake, Users } from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionLabel from "../../components/SectionLabel";

const services = [
  { icon: Home,       id: "sales",       label: "Property Sales",                   short: "Buy or sell with expert guidance from valuation to keys." },
  { icon: Building2,  id: "offplan",     label: "Off-plan & New Builds",            short: "Invest early in premium developments before completion." },
  { icon: MapPin,     id: "land",        label: "Land Acquisition",                 short: "Verified, titled plots in Abuja, Lagos, Kaduna, and Kano." },
  { icon: Settings,   id: "management",  label: "Property Management",              short: "Full oversight of your investment — stress-free." },
  { icon: TrendingUp, id: "investment",  label: "Investment Analysis",              short: "Data-driven ROI projections to guide smart decisions." },
  { icon: FileText,   id: "legal",       label: "Legal & Documentation",            short: "All paperwork handled correctly, with Neighbourhood Solicitors." },
  { icon: Handshake,  id: "agency",      label: "Developer–Owner Agency",           short: "We connect developers with property owners ready to sell — a bridge that closes deals." },
  { icon: Users,      id: "liaison",     label: "Owner & Developer Liaison",        short: "Structured intermediary services for owners and developers navigating complex negotiations." },
];

export default function ServicesOverview() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-[#F9F6F0] px-[5vw] py-24">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-14">
          <SectionLabel text="Our Services" />
          <h2
            className="text-[#0B1F3A] leading-[1.05] tracking-tight"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(30px, 3.5vw, 46px)",
              fontWeight: 300,
            }}
          >
            Eight Ways We <em style={{ fontStyle: "italic" }}>Serve You</em>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="group text-left bg-white border border-[#0B1F3A]/10 p-7 hover:border-[#C9A84C]/40 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F9F6F0] group-hover:bg-[#C9A84C]/12 flex items-center justify-center flex-shrink-0 transition-colors duration-300 mt-0.5">
                  <s.icon
                    size={17}
                    strokeWidth={1.5}
                    className="stroke-[#0B1F3A] group-hover:stroke-[#C9A84C] transition-colors duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-[#0B1F3A] text-[17px] font-light leading-tight mb-2"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    {s.label}
                  </h3>
                  <p className="text-[#6B7280] text-[13px] leading-relaxed font-light">
                    {s.short}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-5 text-[11px] tracking-[0.1em] uppercase text-[#C9A84C] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Learn more</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
