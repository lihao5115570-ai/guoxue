import Link from "next/link";
import { fengshuiClassicBooks, fengshuiClassicChapters } from "@/lib/content/fengshuiClassics";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("风水古籍章节库｜撼龙经、疑龙经、催官篇、天玉经", "按章节整理风水堪舆古籍原文摘录、白话导读、关键词与学习路径。", "/classics/fengshui");

export default function FengshuiClassicsPage() {
  return (
    <section className="section">
      <div className="page-shell">
        <div className="mb-8 max-w-4xl">
          <p className="mb-3 text-sm font-semibold text-[#9C7B46]">典籍 / 风水古籍</p>
          <h1 className="text-5xl font-semibold">风水古籍章节库</h1>
          <p className="mt-4 text-lg leading-8 text-[#77736B]">
            已从本地书库中筛选出适合长期搜索承接的堪舆古籍，按单个章节拆成独立帖子。页面采用原文摘录、原创导读、关键词和阅读提示组合，不直接搬运现代白话出版物。
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {[
            ["已收录古籍", `${fengshuiClassicBooks.length} 本`],
            ["章节帖子", `${fengshuiClassicChapters.length} 篇`],
            ["内容类型", "原文摘录+导读"],
            ["来源", "本地古籍纯文本"]
          ].map(([label, value]) => (
            <div key={label} className="border border-black/10 bg-white/50 p-5">
              <p className="text-sm text-[#77736B]">{label}</p>
              <p className="mt-2 text-2xl font-semibold text-[#11110F]">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6">
          {fengshuiClassicBooks.map((book) => (
            <article key={book.slug} className="soft-panel p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold text-[#9C7B46]">{book.dynasty} · {book.author}</p>
                  <h2 className="mt-2 text-3xl font-semibold">{book.title}</h2>
                  <p className="mt-3 leading-7 text-[#575249]">{book.description}</p>
                  <p className="mt-3 text-sm leading-6 text-[#77736B]">{book.seoReason}</p>
                </div>
                <span className="shrink-0 border border-[#C9A86A]/35 bg-[#FFF8E8] px-3 py-2 text-sm font-semibold text-[#9C7B46]">
                  {book.chapters.length} 个章节帖
                </span>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {book.chapters.map((chapter) => (
                  <Link
                    key={chapter.chapterSlug}
                    href={`/classics/fengshui/${book.slug}/${chapter.chapterSlug}`}
                    className="border border-black/10 bg-white/60 p-4 transition hover:border-[#C9A86A]/50 hover:shadow-soft"
                  >
                    <h3 className="font-semibold">{chapter.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#77736B]">{chapter.description}</p>
                    <span className="mt-3 inline-flex text-sm font-semibold text-[#9C7B46]">阅读章节 →</span>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
