"use client";

import { useEffect, useState, type ReactNode } from "react";
import { calculateBazi } from "@/lib/bazi/calculator";
import type { BaziResultData } from "@/lib/bazi/types";
import type { BirthProfileInput } from "@/lib/bazi/types";
import { generateBaziReport, type BaziReport } from "@/lib/bazi/report";

const elementColors: Record<string, string> = {
  金: "#a98b49",
  木: "#2f7d68",
  水: "#557282",
  火: "#b95b4f",
  土: "#b99a5f"
};

function Section({ id, title, intro, children, dark = false }: { id?: string; title: string; intro?: string; children: ReactNode; dark?: boolean }) {
  return (
    <section id={id} className={dark ? "bazi-report-section bazi-report-section-dark bg-[#11110F] py-6 text-[#F7F4EC] md:py-7" : "bazi-report-section py-6 md:py-7"}>
      <div className="page-shell">
        <div className="mb-3 max-w-4xl">
          <p className={dark ? "mb-1 text-xs text-[#C9A86A]" : "mb-1 text-xs text-[#9C7B46]"}>测算结果详批</p>
          <h2 className="text-xl font-semibold leading-tight md:text-2xl">{title}</h2>
          {intro && <p className={`mt-1.5 text-sm leading-6 ${dark ? "text-white/68" : "text-[#6b665d]"}`}>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function ParagraphBlock({ item, dark = false }: { item: { title: string; paragraphs: string[] }; dark?: boolean }) {
  return (
    <article className={dark ? "bg-white/8 p-4" : "bg-white/62 p-4 shadow-[0_1px_0_rgba(17,17,15,.08)]"}>
      <h3 className="text-base font-semibold md:text-lg">{item.title}</h3>
      <div className={`mt-2 space-y-1.5 text-sm leading-6 ${dark ? "text-white/72" : "text-[#4f4c45]"}`}>
        {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </article>
  );
}

function DeepGuide({ text, buttons }: { text: string; buttons: string[] }) {
  return (
    <div className="bg-[#11110F] px-5 py-4 text-[#F7F4EC]">
      <div className="page-shell grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
        <p className="max-w-3xl text-sm leading-6 text-white/72">{text}</p>
        <div className="flex flex-wrap gap-2">
          {buttons.map((button, index) => (
            <button key={button} className={index === 0 ? "gold-button" : "ghost-button border-white/20 text-white"} type="button">{button}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function BasicInfo({ report }: { report: BaziReport }) {
  const rows = [
    ["姓名", report.basicInfo.name],
    ["性别", report.basicInfo.gender],
    ["公历出生时间", report.basicInfo.solarBirth],
    ["农历出生时间", report.basicInfo.lunarBirth],
    ["出生时辰", report.basicInfo.birthHour],
    ["出生地区", report.basicInfo.birthCity],
    ["生肖", report.basicInfo.zodiac],
    ["星座", report.basicInfo.constellation],
    ["测算重点", report.basicInfo.reportFocus],
    ["当前测算时间", report.basicInfo.measuredAt]
  ];

  return (
    <Section title="基础信息" intro="基础信息用于生成本次八字排盘报告，方便核对出生资料、地区、生肖星座与本次测算时间。">
      <div className="grid gap-px overflow-hidden bg-black/8 md:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[112px_1fr] bg-white/64 px-3 py-2 text-sm">
            <span className="text-[#77736B]">{label}</span>
            <strong className="font-medium">{value}</strong>
          </div>
        ))}
      </div>
    </Section>
  );
}

function PillarTable({ report }: { report: BaziReport }) {
  const rows = [
    ["天干", ...report.pillars.map((pillar) => pillar.stem)],
    ["地支", ...report.pillars.map((pillar) => pillar.branch)],
    ["藏干", ...report.pillars.map((pillar) => pillar.hiddenStems)],
    ["十神", ...report.pillars.map((pillar) => pillar.tenGod)],
    ["副星", ...report.pillars.map((pillar) => pillar.subStars)],
    ["纳音", ...report.pillars.map((pillar) => pillar.nayin)],
    ["空亡", ...report.pillars.map((pillar) => pillar.voidBranch)]
  ];

  return (
    <Section title="四柱八字排盘" intro="四柱排盘按年柱、月柱、日柱、时柱展示。日柱是日主所在位置，后续日主强弱、十神和婚姻宫都围绕它展开。">
      <div className="overflow-x-auto border-y border-black/10 bg-white/54">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-24 border-b border-black/10 px-3 py-2 text-left text-[#77736B]">项目</th>
              {report.pillars.map((pillar) => (
                <th key={pillar.label} className="border-b border-black/10 px-3 py-2 text-left">
                  {pillar.label}{pillar.isDayMaster ? <span className="ml-2 bg-[#C9A86A]/18 px-2 py-0.5 text-xs text-[#9C7B46]">日主</span> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-b border-black/5 last:border-b-0">
                {row.map((cell, index) => (
                  <td key={`${row[0]}-${index}`} className={index === 0 ? "px-3 py-2 text-[#77736B]" : "px-3 py-2 font-medium"}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {report.pillars.map((pillar) => (
          <article key={`${pillar.label}-note`} className={pillar.isDayMaster ? "bg-[#11110F] p-4 text-[#F7F4EC]" : "bg-white/62 p-4"}>
            <h3 className="text-lg font-semibold">{pillar.label}：{pillar.stem}{pillar.branch}</h3>
            <div className={`mt-2 space-y-1.5 text-sm leading-6 ${pillar.isDayMaster ? "text-white/72" : "text-[#4f4c45]"}`}>
              {pillar.annotation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function FiveElements({ report }: { report: BaziReport }) {
  return (
    <Section title="五行分布" intro="这一块不只看数字，还按“命盘现象 → 性格表现 → 现实影响 → 调整建议”的结构解释五行如何落到生活。">
      <div className="grid gap-3 md:grid-cols-5">
        {report.fiveElements.items.map((item) => (
          <article key={item.name} className="bg-white/62 p-3.5">
            <div className="flex items-end justify-between">
              <strong className="text-3xl" style={{ color: elementColors[item.name] }}>{item.name}</strong>
              <span className="text-sm text-[#77736B]">{item.count} 个</span>
            </div>
            <div className="mt-2 h-1.5 bg-black/5">
              <span className="block h-1.5" style={{ width: `${Math.min(item.count * 18, 100)}%`, background: elementColors[item.name] }} />
            </div>
            <p className="mt-2 text-sm font-semibold">{item.strength}</p>
            <p className="mt-2 text-xs leading-6 text-[#4f4c45]">{item.explanation}</p>
            <p className="mt-2 text-xs leading-6 text-[#4f4c45]">{item.advice}</p>
          </article>
        ))}
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-4">
        <div className="bg-[#fff6dc] p-3 text-sm"><span className="text-[#77736B]">偏旺</span><strong className="ml-3 text-base">{report.fiveElements.dominant}</strong></div>
        <div className="bg-[#e5f3ed] p-3 text-sm"><span className="text-[#77736B]">偏弱</span><strong className="ml-3 text-base">{report.fiveElements.weak}</strong></div>
        <div className="bg-[#f8e8e5] p-3 text-sm"><span className="text-[#77736B]">喜用方向</span><strong className="ml-3 text-base">{report.fiveElements.favorable}</strong></div>
        <div className="bg-[#e5eef2] p-3 text-sm"><span className="text-[#77736B]">忌讳方向</span><strong className="ml-3 text-base">{report.fiveElements.unfavorable}</strong></div>
      </div>
      <p className="mt-3 bg-white/62 p-3 text-sm leading-6 text-[#4f4c45]">五行平衡判断：{report.fiveElements.balance}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {report.fiveElements.analysis.map((item) => <ParagraphBlock key={item.title} item={item} />)}
      </div>
    </Section>
  );
}

function DayMaster({ report }: { report: BaziReport }) {
  return (
    <Section title="日主强弱分析" intro="日主代表命主本身。这里用普通用户能看懂的话解释日主是什么、为什么偏强或偏弱，以及对事业、感情、财运的影响。">
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <article className="bg-[#11110F] p-5 text-[#F7F4EC]">
          <p className="text-sm text-[#C9A86A]">日主</p>
          <h3 className="mt-2 text-4xl font-semibold">{report.dayMaster.name}</h3>
          <p className="mt-2 text-lg">{report.dayMaster.strength}</p>
          <p className="mt-4 text-sm leading-6 text-white/72">{report.dayMaster.personalityBase}</p>
        </article>
        <div className="grid gap-3 md:grid-cols-2">
          <ParagraphBlock item={{ title: "为什么强/弱", paragraphs: report.dayMaster.why }} />
          <ParagraphBlock item={{ title: "需要什么帮助", paragraphs: report.dayMaster.needs }} />
          <ParagraphBlock item={{ title: "需要避免什么", paragraphs: report.dayMaster.avoid }} />
          {report.dayMaster.impacts.map((item) => <ParagraphBlock key={item.title} item={item} />)}
        </div>
      </div>
    </Section>
  );
}

function TenGods({ report }: { report: BaziReport }) {
  return (
    <Section title="十神结构分析" intro="十神把命盘里的五行关系翻译成性格、事业、财富、人际和压力模式。这里十个十神全部展开，方便用户理解。">
      <div className="grid gap-3 md:grid-cols-2">
        {report.tenGods.map((item) => (
          <article key={item.name} className="bg-white/62 p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <span className="text-sm text-[#9C7B46]">{item.value}%</span>
            </div>
            <div className="mt-2 h-1.5 bg-black/5"><span className="block h-1.5 bg-[#C9A86A]" style={{ width: `${Math.min(item.value * 4, 100)}%` }} /></div>
            <div className="mt-3 space-y-1.5 text-sm leading-6 text-[#4f4c45]">
              <p><strong>命盘含义：</strong>{item.meaning}</p>
              <p><strong>性格影响：</strong>{item.personality}</p>
              <p><strong>事业影响：</strong>{item.career}</p>
              <p><strong>财运影响：</strong>{item.wealth}</p>
              <p><strong>注意问题：</strong>{item.warning}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function LuckCycles({ report }: { report: BaziReport }) {
  return (
    <Section id="dayun" title="大运排盘" intro="大运按八步展示，每一步包含起运年龄、年龄区间、大运干支、五行属性、事业财运感情健康提醒和综合建议。" dark>
      <div className="overflow-x-auto bg-white/6">
        <table className="w-full min-w-[1080px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/12 text-left text-white/62">
              {["起运年龄", "年龄区间", "大运干支", "五行", "关键词", "事业趋势", "财运趋势", "感情趋势", "健康提醒", "综合建议"].map((head) => <th key={head} className="px-3 py-2">{head}</th>)}
            </tr>
          </thead>
          <tbody>
            {report.luckCycles.map((item) => (
              <tr key={`${item.age}-${item.ganzhi}`} className="border-b border-white/8 align-top">
                <td className="px-3 py-3">{item.age}</td>
                <td className="px-3 py-3">{item.years}</td>
                <td className="px-3 py-3 text-base font-semibold text-[#C9A86A]">{item.ganzhi}</td>
                <td className="px-3 py-3">{item.element}</td>
                <td className="px-3 py-3">{item.focus}</td>
                <td className="px-3 py-3 text-white/72">{item.careerTrend}</td>
                <td className="px-3 py-3 text-white/72">{item.wealthTrend}</td>
                <td className="px-3 py-3 text-white/72">{item.relationshipTrend}</td>
                <td className="px-3 py-3 text-white/72">{item.healthReminder}</td>
                <td className="px-3 py-3 text-white/72">{item.advice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function YearlyFortune({ report }: { report: BaziReport }) {
  return (
    <Section title="流年趋势" intro="未来十年每一年都有独立说明，包含流年干支、年度关键词、事业、财运、感情、健康、注意事项和年度建议。">
      <div className="grid gap-3 md:grid-cols-2">
        {report.yearlyFortune.map((item) => (
          <article key={item.year} className="bg-white/62 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">{item.year} · {item.ganzhi}</h3>
                <p className="mt-1 text-sm text-[#9C7B46]">{item.keyword}</p>
              </div>
              <span className="bg-[#F1E7D0] px-2 py-1 text-xs text-[#6b5530]">流年</span>
            </div>
            <div className="mt-3 space-y-1.5 text-sm leading-6 text-[#4f4c45]">
              <p><strong>事业趋势：</strong>{item.careerTrend}</p>
              <p><strong>财运趋势：</strong>{item.wealthTrend}</p>
              <p><strong>感情趋势：</strong>{item.relationshipTrend}</p>
              <p><strong>健康提醒：</strong>{item.healthReminder}</p>
              <p><strong>注意事项：</strong>{item.caution}</p>
              <p><strong>年度建议：</strong>{item.advice}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ThreeYearTips({ report }: { report: BaziReport }) {
  return (
    <Section title="近三年重点提醒" intro="这部分写得更实用，适合用户截图保存：今年、明年、后年分别提示机会、风险、适合做什么和不适合做什么。">
      <div className="grid gap-3 md:grid-cols-3">
        {report.threeYearTips.map((item) => (
          <article key={item.year} className="bg-[#fff6dc] p-4">
            <p className="text-sm text-[#9C7B46]">{item.title}</p>
            <h3 className="mt-1 text-xl font-semibold">{item.year}</h3>
            <div className="mt-3 space-y-1.5 text-sm leading-6 text-[#4f4c45]">
              <p><strong>机会：</strong>{item.opportunity}</p>
              <p><strong>风险：</strong>{item.risk}</p>
              <p><strong>适合：</strong>{item.suitable}</p>
              <p><strong>不适合：</strong>{item.unsuitable}</p>
              <p><strong>一句话：</strong>{item.reminder}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function DetailedBaziReport({ result }: { result: BaziResultData }) {
  const [activeResult, setActiveResult] = useState(result);
  const report = generateBaziReport(activeResult.profile, activeResult);

  useEffect(() => {
    const raw = window.localStorage.getItem("latestBirthProfile");
    if (!raw) return;

    try {
      const profile = JSON.parse(raw) as BirthProfileInput;
      if (profile.birthDate && profile.birthTime && profile.birthCity) {
        setActiveResult(calculateBazi(profile, result.id));
      }
    } catch {
      setActiveResult(result);
    }
  }, [result]);

  return (
    <>
      <BasicInfo report={report} />
      <PillarTable report={report} />
      <FiveElements report={report} />
      <DayMaster report={report} />
      <TenGods report={report} />

      <Section title="性格画像" intro="性格画像拆成优势、压力、做事方式、人际、情绪、决策、容易被误解之处和提升方向，每个小节都展开说明。">
        <div className="grid gap-3 md:grid-cols-2">
          {report.personality.map((item) => <ParagraphBlock key={item.title} item={item} />)}
        </div>
      </Section>

      <Section id="career" title="事业方向分析" intro="事业板块按照“命盘倾向 → 现实表现 → 机会点 → 风险点 → 行动建议”展开，覆盖工作环境、行业方向、打工创业、领导同事、贵人和上升阶段。">
        <div className="grid gap-3 md:grid-cols-2">
          {report.career.map((item) => <ParagraphBlock key={item.title} item={item} />)}
        </div>
      </Section>

      <Section id="wealth" title="财运分析" intro="财运板块区分正财、偏财、赚钱能力、守财能力、消费倾向、投资风险和未来财富建议，不使用绝对化判断。">
        <div className="grid gap-3 md:grid-cols-2">
          {report.wealth.map((item) => <ParagraphBlock key={item.title} item={item} />)}
        </div>
      </Section>

      <DeepGuide text={report.deepGuide.middle} buttons={report.deepGuide.buttons} />

      <Section id="love" title="婚姻感情分析" intro="感情内容保持温和表达，重点看表达方式、择偶偏好、亲密关系优势与问题、矛盾来源、稳定性倾向和相处建议。">
        <div className="grid gap-3 md:grid-cols-2">
          {report.relationship.map((item) => <ParagraphBlock key={item.title} item={item} />)}
        </div>
      </Section>

      <Section title="健康与生活习惯建议" intro="健康内容从五行节奏、疲劳方向、情绪压力、作息饮食运动和生活节奏提出建议，并加入必要免责声明。">
        <div className="grid gap-3 md:grid-cols-2">
          {report.health.map((item) => <ParagraphBlock key={item.title} item={item} />)}
        </div>
      </Section>

      <LuckCycles report={report} />
      <YearlyFortune report={report} />
      <ThreeYearTips report={report} />

      <Section title="综合结论" intro="最后把命局总体特点、当前阶段、事业财运感情健康重点和未来三年建议收束成完整总结。" dark>
        <div className="grid gap-3 md:grid-cols-2">
          {report.conclusion.map((item) => <ParagraphBlock key={item.title} item={item} dark />)}
        </div>
        <div className="mt-4 bg-white/8 p-4">
          <p className="text-sm leading-6 text-white/72">{report.deepGuide.bottom}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {report.deepGuide.buttons.map((button, index) => (
              <button key={button} className={index === 0 ? "gold-button" : "ghost-button border-white/20 text-white"} type="button">{button}</button>
            ))}
          </div>
        </div>
        <p className="mt-4 border-t border-white/12 pt-4 text-sm leading-6 text-white/58">{report.disclaimer}</p>
      </Section>
    </>
  );
}
