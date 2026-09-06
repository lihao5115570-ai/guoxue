import { DivinationStaticResult } from "@/components/DivinationStaticResult";
import { privateResultMetadata } from "@/lib/seo/metadata";

export const metadata = privateResultMetadata("你的起卦结果", "个人起卦结果页不进入公开索引。");

export default function DivinationResultIndexPage() {
  return <DivinationStaticResult />;
}
