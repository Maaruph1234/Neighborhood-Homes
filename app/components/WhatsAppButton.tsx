"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { createClient } from "../../lib/supabase/client";

export default function WhatsAppButton() {
  const [tooltip, setTooltip] = useState(true);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", interest: "", message: "" });

  // Neighbourhood Homes WhatsApp number (without +)
  const waNumber = "2348130019388";
  const waMessage = encodeURIComponent("Hi, I found you on Neighbourhood Homes and I'd like to enquire about a property.");
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;


  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.phone) return;
    setSending(true);
    try {
      // Post to our server route which uses a secure service role key
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name || 'WhatsApp user',
          email: '',
          phone: form.phone,
          interest: form.interest || 'WhatsApp enquiry',
          message: form.message || form.interest || 'Enquiry via WhatsApp widget',
          recipient: 'homes',
        }),
      });
      setSent(true);
      setForm({ name: "", phone: "", interest: "", message: "" });
    } catch (err) {
      // swallow - the admin can still use the external wa.me link
      console.error("WhatsApp form submit error:", err);
    }
    setSending(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 bg-white border border-[#0B1F3A]/10 shadow-lg px-4 py-3 max-w-[220px]"
          >
            <div className="flex-1">
              <p className="text-[#0B1F3A] text-[12px] font-medium leading-tight mb-0.5">Chat with us</p>
              <p className="text-[#9CA3AF] text-[11px] font-light">Typically replies in minutes</p>
            </div>
            <button onClick={() => setTooltip(false)} className="text-[#9CA3AF] hover:text-[#0B1F3A] transition-colors flex-shrink-0" aria-label="Close">
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        onClick={() => { setOpen(true); setTooltip(false); }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.5, type: "spring" }}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
        style={{ background: "#25D366" }}
        aria-label="Chat on WhatsApp"
      >
        {/* WhatsApp SVG icon */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center p-6">
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.18 }} className="w-full max-w-md bg-white rounded-sm shadow-xl overflow-hidden">
              <div className="p-4 border-b border-[#0B1F3A]/8 flex items-center justify-between">
                <div>
                  <h3 className="text-[#0B1F3A] font-medium">Message us on WhatsApp</h3>
                  <p className="text-[12px] text-[#6B7280]">Tell us what you want and we'll follow up.</p>
                </div>
                <button onClick={() => setOpen(false)} className="text-[#9CA3AF] hover:text-[#0B1F3A]"><X size={16} /></button>
              </div>
              <div className="p-4">
                {sent ? (
                  <div className="py-8 text-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#25D366]/10">
                      <Check size={20} strokeWidth={2} style={{ color: "#25D366" }} />
                    </div>
                    <div className="text-[#0B1F3A] font-medium mb-1">Message queued</div>
                    <div className="text-[13px] text-[#6B7280]">Thanks — we'll get back to you shortly.</div>
                    <div className="mt-4 flex gap-2 justify-center">
                      <button onClick={() => { setSent(false); setOpen(false); }} className="text-sm text-[#0B1F3A]">Close</button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input type="text" placeholder="Your name" value={form.name} onChange={update("name")} className="w-full border border-[#0B1F3A]/12 px-3 py-2 text-sm" />
                    <input type="tel" placeholder="Phone number *" value={form.phone} onChange={update("phone")} className="w-full border border-[#0B1F3A]/12 px-3 py-2 text-sm" />
                    <input type="text" placeholder="What are you looking for? (e.g. 2-bed house, land in Garki)" value={form.interest} onChange={update("interest")} className="w-full border border-[#0B1F3A]/12 px-3 py-2 text-sm" />
                    <textarea rows={3} placeholder="More details (optional)" value={form.message} onChange={update("message")} className="w-full border border-[#0B1F3A]/12 px-3 py-2 text-sm resize-none" />
                    <div className="flex gap-2">
                      <button onClick={handleSubmit} disabled={sending} className="flex-1 bg-[#25D366] text-white py-2 rounded-sm text-sm">{sending ? "Sending…" : "Send"}</button>
                      <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center border border-[#0B1F3A]/12 py-2 rounded-sm text-sm">Open WhatsApp</a>
                    </div>
                    <p className="text-[12px] text-[#9CA3AF] text-center">If you prefer, click "Open WhatsApp" to continue in the app.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
