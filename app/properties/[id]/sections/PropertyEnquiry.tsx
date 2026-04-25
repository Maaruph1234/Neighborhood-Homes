"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare, Check } from "lucide-react";
import { createClient } from "../../../../lib/supabase/client";

type Property = { id: number; name: string; price: string; };

export default function PropertyEnquiry({ property }: { property: Property }) {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [phone, setPhone]     = useState("");
  const [message, setMessage] = useState(`Hi, I'm interested in ${property.name}. Please get in touch.`);
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const supabase = createClient();

  const handleSubmit = async () => {
    if (!name || !email) return;
    setSending(true);
    await supabase.from("enquiries").insert([{
      name, email, phone, message,
      interest: `Property enquiry: ${property.name}`,
      property_id: property.id,
      property_name: property.name,
      recipient: "homes",
      read: false,
    }]);
    setSending(false);
    setSent(true);
  };

  const ic = "w-full border border-[#0B1F3A]/12 px-4 py-3.5 text-[14px] text-[#0B1F3A] placeholder-[#D1D5DB] outline-none focus:border-[#C9A84C] transition-colors font-light bg-white";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="sticky top-[84px] space-y-5"
    >
      {/* Quick contact buttons */}
      <div className="border border-[#0B1F3A]/10 bg-white">
        <div className="h-0.5 bg-[#C9A84C]" />
        <div className="p-6">
          <p className="text-[10px] tracking-[0.16em] uppercase text-[#9CA3AF] mb-5 font-medium">
            Interested in this property?
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="tel:+2349013280477"
              className="flex items-center gap-3 bg-[#0B1F3A] text-white text-[12px] tracking-[0.08em] uppercase font-medium px-5 py-3.5 hover:bg-[#1A4B8C] transition-colors"
            >
              <Phone size={14} className="flex-shrink-0" />
              Call Us Now
            </a>
            <a
              href="https://wa.me/2348130019388"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-[#0B1F3A]/15 text-[#0B1F3A] text-[12px] tracking-[0.08em] uppercase font-medium px-5 py-3.5 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              style={{ background: "transparent" }}
            >
              <MessageSquare size={14} className="flex-shrink-0" />
              WhatsApp Us
            </a>
            <a
              href="mailto:info@neighborhoodhomes.ng"
              className="flex items-center gap-3 border border-[#0B1F3A]/15 text-[#0B1F3A] text-[12px] tracking-[0.08em] uppercase font-medium px-5 py-3.5 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              <Mail size={14} className="flex-shrink-0" />
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Enquiry form */}
      <div className="border border-[#0B1F3A]/10 bg-white">
        <div className="h-0.5 bg-[#0B1F3A]/15" />
        <div className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <MessageSquare size={14} strokeWidth={1.5} className="stroke-[#C9A84C]" />
            <p className="text-[11px] tracking-[0.14em] uppercase text-[#0B1F3A] font-medium">
              Send Enquiry
            </p>
          </div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center"
            >
              <div className="w-12 h-12 bg-[#C9A84C]/15 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={20} className="stroke-[#C9A84C]" strokeWidth={2} />
              </div>
              <p className="text-[#0B1F3A] text-[18px] font-light mb-2"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                Enquiry Sent
              </p>
              <p className="text-[#9CA3AF] text-[13px] font-light">
                We'll be in touch with you shortly.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              <input type="text" placeholder="Your full name *" value={name} onChange={(e) => setName(e.target.value)} className={ic} />
              <input type="email" placeholder="Email address *" value={email} onChange={(e) => setEmail(e.target.value)} className={ic} />
              <input type="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className={ic} />
              <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={`${ic} resize-none`} />
              <button
                onClick={handleSubmit}
                disabled={sending}
                className="w-full bg-[#C9A84C] text-[#071629] text-[12px] tracking-[0.1em] uppercase font-medium py-4 hover:bg-[#E8C97A] active:scale-[0.99] transition-all disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send Enquiry"}
              </button>
              <p className="text-[11px] text-[#9CA3AF] text-center font-light">
                We'll respond within 24 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
