import { BirthForm } from "@/components/BirthForm";
import { SEOArticleFlow } from "@/components/SEOArticleFlow";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("2026 年度运势｜八字流年运势", "选择年份并输入出生信息，查看年度综合、事业、财富、感情与人际趋势。", "/fortune");

export default function FortunePage() {
  return (
    <>
      <section className="section">
        <div className="page-shell grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <h1 className="text-5xl font-semibold">2026 年度运势</h1>
            <p className="mt-5 text-lg leading-8 text-[#77736B]">默认查看当前年份，也可选择其他年份。结果会呈现年度趋势和 12 个月主题。</p>
          </div>
          <div className="soft-panel p-6">
            <label className="field mb-4">
              <span>选择年份</span>
              <select defaultValue="2026"><option>2026</option><option>2027</option><option>2028</option></select>
            </label>
            <BirthForm cta="查看年度运势" />
          </div>
        </div>
      </section>
      <SEOArticleFlow
        title="流年运势相关文章"
        intro="围绕年度运势、流年干支、事业财运变化和月份节奏，给工具页下方补充可阅读内容。"
        articles={[
          { title: "流年运势怎么看才更实用？", summary: "流年适合观察某一年容易被触发的主题，例如事业变化、财务节奏、感情沟通和生活压力。建议把流年当作规划参考，而不是绝对结果。", tag: "流年" },
          { title: "大运和流年有什么区别？", summary: "大运偏向十年阶段，流年偏向年度触发。看年度趋势时，应先看当前大运的大背景，再看流年带来的具体变化。", tag: "大运" },
          { title: "年度运势为什么要分月份看？", summary: "一年之内不同月份会有不同节奏。按月份拆分更适合安排学习、工作、财务复盘和关系沟通。", tag: "月份" },
          { title: "2026 年适合重点关注什么？", summary: "年度分析可重点关注事业目标、现金流、关系稳定性和健康作息。具体仍要结合个人出生信息与命盘结构。", tag: "2026" }
        ]}
      />
    </>
  );
}
