"use client";
import { motion } from "framer-motion";
import { MapPin, Heart, Bed, Bath, Maximize } from "lucide-react";
import { useState } from "react";

interface Property {
  id: number;
  name: string;
  location: string;
  price: string;
  per?: string;
  badge: string;
  badgeType: "sale" | "land" | "construction";
  type: "house" | "land";
  city: string;
  beds: number;
  baths: number;
  sqm: number;
  image: string;
}

const badgeStyles: Record<string, string> = {
  sale: "bg-[#C9A84C] text-[#071629]",
  land: "bg-[#1A4B8C] text-white",
  construction: "bg-[#0B1F3A] text-white",
};

export default function PropertyCard({
  property,
  index = 0,
}: {
  property: Property;
  index?: number;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="bg-white border border-[#0B1F3A]/10 overflow-hidden cursor-pointer group"
      style={{ boxShadow: "0 1px 3px rgba(11,31,58,0.07)" }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6 }}
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/70 via-transparent to-transparent opacity-80" />

        {/* Badge */}
        <span
          className={`absolute top-4 left-4 text-[10px] tracking-[0.1em] uppercase font-medium px-3 py-1.5 ${
            badgeStyles[property.badgeType]
          }`}
        >
          {property.badge}
        </span>

        {/* Save button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSaved(!saved);
          }}
          className="absolute top-4 right-4 w-8 h-8 bg-white flex items-center justify-center transition-all hover:bg-[#C9A84C] group/heart"
          aria-label="Save property"
        >
          <Heart
            size={13}
            className={`transition-colors ${
              saved ? "fill-[#C9A84C] stroke-[#C9A84C]" : "stroke-[#0B1F3A] group-hover/heart:stroke-[#071629]"
            }`}
          />
        </button>

        {/* Price */}
        <div className="absolute bottom-4 left-4 bg-[#071629]/85 backdrop-blur-sm px-4 py-2">
          <span
            className="text-white font-serif text-xl font-light leading-none"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {property.price}
          </span>
          {property.per && (
            <span className="text-white/55 text-[10px] ml-1">{property.per}</span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <h3
          className="text-[#0B1F3A] text-[19px] font-light leading-tight mb-1"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          {property.name}
        </h3>
        <div className="flex items-center gap-1.5 text-[#6B7280] text-[12px] mb-5">
          <MapPin size={11} className="stroke-[#C9A84C]" />
          {property.location}
        </div>

        {/* Specs */}
        <div className="flex border-t border-[#0B1F3A]/08 pt-4">
          {property.type === "land" ? (
            <div className="flex-1 text-center">
              <div className="flex items-center justify-center gap-1 text-[#6B7280] mb-0.5">
                <Maximize size={13} />
                <span className="text-[14px] font-medium text-[#0B1F3A]">{property.sqm.toLocaleString()}</span>
              </div>
              <div className="text-[10px] tracking-[0.08em] uppercase text-[#9CA3AF]">sqm plot</div>
            </div>
          ) : (
            [
              { icon: <Bed size={13} />, val: property.beds, key: "Beds" },
              { icon: <Bath size={13} />, val: property.baths, key: "Baths" },
              { icon: <Maximize size={13} />, val: property.sqm, key: "sqm" },
            ].map((spec, i) => (
              <div
                key={i}
                className={`flex-1 text-center ${i < 2 ? "border-r border-[#0B1F3A]/08" : ""}`}
              >
                <div className="flex items-center justify-center gap-1 text-[#6B7280] mb-0.5">
                  {spec.icon}
                  <span className="text-[14px] font-medium text-[#0B1F3A]">{spec.val}</span>
                </div>
                <div className="text-[10px] tracking-[0.08em] uppercase text-[#9CA3AF]">
                  {spec.key}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
