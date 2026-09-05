import Link from "next/link";
import { topicItems } from "@/lib/content/articles";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateStaticParams() {
  return topicItems.map((item) => ({ slug: item.slug }));
}

export const metadata = pageMetadata("命理专题详情", "命理专题内容与相关工具。", "/topics");

export default async function TopicDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = topicItems.find((entry) => entry.slug === slug) ?? topicItems[0];
  return (
    <section className="section">
      <article className="page-shell prose-lite max-w-3xl">
        <Link href="/topics" className="text-sm text-[#9C7B46]">专题 /</Link>
        <h1 className="mt-4 text-5xl font-semibold">{item.title}</h1>
        <p>{item.description}</p>
        <h2>专题说明</h2>
        <p>本专题会连接百科、文章和相关工具，形成可被搜索引擎读取的长期内容结构。</p>
        <p><Link href="/bazi" className="gold-button">免费八字排盘</Link></p>
      </article>
    </section>
  );
}
