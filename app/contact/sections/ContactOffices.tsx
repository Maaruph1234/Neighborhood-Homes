"use client";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight, Phone, Mail } from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionLabel from "../../components/SectionLabel";

// Google Maps embed for No 10 Gimbiya Street, Garki Area 11, Abuja
const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.1!2d7.4892!3d9.0527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGimbiya+Street+Garki+Area+11+Abuja!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng";
const MAPS_LINK = "https://www.google.com/maps/search/No+10+Gimbiya+Street+Garki+Area+11+Abuja+Nigeria";

export default function ContactOffices() {
  return (
    <section className="bg-[#F9F6F0] px-[5vw] py-24 border-t border-[#0B1F3A]/08">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-14">
          <SectionLabel text="Our Office" />
          <h2
            className="text-[#0B1F3A] leading-[1.05] tracking-tight"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(30px, 3.5vw, 46px)",
              fontWeight: 300,
            }}
          >
            Visit Us in <em style={{ fontStyle: "italic" }}>Abuja</em>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Office info card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-white border border-[#0B1F3A]/10 overflow-hidden"
          >
            <div className="h-1 bg-[#C9A84C]" />
            <div className="p-8">
              <h3
                className="text-[#0B1F3A] text-[24px] font-light mb-6"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Neighbourhood Homes<br />
                <span className="text-[16px] text-[#A8893E]">Head Office — Abuja</span>
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#C9A84C]/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={14} strokeWidth={1.5} className="stroke-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.12em] uppercase text-[#9CA3AF] mb-1">Address</p>
                    <p className="text-[14px] text-[#0B1F3A] font-light leading-relaxed">
                      No 10 Gimbiya Street, First Floor<br />
                      Garki Area 11, Abuja, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#C9A84C]/12 flex items-center justify-center flex-shrink-0">
                    <Phone size={14} strokeWidth={1.5} className="stroke-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.12em] uppercase text-[#9CA3AF] mb-1">Phone</p>
                    <a href="tel:+2349013280477" className="text-[14px] text-[#0B1F3A] font-light hover:text-[#C9A84C] transition-colors block">+234 901 328 0477</a>
                    <a href="tel:+2348130019388" className="text-[14px] text-[#0B1F3A] font-light hover:text-[#C9A84C] transition-colors block">+234 813 001 9388</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#C9A84C]/12 flex items-center justify-center flex-shrink-0">
                    <Mail size={14} strokeWidth={1.5} className="stroke-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.12em] uppercase text-[#9CA3AF] mb-1">Email</p>
                    <a href="mailto:info@neighborhoodhomes.ng" className="text-[14px] text-[#0B1F3A] font-light hover:text-[#C9A84C] transition-colors">info@neighborhoodhomes.ng</a>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[10px] tracking-[0.12em] uppercase text-[#9CA3AF] mb-2">Hours</p>
                  <p className="text-[13px] text-[#6B7280] font-light">Monday – Saturday<br />8:00am – 6:00pm WAT</p>
                </div>
              </div>

              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 bg-[#0B1F3A] text-white text-[12px] tracking-[0.1em] uppercase font-medium px-6 py-3 hover:bg-[#1A4B8C] transition-colors group"
              >
                <MapPin size={13} />
                Open in Google Maps
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Google Maps embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-2 overflow-hidden border border-[#0B1F3A]/10 bg-[#EDE8DF]"
            style={{ minHeight: "420px" }}
          >
            <iframe
              src={MAPS_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px", display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Neighbourhood Homes Office — Garki Area 11, Abuja"
            />
          </motion.div>

        </div>

        {/* Serves all cities note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-white border border-[#0B1F3A]/10 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="w-2 h-2 rounded-full bg-[#C9A84C] flex-shrink-0 mt-1 sm:mt-0" />
          <p className="text-[14px] text-[#6B7280] font-light leading-relaxed">
            While our office is based in Abuja, we actively serve clients across{" "}
            <span className="text-[#0B1F3A] font-medium">Abuja, Lagos, Kaduna, and Kano</span>.
            We can arrange viewings, consultations, and site visits in all four cities.
            Reach us by phone, WhatsApp, or email to get started.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
