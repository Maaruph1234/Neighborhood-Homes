"use client";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionLabel from "../../components/SectionLabel";

const offices = [
  {
    city: "Abuja",
    tag: "Head Office",
    address: "No 10 gimbiya Street First Floor, Garki Area 11, Abuja",
    mapPlaceholder: "https://maps.googleapis.com/maps/api/staticmap?center=No+10+gimbiya+Street+Garki+Area+11+Abuja&zoom=16&size=600x300&markers=color:red%7Clabel:H%7CNo+10+gimbiya+Street+Garki+Area+11+Abuja",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=No+10+gimbiya+Street+Garki+Area+11+Abuja",
    accent: "#C9A84C",
  },
];

export default function ContactOffices() {
  return (
    <section className="bg-[#F9F6F0] px-[5vw] py-24 border-t border-[#0B1F3A]/08">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offices.map((office, i) => (
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="bg-white border border-[#0B1F3A]/10 overflow-hidden group hover:shadow-md transition-all duration-300"
            >
              {/* Map placeholder image */}
              <div className="relative h-48 overflow-hidden bg-[#EDE8DF]">
                <motion.img
                  src={office.mapPlaceholder}
                  alt={`${office.city} office`}
                  className="w-full h-full object-cover opacity-60"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.45 }}
                />
                {/* Map overlay label */}
                <div className="absolute inset-0 bg-[#071629]/30 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin
                      size={28}
                      className="mx-auto mb-2 drop-shadow"
                      strokeWidth={1.5}
                      style={{ stroke: "#C9A84C" }}
                    />
                    <span className="text-white text-[11px] tracking-[0.14em] uppercase font-medium drop-shadow">
                      {office.city}
                    </span>
                  </div>
                </div>
                {/* Tag */}
                <div className="absolute top-3 left-3 bg-[#071629]/80 backdrop-blur-sm px-3 py-1.5">
                  <span className="text-[10px] tracking-[0.12em] uppercase text-[#C9A84C] font-medium">
                    {office.tag}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 border-t-2 border-transparent group-hover:border-[#C9A84C] transition-colors duration-300">
                <h3
                  className="text-[#0B1F3A] text-[22px] font-light mb-3"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  {office.city}
                </h3>
                <div className="flex items-start gap-2.5 mb-5">
                  <MapPin size={13} strokeWidth={1.5} className="stroke-[#C9A84C] flex-shrink-0 mt-0.5" />
                  <p className="text-[13px] text-[#6B7280] font-light leading-relaxed">
                    {office.address}
                  </p>
                </div>
                <a
                  href={office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase text-[#A8893E] font-medium hover:text-[#C9A84C] transition-colors group/link"
                >
                  Get Directions
                  <ArrowUpRight
                    size={12}
                    className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 h-72 border border-[#0B1F3A]/10 overflow-hidden"
        >
          <iframe
            title="Neighbourhood Homes - Head Office"
            src="https://www.google.com/maps?q=No+10+gimbiya+Street+Garki+Area+11+Abuja&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
