"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import { createClient } from "../../lib/supabase/client";
import type { Testimonial } from "../../lib/types";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(3);
      setTestimonials(data || []);
    };
    load();
  }, [supabase]);

  // Fallback to static data if Supabase not configured yet
  const display = testimonials.length > 0 ? testimonials : [
    { id: 1, name: "Mr. Jerry Tunde", role: "Business Executive, Abuja", text: "Working with Neighbourhood Homes was the best decision I made this year. They found me a stunning property in Maitama within two weeks. Honest, efficient and truly professional.", image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&q=80", featured: true, created_at: "" },
    { id: 2, name: "Mrs. Ngozi Abara", role: "Business Owner, Lagos", text: "I invested in two properties through NHE and the ROI has been exceptional. Their investment analysis team is second to none in Nigeria. I trust them completely with my portfolio.", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80", featured: true, created_at: "" },
    { id: 3, name: "Alhaji Isah Bamanga", role: "Investor, Kaduna", text: "Neighbourhood Homes helped me secure a prime commercial plot in Kaduna. The documentation process was seamless — Neighbourhood Solicitors handled everything perfectly.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", featured: true, created_at: "" },
  ];

  return (
    <section id="testimonials" className="px-[5vw] py-28">
      <FadeIn className="text-center max-w-xl mx-auto mb-16">
        <SectionLabel text="Testimonial" centered />
        <h2 className="text-[#0B1F3A] leading-[1.05] tracking-tight" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(34px, 4vw, 54px)", fontWeight: 300 }}>
          Happy <em style={{ fontStyle: "italic" }}>Clients</em>
        </h2>
        <p className="text-[#6B7280] text-[15px] leading-relaxed font-light mt-4">What our clients say about working with Neighbourhood Homes Ecosystem.</p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {display.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: i * 0.12 }} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="relative p-9 border border-[#0B1F3A]/10 bg-white hover:border-[#C9A84C]/40 hover:shadow-lg transition-all duration-300" style={{ boxShadow: "0 1px 3px rgba(11,31,58,0.06)" }}>
            <div className="absolute top-2 left-6 text-[#C9A84C]/10 leading-none select-none pointer-events-none" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "120px", fontWeight: 600, lineHeight: 1 }}>"</div>
            <div className="flex gap-1 mb-5 relative z-10">
              {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={12} className="fill-[#C9A84C] stroke-none" />)}
            </div>
            <p className="relative z-10 mb-7 leading-[1.8] font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "17px", fontStyle: "italic", color: "#0B1F3A" }}>"{t.text}"</p>
            <div className="flex items-center gap-4">
              {t.image ? (
                <div className="w-11 h-11 relative rounded-full overflow-hidden border-2 border-[#EDE8DF]">
                  <Image src={t.image} alt={t.name} fill style={{ objectFit: "cover" }} />
                </div>
              ) : (
                <div className="w-11 h-11 rounded-full bg-[#C9A84C]/15 flex items-center justify-center border-2 border-[#EDE8DF]">
                  <span className="text-[#C9A84C] text-[18px] font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>{t.name.charAt(0)}</span>
                </div>
              )}
              <div>
                <div className="text-[14px] font-medium text-[#0B1F3A]">{t.name}</div>
                <div className="text-[12px] text-[#9CA3AF] mt-0.5">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
