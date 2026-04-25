"use client";
import { motion } from "framer-motion";
import { Scale, ArrowUpRight, Check } from "lucide-react";
import FadeIn from "../../components/FadeIn";

const legalServices = [
  "Title Search & Verification",
  "Deed of Assignment",
  "Contract of Sale Review",
  "C of O Processing",
  "Governor's Consent",
  "Post-completion Registration",
];

export default function SolicitorsBand() {
  return (
    <section className="bg-[#071629] px-[5vw] py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — content */}
          <FadeIn direction="left">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-[#1A4B8C]/25 border border-[#1A4B8C]/30 px-4 py-2 mb-8">
              <Scale size={12} strokeWidth={1.5} className="stroke-[#6B9FD4]" />
              <span className="text-[10px] tracking-[0.18em] uppercase text-[#6B9FD4] font-medium">
                Trusted Legal Partner
              </span>
            </div>

            <h2
              className="text-white leading-[1.08] tracking-tight mb-5"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(28px, 3.5vw, 46px)",
                fontWeight: 300,
              }}
            >
              Every Transaction Deserves{" "}
              <em style={{ fontStyle: "italic" }} className="text-[#E8C97A]">
                Proper Legal Cover.
              </em>
            </h2>

            <p className="text-white/50 text-[14px] leading-[1.9] font-light mb-8 max-w-lg">
              Neighbourhood Solicitors is an independent law firm that works alongside
              us on every transaction requiring legal support. They are not a department
              of Neighbourhood Homes — they are a fully independent firm of qualified
              solicitors who share our commitment to client-first service.
            </p>

            <p className="text-white/40 text-[13px] leading-[1.85] font-light mb-10 max-w-lg">
              Whether you need a simple title search or full deed preparation and
              registration, they handle it with the same rigour and professionalism
              that our clients have come to expect from the Neighbourhood brand.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#1A4B8C] text-white text-[12px] tracking-[0.1em] uppercase font-medium px-7 py-3.5 hover:bg-[#2563B0] transition-colors group"
              >
                Contact the Firm
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 border border-white/20 text-white/70 text-[12px] tracking-[0.1em] uppercase font-medium px-7 py-3.5 hover:border-white/40 hover:text-white transition-all"
              >
                About the Ecosystem
              </a>
            </div>
          </FadeIn>

          {/* Right — services card */}
          <FadeIn direction="right" delay={0.15}>
            <div className="bg-[#0B1F3A] border border-white/06 p-8">
              <div className="absolute-top-0 border-t-2 border-[#1A4B8C] -mt-px mb-0" />

              {/* Header */}
              <div className="flex items-start gap-4 mb-8 pb-8 border-b border-white/07">
                <div className="w-12 h-12 bg-[#1A4B8C]/20 border border-[#1A4B8C]/30 flex items-center justify-center flex-shrink-0">
                  <Scale size={20} strokeWidth={1.2} className="stroke-[#6B9FD4]" />
                </div>
                <div>
                  <div
                    className="text-white text-[20px] font-light leading-tight mb-1"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    Neighbourhood Solicitors
                  </div>
                  <div className="text-[10px] tracking-[0.16em] uppercase text-[#1A4B8C] font-medium">
                    Independent Legal Partner
                  </div>
                </div>
              </div>

              {/* Services list */}
              <p className="text-[10px] tracking-[0.16em] uppercase text-white/30 mb-5 font-medium">
                Legal services covered
              </p>
              <ul className="space-y-3 mb-8">
                {legalServices.map((item) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 bg-[#1A4B8C]/20 flex items-center justify-center flex-shrink-0">
                      <Check size={10} strokeWidth={2.5} className="stroke-[#6B9FD4]" />
                    </div>
                    <span className="text-[13px] text-white/55 font-light">{item}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Contact info */}
              <div className="border-t border-white/07 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] tracking-wider uppercase text-white/25 mb-1">Phone</div>
                    <div className="text-[13px] text-white/50 font-light">+234 913 176 9300</div>
                  </div>
                  <div>
                    <div className="text-[10px] tracking-wider uppercase text-white/25 mb-1">Email</div>
                    <div className="text-[13px] text-white/50 font-light">info@neighbourhoodsolicitors.ng</div>
                  </div>
                </div>
                <p className="text-[11px] text-white/20 leading-relaxed mt-4 font-light italic">
                  Neighbourhood Solicitors operates independently and takes clients beyond
                  Neighbourhood Homes transactions.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
