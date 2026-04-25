"use client";
import { motion } from "framer-motion";
import FadeIn from "../../components/FadeIn";
import SectionLabel from "../../components/SectionLabel";

export default function OurStory() {
  return (
    <section className="px-[5vw] py-28 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">

        {/* Image side — placeholder */}
        <FadeIn direction="left">
          <div className="relative">
            {/* Main placeholder */}
            <div
              className="w-full aspect-[4/3] bg-[#EDE8DF] flex flex-col items-center justify-center border border-[#0B1F3A]/08"
              style={{ minHeight: "360px" }}
            >
              <svg
                width="48" height="48" viewBox="0 0 24 24" fill="none"
                stroke="#C9A84C" strokeWidth="1" className="mb-4 opacity-50"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21,15 16,10 5,21" />
              </svg>
              <span className="text-[11px] tracking-[0.14em] uppercase text-[#9CA3AF]">
                Company Photo — Coming Soon
              </span>
            </div>

            {/* Small accent placeholder */}
            <motion.div
              className="absolute -bottom-8 -right-8 w-[48%] aspect-square bg-[#F9F6F0] border border-[#C9A84C]/20 flex flex-col items-center justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <svg
                width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke="#C9A84C" strokeWidth="1" className="mb-2 opacity-40"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21,15 16,10 5,21" />
              </svg>
              <span className="text-[10px] tracking-widest uppercase text-[#9CA3AF]">
                Photo
              </span>
            </motion.div>
          </div>
        </FadeIn>

        {/* Content side */}
        <FadeIn direction="right" delay={0.15} className="lg:pl-8">
          <SectionLabel text="Who We Are" />
          <h2
            className="text-[#0B1F3A] leading-[1.08] tracking-tight mb-7"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(30px, 3.5vw, 46px)",
              fontWeight: 300,
            }}
          >
            A Property Company Built for{" "}
            <em style={{ fontStyle: "italic" }}>Real Nigerians</em>
          </h2>

          <div className="space-y-5 text-[15px] text-[#6B7280] leading-[1.85] font-light">
            <p>
              Neighbourhood Homes Ecosystems Limited is a Nigerian real estate company
              specialising in land sales, property brokerage, and the development of
              residential and commercial properties. We are committed to delivering
              trusted, transparent, and value-driven real estate solutions.
            </p>
            <p>
              We empower individuals, families, and investors to make confident property
              decisions across Nigeria — from premium houses in Maitama and Ikoyi, to
              prime land in Kaduna and Kano's fastest growing districts, and off-plan
              developments that give buyers a head start on the market.
            </p>
            <p>
              What sets us apart is the ecosystem we've built around every transaction.
              From first enquiry to final signature, our clients have access to property
              experts and independent legal professionals — all under the Neighbourhood brand.
            </p>
          </div>

          {/* Inline stats */}
          <div className="grid grid-cols-3 gap-0 mt-10 border border-[#0B1F3A]/10">
            {[
              { num: "4", label: "Cities" },
              { num: "11+", label: "Active Listings" },
              { num: "100%", label: "Client Focus" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`py-6 text-center ${i < 2 ? "border-r border-[#0B1F3A]/10" : ""}`}
              >
                <div
                  className="text-[#0B1F3A] leading-none mb-1"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "36px",
                    fontWeight: 300,
                  }}
                >
                  {stat.num}
                </div>
                <div className="text-[10px] tracking-[0.12em] uppercase text-[#9CA3AF]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
