import { SimplePracticePage } from "@/components/SimplePracticePage";
import { PracticeResultTool } from "@/components/PracticeResultTool";
import { SEOArticleFlow } from "@/components/SEOArticleFlow";
import { pageMetadata } from "@/lib/seo/metadata";
import type { PracticeFieldConfig } from "@/lib/practice/generators";

export const metadata = pageMetadata("周公解梦｜梦境关键词解析", "输入梦境关键词，查看传统梦象解释、情绪线索和现实提醒。", "/dream");

const fields: PracticeFieldConfig[] = [
  { label: "梦境分类", type: "select", placeholder: "选择主要梦象", options: ["人物关系", "动物昆虫", "水火山川", "房屋道路", "金钱物品", "考试工作", "追赶坠落", "其他梦境"] },
  { label: "梦境关键词", placeholder: "例如：梦见水、梦见蛇、梦见旧房子、梦见考试" },
  { label: "梦境细节", type: "textarea", placeholder: "写下梦里发生了什么，你当时是害怕、轻松、焦虑，还是释然。" }
];

export default function DreamPage() {
  return (
    <>
      <SimplePracticePage
        title="周公解梦"
        eyebrow="梦境解析"
        icon="dream"
        description="记录梦境里的关键词、人物、场景和情绪，从传统梦象、心理压力、现实处境三个角度做温和解读。解梦不是预言，而是帮助你整理潜意识里的线索。"
        action="解析梦境"
        keywords={["周公解梦", "梦见水", "梦见蛇", "梦见亲人", "梦见考试", "梦境解析"]}
        steps={["先记录最明显的梦象关键词，例如水、蛇、房子、亲人、考试。", "补充梦里的情绪，情绪往往比单个梦象更接近现实状态。", "查看传统解释和现实提醒，把它作为自我观察的参考。"]}
        sections={[
          { title: "解梦会输出哪些内容？", body: "页面会先解释梦象在传统文化里的常见含义，再补充情绪层面的线索，最后给出近期生活、关系、工作和休息节奏上的温和提醒。" },
          { title: "常见梦象怎么分类？", body: "常见梦象可分为人物关系、动物昆虫、水火山川、房屋道路、金钱物品、考试工作、追赶坠落等。分类越清楚，解读越容易找到重点。" },
          { title: "适合怎么使用解梦结果？", body: "适合用来回看近期压力、关系变化、潜在担忧和未表达的情绪。不建议把梦境当成现实事件的必然预告。" }
        ]}
        notices={["梦境关键词只是入口，细节和情绪同样重要。", "连续噩梦或睡眠严重受影响时，应优先关注作息和身心健康。", "本内容仅作传统文化与娱乐参考。"]}
        faqs={[
          { title: "梦见不好的内容是不是不好？", body: "不一定。很多梦只是压力释放或情绪整理，不代表现实一定会发生对应事件。" },
          { title: "为什么要写梦里的情绪？", body: "因为同样的梦象在不同情绪里含义不同。害怕、轻松、焦虑、释然，都会影响解读方向。" }
        ]}
      >
        <PracticeResultTool type="dream" action="解析梦境" fields={fields} />
      </SimplePracticePage>
      <SEOArticleFlow
        title="周公解梦相关文章"
        intro="围绕梦见水、梦见蛇、梦见亲人、梦见考试、梦见掉牙、梦见房子等长尾关键词，持续沉淀可被搜索的解梦内容。"
        articles={[
          { title: "梦见水是什么意思：情绪流动、关系变化与近期提醒", summary: "梦见水可以从水势、清浊、位置和梦中情绪一起看，重点观察近期是否有变化、压力释放或关系流动。", tag: "梦见水", href: "/articles/mengjian-shui" },
          { title: "周公解梦怎么用：不要只看吉凶，要看关键词和情绪", summary: "同一个梦象在不同情绪下含义不同，记录细节、醒后感受和现实处境，比只查单个词更有参考价值。", tag: "解梦入门", href: "/articles/zhougong-jiemeng" },
          { title: "梦见考试、迟到、追赶：压力型梦境的常见线索", summary: "考试、迟到、被追赶常与现实压力、评价感、未完成任务有关，适合用来检查近期节奏和内在紧绷。", tag: "压力梦" },
          { title: "梦见亲人朋友：关系牵挂与未表达情绪", summary: "梦见亲人朋友时，可重点看梦里的互动方式、距离感、说了什么和没说什么，帮助理解现实关系里的牵挂。", tag: "人物梦" }
        ]}
      />
    </>
  );
}
