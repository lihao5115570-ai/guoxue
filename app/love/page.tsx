import Link from "next/link";
import { BirthForm } from "@/components/BirthForm";
import { SEOArticleFlow } from "@/components/SEOArticleFlow";
import { SEOContentSection } from "@/components/SEOContentSection";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("八字姻缘分析｜感情模式与关系趋势", "通过八字观察感情特点、关系模式、理想伴侣与相处方式。", "/love");

export default function LovePage() {
  return (
    <>
      <section className="section">
        <div className="page-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <h1 className="text-5xl font-semibold">八字姻缘分析</h1>
            <p className="mt-5 text-lg leading-8 text-[#77736B]">了解感情模式、关系优势、容易出现的问题与适合的相处方式。</p>
            <Link href="/marriage" className="gold-button mt-8">测测我和 TA</Link>
          </div>
          <div className="soft-panel p-6">
            <BirthForm cta="查看感情趋势" />
          </div>
        </div>
      </section>
      <SEOContentSection title="八字感情知识" items={[
        { heading: "关系模式", body: "感情结构不等于命中注定，而是帮助观察亲密关系中的习惯。" },
        { heading: "理想伴侣", body: "适配关系需要看彼此沟通方式、价值排序和长期节奏。" },
        { heading: "桃花与边界", body: "人际吸引力需要与边界感一起理解，不能孤立看一个符号。" },
        { heading: "感情阶段", body: "不同阶段适合关注不同主题，如表达、承诺、磨合或稳定。" }
      ]} />
      <SEOArticleFlow
        title="婚姻感情相关文章"
        intro="围绕八字姻缘、夫妻宫、桃花、正缘和亲密关系相处方式，补充页面底部 SEO 内容。"
        articles={[
          { title: "八字怎么看感情表达方式？", summary: "感情表达可以结合日主、夫妻宫、配偶星和十神结构观察。重点不是断定结果，而是理解相处习惯。", tag: "感情表达" },
          { title: "夫妻宫在八字里代表什么？", summary: "夫妻宫常用于观察亲密关系中的互动方式、稳定性和容易触发的问题，需要结合整体命盘分析。", tag: "夫妻宫" },
          { title: "桃花是不是一定代表感情好？", summary: "桃花代表吸引力和人际缘分，但也需要边界、选择和长期相处能力配合，不能单独判断好坏。", tag: "桃花" },
          { title: "正缘分析应该怎么理性看？", summary: "正缘更适合理解为关系适配度和阶段机会，不建议把它当作唯一标准。现实沟通和共同目标仍然最重要。", tag: "正缘" }
        ]}
      />
    </>
  );
}
