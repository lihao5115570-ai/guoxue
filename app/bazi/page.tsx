import { BirthForm } from "@/components/BirthForm";
import { SEOContentSection } from "@/components/SEOContentSection";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "八字排盘｜免费生辰八字、四柱八字、五行十神查询",
  "输入出生年月日时，免费查看八字排盘、四柱命盘、五行旺衰、十神结构、大运流年、事业财运、婚姻感情与完整命盘详批。",
  "/bazi"
);

function MiniIcon({ type }: { type: "chart" | "pillar" | "fire" | "star" | "coin" | "heart" | "calendar" | "book" }) {
  const common = "h-5 w-5";
  if (type === "chart") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 16V9" /><path d="M12 16V6" /><path d="M16 16v-4" />
      </svg>
    );
  }
  if (type === "pillar") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 4h12" /><path d="M8 4v16" /><path d="M16 4v16" /><path d="M5 20h14" /><path d="M8 10h8" />
      </svg>
    );
  }
  if (type === "fire") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21c-4 0-7-2.7-7-6.5 0-2.8 1.8-4.9 4.1-6.8.2 2.1 1.2 3.2 2.6 4.1-.2-3.4 1.2-6.1 4.3-8.8.3 3.2 3 5.5 3 9.4 0 5-3.2 8.6-7 8.6Z" />
      </svg>
    );
  }
  if (type === "coin") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8" /><path d="M8.8 12h6.4" /><path d="M12 7.8v8.4" />
      </svg>
    );
  }
  if (type === "heart") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20s-7-4.2-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.8-7 10-7 10Z" />
      </svg>
    );
  }
  if (type === "calendar") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 4v3" /><path d="M18 4v3" /><path d="M4 8h16" /><rect x="4" y="6" width="16" height="14" rx="1.5" />
      </svg>
    );
  }
  if (type === "book") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 5.5A3 3 0 0 1 8 4h11v15H8a3 3 0 0 0-3 1.5V5.5Z" /><path d="M5 5.5A3 3 0 0 1 8 7h11" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m12 3 2.1 5 5.4.5-4.1 3.5 1.2 5.3-4.6-2.8-4.6 2.8 1.2-5.3-4.1-3.5 5.4-.5L12 3Z" />
    </svg>
  );
}

const quickPoints = [
  { title: "四柱排盘", body: "年柱、月柱、日柱、时柱完整展示", icon: "pillar" as const, color: "text-[#9C7B46]", bg: "bg-[#fff6dc]" },
  { title: "五行强弱", body: "金木水火土比例、偏旺偏弱和喜用方向", icon: "fire" as const, color: "text-[#b95b4f]", bg: "bg-[#f8e8e5]" },
  { title: "十神详解", body: "事业、财运、感情、人际重点拆开看", icon: "chart" as const, color: "text-[#2f7d68]", bg: "bg-[#e5f3ed]" }
];

const resultHighlights = [
  { title: "你能看到什么？", body: "基础信息、四柱八字、五行分布、日主强弱、十神结构、大运流年。", icon: "book" as const },
  { title: "重点分析什么？", body: "性格画像、事业方向、财运模式、婚姻感情、健康与生活节奏。", icon: "star" as const },
  { title: "报告怎么用？", body: "把结果当作传统文化参考，用来做自我观察和阶段规划。", icon: "calendar" as const }
];

export default function BaziPage() {
  return (
    <>
      <section className="section">
        <div className="page-shell grid gap-8 lg:grid-cols-[.92fr_1.08fr]">
          <div>
            <div className="mb-5 flex max-w-xl flex-wrap gap-2 text-sm">
              {["八字排盘", "五行旺衰", "十神分析", "大运流年"].map((item, index) => (
                <span key={item} className={index % 2 === 0 ? "border border-[#C9A86A]/35 bg-[#fff6dc] px-3 py-1 text-[#9C7B46]" : "border border-[#2f7d68]/25 bg-[#e5f3ed] px-3 py-1 text-[#2f7d68]"}>
                  {item}
                </span>
              ))}
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">
              想知道自己的<span className="text-[#9C7B46]">命盘重点</span>在哪里？
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#59564e]">
              输入出生年月日时，生成一份包含<span className="font-semibold text-[#2f7d68]">四柱八字</span>、<span className="font-semibold text-[#b95b4f]">五行强弱</span>、<span className="font-semibold text-[#9C7B46]">十神结构</span>、事业财运、婚姻感情和大运流年的测算报告。
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {quickPoints.map((item) => (
                <article key={item.title} className={`${item.bg} p-4`}>
                  <div className={`${item.color} mb-3 inline-flex h-9 w-9 items-center justify-center bg-white/58`}>
                    <MiniIcon type={item.icon} />
                  </div>
                  <h2 className="text-base font-semibold">{item.title}</h2>
                  <p className="mt-1 text-xs leading-5 text-[#5f5a51]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="soft-panel p-5 md:p-6">
            <div className="mb-5 flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-[#11110F] text-[#C9A86A]">
                <MiniIcon type="chart" />
              </span>
              <div>
                <h2 className="text-xl font-semibold">开始生成八字报告？</h2>
                <p className="mt-1 text-sm leading-6 text-[#77736B]">填写出生信息后，立即查看结构化测算结果。</p>
              </div>
            </div>
            <BirthForm />
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="page-shell">
          <div className="grid gap-4 md:grid-cols-3">
            {resultHighlights.map((item, index) => (
              <article key={item.title} className={index === 1 ? "bg-[#11110F] p-5 text-[#F7F4EC]" : "bg-white/54 p-5"}>
                <div className={index === 1 ? "mb-4 text-[#C9A86A]" : "mb-4 text-[#9C7B46]"}>
                  <MiniIcon type={item.icon} />
                </div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className={index === 1 ? "mt-2 text-sm leading-7 text-white/70" : "mt-2 text-sm leading-7 text-[#5f5a51]"}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SEOContentSection
        title="八字排盘会分析哪些内容？"
        items={[
          { heading: "什么是八字排盘？", body: "八字排盘也叫四柱排盘、生辰八字排盘，会根据出生年、月、日、时排出年柱、月柱、日柱、时柱，用来观察命盘结构、五行旺衰、十神关系和人生阶段。" },
          { heading: "四柱分别代表什么？", body: "年柱、月柱、日柱、时柱分别对应不同时间层次和关系面向。日柱中的日干称为日主，是分析十神、财官印食、婚姻宫、事业运和财运倾向的重要参照。" },
          { heading: "五行缺什么怎么看？", body: "五行查询包括木、火、土、金、水的比例、流通和平衡。五行偏弱不等于一定不好，要结合日主强弱、喜用神、大运流年一起看。" },
          { heading: "十神有什么意义？", body: "十神包括比肩、劫财、食神、伤官、正财、偏财、正官、七杀、正印、偏印，可用于观察性格、事业、财运、感情、学习能力、人际关系和贵人运。" }
        ]}
      />

      <SEOContentSection
        title="结果报告重点看哪里？"
        items={[
          { heading: "事业运和工作方向？", body: "八字看事业会结合日主、官杀、印星、食伤、财星、大运流年，分析适合行业、职业选择、升职机会、工作变动、创业适合度和事业发展阶段。" },
          { heading: "财运、正财和偏财？", body: "八字财运分析会区分正财、偏财、守财能力、赚钱方式、财富积累、风险边界、流年财运和大运财运，不用一句会发财或不会发财来概括。" },
          { heading: "婚姻感情怎么读？", body: "八字看婚姻感情会关注夫妻宫、正缘、桃花、沟通方式、亲密关系、长期相处、合婚配对和感情阶段，但不会给出极端判断。" },
          { heading: "大运流年怎么用？", body: "大运代表十年阶段，流年代表年度触发。流年趋势适合观察事业财运变化、感情机会、健康节奏和人生阶段主题。" }
        ]}
      />

      <SEOContentSection
        title="常见问题"
        items={[
          { heading: "八字怎么看财运？", body: "可以从财星、日主强弱、食伤生财、官杀护财、大运流年财星出现等角度分析，重点是赚钱方式、现金流和风险边界。" },
          { heading: "八字怎么看婚姻？", body: "可以从夫妻宫、配偶星、桃花、人际关系、情绪表达和双方合盘来看，不建议只凭生肖属相或单一神煞判断。" },
          { heading: "身旺身弱是什么意思？", body: "身旺身弱描述日主在命局中的力量状态，不是好坏标签。身旺需要泄耗制化，身弱需要扶助生扶，具体仍要结合格局和喜用神。" },
          { heading: "喜用神怎么查？", body: "喜用神需要综合月令、五行旺衰、十神组合、调候、通关和大运走势判断。当前基础版先给结构参考，后续可升级为更细的规则引擎。" }
        ]}
      />
    </>
  );
}
