interface SectionLabelProps {
  text: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionLabel({ text, centered = false, light = false }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""}`}>
      <div className="w-9 h-px bg-[#C9A84C] flex-shrink-0" />
      <span
        className={`text-[10px] tracking-[0.2em] uppercase font-medium ${
          light ? "text-[#C9A84C]" : "text-[#A8893E]"
        }`}
      >
        {text}
      </span>
      {centered && <div className="w-9 h-px bg-[#C9A84C] flex-shrink-0" />}
    </div>
  );
}
