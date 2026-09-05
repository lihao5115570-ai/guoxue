import { ArticleCard } from "@/components/ArticleCard";
import { topicItems } from "@/lib/content/articles";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("命理专题｜财运、事业、婚姻、大运与流年", "按主题整理八字命理知识与工具入口。", "/topics");

export default function TopicsPage() {
  return (
    <section className="section">
      <div className="page-shell">
        <h1 className="mb-8 text-5xl font-semibold">专题</h1>
        <div className="grid gap-5 md:grid-cols-3">
          {topicItems.map((item) => <ArticleCard key={item.slug} title={item.title} description={item.description} href={`/topics/${item.slug}`} />)}
        </div>
      </div>
    </section>
  );
}
