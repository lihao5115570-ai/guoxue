export type BirthProfileInput = {
  name?: string;
  gender: string;
  birthDate: string;
  birthTime: string;
  birthCity: string;
  calendarType: "solar" | "lunar";
};

export type FiveElements = {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
};

export type Pillar = {
  label: string;
  stem: string;
  branch: string;
  element: string;
  tenGod: string;
};

export type DayunStage = {
  age: string;
  years: string;
  ganzhi: string;
  score: number;
  focus: string;
};

export type BaziResultData = {
  id: string;
  profile: BirthProfileInput;
  dayMaster: string;
  dominantElement: string;
  weakElement: string;
  pillars: Pillar[];
  elements: FiveElements;
  tenGods: Record<string, number>;
  keywords: string[];
  dayun: DayunStage[];
  yearlyTrend: number[];
};
