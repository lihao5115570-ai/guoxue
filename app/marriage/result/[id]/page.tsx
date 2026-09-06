import { CompatibilityRing } from "@/components/CompatibilityRing";
import { privateResultMetadata } from "@/lib/seo/metadata";

export const metadata = privateResultMetadata("合婚结果", "个人合婚结果页不进入公开索引。");

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: "demo" }];
}

const scores = [["性格契合", 86], ["沟通方式", 72], ["生活方式", 80], ["价值观", 82], ["长期关系", 80]];

export default function MarriageResultPage() {
  return (
    <section className="section">
      <div className="page-shell grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="soft-panel p-6">
          <CompatibilityRing score={86} />
        </div>
        <div className="soft-panel p-6">
          <h1 className="mb-6 text-4xl font-semibold">合婚结果</h1>
          <div className="grid gap-4">
            {scores.map(([name, score]) => (
              <div key={name} className="grid grid-cols-[90px_1fr_42px] items-center gap-3">
                <span>{name}</span>
                <span className="h-3 bg-black/5"><span className="block h-3 bg-[#C9A86A]" style={{ width: `${score}%` }} /></span>
                <strong>{score}</strong>
              </div>
            ))}
          </div>
          <p className="mt-7 leading-8 text-[#77736B]">这份结果强调相处方式与长期磨合，不使用“必然结婚”“一定分开”等绝对描述。</p>
        </div>
      </div>
    </section>
  );
}
