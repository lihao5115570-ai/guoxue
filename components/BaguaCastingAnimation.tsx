"use client";

import { useEffect, useState } from "react";

type Props = {
  lines: number[];
  changingLines?: number[];
  originalHexagram?: string;
  changedHexagram?: string;
  onComplete?: () => void;
};

const trigramSymbols = ["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"];
const captions = ["阴阳流转", "推演卦象", "六爻落定", "卦成"];

export function BaguaCastingAnimation({ lines, changingLines = [], originalHexagram = "火水未济", changedHexagram, onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(3);
      setShown(6);
      onComplete?.();
      return;
    }
    const timers = [
      window.setTimeout(() => setStep(1), 500),
      window.setTimeout(() => setStep(2), 1300),
      window.setTimeout(() => setStep(3), 2800),
      window.setTimeout(() => onComplete?.(), 3600)
    ];
    const lineTimer = window.setInterval(() => setShown((value) => Math.min(value + 1, 6)), 145);
    window.setTimeout(() => window.clearInterval(lineTimer), 2850);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearInterval(lineTimer);
    };
  }, [onComplete]);

  return (
    <div className="grid min-h-[560px] place-items-center bg-[#090909] p-6 text-[#f7f4ec]">
      <div className="relative grid w-full max-w-[440px] place-items-center">
        <div className="absolute h-[min(86vw,440px)] w-[min(86vw,440px)] animate-[spin_18s_linear_infinite] rounded-full border border-[#C9A86A]/20" />
        <div className={`relative h-[min(76vw,360px)] w-[min(76vw,360px)] transition duration-700 ${step >= 1 ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}>
          {trigramSymbols.map((symbol, index) => {
            const angle = (index / 8) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(angle) * 42;
            const y = 50 + Math.sin(angle) * 42;
            return (
              <span key={symbol} className="absolute grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center text-3xl text-[#C9A86A]" style={{ left: `${x}%`, top: `${y}%`, textShadow: step >= 2 ? "0 0 18px rgba(201,168,106,.38)" : "none" }}>
                {symbol}
              </span>
            );
          })}
          <div className={`absolute inset-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#C9A86A]/35 bg-white text-4xl text-black shadow-[0_0_40px_rgba(201,168,106,.28)] transition ${step >= 2 ? "scale-75 opacity-70" : "scale-100"}`}>☯</div>
          <div className="absolute inset-0 grid place-items-center">
            <div className="mt-10 grid gap-2">
              {lines.slice(0, shown).map((line, index) => (
                <div key={index} className="flex h-4 items-center justify-center gap-2">
                  {line ? <span className="h-2 w-36 bg-[#f7f4ec]" /> : <><span className="h-2 w-14 bg-[#f7f4ec]" /><span className="h-2 w-14 bg-[#f7f4ec]" /></>}
                  {changingLines.includes(index) && <span className="h-2 w-2 rounded-full bg-[#C9A86A]" />}
                </div>
              )).reverse()}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm tracking-[0.24em] text-[#C9A86A]">{captions[step]}</p>
          {step === 3 && (
            <div className="mt-4">
              <div className="text-3xl font-semibold">{originalHexagram}</div>
              {changedHexagram && <div className="mt-2 text-sm text-white/62">变卦：{changedHexagram}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
