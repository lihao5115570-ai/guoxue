import Link from "next/link";
import { OrientalIcon, type OrientalIconType } from "@/components/OrientalIcon";

type ArticleCardProps = {
  title: string;
  description: string;
  href: string;
  category?: string;
  icon?: OrientalIconType;
};

export function iconForCategory(category = ""): OrientalIconType {
  if (/五行/.test(category)) return "wuxing";
  if (/流年|运势|大运|黄历|节气/.test(category)) return "calendar";
  if (/事业|财运|财富/.test(category)) return "coin";
  if (/感情|婚姻|合婚|姻缘/.test(category)) return "love";
  if (/起名|宝宝/.test(category)) return "name";
  if (/六爻|起卦|占卜|灵签/.test(category)) return "liuyao";
  if (/供灯|光明灯|心灯/.test(category)) return "lamp";
  if (/佛|禅|祈福|静心/.test(category)) return "lotus";
  if (/解梦|梦/.test(category)) return "dream";
  if (/百科|典籍|知识/.test(category)) return "encyclopedia";
  return "bazi";
}

export function ArticleCard({ title, description, href, category, icon }: ArticleCardProps) {
  return (
    <Link href={href} className="article-card article-card-illustrated group">
      <span className="article-card-icon">
        <OrientalIcon type={icon ?? iconForCategory(category)} seal="文" />
      </span>
      <span className="mb-4 block h-px w-12 bg-[var(--gold)] transition group-hover:w-20" />
      {category && <span className="mb-3 inline-flex text-xs tracking-[0.16em] text-[var(--gold-bright)]">{category}</span>}
      <h3 className="mb-3 text-lg font-semibold text-[var(--paper)]">{title}</h3>
      <p className="text-sm leading-7 text-[var(--muted)]">{description}</p>
      <span className="mt-5 inline-flex text-sm font-semibold text-[var(--gold-bright)]">阅读 →</span>
    </Link>
  );
}
