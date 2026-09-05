import Link from "next/link";
import type { ReactNode } from "react";
import { OrientalIcon, type OrientalIconType } from "@/components/OrientalIcon";

type PracticeField = {
  label: string;
  placeholder: string;
  type?: "input" | "textarea" | "select";
  options?: string[];
};

type PracticeSection = {
  title: string;
  body: string;
};

type SimplePracticePageProps = {
  title: string;
  eyebrow?: string;
  description: string;
  action: string;
  icon?: OrientalIconType;
  keywords?: string[];
  fields?: PracticeField[];
  sections?: PracticeSection[];
  steps?: string[];
  notices?: string[];
  faqs?: PracticeSection[];
  children?: ReactNode;
};

export function SimplePracticePage({
  title,
  eyebrow = "禅心阁",
  description,
  action,
  icon = "lotus",
  keywords = [],
  fields = [],
  sections = [],
  steps = [],
  notices = [],
  faqs = [],
  children
}: SimplePracticePageProps) {
  return (
    <main>
      <section className="section practice-page-hero">
        <div className="page-shell grid gap-8 lg:grid-cols-[.88fr_1.12fr] lg:items-center">
          <div>
            <span className="practice-hero-icon mb-8">
              <OrientalIcon type={icon} seal="禅" />
            </span>
            <span className="text-sm font-semibold tracking-[0.24em] text-[var(--gold-bright)]">{eyebrow}</span>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-[var(--paper)] md:text-6xl">{title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-9 text-[var(--muted)]">{description}</p>
            {keywords.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <span key={keyword} className="keyword-chip">
                    {keyword}
                  </span>
                ))}
              </div>
            ) : null}
            <Link href="/" className="ghost-button mt-8">
              返回首页
            </Link>
          </div>
          <div className="soft-panel p-6">
            {children ?? (
              <div className="grid gap-5">
                <div>
                  <h2 className="text-2xl font-semibold text-[var(--paper)]">{action}</h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                    填写越具体，生成的参考内容越容易落到现实场景。结果只作传统文化与生活参考，不替代现实判断。
                  </p>
                </div>
                {fields.map((field) => (
                  <label key={field.label} className="field">
                    <span>{field.label}</span>
                    {field.type === "textarea" ? (
                      <textarea placeholder={field.placeholder} rows={5} />
                    ) : field.type === "select" ? (
                      <select defaultValue="">
                        <option value="" disabled>
                          {field.placeholder}
                        </option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input placeholder={field.placeholder} />
                    )}
                  </label>
                ))}
                <button className="gold-button justify-center" type="button">
                  {action}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {steps.length ? (
        <section className="section pt-0">
          <div className="page-shell">
            <div className="section-heading">
              <span>使用流程</span>
              <h2>三步开始</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <article key={step} className="soft-panel p-5">
                  <span className="text-sm text-[var(--gold-bright)]">第 {index + 1} 步</span>
                  <p className="mt-3 text-base leading-8 text-[var(--muted)]">{step}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {sections.length ? (
        <section className="section pt-0">
          <div className="page-shell grid gap-4 md:grid-cols-2">
            {sections.map((section, index) => (
              <article key={section.title} className={index % 3 === 0 ? "soft-panel p-6 md:col-span-2" : "soft-panel p-6"}>
                <h2 className="text-2xl font-semibold text-[var(--paper)]">{section.title}</h2>
                <p className="mt-3 text-sm leading-8 text-[var(--muted)]">{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {notices.length ? (
        <section className="section pt-0">
          <div className="page-shell">
            <div className="soft-panel p-6">
              <h2 className="text-2xl font-semibold text-[var(--paper)]">阅读重点</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {notices.map((notice) => (
                  <p key={notice} className="border-l-2 border-[var(--gold-bright)] bg-[rgba(214,181,108,.07)] p-4 text-sm leading-7 text-[var(--muted)]">
                    {notice}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {faqs.length ? (
        <section className="section pt-0">
          <div className="page-shell">
            <div className="section-heading">
              <span>常见问题</span>
              <h2>使用前可以先看</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {faqs.map((faq) => (
                <article key={faq.title} className="soft-panel p-5">
                  <h3 className="text-lg font-semibold text-[var(--paper)]">{faq.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{faq.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
