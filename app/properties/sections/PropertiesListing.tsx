"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal, Grid3X3, List, X, ChevronDown,
  MapPin, Bed, Bath, Maximize, ArrowUpRight, Search, Loader2
} from "lucide-react";
import { createClient } from "../../../lib/supabase/client";
import type { Property } from "../../../lib/types";

const CITIES = ["Abuja", "Lagos", "Kaduna", "Kano"];
const TYPES  = ["Houses", "Land", "Under Construction"];
const SORTS  = ["Newest First", "Price: Low to High", "Price: High to Low"];

const badgeStyles: Record<string, string> = {
  sale:         "bg-[#C9A84C] text-[#071629]",
  land:         "bg-[#1A4B8C] text-white",
  construction: "bg-[#0B1F3A] text-white",
};

function parsePrice(price: string): number {
  const n = price.replace(/[₦,\s]/g, "");
  if (n.endsWith("M")) return parseFloat(n) * 1_000_000;
  if (n.endsWith("K")) return parseFloat(n) * 1_000;
  return parseFloat(n) || 0;
}

export default function PropertiesListing() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading]       = useState(true);
  const [keyword, setKeyword]       = useState("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes]   = useState<string[]>([]);
  const [sortBy, setSortBy]         = useState("Newest First");
  const [viewMode, setViewMode]     = useState<"grid" | "list">("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortOpen, setSortOpen]     = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });
      setProperties(data || []);
      setLoading(false);
    };
    load();
  }, [supabase]);

  const toggleCity = (c: string) =>
    setSelectedCities((p) => p.includes(c) ? p.filter((x) => x !== c) : [...p, c]);
  const toggleType = (t: string) =>
    setSelectedTypes((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);
  const clearAll = () => { setKeyword(""); setSelectedCities([]); setSelectedTypes([]); };
  const hasFilters = keyword || selectedCities.length > 0 || selectedTypes.length > 0;

  const filtered = useMemo(() => {
    let result = [...properties];
    if (keyword) {
      const kw = keyword.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(kw) || p.location.toLowerCase().includes(kw));
    }
    if (selectedCities.length > 0) result = result.filter((p) => selectedCities.includes(p.city));
    if (selectedTypes.length > 0) {
      result = result.filter((p) => {
        if (selectedTypes.includes("Houses") && p.type === "house" && p.badge_type === "sale") return true;
        if (selectedTypes.includes("Land") && p.type === "land") return true;
        if (selectedTypes.includes("Under Construction") && p.badge_type === "construction") return true;
        return false;
      });
    }
    if (sortBy === "Price: Low to High") result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sortBy === "Price: High to Low") result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    return result;
  }, [properties, keyword, selectedCities, selectedTypes, sortBy]);

  return (
    <section className="bg-white min-h-screen">
      {/* Toolbar */}
      <div className="sticky top-[64px] z-30 bg-white border-b border-[#0B1F3A]/08 px-[5vw] py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 stroke-[#9CA3AF]" />
              <input type="text" placeholder="Search properties…" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="pl-9 pr-4 py-2 text-[13px] border border-[#0B1F3A]/12 text-[#0B1F3A] placeholder-[#D1D5DB] outline-none focus:border-[#C9A84C] transition-colors w-56 font-light" />
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`flex items-center gap-2 px-4 py-2 text-[12px] tracking-[0.06em] uppercase border transition-all duration-200 ${sidebarOpen || hasFilters ? "bg-[#0B1F3A] text-white border-[#0B1F3A]" : "bg-white text-[#6B7280] border-[#0B1F3A]/20 hover:border-[#0B1F3A]/50"}`}
            >
              <SlidersHorizontal size={13} />
              Filters
              {hasFilters && <span className="w-4 h-4 rounded-full bg-[#C9A84C] text-[#071629] text-[9px] flex items-center justify-center font-medium">{selectedCities.length + selectedTypes.length + (keyword ? 1 : 0)}</span>}
            </button>
            <div className="flex gap-2 flex-wrap">
              {selectedCities.map((c) => <button key={c} onClick={() => toggleCity(c)} className="flex items-center gap-1.5 bg-[#F9F6F0] border border-[#0B1F3A]/12 px-3 py-1 text-[11px] text-[#0B1F3A] tracking-[0.06em] uppercase hover:border-[#C9A84C] transition-colors">{c} <X size={10} /></button>)}
              {selectedTypes.map((t) => <button key={t} onClick={() => toggleType(t)} className="flex items-center gap-1.5 bg-[#F9F6F0] border border-[#0B1F3A]/12 px-3 py-1 text-[11px] text-[#0B1F3A] tracking-[0.06em] uppercase hover:border-[#C9A84C] transition-colors">{t} <X size={10} /></button>)}
              {hasFilters && <button onClick={clearAll} className="text-[11px] text-[#9CA3AF] hover:text-[#C9A84C] transition-colors tracking-[0.06em] uppercase underline underline-offset-2">Clear all</button>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#9CA3AF] font-light"><span className="text-[#0B1F3A] font-medium">{filtered.length}</span> propert{filtered.length !== 1 ? "ies" : "y"}</span>
            <div className="relative">
              <button onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-2 text-[12px] tracking-[0.06em] text-[#6B7280] border border-[#0B1F3A]/12 px-4 py-2 hover:border-[#0B1F3A]/30 transition-colors">
                {sortBy} <ChevronDown size={12} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="absolute right-0 top-full mt-1 bg-white border border-[#0B1F3A]/12 shadow-lg z-50 min-w-[180px]">
                    {SORTS.map((opt) => <button key={opt} onClick={() => { setSortBy(opt); setSortOpen(false); }} className={`w-full text-left px-4 py-3 text-[12px] tracking-[0.04em] transition-colors ${sortBy === opt ? "bg-[#F9F6F0] text-[#0B1F3A] font-medium" : "text-[#6B7280] hover:bg-[#F9F6F0] hover:text-[#0B1F3A]"}`}>{opt}</button>)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex border border-[#0B1F3A]/12">
              <button onClick={() => setViewMode("grid")} className={`p-2 transition-colors ${viewMode === "grid" ? "bg-[#0B1F3A] text-white" : "text-[#9CA3AF] hover:text-[#0B1F3A]"}`}><Grid3X3 size={14} /></button>
              <button onClick={() => setViewMode("list")} className={`p-2 border-l border-[#0B1F3A]/12 transition-colors ${viewMode === "list" ? "bg-[#0B1F3A] text-white" : "text-[#9CA3AF] hover:text-[#0B1F3A]"}`}><List size={14} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-[5vw] py-10">
        <div className="flex gap-8 items-start">
          {/* Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.aside initial={{ opacity: 0, x: -20, width: 0 }} animate={{ opacity: 1, x: 0, width: 260 }} exit={{ opacity: 0, x: -20, width: 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0 overflow-hidden">
                <div className="w-[260px] border border-[#0B1F3A]/10 bg-white">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[#0B1F3A]/08">
                    <span className="text-[11px] tracking-[0.14em] uppercase text-[#0B1F3A] font-medium">Filters</span>
                    <button onClick={() => setSidebarOpen(false)} className="text-[#9CA3AF] hover:text-[#0B1F3A]"><X size={14} /></button>
                  </div>
                  <div className="px-5 py-5 border-b border-[#0B1F3A]/08">
                    <p className="text-[10px] tracking-[0.16em] uppercase text-[#9CA3AF] mb-3 font-medium">City</p>
                    {CITIES.map((c) => (
                      <label key={c} className="flex items-center gap-3 cursor-pointer group mb-2">
                        <div onClick={() => toggleCity(c)} className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${selectedCities.includes(c) ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#0B1F3A]/20 group-hover:border-[#C9A84C]"}`}>
                          {selectedCities.includes(c) && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="#071629" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                        </div>
                        <span onClick={() => toggleCity(c)} className={`text-[13px] font-light cursor-pointer ${selectedCities.includes(c) ? "text-[#0B1F3A]" : "text-[#6B7280]"}`}>{c}</span>
                      </label>
                    ))}
                  </div>
                  <div className="px-5 py-5 border-b border-[#0B1F3A]/08">
                    <p className="text-[10px] tracking-[0.16em] uppercase text-[#9CA3AF] mb-3 font-medium">Property Type</p>
                    {TYPES.map((t) => (
                      <label key={t} className="flex items-center gap-3 cursor-pointer group mb-2">
                        <div onClick={() => toggleType(t)} className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${selectedTypes.includes(t) ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#0B1F3A]/20 group-hover:border-[#C9A84C]"}`}>
                          {selectedTypes.includes(t) && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="#071629" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                        </div>
                        <span onClick={() => toggleType(t)} className={`text-[13px] font-light cursor-pointer ${selectedTypes.includes(t) ? "text-[#0B1F3A]" : "text-[#6B7280]"}`}>{t}</span>
                      </label>
                    ))}
                  </div>
                  {hasFilters && <div className="px-5 py-4"><button onClick={clearAll} className="w-full text-[11px] tracking-[0.1em] uppercase text-[#9CA3AF] hover:text-[#C9A84C] transition-colors border border-[#0B1F3A]/10 py-2.5 hover:border-[#C9A84C]">Clear All Filters</button></div>}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 size={28} className="stroke-[#C9A84C] animate-spin" />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {filtered.length === 0 ? (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
                    <div className="text-[#C9A84C]/30 mb-4"><Search size={40} className="mx-auto" strokeWidth={1} /></div>
                    <p className="text-[#9CA3AF] text-[15px] font-light">No properties match your filters.</p>
                    <button onClick={clearAll} className="mt-4 text-[12px] tracking-[0.08em] uppercase text-[#C9A84C] hover:text-[#A8893E] transition-colors underline underline-offset-2">Clear filters</button>
                  </motion.div>
                ) : viewMode === "grid" ? (
                  <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filtered.map((p, i) => <GridCard key={p.id} property={p} index={i} />)}
                  </motion.div>
                ) : (
                  <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="flex flex-col gap-4">
                    {filtered.map((p, i) => <ListCard key={p.id} property={p} index={i} />)}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function GridCard({ property: p, index }: { property: Property; index: number }) {
  return (
    <motion.a href={`/properties/${p.id}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.06 }} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="block bg-white border border-[#0B1F3A]/10 overflow-hidden group cursor-pointer" style={{ boxShadow: "0 1px 3px rgba(11,31,58,0.06)" }}>
      <div className="relative h-52 overflow-hidden">
        <motion.img src={p.image} alt={p.name} className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/65 via-transparent to-transparent" />
        <span className={`absolute top-3 left-3 text-[10px] tracking-[0.1em] uppercase font-medium px-3 py-1.5 ${badgeStyles[p.badge_type]}`}>{p.badge}</span>
        <div className="absolute bottom-3 left-3 bg-[#071629]/80 backdrop-blur-sm px-3 py-1.5">
          <span className="text-white font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "20px" }}>{p.price}</span>
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 bg-white/0 group-hover:bg-[#C9A84C] flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
          <ArrowUpRight size={14} className="text-[#071629]" />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-[#0B1F3A] text-[18px] font-light leading-tight mb-1 group-hover:text-[#1A4B8C] transition-colors" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>{p.name}</h3>
        <div className="flex items-center gap-1.5 text-[#9CA3AF] text-[12px] mb-4"><MapPin size={10} className="stroke-[#C9A84C]" />{p.location}</div>
        <div className="flex border-t border-[#0B1F3A]/08 pt-3">
          {p.type === "land" ? (
            <div className="flex items-center gap-1.5 text-[#6B7280] text-[13px]"><Maximize size={12} /><span className="font-medium text-[#0B1F3A]">{p.sqm.toLocaleString()}</span><span className="text-[11px] text-[#9CA3AF] uppercase tracking-wider">sqm plot</span></div>
          ) : (
            <div className="flex gap-0 w-full">
              {[{ icon: <Bed size={12} />, val: p.beds, key: "Beds" }, { icon: <Bath size={12} />, val: p.baths, key: "Baths" }, { icon: <Maximize size={12} />, val: p.sqm, key: "sqm" }].map((s, i) => (
                <div key={i} className={`flex-1 text-center ${i < 2 ? "border-r border-[#0B1F3A]/08" : ""}`}>
                  <div className="flex items-center justify-center gap-1 text-[#6B7280]">{s.icon}<span className="text-[13px] font-medium text-[#0B1F3A]">{s.val}</span></div>
                  <div className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">{s.key}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.a>
  );
}

function ListCard({ property: p, index }: { property: Property; index: number }) {
  return (
    <motion.a href={`/properties/${p.id}`} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: index * 0.05 }} className="flex bg-white border border-[#0B1F3A]/10 overflow-hidden group hover:border-[#C9A84C]/40 hover:shadow-md transition-all duration-300">
      <div className="relative w-56 flex-shrink-0 overflow-hidden">
        <motion.img src={p.image} alt={p.name} className="w-full h-full object-cover" whileHover={{ scale: 1.04 }} transition={{ duration: 0.4 }} style={{ minHeight: "160px" }} />
        <span className={`absolute top-3 left-3 text-[10px] tracking-[0.1em] uppercase font-medium px-2.5 py-1 ${badgeStyles[p.badge_type]}`}>{p.badge}</span>
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-[#0B1F3A] text-[20px] font-light leading-tight group-hover:text-[#1A4B8C] transition-colors" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>{p.name}</h3>
            <div className="text-[#0B1F3A] font-light flex-shrink-0" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "22px" }}>{p.price}</div>
          </div>
          <div className="flex items-center gap-1.5 text-[#9CA3AF] text-[12px] mb-4"><MapPin size={10} className="stroke-[#C9A84C]" />{p.location}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            {p.type === "land" ? (
              <div className="flex items-center gap-1.5 text-[#6B7280] text-[13px]"><Maximize size={12} /><span className="font-medium text-[#0B1F3A]">{p.sqm.toLocaleString()}</span><span className="text-[11px] text-[#9CA3AF] uppercase tracking-wider">sqm</span></div>
            ) : (
              <>
                <div className="flex items-center gap-1.5 text-[#6B7280] text-[13px]"><Bed size={12} /><span className="font-medium text-[#0B1F3A]">{p.beds}</span><span className="text-[11px] text-[#9CA3AF]">Beds</span></div>
                <div className="flex items-center gap-1.5 text-[#6B7280] text-[13px]"><Bath size={12} /><span className="font-medium text-[#0B1F3A]">{p.baths}</span><span className="text-[11px] text-[#9CA3AF]">Baths</span></div>
                <div className="flex items-center gap-1.5 text-[#6B7280] text-[13px]"><Maximize size={12} /><span className="font-medium text-[#0B1F3A]">{p.sqm}</span><span className="text-[11px] text-[#9CA3AF]">sqm</span></div>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[12px] tracking-[0.08em] uppercase text-[#C9A84C] font-medium group-hover:gap-2.5 transition-all">View Property <ArrowUpRight size={13} /></div>
        </div>
      </div>
    </motion.a>
  );
}
