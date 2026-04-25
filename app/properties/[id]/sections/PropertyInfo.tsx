"use client";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Maximize, Check, Scale, ArrowUpRight } from "lucide-react";

type Property = {
  id: number;
  name: string;
  location: string;
  city: string;
  price: string;
  per?: string;
  badge: string;
  badgeType: string;
  type: "house" | "land";
  beds: number;
  baths: number;
  sqm: number;
};

const badgeStyles: Record<string, string> = {
  sale:         "bg-[#C9A84C] text-[#071629]",
  land:         "bg-[#1A4B8C] text-white",
  construction: "bg-[#0B1F3A] text-white",
};

const houseFeatures = [
  "Perimeter fence with security gate",
  "Ample parking space",
  "Modern kitchen fittings",
  "All rooms en-suite",
  "24-hour power provision",
  "Water borehole",
  "Tiled throughout",
  "Covered car park",
];

const landFeatures = [
  "Registered survey plan",
  "Clean title — no encumbrances",
  "Government approved layout",
  "Accessible road frontage",
  "Suitable for residential development",
  "Close to schools and amenities",
];

export default function PropertyInfo({ property }: { property: Property }) {
  const features = property.type === "land" ? landFeatures : houseFeatures;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="mb-8 pb-8 border-b border-[#0B1F3A]/08">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
          <span className={`text-[10px] tracking-[0.1em] uppercase font-medium px-3 py-1.5 ${badgeStyles[property.badgeType]}`}>
            {property.badge}
          </span>
          <div className="text-right">
            <div
              className="text-[#0B1F3A] leading-none"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "36px",
                fontWeight: 300,
              }}
            >
              {property.price}
            </div>
            {property.per && (
              <span className="text-[12px] text-[#9CA3AF]">{property.per}</span>
            )}
          </div>
        </div>

        <h1
          className="text-[#0B1F3A] leading-tight mb-3"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            fontWeight: 300,
          }}
        >
          {property.name}
        </h1>

        <div className="flex items-center gap-2 text-[#6B7280] text-[13px]">
          <MapPin size={13} className="stroke-[#C9A84C]" />
          {property.location}
        </div>
      </div>

      {/* Specs */}
      <div className="grid grid-cols-3 gap-0 border border-[#0B1F3A]/10 mb-10">
        {property.type === "land" ? (
          <div className="col-span-3 py-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Maximize size={16} className="stroke-[#C9A84C]" strokeWidth={1.5} />
              <span className="text-[24px] font-medium text-[#0B1F3A]">{property.sqm.toLocaleString()}</span>
            </div>
            <div className="text-[11px] tracking-[0.12em] uppercase text-[#9CA3AF]">Square Metres (Plot Size)</div>
          </div>
        ) : (
          [
            { icon: Bed, val: property.beds, label: "Bedrooms" },
            { icon: Bath, val: property.baths, label: "Bathrooms" },
            { icon: Maximize, val: `${property.sqm} sqm`, label: "Floor Area" },
          ].map((spec, i) => (
            <div
              key={i}
              className={`py-5 text-center ${i < 2 ? "border-r border-[#0B1F3A]/10" : ""}`}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <spec.icon size={16} className="stroke-[#C9A84C]" strokeWidth={1.5} />
                <span className="text-[22px] font-medium text-[#0B1F3A]">{spec.val}</span>
              </div>
              <div className="text-[11px] tracking-[0.12em] uppercase text-[#9CA3AF]">{spec.label}</div>
            </div>
          ))
        )}
      </div>

      {/* Description */}
      <div className="mb-10">
        <h2
          className="text-[#0B1F3A] text-[20px] font-light mb-4"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          About this property
        </h2>
        <div className="space-y-4 text-[14px] text-[#6B7280] leading-[1.9] font-light">
          <p>
            {property.name} is a {property.type === "land" ? "prime plot" : "premium property"} located
            in {property.location}. {property.type === "land"
              ? `This ${property.sqm.toLocaleString()} sqm plot sits within a well-planned layout with excellent road access and is fully titled with no encumbrances — ready for immediate development.`
              : `Thoughtfully designed and finished to a high standard, this ${property.beds}-bedroom property offers generous living spaces, quality fixtures, and a secure environment suitable for families and executives alike.`
            }
          </p>
          <p>
            Situated in one of {property.city}'s most sought-after locations, this property offers
            excellent connectivity to key amenities, schools, commercial areas, and major road networks.
            {property.badgeType === "construction"
              ? " Currently under construction with an expected completion date to be confirmed — enquire for full timeline and stage payment details."
              : " Available for immediate purchase. Viewings strictly by appointment."
            }
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="mb-10">
        <h2
          className="text-[#0B1F3A] text-[20px] font-light mb-5"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          {property.type === "land" ? "Plot Details" : "Property Features"}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <div className="w-5 h-5 bg-[#C9A84C]/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={10} strokeWidth={2.5} className="stroke-[#C9A84C]" />
              </div>
              <span className="text-[13px] text-[#6B7280] font-light leading-snug">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Solicitors legal note */}
      <div className="border border-[#1A4B8C]/20 bg-[#1A4B8C]/04 p-6">
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 bg-[#1A4B8C]/10 flex items-center justify-center flex-shrink-0">
            <Scale size={15} strokeWidth={1.5} className="stroke-[#1A4B8C]" />
          </div>
          <div>
            <p className="text-[#0B1F3A] text-[14px] font-medium mb-1">
              Need legal support for this transaction?
            </p>
            <p className="text-[#6B7280] text-[13px] leading-relaxed font-light mb-3">
              <span className="text-[#1A4B8C] font-medium">Neighbourhood Solicitors</span> — our independent
              legal partner — handles title verification, deed of assignment, and all documentation
              for properties listed with us.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] uppercase text-[#1A4B8C] font-medium hover:text-[#2563B0] transition-colors"
            >
              Contact Neighbourhood Solicitors
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
