import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("日期详情｜农历、干支与宜忌", "查看指定日期的公历、农历、干支、生肖、节气与传统宜忌。", "/calendar/date");

export default async function CalendarDatePage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  return (
    <section className="section">
      <div className="page-shell">
        <h1 className="mb-6 text-5xl font-semibold">{date}</h1>
        <div className="grid gap-4 md:grid-cols-3">
          {["公历", "农历", "干支", "生肖", "节气", "传统宜忌"].map((label) => (
            <div key={label} className="border border-black/10 bg-white/45 p-5">
              <h2 className="text-xl font-semibold">{label}</h2>
              <p className="mt-3 text-[#77736B]">示例数据，后续可接入完整万年历算法。</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
