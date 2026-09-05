import type { HexagramResult } from "@/lib/divination/types";

export function HexagramResultCard({ result }: { result: HexagramResult }) {
  return (
    <div className="soft-panel grid gap-6 p-6 lg:grid-cols-[220px_1fr]">
      <div className="grid place-items-center border border-black/10 bg-white/38 p-6 text-center">
        <div className="text-7xl leading-none">{result.symbol}</div>
        <div className="mt-4 text-2xl font-semibold">{result.originalHexagram}</div>
        {result.changedHexagram && <p className="mt-2 text-sm text-[#77736B]">变卦：{result.changedHexagram}</p>}
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
          <div><span className="text-[#77736B]">上卦</span><strong className="block text-lg">{result.upperTrigram}</strong></div>
          <div><span className="text-[#77736B]">下卦</span><strong className="block text-lg">{result.lowerTrigram}</strong></div>
          <div><span className="text-[#77736B]">动爻</span><strong className="block text-lg">{result.changingLines.map((line) => line + 1).join("、") || "无"}</strong></div>
          <div><span className="text-[#77736B]">分类</span><strong className="block text-lg">{result.category}</strong></div>
        </div>
        <div className="grid gap-2">
          {result.lines.map((line, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="w-10 text-xs text-[#77736B]">{index + 1}爻</span>
              {line ? <span className="h-3 w-36 bg-[#11110F]" /> : <><span className="h-3 w-16 bg-[#11110F]" /><span className="h-3 w-16 bg-[#11110F]" /></>}
              {result.changingLines.includes(index) && <span className="h-2 w-2 rounded-full bg-[#C9A86A]" />}
            </div>
          )).reverse()}
        </div>
      </div>
    </div>
  );
}
