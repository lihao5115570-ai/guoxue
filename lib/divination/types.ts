export type HexagramResult = {
  id: string;
  question: string;
  category: string;
  lines: number[];
  changingLines: number[];
  originalHexagram: string;
  changedHexagram?: string;
  upperTrigram: string;
  lowerTrigram: string;
  symbol: string;
};

export type Interpretation = {
  current: string;
  tension: string;
  support: string;
  caution: string;
  direction: string;
  advice: string;
};
