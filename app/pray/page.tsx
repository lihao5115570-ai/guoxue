import { SimplePracticePage } from "@/components/SimplePracticePage";
import { pageMetadata } from "@/lib/seo/metadata";
import { PrayGenerator } from "./PrayGenerator";

export const metadata = pageMetadata("为家人祈福｜平安健康祈愿文", "为父母、伴侣、孩子或朋友写下祈愿，生成温和克制的平安健康祈福文。", "/pray");

export default function PrayPage() {
  return (
    <SimplePracticePage
      title="为家人祈福"
      eyebrow="佛家祈福"
      icon="prayer"
      description="把牵挂写成一段安静的祈愿。这里适合为父母、伴侣、孩子、朋友或自己记录祝愿，生成平安健康、心定从容、顺遂安稳的祈福文。"
      action="生成祈福文"
      keywords={["平安祈福", "健康祝愿", "家人祈愿", "佛家文化", "安心文案"]}
      steps={[
        "先写清楚祈福对象与当下最牵挂的事情，让祈愿文更具体。",
        "选择祈福方向，系统会围绕平安、健康、和合、顺遂等主题组织表达。",
        "生成后可以保存为每日提醒，也可以把它当作一段安静的自我整理。"
      ]}
      sections={[
        { title: "适合什么时候使用？", body: "当家人身体不适、远行、考试、工作变动、情绪压力较大，或者你只是想表达祝福时，都可以写一段祈福文。页面不会承诺结果，只帮助你把关心说得更完整、更温和。" },
        { title: "祈福文会包含什么？", body: "内容会包含称谓、愿望、祝福方向、安心提醒和一段可保存的短句。表达会尽量克制，不使用恐吓、夸张或绝对化语言。" },
        { title: "佛家祈愿如何理解？", body: "这里更强调善念、感恩、祝愿与行动。真正能落地的祈福，往往不是只停留在文字里，也包括多联系、多照顾、多陪伴和少一些焦急。" }
      ]}
      notices={[
        "本页内容适合截图保存，也适合作为每日静心前的一段短读。",
        "不要把祈福文当作医疗、投资或现实决策依据。",
        "如果是健康问题，请优先遵循专业医生建议。"
      ]}
      faqs={[
        { title: "可以为自己祈福吗？", body: "可以。为自己写下愿望并不自私，它可以帮助你看见压力、整理目标，也让你更清楚接下来能做什么。" },
        { title: "祈福文需要很长吗？", body: "不需要。好的祈福文可以很短，关键是清楚、真诚、温和，并且能落到日常行动。" }
      ]}
    >
      <PrayGenerator />
    </SimplePracticePage>
  );
}
