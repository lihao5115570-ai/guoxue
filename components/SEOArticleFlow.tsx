import { OrientalIcon, type OrientalIconType } from "@/components/OrientalIcon";

type SEOArticleFlowProps = {
  title: string;
  intro?: string;
  articles: Array<{
    title: string;
    summary: string;
    tag?: string;
    href?: string;
  }>;
};

const flowIcons: OrientalIconType[] = ["book", "calendar", "lotus", "wuxing", "divination", "love"];

export function SEOArticleFlow({ title, intro, articles }: SEOArticleFlowProps) {
  return (
    <section className="section border-y border-[rgba(214,181,108,.1)] bg-[rgba(255,248,225,.025)]">
      <div className="page-shell">
        <div className="mb-7 grid gap-2 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="text-3xl font-semibold tracking-[0.06em] text-[var(--paper)]">{title}</h2>
            {intro && <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">{intro}</p>}
          </div>
          <span className="text-sm tracking-[0.2em] text-[var(--gold-bright)]">相关文章</span>
        </div>
        <div className="grid gap-3">
          {articles.map((article, index) => {
            const content = (
              <>
                <span className="seo-mini-icon">
                  <OrientalIcon type={flowIcons[index % flowIcons.length]} seal="" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--paper)]">{article.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-[var(--muted)]">{article.summary}</p>
                </div>
                {article.tag && <span className="w-fit border border-[rgba(214,181,108,.18)] bg-[rgba(255,248,225,.04)] px-2 py-1 text-xs text-[var(--gold-bright)]">{article.tag}</span>}
              </>
            );

            return article.href ? (
              <a key={article.title} href={article.href} className="grid gap-3 border border-[rgba(214,181,108,.12)] bg-[rgba(255,248,225,.035)] p-4 transition hover:-translate-y-1 hover:border-[rgba(214,181,108,.34)] hover:bg-[rgba(214,181,108,.055)] md:grid-cols-[44px_1fr_auto] md:items-start">
                {content}
              </a>
            ) : (
              <article key={article.title} className="grid gap-3 border border-[rgba(214,181,108,.12)] bg-[rgba(255,248,225,.035)] p-4 md:grid-cols-[44px_1fr_auto] md:items-start">
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
