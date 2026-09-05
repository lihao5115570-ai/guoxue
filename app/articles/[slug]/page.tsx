import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard, iconForCategory } from "@/components/ArticleCard";
import { OrientalIcon } from "@/components/OrientalIcon";
import { articles, findArticle, wikiItems } from "@/lib/content/articles";
import { pageMetadata } from "@/lib/seo/metadata";

const toolLabels: Record<string, string> = {
  "/bazi": "八字排盘",
  "/wuxing": "五行查询",
  "/fortune": "流年运势",
  "/wealth": "事业财运",
  "/love": "感情姻缘",
  "/marriage": "八字合婚",
  "/calendar": "今日黄历",
  "/divination": "问事起卦",
  "/lingqian": "求灵签",
  "/dream": "周公解梦",
  "/face-palm": "佛前供灯",
  "/baby-name": "宝宝起名",
  "/pray": "为家人祈福",
  "/meditation": "静心禅坐",
  "/wiki": "命理百科"
};

function labelForRelatedTool(tool: string) {
  if (toolLabels[tool]) {
    return toolLabels[tool];
  }

  if (tool.startsWith("/wiki/")) {
    const slug = tool.replace("/wiki/", "");
    return wikiItems.find((item) => item.slug === slug)?.title ?? "命理百科";
  }

  return tool;
}

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);

  if (!article) {
    return pageMetadata("文章详情", "禅心阁传统文化文章详情。", "/articles");
  }

  return pageMetadata(article.title, article.description, `/articles/${article.slug}`);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = findArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter((item) => item.slug !== article.slug && (article.relatedArticles?.includes(item.slug) || item.category === article.category))
    .slice(0, 3);

  return (
    <main>
      <section className="section article-detail-hero">
        <div className="page-shell">
          <Link href="/articles" className="text-sm text-[var(--gold-bright)]">
            文章中心 / {article.category}
          </Link>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_280px] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-3 text-sm text-[var(--gold-bright)]">
                <span className="article-detail-icon">
                  <OrientalIcon type={iconForCategory(article.category)} seal="" />
                </span>
                {article.category}
              </div>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-[var(--paper)] md:text-5xl">
                {article.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)]">{article.description}</p>
              <p className="mt-4 text-sm text-[var(--muted)]">发布时间：{article.publishedAt}</p>
            </div>
            <div className="soft-panel p-5">
              <h2 className="text-lg font-semibold text-[var(--paper)]">阅读索引</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.keywords.map((keyword) => (
                  <span key={keyword} className="keyword-chip">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="page-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="prose-lite article-body-card">
            {article.summary && (
              <div className="article-summary">
                <strong>本篇导读</strong>
                <p>{article.summary}</p>
              </div>
            )}
            {article.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <h2>延伸阅读建议</h2>
            <p>
              阅读这类传统文化内容时，适合把术语、应用场景与现实行动拆开理解。若用于个人规划，可以先看概念，再看关系，最后回到自己的生活节奏中做温和参考。
            </p>
          </article>

          <aside className="grid h-fit gap-4">
            {article.relatedTools?.length ? (
              <div className="soft-panel p-5">
                <h2 className="text-lg font-semibold text-[var(--paper)]">相关工具</h2>
                <div className="mt-4 grid gap-2">
                  {article.relatedTools.map((tool) => (
                    <Link key={tool} href={tool.startsWith("/") ? tool : "/bazi"} className="side-link">
                      {labelForRelatedTool(tool)}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="soft-panel p-5">
              <h2 className="text-lg font-semibold text-[var(--paper)]">相关百科</h2>
              <div className="mt-4 grid gap-2">
                {wikiItems.slice(0, 4).map((item) => (
                  <Link key={item.slug} href={`/wiki/${item.slug}`} className="side-link">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/bazi" className="gold-button justify-center">
              免费八字排盘
            </Link>
          </aside>
        </div>
      </section>

      {relatedArticles.length ? (
        <section className="section pt-0">
          <div className="page-shell">
            <div className="section-heading">
              <span>同类内容</span>
              <h2>继续阅读</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedArticles.map((item) => (
                <ArticleCard key={item.slug} title={item.title} description={item.description} href={`/articles/${item.slug}`} category={item.category} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
