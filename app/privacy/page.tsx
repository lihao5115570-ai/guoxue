import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("隐私政策", "禅心阁隐私政策，说明用户输入信息、浏览数据与本地存储的使用方式。", "/privacy");

export default function PrivacyPage() {
  return (
    <section className="section">
      <article className="page-shell prose-lite max-w-4xl">
        <p className="text-sm tracking-[0.24em] text-[var(--gold-bright)]">隐私政策</p>
        <h1>隐私政策</h1>
        <p>
          禅心阁重视用户隐私。本页面说明你在使用八字排盘、祈福、供灯、求签、解梦、起名等功能时，可能涉及的信息类型与使用方式。
        </p>
        <h2>我们可能收集的信息</h2>
        <p>
          当你主动填写姓名、性别、出生时间、出生地区、愿望、留言或问题描述时，页面会使用这些信息生成相应的文化参考内容。当前静态版本主要在浏览器本地完成记录与展示。
        </p>
        <h2>信息使用方式</h2>
        <p>
          用户输入内容用于生成页面结果、供奉回执、祈福文案、灵签解读或命理报告。除非后续接入账号、支付和后端数据库服务，否则静态版本不会主动把这些内容提交到远程业务数据库。
        </p>
        <h2>支付与安全</h2>
        <p>
          当前页面可展示支付方式与收款二维码。后续接入正式微信支付、支付宝或其他支付服务时，订单金额、订单状态和支付回调应由后端系统处理，支付密钥不得写入前端代码。
        </p>
        <h2>用户建议</h2>
        <p>
          请不要在留言、愿望或问题描述中填写身份证号、银行卡号、详细住址、医疗隐私等高度敏感信息。如需删除本地记录，可清理浏览器缓存和本地存储。
        </p>
      </article>
    </section>
  );
}
