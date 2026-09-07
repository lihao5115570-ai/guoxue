import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("关于禅心阁", "了解禅心阁的东方佛学、祈福文化、命理工具与内容服务定位。", "/about");

export default function AboutPage() {
  return (
    <section className="section">
      <article className="page-shell prose-lite max-w-4xl">
        <p className="text-sm tracking-[0.24em] text-[var(--gold-bright)]">关于我们</p>
        <h1>关于禅心阁</h1>
        <p>
          禅心阁面向中文用户提供佛家祈福、佛前供灯、今日黄历、求灵签、八字精批、周公解梦、宝宝起名、六爻占卜与静心禅坐等文化内容服务。
        </p>
        <h2>平台定位</h2>
        <p>
          我们希望把传统东方文化内容整理成更清晰、更适合现代网页阅读的形式，让用户能够安放心愿、记录祝福、查询民俗信息，也能阅读命理、黄历、典籍和生活文化文章。
        </p>
        <h2>内容原则</h2>
        <p>
          平台内容坚持温和、克制、理性表达，不使用恐吓、绝对承诺、迷信诱导或夸大结果的话术。所有测算、祈福与供灯内容都应被理解为传统文化体验与情绪记录。
        </p>
      </article>
    </section>
  );
}
