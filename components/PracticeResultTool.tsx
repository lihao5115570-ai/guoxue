"use client";

import { useMemo, useState } from "react";
import { generatePracticeResult, type PracticeFieldConfig, type PracticeResult, type PracticeToolType } from "@/lib/practice/generators";

type PracticeResultToolProps = {
  type: PracticeToolType;
  action: string;
  fields: PracticeFieldConfig[];
};

export function PracticeResultTool({ type, action, fields }: PracticeResultToolProps) {
  const initialValues = useMemo(
    () =>
      fields.reduce<Record<string, string>>((acc, field) => {
        acc[field.label] = "";
        return acc;
      }, {}),
    [fields]
  );
  const [values, setValues] = useState(initialValues);
  const [result, setResult] = useState<PracticeResult | null>(null);

  const updateValue = (label: string, value: string) => {
    setValues((current) => ({ ...current, [label]: value }));
  };

  const submit = () => {
    setResult(generatePracticeResult(type, values));
  };

  return (
    <div className="grid gap-5">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--paper)]">{action}</h2>
        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">填写越具体，生成的参考内容越贴近你的场景。结果会按主题、关键词、现实提醒和行动建议分层输出。</p>
      </div>

      {fields.map((field) => (
        <label key={field.label} className="field">
          <span>{field.label}</span>
          {field.type === "textarea" ? (
            <textarea value={values[field.label] ?? ""} onChange={(event) => updateValue(field.label, event.target.value)} placeholder={field.placeholder} rows={5} />
          ) : field.type === "select" ? (
            <select value={values[field.label] ?? ""} onChange={(event) => updateValue(field.label, event.target.value)}>
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
            <input value={values[field.label] ?? ""} onChange={(event) => updateValue(field.label, event.target.value)} placeholder={field.placeholder} />
          )}
        </label>
      ))}

      <button className="gold-button justify-center" type="button" onClick={submit}>
        {action}
      </button>

      {result && (
        <article className="practice-result-panel">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--gold-bright)]">
            <span>{result.eyebrow}</span>
            <span>·</span>
            <span>生成结果</span>
          </div>
          <h3>{result.title}</h3>
          <p className="practice-result-summary">{result.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {result.keywords.map((keyword) => (
              <span key={keyword} className="keyword-chip">
                {keyword}
              </span>
            ))}
          </div>

          <div className="practice-result-blocks">
            {result.blocks.map((block) => (
              <section key={block.title} className="practice-result-block">
                <h4>{block.title}</h4>
                {block.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {block.points?.length ? (
                  <ul>
                    {block.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="practice-action-note">
            <strong>今日建议</strong>
            <div>
              {result.suggestions.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
