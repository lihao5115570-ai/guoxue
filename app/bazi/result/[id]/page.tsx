import Link from "next/link";
import Image from "next/image";
import { BaziPremiumButton } from "@/components/BaziPremiumButton";
import { DetailedBaziReport } from "@/components/DetailedBaziReport";
import { FiveElementsChart } from "@/components/FiveElementsChart";
import { TenGodsChart } from "@/components/TenGodsChart";
import { calculateBazi, demoProfile } from "@/lib/bazi/calculator";
import { privateResultMetadata } from "@/lib/seo/metadata";

export const metadata = privateResultMetadata("你的八字命盘", "个人八字结果页不进入公开索引。");

export default async function BaziResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = calculateBazi(demoProfile, id);

  return (
    <>
      <section className="bazi-result-hero relative overflow-hidden border-b border-[rgba(214,181,108,.18)]">
        <div className="absolute inset-0">
          <Image src="/bazi-landscape-energy.png" alt="八字命盘山水能量主视觉" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#100D09]/96 via-[#171109]/86 to-[#21180F]/62" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_38%,rgba(214,181,108,.22),transparent_28%),radial-gradient(circle_at_70%_28%,rgba(245,234,208,.12),transparent_26%)]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#100D09] to-transparent" />
        </div>
        <div className="page-shell relative grid min-h-[420px] items-center gap-6 py-8 lg:grid-cols-[.92fr_1.08fr]">
          <div>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight md:text-5xl">你的八字命盘</h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-[#4f4c45]">
              这不是一份逐字稿，而是一张由四柱、五行、十神、大运和流年构成的个人命盘地图。
            </p>
            <p className="mt-2 text-xs text-[#77736B]">结果编号：{id}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link className="ghost-button" href="#career">事业</Link>
              <Link className="ghost-button" href="#wealth">财运</Link>
              <Link className="ghost-button" href="#love">感情</Link>
              <Link className="ghost-button" href="#dayun">大运</Link>
              <BaziPremiumButton resultId={id} />
            </div>
          </div>
          <div className="bg-[#11110F]/88 p-4 text-[#F7F4EC] shadow-soft backdrop-blur-md">
            <div className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
              {result.pillars.map((pillar, index) => (
                <div key={pillar.label} className={`bg-[#11110F] p-3 text-center ${index === 2 ? "ring-1 ring-[#C9A86A]" : ""}`}>
                  <div className="text-xs text-white/56">{pillar.label}</div>
                  <div className="my-2 text-3xl font-semibold">{pillar.stem}{pillar.branch}</div>
                  <div className="text-xs text-white/62">{pillar.element} · {pillar.tenGod}</div>
                  {index === 2 && <div className="mt-1 text-xs text-[#C9A86A]">日主</div>}
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-[1.1fr_.9fr]">
              <div>
                <h2 className="mb-2 text-base font-semibold">五行能量</h2>
                <FiveElementsChart compact elements={result.elements} dayMaster={result.dayMaster} dominantElement={result.dominantElement} weakElement={result.weakElement} />
              </div>
              <div>
                <h2 className="mb-2 text-base font-semibold">十神结构</h2>
                <div className="text-[#F7F4EC] [&_span.bg-black\\/5]:bg-white/10">
                  <TenGodsChart data={result.tenGods} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="page-shell grid gap-3 md:grid-cols-3">
          {[
            ["career", "事业", "适合稳定推进、目标明确的环境。优势在于执行与复盘。"],
            ["wealth", "财运", "正财倾向较明显，适合长期积累，偏财作为辅助机会。"],
            ["love", "感情", "重视安全感和承诺，适合清晰沟通与稳定节奏。"]
          ].map(([sectionId, title, body], index) => (
            <article key={sectionId} id={sectionId} className={index === 0 ? "bg-[#e5f3ed] p-4" : index === 1 ? "bg-[#fff6dc] p-4" : "bg-[#f8e8e5] p-4"}>
              <h2 className="mb-1 text-lg font-semibold">{title}</h2>
              <p className="text-sm leading-6 text-[#4f4c45]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <div id="full-report">
        <DetailedBaziReport result={result} />
      </div>
    </>
  );
}
