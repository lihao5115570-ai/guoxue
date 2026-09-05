export function TenGodsChart({ data }: { data: Record<string, number> }) {
  const max = Math.max(...Object.values(data));
  return (
    <div className="grid gap-3">
      {Object.entries(data).map(([name, value], index) => (
        <div key={name} className="grid grid-cols-[54px_1fr_34px] items-center gap-3 text-sm">
          <span>{name}</span>
          <span className="h-3 bg-black/5">
            <span className="block h-3" style={{ width: `${(value / max) * 100}%`, background: index % 3 === 0 ? "#2f7d68" : index % 3 === 1 ? "#C9A86A" : "#557282" }} />
          </span>
          <span className="text-right text-[#77736B]">{value}%</span>
        </div>
      ))}
    </div>
  );
}
