"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const PRICE_MAX = 500;
const PRICE_STEP = 5;

function formatPrice(val: number) {
  if (val >= 500) return "₦500M+";
  if (val < 1) return "₦0";
  return `₦${val}M`;
}

export default function SearchBar() {
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(PRICE_MAX);
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);
  const router = useRouter();

  const minPercent = (priceMin / PRICE_MAX) * 100;
  const maxPercent = (priceMax / PRICE_MAX) * 100;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.min(Number(e.target.value), priceMax - PRICE_STEP);
    setPriceMin(v);
  };
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.max(Number(e.target.value), priceMin + PRICE_STEP);
    setPriceMax(v);
  };

  const handleSearch = () => {
    router.push("/properties");
  };

  return (
    <section className="bg-[#0B1F3A] px-[5vw] pb-0">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-6xl mx-auto -translate-y-6"
      >
        <div
          className="flex flex-col lg:flex-row bg-white overflow-visible"
          style={{ borderBottom: "3px solid #C9A84C", boxShadow: "0 20px 60px rgba(7,22,41,0.35)" }}
        >
          {/* Keyword */}
          <div className="flex-1 px-7 py-5 border-b lg:border-b-0 lg:border-r border-[#0B1F3A]/10">
            <label className="block text-[10px] tracking-[0.14em] uppercase text-[#6B7280] mb-1.5 font-medium">
              Keyword
            </label>
            <input
              type="text"
              placeholder="Property name, area…"
              className="w-full text-[14px] text-[#0B1F3A] placeholder-[#D1D5DB] outline-none font-light"
            />
          </div>

          {/* Property Type */}
          <div className="flex-1 px-7 py-5 border-b lg:border-b-0 lg:border-r border-[#0B1F3A]/10">
            <label className="block text-[10px] tracking-[0.14em] uppercase text-[#6B7280] mb-1.5 font-medium">
              Property Type
            </label>
            <select className="w-full text-[14px] text-[#0B1F3A] outline-none bg-transparent font-light appearance-none cursor-pointer">
              <option>All Types</option>
              <option>Houses</option>
              <option>Land</option>
              <option>Under Construction</option>
            </select>
          </div>

          {/* Location */}
          <div className="flex-1 px-7 py-5 border-b lg:border-b-0 lg:border-r border-[#0B1F3A]/10">
            <label className="block text-[10px] tracking-[0.14em] uppercase text-[#6B7280] mb-1.5 font-medium">
              Location
            </label>
            <select className="w-full text-[14px] text-[#0B1F3A] outline-none bg-transparent font-light appearance-none cursor-pointer">
              <option>All Locations</option>
              <option>Abuja</option>
              <option>Lagos</option>
              <option>Kaduna</option>
              <option>Kano</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="flex-1 px-7 py-5 border-b lg:border-b-0 lg:border-r border-[#0B1F3A]/10 min-w-[200px]">
            <div className="flex items-center justify-between mb-3">
              <label className="text-[10px] tracking-[0.14em] uppercase text-[#6B7280] font-medium">
                Price Range
              </label>
              <span className="text-[11px] text-[#C9A84C] font-medium tracking-wide">
                {formatPrice(priceMin)} – {formatPrice(priceMax)}
              </span>
            </div>

            {/* Dual range slider */}
            <div className="relative h-5 flex items-center">
              {/* Track background */}
              <div className="absolute left-0 right-0 h-1 bg-[#E5E7EB] rounded-full" />

              {/* Active track fill */}
              <div
                className="absolute h-1 bg-[#C9A84C] rounded-full"
                style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
              />

              {/* Min thumb */}
              <input
                type="range"
                min={0}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={priceMin}
                onChange={handleMinChange}
                onMouseDown={() => setDragging("min")}
                onMouseUp={() => setDragging(null)}
                onTouchStart={() => setDragging("min")}
                onTouchEnd={() => setDragging(null)}
                className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer"
                style={{ zIndex: dragging === "min" || priceMin > PRICE_MAX * 0.75 ? 5 : 4 }}
              />

              {/* Max thumb */}
              <input
                type="range"
                min={0}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={priceMax}
                onChange={handleMaxChange}
                onMouseDown={() => setDragging("max")}
                onMouseUp={() => setDragging(null)}
                onTouchStart={() => setDragging("max")}
                onTouchEnd={() => setDragging(null)}
                className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer"
                style={{ zIndex: dragging === "max" ? 5 : 3 }}
              />
            </div>

            {/* Min / Max labels */}
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-[#9CA3AF]">₦0</span>
              <span className="text-[10px] text-[#9CA3AF]">₦500M+</span>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-3 bg-[#0B1F3A] hover:bg-[#1A4B8C] text-white text-[12px] tracking-[0.1em] uppercase font-medium px-10 py-5 lg:py-0 transition-colors duration-200 min-h-[72px] whitespace-nowrap"
          >
            <Search size={15} />
            Search
          </button>
        </div>
      </motion.div>

      {/* Slider thumb styles */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #C9A84C;
          border: 2px solid #ffffff;
          box-shadow: 0 1px 4px rgba(11,31,58,0.25);
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        input[type='range']::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 2px 8px rgba(201,168,76,0.4);
        }
        input[type='range']::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #C9A84C;
          border: 2px solid #ffffff;
          box-shadow: 0 1px 4px rgba(11,31,58,0.25);
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}
