import { MapPin, Phone, Mail, Twitter, Facebook, Instagram, Linkedin, Scale, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Properties: ["Houses for Sale", "Land for Sale", "Under Construction", "Abuja Listings", "Lagos Listings", "Kaduna Listings", "Kano Listings"],
  Company: ["About Us", "Our Services", "Blog", "Careers"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"],
};

export default function Footer() {
  return (
    <footer className="bg-[#071629] px-[5vw] pt-20 pb-10">

      {/* Ecosystem bar */}
      <div className="border border-white/06 p-6 mb-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
          <div>
            <div
              className="text-white text-[15px] font-semibold tracking-wide leading-none mb-0.5"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Neighbourhood Homes
            </div>
            <div className="text-[9px] tracking-[0.2em] text-[#C9A84C] uppercase">
              Ecosystem Ltd.
            </div>
          </div>
          <div className="text-white/15 text-lg hidden sm:block">|</div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-[#1A4B8C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Scale size={12} className="stroke-[#1A4B8C] opacity-80" strokeWidth={1.5} />
            </div>
            <div>
              <div
                className="text-white/70 text-[14px] font-light leading-none mb-0.5"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Neighbourhood Solicitors
              </div>
              <div className="text-[9px] tracking-[0.16em] text-[#1A4B8C] uppercase">
                Independent Legal Partner
              </div>
            </div>
          </div>
        </div>
        <a
          href="/about"
          className="flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase text-white/30 hover:text-[#C9A84C] transition-colors group"
        >
          About the Ecosystem
          <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Main footer grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-white/07">

        <div className="lg:col-span-2">
          <div
            className="text-white text-[18px] font-semibold tracking-wide leading-none mb-1"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Neighbourhood Homes
          </div>
          <div className="text-[9px] tracking-[0.22em] text-[#C9A84C] uppercase mb-5">
            Ecosystem Ltd.
          </div>
          <p className="text-white/40 text-[13px] leading-relaxed font-light max-w-[260px] mb-7">
            Nigeria's premium property company — houses, land, and off-plan developments
            across Abuja, Lagos, Kaduna, and Kano.
          </p>
          <div className="border-l-2 border-[#1A4B8C]/40 pl-4 mb-7">
            <p className="text-white/30 text-[12px] leading-relaxed font-light">
              Legal support by <span className="text-white/60">Neighbourhood Solicitors</span> — an independent law firm serving a wide range of legal matters.
            </p>
          </div>
          <div className="flex gap-3">
            {/* Only show social icons if links are configured; using plain icons for now to keep layout clean */}
            <div className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/45"><Twitter size={13} /></div>
            <div className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/45"><Facebook size={13} /></div>
            <div className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/45"><Instagram size={13} /></div>
            <div className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/45"><Linkedin size={13} /></div>
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <div className="text-[10px] tracking-[0.18em] uppercase text-[#A8893E] mb-5 font-medium">{title}</div>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link}>
                  {/* Render as plain text if we don't have an explicit page for the link */}
                  {link === "About Us" ? (
                    <a href="/about" className="text-white/40 text-[13px] font-light hover:text-white transition-colors">{link}</a>
                  ) : link === "Our Services" ? (
                    <a href="/services" className="text-white/40 text-[13px] font-light hover:text-white transition-colors">{link}</a>
                  ) : (
                    <span className="text-white/40 text-[13px] font-light">{link}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <div className="text-[10px] tracking-[0.18em] uppercase text-[#A8893E] mb-5 font-medium">Contact Us</div>
          <div className="flex flex-col gap-4 mb-7">
            <div className="flex gap-3">
              <MapPin size={14} className="stroke-[#C9A84C] flex-shrink-0 mt-0.5" />
              <span className="text-white/40 text-[13px] leading-relaxed font-light">No 10 gimbiya Street First Floor, Garki Area 11, Abuja</span>
            </div>
            <div className="flex gap-3 items-center">
              <Phone size={14} className="stroke-[#C9A84C] flex-shrink-0" />
              <span className="text-white/40 text-[13px] font-light">+2349013280477, +2348130019388</span>
            </div>
            <div className="flex gap-3 items-center">
              <Mail size={14} className="stroke-[#C9A84C] flex-shrink-0" />
              <span className="text-white/40 text-[13px] font-light">info@neighborhoodhomes.ng</span>
            </div>
          </div>
          <div className="pt-6 border-t border-white/06">
            <div className="text-[10px] tracking-[0.18em] uppercase text-[#1A4B8C] mb-4 font-medium">Neighbourhood Solicitors</div>
            <div className="flex gap-3 items-center mb-2">
              <Phone size={14} className="stroke-[#1A4B8C]/70 flex-shrink-0" />
              <span className="text-white/30 text-[13px] font-light">+2349131769300</span>
            </div>
            <div className="flex gap-3 items-center">
              <Mail size={14} className="stroke-[#1A4B8C]/70 flex-shrink-0" />
              <span className="text-white/30 text-[13px] font-light">info@neighbourhoodsolicitors.ng</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-7">
        <p className="text-white/25 text-[12px]">© 2026 Neighbourhood Homes Ecosystem Ltd. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="/privacy" className="text-white/25 text-[12px] hover:text-white/50 transition-colors">Privacy Policy</a>
          <a href="/terms" className="text-white/25 text-[12px] hover:text-white/50 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
