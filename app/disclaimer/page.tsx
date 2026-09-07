import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("免责声明", "禅心阁免责声明，说明测算、祈福、供灯与传统文化内容的参考边界。", "/disclaimer");

export default function DisclaimerPage() {
  return (
    <section className="section">
      <article className="page-shell prose-lite max-w-4xl">
        <p className="text-sm tracking-[0.24em] text-[var(--gold-bright)]">免责声明</p>
        <h1>免责声明</h1>
        <p>
          禅心阁提供的八字排盘、灵签、黄历、解梦、起名、六爻、祈福和供灯内容，均基于传统文化、民俗资料与前端内容模型生成，仅供娱乐、文化体验与生活参考。
        </p>
        <h2>不构成专业建议</h2>
        <p>
          本站内容不构成医学诊断、投资建议、法律意见、心理治疗、职业决策或其他专业意见。涉及健康、财务、法律、婚姻和重大现实选择时，请咨询具备资质的专业人士。
        </p>
        <h2>不承诺现实结果</h2>
        <p>
          祈福、供灯、求签与测算内容用于记录心愿、安放心念和文化体验，不承诺现实结果，不保证转运、治愈、发财、复合、升职或达成任何具体目标。
        </p>
        <h2>理性使用</h2>
        <p>
          请以平常心阅读本站内容，把它作为观察自己、整理情绪、记录祝愿和启发行动的辅助材料。任何现实行动仍应基于事实、能力、专业意见和个人判断。
        </p>
      </article>
    </section>
  );
}
