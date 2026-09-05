import { SimplePracticePage } from "@/components/SimplePracticePage";
import { PracticeResultTool } from "@/components/PracticeResultTool";
import { SEOArticleFlow } from "@/components/SEOArticleFlow";
import { pageMetadata } from "@/lib/seo/metadata";
import type { PracticeFieldConfig } from "@/lib/practice/generators";

export const metadata = pageMetadata("宝宝起名｜新生儿取名与寓意参考", "结合姓氏、读音、字义、五行参考与家庭期望，生成宝宝起名思路。", "/baby-name");

const fields: PracticeFieldConfig[] = [
  { label: "宝宝姓氏", placeholder: "例如：陈、李、王、张" },
  { label: "宝宝性别", type: "select", placeholder: "选择性别或不限定", options: ["男孩", "女孩", "不限定"] },
  { label: "出生时间", placeholder: "例如：2026-08-21 10:30，可选填" },
  { label: "期望寓意", type: "textarea", placeholder: "例如：希望名字温润、有书卷气、寓意平安健康，不要太生僻。" }
];

export default function BabyNamePage() {
  return (
    <>
      <SimplePracticePage
        title="宝宝起名"
        eyebrow="新生儿取名"
        icon="name"
        description="一个名字要好听、好写、寓意清楚，也要适合长期使用。这里会结合姓氏、性别、出生时间、音律、字义、五行参考和家庭期望，生成起名方向。"
        action="生成起名思路"
        keywords={["宝宝起名", "新生儿取名", "男孩起名", "女孩起名", "五行起名", "名字寓意"]}
        steps={["先填写姓氏和性别，系统会避开读音拗口、搭配生硬的组合。", "补充出生时间和寓意偏好，生成更贴合家庭期待的字义方向。", "查看名字时同时看读音、字形、含义、重名感和长期使用感。"]}
        sections={[
          { title: "起名会考虑哪些因素？", body: "页面会综合姓氏搭配、声调节奏、字形结构、寓意表达、常见重名感和五行文化参考。名字不是越复杂越好，适合长期书写、称呼自然、含义端正更重要。" },
          { title: "五行起名怎么理解？", body: "五行起名可以作为传统文化参考，但不建议机械地缺什么补什么。更稳妥的方式是把出生信息、字义、音律和家庭审美综合起来看。" },
          { title: "什么名字不建议使用？", body: "过于生僻、读音容易误解、谐音尴尬、字形太复杂、寓意过重或太像短期流行词的名字，都需要谨慎。" }
        ]}
        notices={["名字应兼顾读音、书写、含义和长期使用感。", "五行只作文化参考，不应压过名字本身的美感和实用性。", "最终落户用字请以当地户籍规范为准。"]}
        faqs={[
          { title: "可以生成多个名字吗？", body: "可以。建议先生成一批方向，再从读音、寓意、书写和家人接受度里筛选。" },
          { title: "生僻字是不是更高级？", body: "不一定。生僻字可能带来书写、录入和读音麻烦，名字高级感更多来自克制、清楚和耐看。" }
        ]}
      >
        <PracticeResultTool type="babyName" action="生成起名思路" fields={fields} />
      </SimplePracticePage>
      <SEOArticleFlow
        title="宝宝起名相关文章"
        intro="围绕宝宝起名、男孩起名、女孩起名、五行起名、名字寓意、姓氏搭配等关键词，沉淀可持续扩展的起名内容。"
        articles={[
          { title: "起名要看什么：音义、寓意与五行参考", summary: "宝宝起名不只看好听，还要看姓氏搭配、声调节奏、字形结构、寓意表达、常见重名感和长期使用感。", tag: "起名入门", href: "/articles/qiming-wenhua" },
          { title: "男孩起名常用寓意：明朗、笃行、谦和与担当", summary: "男孩名字不必过分用力，可以从清正、向学、稳重、开阔、温和等方向选择更耐看的字义。", tag: "男孩起名" },
          { title: "女孩起名常用寓意：清宁、舒雅、温润与自持", summary: "女孩名字可避免过度甜腻或复杂，用清朗、安定、书卷气和柔中有骨的方向更适合长期使用。", tag: "女孩起名" },
          { title: "五行起名不要机械补缺：名字首先要好读好写", summary: "五行可作为文化参考，但名字本身的读音、书写、寓意和家庭审美更应优先考虑。", tag: "五行起名" }
        ]}
      />
    </>
  );
}
