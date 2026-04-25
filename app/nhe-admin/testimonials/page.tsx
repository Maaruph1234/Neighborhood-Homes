"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Star, AlertCircle, Check } from "lucide-react";
import { createClient } from "../../../lib/supabase/client";
import type { Testimonial } from "../../../lib/types";

const EMPTY: Partial<Testimonial> = { name: "", role: "", text: "", image: "", featured: true };

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading]  = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]  = useState<Partial<Testimonial>>(EMPTY);
  const [isNew, setIsNew]      = useState(true);
  const [saving, setSaving]    = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [error, setError]      = useState("");
  const [success, setSuccess]  = useState("");
  const supabase = createClient();

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    setTestimonials(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing({ ...EMPTY }); setIsNew(true); setError(""); setModalOpen(true);
  };
  const openEdit = (t: Testimonial) => {
    setEditing({ ...t }); setIsNew(false); setError(""); setModalOpen(true);
  };

  const handleSave = async () => {
    if (!editing.name || !editing.role || !editing.text) {
      setError("Name, role, and review text are required."); return;
    }
    setSaving(true); setError("");
    const payload = { ...editing };
    delete (payload as any).id;
    delete (payload as any).created_at;

    let dbError;
    if (isNew) {
      ({ error: dbError } = await supabase.from("testimonials").insert([payload]));
    } else {
      ({ error: dbError } = await supabase.from("testimonials").update(payload).eq("id", editing.id!));
    }
    if (dbError) { setError("Failed to save."); setSaving(false); return; }
    setSuccess(isNew ? "Testimonial added." : "Testimonial updated.");
    setTimeout(() => setSuccess(""), 3000);
    setModalOpen(false);
    load();
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this testimonial?")) return;
    setDeleting(id);
    await supabase.from("testimonials").delete().eq("id", id);
    setDeleting(null);
    load();
  };

  const toggleFeatured = async (t: Testimonial) => {
    await supabase.from("testimonials").update({ featured: !t.featured }).eq("id", t.id);
    setTestimonials((prev) => prev.map((x) => x.id === t.id ? { ...x, featured: !t.featured } : x));
  };

  const inputClass = "w-full border border-[#0B1F3A]/12 px-3 py-2.5 text-[13px] text-[#0B1F3A] outline-none focus:border-[#C9A84C] transition-colors font-light bg-white";
  const labelClass = "block text-[10px] tracking-[0.14em] uppercase text-[#9CA3AF] mb-1.5 font-medium";

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1
            className="text-[#0B1F3A] text-[30px] font-light"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Testimonials
          </h1>
          <p className="text-[#9CA3AF] text-[13px] font-light">
            {testimonials.length} total · {testimonials.filter((t) => t.featured).length} featured on site
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-[#C9A84C] text-[#071629] text-[12px] tracking-[0.1em] uppercase font-medium px-5 py-3 hover:bg-[#E8C97A] transition-colors"
        >
          <Plus size={14} />
          Add Testimonial
        </button>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 px-4 py-3 mb-6"
          >
            <Check size={14} className="stroke-green-500" />
            <p className="text-green-600 text-[13px] font-light">{success}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map((i) => <div key={i} className="h-32 bg-[#F9F6F0] animate-pulse" />)}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white border border-[#0B1F3A]/08 py-20 text-center text-[#9CA3AF] text-[14px] font-light">
          No testimonials yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white border border-[#0B1F3A]/08 p-6 relative"
            >
              {/* Featured badge */}
              <button
                onClick={() => toggleFeatured(t)}
                title={t.featured ? "Remove from site" : "Show on site"}
                className={`absolute top-4 right-4 flex items-center gap-1 text-[10px] tracking-wider uppercase px-2.5 py-1 transition-colors ${
                  t.featured
                    ? "bg-[#C9A84C]/15 text-[#A8893E] hover:bg-[#C9A84C]/25"
                    : "bg-[#F3F4F6] text-[#9CA3AF] hover:bg-[#E5E7EB]"
                }`}
              >
                <Star size={9} className={t.featured ? "fill-[#C9A84C] stroke-none" : "fill-none stroke-current"} />
                {t.featured ? "Featured" : "Hidden"}
              </button>

              {/* Quote mark */}
              <div
                className="text-[#C9A84C]/15 leading-none select-none mb-3"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "60px", lineHeight: 1 }}
              >
                "
              </div>

              <p className="text-[#6B7280] text-[13px] leading-[1.8] font-light mb-5 line-clamp-4 italic">
                {t.text}
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-[#0B1F3A]/08">
                {t.image ? (
                  <img src={t.image} alt={t.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#C9A84C]/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#C9A84C] text-[14px] font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                      {t.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[#0B1F3A] truncate">{t.name}</p>
                  <p className="text-[11px] text-[#9CA3AF]">{t.role}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => openEdit(t)} className="w-7 h-7 border border-[#0B1F3A]/10 flex items-center justify-center text-[#9CA3AF] hover:text-[#0B1F3A] transition-colors" title="Edit">
                    <Pencil size={11} />
                  </button>
                  <button onClick={() => handleDelete(t.id)} disabled={deleting === t.id} className="w-7 h-7 border border-[#0B1F3A]/10 flex items-center justify-center text-[#9CA3AF] hover:text-red-500 transition-colors disabled:opacity-40" title="Delete">
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/50 z-50" />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:w-[540px] bg-white z-50 flex flex-col max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#0B1F3A]/08 flex-shrink-0">
                <h2 className="text-[#0B1F3A] text-[22px] font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                  {isNew ? "Add Testimonial" : "Edit Testimonial"}
                </h2>
                <button onClick={() => setModalOpen(false)} className="text-[#9CA3AF] hover:text-[#0B1F3A] transition-colors"><X size={18} /></button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-3">
                    <AlertCircle size={14} className="stroke-red-500 flex-shrink-0" />
                    <p className="text-red-600 text-[13px] font-light">{error}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Client Name *</label>
                    <input type="text" placeholder="e.g. Chukwuemeka Eze" value={editing.name || ""} onChange={(e) => setEditing((p) => ({ ...p, name: e.target.value }))} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Role / Title *</label>
                    <input type="text" placeholder="e.g. Business Owner, Lagos" value={editing.role || ""} onChange={(e) => setEditing((p) => ({ ...p, role: e.target.value }))} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Review Text *</label>
                  <textarea rows={5} placeholder="What did the client say?" value={editing.text || ""} onChange={(e) => setEditing((p) => ({ ...p, text: e.target.value }))} className={`${inputClass} resize-none`} />
                </div>
                <div>
                  <label className={labelClass}>Photo URL (optional)</label>
                  <input type="text" placeholder="https://..." value={editing.image || ""} onChange={(e) => setEditing((p) => ({ ...p, image: e.target.value }))} className={inputClass} />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditing((p) => ({ ...p, featured: !p.featured }))}
                    className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${editing.featured ? "bg-[#C9A84C]" : "bg-[#E5E7EB]"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${editing.featured ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                  <label className="text-[13px] text-[#6B7280] font-light cursor-pointer" onClick={() => setEditing((p) => ({ ...p, featured: !p.featured }))}>
                    Show on homepage and about page
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#0B1F3A]/08 flex-shrink-0">
                <button onClick={() => setModalOpen(false)} className="px-5 py-2.5 text-[12px] tracking-[0.08em] uppercase text-[#9CA3AF] hover:text-[#0B1F3A] border border-[#0B1F3A]/12 hover:border-[#0B1F3A]/30 transition-colors font-medium">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-[#C9A84C] text-[#071629] text-[12px] tracking-[0.08em] uppercase font-medium hover:bg-[#E8C97A] transition-colors disabled:opacity-60">
                  {saving ? "Saving…" : isNew ? "Add Testimonial" : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
