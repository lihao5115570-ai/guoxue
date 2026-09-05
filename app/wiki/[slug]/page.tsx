import Link from "next/link";
import { wikiItems } from "@/lib/content/articles";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateStaticParams() {
  return wikiItems.map((item) => ({ slug: item.slug }));
}

export const metadata = pageMetadata("命理百科详情", "八字命理基础知识详情。", "/wiki");

export default async function WikiDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = wikiItems.find((entry) => entry.slug === slug) ?? wikiItems[0];
  const paragraphs = item.content ?? [
    "命理概念适合放回完整命盘结构中理解。单独一个符号只提供线索，不能直接得出绝对结论。",
    "你可以先完成免费八字排盘，再结合五行、十神、大运与流年图表观察自己的结构。"
  ];

  return (
    <section className="section">
      <article className="page-shell prose-lite max-w-3xl">
        <Link href="/wiki" className="text-sm text-[#9C7B46]">命理百科 /</Link>
        <h1 className="mt-4 text-5xl font-semibold">{item.title}</h1>
        <p>{item.description}</p>
        <h2>{item.title}的核心理解</h2>
        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <h2>如何在工具中使用</h2>
        <p>你可以先完成<Link href="/bazi" className="text-[#9C7B46]">免费八字排盘</Link>，再结合五行、十神、大运与流年图表观察自己的结构。</p>
      </article>
    </section>
  );
}
