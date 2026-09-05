import { BirthForm } from "@/components/BirthForm";
import { SEOArticleFlow } from "@/components/SEOArticleFlow";
import { SEOContentSection } from "@/components/SEOContentSection";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("八字事业财运分析｜正财偏财与事业财富", "分析赚钱方式、事业优势、财富积累节奏与风险意识。", "/wealth");

export default function WealthPage() {
  return (
    <>
      <section className="section">
        <div className="page-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <h1 className="text-5xl font-semibold">八字事业财运分析</h1>
            <p className="mt-5 text-lg leading-8 text-[#77736B]">填写出生信息，查看财富类型、正财偏财倾向、事业特点与财富阶段。</p>
          </div>
          <div className="soft-panel p-6">
            <BirthForm cta="查看我的财运" />
          </div>
        </div>
      </section>
      <SEOContentSection title="八字财运怎么看？" items={[
        { heading: "正财倾向", body: "正财更重视稳定收入、规则意识与长期经营。" },
        { heading: "偏财倾向", body: "偏财与机会、流动资源和资源整合相关，需要结合风险边界。" },
        { heading: "事业特点", body: "事业判断需要看日主、十神、五行流通和大运阶段。" },
        { heading: "财富阶段", body: "不同年龄段的主题不同，适合用大运和流年一起观察。" }
      ]} />
      <SEOArticleFlow
        title="事业财运相关文章"
        intro="围绕正财、偏财、事业方向、赚钱方式和守财能力，给财运工具页补充流式 SEO 内容。"
        articles={[
          { title: "八字怎么看一个人的赚钱方式？", summary: "赚钱方式可以从财星、食伤、官杀、印星和日主承载力一起观察。不同结构适合的收入来源不同。", tag: "赚钱方式" },
          { title: "正财和偏财有什么区别？", summary: "正财偏稳定收入和长期经营，偏财偏机会、人脉、项目和资源整合。两者都要结合风险边界来看。", tag: "正财偏财" },
          { title: "事业运好不好主要看什么？", summary: "事业运不只看官星，也要看学习能力、表达能力、资源平台和大运阶段。适合的路径比单纯分数更重要。", tag: "事业运" },
          { title: "财运分析为什么不能绝对化？", summary: "财富结果受行业、选择、环境、执行力和风险控制影响。命理内容适合作为倾向参考，不宜替代现实判断。", tag: "理性参考" }
        ]}
      />
    </>
  );
}
