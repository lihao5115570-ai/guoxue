import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { OrientalIcon, type OrientalIconType } from "@/components/OrientalIcon";
import { baziToolNav, buddhistSupportNav } from "@/lib/content/buddhist";

const groups: Array<{
  title: string;
  icon: OrientalIconType;
  links: Array<[string, string]>;
}> = [
  {
    title: "命理工具",
    icon: "divination",
    links: baziToolNav.map((item) => [item.title, item.href])
  },
  {
    title: "佛家入口",
    icon: "lotus",
    links: buddhistSupportNav.map((item) => [item.title, item.href])
  },
  {
    title: "网站服务",
    icon: "book",
    links: [
      ["关于我们", "/topics/about"],
      ["隐私政策", "/topics/privacy"],
      ["免责声明", "/topics/disclaimer"],
      ["文章中心", "/articles"],
      ["管理后台", "/admin"]
    ]
  }
];

export function Footer() {
  return (
    <footer className="site-footer relative border-t border-[rgba(214,181,108,.16)] bg-[rgba(10,8,5,.76)]">
      <div className="page-shell grid gap-8 py-12 md:grid-cols-[1.35fr_2fr]">
        <div>
          <div className="mb-4 flex items-center gap-3 font-semibold text-[var(--paper)]">
            <BrandLogo size="sm" />
          </div>
          <p className="max-w-sm text-sm leading-7 text-[var(--muted)]">
            禅心阁以东方佛学、传统命理与现代可视化体验为基础，提供祈福、灵签、黄历、八字、解梦、起名与静心参考。
          </p>
        </div>
        <div className="grid gap-7 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--paper)]">
                <span className="footer-mini-icon">
                  <OrientalIcon type={group.icon} seal="" />
                </span>
                {group.title}
              </h3>
              <div className="grid gap-2 text-sm text-[var(--muted)]">
                {group.links.map(([label, href]) => (
                  <Link key={`${label}-${href}`} href={href} className="transition hover:text-[var(--gold-bright)]">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="page-shell border-t border-[rgba(214,181,108,.12)] py-5 text-xs leading-6 text-[var(--muted)]">
        本站内容用于传统文化研究、娱乐与生活参考，不构成医学、投资、法律及其他专业建议，请理性看待。
      </div>
    </footer>
  );
}
