import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { OrientalIcon, type OrientalIconType } from "@/components/OrientalIcon";
import { baziToolNav, buddhistSupportNav, mainNav } from "@/lib/content/buddhist";

const navIcons: Record<string, OrientalIconType> = {
  "/": "lotus",
  "/bazi": "divination",
  "/wiki": "encyclopedia",
  "/classics": "book"
};

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(214,181,108,.14)] bg-[rgba(16,13,9,.88)] backdrop-blur-2xl">
      <div className="page-shell flex min-h-16 items-center justify-between gap-5">
        <Link href="/" className="flex min-w-0 items-center gap-3 font-semibold">
          <BrandLogo size="sm" subtitle="佛家祈福" />
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-12 text-[16px] font-semibold xl:flex">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link inline-flex items-center gap-2 whitespace-nowrap">
              <span className="nav-mini-icon"><OrientalIcon type={navIcons[item.href] ?? "lotus"} seal="" /></span>
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 2xl:flex">
          <Link href="/user/history" className="ghost-button min-h-9 whitespace-nowrap px-4 text-sm">
            祈愿记录
          </Link>
          <Link href="/admin" className="gold-button min-h-9 whitespace-nowrap px-4 text-sm">
            登录
          </Link>
        </div>
        <details className="shrink-0 xl:hidden">
          <summary className="ghost-button grid min-h-9 w-11 list-none place-items-center px-0 text-lg">☰</summary>
          <div className="absolute left-3 right-3 top-16 max-h-[78vh] overflow-y-auto border border-[rgba(214,181,108,.18)] bg-[rgba(23,17,9,.96)] p-3 shadow-soft">
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className="block border-b border-[rgba(214,181,108,.12)] px-3 py-3 text-sm font-semibold text-[var(--paper)] last:border-b-0">
                {item.title}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[...baziToolNav, ...buddhistSupportNav].map((item) => (
                <Link key={item.href} href={item.href} className="border border-[rgba(214,181,108,.12)] px-3 py-2 text-xs text-[var(--muted)]">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </details>
        <Link href="/bazi" className="mobile-menu-fallback" aria-label="打开工具菜单">
          菜单
        </Link>
      </div>
      <div className="hidden border-t border-[rgba(214,181,108,.1)] bg-[rgba(255,255,255,.025)] lg:block">
        <nav className="page-shell flex min-h-10 items-center justify-center gap-6 overflow-x-auto whitespace-nowrap text-sm text-[var(--muted)]">
          {baziToolNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[var(--gold-bright)]">
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="hidden border-t border-[rgba(214,181,108,.1)] bg-[rgba(8,6,4,.48)] lg:block">
        <nav className="page-shell flex min-h-10 items-center justify-center gap-6 overflow-x-auto whitespace-nowrap text-sm text-[var(--gold-bright)]">
          {buddhistSupportNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[var(--paper)]">
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
