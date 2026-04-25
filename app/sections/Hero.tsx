"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const scrollDown = () => document.querySelector("#featured")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative w-full h-[75vh] md:h-[85vh] min-h-[480px] flex items-center md:items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/images/hero.svg" alt="Hero banner" fill style={{ objectFit: 'cover' }} priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071629]/95 via-[#071629]/65 to-[#071629]/20" />
      </div>

      <div className="relative z-10 p-6 md:p-8 pb-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl leading-tight font-light mb-4">
            Find Your <span className="text-[#E8C97A]">Perfect</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-white/70 max-w-lg"
        >
          Neighbourhood Homes connects discerning clients with exceptional properties across Nigeria's most sought-after locations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <button
            onClick={scrollDown}
            className="bg-[#C9A84C] text-[#071629] px-6 py-3 rounded-md font-semibold w-full sm:w-auto"
          >
            Explore Properties
          </button>

          <button className="text-white/80 px-4 py-3 border border-white/10 rounded-md w-full sm:w-auto">Watch Tour</button>
        </motion.div>
      </div>
    </section>
  );
}
