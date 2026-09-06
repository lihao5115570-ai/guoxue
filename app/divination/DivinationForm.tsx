"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { BaguaCastingAnimation } from "@/components/BaguaCastingAnimation";
import { generateHexagram } from "@/lib/divination/generator";
import { generateDivinationInterpretation } from "@/lib/divination/interpretation";
import type { HexagramResult } from "@/lib/divination/types";

const categories = ["事业", "财运", "感情", "选择", "人际", "其他"];

export function DivinationForm() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("事业");
  const [result, setResult] = useState<HexagramResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const generated = generateHexagram(question, category);
    const data = { id: generated.id, result: generated, interpretation: generateDivinationInterpretation(generated) };
    localStorage.setItem(`divination:${data.id}`, JSON.stringify(data));
    setResult(data.result);
    setLoading(false);
  }

  if (result) {
    return (
      <div className="fixed inset-0 z-50 bg-[#090909]">
        <BaguaCastingAnimation
          lines={result.lines}
          changingLines={result.changingLines}
          originalHexagram={result.originalHexagram}
          changedHexagram={result.changedHexagram}
          onComplete={() => window.setTimeout(() => router.push(`/divination/result/?id=${encodeURIComponent(result.id)}`), 500)}
        />
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="soft-panel grid gap-5 p-6">
      <label className="field">
        <span>你现在最想问什么？</span>
        <textarea required value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="例如：我应该继续现在的工作还是换个方向？" />
      </label>
      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <button key={item} type="button" onClick={() => setCategory(item)} className={category === item ? "gold-button min-h-10 px-4" : "ghost-button min-h-10 px-4"}>
            {item}
          </button>
        ))}
      </div>
      <button className="gold-button" type="submit" disabled={loading}>{loading ? "起卦中..." : "立即起卦 ☯"}</button>
    </form>
  );
}
