"use client";
import { motion } from "framer-motion";
import { Home, Settings, MapPin, TrendingUp, FileText, Building2 } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";

const services = [
  {
    icon: Home,
    title: "Property Sales",
    text: "Expert guidance through the entire buying and selling process, from valuation to title transfer.",
  },
  {
    icon: Building2,
    title: "Off-plan & New Developments",
    text: "Secure units in premium off-plan projects in Abuja, Lagos, Kaduna, and Kano before completion.",
  },
  {
    icon: MapPin,
    title: "Land Acquisition",
    text: "Identify, verify, and secure prime land in Nigeria's fastest-growing districts with full confidence.",
  },
  {
    icon: Settings,
    title: "Property Management",
    text: "Comprehensive management of your investment properties — maintenance, oversight, and value preservation.",
  },
  {
    icon: TrendingUp,
    title: "Investment Analysis",
    text: "Data-driven market analysis and ROI projections to help you make smarter property investments.",
  },
  {
    icon: FileText,
    title: "Legal & Documentation",
    text: "Seamless handling of all property documentation, due diligence, and legal compliance services.",
  },
];

export default function Services() {
  return (
    <section id="services" className="px-[5vw] py-28">
      <FadeIn className="text-center max-w-xl mx-auto mb-16">
        <SectionLabel text="What We Do" centered />
        <h2
          className="text-[#0B1F3A] leading-[1.05] tracking-tight"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(34px, 4vw, 54px)",
            fontWeight: 300,
          }}
        >
          Our <em style={{ fontStyle: "italic" }}>Services</em>
        </h2>
        <p className="text-[#6B7280] text-[15px] leading-relaxed font-light mt-4">
          End-to-end real estate solutions designed to make your property journey seamless.
        </p>
      </FadeIn>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{ border: "1px solid rgba(11,31,58,0.1)", gap: "1px", background: "rgba(11,31,58,0.1)" }}
      >
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="group bg-white hover:bg-[#0B1F3A] transition-colors duration-300 cursor-default p-12"
          >
            <div className="w-12 h-12 bg-[#F9F6F0] group-hover:bg-[#C9A84C]/20 flex items-center justify-center mb-6 transition-colors duration-300">
              <service.icon
                size={20}
                strokeWidth={1.5}
                className="stroke-[#0B1F3A] group-hover:stroke-[#C9A84C] transition-colors duration-300"
              />
            </div>
            <h3
              className="text-[#0B1F3A] group-hover:text-white text-[20px] font-light leading-tight mb-3 transition-colors duration-300"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              {service.title}
            </h3>
            <p className="text-[#6B7280] group-hover:text-white/50 text-[13px] leading-[1.85] font-light transition-colors duration-300">
              {service.text}
            </p>

            {/* Gold accent line on hover */}
            <div className="w-0 group-hover:w-8 h-px bg-[#C9A84C] mt-6 transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
