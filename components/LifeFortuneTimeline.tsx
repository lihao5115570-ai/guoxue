import type { DayunStage } from "@/lib/bazi/types";

export function LifeFortuneTimeline({ stages }: { stages: DayunStage[] }) {
  const points = stages.map((stage, index) => `${(index / (stages.length - 1)) * 100},${100 - stage.score}`);
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
        {stages.map((stage, index) => (
          <div key={stage.age} className={`border p-3 text-center ${index === 2 ? "border-[#C9A86A]/60 bg-[#C9A86A]/12" : "border-black/10 bg-white/38"}`}>
            <div className="text-xs text-[#77736B]">{stage.age}</div>
            <div className="my-1 text-lg font-semibold">{stage.ganzhi}</div>
            <div className="text-xs text-[#77736B]">{stage.years}</div>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 100 44" className="h-44 w-full overflow-visible">
        <path d="M0 22 H100" stroke="rgba(17,17,15,.08)" />
        <polyline points={points.join(" ")} fill="none" stroke="#C9A86A" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
        {points.map((point, index) => {
          const [x, y] = point.split(",");
          return <circle key={point} cx={x} cy={y} r={index === 2 ? 1.9 : 1.3} fill={index === 2 ? "#9C7B46" : "#C9A86A"} />;
        })}
      </svg>
    </div>
  );
}
