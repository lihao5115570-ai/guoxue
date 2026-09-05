export type PracticeToolType = "dream" | "babyName";

export type PracticeFieldConfig = {
  label: string;
  placeholder: string;
  type?: "input" | "textarea" | "select";
  options?: string[];
};

export type PracticeFormValues = Record<string, string>;

export type PracticeResultBlock = {
  title: string;
  body: string[];
  points?: string[];
};

export type PracticeResult = {
  eyebrow: string;
  title: string;
  summary: string;
  keywords: string[];
  blocks: PracticeResultBlock[];
  suggestions: string[];
};

const pick = <T,>(items: T[], seed: string) => {
  const index = Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0) % items.length;
  return items[index];
};

const valueOf = (values: PracticeFormValues, label: string, fallback = "") => values[label]?.trim() || fallback;

function generateDreamResult(values: PracticeFormValues): PracticeResult {
  const category = valueOf(values, "梦境分类", "综合梦境");
  const keyword = valueOf(values, "梦境关键词", "梦境");
  const detail = valueOf(values, "梦境细节", "梦里有明显的场景变化，也伴随一些没有说出口的情绪。");
  const tone = pick(["需要整理情绪", "正在经历变化", "对关系较敏感", "需要休息复原", "正在寻找确定感"], keyword + detail);

  return {
    eyebrow: "梦境解析",
    title: `${keyword} 的梦境参考`,
    summary: `这个梦可先从“${category}”入手理解。它不适合被当成预言，更适合看作近期情绪、关系和生活节奏的提示。当前关键词偏向：${tone}。`,
    keywords: [keyword, category, tone, "周公解梦", "梦境情绪"],
    blocks: [
      {
        title: "传统梦象含义",
        body: [
          `从传统解梦角度看，${keyword} 常被放在“象”的层面理解：它可能代表内心关注的对象、近期反复出现的压力，也可能是生活中某个未完成问题的投影。`,
          `如果梦里画面清晰、人物和场景反复出现，说明这个主题在你心里停留较久；如果梦很碎，则更像是白天信息、睡眠状态和情绪残留交织在一起。`
        ],
        points: ["先看梦象，再看情绪", "不要只凭一个关键词判断", "反复出现的梦更值得记录"]
      },
      {
        title: "情绪线索",
        body: [
          `你记录的细节是：“${detail}”。这里最值得看的不是吉凶，而是梦醒后的感受：害怕多半对应不安，轻松多半对应释放，焦虑多半对应现实中的压力堆积。`,
          `如果近期工作、人际或家庭事务较多，这类梦容易把没有表达完的话、没有处理完的选择，以象征方式重新排列出来。`
        ]
      },
      {
        title: "现实提醒",
        body: [
          "近期适合把重要事情拆小处理，减少临时冲动决定。睡前少刷刺激性内容，给自己留一点安静收尾时间，会更容易减少杂乱梦境。",
          "如果梦境让你持续不舒服，可以尝试写梦境日记：记录关键词、人物、情绪、醒来后的身体感受，再看它和现实事件是否有关。"
        ],
        points: ["整理睡前节奏", "减少情绪压抑", "把梦当作自我观察入口"]
      }
    ],
    suggestions: ["今晚提前放下手机十分钟", "把梦里最强烈的情绪写下来", "白天完成一件被拖延的小事"]
  };
}

const namePools = {
  boy: ["承安", "景行", "怀瑾", "知远", "明谦", "书尧", "允和", "清越"],
  girl: ["安禾", "知夏", "清宁", "若岚", "书妍", "念慈", "舒窈", "云舒"],
  neutral: ["一宁", "安然", "云知", "清和", "予安", "明悦", "知行", "星禾"]
};

function generateBabyNameResult(values: PracticeFormValues): PracticeResult {
  const surname = valueOf(values, "宝宝姓氏", "陈").replace(/\s/g, "").slice(0, 2);
  const gender = valueOf(values, "宝宝性别", "不限定");
  const birthTime = valueOf(values, "出生时间", "未填写出生时间");
  const wish = valueOf(values, "期望寓意", "希望名字端正、好听、好写，有平安、明朗和书卷气。");
  const pool = gender === "男孩" ? namePools.boy : gender === "女孩" ? namePools.girl : namePools.neutral;
  const start = Array.from(surname + wish).reduce((sum, char) => sum + char.charCodeAt(0), 0) % pool.length;
  const names = [0, 1, 2, 3, 4, 5].map((offset) => `${surname}${pool[(start + offset) % pool.length]}`);

  return {
    eyebrow: "起名参考",
    title: `${surname}姓宝宝起名方案`,
    summary: `本次结合姓氏、性别、出生时间和家庭期望生成一组名字方向。出生时间：${birthTime}。期望重点：${wish}`,
    keywords: [surname + "姓起名", gender, "宝宝起名", "名字寓意", "五行起名"],
    blocks: [
      {
        title: "推荐名字",
        body: ["以下名字先作为第一轮筛选方向，建议家人读三遍、写三遍，再看是否自然顺口。"],
        points: names
      },
      {
        title: "音律与字形",
        body: [
          `${surname}姓起名要注意姓与名之间的声调起伏，避免连续拗口、重音太挤或读起来像短句。名字应当有呼吸感，适合日常称呼。`,
          "字形上建议不要两个字都过分复杂，也不要都太空。一个名字如果读音清楚、书写稳定、视觉重心平衡，长期使用会更舒服。"
        ]
      },
      {
        title: "寓意方向",
        body: [
          `从你写的期望看，名字可往“平安、清朗、温润、向学、笃行”的方向取意。不要把寓意压得太重，越克制越耐看。`,
          "五行起名可作为传统文化参考，但不建议机械地缺什么补什么。更适合把五行理解成气质方向：木主生发，火主明朗，土主安定，金主清正，水主灵动。"
        ],
        points: ["少用生僻字", "避开尴尬谐音", "兼顾读音、书写和寓意"]
      }
    ],
    suggestions: ["把喜欢的名字和姓氏连读十遍", "检查普通话和方言谐音", "确认落户用字是否规范"]
  };
}

export function generatePracticeResult(type: PracticeToolType, values: PracticeFormValues): PracticeResult {
  if (type === "dream") return generateDreamResult(values);
  return generateBabyNameResult(values);
}
