"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Scale, Phone, Mail, MapPin, MessageSquare, Check, ChevronDown } from "lucide-react";
import FadeIn from "../../components/FadeIn";
import { createClient } from "../../../lib/supabase/client";

const INTERESTS = ["Buying a house","Buying land","Off-plan / under construction","Property management","Investment consultation","General enquiry"];
const SOLICITOR_INTERESTS = ["Title search & verification","Deed of assignment","Contract of sale review","Certificate of Occupancy (C of O)","Governor's Consent","Other legal matter"];

type FormState = { name: string; email: string; phone: string; interest: string; message: string; };

function ContactForm({ interests, placeholder, accentColor, buttonLabel, recipient }: {
  interests: string[]; placeholder: string; accentColor: string; buttonLabel: string; recipient: "homes" | "solicitors";
}) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", interest: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const supabase = createClient();

  const update = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone) return;
    setSending(true);
    await supabase.from("enquiries").insert([{
      name: form.name, email: form.email, phone: form.phone,
      interest: form.interest, message: form.message || form.interest,
      recipient, read: false,
    }]);
    setSending(false);
    setSent(true);
  };

  const ic = "w-full border border-[#0B1F3A]/12 px-4 py-3.5 text-[14px] text-[#0B1F3A] placeholder-[#D1D5DB] outline-none focus:border-[#C9A84C] transition-colors font-light bg-white";

  if (sent) return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: `${accentColor}18` }}>
        <Check size={24} strokeWidth={2} style={{ color: accentColor }} />
      </div>
      <h3 className="text-[#0B1F3A] text-[26px] font-light mb-3" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>Message Sent</h3>
      <p className="text-[#6B7280] text-[14px] font-light leading-relaxed max-w-xs mx-auto">Thank you, {form.name}. We'll be in touch within 24 hours.</p>
      <button onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", interest: "", message: "" }); }} className="mt-6 text-[12px] tracking-[0.08em] uppercase text-[#9CA3AF] hover:text-[#0B1F3A] transition-colors underline underline-offset-2">Send another message</button>
    </motion.div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" placeholder="Full name *" value={form.name} onChange={update("name")} className={ic} />
        <input type="tel" placeholder="Phone number *" value={form.phone} onChange={update("phone")} className={ic} />
      </div>
      <input type="email" placeholder="Email address *" value={form.email} onChange={update("email")} className={ic} />
      <div className="relative">
        <button type="button" onClick={() => setSelectOpen(!selectOpen)} className={`w-full border border-[#0B1F3A]/12 px-4 py-3.5 text-[14px] text-left outline-none transition-colors font-light flex items-center justify-between ${form.interest ? "text-[#0B1F3A]" : "text-[#D1D5DB]"} ${selectOpen ? "border-[#C9A84C]" : ""} bg-white`}>
          {form.interest || placeholder}
          <ChevronDown size={14} className={`text-[#9CA3AF] transition-transform ${selectOpen ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {selectOpen && (
            <motion.ul initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#0B1F3A]/12 shadow-lg z-20">
              {interests.map((opt) => (
                <li key={opt}>
                  <button type="button" onClick={() => { setForm((p) => ({ ...p, interest: opt })); setSelectOpen(false); }} className={`w-full text-left px-4 py-3 text-[13px] font-light transition-colors hover:bg-[#F9F6F0] ${form.interest === opt ? "text-[#0B1F3A] font-medium" : "text-[#6B7280]"}`}>{opt}</button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      <textarea rows={5} placeholder="Your message…" value={form.message} onChange={update("message")} className={`${ic} resize-none`} />
      <button onClick={handleSubmit} disabled={sending} className="w-full text-[12px] tracking-[0.12em] uppercase font-medium py-4 transition-all active:scale-[0.99] disabled:opacity-60" style={{ background: accentColor, color: accentColor === "#C9A84C" ? "#071629" : "white" }}>
        {sending ? "Sending…" : buttonLabel}
      </button>
      <p className="text-[11px] text-[#9CA3AF] text-center font-light">We respond within 24 hours. Your details are never shared.</p>
    </div>
  );
}

export default function ContactMain() {
  const [activeTab, setActiveTab] = useState<"homes" | "solicitors">("homes");
  return (
    <section className="bg-white px-[5vw] py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
        <div className="lg:col-span-3">
          <FadeIn direction="left">
            <div className="flex mb-8 border-b border-[#0B1F3A]/10">
              {(["homes", "solicitors"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`flex items-center gap-2.5 px-6 py-4 text-[12px] tracking-[0.08em] uppercase font-medium transition-colors relative ${activeTab === tab ? "text-[#0B1F3A]" : "text-[#9CA3AF] hover:text-[#6B7280]"}`}>
                  {tab === "homes" ? <Home size={13} strokeWidth={1.5} /> : <Scale size={13} strokeWidth={1.5} />}
                  {tab === "homes" ? "Neighbourhood Homes" : "Neighbourhood Solicitors"}
                  {activeTab === tab && <motion.div layoutId="contact-tab" className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: tab === "homes" ? "#C9A84C" : "#1A4B8C" }} />}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {activeTab === "homes" ? (
                <motion.div key="homes" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <h2 className="text-[#0B1F3A] leading-tight mb-2" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 300 }}>Speak with Our Property Team</h2>
                  <p className="text-[#6B7280] text-[14px] font-light leading-relaxed mb-7">For property sales, land, off-plan developments, viewings, and investment enquiries.</p>
                  <ContactForm interests={INTERESTS} placeholder="What are you interested in?" accentColor="#C9A84C" buttonLabel="Send to Neighbourhood Homes" recipient="homes" />
                </motion.div>
              ) : (
                <motion.div key="solicitors" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <h2 className="text-[#0B1F3A] leading-tight mb-2" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 300 }}>Reach Neighbourhood Solicitors</h2>
                  <p className="text-[#6B7280] text-[14px] font-light leading-relaxed mb-7">For title searches, deed preparation, C of O processing, and all property legal matters. <span className="text-[#1A4B8C]">They are an independent firm and take all clients directly.</span></p>
                  <ContactForm interests={SOLICITOR_INTERESTS} placeholder="What legal service do you need?" accentColor="#1A4B8C" buttonLabel="Send to Neighbourhood Solicitors" recipient="solicitors" />
                </motion.div>
              )}
            </AnimatePresence>
          </FadeIn>
        </div>
        <div className="lg:col-span-2 space-y-5">
          <FadeIn direction="right" delay={0.15}>
            <div className="border border-[#0B1F3A]/10 bg-white relative overflow-hidden">
              <div className="h-0.5 bg-[#C9A84C]" />
              <div className="p-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#C9A84C]/12 flex items-center justify-center"><Home size={14} strokeWidth={1.5} className="stroke-[#C9A84C]" /></div>
                  <div><div className="text-[#0B1F3A] text-[16px] font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>Neighbourhood Homes</div><div className="text-[9px] tracking-[0.18em] uppercase text-[#C9A84C]">Ecosystem Ltd.</div></div>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: "Phone", value: "+2349013280477, +2348130019388", href: "tel:+2349013280477" },
                    { icon: Mail, label: "Email", value: "info@neighborhoodhomes.ng", href: "mailto:info@neighborhoodhomes.ng" },
                  ].map((row) => (
                    <a key={row.label} href={row.href} className="flex items-start gap-3 group">
                      <div className="w-8 h-8 bg-[#F9F6F0] group-hover:bg-[#C9A84C]/12 flex items-center justify-center flex-shrink-0 transition-colors">
                        <row.icon size={12} strokeWidth={1.5} className="stroke-[#C9A84C]" />
                      </div>
                      <div><div className="text-[10px] tracking-[0.12em] uppercase text-[#9CA3AF] mb-0.5">{row.label}</div><div className="text-[13px] text-[#0B1F3A] font-light group-hover:text-[#C9A84C] transition-colors">{row.value}</div></div>
                    </a>
                  ))}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#F9F6F0] flex items-center justify-center flex-shrink-0"><MapPin size={12} strokeWidth={1.5} className="stroke-[#C9A84C]" /></div>
                    <div><div className="text-[10px] tracking-[0.12em] uppercase text-[#9CA3AF] mb-0.5">Office</div><div className="text-[13px] text-[#0B1F3A] font-light leading-relaxed">No 10 gimbiya Street First Floor, Garki Area 11, Abuja</div></div>
                  </div>
                  <div className="mt-3">
                    <iframe
                      title="Head Office map preview"
                      src="https://www.google.com/maps?q=No+10+gimbiya+Street+Garki+Area+11+Abuja&output=embed"
                      className="w-full h-36 border-0 rounded-sm"
                      loading="lazy"
                    />
                    <div className="mt-2 text-[12px]"><a href="https://www.google.com/maps/search/?api=1&query=No+10+gimbiya+Street+Garki+Area+11+Abuja" target="_blank" rel="noopener noreferrer" className="text-[#A8893E] hover:text-[#C9A84C]">Open in Google Maps</a></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#F9F6F0] flex items-center justify-center flex-shrink-0"><MessageSquare size={12} strokeWidth={1.5} className="stroke-[#C9A84C]" /></div>
                    <div><div className="text-[10px] tracking-[0.12em] uppercase text-[#9CA3AF] mb-0.5">WhatsApp</div><a href="https://wa.me/2348130019388" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#0B1F3A] font-light hover:text-[#C9A84C] transition-colors">+2348130019388</a></div>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-[#0B1F3A]/08"><div className="text-[11px] text-[#9CA3AF] font-light"><span className="font-medium text-[#0B1F3A]">Hours:</span> Mon – Sat, 8:00am – 6:00pm WAT</div></div>
              </div>
            </div>
            <div className="border border-[#1A4B8C]/20 bg-white relative overflow-hidden">
              <div className="h-0.5 bg-[#1A4B8C]" />
              <div className="p-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#1A4B8C]/10 flex items-center justify-center"><Scale size={14} strokeWidth={1.5} className="stroke-[#1A4B8C]" /></div>
                  <div><div className="text-[#0B1F3A] text-[16px] font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>Neighbourhood Solicitors</div><div className="text-[9px] tracking-[0.18em] uppercase text-[#1A4B8C]">Independent Legal Partner</div></div>
                </div>
                <div className="space-y-4">
                  <a href="tel:+2349131769300" className="flex items-start gap-3 group"><div className="w-8 h-8 bg-[#F9F6F0] group-hover:bg-[#1A4B8C]/08 flex items-center justify-center flex-shrink-0 transition-colors"><Phone size={12} strokeWidth={1.5} className="stroke-[#1A4B8C]" /></div><div><div className="text-[10px] tracking-[0.12em] uppercase text-[#9CA3AF] mb-0.5">Phone</div><div className="text-[13px] text-[#0B1F3A] font-light group-hover:text-[#1A4B8C] transition-colors">+2349131769300</div></div></a>
                  <a href="mailto:info@neighbourhoodsolicitors.ng" className="flex items-start gap-3 group"><div className="w-8 h-8 bg-[#F9F6F0] group-hover:bg-[#1A4B8C]/08 flex items-center justify-center flex-shrink-0 transition-colors"><Mail size={12} strokeWidth={1.5} className="stroke-[#1A4B8C]" /></div><div><div className="text-[10px] tracking-[0.12em] uppercase text-[#9CA3AF] mb-0.5">Email</div><div className="text-[13px] text-[#0B1F3A] font-light group-hover:text-[#1A4B8C] transition-colors">info@neighbourhoodsolicitors.ng</div></div></a>
                </div>
                <p className="text-[11px] text-[#9CA3AF] font-light italic mt-5 pt-5 border-t border-[#0B1F3A]/08 leading-relaxed">Neighbourhood Solicitors is an independent law firm. They take all clients directly and are not a department of Neighbourhood Homes.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
