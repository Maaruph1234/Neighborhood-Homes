"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, MessageSquare, Star, TrendingUp, Eye, Plus } from "lucide-react";
import { createClient } from "../../../lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ properties: 0, enquiries: 0, unread: 0, testimonials: 0 });
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const [
        { count: propCount },
        { count: enqCount },
        { count: unreadCount },
        { count: testiCount },
        { data: recentEnq },
      ] = await Promise.all([
        supabase.from("properties").select("*", { count: "exact", head: true }),
        supabase.from("enquiries").select("*", { count: "exact", head: true }),
        supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("read", false),
        supabase.from("testimonials").select("*", { count: "exact", head: true }),
        supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(5),
      ]);

      setStats({
        properties: propCount || 0,
        enquiries: enqCount || 0,
        unread: unreadCount || 0,
        testimonials: testiCount || 0,
      });
      setRecent(recentEnq || []);
      setLoading(false);
    };
    load();
  }, [supabase]);

  const statCards = [
    { label: "Total Properties",  value: stats.properties,  icon: Building2,     href: "/nhe-admin/properties",   color: "#C9A84C" },
    { label: "Total Enquiries",   value: stats.enquiries,   icon: MessageSquare, href: "/nhe-admin/enquiries",     color: "#1A4B8C" },
    { label: "Unread Enquiries",  value: stats.unread,      icon: Eye,           href: "/nhe-admin/enquiries",     color: "#DC2626" },
    { label: "Testimonials",      value: stats.testimonials,icon: Star,          href: "/nhe-admin/testimonials",  color: "#059669" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-[#0B1F3A] text-[30px] font-light leading-tight mb-1"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Dashboard
        </h1>
        <p className="text-[#9CA3AF] text-[13px] font-light">
          Welcome back. Here's what's happening with Neighbourhood Homes.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((card, i) => (
          <motion.button
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            onClick={() => router.push(card.href)}
            className="bg-white border border-[#0B1F3A]/08 p-6 text-left hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-9 h-9 flex items-center justify-center"
                style={{ background: `${card.color}15` }}
              >
                <card.icon size={16} strokeWidth={1.5} style={{ stroke: card.color }} />
              </div>
              <TrendingUp size={13} className="stroke-[#9CA3AF] group-hover:stroke-[#C9A84C] transition-colors" />
            </div>
            {loading ? (
              <div className="h-8 w-12 bg-[#F9F6F0] animate-pulse mb-1" />
            ) : (
              <div
                className="text-[#0B1F3A] leading-none mb-1"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "36px",
                  fontWeight: 300,
                }}
              >
                {card.value}
              </div>
            )}
            <div className="text-[11px] tracking-[0.1em] uppercase text-[#9CA3AF]">
              {card.label}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Quick actions + recent enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Quick actions */}
        <div className="bg-white border border-[#0B1F3A]/08 p-6">
          <h2
            className="text-[#0B1F3A] text-[18px] font-light mb-5"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Quick Actions
          </h2>
          <div className="space-y-3">
            {[
              { label: "Add New Property",   href: "/nhe-admin/properties?action=new", icon: Plus,         color: "#C9A84C" },
              { label: "View Enquiries",      href: "/nhe-admin/enquiries",             icon: MessageSquare, color: "#1A4B8C" },
              { label: "Add Testimonial",     href: "/nhe-admin/testimonials?action=new", icon: Star,       color: "#059669" },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => router.push(action.href)}
                className="w-full flex items-center gap-3 px-4 py-3 border border-[#0B1F3A]/08 hover:border-[#C9A84C]/40 hover:bg-[#F9F6F0] transition-all duration-200 text-left group"
              >
                <div
                  className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                  style={{ background: `${action.color}12` }}
                >
                  <action.icon size={13} strokeWidth={1.5} style={{ stroke: action.color }} />
                </div>
                <span className="text-[13px] text-[#6B7280] group-hover:text-[#0B1F3A] transition-colors font-light">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent enquiries */}
        <div className="lg:col-span-2 bg-white border border-[#0B1F3A]/08 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2
              className="text-[#0B1F3A] text-[18px] font-light"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Recent Enquiries
            </h2>
            <button
              onClick={() => router.push("/nhe-admin/enquiries")}
              className="text-[11px] tracking-[0.08em] uppercase text-[#C9A84C] hover:text-[#A8893E] transition-colors"
            >
              View All
            </button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map((i) => (
                <div key={i} className="h-14 bg-[#F9F6F0] animate-pulse" />
              ))}
            </div>
          ) : recent.length === 0 ? (
            <div className="py-10 text-center text-[#9CA3AF] text-[13px] font-light">
              No enquiries yet.
            </div>
          ) : (
            <div className="space-y-0">
              {recent.map((enq, i) => (
                <div
                  key={enq.id}
                  className={`flex items-center gap-4 py-3.5 ${i < recent.length - 1 ? "border-b border-[#0B1F3A]/06" : ""}`}
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${!enq.read ? "bg-[#C9A84C]" : "bg-[#E5E7EB]"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-[#0B1F3A] truncate">{enq.name}</p>
                    <p className="text-[12px] text-[#9CA3AF] font-light truncate">{enq.interest || enq.message?.slice(0, 50)}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className={`text-[10px] tracking-wider uppercase px-2 py-0.5 ${
                      enq.recipient === "solicitors"
                        ? "bg-[#1A4B8C]/10 text-[#1A4B8C]"
                        : "bg-[#C9A84C]/12 text-[#A8893E]"
                    }`}>
                      {enq.recipient === "solicitors" ? "Solicitors" : "Homes"}
                    </span>
                    <p className="text-[11px] text-[#9CA3AF] mt-1 font-light">
                      {new Date(enq.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
