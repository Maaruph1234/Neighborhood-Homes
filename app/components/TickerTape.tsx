"use client";

const items = [
  "Maitama Heritage Residence — ₦185M",
  "Asokoro Grand Villa — Under Construction",
  "Ikoyi Luxury Terrace — ₦220M",
  "Lekki Phase 1 Duplex — ₦95M",
  "Kaduna GRA Residential Plot — ₦18M",
  "Wuse II Commercial Plot — ₦45M",
  "Kano New Estate Development — Under Construction",
  "Victoria Island Corner Plot — ₦130M",
  "Garki Diplomat Mansion — ₦250M",
  "Kaduna South Family Home — ₦55M",
  "Kano Commercial Land — ₦28M",
];

export default function TickerTape() {
  const doubled = [...items, ...items];
  return (
    <div className="bg-[#C9A84C] py-3 overflow-hidden">
      <div className="flex gap-0 whitespace-nowrap" style={{ animation: "ticker 40s linear infinite" }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 text-[11px] tracking-[0.12em] uppercase text-[#071629] font-medium px-8">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#071629]/40" aria-hidden />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
