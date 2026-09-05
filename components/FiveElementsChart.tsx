import type { FiveElements } from "@/lib/bazi/types";

const rows = [
  ["wood", "木", "#2f7d68"],
  ["fire", "火", "#b95b4f"],
  ["earth", "土", "#b99a5f"],
  ["metal", "金", "#b6a16d"],
  ["water", "水", "#557282"]
] as const;

export function FiveElementsChart({ elements, dayMaster, dominantElement, weakElement, compact = false }: { elements: FiveElements; dayMaster: string; dominantElement: string; weakElement: string; compact?: boolean }) {
  const gradient = rows
    .reduce<{ parts: string[]; cursor: number }>((acc, [key, , color]) => {
      const next = acc.cursor + elements[key];
      acc.parts.push(`${color} ${acc.cursor}% ${next}%`);
      acc.cursor = next;
      return acc;
    }, { parts: [], cursor: 0 })
    .parts.join(", ");

  return (
    <div className={`grid ${compact ? "gap-4 lg:grid-cols-[180px_1fr]" : "gap-7 lg:grid-cols-[280px_1fr]"}`}>
      <div className={`mx-auto grid place-items-center rounded-full ${compact ? "h-44 w-44" : "h-64 w-64"}`} style={{ background: `conic-gradient(${gradient})` }}>
        <div className={`grid place-items-center rounded-full border border-black/10 bg-[#F7F4EC] text-center shadow-soft ${compact ? "h-24 w-24" : "h-36 w-36"}`}>
          <span className="text-xs text-[#77736B]">日主</span>
          <strong className={compact ? "text-2xl" : "text-3xl"}>{dayMaster}</strong>
        </div>
      </div>
      <div className={`grid content-center ${compact ? "gap-2" : "gap-4"}`}>
        {rows.map(([key, label, color]) => (
          <div key={key} className="grid grid-cols-[34px_1fr_42px] items-center gap-3 text-sm">
            <span>{label}</span>
            <span className="h-3 bg-black/5">
              <span className="block h-3" style={{ width: `${elements[key]}%`, background: color }} />
            </span>
            <span className="text-[#77736B]">{elements[key]}%</span>
          </div>
        ))}
        <p className={`${compact ? "text-xs leading-6" : "text-sm leading-7"} text-[#77736B]`}>五行偏旺：{dominantElement}。相对较弱：{weakElement}。这里呈现的是结构倾向，不是绝对吉凶。</p>
      </div>
    </div>
  );
}
