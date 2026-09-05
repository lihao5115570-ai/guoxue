import { SimplePracticePage } from "@/components/SimplePracticePage";
import { LingqianTool } from "@/components/LingqianTool";
import { SEOArticleFlow } from "@/components/SEOArticleFlow";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("求灵签｜在线抽签与签文解读", "静心写下问题，生成签文、签意、现实提醒与行动建议。", "/lingqian");

export default function LingqianPage() {
  return (
    <>
      <SimplePracticePage
        title="求灵签"
        eyebrow="静心求签"
        icon="lottery"
        description="先静心，再问事。把问题写清楚，系统会按照传统签文的阅读方式，生成签文、签意、机会点、需要注意的地方与下一步建议。"
        action="求一支灵签"
        keywords={["在线抽签", "灵签解读", "观音灵签", "问题指引", "签文参考"]}
        steps={[
          "把问题限定在一件事上，避免同时问事业、感情和财富。",
          "写下目前真实处境，签文解读会更容易给出可落地的提醒。",
          "查看签意时重点看建议和风险，不要只看吉凶字眼。"
        ]}
        sections={[
          { title: "签文结果会怎么看？", body: "签文会拆成签象、签意、现实表现、机会点、风险点和行动建议。比如事业问题会更关注时机、沟通、资源和阻力；感情问题会更关注态度、节奏、边界和表达。" },
          { title: "什么问题更适合求签？", body: "适合询问当下选择、关系推进、工作机会、合作判断、近期规划等需要整理思路的问题。不适合用来替代法律、医疗、投资等专业判断。" },
          { title: "求签之后为什么适合供灯？", body: "求签是看见问题，供灯是安放心愿。若心里仍有牵挂，可以把签文提醒写成一盏线上心灯，作为记录、祝福与提醒自己稳步行动的仪式。" },
          { title: "如何避免误解签文？", body: "不要把签文当成绝对预言。更好的使用方式是把它当作一面镜子，帮助你看见自己忽略的因素、当下的情绪和下一步可执行的动作。" }
        ]}
        notices={[
          "问题越具体，签文越容易给出明确建议。",
          "不要反复短时间问同一个问题，容易让判断更乱。",
          "供灯加持属于心愿记录与文化体验，不承诺现实结果。"
        ]}
        faqs={[
          { title: "灵签结果不好怎么办？", body: "可以把它理解成提醒，而不是定论。重点看需要注意什么、哪里可以调整、下一步如何降低风险。" },
          { title: "可以问感情复合吗？", body: "可以，但建议把问题写成具体场景，例如是否适合主动沟通、如何改善关系，而不是只问会不会复合。" },
          { title: "供灯加持是什么意思？", body: "这里的供灯加持是线上祈愿与心念安放。它不承诺改变结果，而是帮助用户把牵挂写下、保存，并提醒自己以更稳定的方式面对问题。" }
        ]}
      >
        <LingqianTool />
      </SimplePracticePage>

      <SEOArticleFlow
        title="求灵签相关文章"
        intro="围绕在线求签、签文解读、观音灵签、事业感情财运问签和供灯加持，补充更适合搜索收录的长尾内容。"
        articles={[
          { title: "求灵签前怎么提问：让问题更清楚", summary: "求签前先把问题限定为一件事，写明时间、关系、选择和阻力，签文解读才更容易落到行动建议。", tag: "求签提问", href: "/articles/lingqian-tiwen" },
          { title: "签文解读怎么看：签象、签意与现实行动", summary: "不要只看上吉、中吉或下签字眼，更要看签诗所提示的时机、关系、节奏、阻力和下一步可执行动作。", tag: "签文解读", href: "/articles/qianwen-jiedu" },
          { title: "求签之后为什么适合供灯：安放心愿与提醒自己", summary: "求签让人看见问题，供灯让心愿有一个安放位置。线上供灯更适合作为记录心念、表达祝福和稳定行动的仪式。", tag: "供灯加持", href: "/articles/lingqian-gongdeng" },
          { title: "事业、感情、财运求签分别怎么看", summary: "事业看时机与合作，感情看沟通与边界，财运看风险和现金流。不同问题方向，对签文的阅读重点也不同。", tag: "分类解读", href: "/articles/lingqian-fenlei" }
        ]}
      />
    </>
  );
}
