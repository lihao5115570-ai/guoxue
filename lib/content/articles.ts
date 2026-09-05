export type Article = {
  title: string;
  slug: string;
  description: string;
  category: string;
  keywords: string[];
  publishedAt: string;
  content: string[];
  summary?: string;
  relatedTools?: string[];
  relatedArticles?: string[];
};

export type KnowledgeItem = {
  slug: string;
  title: string;
  description: string;
  content?: string[];
};

export const wikiItems: KnowledgeItem[] = [
  { slug: "bazi", title: "八字是什么", description: "四柱、天干地支与命盘的基础结构。", content: ["八字也叫四柱八字，由出生年、月、日、时组成。每一柱包含天干和地支，因此合称八个字。", "八字排盘适合用来观察传统时间符号、五行分布、十神关系和大运流年，不适合作为现实决策的唯一依据。"] },
  { slug: "tiangan-dizhi", title: "天干地支", description: "理解干支如何组成时间符号。", content: ["天干包括甲乙丙丁戊己庚辛壬癸，地支包括子丑寅卯辰巳午未申酉戌亥。", "干支系统可用于纪年、纪月、纪日、纪时，也是八字排盘的基础。"] },
  { slug: "wuxing", title: "五行是什么", description: "木火土金水的关系与平衡。", content: ["五行包括木、火、土、金、水，常用于描述生发、表达、承载、规则和流动等不同状态。", "五行不是简单地越多越好，也不是缺某一行就一定不好，关键要看整体结构是否流通。"] },
  { slug: "shishen", title: "十神是什么", description: "从日主出发看关系结构。", content: ["十神包括比肩、劫财、食神、伤官、正财、偏财、正官、七杀、正印、偏印。", "十神可以帮助理解性格、人际、事业、财富、学习和压力来源。"] },
  { slug: "rizhu", title: "什么是日主", description: "命盘中用于观察自我核心的位置。", content: ["日主是日柱天干，常被视为命盘分析的核心参照。", "分析日主时，需要结合月令、五行旺衰、十神和大运流年，不宜只凭一个字判断。"] },
  { slug: "geju", title: "格局入门", description: "传统命理中的结构观察方式。", content: ["格局是观察命盘组合方式的一种传统方法。", "格局分析更强调整体配合，不是把单个符号孤立解释。"] },
  { slug: "wangshuai", title: "旺衰怎么看", description: "强弱不是好坏，而是能量状态。", content: ["旺衰用于描述某种五行或日主在命局中的力量状态。", "偏旺需要疏导和节制，偏弱需要扶助和补足，具体仍要结合整体命盘。"] },
  { slug: "cai-guan", title: "财官怎么看", description: "财星、官星与事业财富关系。", content: ["财星常用于观察财富、资源和现实经营，官星常用于观察规则、职位和责任。", "财官分析需要结合日主承载力、十神组合和大运流年。"] },
  { slug: "tiaohou", title: "调候是什么", description: "从寒暖燥湿理解命盘环境。", content: ["调候强调命盘所处季节和环境状态，常用来观察寒暖燥湿是否协调。", "调候不是单独定吉凶，而是帮助理解命盘是否需要某种气候式平衡。"] },
  { slug: "tongguan", title: "通关是什么", description: "让相克结构流通起来的方法。", content: ["通关常用于解释两种力量相冲相克时，如何通过第三种力量形成流通。", "现实层面可以理解为找到沟通桥梁、资源连接或行动路径。"] },
  { slug: "mangpai", title: "盲派入门", description: "传统命理流派中的一种观察路径。", content: ["盲派是命理流派之一，重视象法、宫位、组合和现实事件对应。", "学习盲派时应先打好干支、十神、宫位基础，再看具体断法。"] },
  { slug: "xinpai", title: "新派命理", description: "现代命理学习中的整理方式。", content: ["新派命理通常强调规则化、结构化和现代语言表达。", "适合用于工具产品中，把传统概念翻译成普通用户能理解的说明。"] },
  { slug: "xiyongshen", title: "喜用神怎么看", description: "从平衡角度理解取用。", content: ["喜用神需要综合月令、日主强弱、五行旺衰、调候和通关。", "喜用方向更适合落到环境、习惯、职业和行动方式上理解。"] },
  { slug: "dayun", title: "大运是什么", description: "十年阶段与人生节奏。", content: ["大运代表人生中较长周期的阶段变化。", "看大运时，要把十年主题和具体流年结合起来。"] },
  { slug: "liunian", title: "流年是什么", description: "年度变化的观察维度。", content: ["流年代表某一年被触发的主题。", "流年分析适合用于年度规划，不适合当作绝对预言。"] }
];

export const topicItems: KnowledgeItem[] = [
  { slug: "caiyun", title: "财运专题", description: "正财、偏财与财富节奏。" },
  { slug: "shiye", title: "事业专题", description: "职业环境、优势和发展阶段。" },
  { slug: "hunyin", title: "婚姻专题", description: "关系模式与长期相处。" },
  { slug: "zhengyuan", title: "正缘专题", description: "从命盘看亲密关系倾向。" },
  { slug: "taohua", title: "桃花专题", description: "人际吸引力与边界。" },
  { slug: "dayun", title: "大运专题", description: "十年阶段的变化线索。" },
  { slug: "liunian", title: "流年专题", description: "一年内的主题与提醒。" }
];

const coreArticles: Article[] = [
  {
    title: "八字怎么看财运？",
    slug: "bazi-caiyun",
    description: "从正财、偏财、日主和五行平衡理解财富倾向。",
    category: "财运",
    keywords: ["八字财运", "正财", "偏财"],
    publishedAt: "2026-08-20",
    content: [
      "八字看财运，不是简单判断会不会发财，而是观察一个人更适合怎样创造、管理和积累资源。",
      "正财常与稳定收入、规则、持续经营有关；偏财更接近机会、流动性和资源整合。两者都需要结合日主强弱、五行流通和大运阶段来看。",
      "工具会把这些结构做成可视化标签，帮助用户先建立方向感，再回到现实中的行动验证。"
    ]
  },
  {
    title: "五行缺什么是什么意思？",
    slug: "wuxing-que",
    description: "五行缺失不等于一定不好，关键是结构与流通。",
    category: "五行",
    keywords: ["五行", "缺火", "缺金"],
    publishedAt: "2026-08-20",
    content: [
      "五行缺某一项，首先说明命盘中这种符号出现较少，但不能直接推导为吉凶。",
      "更重要的是看它在整体结构中的作用：是否为需要补足的环节，是否被其他元素替代，是否会在大运流年中出现。",
      "因此，五行分析适合用比例图和结构说明一起呈现，避免孤立解读。"
    ]
  }
];

const seoArticleSeeds = [
  ["八字排盘入门：四柱、日主和十神怎么看", "bazi-paipan", "八字命理", "从四柱八字、日主、十神和五行分布理解八字排盘的基础结构。", ["八字排盘", "四柱八字", "日主", "十神"], ["/bazi", "/wiki/bazi"]],
  ["八字怎么看事业运：官杀、印星与食伤的关系", "bazi-shiye-yun", "事业财运", "整理八字看事业运时常见的官杀、印星、食伤和大运流年参考。", ["八字事业运", "官杀", "印星", "食伤"], ["/bazi", "/wealth"]],
  ["八字怎么看婚姻感情：夫妻宫与相处模式", "bazi-hunyin-ganqing", "感情姻缘", "用温和方式理解夫妻宫、桃花、正缘和长期关系中的沟通节奏。", ["八字婚姻", "夫妻宫", "正缘", "桃花"], ["/bazi", "/love", "/marriage"]],
  ["五行查询入门：金木水火土分别代表什么", "wuxing-chaxun", "五行知识", "解释金木水火土的象意、强弱、平衡和生活中的理解方式。", ["五行查询", "金木水火土", "五行平衡"], ["/wuxing", "/bazi"]],
  ["五行缺火怎么办：性格表现与调整建议", "wuxing-que-huo", "五行知识", "从传统文化角度理解五行缺火的表现、影响和日常调整方向。", ["五行缺火", "缺火怎么办", "五行调整"], ["/wuxing", "/bazi"]],
  ["五行缺金怎么看：规则感、执行力与财务边界", "wuxing-que-jin", "五行知识", "五行缺金不等于不好，可从规则、决断、财务边界和习惯建立来理解。", ["五行缺金", "缺金", "五行命理"], ["/wuxing", "/bazi"]],
  ["2026流年运势怎么看：年度关键词与行动建议", "2026-liunian-yunshi", "流年运势", "以流年干支、年度关键词、事业财运感情健康四个角度理解一年节奏。", ["2026流年运势", "流年", "年度运势"], ["/fortune", "/calendar"]],
  ["大运是什么意思：十年阶段如何影响人生节奏", "dayun-shi-nian", "流年运势", "介绍大运的十年阶段、起运年龄、流年触发和现实规划价值。", ["大运", "十年大运", "起运年龄"], ["/bazi", "/fortune"]],
  ["正财和偏财有什么区别：收入模式与风险边界", "zhengcai-piancai", "事业财运", "说明正财偏财在八字财运分析中的差异、适合的赚钱方式和风险提醒。", ["正财", "偏财", "八字财运"], ["/wealth", "/bazi"]],
  ["八字合婚怎么看：不只看生肖属相", "bazi-hehun", "八字合婚", "合婚应综合日主、五行、夫妻宫、沟通模式和现实相处，不只看生肖。", ["八字合婚", "生肖配对", "夫妻宫"], ["/marriage", "/love"]],
  ["起名要看什么：音义、寓意与五行参考", "qiming-wenhua", "起名文化", "宝宝起名可从读音、字义、书写、寓意和五行参考多角度综合考虑。", ["宝宝起名", "起名文化", "五行起名"], ["/baby-name"]],
  ["六爻占卜入门：本卦、变卦和动爻是什么", "liuyao-rumen", "六爻占卜", "介绍六爻起卦中的本卦、变卦、动爻、世应和理性使用边界。", ["六爻占卜", "本卦", "变卦", "动爻"], ["/divination"]],
  ["求灵签前怎么提问：让问题更清楚", "lingqian-tiwen", "六爻占卜", "求签前建议把问题写具体，区分事业、感情、财运、人际和选择类问题。", ["求灵签", "在线抽签", "签文解读"], ["/lingqian", "/divination"]],
  ["今日黄历怎么看：宜忌、节气和干支日", "huangli-yiji", "黄历节气", "解释黄历中的宜忌、节气、农历、干支日和日常参考方式。", ["今日黄历", "黄历宜忌", "节气"], ["/calendar"]],
  ["搬家入宅怎么选日子：黄历参考与现实准备", "banjia-ruzhai-jiri", "黄历节气", "搬家择日可参考黄历，也要结合天气、交通、家庭安排和现实条件。", ["搬家吉日", "入宅吉日", "黄道吉日"], ["/calendar"]],
  ["周公解梦怎么用：梦境关键词与情绪线索", "zhougong-jiemeng", "周公解梦", "解梦不宜绝对化，可从梦境关键词、情绪压力和当下经历一起理解。", ["周公解梦", "梦境解析", "解梦"], ["/dream"]],
  ["梦见水是什么意思：流动、情绪与变化", "mengjian-shui", "周公解梦", "梦见水可从情绪流动、关系变化、压力释放和生活节奏角度参考。", ["梦见水", "解梦水", "梦境"], ["/dream"]],
  ["佛前供灯是什么意思：一盏灯里的光明与善愿", "foqian-gongdeng", "佛前供灯", "佛前供灯常以灯火象征光明、智慧、善念和平安，适合写下温和庄重的祈愿。", ["佛前供灯", "线上供灯", "光明灯"], ["/face-palm", "/pray"]],
  ["线上供灯愿文怎么写：供灯对象、愿望和回向", "gongdeng-yuanwen", "佛前供灯", "线上供灯愿文可从供灯对象、供灯方向、祝愿正文和日常善行四个层次展开。", ["供灯愿文", "供灯祈福", "平安灯"], ["/face-palm"]],
  ["为家人祈福怎么写：愿文结构与善愿表达", "wei-jiaren-qifu", "佛学文化", "为家人祈福可从称呼、愿望、感恩、回向和日常行动五个层次书写。", ["为家人祈福", "祈福文", "佛家祈福"], ["/pray"]],
  ["静心禅坐入门：呼吸、坐姿与日常练习", "jingxin-chanzuo", "禅修静心", "静心禅坐不追求神秘体验，重在呼吸、坐姿、觉察和稳定日常节奏。", ["静心禅坐", "禅修", "呼吸练习"], ["/meditation"]],
  ["佛学文化里的因缘观：关系与选择如何理解", "fojiao-yinyuan", "佛学文化", "因缘观帮助人用更宽的视角理解关系、选择、变化和行动责任。", ["佛学文化", "因缘", "东方文化"], ["/pray", "/meditation"]],
  ["命理百科怎么学：天干地支、五行和十神顺序", "mingli-baike-xuexi", "命理百科", "命理入门建议按天干地支、五行、十神、四柱、大运流年逐步学习。", ["命理百科", "天干地支", "十神"], ["/wiki", "/bazi"]],
  ["什么是日主：八字分析为什么围绕日主展开", "rizhu-fenxi", "八字命理", "日主是八字分析中的核心参照，用于理解自我底色、承载力和关系结构。", ["日主", "日主强弱", "八字分析"], ["/bazi", "/wiki/rizhu"]],
  ["十神详解：正官、七杀、正财、偏财都代表什么", "shishen-xiangjie", "八字命理", "用普通语言解释十神含义，以及它们和性格、事业、财运、关系的联系。", ["十神", "正官", "七杀", "正财", "偏财"], ["/bazi", "/wiki/shishen"]],
  ["喜用神怎么理解：不是简单缺什么补什么", "xiyongshen-zenme-kan", "八字命理", "喜用神需要结合月令、日主强弱、五行流通和调候，不是机械补缺。", ["喜用神", "用神分析", "五行平衡"], ["/bazi", "/wuxing"]],
  ["桃花运是什么意思：吸引力、人际与边界", "taohua-yun", "感情姻缘", "桃花运可理解为人际吸引力和关系机会，也需要边界与沟通能力配合。", ["桃花运", "感情运", "姻缘"], ["/love", "/bazi"]],
  ["事业财运如何一起看：能力、资源与阶段", "shiye-caiyun-jieduan", "事业财运", "事业和财运常互相影响，适合从能力沉淀、资源整合和阶段节奏综合看。", ["事业财运", "职业发展", "财富机会"], ["/wealth", "/fortune"]],
  ["黄道吉日和普通日子有什么区别", "huangdao-jiri-chabie", "黄历节气", "黄道吉日是传统择日参考，现实中仍需结合事项类型、时间成本和个人安排。", ["黄道吉日", "择日", "黄历"], ["/calendar"]],
  ["东方命理工具怎么理性使用", "mingli-gongju-lixing", "命理百科", "把命理工具当作传统文化和自我观察参考，避免绝对化判断和恐吓式理解。", ["命理工具", "理性使用", "传统文化"], ["/bazi", "/divination", "/calendar"]]
] as const;

const generatedArticles: Article[] = seoArticleSeeds.map(([title, slug, category, description, keywords, relatedTools], index) => ({
  title,
  slug,
  description,
  category,
  keywords: [...keywords],
  relatedTools: [...relatedTools],
  relatedArticles: seoArticleSeeds
    .filter((item) => item[2] === category && item[1] !== slug)
    .slice(0, 3)
    .map((item) => item[1]),
  publishedAt: `2026-08-${String(1 + (index % 26)).padStart(2, "0")}`,
  summary: description,
  content: [
    description,
    `这篇内容属于「${category}」分类，适合先从基础概念读起，再进入相关工具查看自己的结构化参考结果。页面会把术语、生活场景和可执行建议拆开说明，避免把传统文化内容说得过于绝对。`,
    "后续正文会继续补充概念解释、原理背景、常见情况、不同类型、示例、误区、建议与常见问答。当前版本先提供清晰标题、独立页面、关键词、摘要和相关工具入口，让读者能沿着同一主题继续阅读。"
  ]
}));

export const articles: Article[] = [...coreArticles, ...generatedArticles];

export function findArticle(slug: string) {
  return articles.find((article) => article.slug === slug) ?? articles[0];
}
