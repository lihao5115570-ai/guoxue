import { hexagramNames, trigrams } from "./hexagrams";
import type { HexagramResult } from "./types";

function hash(input: string) {
  return Array.from(input).reduce((acc, char) => (acc * 33 + char.charCodeAt(0)) % 65521, 23);
}

export function generateHexagram(question = "", category = "其他", forcedId?: string): HexagramResult {
  const seed = hash(forcedId ?? `${question}-${category}-${Date.now()}`);
  const lines = Array.from({ length: 6 }, (_, index) => (seed >> index) & 1);
  const changingLines = lines.map((_, index) => index).filter((index) => ((seed >> (index + 7)) & 1) === 1).slice(0, 3);
  const upper = trigrams[(seed + 3) % trigrams.length];
  const lower = trigrams[(seed + 11) % trigrams.length];
  const originalHexagram = hexagramNames[seed % hexagramNames.length];
  const changedHexagram = changingLines.length ? hexagramNames[(seed + changingLines.length * 9) % hexagramNames.length] : undefined;

  return {
    id: forcedId ?? `gua-${seed.toString(36)}-${Date.now().toString(36)}`,
    question,
    category,
    lines,
    changingLines,
    originalHexagram,
    changedHexagram,
    upperTrigram: upper.name,
    lowerTrigram: lower.name,
    symbol: `${upper.symbol}${lower.symbol}`
  };
}
