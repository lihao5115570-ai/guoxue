import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/lib/content/articles";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "文章中心｜八字命理、五行、佛学文化与黄历节气",
  "禅心阁文章中心，整理八字命理、五行知识、流年运势、事业财运、感情姻缘、佛学文化、祈福静心、黄历节气、周公解梦和起名文化内容。",
  "/articles"
);

export default function ArticlesPage() {
  return (
    <section className="section">
      <div className="page-shell">
        <div className="mb-9 max-w-3xl">
          <h1 className="text-5xl font-semibold text-[var(--paper)]">文章中心</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            围绕八字命理、五行知识、流年运势、佛学文化、祈福供灯、黄历节气、解梦与起名文化，整理适合持续阅读的专题内容。
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} title={article.title} description={article.description} href={`/articles/${article.slug}`} category={article.category} />
          ))}
        </div>
      </div>
    </section>
  );
}
