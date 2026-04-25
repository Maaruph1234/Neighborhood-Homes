"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionLabel from "../../components/SectionLabel";

const faqsHomes = [
  {
    q: "How do I schedule a property viewing?",
    a: "Simply fill in the contact form on this page or call us directly. Select the property you're interested in and we'll arrange a viewing at a time that works for you — in person or virtually.",
  },
  {
    q: "Which cities do you operate in?",
    a: "We currently have active listings across Abuja, Lagos, Kaduna, and Kano. We serve all four cities directly.",
  },
  {
    q: "Do you sell land as well as houses?",
    a: "Yes. We list residential and commercial plots across all three cities. Every land listing is physically inspected and title-verified before it reaches a client.",
  },
  {
    q: "What is an off-plan property and should I consider buying one?",
    a: "Off-plan means you're buying before construction is complete — usually at a lower price than the finished value. It's a strong investment strategy if done with a vetted developer. We only list off-plan projects from developers we've properly assessed.",
  },
  {
    q: "How long does a property purchase typically take?",
    a: "From offer acceptance to completion, most transactions take 4 to 8 weeks depending on the complexity of documentation and legal requirements. Our team — alongside Neighbourhood Solicitors — work to keep this timeline as tight as possible.",
  },
];

const faqsSolicitors = [
  {
    q: "Is Neighbourhood Solicitors the same company as Neighbourhood Homes?",
    a: "No. Neighbourhood Solicitors is an independent law firm that operates as a trusted partner of Neighbourhood Homes Ecosystem Ltd. They are a fully separate entity with their own clients, and you can engage them directly for any property legal matter.",
  },
  {
    q: "What does a title search involve?",
    a: "A title search confirms that the property being sold is genuinely owned by the seller, is free from legal encumbrances, and has no disputes or pending court orders attached to it. It is an essential step before any purchase.",
  },
  {
    q: "Do I need a C of O (Certificate of Occupancy) to buy land?",
    a: "Not all plots have a C of O, but you should understand what title the seller is offering. Neighbourhood Solicitors can advise on the title type, its implications, and handle perfection of title where needed.",
  },
  {
    q: "Can Neighbourhood Solicitors handle matters unrelated to Neighbourhood Homes properties?",
    a: "Yes. They are an independent firm and take clients for all property legal matters — not just those who've found their property through us.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#0B1F3A]/08 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span
          className={`text-[15px] leading-snug font-light transition-colors ${
            open ? "text-[#0B1F3A]" : "text-[#4B5563] group-hover:text-[#0B1F3A]"
          }`}
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "17px" }}
        >
          {q}
        </span>
        <div
          className={`w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
            open ? "text-[#C9A84C]" : "text-[#9CA3AF] group-hover:text-[#0B1F3A]"
          }`}
        >
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="text-[#6B7280] text-[14px] leading-[1.85] font-light pb-5 max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactFAQ() {
  return (
    <section className="bg-white px-[5vw] py-24 border-t border-[#0B1F3A]/08">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-14">
          <SectionLabel text="FAQs" />
          <h2
            className="text-[#0B1F3A] leading-[1.05] tracking-tight"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(30px, 3.5vw, 46px)",
              fontWeight: 300,
            }}
          >
            Common <em style={{ fontStyle: "italic" }}>Questions</em>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Homes FAQs */}
          <FadeIn direction="left">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#0B1F3A]/08">
              <div className="w-1.5 h-6 bg-[#C9A84C]" />
              <h3
                className="text-[#0B1F3A] text-[18px] font-light"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Neighbourhood Homes
              </h3>
            </div>
            <div>
              {faqsHomes.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </FadeIn>

          {/* Solicitors FAQs */}
          <FadeIn direction="right" delay={0.1}>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#0B1F3A]/08">
              <div className="w-1.5 h-6 bg-[#1A4B8C]" />
              <h3
                className="text-[#0B1F3A] text-[18px] font-light"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Neighbourhood Solicitors
              </h3>
            </div>
            <div>
              {faqsSolicitors.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </FadeIn>

        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-[#9CA3AF] text-[14px] font-light">
            Still have a question?{" "}
            <a
              href="mailto:info@neighborhoodhomes.ng"
              className="text-[#C9A84C] hover:text-[#A8893E] transition-colors underline underline-offset-2"
            >
              Email us directly
            </a>{" "}
            and we'll get back to you within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
