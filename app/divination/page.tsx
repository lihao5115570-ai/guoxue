import { DivinationForm } from "./DivinationForm";
import { SEOArticleFlow } from "@/components/SEOArticleFlow";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "在线起卦｜六爻八卦在线排卦",
  "问一件事，起一卦，通过传统六爻卦象获得另一种观察角度。",
  "/divination"
);

function HexagramPreview() {
  const lines = [false, true, true, false, true, false];

  return (
    <div className="hexagram-stage p-7">
      <span className="coin left-8 top-10">乾</span>
      <span className="coin bottom-10 right-10 [animation-delay:1.2s]">坤</span>
      <span className="coin right-28 top-16 [animation-delay:2.1s]">问</span>
      <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-between">
        <div>
          <span className="text-sm font-semibold tracking-[0.22em] text-[var(--gold-bright)]">ORIENTAL DIVINATION</span>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[0.08em] text-[var(--paper)]">
            把问题拆成卦象、动爻与行动建议
          </h2>
          <p className="mt-5 max-w-md leading-8 text-[var(--muted)]">
            起卦页会先记录你的问题类型，再生成本卦、变卦、动爻、机会点、阻力点与下一步建议。结果用于梳理思路，不替代现实判断。
          </p>
        </div>
        <div className="mt-8 grid gap-3">
          {lines.map((broken, index) => (
            <span key={index} className={broken ? "hex-line broken" : "hex-line"} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DivinationPage() {
  return (
    <>
      <section className="section relative overflow-hidden">
        <div className="page-shell grid min-h-[680px] items-center gap-8 lg:grid-cols-[.96fr_1.04fr]">
          <div className="reveal-in grid gap-7">
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                {["事业", "财运", "感情", "选择", "人际"].map((item) => (
                  <span key={item} className="border border-[rgba(214,181,108,.24)] bg-[rgba(255,248,225,.035)] px-3 py-1 text-sm font-semibold text-[var(--gold-bright)]">
                    {item}
                  </span>
                ))}
              </div>
              <h1 className="text-5xl font-semibold leading-tight tracking-[0.08em] text-[var(--paper)] md:text-6xl">
                问一件事，起一卦
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-9 text-[var(--muted)]">
                当你对一件事犹豫不决，可以把问题写下来。系统会用简化六爻模型生成卦象报告，帮助你看清目前局势、可推进的位置和需要避开的风险。
              </p>
            </div>
            <HexagramPreview />
          </div>
          <div className="reveal-in [animation-delay:160ms]">
            <DivinationForm />
          </div>
        </div>
      </section>
      <SEOArticleFlow
        title="起卦相关文章"
        intro="起卦页下方补充六爻、问题分类、卦象解读和理性使用说明，让工具页也有搜索承接内容。"
        articles={[
          { title: "起卦前应该怎么提问？", summary: "问题越具体，解读越容易落地。建议围绕一件事提问，例如事业选择、合作判断、感情沟通或近期计划。", tag: "提问" },
          { title: "六爻卦象主要看什么？", summary: "六爻会观察本卦、变卦、动爻、世应和用神等信息。当前工具先用简化模型提供文化参考。", tag: "六爻" },
          { title: "起卦结果可以替代决策吗？", summary: "不建议把起卦结果当成唯一依据。它更适合帮助整理思路，现实决策还需要结合事实、成本和风险。", tag: "理性使用" },
          { title: "事业、感情、财运问题怎么分类？", summary: "不同问题关注点不同：事业看机会和阻力，感情看沟通和关系，财运看风险和节奏。", tag: "分类" }
        ]}
      />
    </>
  );
}
