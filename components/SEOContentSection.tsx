import { OrientalIcon, type OrientalIconType } from "@/components/OrientalIcon";

const topicIcons: OrientalIconType[] = ["bazi", "wuxing", "calendar", "lotus", "book", "fortune"];

export function SEOContentSection({ title, items }: { title: string; items: { heading: string; body: string }[] }) {
  return (
    <section className="section">
      <div className="page-shell">
        <div className="mb-7 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-[0.06em] text-[var(--paper)]">{title}</h2>
          <span className="hidden text-sm tracking-[0.2em] text-[var(--gold-bright)] md:block">重点速览</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <article key={item.heading} className="border border-[rgba(214,181,108,.14)] bg-[rgba(255,248,225,.045)] p-5 transition hover:-translate-y-1 hover:border-[rgba(214,181,108,.32)]">
              <div className="flex gap-4">
                <span className="seo-mini-icon">
                  <OrientalIcon type={topicIcons[index % topicIcons.length]} seal="" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--paper)]">{item.heading}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
