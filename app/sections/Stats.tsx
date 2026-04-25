"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { value: 2500, suffix: "+", label: "Total Properties" },
  { value: 1200, suffix: "+", label: "Happy Clients" },
  { value: 4, suffix: "", label: "Cities Covered" },
  { value: 15, suffix: "yrs", label: "Market Experience" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const step = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      <span className="text-[#C9A84C] text-[24px] ml-1">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="bg-[#0B1F3A] py-16 px-[5vw]">
      <div className="grid grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`text-center py-6 px-4 ${
              i < stats.length - 1 ? "border-r border-white/08" : ""
            }`}
          >
            <div
              className="text-white leading-none mb-2"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(40px, 5vw, 56px)",
                fontWeight: 300,
              }}
            >
              <Counter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-[11px] tracking-[0.14em] uppercase text-white/35 font-light">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
