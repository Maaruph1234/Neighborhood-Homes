"use client";
import { motion } from "framer-motion";
import { Home, Building2, MapPin, Settings, TrendingUp, FileText, Check, ArrowRight } from "lucide-react";
import FadeIn from "../../components/FadeIn";

const services = [
  {
    id: "sales",
    icon: Home,
    label: "Property Sales",
    tagline: "Buy or sell with confidence — from first enquiry to final handover.",
    description:
      "Whether you're buying your first home, upgrading to something larger, or selling an existing property, our team guides you through every stage with clarity and professionalism. We handle valuations, viewings, negotiations, and all coordination with legal teams — so nothing falls through the cracks.",
    includes: [
      "Free property valuation",
      "Professional listing preparation",
      "Targeted buyer or seller matching",
      "Negotiation and offer management",
      "Coordination with Neighbourhood Solicitors",
      "Post-sale follow-through and handover",
    ],
    cities: ["Abuja", "Lagos", "Kaduna", "Kano"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    cta: "Browse Properties",
    ctaHref: "/properties",
    flip: false,
  },
  {
    id: "offplan",
    icon: Building2,
    label: "Off-plan & New Developments",
    tagline: "Secure your unit early — at the best price, before the market catches up.",
    description:
      "Off-plan buying is one of the strongest investment strategies in Nigeria's growing property market. You purchase at today's price for a property that will be worth significantly more at completion. We manage the entire process — from identifying credible developers to reviewing contracts and tracking construction milestones on your behalf.",
    includes: [
      "Vetted developer partnerships only",
      "Contract review and risk assessment",
      "Stage payment schedule management",
      "Construction progress monitoring",
      "Handover inspection and snag list",
      "Legal completion via Neighbourhood Solicitors",
    ],
    cities: ["Abuja", "Kaduna", "Kano"],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    cta: "See Off-plan Listings",
    ctaHref: "/properties",
    flip: true,
  },
  {
    id: "land",
    icon: MapPin,
    label: "Land Acquisition",
    tagline: "Prime plots, fully verified — in the locations that matter most.",
    description:
      "Land fraud is one of the biggest risks in Nigerian real estate. Our land acquisition service eliminates that risk entirely. Every plot we list has been physically inspected, verified with local authorities, and confirmed to have a clean title history before it ever reaches a client. We cover residential, commercial, and agricultural plots.",
    includes: [
      "Physical site inspection and verification",
      "Title search and ownership confirmation",
      "Government documentation review",
      "Survey plan review and validation",
      "Purchase process management",
      "Title perfection with Neighbourhood Solicitors",
    ],
    cities: ["Abuja", "Lagos", "Kaduna", "Kano"],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    cta: "View Land Listings",
    ctaHref: "/properties",
    flip: false,
  },
  {
    id: "management",
    icon: Settings,
    label: "Property Management",
    tagline: "Your investment, protected — without the headaches of day-to-day oversight.",
    description:
      "For property owners who want their investment working for them without the burden of managing it themselves, we offer comprehensive property management. From routine maintenance to handling occupancy, condition monitoring, and annual reviews — we treat your asset as if it were our own.",
    includes: [
      "Property condition monitoring and reporting",
      "Maintenance coordination and oversight",
      "Periodic inspection with written reports",
      "Annual property valuation update",
      "Documentation and record keeping",
      "Direct communication with owners",
    ],
    cities: ["Abuja", "Lagos", "Kaduna", "Kano"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    cta: "Enquire About Management",
    ctaHref: "/contact",
    flip: true,
  },
  {
    id: "investment",
    icon: TrendingUp,
    label: "Investment Analysis",
    tagline: "Data before decisions — so your money works as hard as you do.",
    description:
      "Buying property in Nigeria without proper analysis is one of the most common and costly mistakes investors make. Our investment consultants provide structured, honest market analysis — covering price trends, growth projections, comparable sales, rental yield potential, and risk factors — specific to the location and type of property you're considering.",
    includes: [
      "Location-specific market analysis",
      "Comparable sales and price benchmarking",
      "Growth projection modelling",
      "Risk and opportunity assessment",
      "Portfolio strategy consultation",
      "Written investment report",
    ],
    cities: ["Abuja", "Lagos", "Kaduna", "Kano"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    cta: "Book a Consultation",
    ctaHref: "/contact",
    flip: false,
  },
  {
    id: "legal",
    icon: FileText,
    label: "Legal & Documentation",
    tagline: "Every transaction, legally sound — handled by Neighbourhood Solicitors.",
    description:
      "This service is delivered in partnership with Neighbourhood Solicitors, an independent law firm. They handle the full legal side of your property transaction — from verifying that what you're buying is genuinely available to sell, to preparing and registering the final deed. No transaction is complete without proper legal documentation, and we make sure yours never is.",
    includes: [
      "Title search and verification",
      "Deed of assignment preparation",
      "Contract of sale review and advice",
      "Certificate of Occupancy (C of O) processing",
      "Governor's Consent applications",
      "Post-completion documentation and registration",
    ],
    cities: ["Abuja", "Lagos", "Kaduna", "Kano"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    cta: "Contact Neighbourhood Solicitors",
    ctaHref: "/contact",
    flip: true,
    isSolicitors: true,
  },
];

export default function ServiceDetail() {
  return (
    <section className="bg-white">
      {services.map((service, idx) => (
        <div
          key={service.id}
          id={service.id}
          className={`px-[5vw] py-24 ${idx % 2 !== 0 ? "bg-[#F9F6F0]" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                service.flip ? "lg:flex lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <FadeIn direction={service.flip ? "right" : "left"}>
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={service.label}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {/* City tags */}
                  <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                    {service.cities.map((city) => (
                      <span
                        key={city}
                        className="bg-[#071629]/80 backdrop-blur-sm text-white text-[10px] tracking-[0.1em] uppercase px-3 py-1.5"
                      >
                        {city}
                      </span>
                    ))}
                  </div>

                  {/* Solicitors badge */}
                  {service.isSolicitors && (
                    <div className="absolute -top-4 -right-4 bg-[#1A4B8C] px-4 py-2 text-center hidden lg:block">
                      <div className="text-[9px] tracking-[0.16em] uppercase text-white/70 mb-0.5">Delivered by</div>
                      <div
                        className="text-white text-[13px] font-light"
                        style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                      >
                        Neighbourhood Solicitors
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>

              {/* Content */}
              <FadeIn direction={service.flip ? "left" : "right"} delay={0.15}>
                {/* Service number */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="text-[#0B1F3A]/10 leading-none select-none"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "72px",
                      fontWeight: 300,
                      lineHeight: 1,
                    }}
                  >
                    0{idx + 1}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#0B1F3A] flex items-center justify-center flex-shrink-0">
                      <service.icon size={15} strokeWidth={1.5} className="stroke-[#C9A84C]" />
                    </div>
                    <span className="text-[10px] tracking-[0.18em] uppercase text-[#A8893E] font-medium">
                      {service.label}
                    </span>
                  </div>
                </div>

                <h2
                  className="text-[#0B1F3A] leading-[1.1] tracking-tight mb-4"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(26px, 3vw, 38px)",
                    fontWeight: 300,
                  }}
                >
                  {service.tagline}
                </h2>

                <p className="text-[#6B7280] text-[14px] leading-[1.9] font-light mb-8">
                  {service.description}
                </p>

                {/* What's included */}
                <div className="mb-8">
                  <p className="text-[10px] tracking-[0.16em] uppercase text-[#9CA3AF] mb-4 font-medium">
                    What's included
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 bg-[#C9A84C]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={10} strokeWidth={2.5} className="stroke-[#C9A84C]" />
                        </div>
                        <span className="text-[13px] text-[#6B7280] leading-snug font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solicitors note if applicable */}
                {service.isSolicitors && (
                  <div className="border-l-2 border-[#1A4B8C]/40 pl-4 mb-8 bg-[#1A4B8C]/04 py-3 pr-4">
                    <p className="text-[13px] text-[#6B7280] leading-relaxed font-light">
                      This service is provided by{" "}
                      <span className="text-[#1A4B8C] font-medium">Neighbourhood Solicitors</span>
                      {" "}— an independent law firm operating as a trusted partner of
                      Neighbourhood Homes Ecosystem Ltd.
                    </p>
                  </div>
                )}

                <motion.a
                  href={service.ctaHref}
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-3 bg-[#0B1F3A] text-white text-[12px] tracking-[0.1em] uppercase font-medium px-8 py-4 hover:bg-[#1A4B8C] transition-colors group"
                >
                  {service.cta}
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </FadeIn>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
