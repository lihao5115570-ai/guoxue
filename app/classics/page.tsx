import { ArticleCard } from "@/components/ArticleCard";
import { classicItems } from "@/lib/content/classics";
import { fengshuiClassicBooks, fengshuiClassicChapters } from "@/lib/content/fengshuiClassics";
import { findSizhuBook } from "@/lib/content/sizhuClassics";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("传统命理典籍｜滴天髓、子平真诠、三命通会", "整理传统命理典籍、四柱八字资料、子平法文献与入门导读。", "/classics");

export default function ClassicsPage() {
  return (
    <section className="section">
      <div className="page-shell">
        <div className="mb-8 max-w-3xl">
          <h1 className="text-5xl font-semibold">传统命理典籍</h1>
          <p className="mt-4 text-lg leading-8 text-[#77736B]">整理滴天髓、子平真诠、渊海子平、三命通会、穷通宝鉴等传统资料入口，后续可继续补充原文、注释和白话导读。</p>
        </div>
        <div className="mb-10 soft-panel p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#9C7B46]">新增专题</p>
              <h2 className="mt-2 text-3xl font-semibold">风水古籍章节库</h2>
              <p className="mt-3 max-w-3xl leading-7 text-[#575249]">
                已从本地风水电子书合集筛选《撼龙经》《疑龙经》《催官篇》《天玉经》《地理辨正》等古籍纯文本，拆成 {fengshuiClassicChapters.length} 个独立章节帖子，适合承接古籍原文、白话导读、玄空风水、寻龙点穴等搜索需求。
              </p>
            </div>
            <ArticleCard title="进入风水古籍" description={`${fengshuiClassicBooks.length} 本古籍，按章节独立发布。`} href="/classics/fengshui" />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {classicItems.map((item) => {
            const matchedBook = findSizhuBook(item.slug);
            return (
              <ArticleCard
                key={item.slug}
                title={item.title}
                description={matchedBook ? `${item.description} 已匹配本地古籍资料，含 ${matchedBook.chapters.length} 个章节帖子。` : item.description}
                href={`/classics/${item.slug}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
