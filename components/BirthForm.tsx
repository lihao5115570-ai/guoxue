"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createResultId } from "@/lib/bazi/calculator";
import type { BirthProfileInput } from "@/lib/bazi/types";

type BirthFormProps = {
  compact?: boolean;
  cta?: string;
};

export function BirthForm({ compact = false, cta = "开始八字排盘" }: BirthFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<BirthProfileInput>({
    name: "",
    gender: "male",
    birthDate: "1990-05-20",
    birthTime: "10:30",
    birthCity: "北京",
    calendarType: "solar"
  });
  const [loading, setLoading] = useState(false);

  function update<K extends keyof BirthProfileInput>(key: K, value: BirthProfileInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const id = createResultId("bazi", JSON.stringify(form));
    localStorage.setItem("latestBirthProfile", JSON.stringify(form));
    localStorage.setItem("latestBaziResultId", id);
    router.push(`/bazi/result/?id=${encodeURIComponent(id)}`);
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="form-grid">
        {!compact && (
          <label className="field">
            <span>姓名（选填）</span>
            <input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="可选" />
          </label>
        )}
        <label className="field">
          <span>性别</span>
          <select value={form.gender} onChange={(event) => update("gender", event.target.value)}>
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </label>
        <label className="field">
          <span>出生日期</span>
          <input required type="date" value={form.birthDate} onChange={(event) => update("birthDate", event.target.value)} />
        </label>
        <label className="field">
          <span>出生时间</span>
          <input required type="time" value={form.birthTime} onChange={(event) => update("birthTime", event.target.value)} />
        </label>
        <label className="field">
          <span>出生城市</span>
          <input required value={form.birthCity} onChange={(event) => update("birthCity", event.target.value)} placeholder="北京" />
        </label>
        <label className="field">
          <span>历法</span>
          <select value={form.calendarType} onChange={(event) => update("calendarType", event.target.value as BirthProfileInput["calendarType"])}>
            <option value="solar">公历</option>
            <option value="lunar">农历</option>
          </select>
        </label>
      </div>
      <button className="gold-button w-full" type="submit" disabled={loading}>
        {loading ? "正在生成..." : cta}
      </button>
    </form>
  );
}
