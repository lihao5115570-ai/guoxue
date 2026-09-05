import { MeditationTool } from "@/components/MeditationTool";
import { SimplePracticePage } from "@/components/SimplePracticePage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("静心禅坐｜呼吸练习与每日安定", "选择静心时长、呼吸节奏和练习主题，开始一段安静的禅坐练习。", "/meditation");

export default function MeditationPage() {
  return (
    <SimplePracticePage
      title="静心禅坐"
      eyebrow="每日静心"
      icon="meditation"
      description="给自己留一段不被打扰的时间。选择三分钟、十分钟或二十一分钟，通过呼吸、观照和简短提示，把心慢慢放回当下。"
      action="开始静心"
      keywords={["静心禅坐", "呼吸练习", "正念", "情绪安定", "每日修心"]}
      steps={[
        "找一个安静位置坐下，手机调成勿扰，背部自然伸展。",
        "选择练习时长和主题，让提示语围绕当下状态展开。",
        "跟随呼吸节奏，不追求立刻平静，只练习一次次把注意力带回来。"
      ]}
      sections={[
        { title: "静心禅坐适合谁？", body: "适合压力较大、睡前思绪多、工作前需要专注、情绪波动后想恢复节奏的人。它不要求宗教背景，更像一种温和的身心整理练习。" },
        { title: "呼吸节奏怎么做？", body: "可以先用四拍吸气、四拍停留、六拍呼气的方式。呼气稍长，有助于身体慢慢放松。若感到不适，立刻恢复自然呼吸。" },
        { title: "每天练多久合适？", body: "刚开始三分钟就够。比起一次坐很久，更重要的是稳定、温和、可持续。每天固定一个时间，会更容易形成习惯。" }
      ]}
      notices={[
        "不要强迫自己清空念头，发现走神后轻轻回来即可。",
        "饭后、疲劳或情绪很激烈时，可以先做自然呼吸。",
        "若有明显身心不适，请优先寻求专业帮助。"
      ]}
      faqs={[
        { title: "坐不住是不是不适合禅坐？", body: "不是。坐不住本身就是练习的一部分。你只需要从很短的时间开始，不必追求完美状态。" },
        { title: "静心和睡觉有什么区别？", body: "睡觉是休息，静心是有意识地观察呼吸和念头。两者都能帮助恢复，但练习方式不同。" }
      ]}
    >
      <MeditationTool />
    </SimplePracticePage>
  );
}
