"use client";

export default function PropertyBreadcrumb({ property }: { property: { name: string; city: string } }) {
  return (
    <div className="px-[5vw] py-4 border-b border-[#0B1F3A]/08 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase">
        <a href="/" className="text-[#9CA3AF] hover:text-[#C9A84C] transition-colors">Home</a>
        <span className="text-[#D1D5DB]">/</span>
        <a href="/properties" className="text-[#9CA3AF] hover:text-[#C9A84C] transition-colors">Properties</a>
        <span className="text-[#D1D5DB]">/</span>
        <span className="text-[#0B1F3A] font-medium truncate max-w-[200px]">{property.name}</span>
      </div>
    </div>
  );
}
