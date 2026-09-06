import { YearTrendChart } from "@/components/YearTrendChart";
import { privateResultMetadata } from "@/lib/seo/metadata";

export const metadata = privateResultMetadata("年度运势结果", "个人流年结果页不进入公开索引。");

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ year: "2026", id: "demo" }];
}

export default async function FortuneResultPage({ params }: { params: Promise<{ year: string; id: string }> }) {
  const { year } = await params;
  const values = [82, 86, 78, 80, 73, 77, 84, 81, 76, 79, 83, 80];
  return (
    <section className="section">
      <div className="page-shell grid gap-7">
        <h1 className="text-4xl font-semibold">{year} 年度运势</h1>
        <div className="grid gap-4 md:grid-cols-5">
          {["综合 82", "事业 86", "财富 78", "感情 73", "人际 80"].map((item) => <div key={item} className="border border-black/10 bg-white/45 p-5 text-center text-xl font-semibold">{item}</div>)}
        </div>
        <YearTrendChart values={values} />
        <div className="grid gap-3">
          {Array.from({ length: 12 }, (_, i) => (
            <details key={i} className="border border-black/10 bg-white/40 p-4">
              <summary className="cursor-pointer font-semibold">{i + 1}月</summary>
              <p className="mt-3 leading-8 text-[#77736B]">本月关键词：稳定推进。关注事业节奏、财富边界与沟通质量。</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
