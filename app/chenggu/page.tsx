import { BirthForm } from "@/components/BirthForm";
import { SEOArticleFlow } from "@/components/SEOArticleFlow";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("称骨算命｜传统文化娱乐参考", "输入出生时间，查看称骨骨重、传统解释与歌诀。", "/chenggu");

export default function ChengguPage() {
  return (
    <>
      <section className="section">
        <div className="page-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <h1 className="text-5xl font-semibold">称骨算命</h1>
            <p className="mt-5 text-lg leading-8 text-[#77736B]">传统文化娱乐参考，不作为现实决策依据。</p>
            <div className="mt-8 border border-black/10 bg-white/45 p-5">
              <h2 className="text-2xl font-semibold">示例结果</h2>
              <p className="mt-3 text-[#77736B]">骨重：四两三钱。歌诀与解释会在正式算法接入后按出生信息生成。</p>
            </div>
          </div>
          <div className="soft-panel p-6">
            <BirthForm cta="查看称骨结果" />
          </div>
        </div>
      </section>
      <SEOArticleFlow
        title="称骨算命相关文章"
        intro="称骨属于传统文化内容，页面底部补充规则来源、骨重解释和理性使用说明。"
        articles={[
          { title: "称骨算命的骨重是什么意思？", summary: "称骨会根据出生年、月、日、时换算骨重，再对应传统歌诀。它适合用于了解民俗文化，不适合作为现实决策依据。", tag: "骨重" },
          { title: "称骨歌诀应该怎么理解？", summary: "歌诀多为传统文本表达，读的时候应结合现代语境转译，不宜直接当成绝对判断。", tag: "歌诀" },
          { title: "称骨和八字排盘有什么区别？", summary: "称骨更偏简化民俗规则，八字排盘则会看四柱、五行、十神、大运和流年，结构更细。", tag: "区别" },
          { title: "称骨结果可以当真吗？", summary: "建议把称骨结果当作传统文化和娱乐参考，真正的选择仍要结合个人现实条件、努力方向和专业建议。", tag: "理性参考" }
        ]}
      />
    </>
  );
}
