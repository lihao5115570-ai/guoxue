import { calculateBazi } from "./calculator";
import type { BaziResultData, BirthProfileInput, DayunStage, FiveElements, Pillar } from "./types";

export type ReportFocus = "综合命盘" | "事业财运" | "婚姻感情" | "健康状态" | "未来运势";

export type BaziReportInput = BirthProfileInput & {
  reportFocus?: ReportFocus;
};

export type ReportParagraphSection = {
  title: string;
  paragraphs: string[];
};

export type BaziReport = {
  basicInfo: {
    name: string;
    gender: string;
    solarBirth: string;
    lunarBirth: string;
    birthHour: string;
    birthCity: string;
    zodiac: string;
    constellation: string;
    measuredAt: string;
    reportFocus: ReportFocus;
  };
  pillars: Array<Pillar & {
    hiddenStems: string;
    subStars: string;
    nayin: string;
    voidBranch: string;
    isDayMaster: boolean;
    annotation: string[];
  }>;
  fiveElements: {
    items: Array<{ name: string; count: number; strength: string; explanation: string; advice: string }>;
    dominant: string;
    weak: string;
    balance: string;
    favorable: string;
    unfavorable: string;
    analysis: ReportParagraphSection[];
  };
  dayMaster: {
    name: string;
    strength: string;
    personalityBase: string;
    why: string[];
    needs: string[];
    avoid: string[];
    impacts: ReportParagraphSection[];
  };
  tenGods: Array<{
    name: string;
    value: number;
    meaning: string;
    personality: string;
    career: string;
    wealth: string;
    warning: string;
  }>;
  personality: ReportParagraphSection[];
  career: ReportParagraphSection[];
  wealth: ReportParagraphSection[];
  relationship: ReportParagraphSection[];
  health: ReportParagraphSection[];
  luckCycles: Array<DayunStage & {
    element: string;
    careerTrend: string;
    wealthTrend: string;
    relationshipTrend: string;
    healthReminder: string;
    advice: string;
  }>;
  yearlyFortune: Array<{
    year: number;
    ganzhi: string;
    keyword: string;
    careerTrend: string;
    wealthTrend: string;
    relationshipTrend: string;
    healthReminder: string;
    caution: string;
    advice: string;
  }>;
  threeYearTips: Array<{
    year: number;
    title: string;
    opportunity: string;
    risk: string;
    suitable: string;
    unsuitable: string;
    reminder: string;
  }>;
  conclusion: ReportParagraphSection[];
  deepGuide: {
    middle: string;
    bottom: string;
    buttons: string[];
  };
  disclaimer: string;
};

const stems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const zodiac = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
const nayin = ["海中金", "炉中火", "大林木", "路旁土", "剑锋金", "山头火", "涧下水", "城头土", "白蜡金", "杨柳木", "泉中水", "屋上土"];
const hiddenStemMap: Record<string, string> = {
  子: "癸",
  丑: "己、癸、辛",
  寅: "甲、丙、戊",
  卯: "乙",
  辰: "戊、乙、癸",
  巳: "丙、戊、庚",
  午: "丁、己",
  未: "己、丁、乙",
  申: "庚、壬、戊",
  酉: "辛",
  戌: "戊、辛、丁",
  亥: "壬、甲"
};

const tenGodOrder = ["正官", "七杀", "正财", "偏财", "正印", "偏印", "食神", "伤官", "比肩", "劫财"];

const tenGodCopy: Record<string, Omit<BaziReport["tenGods"][number], "name" | "value">> = {
  正官: {
    meaning: "正官代表规则、责任、职位、名誉、约束力和社会评价。它像命盘中的秩序系统，提醒一个人怎样在组织、制度和长期关系里建立可信度。",
    personality: "正官明显的人通常更在意边界、承诺、规矩和外界评价，做事倾向稳妥，不太喜欢无序环境。优点是可靠，问题是容易给自己太多压力。",
    career: "事业上适合制度清晰、晋升路径明确、需要专业背书或管理责任的工作环境。若正官被大运流年引动，容易出现考核、晋升、岗位调整或责任加重。",
    wealth: "财运上正官有助于稳定收入和长期信用，但不一定代表快速暴利。更适合通过职位、资质、长期服务和专业信任获得回报。",
    warning: "需要注意不要过度压抑真实想法，也不要因为怕犯错而错过机会。规则可以帮助你，但不能让规则完全限制行动。"
  },
  七杀: {
    meaning: "七杀代表压力、竞争、挑战、决断、危机处理和强执行。它不是坏星，处理得当时会变成魄力、突破力和抗压能力。",
    personality: "七杀明显的人对环境变化敏感，遇到压力时反而容易被激发潜能。性格里会有不服输的一面，也容易对自己要求过高。",
    career: "事业上适合竞争性行业、项目攻坚、管理变革、销售拓展、技术突破或需要快速判断的位置。关键是把压力变成计划，而不是变成焦虑。",
    wealth: "财运上可能出现机会和风险并存的阶段，适合做清晰评估后再投入。越是高压机会，越要提前设好退出机制和资金边界。",
    warning: "需要注意冲动决策、与权威硬碰硬、过度冒险和长期紧绷。七杀要被规则、学习和稳定节奏制化，才更容易发挥好处。"
  },
  正财: {
    meaning: "正财代表稳定收入、现金流、责任、经营意识和可积累的钱。它关注的是把资源一点点做厚，而不是一夜之间发生巨大变化。",
    personality: "正财明显的人通常重视现实、安全感、承诺和投入产出，愿意通过稳定劳动换取回报。优点是务实，问题是容易过度保守。",
    career: "事业上适合稳定业务、客户经营、财务管理、供应链、行政运营、项目执行和长期服务型岗位。正财强时要重视标准化和复购。",
    wealth: "财运上更适合固定收入、长期储蓄、预算管理和稳健资产配置。钱来得不一定快，但更容易通过纪律慢慢积累。",
    warning: "需要注意为了安全感放弃成长，也要避免把所有压力都转成赚钱焦虑。正财要配合视野和学习，财富结构才会更健康。"
  },
  偏财: {
    meaning: "偏财代表机会、人脉、项目、商业嗅觉、资源整合和流动财富。它更像外部机会窗口，强调判断力和时机。",
    personality: "偏财明显的人通常对机会敏感，愿意接触新资源，社交与商务意识较强。优点是灵活，问题是容易被短期利益吸引。",
    career: "事业上适合市场、商务、渠道、品牌、投资、项目制收入、平台资源整合等方向。偏财好时，机会来自人脉、信息差和资源配置。",
    wealth: "财运上可能有额外收入、副业机会或阶段性增长，但也会伴随波动。更适合小步验证，避免一次性押注。",
    warning: "需要注意高杠杆、冲动投资、朋友借贷和未经验证的合作。偏财不是不能抓，而是要先看风险边界。"
  },
  正印: {
    meaning: "正印代表学习、贵人、保护、证书、资质、吸收能力和长期知识。它像命盘里的支持系统。",
    personality: "正印明显的人比较重视安全感、知识体系、被理解和被支持，遇事喜欢先学习再行动。优点是稳，问题是行动容易慢。",
    career: "事业上适合教育、咨询、研究、专业服务、文职、资质型岗位和需要长期积累的方向。正印也有利于遇到愿意指导你的贵人。",
    wealth: "财运上更适合通过专业、证书、经验、知识产品或长期信用变现，不太适合完全靠短线波动。",
    warning: "需要注意依赖他人、过度准备和迟迟不开始。学习要转成输出，贵人帮助也要靠自己的行动接住。"
  },
  偏印: {
    meaning: "偏印代表灵感、洞察、研究、非标准路径、独特视角和内在敏感度。它让人能看到别人忽略的信息。",
    personality: "偏印明显的人常有独立思考和特殊兴趣，适合深入研究复杂问题。问题是有时想太多，不容易被普通环境理解。",
    career: "事业上适合策略、研究、技术、心理、命理文化、内容策划、产品分析、数据洞察和小众专业领域。",
    wealth: "财运上适合把专业洞察转化成咨询、课程、工具、内容或高附加值服务。收入模式不一定传统，但要有可复制结构。",
    warning: "需要注意孤立、内耗、过度怀疑和信息闭塞。偏印要多做验证，多与现实需求连接。"
  },
  食神: {
    meaning: "食神代表稳定输出、才华、表达、享受感、温和创造力和生活品质。它是一种舒服地把能力表达出来的能量。",
    personality: "食神明显的人通常不喜欢太紧绷的环境，更愿意用稳定、自然、持续的方式表现自己。优点是有亲和力，问题是容易安逸。",
    career: "事业上适合内容、设计、教育、服务体验、产品、餐饮、美学、表达型岗位和需要持续输出的工作。",
    wealth: "财运上适合通过技能输出、内容变现、服务口碑和长期复购赚钱。食神能生财，但需要稳定频率。",
    warning: "需要注意拖延、舒适区和缺少目标。才华需要被看见，也需要被产品化、流程化。"
  },
  伤官: {
    meaning: "伤官代表突破、表达锋芒、创新、技术能力、反传统意识和强烈的个人观点。它让人不满足于照本宣科。",
    personality: "伤官明显的人反应快、有想法、敢表达，但有时讲话太直接。优点是创新，问题是容易与规则系统发生摩擦。",
    career: "事业上适合创意、技术、传播、策划、创业、产品创新和需要差异化表达的领域。若能配合规则，容易做出亮点。",
    wealth: "财运上适合凭技术、创意、内容、方案和影响力获得收入。伤官生财时机会不错，但要注意稳定交付。",
    warning: "需要注意口舌、人际冲突、轻视规则和急于证明自己。表达可以锋利，但落地要稳。"
  },
  比肩: {
    meaning: "比肩代表自我、同辈、独立、竞争意识和个人主张。它强调靠自己站住，而不是完全依赖外界。",
    personality: "比肩明显的人有主见、抗压、愿意自己扛事。优点是独立，问题是容易固执，也可能不愿意求助。",
    career: "事业上适合专业路线、个人品牌、合伙中的明确分工、技术深耕或需要自主判断的岗位。",
    wealth: "财运上适合靠个人能力和长期积累赚钱，但合作分钱、人情支出和同辈竞争要提前说清楚。",
    warning: "需要注意过度坚持、资源分散和合作边界不清。独立不是孤立，适度借力更有利。"
  },
  劫财: {
    meaning: "劫财代表行动力、朋友、竞争、资源流动和快速反应。它让人敢动，也会让资源进出更快。",
    personality: "劫财明显的人讲义气、有冲劲，遇到机会容易马上行动。优点是开拓，问题是容易冲动和受圈层影响。",
    career: "事业上适合销售、运营、开拓、团队协作、社群、人脉型业务和节奏快的项目。",
    wealth: "财运上容易有进有出，赚钱机会常和人脉、合作、项目有关。需要特别重视合同、分账、预算和风险控制。",
    warning: "需要注意合伙纠纷、朋友借贷、冲动消费和短期诱惑。劫财要用规则约束，才不容易变成消耗。"
  }
};

function hash(input: string) {
  return Array.from(input).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 9973, 17);
}

function pick<T>(items: T[], seed: number, offset = 0) {
  return items[(seed + offset) % items.length];
}

function zodiacFromYear(year: number) {
  return zodiac[(year - 4) % 12];
}

function constellationFromDate(date: string) {
  const [, monthRaw, dayRaw] = date.split("-").map(Number);
  const value = monthRaw * 100 + dayRaw;
  if (value >= 321 && value <= 419) return "白羊座";
  if (value >= 420 && value <= 520) return "金牛座";
  if (value >= 521 && value <= 621) return "双子座";
  if (value >= 622 && value <= 722) return "巨蟹座";
  if (value >= 723 && value <= 822) return "狮子座";
  if (value >= 823 && value <= 922) return "处女座";
  if (value >= 923 && value <= 1023) return "天秤座";
  if (value >= 1024 && value <= 1122) return "天蝎座";
  if (value >= 1123 && value <= 1221) return "射手座";
  if (value >= 1222 || value <= 119) return "摩羯座";
  if (value >= 120 && value <= 218) return "水瓶座";
  return "双鱼座";
}

function hourBranch(time: string) {
  const hour = Number(time.split(":")[0] ?? "0");
  const labels = ["子时", "丑时", "丑时", "寅时", "寅时", "卯时", "卯时", "辰时", "辰时", "巳时", "巳时", "午时", "午时", "未时", "未时", "申时", "申时", "酉时", "酉时", "戌时", "戌时", "亥时", "亥时", "子时"];
  return labels[hour] ?? "未知时辰";
}

function mockLunarDate(profile: BirthProfileInput, seed: number) {
  const year = Number(profile.birthDate.slice(0, 4));
  const month = 1 + (seed % 12);
  const day = 1 + ((seed * 7) % 28);
  return `农历${year}年${month}月${day}日（模拟换算）`;
}

function elementCount(elements: FiveElements, key: keyof FiveElements) {
  return Math.max(1, Math.round(elements[key] / 5));
}

function elementItems(result: BaziResultData) {
  return [
    ["金", "metal", result.elements.metal],
    ["木", "wood", result.elements.wood],
    ["水", "water", result.elements.water],
    ["火", "fire", result.elements.fire],
    ["土", "earth", result.elements.earth]
  ] as const;
}

function strength(value: number) {
  if (value >= 25) return "偏旺";
  if (value <= 15) return "偏弱";
  return "中和";
}

function paragraphBoost(focus: ReportFocus, target: ReportFocus | "综合命盘") {
  return focus === target || focus === "综合命盘";
}

function safeFocus(focus?: ReportFocus): ReportFocus {
  return focus ?? "综合命盘";
}

function stableMeasuredAt(seed: number) {
  const month = 1 + (seed % 12);
  const day = 1 + (Math.floor(seed / 7) % 28);
  const hour = 8 + (Math.floor(seed / 13) % 12);
  const minute = Math.floor(seed / 17) % 60;
  return `2026/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
}

export function generateBaziReport(formData: BaziReportInput, baseResult?: BaziResultData): BaziReport {
  const reportFocus = safeFocus(formData.reportFocus);
  const result = baseResult ?? calculateBazi(formData);
  const seed = hash(`${formData.name}-${formData.gender}-${formData.birthDate}-${formData.birthTime}-${formData.birthCity}-${reportFocus}`);
  const birthYear = Number(formData.birthDate.slice(0, 4)) || 1990;
  const measuredAt = stableMeasuredAt(seed);
  const genderText = formData.gender === "female" ? "女" : formData.gender === "male" ? "男" : "未填写";
  const dominant = result.dominantElement;
  const weak = result.weakElement;
  const overallStrength = result.elements.wood + result.elements.fire >= result.elements.earth + result.elements.metal + result.elements.water ? "偏强" : "偏弱";
  const cycleElements = ["木", "火", "土", "金", "水"];
  const yearlyKeywords = ["蓄力调整", "贵人协助", "项目推进", "财务梳理", "关系磨合", "学习升级", "资源整合", "稳定沉淀", "外部机会", "节奏转换"];

  const pillars = result.pillars.map((pillar, index) => {
    const branchIndex = branches.indexOf(pillar.branch);
    return {
      ...pillar,
      hiddenStems: hiddenStemMap[pillar.branch] ?? pick(Object.values(hiddenStemMap), seed, index),
      subStars: pick(["文昌、贵人", "桃花、驿马", "将星、禄神", "华盖、天乙", "红鸾、天喜"], seed, index),
      nayin: pick(nayin, seed, index),
      voidBranch: `${branches[(Math.max(branchIndex, 0) + 2) % branches.length]}${branches[(Math.max(branchIndex, 0) + 3) % branches.length]}`,
      isDayMaster: index === 2,
      annotation: [
        `${pillar.label}落在${["早年与家族起点", "青年与事业根基", "自我核心与亲密关系", "后期成果与长期沉淀"][index]}，这里主要观察命盘在现实生活中的入口。`,
        `本柱天干为${pillar.stem}、地支为${pillar.branch}，十神显示为${pillar.tenGod}，说明这一宫位容易围绕${pillar.tenGod}相关主题展开。`,
        index === 2 ? `日柱为日主所在，需要特别标注“日主”。用户真正要看的，是日主如何被月令、五行、十神和大运共同影响。` : `这部分不单独判断吉凶，需要与日主强弱、喜用方向和流年触发一起看。`
      ]
    };
  });

  const fiveItems = elementItems(result).map(([name, key, value]) => ({
    name,
    count: elementCount(result.elements, key),
    strength: strength(value),
    explanation: `${name}在本盘占比约${value}%，状态为${strength(value)}。它影响命主在${elementMetaShort(name)}方面的表现。`,
    advice: value >= 25 ? `此五行偏旺时，要注意节制对应行为，避免长期过度消耗。` : value <= 15 ? `此五行偏弱时，可以通过环境、习惯、学习和人际选择逐步补足。` : `此五行相对中和，适合作为稳定支撑，不宜刻意过度强化。`
  }));

  const tenGods = tenGodOrder.map((name, index) => ({
    name,
    value: result.tenGods[name] ?? (8 + ((seed + index * 11) % 18)),
    ...tenGodCopy[name]
  }));

  const luckCycles = result.dayun.slice(0, 8).map((stage, index) => ({
    ...stage,
    age: `${3 + index * 10}岁起`,
    years: `${3 + index * 10}-${12 + index * 10}岁`,
    element: cycleElements[(seed + index) % cycleElements.length],
    careerTrend: `事业上倾向于${pick(["打基础", "寻找方向", "形成专业标签", "承担更大责任", "转换赛道", "整合资源", "沉淀经验", "稳定输出"], seed, index)}，适合把阶段目标拆小执行。`,
    wealthTrend: `财运上更适合${pick(["稳住现金流", "学习理财规则", "尝试副业模型", "控制合作风险", "优化资产结构", "减少冲动消费"], seed, index)}，不宜只凭情绪做决定。`,
    relationshipTrend: `感情上容易围绕${pick(["安全感", "沟通方式", "承诺边界", "家庭责任", "距离变化", "相处节奏"], seed, index)}展开，需要多做确认。`,
    healthReminder: `健康方面重点关注${pick(["睡眠", "脾胃节奏", "情绪压力", "肩颈疲劳", "运动恢复", "长期作息"], seed, index)}，以稳定习惯为主。`,
    advice: `这一阶段综合建议是先看主线，再看机会。机会出现时可以积极推进，但要保留复盘空间，避免一口气把节奏拉得太满。`
  }));

  const yearlyFortune = Array.from({ length: 10 }, (_, index) => {
    const year = 2026 + index;
    const gan = stems[(seed + index) % stems.length];
    const zhi = branches[(seed + index * 2) % branches.length];
    return {
      year,
      ganzhi: `${gan}${zhi}`,
      keyword: yearlyKeywords[index],
      careerTrend: `事业方面，${year}年倾向于出现${pick(["岗位职责变化", "项目推进", "贵人协助", "学习升级", "沟通协调", "外部机会"], seed, index)}。适合提前明确目标和优先级。`,
      wealthTrend: `财运方面，本年更适合关注${pick(["现金流", "预算", "副业", "长期储蓄", "合作分账", "投资风险"], seed, index)}，不建议把短期波动当成长期趋势。`,
      relationshipTrend: `感情方面，容易在${pick(["沟通频率", "承诺感", "家庭安排", "情绪表达", "相处边界", "现实规划"], seed, index)}上出现新的课题。温和表达会更有利。`,
      healthReminder: `健康节奏上建议关注${pick(["睡眠质量", "饮食规律", "压力释放", "久坐疲劳", "运动恢复", "情绪稳定"], seed, index)}。`,
      caution: `注意事项：避免${pick(["冲动承诺", "过度透支", "情绪化消费", "忽视合同细节", "拖延重要沟通", "把压力都自己扛"], seed, index)}。`,
      advice: `年度建议：把重点放在可执行的小步骤上，先稳住基本盘，再选择合适窗口推进变化。`
    };
  });

  const threeYearTips = yearlyFortune.slice(0, 3).map((item, index) => ({
    year: item.year,
    title: index === 0 ? "今年重点" : index === 1 ? "明年重点" : "后年重点",
    opportunity: `最值得抓住的机会是${pick(["稳定推进已有项目", "建立新的合作入口", "提升专业证书或技能", "整理现金流和资源", "修复关键关系"], seed, index)}。`,
    risk: `最需要避开的风险是${pick(["过度承诺", "冲动消费", "把关系问题拖太久", "忽视身体提醒", "在信息不足时做大决定"], seed, index)}。`,
    suitable: `适合做的事情：${pick(["复盘职业方向", "优化收入结构", "学习新技能", "修复沟通方式", "建立规律作息"], seed, index)}。`,
    unsuitable: `不适合做的事情：${pick(["盲目扩大投入", "情绪化分手或合作", "频繁改变目标", "长期熬夜硬撑", "只听单一建议"], seed, index)}。`,
    reminder: `一句话提醒：先把节奏稳住，再把机会放大。`
  }));

  const careerExtra = paragraphBoost(reportFocus, "事业财运")
    ? ["因为你选择的测算重点偏向事业财运，本报告会把职业环境、上升阶段、财务结构和风险边界写得更细。事业财运的判断不以单一年份定成败，而是看命盘能否形成稳定能力、持续输出和可复制的收入模型。"]
    : [];
  const relationshipExtra = paragraphBoost(reportFocus, "婚姻感情")
    ? ["因为你选择的测算重点偏向婚姻感情，本报告会更重视表达方式、亲密关系中的安全感、择偶偏好和长期相处。感情分析会保持温和表达，不做极端判断。"]
    : [];
  const healthExtra = paragraphBoost(reportFocus, "健康状态")
    ? ["因为你选择的测算重点偏向健康状态，本报告会更重视五行对应的身心节奏、作息、饮食、运动和情绪压力管理。所有健康内容仅作传统文化与娱乐参考，不作为医学诊断依据。"]
    : [];
  const fortuneExtra = paragraphBoost(reportFocus, "未来运势")
    ? ["因为你选择的测算重点偏向未来运势，本报告会更重视大运、流年和近三年提醒。未来趋势适合用来规划节奏，不适合当作绝对结果。"]
    : [];

  return {
    basicInfo: {
      name: formData.name?.trim() || "未填写",
      gender: genderText,
      solarBirth: `${formData.birthDate} ${formData.birthTime}`,
      lunarBirth: mockLunarDate(formData, seed),
      birthHour: hourBranch(formData.birthTime),
      birthCity: formData.birthCity || "未填写",
      zodiac: zodiacFromYear(birthYear),
      constellation: constellationFromDate(formData.birthDate),
      measuredAt,
      reportFocus
    },
    pillars,
    fiveElements: {
      items: fiveItems,
      dominant,
      weak,
      balance: dominant === weak ? "五行相对均衡" : `${dominant}偏旺，${weak}偏弱，整体不算完全平均，需要看喜用方向调节。`,
      favorable: weak,
      unfavorable: dominant,
      analysis: [
        {
          title: "命盘现象",
          paragraphs: [`本盘五行分布显示，${dominant}相对更突出，${weak}相对不足。五行旺衰不是简单地说多就好、少就坏，而是看能量能否流通，能否服务于日主和现实目标。`]
        },
        {
          title: "性格表现",
          paragraphs: [`${dominant}偏旺的一面会让命主在相关领域更有惯性，比如做事方式、表达节奏、判断标准或安全感来源更明显；${weak}不足的一面，则容易成为需要训练的能力。`]
        },
        {
          title: "现实影响",
          paragraphs: [`现实中，这种组合容易表现为优势突出但节奏不一定平均。适合先用强项建立基本盘，再通过学习、人际、环境和时间管理补足弱项。`]
        },
        {
          title: "调整建议",
          paragraphs: [`建议把喜用方向${weak}转化为具体行动，例如选择更匹配的工作环境、培养稳定习惯、调整沟通方式、优化作息和学习路径。忌讳方向${dominant}不是不能用，而是不宜长期过量。`]
        }
      ]
    },
    dayMaster: {
      name: result.dayMaster,
      strength: overallStrength,
      personalityBase: `日主${result.dayMaster}代表命主的核心气质、选择方式和面对压力时的本能反应。当前判断为${overallStrength}，说明命主在自我驱动力、资源承载和外部支持之间需要找到平衡。`,
      why: [
        `从五行比例看，命盘中${dominant}力量较突出，会强化某些行为惯性。`,
        `从四柱位置看，日柱需要结合月柱和时柱判断，不能只凭日主两个字下结论。`,
        `从十神分布看，${topTenGodsNames(tenGods)}较明显，会影响事业选择、财富模式和关系互动。`
      ],
      needs: [`需要更多${weak}方向的补充，例如更稳定的节奏、更清晰的支持系统、更适合的环境或更有弹性的沟通方式。`],
      avoid: [`需要避免把${dominant}方向用到过度，例如过度控制、过度消耗、单一路径依赖或在压力下做太快决定。`],
      impacts: [
        { title: "对事业的影响", paragraphs: [`事业上日主${overallStrength}的人需要找到既能发挥优势、又不会长期透支的岗位。更适合用长期积累建立可信度，而不是只依赖短期冲刺。`] },
        { title: "对感情的影响", paragraphs: [`感情上容易把自己的节奏带入关系。若能把需求讲清楚，减少猜测和试探，亲密关系会更稳定。`] },
        { title: "对财运的影响", paragraphs: [`财运上需要先看赚钱方式是否匹配日主承载力。适合稳住现金流，再考虑副业、投资和资源扩展。`] }
      ]
    },
    tenGods,
    personality: [
      { title: "性格优势", paragraphs: [`命主的优势在于能把目标逐步落地，不容易只停留在想法层面。遇到明确任务时，往往能通过持续执行积累成果。`, `另一个优势是对现实反馈比较敏感，能够根据环境变化调整策略。只要方向清晰，长期稳定性会比短期爆发更值得期待。`] },
      { title: "内在压力", paragraphs: [`内在压力多来自对结果的要求、对安全感的追求，以及不希望让重要关系失望的心理。`, `当外部评价和内在标准冲突时，容易出现一边想前进、一边担心风险的拉扯。此时更需要拆解目标，而不是一次性做重大决定。`] },
      { title: "做事方式", paragraphs: [`做事方式倾向先观察再行动，适合有步骤、有反馈、有复盘的路径。`, `如果环境太混乱，命主容易消耗在协调和判断上；如果规则清楚，反而能更好地发挥执行力和稳定性。`] },
      { title: "人际关系", paragraphs: [`人际上重视真实、稳定和边界，不太喜欢长期处在不确定或过度消耗的关系里。`, `容易吸引需要你提供建议、支持或稳定感的人，但也要注意不要把别人的问题都变成自己的责任。`] },
      { title: "情绪模式", paragraphs: [`情绪上容易把压力先压下来，等积累到一定程度才集中爆发或突然想逃离。`, `适合建立固定的情绪出口，比如运动、记录、沟通和定期休息，不要只靠硬撑维持表面稳定。`] },
      { title: "决策风格", paragraphs: [`决策时会在现实可行性和内心期待之间反复衡量。优点是谨慎，缺点是容易错过窗口。`, `建议遇到重要选择时，先列出可承受风险，再决定投入程度。只要边界清楚，行动会更轻松。`] },
      { title: "容易被误解的地方", paragraphs: [`别人可能会觉得你慢热、保守或想太多，但这并不代表没有能力，而是需要足够确定后才愿意投入。`, `当你沉默时，外界不一定知道你正在分析。重要关系里要主动表达，不然容易让对方误会你冷淡。`] },
      { title: "适合提升的方向", paragraphs: [`适合提升表达效率、资源整合和主动争取机会的能力。很多时候不是没有机会，而是你需要更清楚地展示自己。`, `同时也适合训练长期节奏管理，让工作、财富、关系和健康不要彼此挤压。`] }
    ],
    career: [
      { title: "命盘倾向", paragraphs: [`事业上，此盘更适合在目标清晰、规则明确、能长期积累的环境中发展。命主不一定适合每天都剧烈变化的工作节奏，但适合承担需要耐心、责任和专业沉淀的任务。`, `从十神和五行结构看，事业发展不是靠单次爆发，而是靠稳定输出、专业标签、可信口碑和阶段性机会共同推动。${careerExtra.join("")}`] },
      { title: "现实表现", paragraphs: [`在现实工作中，命主容易表现为愿意把事情做完整、对结果负责、重视流程和复盘。适合在团队中承担推进者、协调者、专业执行者或稳定输出者的位置。`, `如果工作环境缺少标准、频繁变动或权责不清，容易让命主产生疲劳感。相反，在边界清楚、评价标准明确的环境中，更容易发挥优势。`] },
      { title: "机会点", paragraphs: [`机会点在于把经验沉淀成方法，把方法变成可复制成果。适合关注专业证书、管理能力、项目经验、客户口碑、内容输出和长期资源积累。`, `若大运流年引动官星、印星或食伤，容易出现晋升、学习升级、项目曝光、贵人协助或职业方向重新定位的机会。`] },
      { title: "风险点", paragraphs: [`事业风险主要在于过度求稳、害怕犯错、长期压抑表达，或在压力大时突然想彻底推翻原有方向。`, `也要注意与领导和同事之间的沟通方式。你不需要讨好所有人，但需要把需求、边界和结果讲清楚。`] },
      { title: "行动建议", paragraphs: [`建议把事业规划拆成三层：短期先稳住当前职责，中期建立专业标签，长期形成可迁移能力。这样即使行业变化，也能保留选择权。`, `如果考虑创业，更适合先从副业、小项目、咨询服务、内容产品或熟人资源验证开始，不宜一开始就投入过重成本。打工阶段则要主动争取核心项目和可见成果。`] }
    ],
    wealth: [
      { title: "正财情况", paragraphs: [`正财代表稳定收入和现金流。此盘更适合通过稳定工作、长期客户、专业服务和可复购模式积累财富。`, `如果能建立预算、储蓄和阶段目标，财富增长会更稳，不容易因为短期波动影响心态。`] },
      { title: "偏财情况", paragraphs: [`偏财代表机会型收入、人脉资源、副业、项目和投资机会。命主可以关注外部资源，但不适合在信息不足时快速重仓。`, `偏财机会出现时，最好先小规模验证，看合作方、合同、现金流和退出机制是否清楚。`] },
      { title: "赚钱与守财能力", paragraphs: [`赚钱能力更适合走“专业能力加长期信用”的路线，守财能力则取决于是否能控制人情支出、情绪消费和冲动投资。`, `财富不是只看收入，也要看留存率。建议定期复盘收入结构，把固定收入、弹性收入和风险投入分开管理。`] },
      { title: "财富建议", paragraphs: [`未来财富建议是稳住现金流，逐步增加可复制收入，不把全部希望放在单一项目上。`, `需要注意的是，本报告不构成投资建议。涉及投资、贷款、合伙和大额支出时，应结合现实资料和专业意见理性判断。`] }
    ],
    relationship: [
      { title: "感情表达方式", paragraphs: [`感情中命主倾向先观察、再投入，不一定一开始就表达很多，但一旦确认关系，会重视稳定、承诺和现实安排。${relationshipExtra.join("")}`, `这种表达方式的好处是认真，问题是对方可能看不懂你的真实想法。建议在关键节点主动说明感受和需求。`] },
      { title: "择偶偏好", paragraphs: [`择偶上更容易被稳定、有责任感、沟通有边界、生活节奏相对清晰的人吸引。`, `如果对方过度情绪化、长期不确定或承诺模糊，容易让命主缺少安全感，从而进入反复确认的状态。`] },
      { title: "亲密关系优势与问题", paragraphs: [`优势在于愿意为关系投入实际行动，适合经营长期关系。`, `问题在于容易把压力压在心里，或希望对方自动理解自己。真正稳定的关系，需要把期待说出来，而不是靠猜。`] },
      { title: "感情建议", paragraphs: [`建议建立固定沟通方式，尤其在钱、时间、家庭责任和未来规划上提前说清楚。`, `感情分析不做“一定离婚”“必定二婚”等判断。更重要的是看相处模式是否能被调整，双方是否愿意共同承担现实问题。`] }
    ],
    health: [
      { title: "身心状态", paragraphs: [`健康与生活习惯部分主要从五行节奏和压力模式做文化参考。${healthExtra.join("")}`, `偏旺的五行代表容易过度使用的状态，偏弱的五行代表更需要保护和训练的方向。`] },
      { title: "疲劳与压力来源", paragraphs: [`容易疲劳的方向多与长期紧绷、责任压力、情绪压抑或作息不规律有关。`, `当事业、财富和关系问题同时堆叠时，身体往往会先提醒你需要降低节奏。`] },
      { title: "作息饮食运动建议", paragraphs: [`作息上建议固定睡眠时间，减少长期熬夜。饮食上以规律、清淡、不过度刺激为主。`, `运动上适合选择能长期坚持的方式，比如快走、拉伸、力量训练、瑜伽或游泳，不必追求短期强度。`] },
      { title: "免责声明", paragraphs: [`本内容仅作传统文化与娱乐参考，不作为医学诊断依据。若有具体身体不适，应及时咨询专业医生。`] }
    ],
    luckCycles,
    yearlyFortune,
    threeYearTips,
    conclusion: [
      { title: "命局总体特点", paragraphs: [`本命盘总体特点是${dominant}较突出、${weak}需要补足，日主${overallStrength}，十神结构以${topTenGodsNames(tenGods)}为重点。整体更适合稳中推进，靠长期积累获得确定性。`] },
      { title: "当前人生阶段重点", paragraphs: [`当前阶段适合把目标做清晰，减少无效消耗。事业上关注可积累能力，财运上关注现金流和风险边界，感情上关注沟通与承诺，健康上关注作息和压力管理。${fortuneExtra.join("")}`] },
      { title: "未来三年建议", paragraphs: [`未来三年建议先稳基本盘，再逐步扩大机会。遇到好机会可以积极，但不宜脱离现实条件盲目推进。`] },
      { title: "一句话总结", paragraphs: [`你的命盘更适合“稳住节奏，建立专业，谨慎扩张，把长期优势慢慢做出来”。`] }
    ],
    deepGuide: {
      middle: "当前为基础版测算报告，已包含命盘、五行、性格、事业、财运、感情、大运与流年基础分析。如需查看更细的婚姻年份、事业转折点、财富机会点，可解锁深度版报告。",
      bottom: "深度版可继续展开婚姻年份、事业转折点、财富机会点、合婚细节、未来十年逐年提醒和个人行动清单，适合想保存完整报告或做长期规划的用户。",
      buttons: ["解锁深度报告", "获取专属分析", "查看完整流年详解"]
    },
    disclaimer: "本测算内容基于传统命理文化与数据模型生成，仅供娱乐和文化参考，不构成现实决策、投资建议或医学诊断依据。请理性看待结果。"
  };
}

function elementMetaShort(name: string) {
  const map: Record<string, string> = {
    金: "规则、效率、边界和判断",
    木: "成长、规划、学习和创造",
    水: "沟通、信息、流动和应变",
    火: "表达、热度、传播和可见度",
    土: "稳定、承载、执行和现实感"
  };
  return map[name] ?? "现实选择";
}

function topTenGodsNames(tenGods: BaziReport["tenGods"]) {
  return [...tenGods].sort((a, b) => b.value - a.value).slice(0, 3).map((item) => item.name).join("、");
}
