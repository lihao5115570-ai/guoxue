import Link from "next/link";
import { notFound } from "next/navigation";
import { classicItems, findClassic } from "@/lib/content/classics";
import { findSizhuBook } from "@/lib/content/sizhuClassics";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateStaticParams() {
  return classicItems.map((item) => ({ slug: item.slug }));
}

export const metadata = pageMetadata("命理典籍详情", "传统命理典籍介绍、白话导读与学习路径。", "/classics");

export default async function ClassicDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findClassic(slug);
  const matchedBook = findSizhuBook(slug);
  if (!item) notFound();

  return (
    <section className="section">
      <article className="page-shell prose-lite max-w-4xl">
        <Link href="/classics" className="text-sm text-[#9C7B46]">典籍 /</Link>
        <h1 className="mt-4 text-5xl font-semibold">{item.title}</h1>
        <p>{item.description}</p>
        {matchedBook ? (
          <div className="not-prose mt-5 grid gap-3 md:grid-cols-3">
            <div className="border border-black/10 bg-white/58 p-4">
              <p className="text-sm text-[#77736B]">本地资料文件</p>
              <p className="mt-2 text-2xl font-semibold text-[#11110F]">{matchedBook.sourceFiles.length} 个</p>
            </div>
            <div className="border border-black/10 bg-white/58 p-4">
              <p className="text-sm text-[#77736B]">成功抽取正文</p>
              <p className="mt-2 text-2xl font-semibold text-[#11110F]">{matchedBook.extractedFiles.length} 个</p>
            </div>
            <div className="border border-black/10 bg-white/58 p-4">
              <p className="text-sm text-[#77736B]">独立章节帖子</p>
              <p className="mt-2 text-2xl font-semibold text-[#11110F]">{matchedBook.chapters.length} 篇</p>
            </div>
          </div>
        ) : null}
        {item.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
        {matchedBook ? (
          <section>
            <h2>章节帖子</h2>
            <p>
              已匹配本地《{matchedBook.title}》资料，并按专题拆成 {matchedBook.chapters.length} 个独立帖子。每个帖子围绕一个版块展开，后续可继续补充原文、白话译解、命例和表格。
            </p>
            <div className="not-prose mt-5 grid gap-3 md:grid-cols-3">
              {matchedBook.chapters.map((chapter) => (
                <Link
                  key={chapter.chapterSlug}
                  href={`/classics/${matchedBook.slug}/${chapter.chapterSlug}`}
                  className="border border-black/10 bg-white/60 p-4 transition hover:border-[#C9A86A]/50 hover:shadow-soft"
                >
                  <h3 className="text-base font-semibold leading-6">{chapter.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#77736B]">{chapter.description}</p>
                  <span className="mt-3 inline-flex text-sm font-semibold text-[#9C7B46]">阅读帖子 →</span>
                </Link>
              ))}
            </div>
            <details className="not-prose mt-6 border border-black/10 bg-white/50 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-[#9C7B46]">查看本书本地资料来源</summary>
              <div className="mt-4 grid gap-2">
                {matchedBook.sourceFiles.map((file) => (
                  <p key={file} className={matchedBook.extractedFiles.includes(file) ? "text-sm leading-6 text-[#575249]" : "text-sm leading-6 text-[#A05A46]"}>
                    {matchedBook.extractedFiles.includes(file) ? "已抽取：" : "仅记录："}{file}
                  </p>
                ))}
              </div>
            </details>
          </section>
        ) : null}
        <p><Link href="/bazi" className="gold-button">免费八字排盘</Link></p>
      </article>
    </section>
  );
}
