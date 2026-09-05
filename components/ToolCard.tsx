import Link from "next/link";
import { OrientalIcon, type OrientalIconType } from "@/components/OrientalIcon";

type LegacyVisual =
  | "blessing"
  | "sticks"
  | "bazi"
  | "mountain"
  | "wealth"
  | "love"
  | "dream"
  | "name"
  | "meditation"
  | "calendar"
  | "palm"
  | "lamp"
  | "hexagram";

type ToolCardProps = {
  title: string;
  description: string;
  href: string;
  action?: string;
  icon?: string;
  visual?: LegacyVisual | OrientalIconType;
};

const visualMap: Record<string, OrientalIconType> = {
  blessing: "prayer",
  sticks: "lottery",
  bazi: "bazi",
  mountain: "fortune",
  wealth: "career",
  love: "love",
  dream: "dream",
  name: "name",
  meditation: "meditation",
  calendar: "calendar",
  palm: "palm",
  lamp: "lamp",
  hexagram: "liuyao"
};

function resolveVisual(visual?: ToolCardProps["visual"]) {
  if (!visual) return "prayer";
  return visualMap[visual] ?? visual;
}

export function ToolCard({ title, description, href, action = "进入查看", icon = "印", visual = "prayer" }: ToolCardProps) {
  const type = resolveVisual(visual);

  return (
    <Link href={href} className="tool-card group">
      <span className="tool-card-glow" />
      <div className={`tool-card-art tool-card-art-${type}`}>
        <OrientalIcon type={type} seal={icon} />
      </div>
      <div className="relative z-10 mt-5 flex items-center justify-between gap-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center border border-[rgba(214,181,108,.34)] bg-[rgba(214,181,108,.08)] text-lg font-semibold text-[var(--gold-bright)] shadow-[inset_0_0_24px_rgba(214,181,108,.1)]">
          {icon}
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center border border-[rgba(214,181,108,.18)] bg-[rgba(255,248,225,.035)] text-[var(--gold-bright)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-[rgba(214,181,108,.46)]">
          →
        </span>
      </div>
      <div className="relative z-10 mt-5">
        <h3 className="mb-2 text-lg font-semibold text-[var(--paper)]">{title}</h3>
        <p className="min-h-12 text-sm leading-7 text-[var(--muted)]">{description}</p>
        <span className="mt-5 inline-flex text-sm font-semibold text-[var(--gold-bright)]">{action}</span>
        <span className="tool-card-red-seal" aria-hidden="true">{icon}</span>
      </div>
    </Link>
  );
}
