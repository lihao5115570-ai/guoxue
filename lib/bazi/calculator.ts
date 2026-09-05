import type { BaziResultData, BirthProfileInput, DayunStage, FiveElements, Pillar } from "./types";

const stems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const elementNames = ["木", "火", "土", "金", "水"];
const tenGodNames = ["比肩", "劫财", "食神", "伤官", "正财", "偏财", "正官", "七杀", "正印", "偏印"];

function hash(input: string) {
  return Array.from(input).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 9973, 17);
}

function makeId(prefix: string, seed: string) {
  return `${prefix}-${hash(seed).toString(36)}-${Date.now().toString(36)}`;
}

export function createResultId(prefix: string, seed: string) {
  return makeId(prefix, seed);
}

export function calculateBazi(profile: BirthProfileInput, forcedId?: string): BaziResultData {
  const seed = `${profile.birthDate}-${profile.birthTime}-${profile.gender}-${profile.birthCity}`;
  const base = hash(seed);
  const pillars: Pillar[] = ["年柱", "月柱", "日柱", "时柱"].map((label, index) => ({
    label,
    stem: stems[(base + index * 3) % stems.length],
    branch: branches[(base + index * 5) % branches.length],
    element: elementNames[(base + index) % elementNames.length],
    tenGod: tenGodNames[(base + index * 2) % tenGodNames.length]
  }));

  const raw = elementNames.map((_, index) => 14 + ((base + index * 11) % 24));
  const total = raw.reduce((sum, value) => sum + value, 0);
  const values = raw.map((value) => Math.round((value / total) * 100));
  values[0] += 100 - values.reduce((sum, value) => sum + value, 0);
  const elements: FiveElements = {
    wood: values[0],
    fire: values[1],
    earth: values[2],
    metal: values[3],
    water: values[4]
  };

  const ordered = [
    ["木", elements.wood],
    ["火", elements.fire],
    ["土", elements.earth],
    ["金", elements.metal],
    ["水", elements.water]
  ] as const;
  const dominantElement = [...ordered].sort((a, b) => b[1] - a[1])[0][0];
  const weakElement = [...ordered].sort((a, b) => a[1] - b[1])[0][0];

  const tenGods = Object.fromEntries(tenGodNames.map((name, index) => [name, 3 + ((base + index * 7) % 22)]));
  const dayun: DayunStage[] = [7, 17, 27, 37, 47, 57, 67, 77].map((age, index) => ({
    age: `${age}岁`,
    years: `${1998 + index * 10}-${2007 + index * 10}`,
    ganzhi: `${stems[(base + index) % stems.length]}${branches[(base + index * 2) % branches.length]}`,
    score: 58 + ((base + index * 9) % 30),
    focus: ["蓄力", "探索", "成形", "承载", "转折", "扩张", "沉淀", "安定"][index]
  }));

  return {
    id: forcedId ?? makeId("bazi", seed),
    profile,
    dayMaster: `${pillars[2].stem}${pillars[2].element}`,
    dominantElement,
    weakElement,
    pillars,
    elements,
    tenGods,
    keywords: ["稳定", "执行力", "现实感", "长期主义", "目标明确"].slice(0, 3 + (base % 3)),
    dayun,
    yearlyTrend: Array.from({ length: 12 }, (_, index) => 60 + ((base + index * 13) % 30))
  };
}

export const demoProfile: BirthProfileInput = {
  name: "访客",
  gender: "male",
  birthDate: "1990-05-20",
  birthTime: "10:30",
  birthCity: "北京",
  calendarType: "solar"
};
