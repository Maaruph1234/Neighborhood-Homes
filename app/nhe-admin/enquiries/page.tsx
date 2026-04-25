"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Trash2, Eye, EyeOff, Search, X, Scale, Home } from "lucide-react";
import { createClient } from "../../../lib/supabase/client";
import type { Enquiry } from "../../../lib/types";

export default function AdminEnquiries() {
  const [enquiries, setEnquiries]   = useState<Enquiry[]>([]);
  const [loading, setLoading]       = useState(true);
  const [filter, setFilter]         = useState<"all" | "homes" | "solicitors" | "unread">("all");
  const [search, setSearch]         = useState("");
  const [selected, setSelected]     = useState<Enquiry | null>(null);
  const [deleting, setDeleting]     = useState<number | null>(null);
  const supabase = createClient();

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    setEnquiries(data || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const markRead = async (id: number, read: boolean) => {
    await supabase.from("enquiries").update({ read }).eq("id", id);
    setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, read } : e));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, read } : prev);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this enquiry?")) return;
    setDeleting(id);
    await supabase.from("enquiries").delete().eq("id", id);
    if (selected?.id === id) setSelected(null);
    setDeleting(null);
    load();
  };

  const openEnquiry = async (enq: Enquiry) => {
    setSelected(enq);
    if (!enq.read) await markRead(enq.id, true);
  };

  const filtered = enquiries.filter((e) => {
    if (filter === "unread" && e.read) return false;
    if (filter === "homes" && e.recipient !== "homes") return false;
    if (filter === "solicitors" && e.recipient !== "solicitors") return false;
    if (search) {
      const q = search.toLowerCase();
      return e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.message.toLowerCase().includes(q);
    }
    return true;
  });

  const unreadCount = enquiries.filter((e) => !e.read).length;

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-[#0B1F3A] text-[30px] font-light leading-tight"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Enquiries
        </h1>
        <p className="text-[#9CA3AF] text-[13px] font-light">
          {enquiries.length} total · {unreadCount} unread
        </p>
      </div>

      {/* Filters + search */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {(["all", "unread", "homes", "solicitors"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-[11px] tracking-[0.08em] uppercase border transition-all ${
                filter === f
                  ? "bg-[#0B1F3A] text-white border-[#0B1F3A]"
                  : "text-[#6B7280] border-[#0B1F3A]/15 hover:border-[#0B1F3A]/40"
              }`}
            >
              {f}{f === "unread" && unreadCount > 0 ? ` (${unreadCount})` : ""}
            </button>
          ))}
        </div>
        <div className="relative ml-auto">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 stroke-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search enquiries…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-[#0B1F3A]/12 pl-8 pr-4 py-2 text-[13px] text-[#0B1F3A] placeholder-[#D1D5DB] outline-none focus:border-[#C9A84C] transition-colors font-light w-48"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* List */}
        <div className="lg:col-span-2 bg-white border border-[#0B1F3A]/08 overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-3">
              {[1,2,3,4].map((i) => <div key={i} className="h-16 bg-[#F9F6F0] animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-[#9CA3AF] text-[13px] font-light">
              No enquiries found.
            </div>
          ) : (
            <div className="divide-y divide-[#0B1F3A]/05">
              {filtered.map((enq) => (
                <button
                  key={enq.id}
                  onClick={() => openEnquiry(enq)}
                  className={`w-full text-left px-5 py-4 hover:bg-[#F9F6F0] transition-colors relative ${
                    selected?.id === enq.id ? "bg-[#F9F6F0] border-l-2 border-[#C9A84C]" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${!enq.read ? "bg-[#C9A84C]" : "bg-transparent"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className={`text-[13px] truncate ${!enq.read ? "font-medium text-[#0B1F3A]" : "text-[#6B7280] font-light"}`}>
                          {enq.name}
                        </p>
                        <span className={`text-[9px] tracking-wider uppercase px-2 py-0.5 flex-shrink-0 ${
                          enq.recipient === "solicitors"
                            ? "bg-[#1A4B8C]/10 text-[#1A4B8C]"
                            : "bg-[#C9A84C]/12 text-[#A8893E]"
                        }`}>
                          {enq.recipient === "solicitors" ? "Solicitors" : "Homes"}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#9CA3AF] truncate font-light">
                        {enq.interest || enq.message?.slice(0, 45)}
                      </p>
                      <p className="text-[11px] text-[#C9A84C]/60 mt-1">
                        {new Date(enq.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-3">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-[#0B1F3A]/08 h-full"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#0B1F3A]/08">
                <div className="flex items-center gap-2">
                  {selected.recipient === "solicitors"
                    ? <Scale size={14} strokeWidth={1.5} className="stroke-[#1A4B8C]" />
                    : <Home size={14} strokeWidth={1.5} className="stroke-[#C9A84C]" />
                  }
                  <span className="text-[11px] tracking-[0.1em] uppercase text-[#9CA3AF]">
                    {selected.recipient === "solicitors" ? "Neighbourhood Solicitors" : "Neighbourhood Homes"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => markRead(selected.id, !selected.read)}
                    className="flex items-center gap-1.5 text-[11px] tracking-[0.06em] uppercase text-[#9CA3AF] hover:text-[#0B1F3A] transition-colors"
                    title={selected.read ? "Mark unread" : "Mark read"}
                  >
                    {selected.read ? <EyeOff size={13} /> : <Eye size={13} />}
                    {selected.read ? "Mark unread" : "Mark read"}
                  </button>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    disabled={deleting === selected.id}
                    className="flex items-center gap-1.5 text-[11px] tracking-[0.06em] uppercase text-[#9CA3AF] hover:text-red-500 transition-colors ml-2"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                </div>
              </div>

              {/* Panel body */}
              <div className="p-6">
                {/* Sender info */}
                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-[#0B1F3A]/08">
                  {[
                    { label: "Name",    value: selected.name },
                    { label: "Email",   value: selected.email },
                    { label: "Phone",   value: selected.phone || "—" },
                    { label: "Interest", value: selected.interest || "—" },
                  ].map((row) => (
                    <div key={row.label}>
                      <p className="text-[10px] tracking-[0.14em] uppercase text-[#9CA3AF] mb-1 font-medium">{row.label}</p>
                      {row.label === "Email" ? (
                        <a href={`mailto:${row.value}`} className="text-[13px] text-[#1A4B8C] font-light hover:underline">{row.value}</a>
                      ) : (
                        <p className="text-[13px] text-[#0B1F3A] font-light">{row.value}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Property ref */}
                {selected.property_name && (
                  <div className="mb-5 pb-5 border-b border-[#0B1F3A]/08">
                    <p className="text-[10px] tracking-[0.14em] uppercase text-[#9CA3AF] mb-1 font-medium">Re: Property</p>
                    <p className="text-[13px] text-[#0B1F3A] font-light">{selected.property_name}</p>
                  </div>
                )}

                {/* Message */}
                <div className="mb-6">
                  <p className="text-[10px] tracking-[0.14em] uppercase text-[#9CA3AF] mb-3 font-medium">Message</p>
                  <div className="bg-[#F9F6F0] p-4 border-l-2 border-[#C9A84C]">
                    <p className="text-[14px] text-[#0B1F3A] font-light leading-[1.85]">{selected.message}</p>
                  </div>
                </div>

                {/* Received */}
                <p className="text-[11px] text-[#9CA3AF] font-light">
                  Received: {new Date(selected.created_at).toLocaleString("en-GB", {
                    day: "numeric", month: "long", year: "numeric",
                    hour: "2-digit", minute: "2-digit"
                  })}
                </p>

                {/* Reply shortcut */}
                <a
                  href={`mailto:${selected.email}?subject=Re: Your Enquiry — Neighbourhood Homes`}
                  className="mt-6 inline-flex items-center gap-2 bg-[#0B1F3A] text-white text-[12px] tracking-[0.1em] uppercase font-medium px-6 py-3 hover:bg-[#1A4B8C] transition-colors"
                >
                  <Mail size={13} />
                  Reply via Email
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white border border-[#0B1F3A]/08 h-64 flex items-center justify-center">
              <div className="text-center">
                <Mail size={28} strokeWidth={1} className="stroke-[#D1D5DB] mx-auto mb-3" />
                <p className="text-[#9CA3AF] text-[13px] font-light">Select an enquiry to view it</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
