"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Image from "next/image";

type Property = {
  name: string;
  image: string;
};

// For demo we use the main image + tinted variants as placeholders
function getImages(image: string) {
  return [
    image,
    image + "&sat=-30",
    image + "&bright=-10",
    image + "&flip=h",
  ];
}

export default function PropertyGallery({ property }: { property: Property }) {
  const images = getImages(property.image);
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);
  const next = () => setActive((a) => (a + 1) % images.length);

  return (
    <div className="px-[5vw] pt-8 pb-0 max-w-7xl mx-auto">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[480px]">
        {/* Main large image */}
        <div className="col-span-3 row-span-2 relative overflow-hidden bg-[#EDE8DF] group">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <Image src={images[active]} alt={property.name} fill style={{ objectFit: "cover" }} />
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#071629]/70 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#071629]"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#071629]/70 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#071629]"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-4 bg-[#071629]/70 backdrop-blur-sm px-3 py-1.5 text-white text-[12px] tracking-[0.08em]">
            {active + 1} / {images.length}
          </div>

          {/* Expand icon */}
          <div className="absolute bottom-4 right-4 w-9 h-9 bg-[#071629]/70 backdrop-blur-sm flex items-center justify-center text-white/70 cursor-pointer hover:text-white transition-colors">
            <Expand size={14} />
          </div>
        </div>

        {/* Thumbnail strip */}
        {images.slice(1, 3).map((img, i) => (
          <div
            key={i}
            onClick={() => setActive(i + 1)}
            className={`relative overflow-hidden cursor-pointer bg-[#EDE8DF] ${
              active === i + 1 ? "ring-2 ring-[#C9A84C]" : "opacity-75 hover:opacity-100"
            } transition-all duration-200`}
          >
            <Image src={img} alt="" fill style={{ objectFit: "cover" }} />
          </div>
        ))}

        {/* Last thumbnail with "more" overlay if needed */}
        <div
          onClick={() => setActive(3)}
          className={`relative overflow-hidden cursor-pointer bg-[#EDE8DF] ${
            active === 3 ? "ring-2 ring-[#C9A84C]" : "opacity-75 hover:opacity-100"
          } transition-all duration-200`}
        >
          <Image src={images[3]} alt="" fill style={{ objectFit: "cover" }} />
          <div className="absolute inset-0 bg-[#071629]/50 flex items-center justify-center">
            <span className="text-white text-[12px] tracking-[0.1em] uppercase font-medium">
              View All
            </span>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`transition-all duration-200 rounded-full ${
              active === i ? "w-6 h-1.5 bg-[#C9A84C]" : "w-1.5 h-1.5 bg-[#0B1F3A]/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
