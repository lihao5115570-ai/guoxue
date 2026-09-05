import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { BrandMark } from "@/components/BrandLogo";
import { ToolCard } from "@/components/ToolCard";
import { articles } from "@/lib/content/articles";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "禅心阁｜佛家祈福、求灵签、黄历、解梦与静心禅坐",
  "禅心阁是面向中文用户的佛家祈福与东方文化平台，提供为家人祈福、佛前供灯、今日黄历、求灵签、八字精批、周公解梦、宝宝起名、六爻占卜和静心禅坐。",
  "/"
);

const featuredTools = [
  {
    title: "佛前祈福",
    href: "/pray",
    icon: "愿",
    visual: "blessing" as const,
    description: "为父母、伴侣、子女写下祝愿，把测算入口先落到善念与守护。"
  },
  {
    title: "求一支灵签",
    href: "/lingqian",
    icon: "签",
    visual: "sticks" as const,
    description: "以清净心问一件事，得到温和提醒、签文解释和行动建议。"
  },
  {
    title: "八字排盘",
    href: "/bazi",
    icon: "命",
    visual: "bazi" as const,
    description: "保留四柱、五行、十神与大运分析，用自省语言重新表达。"
  },
  {
    title: "流年运势",
    href: "/fortune",
    icon: "运",
    visual: "mountain" as const,
    description: "把流年起伏解释成修心、择时、避躁和稳定行动的参考。"
  },
  {
    title: "事业财运",
    href: "/wealth",
    icon: "财",
    visual: "wealth" as const,
    description: "看事业节奏、财帛倾向和风险边界，不制造焦虑与绝对断语。"
  },
  {
    title: "感情姻缘",
    href: "/love",
    icon: "缘",
    visual: "love" as const,
    description: "以缘分、沟通和相处修行为核心，提供关系里的觉察建议。"
  }
];

const supportTools = [
  {
    title: "为家人祈福",
    href: "/pray",
    icon: "愿",
    visual: "blessing" as const,
    description: "为父母、伴侣、子女写下祝愿，生成一盏安心祈福灯。"
  },
  {
    title: "今日黄历",
    href: "/calendar",
    icon: "历",
    visual: "calendar" as const,
    description: "查看今日农历、干支、节气与日常宜忌，把日子过得更有分寸。"
  },
  {
    title: "求灵签",
    href: "/lingqian",
    icon: "签",
    visual: "sticks" as const,
    description: "以清净心求一支签，获得签文释义、提醒和行动建议。"
  },
  {
    title: "周公解梦",
    href: "/dream",
    icon: "梦",
    visual: "dream" as const,
    description: "记录梦境关键词，结合传统梦象与当下情绪做温和解释。"
  },
  {
    title: "佛前供灯",
    href: "/face-palm",
    icon: "灯",
    visual: "lamp" as const,
    description: "点一盏线上心灯，写下平安、健康、智慧与家宅清宁的供灯愿文。"
  },
  {
    title: "宝宝起名",
    href: "/baby-name",
    icon: "名",
    visual: "name" as const,
    description: "兼顾音义、祝福寓意与五行参考，生成更有温度的名字思路。"
  },
  {
    title: "六爻占卜",
    href: "/divination",
    icon: "卦",
    visual: "hexagram" as const,
    description: "问一件事，起一卦，查看本卦、变卦、动爻与下一步建议。"
  },
  {
    title: "静心禅坐",
    href: "/meditation",
    icon: "禅",
    visual: "meditation" as const,
    description: "提供呼吸节奏、静坐计时和每日禅语，让工具回到安定本身。"
  }
];

const wisdomTools = [
  {
    title: "智慧起卦",
    href: "/divination",
    icon: "卦",
    visual: "hexagram" as const,
    description: "静心起卦，洞察先机，查看本卦、变卦与行动建议。"
  },
  {
    title: "八字排盘",
    href: "/bazi",
    icon: "命",
    visual: "bazi" as const,
    description: "精准排盘，命局解析，拆解四柱、五行与大运流年。"
  },
  {
    title: "流年运势",
    href: "/fortune",
    icon: "运",
    visual: "mountain" as const,
    description: "把握流年，趋吉避凶，观察事业、财运与感情节奏。"
  },
  {
    title: "事业财运",
    href: "/wealth",
    icon: "财",
    visual: "wealth" as const,
    description: "事业发展，财帛趋势，给出稳健的机会与风险提醒。"
  },
  {
    title: "感情姻缘",
    href: "/love",
    icon: "缘",
    visual: "love" as const,
    description: "情感解析，缘分指引，帮助看清相处模式与沟通方向。"
  },
  {
    title: "为家人祈福",
    href: "/pray",
    icon: "愿",
    visual: "blessing" as const,
    description: "祈愿平安，福泽绵长，为家人写下一份善愿。"
  },
  {
    title: "求灵签",
    href: "/lingqian",
    icon: "签",
    visual: "sticks" as const,
    description: "诚心一问，指点迷津，以签文获得温和提醒。"
  },
  {
    title: "周公解梦",
    href: "/dream",
    icon: "梦",
    visual: "dream" as const,
    description: "梦境解析，心有所解，结合梦象与情绪做参考。"
  }
];

const buddhistPrinciples = [
  ["先安其心", "首屏与第一入口以祈福、静坐、善愿为主，不让测算压过佛家底色。"],
  ["再观其势", "八字、流年、事业、姻缘保留原项目能力，但表达为参考与觉察。"],
  ["终归行动", "每个结果都落到可做的日常建议，避免恐吓式判断和宿命化表达。"]
];

function SectionOrnament({ icon = "莲" }: { icon?: string }) {
  return (
    <div className="section-ornament" aria-hidden="true">
      <span className="section-ornament-line" />
      <span className="section-ornament-mark">{icon}</span>
      <span className="section-ornament-line" />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="home-hero relative overflow-hidden border-b border-[rgba(214,181,108,.12)]">
        <div className="hero-sigil">
          <span />
          <span />
          <span />
        </div>
        <div className="page-shell grid min-h-[320px] items-center gap-8 py-5 lg:grid-cols-[.86fr_1.14fr]">
          <div className="reveal-in max-w-2xl">
            <div className="mb-5">
              <BrandMark size="lg" />
            </div>
            <h1 className="home-title text-6xl font-semibold leading-tight text-[var(--paper)] md:text-8xl">禅心阁</h1>
            <p className="mt-5 text-2xl tracking-[0.22em] text-[var(--paper-soft)]">佛家祈福与东方文化</p>
            <div className="mt-7 h-px w-36 bg-gradient-to-r from-[var(--gold)] via-[var(--gold-bright)] to-transparent" />
            <h2 className="mt-7 text-2xl font-semibold tracking-[0.14em] text-[var(--gold-bright)] md:text-3xl">修心，而后知命</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)]">
              从佛家祈福、灵签与静心出发，融合八字排盘、流年运势、事业财运、感情姻缘、解梦与起名，把“测算”改写成安心、觉察与行动。
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/pray" className="gold-button">
                先为家人祈福
              </Link>
              <Link href="/bazi" className="ghost-button">
                查看八字排盘
              </Link>
            </div>
          </div>

          <div className="home-hero-banner reveal-in" aria-hidden="true">
            <div className="buddha-orb">
              <span>佛</span>
            </div>
            <div className="incense-lines">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </section>

      <section className="section wisdom-section">
        <div className="page-shell">
          <div className="mb-6 text-center">
            <div className="grid justify-center">
              <SectionOrnament icon="愿" />
            </div>
            <h2 className="section-title text-4xl font-semibold tracking-[0.16em] text-[var(--paper)]">智慧工具</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
              洞察命理玄机，指引人生方向。
            </p>
          </div>
          <div className="visual-tool-grid">
            {wisdomTools.map((item) => (
              <ToolCard key={item.href} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y border-[rgba(214,181,108,.1)] bg-[rgba(255,248,225,.025)]">
        <div className="page-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <SectionOrnament icon="禅" />
            <h2 className="section-title text-4xl font-semibold tracking-[0.08em] text-[var(--paper)]">今日安心功课</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)]">
              首页的核心不是“吓人算命”，而是把佛家的善愿、静心和自省放在前面，再给出传统文化里的参考。
            </p>
            <Link href="/meditation" className="mt-8 ghost-button">
              进入静心禅坐
            </Link>
          </div>
          <div className="practice-scroll">
            {supportTools.map((item) => (
              <ToolCard key={item.href} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-shell">
          <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <SectionOrnament icon="卷" />
              <h2 className="section-title text-4xl font-semibold tracking-[0.08em] text-[var(--paper)]">经典与文章</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">把原项目的百科、经典和文章沉到内容层，为首页工具提供佛家文化解释。</p>
            </div>
            <Link href="/articles" className="ghost-button">
              查看文章
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {articles.slice(0, 12).map((article) => (
              <ArticleCard key={article.slug} title={article.title} description={article.description} href={`/articles/${article.slug}`} category={article.category} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
