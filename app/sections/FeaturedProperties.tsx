"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Bed, Bath, Maximize, Heart, Loader2 } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";
import { createClient } from "../../lib/supabase/client";
import type { Property } from "../../lib/types";
import { properties as staticProperties } from "../data";

const typeTabs = ["All", "Houses", "Land", "Under Construction"];
const locationTabs = ["All Locations", "Abuja", "Lagos", "Kaduna", "Kano"];

const badgeStyles: Record<string, string> = {
  sale: "bg-[#C9A84C] text-[#071629]",
  land: "bg-[#1A4B8C] text-white",
  construction: "bg-[#0B1F3A] text-white",
};

export default function FeaturedProperties() {
  const [activeType, setActiveType] = useState("All");
  const [activeLocation, setActiveLocation] = useState("All Locations");
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(6);
      if (error || !data || data.length === 0) {
        // fallback to static data
        setProperties(staticProperties.slice(0, 6).map(p => ({ ...p, badge_type: p.badgeType })));
      } else {
        setProperties(data);
      }
      setLoading(false);
    };
    load();
  }, []);

  const filtered = properties.filter((p) => {
    const bt = p.badge_type || p.badgeType;
    const typeMatch =
      activeType === "All" ||
      (activeType === "Houses" && p.type === "house" && bt === "sale") ||
      (activeType === "Land" && p.type === "land") ||
      (activeType === "Under Construction" && bt === "construction");
    const locationMatch = activeLocation === "All Locations" || p.city === activeLocation;
    return typeMatch && locationMatch;
  });

  return (
    <section id="featured" className="px-[5vw] pt-20 pb-28">
      <div className="flex justify-between items-end mb-12 flex-wrap gap-6">
        <FadeIn>
          <SectionLabel text="What We Offer" />
          <h2 className="text-[#0B1F3A] leading-[1.05] tracking-tight" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(34px, 4vw, 54px)", fontWeight: 300 }}>
            Featured <em style={{ fontStyle: "italic" }}>Properties</em>
          </h2>
          <p className="text-[#6B7280] text-[15px] max-w-lg mt-3 leading-relaxed font-light">Handpicked listings across Nigeria's premier neighbourhoods, curated for quality and value.</p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <a href="/properties" className="text-[12px] tracking-[0.1em] uppercase text-[#A8893E] border-b border-[#A8893E] pb-0.5 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors">View All Properties</a>
        </FadeIn>
      </div>

      <FadeIn delay={0.1}>
        <div className="flex gap-0 border-b border-[#0B1F3A]/10 mb-5">
          {typeTabs.map((tab) => (
            <button key={tab} onClick={() => setActiveType(tab)} className={`relative px-6 py-3 text-[12px] tracking-[0.08em] uppercase transition-colors duration-200 font-medium ${activeType === tab ? "text-[#0B1F3A]" : "text-[#9CA3AF] hover:text-[#6B7280]"}`}>
              {tab}
              {activeType === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A84C]" />}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap mb-10">
          {locationTabs.map((loc) => (
            <button key={loc} onClick={() => setActiveLocation(loc)} className={`px-4 py-1.5 text-[11px] tracking-[0.08em] uppercase font-medium border transition-all duration-200 ${activeLocation === loc ? "bg-[#0B1F3A] text-white border-[#0B1F3A]" : "bg-transparent text-[#6B7280] border-[#0B1F3A]/20 hover:border-[#0B1F3A]/50 hover:text-[#0B1F3A]"}`}>{loc}</button>
          ))}
        </div>
      </FadeIn>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="stroke-[#C9A84C] animate-spin" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={activeType + activeLocation} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.length > 0 ? filtered.map((p, i) => <FeaturedCard key={p.id} property={p} index={i} />) : (
              <div className="col-span-3 py-16 text-center text-[#9CA3AF] text-[14px] font-light">No properties found for this filter combination.</div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}

function FeaturedCard({ property: p, index }: { property: any; index: number }) {
  const [saved, setSaved] = useState(false);
  const bt = p.badge_type || p.badgeType;

  return (
    <motion.a
      href={`/properties/${p.id}`}
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="block bg-white border border-[#0B1F3A]/10 overflow-hidden group cursor-pointer" style={{ boxShadow: "0 1px 3px rgba(11,31,58,0.07)" }}
    >
      <div className="relative h-56 overflow-hidden">
        <motion.img src={p.image} alt={p.name} className="w-full h-full object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 0.6 }} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/70 via-transparent to-transparent opacity-80" />
        <span className={`absolute top-4 left-4 text-[10px] tracking-[0.1em] uppercase font-medium px-3 py-1.5 ${badgeStyles[bt] || "bg-[#0B1F3A] text-white"}`}>{p.badge}</span>
        <div className="absolute bottom-4 left-4 bg-[#071629]/85 backdrop-blur-sm px-4 py-2">
          <span className="text-white font-light leading-none" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "22px" }}>{p.price}</span>
        </div>
        <button onClick={(e) => { e.preventDefault(); setSaved(!saved); }} className="absolute top-4 right-4 w-8 h-8 bg-white flex items-center justify-center">
          <Heart size={13} className={`transition-colors ${saved ? "fill-[#C9A84C] stroke-[#C9A84C]" : "stroke-[#0B1F3A]"}`} />
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-[#0B1F3A] text-[19px] font-light leading-tight mb-1" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>{p.name}</h3>
        <div className="flex items-center gap-1.5 text-[#6B7280] text-[12px] mb-5"><MapPin size={11} className="stroke-[#C9A84C]" />{p.location}</div>
        <div className="flex border-t border-[#0B1F3A]/08 pt-4">
          {p.type === "land" ? (
            <div className="flex items-center gap-1.5 text-[#6B7280] text-[13px]"><Maximize size={13} /><span className="font-medium text-[#0B1F3A]">{p.sqm?.toLocaleString()}</span><span className="text-[10px] text-[#9CA3AF] uppercase tracking-wider ml-1">sqm</span></div>
          ) : (
            [{ icon: <Bed size={13} />, val: p.beds, key: "Beds" }, { icon: <Bath size={13} />, val: p.baths, key: "Baths" }, { icon: <Maximize size={13} />, val: p.sqm, key: "sqm" }].map((s, i) => (
              <div key={i} className={`flex-1 text-center ${i < 2 ? "border-r border-[#0B1F3A]/08" : ""}`}>
                <div className="flex items-center justify-center gap-1 text-[#6B7280] mb-0.5">{s.icon}<span className="text-[14px] font-medium text-[#0B1F3A]">{s.val}</span></div>
                <div className="text-[10px] tracking-[0.08em] uppercase text-[#9CA3AF]">{s.key}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.a>
  );
}
