export function YearTrendChart({ values }: { values: number[] }) {
  const points = values.map((value, index) => `${(index / 11) * 100},${100 - value}`);
  return (
    <div className="border border-black/10 bg-white/45 p-5">
      <h3 className="mb-5 text-lg font-semibold">年度趋势</h3>
      <svg viewBox="0 0 100 48" className="h-44 w-full overflow-visible">
        {[20, 34, 48].map((y) => <path key={y} d={`M0 ${y} H100`} stroke="rgba(17,17,15,.08)" />)}
        <polyline points={points.join(" ")} fill="none" stroke="#9C7B46" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
        {points.map((point, index) => {
          const [x, y] = point.split(",");
          return (
            <g key={point}>
              <circle cx={x} cy={y} r="1.4" fill="#C9A86A" />
              <text x={x} y="47" textAnchor="middle" fontSize="3.2" fill="#77736B">{index + 1}月</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
