"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BaziPremiumButton } from "@/components/BaziPremiumButton";
import { DetailedBaziReport } from "@/components/DetailedBaziReport";
import { FiveElementsChart } from "@/components/FiveElementsChart";
import { TenGodsChart } from "@/components/TenGodsChart";
import { calculateBazi, demoProfile } from "@/lib/bazi/calculator";
import type { BaziResultData, BirthProfileInput } from "@/lib/bazi/types";

export function BaziStaticResult() {
  const [result, setResult] = useState<BaziResultData>(() => calculateBazi(demoProfile, "bazi-static-demo"));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || localStorage.getItem("latestBaziResultId") || "bazi-static-demo";
    const rawProfile = localStorage.getItem("latestBirthProfile");
    const profile = rawProfile ? (JSON.parse(rawProfile) as BirthProfileInput) : demoProfile;
    setResult(calculateBazi(profile, id));
  }, []);

  return (
    <>
      <section className="bazi-result-hero relative overflow-hidden border-b border-[rgba(214,181,108,.18)]">
        <div className="absolute inset-0">
          <img src="/bazi-landscape-energy.png" alt="八字命盘山水能量主视觉" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#100D09]/96 via-[#171109]/86 to-[#21180F]/62" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_38%,rgba(214,181,108,.22),transparent_28%),radial-gradient(circle_at_70%_28%,rgba(245,234,208,.12),transparent_26%)]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#100D09] to-transparent" />
        </div>
        <div className="page-shell relative grid min-h-[420px] items-center gap-6 py-8 lg:grid-cols-[.92fr_1.08fr]">
          <div>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight md:text-5xl">你的八字命盘</h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-[#E9DDBE]">
              由四柱、五行、十神、大运和流年构成的个人命盘地图，适合做阶段观察与自我梳理。
            </p>
            <p className="mt-2 text-xs text-[#BBA56E]">结果编号：{result.id}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link className="ghost-button" href="#career">事业</Link>
              <Link className="ghost-button" href="#wealth">财运</Link>
              <Link className="ghost-button" href="#love">感情</Link>
              <Link className="ghost-button" href="#dayun">大运</Link>
              <BaziPremiumButton resultId={result.id} />
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
            <article key={sectionId} id={sectionId} className={index === 0 ? "bg-[#213228] p-4" : index === 1 ? "bg-[#3a2f18] p-4" : "bg-[#36221f] p-4"}>
              <h2 className="mb-1 text-lg font-semibold text-[#F7F4EC]">{title}</h2>
              <p className="text-sm leading-6 text-[#DECCA8]">{body}</p>
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
