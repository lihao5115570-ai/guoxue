import { ArticleCard } from "@/components/ArticleCard";
import { SEOArticleFlow } from "@/components/SEOArticleFlow";
import { celebrityArticles } from "@/lib/content/importedArticles";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("名人库｜名人八字与公开资料命例", "整理公开人物资料、名人八字命例和传统文化分析入口。", "/celebrities");

const people = [
  ["历史人物", "适合整理古代人物公开生平、时代背景和传统命例资料。"],
  ["文化名人", "适合整理作家、艺术家、学者等公开人物的成长路径和作品阶段。"],
  ["商业人物", "适合观察公开创业经历、行业变化、财富阶段和决策风格。"],
  ["体育人物", "适合观察竞技周期、训练节奏、转折年份和职业阶段。"],
  ["影视明星", "适合整理演艺阶段、作品节奏、公众形象和流年事件。"],
  ["命例索引", "后续可按出生年份、行业、关键词和命盘特征建立检索。"]
];

export default function CelebritiesPage() {
  return (
    <>
      <section className="section">
        <div className="page-shell">
          <div className="mb-8 max-w-3xl">
            <h1 className="text-5xl font-semibold">名人库</h1>
            <p className="mt-4 text-lg leading-8 text-[#77736B]">基于公开人物资料整理原创命例导读，适合做传统文化学习和 SEO 内容承接，不复制外站正文。</p>
          </div>
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {people.map(([title, body], index) => (
              <article key={title} className={index === 0 ? "bg-[#11110F] p-5 text-[#F7F4EC]" : "bg-white/54 p-5"}>
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className={index === 0 ? "mt-2 text-sm leading-7 text-white/70" : "mt-2 text-sm leading-7 text-[#77736B]"}>{body}</p>
              </article>
            ))}
          </div>
          <h2 className="mb-5 text-3xl font-semibold">名人八字文章</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {celebrityArticles.map((article) => (
              <ArticleCard key={article.slug} title={article.title} description={article.description} href={`/celebrities/${article.slug}`} />
            ))}
          </div>
        </div>
      </section>
      <SEOArticleFlow
        title="名人八字相关文章"
        intro="名人库下方补充命例学习、公开资料、人生阶段和理性分析说明。"
        articles={celebrityArticles.slice(0, 5).map((article) => ({ title: article.title, summary: article.description, tag: article.category }))}
      />
    </>
  );
}
