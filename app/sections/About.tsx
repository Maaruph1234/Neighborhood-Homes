"use client";
import { motion } from "framer-motion";
import { Home, Shield, MapPin, Clock } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";

const features = [
  {
    icon: Home,
    title: "Premium Listings",
    text: "Only the finest properties, verified and curated by our expert team.",
  },
  {
    icon: Shield,
    title: "Trusted Agency",
    text: "Licensed, regulated, and trusted by hundreds of happy clients.",
  },
  {
    icon: MapPin,
    title: "Land & Off-plan",
    text: "Prime plots and off-plan developments across Abuja, Lagos, Kaduna, and Kano.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    text: "Our dedicated team is always available to assist you at every step.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20 px-[5vw] py-28"
      style={{ background: "#F9F6F0" }}
    >
      {/* Images */}
      <FadeIn direction="left" className="relative h-[520px]">
        {/* Main image */}
        <motion.div
          className="absolute left-0 top-0 w-[75%] h-[85%] overflow-hidden"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
            alt="Luxury interior"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Accent image */}
        <motion.div
          className="absolute right-0 bottom-0 w-[48%] h-[55%] overflow-hidden"
          style={{ border: "6px solid #F9F6F0", outline: "1px solid rgba(201,168,76,0.25)" }}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"
            alt="Property exterior"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </FadeIn>

      {/* Content */}
      <FadeIn direction="right" delay={0.15}>
        <SectionLabel text="Who We Are" />
        <h2
          className="text-[#0B1F3A] leading-[1.08] tracking-tight mb-5"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(32px, 4vw, 50px)",
            fontWeight: 300,
          }}
        >
          Neighbourhood Homes{" "}
          <em style={{ fontStyle: "italic" }}>Ecosystem</em>
        </h2>
        <p className="text-[#6B7280] text-[15px] leading-[1.85] font-light max-w-[500px] mb-10">
          Neighbourhood Homes Ecosystems Limited is a Nigerian real estate company
          specialising in land sales, property brokerage, and the development of
          residential and commercial properties — committed to delivering trusted,
          transparent, and value-driven solutions across Nigeria.
        </p>

        <div className="grid grid-cols-2 gap-7 mb-10">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="flex gap-4 items-start"
            >
              <div className="w-10 h-10 bg-[#0B1F3A] flex items-center justify-center flex-shrink-0 mt-0.5">
                <f.icon size={16} className="stroke-[#C9A84C]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[14px] font-medium text-[#0B1F3A] mb-1">{f.title}</div>
                <div className="text-[13px] text-[#6B7280] leading-relaxed font-light">{f.text}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ x: 4 }}
          className="bg-[#0B1F3A] text-white text-[12px] tracking-[0.1em] uppercase font-medium px-9 py-4 hover:bg-[#1A4B8C] transition-colors duration-200"
        >
          Discover Our Story
        </motion.button>
      </FadeIn>
    </section>
  );
}
