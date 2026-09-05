import Link from "next/link";
import { notFound } from "next/navigation";
import { fengshuiClassicChapters, findFengshuiBook, findFengshuiChapter } from "@/lib/content/fengshuiClassics";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateStaticParams() {
  return fengshuiClassicChapters.map((chapter) => ({
    book: chapter.bookSlug,
    chapter: chapter.chapterSlug
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ book: string; chapter: string }> }) {
  const { book, chapter } = await params;
  const item = findFengshuiChapter(book, chapter);
  if (!item) return pageMetadata("风水古籍章节", "传统风水古籍章节导读。", "/classics/fengshui");
  return pageMetadata(`${item.bookTitle}${item.title}`, `${item.description}关键词：${item.keywords.join("、")}。`, `/classics/fengshui/${book}/${chapter}`);
}

export default async function FengshuiChapterPage({ params }: { params: Promise<{ book: string; chapter: string }> }) {
  const { book, chapter } = await params;
  const item = findFengshuiChapter(book, chapter);
  const currentBook = findFengshuiBook(book);
  if (!item || !currentBook) notFound();

  return (
    <section className="section">
      <article className="page-shell max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#77736B]">
          <Link href="/classics" className="text-[#9C7B46]">典籍</Link>
          <span>/</span>
          <Link href="/classics/fengshui" className="text-[#9C7B46]">风水古籍</Link>
          <span>/</span>
          <span>{item.bookTitle}</span>
        </div>

        <header className="soft-panel overflow-hidden">
          <div className="border-b border-black/10 bg-[#FFF8E8] px-6 py-4 text-sm font-semibold text-[#9C7B46]">
            {currentBook.dynasty} · {currentBook.author} · {item.keywords.join(" / ")}
          </div>
          <div className="p-6">
            <h1 className="text-4xl font-semibold leading-tight">{item.bookTitle}：{item.title}</h1>
            <p className="mt-4 text-lg leading-8 text-[#575249]">{item.description}</p>
          </div>
        </header>

        <section className="mt-6 grid gap-5 md:grid-cols-[1fr_280px]">
          <div className="grid gap-5">
            <section className="border border-black/10 bg-white/58 p-6">
              <h2 className="text-2xl font-semibold">原文摘录</h2>
              <div className="mt-4 grid gap-3 border-l-4 border-[#C9A86A] bg-[#FFFDF6] p-4">
                {item.originalExcerpt.map((line) => (
                  <p key={line} className="leading-8 text-[#3F3A31]">{line}</p>
                ))}
              </div>
            </section>

            <section className="border border-black/10 bg-white/58 p-6">
              <h2 className="text-2xl font-semibold">白话导读</h2>
              <div className="mt-4 grid gap-4">
                {item.guide.map((paragraph) => (
                  <p key={paragraph} className="leading-8 text-[#575249]">{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="border border-black/10 bg-white/58 p-6">
              <h2 className="text-2xl font-semibold">阅读提示</h2>
              <ul className="mt-4 grid gap-3">
                {item.readingTips.map((tip) => (
                  <li key={tip} className="border-l-4 border-[#ef614b] bg-[#FFF4F0] px-4 py-3 leading-7 text-[#575249]">{tip}</li>
                ))}
              </ul>
            </section>

            <section className="border border-black/10 bg-white/58 p-6">
              <h2 className="text-2xl font-semibold">版权与参考说明</h2>
              <p className="mt-4 leading-8 text-[#575249]">
                本页依据本地古籍纯文本整理，采用原文短摘与原创导读方式呈现。现代白话注释、出版社整理版和扫描 PDF 未直接搬运。内容仅作传统文化、古籍阅读与娱乐参考，不作为现实选址、投资或其他决策依据。
              </p>
              <p className="mt-3 text-sm leading-6 text-[#77736B]">本地来源：{item.sourceFile}</p>
            </section>
          </div>

          <aside className="h-fit border border-black/10 bg-white/58 p-5">
            <h2 className="text-lg font-semibold">同书章节</h2>
            <div className="mt-4 grid gap-2">
              {currentBook.chapters.map((sibling) => (
                <Link
                  key={sibling.chapterSlug}
                  href={`/classics/fengshui/${sibling.bookSlug}/${sibling.chapterSlug}`}
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
