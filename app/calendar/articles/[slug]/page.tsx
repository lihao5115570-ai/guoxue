import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { calendarArticles, findCalendarArticle } from "@/lib/content/importedArticles";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateStaticParams() {
  return calendarArticles.map((article) => ({ slug: article.slug }));
}

export const metadata = pageMetadata("万年历文章", "黄道吉日、搬家入宅、动土装修、节气和干支文章。", "/calendar");

export default async function CalendarArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = findCalendarArticle(slug);
  const related = calendarArticles.filter((item) => item.slug !== article.slug).slice(0, 2);

  return (
    <section className="section">
      <article className="page-shell prose-lite max-w-3xl">
        <Link href="/calendar" className="text-sm text-[#9C7B46]">万年历 / {article.category}</Link>
        <h1 className="mt-4 text-5xl font-semibold">{article.title}</h1>
        <p>{article.description}</p>
        <p className="text-sm text-[#77736B]">主题参考：{article.sourceTopic}。本文为本站原创整理，不复制外站正文。</p>
        {article.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <h2>相关文章</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {related.map((item) => <ArticleCard key={item.slug} title={item.title} description={item.description} href={`/calendar/articles/${item.slug}`} />)}
        </div>
      </article>
    </section>
  );
}
