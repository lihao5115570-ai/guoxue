import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("历史记录", "查看最近的八字、流年、合婚与起卦记录。", "/user/history");

export default function HistoryPage() {
  const items = [["八字报告", "/bazi/result/demo"], ["流年", "/fortune/2026/demo"], ["合婚", "/marriage/result/demo"], ["起卦", "/divination/result/demo"]];
  return (
    <section className="section">
      <div className="page-shell">
        <h1 className="mb-8 text-5xl font-semibold">历史记录</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map(([name, href]) => <Link key={href} href={href} className="border border-black/10 bg-white/45 p-5 font-semibold hover:border-[#C9A86A]/50">{name}<span className="block pt-2 text-sm font-normal text-[#77736B]">查看结果</span></Link>)}
        </div>
      </div>
    </section>
  );
}
