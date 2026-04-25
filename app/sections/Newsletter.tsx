"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "../components/FadeIn";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-[#C9A84C] px-[5vw] py-14">
      <FadeIn>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
          <div className="flex-1">
            <h3
              className="text-[#071629] leading-tight mb-1"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(24px, 3vw, 32px)",
                fontWeight: 300,
              }}
            >
              Stay Ahead of the Market
            </h3>
            <p className="text-[#071629]/60 text-[13px] font-light">
              Exclusive listings, market insights, and investment tips — delivered to your inbox.
            </p>
          </div>

          <div className="flex flex-1 max-w-md gap-0">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full py-4 px-6 bg-[#071629] text-white text-[13px] text-center font-light"
              >
                ✓ Thank you! You're now subscribed.
              </motion.div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 py-4 px-5 text-[14px] text-[#0B1F3A] bg-white/90 placeholder-[#9CA3AF] outline-none font-light"
                />
                <button
                  onClick={() => email && setSubmitted(true)}
                  className="bg-[#071629] text-white text-[11px] tracking-[0.1em] uppercase font-medium px-7 py-4 hover:bg-[#0B1F3A] transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </>
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
