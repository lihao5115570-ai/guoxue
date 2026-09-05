"use client";

import { useState } from "react";
import { BaguaCastingAnimation } from "@/components/BaguaCastingAnimation";
import { generateHexagram } from "@/lib/divination/generator";

export default function BaguaDemoPage() {
  const [key, setKey] = useState(0);
  const result = generateHexagram("演示", "其他");
  return (
    <section>
      <BaguaCastingAnimation key={key} lines={result.lines} changingLines={result.changingLines} originalHexagram={result.originalHexagram} changedHexagram={result.changedHexagram} />
      <div className="page-shell flex flex-wrap gap-3 py-6">
        <button className="gold-button" onClick={() => setKey((value) => value + 1)}>开始起卦</button>
        <button className="ghost-button" onClick={() => setKey((value) => value + 1)}>随机六爻</button>
        <button className="ghost-button" onClick={() => setKey((value) => value + 1)}>随机动爻</button>
        <button className="ghost-button" onClick={() => setKey((value) => value + 1)}>再次播放</button>
      </div>
    </section>
  );
}
