import { LampOfferingTool } from "@/components/LampOfferingTool";
import { SEOArticleFlow } from "@/components/SEOArticleFlow";
import { SimplePracticePage } from "@/components/SimplePracticePage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("佛前供灯｜线上供灯祈福与光明愿文", "佛前供灯，写下平安、健康、学业、事业、姻缘与家宅清宁愿文，安放心愿，点亮心灯。", "/face-palm");

export default function LampOfferingPage() {
  return (
    <>
      <SimplePracticePage
        title="佛前供灯"
        eyebrow="光明祈愿"
        icon="lamp"
        description="供一盏心灯，安放一份善愿。这里适合为自己、父母、孩子、伴侣、朋友或家人写下平安、健康、智慧、事业、姻缘与家宅清宁的供灯愿文。"
        action="生成供灯愿文"
        keywords={["佛前供灯", "线上供灯", "供灯祈福", "光明灯", "平安供灯", "健康祈愿"]}
        steps={[
          "先写清楚为谁供灯，以及这盏灯承载的祝愿方向。",
          "选择平安、健康、学业、事业、姻缘或家宅清宁等供灯主题。",
          "生成愿文后可保存供灯回执，也可作为每日静心前的一段短读。"
        ]}
        sections={[
          { title: "佛前供灯适合哪些心愿？", body: "佛前供灯适合表达平安、健康、智慧、事业顺遂、姻缘和合、家宅清宁等温和祝愿。它不是承诺现实结果，而是帮助用户把牵挂写成一段庄重、清楚、可保存的心愿。" },
          { title: "供灯愿文会包含什么？", body: "愿文会包含供灯对象、供灯方向、祝福正文、今日可行善事和供灯回执。表达保持克制，不使用恐吓、改命、保证灵验等内容。" },
          { title: "供灯如何落到日常？", body: "一盏灯的意义不只在仪式感，也在提醒人回到善念与行动。为家人供灯，可以多一声问候；为事业供灯，可以多一分耐心；为健康供灯，可以多一点照顾与规律。" }
        ]}
        notices={[
          "供灯内容用于祈愿、记录与文化体验，不承诺现实结果。",
          "涉及健康、投资、法律和重大现实选择时，请以专业建议和现实判断为准。",
          "真正能延续善愿的，是日常里的陪伴、节制、感恩与行动。"
        ]}
        faqs={[
          { title: "佛前供灯可以为别人供吗？", body: "可以。可以为父母、伴侣、孩子、朋友或家人写下愿文，也可以为自己供一盏安定心灯。" },
          { title: "供灯金额一定要高吗？", body: "不需要。页面采用随喜表达，更重视心愿记录、文化体验和日常善行。" }
        ]}
      >
        <LampOfferingTool />
      </SimplePracticePage>
      <SEOArticleFlow
        title="佛前供灯相关文章"
        intro="围绕佛前供灯、线上供灯、光明灯、平安灯、健康供灯、智慧灯、家宅清宁等关键词，持续补充适合搜索收录的佛学祈愿内容。"
        articles={[
          { title: "佛前供灯是什么意思：一盏灯里的光明与善愿", summary: "供灯常被理解为以灯火象征光明、智慧和善念，适合用来安放心愿、提醒自己保持清明与慈悲。", tag: "供灯入门", href: "/articles/foqian-gongdeng" },
          { title: "线上供灯怎么写愿文：供灯对象、愿望和回向", summary: "写供灯愿文时可先写为谁供灯，再写希望平安、健康、智慧或家宅和合，最后落到日常可做的小善行。", tag: "愿文写法", href: "/articles/gongdeng-yuanwen" },
          { title: "平安灯、健康灯、智慧灯分别适合什么心愿", summary: "不同供灯方向对应不同生活场景：平安重在出入顺遂，健康重在身心康宁，智慧重在学习与判断清楚。", tag: "供灯类型" },
          { title: "为家人供灯的祝福语：温和、庄重、可保存", summary: "为家人供灯的表达不宜夸张，可以从牵挂、感谢、平安、健康和陪伴几个角度组织祝福。", tag: "家人祈愿" }
        ]}
      />
    </>
  );
}
