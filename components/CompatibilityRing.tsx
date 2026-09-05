export function CompatibilityRing({ score = 86 }: { score?: number }) {
  return (
    <div className="grid place-items-center">
      <div className="grid h-52 w-52 place-items-center rounded-full" style={{ background: `conic-gradient(#C9A86A ${score}%, rgba(17,17,15,.08) 0)` }}>
        <div className="grid h-36 w-36 place-items-center rounded-full bg-[#F7F4EC] text-center shadow-soft">
          <strong className="text-5xl">{score}</strong>
          <span className="text-sm text-[#77736B]">缘分指数</span>
        </div>
      </div>
    </div>
  );
}
