import { FiveElementsChart } from "@/components/FiveElementsChart";
import { BirthForm } from "@/components/BirthForm";
import { SEOArticleFlow } from "@/components/SEOArticleFlow";
import { calculateBazi, demoProfile } from "@/lib/bazi/calculator";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("五行查询｜生辰八字五行缺什么", "查看生辰八字五行比例、偏旺偏弱与结构说明。", "/wuxing");

export default function WuxingPage() {
  const result = calculateBazi(demoProfile);
  return (
    <>
      <section className="section">
        <div className="page-shell grid gap-8 lg:grid-cols-[.95fr_1.05fr]">
          <div>
            <h1 className="mb-5 text-5xl font-semibold">五行查询</h1>
            <BirthForm cta="查看五行结构" />
          </div>
          <div className="soft-panel p-6">
            <FiveElementsChart elements={result.elements} dayMaster={result.dayMaster} dominantElement={result.dominantElement} weakElement={result.weakElement} />
          </div>
        </div>
      </section>
      <SEOArticleFlow
        title="五行查询相关文章"
        intro="围绕金木水火土、五行旺衰、喜用方向和日常调整建议，补充页面底部 SEO 内容。"
        articles={[
          { title: "五行缺什么一定不好吗？", summary: "五行偏弱不等于一定不好，关键要看日主强弱、五行流通和命盘整体结构。缺某一行时，更适合理解为需要训练或补足的方向。", tag: "五行旺衰" },
          { title: "金木水火土分别代表什么？", summary: "木偏成长规划，火偏表达传播，土偏稳定承载，金偏规则效率，水偏信息流动。五行可以帮助用户理解自己的做事方式。", tag: "五行基础" },
          { title: "喜用神和五行有什么关系？", summary: "喜用神通常与五行平衡有关，但不能只看数量多少。需要结合月令、日主、十神、大运流年一起判断。", tag: "喜用神" },
          { title: "五行平衡可以怎么调整？", summary: "调整五行更适合落到生活方式、工作环境、学习方向、沟通习惯和作息节奏，而不是只依赖颜色或饰品。", tag: "调整建议" }
        ]}
      />
    </>
  );
}
