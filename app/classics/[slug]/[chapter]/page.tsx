import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo/metadata";
import { classicItems } from "@/lib/content/classics";
import { findSizhuBook, findSizhuChapter, sizhuClassicChapters } from "@/lib/content/sizhuClassics";

export async function generateStaticParams() {
  return sizhuClassicChapters.map((chapter) => ({
    slug: chapter.bookSlug,
    chapter: chapter.chapterSlug
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; chapter: string }> }) {
  const { slug, chapter } = await params;
  const item = findSizhuChapter(slug, chapter);
  if (!item) return pageMetadata("典籍章节", "传统命理典籍章节导读。", "/classics");
  return pageMetadata(`${item.bookTitle}${item.title}`, `${item.description}关键词：${item.keywords.join("、")}。`, `/classics/${slug}/${chapter}`);
}

export default async function ClassicChapterPage({ params }: { params: Promise<{ slug: string; chapter: string }> }) {
  const { slug, chapter } = await params;
  const item = findSizhuChapter(slug, chapter);
  const currentBook = findSizhuBook(slug);
  const classic = classicItems.find((entry) => entry.slug === slug);
  if (!item || !currentBook || !classic) notFound();

  const prev = currentBook.chapters[item.index - 2];
  const next = currentBook.chapters[item.index];

  return (
    <section className="section">
      <article className="page-shell max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#77736B]">
          <Link href="/classics" className="text-[#9C7B46]">典籍</Link>
          <span>/</span>
          <Link href={`/classics/${classic.slug}`} className="text-[#9C7B46]">{classic.title}</Link>
          <span>/</span>
          <span>{item.title}</span>
        </div>

        <header className="soft-panel overflow-hidden">
          <div className="border-b border-black/10 bg-[#FFF8E8] px-6 py-4 text-sm font-semibold text-[#9C7B46]">
            {currentBook.dynasty} · {currentBook.author} · 第 {item.index}/{currentBook.chapters.length} 篇
          </div>
          <div className="p-6">
            <h1 className="text-4xl font-semibold leading-tight">{item.bookTitle}：{item.title}</h1>
            <p className="mt-4 text-lg leading-8 text-[#575249]">{item.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.keywords.map((keyword) => (
                <span key={keyword} className="border border-[#C9A86A]/35 bg-[#FFF8E8] px-3 py-1 text-sm text-[#9C7B46]">{keyword}</span>
              ))}
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-5 md:grid-cols-[1fr_280px]">
          <div className="grid gap-5">
            <section className="border border-black/10 bg-white/58 p-6">
              <h2 className="text-2xl font-semibold">章节正文</h2>
              <div className="mt-4 grid gap-4 border-l-4 border-[#C9A86A] bg-[#FFFDF6] p-5">
                {item.body.map((paragraph) => (
                  <p key={paragraph} className="leading-9 text-[#3F3A31]">{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="border border-black/10 bg-white/58 p-6">
              <h2 className="text-2xl font-semibold">本篇导读</h2>
              <div className="mt-4 grid gap-4">
                {item.guide.map((paragraph) => (
                  <p key={paragraph} className="leading-8 text-[#575249]">{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="border border-black/10 bg-white/58 p-6">
              <h2 className="text-2xl font-semibold">阅读重点</h2>
              <ul className="mt-4 grid gap-3">
                {item.keyPoints.map((point) => (
                  <li key={point} className="border-l-4 border-[#ef614b] bg-[#FFF4F0] px-4 py-3 leading-7 text-[#575249]">{point}</li>
                ))}
              </ul>
            </section>

            <section className="border border-black/10 bg-white/58 p-6">
              <h2 className="text-2xl font-semibold">内容扩展说明</h2>
              <p className="mt-4 leading-8 text-[#575249]">
                本帖已挂载在《{classic.title}》类目下，后续可以继续补充原文摘录、白话译解、术语表格、命例拆解和站内相关文章内链。当前版本先建立独立页面和主题框架，方便搜索引擎按书名与章节主题收录。
              </p>
              <p className="mt-3 text-sm leading-6 text-[#77736B]">本地来源：{item.sourceFile}</p>
              <details className="mt-4 border border-black/10 bg-white/50 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-[#9C7B46]">本书资料文件</summary>
                <div className="mt-4 grid gap-2">
                  {currentBook.sourceFiles.map((file) => (
                    <p key={file} className={currentBook.extractedFiles.includes(file) ? "text-sm leading-6 text-[#575249]" : "text-sm leading-6 text-[#A05A46]"}>
                      {currentBook.extractedFiles.includes(file) ? "已抽取：" : "仅记录："}{file}
                    </p>
                  ))}
                </div>
              </details>
            </section>

            <nav className="grid gap-3 md:grid-cols-2">
              {prev ? (
                <Link href={`/classics/${prev.bookSlug}/${prev.chapterSlug}`} className="ghost-button justify-start">上一篇：{prev.title}</Link>
              ) : <span />}
              {next ? (
                <Link href={`/classics/${next.bookSlug}/${next.chapterSlug}`} className="gold-button justify-start">下一篇：{next.title}</Link>
              ) : <span />}
            </nav>
          </div>

          <aside className="h-fit border border-black/10 bg-white/58 p-5">
            <h2 className="text-lg font-semibold">《{classic.title}》{currentBook.chapters.length} 篇</h2>
            <div className="mt-4 grid max-h-[70vh] gap-2 overflow-y-auto pr-1">
              {currentBook.chapters.map((sibling) => (
                <Link
                  key={sibling.chapterSlug}
                  href={`/classics/${sibling.bookSlug}/${sibling.chapterSlug}`}
                  className={sibling.chapterSlug === item.chapterSlug ? "bg-[#9C7B46] px-3 py-2 text-sm font-semibold text-white" : "border border-black/10 px-3 py-2 text-sm text-[#575249] hover:border-[#C9A86A]/50"}
                >
                  {sibling.title}
                </Link>
              ))}
            </div>
            <Link href="/bazi" className="gold-button mt-5 w-full">免费八字排盘</Link>
          </aside>
        </section>
      </article>
    </section>
  );
}
