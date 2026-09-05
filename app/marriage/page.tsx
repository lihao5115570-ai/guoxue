import { BirthForm } from "@/components/BirthForm";
import { SEOArticleFlow } from "@/components/SEOArticleFlow";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("八字合婚｜生辰八字姻缘配对", "输入双方出生信息，查看性格契合、沟通方式、价值观与长期关系。", "/marriage");

export default function MarriagePage() {
  return (
    <>
      <section className="section">
        <div className="page-shell">
          <h1 className="mb-5 text-5xl font-semibold">八字合婚</h1>
          <p className="mb-8 max-w-2xl text-lg leading-8 text-[#77736B]">合婚结果用于观察相处模式，不做绝对判断。</p>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="soft-panel p-6">
              <h2 className="mb-5 text-2xl font-semibold">我的信息</h2>
              <BirthForm cta="保存我的信息" />
            </div>
            <div className="soft-panel p-6">
              <h2 className="mb-5 text-2xl font-semibold">TA 的信息</h2>
              <BirthForm cta="开始缘分分析" />
            </div>
          </div>
        </div>
      </section>
      <SEOArticleFlow
        title="八字合婚相关文章"
        intro="下方内容承接合婚、亲密关系、沟通方式和长期相处等搜索需求，表达保持温和，不做极端判断。"
        articles={[
          { title: "八字合婚主要看哪些方面？", summary: "合婚可以从双方日主、夫妻宫、五行互补、十神关系和大运节奏观察相处模式，重点是沟通和长期稳定性。", tag: "合婚基础" },
          { title: "生肖合不合能决定关系吗？", summary: "生肖只是传统文化中的一个参考维度，不适合单独决定关系好坏。更重要的是现实沟通、价值观、责任分配和情绪处理方式。", tag: "生肖" },
          { title: "夫妻宫在感情分析中代表什么？", summary: "夫妻宫常用于观察亲密关系中的相处方式、稳定性和容易触发的问题，但需要结合整体命盘看。", tag: "夫妻宫" },
          { title: "合婚结果应该怎么理性使用？", summary: "合婚更适合作为了解彼此的工具，而不是给关系贴标签。真正重要的是双方是否愿意沟通、调整和共同承担现实问题。", tag: "关系建议" }
        ]}
      />
    </>
  );
}
