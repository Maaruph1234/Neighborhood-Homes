"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, X, Upload, Check,
  Search, MapPin, AlertCircle
} from "lucide-react";
import { createClient } from "../../../lib/supabase/client";
import type { Property } from "../../../lib/types";

const EMPTY: Partial<Property> = {
  name: "", location: "", city: "Abuja", price: "",
  badge: "For Sale", badge_type: "sale", type: "house",
  beds: 0, baths: 0, sqm: 0, image: "", description: "", featured: false,
};

export default function AdminProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [modalOpen, setModalOpen]   = useState(false);
  const [editing, setEditing]       = useState<Partial<Property>>(EMPTY);
  const [isNew, setIsNew]           = useState(true);
  const [saving, setSaving]         = useState(false);
  const [deleting, setDeleting]     = useState<number | null>(null);
  const [imageFile, setImageFile]   = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError]           = useState("");
  const [success, setSuccess]       = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });
    setProperties(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing({ ...EMPTY });
    setIsNew(true);
    setImageFile(null);
    setImagePreview("");
    setError("");
    setModalOpen(true);
  };

  const openEdit = (p: Property) => {
    setEditing({ ...p });
    setIsNew(false);
    setImageFile(null);
    setImagePreview(p.image || "");
    setError("");
    setModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!editing.name || !editing.location || !editing.price) {
      setError("Name, location, and price are required."); return;
    }
    setSaving(true);
    setError("");

    let imageUrl = editing.image || "";

    // Upload image if a new file was selected
    if (imageFile) {
      const ext  = imageFile.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("property-images")
        .upload(path, imageFile, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        setError("Image upload failed. Please try again."); setSaving(false); return;
      }
      const { data: urlData } = supabase.storage.from("property-images").getPublicUrl(uploadData.path);
      imageUrl = urlData.publicUrl;
    }

    const payload = { ...editing, image: imageUrl };
    delete (payload as any).id;
    delete (payload as any).created_at;

    let dbError;
    if (isNew) {
      ({ error: dbError } = await supabase.from("properties").insert([payload]));
    } else {
      ({ error: dbError } = await supabase.from("properties").update(payload).eq("id", editing.id!));
    }

    if (dbError) {
      setError("Failed to save. Please try again."); setSaving(false); return;
    }

    setSuccess(isNew ? "Property added successfully." : "Property updated.");
    setTimeout(() => setSuccess(""), 3000);
    setModalOpen(false);
    load();
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this property? This cannot be undone.")) return;
    setDeleting(id);
    await supabase.from("properties").delete().eq("id", id);
    setDeleting(null);
    load();
  };

  const filtered = properties.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
  );

  const inputClass = "w-full border border-[#0B1F3A]/12 px-3 py-2.5 text-[13px] text-[#0B1F3A] outline-none focus:border-[#C9A84C] transition-colors font-light bg-white";
  const labelClass = "block text-[10px] tracking-[0.14em] uppercase text-[#9CA3AF] mb-1.5 font-medium";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1
            className="text-[#0B1F3A] text-[30px] font-light leading-tight"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Properties
          </h1>
          <p className="text-[#9CA3AF] text-[13px] font-light">{properties.length} listings total</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-[#C9A84C] text-[#071629] text-[12px] tracking-[0.1em] uppercase font-medium px-5 py-3 hover:bg-[#E8C97A] transition-colors"
        >
          <Plus size={14} />
          Add Property
        </button>
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 px-4 py-3 mb-6"
          >
            <Check size={14} className="stroke-green-500" />
            <p className="text-green-600 text-[13px] font-light">{success}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 stroke-[#9CA3AF]" />
        <input
          type="text"
          placeholder="Search by name or location…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm border border-[#0B1F3A]/12 pl-9 pr-4 py-2.5 text-[13px] text-[#0B1F3A] placeholder-[#D1D5DB] outline-none focus:border-[#C9A84C] transition-colors font-light"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#0B1F3A]/08 overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1,2,3,4].map((i) => <div key={i} className="h-14 bg-[#F9F6F0] animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-[#9CA3AF] text-[14px] font-light">
            {search ? "No properties match your search." : "No properties yet. Add your first one."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#0B1F3A]/08 bg-[#F9F6F0]">
                  {["Property", "City", "Type", "Price", "Status", ""].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] tracking-[0.14em] uppercase text-[#9CA3AF] font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr
                    key={p.id}
                    className={`border-b border-[#0B1F3A]/05 hover:bg-[#F9F6F0] transition-colors ${i === filtered.length - 1 ? "border-b-0" : ""}`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 bg-[#EDE8DF] flex-shrink-0 overflow-hidden">
                          {p.image && <img src={p.image} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-[#0B1F3A] leading-tight">{p.name}</p>
                          <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1 mt-0.5">
                            <MapPin size={9} className="stroke-[#C9A84C]" />{p.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-[#6B7280] font-light">{p.city}</td>
                    <td className="px-5 py-4 text-[13px] text-[#6B7280] font-light capitalize">{p.type}</td>
                    <td className="px-5 py-4 text-[13px] text-[#0B1F3A] font-medium">{p.price}</td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] tracking-wider uppercase px-2.5 py-1 font-medium ${
                        p.badge_type === "sale" ? "bg-[#C9A84C]/12 text-[#A8893E]" :
                        p.badge_type === "land" ? "bg-[#1A4B8C]/10 text-[#1A4B8C]" :
                        "bg-[#0B1F3A]/08 text-[#6B7280]"
                      }`}>
                        {p.badge}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => openEdit(p)}
                          className="w-8 h-8 border border-[#0B1F3A]/10 flex items-center justify-center text-[#9CA3AF] hover:text-[#0B1F3A] hover:border-[#0B1F3A]/30 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deleting === p.id}
                          className="w-8 h-8 border border-[#0B1F3A]/10 flex items-center justify-center text-[#9CA3AF] hover:text-red-500 hover:border-red-200 transition-colors disabled:opacity-40"
                          title="Delete"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-4 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:top-8 lg:bottom-8 lg:w-[680px] bg-white z-50 flex flex-col overflow-hidden"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#0B1F3A]/08 flex-shrink-0">
                <h2
                  className="text-[#0B1F3A] text-[22px] font-light"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  {isNew ? "Add New Property" : "Edit Property"}
                </h2>
                <button onClick={() => setModalOpen(false)} className="text-[#9CA3AF] hover:text-[#0B1F3A] transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Modal body */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-3">
                    <AlertCircle size={14} className="stroke-red-500 flex-shrink-0" />
                    <p className="text-red-600 text-[13px] font-light">{error}</p>
                  </div>
                )}

                {/* Image upload */}
                <div>
                  <label className={labelClass}>Property Photo</label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="relative border-2 border-dashed border-[#0B1F3A]/12 hover:border-[#C9A84C] transition-colors cursor-pointer h-40 flex items-center justify-center overflow-hidden bg-[#F9F6F0]"
                  >
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[#071629]/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-white text-[12px] tracking-wider uppercase flex items-center gap-2">
                            <Upload size={13} /> Change Photo
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <Upload size={20} className="stroke-[#C9A84C] mx-auto mb-2" strokeWidth={1.5} />
                        <p className="text-[#9CA3AF] text-[13px] font-light">Click to upload photo</p>
                        <p className="text-[#D1D5DB] text-[11px] mt-1">JPG, PNG, WEBP — max 5MB</p>
                      </div>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  <p className="text-[11px] text-[#9CA3AF] mt-1.5 font-light">
                    Or paste an image URL below:
                  </p>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={editing.image || ""}
                    onChange={(e) => { setEditing((p) => ({ ...p, image: e.target.value })); setImagePreview(e.target.value); }}
                    className={`${inputClass} mt-1.5`}
                  />
                </div>

                {/* Name */}
                <div>
                  <label className={labelClass}>Property Name *</label>
                  <input type="text" placeholder="e.g. Maitama Heritage Residence" value={editing.name || ""} onChange={(e) => setEditing((p) => ({ ...p, name: e.target.value }))} className={inputClass} />
                </div>

                {/* Location + City */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Location *</label>
                    <input type="text" placeholder="e.g. Maitama, Abuja" value={editing.location || ""} onChange={(e) => setEditing((p) => ({ ...p, location: e.target.value }))} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>City *</label>
                    <select value={editing.city || "Abuja"} onChange={(e) => setEditing((p) => ({ ...p, city: e.target.value as any }))} className={inputClass}>
                      <option>Abuja</option>
                      <option>Lagos</option>
                      <option>Kaduna</option>
                      <option>Kano</option>
                    </select>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className={labelClass}>Price *</label>
                  <input type="text" placeholder="e.g. ₦185M" value={editing.price || ""} onChange={(e) => setEditing((p) => ({ ...p, price: e.target.value }))} className={inputClass} />
                </div>

                {/* Type + Badge */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Property Type</label>
                    <select
                      value={editing.type || "house"}
                      onChange={(e) => {
                        const t = e.target.value as "house" | "land";
                        setEditing((p) => ({
                          ...p, type: t,
                          badge: t === "land" ? "Land" : "For Sale",
                          badge_type: t === "land" ? "land" : "sale",
                        }));
                      }}
                      className={inputClass}
                    >
                      <option value="house">House</option>
                      <option value="land">Land</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Status</label>
                    <select
                      value={editing.badge_type || "sale"}
                      onChange={(e) => {
                        const bt = e.target.value as any;
                        const badgeMap: Record<string, string> = { sale: "For Sale", land: "Land", construction: "Under Construction" };
                        setEditing((p) => ({ ...p, badge_type: bt, badge: badgeMap[bt] }));
                      }}
                      className={inputClass}
                    >
                      <option value="sale">For Sale</option>
                      <option value="land">Land</option>
                      <option value="construction">Under Construction</option>
                    </select>
                  </div>
                </div>

                {/* Beds / Baths / Sqm */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Bedrooms</label>
                    <input type="number" min={0} value={editing.beds ?? 0} onChange={(e) => setEditing((p) => ({ ...p, beds: parseInt(e.target.value) || 0 }))} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Bathrooms</label>
                    <input type="number" min={0} value={editing.baths ?? 0} onChange={(e) => setEditing((p) => ({ ...p, baths: parseInt(e.target.value) || 0 }))} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Size (sqm)</label>
                    <input type="number" min={0} value={editing.sqm ?? 0} onChange={(e) => setEditing((p) => ({ ...p, sqm: parseInt(e.target.value) || 0 }))} className={inputClass} />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className={labelClass}>Description (optional)</label>
                  <textarea rows={3} placeholder="Brief description of the property…" value={editing.description || ""} onChange={(e) => setEditing((p) => ({ ...p, description: e.target.value }))} className={`${inputClass} resize-none`} />
                </div>

                {/* Featured toggle */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditing((p) => ({ ...p, featured: !p.featured }))}
                    className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${editing.featured ? "bg-[#C9A84C]" : "bg-[#E5E7EB]"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${editing.featured ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                  <label className="text-[13px] text-[#6B7280] font-light cursor-pointer" onClick={() => setEditing((p) => ({ ...p, featured: !p.featured }))}>
                    Show on homepage as featured listing
                  </label>
                </div>
              </div>

              {/* Modal footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#0B1F3A]/08 flex-shrink-0">
                <button onClick={() => setModalOpen(false)} className="px-5 py-2.5 text-[12px] tracking-[0.08em] uppercase text-[#9CA3AF] hover:text-[#0B1F3A] border border-[#0B1F3A]/12 hover:border-[#0B1F3A]/30 transition-colors font-medium">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#C9A84C] text-[#071629] text-[12px] tracking-[0.08em] uppercase font-medium hover:bg-[#E8C97A] transition-colors disabled:opacity-60"
                >
                  {saving ? "Saving…" : isNew ? "Add Property" : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
