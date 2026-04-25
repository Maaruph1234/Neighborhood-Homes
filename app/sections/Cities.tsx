"use client";
import { motion } from "framer-motion";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";
import { cities } from "../data";
import { ArrowUpRight } from "lucide-react";

export default function Cities() {
  return (
    <section id="cities" className="px-[5vw] py-28">
      <div className="flex justify-between items-end mb-14 flex-wrap gap-5">
        <FadeIn>
          <SectionLabel text="Properties" />
          <h2
            className="text-[#0B1F3A] leading-[1.05] tracking-tight"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(34px, 4vw, 54px)",
              fontWeight: 300,
            }}
          >
            Properties by <em style={{ fontStyle: "italic" }}>City</em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <a
            href="#"
            className="text-[12px] tracking-[0.1em] uppercase text-[#A8893E] border-b border-[#A8893E] pb-0.5 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors"
          >
            View All Locations
          </a>
        </FadeIn>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[260px] gap-4">
        {cities.map((city, i) => (
          <motion.div
            key={city.name}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className={`relative overflow-hidden cursor-pointer group ${
              city.span ? "lg:row-span-2" : ""
            }`}
          >
            <motion.img
              src={city.image}
              alt={city.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.6 }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/85 via-[#071629]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

            {/* Info */}
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <div className="flex items-end justify-between">
                <div>
                  <h3
                    className="text-white leading-tight mb-1"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: city.span ? "30px" : "22px",
                      fontWeight: 300,
                    }}
                  >
                    {city.name}
                  </h3>
                  <p className="text-[11px] tracking-[0.1em] uppercase text-[#E8C97A]">
                    {city.count}
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="w-9 h-9 bg-[#C9A84C] flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowUpRight size={15} className="text-[#071629]" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
