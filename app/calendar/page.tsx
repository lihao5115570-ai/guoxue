import Link from "next/link";
import { SEOArticleFlow } from "@/components/SEOArticleFlow";
import { calendarArticles } from "@/lib/content/importedArticles";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("万年历｜农历、干支与节气查询", "查看公历、农历、干支、生肖、节气与传统宜忌。", "/calendar");

const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
export default function CalendarPage() {
  const days = Array.from({ length: 35 }, (_, index) => {
    const date = (index % 30) + 1;
    return {
      date,
      lunar: index % 7 === 0 ? "初六" : index % 5 === 0 ? "廿一" : "甲子日",
      good: index % 6 === 0,
      today: date === 21
    };
  });

  return (
    <>
      <section className="section">
        <div className="page-shell">
          <div className="mb-6 grid gap-5 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <h1 className="text-5xl font-semibold">万年历</h1>
              <p className="mt-3 text-[#77736B]">公历、农历、干支、生肖、节气与传统宜忌。</p>
            </div>
            <div className="grid gap-3 bg-white/54 p-4 md:grid-cols-4">
              {[
                ["今日", "2026年8月21日"],
                ["农历", "七月初九"],
                ["干支", "甲子日"],
                ["星期", "星期五"]
              ].map(([label, value], index) => (
                <div key={label} className={index === 0 ? "bg-[#11110F] p-3 text-[#F7F4EC]" : "bg-[#fff6dc] p-3"}>
                  <p className={index === 0 ? "text-xs text-[#C9A86A]" : "text-xs text-[#9C7B46]"}>{label}</p>
                  <strong className="mt-1 block text-sm">{value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <h2 className="text-2xl font-semibold">2026 年 8 月</h2>
            <div className="flex gap-2">
              <button className="ghost-button">上个月</button>
              <button className="gold-button">今天</button>
              <button className="ghost-button">下个月</button>
            </div>
          </div>

          <div className="grid grid-cols-7 border border-black/10 bg-white/42">
            {weekdays.map((day) => (
              <div key={day} className={day === "日" || day === "六" ? "border-b border-r border-black/5 bg-[#f8e8e5] px-3 py-2 text-center text-sm font-semibold text-[#b95b4f]" : "border-b border-r border-black/5 bg-white/48 px-3 py-2 text-center text-sm font-semibold text-[#77736B]"}>
                {day}
              </div>
            ))}
            {days.map((day, index) => (
              <Link key={`${index}-${day.date}`} href={`/calendar/2026-08-${String(day.date).padStart(2, "0")}`} className={day.today ? "min-h-24 border-b border-r border-[#C9A86A]/45 bg-[#fff6dc] p-3" : "min-h-24 border-b border-r border-black/5 p-3 hover:bg-[#C9A86A]/10"}>
                <div className="flex items-start justify-between gap-2">
                  <strong className={day.today ? "text-2xl text-[#9C7B46]" : "text-lg"}>{day.date}</strong>
                  {day.good && <span className="bg-[#e5f3ed] px-1.5 py-0.5 text-[11px] text-[#2f7d68]">宜</span>}
                </div>
                <span className="mt-2 block text-xs text-[#77736B]">{day.lunar}</span>
                {day.today && <span className="mt-2 block text-xs text-[#9C7B46]">今日重点</span>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SEOArticleFlow
        title="万年历相关文章"
        intro="下方内容用于承接万年历、农历、节气、干支和黄道吉日等搜索需求，让工具页下面也有可阅读的 SEO 内容。"
        articles={calendarArticles.map((article) => ({ title: article.title, summary: article.description, tag: article.category, href: `/calendar/articles/${article.slug}` }))}
      />
    </>
  );
}
