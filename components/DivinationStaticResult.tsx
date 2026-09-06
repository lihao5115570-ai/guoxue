"use client";

import { useEffect, useState } from "react";
import { HexagramResultCard } from "@/components/HexagramResultCard";
import { generateHexagram } from "@/lib/divination/generator";
import { generateDivinationInterpretation } from "@/lib/divination/interpretation";
import type { HexagramResult } from "@/lib/divination/types";

type StoredDivination = {
  id: string;
  result: HexagramResult;
};

export function DivinationStaticResult() {
  const [result, setResult] = useState<HexagramResult>(() => generateHexagram("我最近适不适合换工作？", "事业", "gua-static-demo"));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "";
    const stored = id ? localStorage.getItem(`divination:${id}`) : null;
    if (!stored) return;

    try {
      const data = JSON.parse(stored) as StoredDivination;
      if (data.result) setResult(data.result);
    } catch {
      setResult(generateHexagram("我最近适不适合换工作？", "事业", "gua-static-demo"));
    }
  }, []);

  const interpretation = generateDivinationInterpretation(result);

  return (
    <section className="section">
      <div className="page-shell grid gap-7">
        <div>
          <h1 className="text-4xl font-semibold">你的起卦结果</h1>
          <p className="mt-3 text-lg text-[var(--muted)]">问题：{result.question}</p>
        </div>
        <HexagramResultCard result={result} />
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries({
            当前状态: interpretation.current,
            主要矛盾: interpretation.tension,
            有利因素: interpretation.support,
            需要注意: interpretation.caution,
            变化方向: interpretation.direction,
            观察建议: interpretation.advice
          }).map(([title, body]) => (
            <article key={title} className="soft-panel p-5">
              <h2 className="mb-3 text-xl font-semibold">{title}</h2>
              <p className="leading-8 text-[var(--muted)]">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
