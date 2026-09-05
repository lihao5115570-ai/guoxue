"use client";

import { useEffect, useMemo, useState } from "react";

type MeditationPhase = {
  label: string;
  hint: string;
};

const durations = [
  { label: "3 分钟", value: 180 },
  { label: "10 分钟", value: 600 },
  { label: "21 分钟", value: 1260 }
];

const themes = ["放松焦虑", "睡前安定", "专注工作", "情绪整理", "感恩祈愿", "清晨开始"];

const phaseCopy: Record<string, MeditationPhase[]> = {
  放松焦虑: [
    { label: "吸气", hint: "把注意力放回鼻息，不急着解决所有念头。" },
    { label: "停留", hint: "允许身体知道：此刻可以先慢下来。" },
    { label: "呼气", hint: "把紧绷一点点放松，像松开握紧的手。" }
  ],
  睡前安定: [
    { label: "吸气", hint: "轻轻吸气，感受肩颈慢慢变软。" },
    { label: "停留", hint: "不追赶明天，先安住今晚。" },
    { label: "呼气", hint: "把白天的杂事交还给白天。" }
  ],
  专注工作: [
    { label: "吸气", hint: "把注意力收回来，只看下一件要做的事。" },
    { label: "停留", hint: "让心不散，念头自然归位。" },
    { label: "呼气", hint: "放下分心，回到清楚和稳定。" }
  ],
  情绪整理: [
    { label: "吸气", hint: "看见情绪，不急着评判它。" },
    { label: "停留", hint: "给自己一点空间，也给别人一点空间。" },
    { label: "呼气", hint: "让话慢一点，让心宽一点。" }
  ],
  感恩祈愿: [
    { label: "吸气", hint: "想起一件值得感谢的小事。" },
    { label: "停留", hint: "把祝愿放在心里，温和而郑重。" },
    { label: "呼气", hint: "愿所念皆安，愿所行向善。" }
  ],
  清晨开始: [
    { label: "吸气", hint: "让新的一天从一口清楚的呼吸开始。" },
    { label: "停留", hint: "今天只先做好最重要的一件事。" },
    { label: "呼气", hint: "带着稳定出门，带着善意做事。" }
  ]
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function MeditationTool() {
  const [duration, setDuration] = useState(durations[0].value);
  const [theme, setTheme] = useState(themes[0]);
  const [mood, setMood] = useState("");
  const [remaining, setRemaining] = useState(durations[0].value);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const elapsed = duration - remaining;
  const progress = Math.min(100, Math.max(0, (elapsed / duration) * 100));
  const phases = phaseCopy[theme] ?? phaseCopy.放松焦虑;
  const phase = phases[Math.floor(elapsed / 4) % phases.length];

  const record = useMemo(() => {
    const moodText = mood.trim() || "未填写";
    return {
      title: `${theme} · ${durations.find((item) => item.value === duration)?.label ?? "3 分钟"}`,
      body: `本次练习围绕“${theme}”展开。开始前的心情是“${moodText}”。练习重点不是强迫自己立刻平静，而是一次次把注意力带回呼吸、身体和当下。`,
      advice: theme === "睡前安定" ? "今晚可以少看一会儿屏幕，给睡眠留出更柔和的过渡。" : theme === "专注工作" ? "练习后先做一件最小但确定的任务，让稳定感落到行动里。" : "练习后可以喝一口温水，慢慢回到接下来的事情。"
    };
  }, [duration, mood, theme]);

  useEffect(() => {
    if (!running || remaining <= 0) return;

    const timer = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setRunning(false);
          setCompleted(true);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [remaining, running]);

  function startMeditation() {
    if (completed || !started) {
      setRemaining(duration);
      setCompleted(false);
    }
    setStarted(true);
    setRunning(true);
  }

  function resetMeditation() {
    setRunning(false);
    setStarted(false);
    setCompleted(false);
    setRemaining(duration);
  }

  function updateDuration(value: number) {
    setDuration(value);
    if (!started) setRemaining(value);
  }

  return (
    <div className="grid gap-5">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--paper)]">开始静心</h2>
        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">选择时长与主题，进入一段有节奏的呼吸练习。过程中可以暂停，也可以重新开始。</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="field">
          <span>练习时长</span>
          <select value={duration} onChange={(event) => updateDuration(Number(event.target.value))} disabled={running}>
            {durations.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>练习主题</span>
          <select value={theme} onChange={(event) => setTheme(event.target.value)} disabled={running}>
            {themes.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="field">
        <span>当前心情</span>
        <textarea value={mood} onChange={(event) => setMood(event.target.value)} placeholder="例如：今天有些急躁，想让自己慢下来。" rows={4} />
      </label>

      <div className={`meditation-session ${started ? "is-started" : ""} ${running ? "is-running" : ""}`}>
        <div className="meditation-orb" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="meditation-timer">
          <span>{phase.label}</span>
          <strong>{formatTime(remaining)}</strong>
          <p>{phase.hint}</p>
        </div>
        <div className="meditation-progress">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="meditation-actions">
        {!running ? (
          <button className="gold-button justify-center" type="button" onClick={startMeditation}>
            {started && !completed ? "继续静心" : "开始静心"}
          </button>
        ) : (
          <button className="ghost-button justify-center" type="button" onClick={() => setRunning(false)}>
            暂停
          </button>
        )}
        <button className="ghost-button justify-center" type="button" onClick={resetMeditation}>
          重新开始
        </button>
      </div>

      {completed && (
        <article className="meditation-record">
          <span>今日静心记录</span>
          <h3>{record.title}</h3>
          <p>{record.body}</p>
          <blockquote>{record.advice}</blockquote>
        </article>
      )}
    </div>
  );
}
