import { BaziStaticResult } from "@/components/BaziStaticResult";
import { privateResultMetadata } from "@/lib/seo/metadata";

export const metadata = privateResultMetadata("你的八字命盘", "个人八字结果页不进入公开索引。");

export default function BaziResultIndexPage() {
  return <BaziStaticResult />;
}
