import { HexagramResultCard } from "@/components/HexagramResultCard";
import { generateHexagram } from "@/lib/divination/generator";
import { generateDivinationInterpretation } from "@/lib/divination/interpretation";
import { privateResultMetadata } from "@/lib/seo/metadata";

export const metadata = privateResultMetadata("你的起卦结果", "个人起卦结果页不进入公开索引。");

export default async function DivinationResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = generateHexagram("我最近适不适合换工作？", "事业", id);
  const interpretation = generateDivinationInterpretation(result);
  return (
    <section className="section">
      <div className="page-shell grid gap-7">
        <div>
          <h1 className="text-4xl font-semibold">你的起卦结果</h1>
          <p className="mt-3 text-lg text-[#77736B]">问题：{result.question}</p>
        </div>
        <HexagramResultCard result={result} />
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries({
            当前状态: interpretation.current,
            主要矛盾: interpretation.tension,
            有利因素: interpretation.support,
            需要注意: interpretation.caution,
            变化方向: interpretation.direction,
            观察建议: interpretation.advice
          }).map(([title, body]) => (
            <article key={title} className="border border-black/10 bg-white/45 p-5">
              <h2 className="mb-3 text-xl font-semibold">{title}</h2>
              <p className="leading-8 text-[#77736B]">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
