import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("服务说明", "禅心阁服务说明，介绍祈福供灯、测算工具、文章典籍与支付流程边界。", "/service");

export default function ServicePage() {
  return (
    <section className="section">
      <article className="page-shell prose-lite max-w-4xl">
        <p className="text-sm tracking-[0.24em] text-[var(--gold-bright)]">服务说明</p>
        <h1>服务说明</h1>
        <p>
          禅心阁提供东方佛学与传统文化相关的网页工具和内容服务，包括为家人祈福、佛前供灯、求灵签、八字精批、黄历查询、解梦、起名、占卜与静心练习。
        </p>
        <h2>工具服务</h2>
        <p>
          测算与解读类工具会根据用户输入生成结构化结果。当前版本优先采用前端内容模型展示，便于静态部署和快速访问；后续可逐步接入真实后端、订单系统与内容管理系统。
        </p>
        <h2>供奉与支付</h2>
        <p>
          供奉祈文、佛前供灯和求签供灯会展示支付流程、供灯动画与供奉回执。当前页面仅用于线上祝愿表达、心愿记录和文化体验，不承诺现实结果。
        </p>
        <h2>内容服务</h2>
        <p>
          文章、典籍、百科和专题内容用于帮助搜索用户理解相关传统文化概念。内容会持续补充，以形成更完整的 SEO 内容体系和站内阅读路径。
        </p>
      </article>
    </section>
  );
}
