import { ArticleCard } from "@/components/ArticleCard";
import { wikiItems } from "@/lib/content/articles";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("命理百科｜八字、五行、十神、大运与流年", "系统了解八字命理基础概念。", "/wiki");

export default function WikiPage() {
  return (
    <section className="section">
      <div className="page-shell">
        <h1 className="mb-8 text-5xl font-semibold">命理百科</h1>
        <div className="grid gap-5 md:grid-cols-3">
          {wikiItems.map((item) => <ArticleCard key={item.slug} title={item.title} description={item.description} href={`/wiki/${item.slug}`} />)}
        </div>
      </div>
    </section>
  );
}
