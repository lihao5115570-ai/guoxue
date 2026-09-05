import { type PrayerDirection } from "@/lib/pray/constants";

export type PrayerInput = {
  recipient: string;
  direction: PrayerDirection;
  message: string;
};

export type PrayerResult = {
  title: string;
  direction: PrayerDirection;
  templateName: string;
  body: string;
  shortBlessing: string;
  dailyActions: string[];
  disclaimer: string;
};

const templates: Record<PrayerDirection, Array<(input: PrayerInput) => Omit<PrayerResult, "direction" | "disclaimer">>> = {
  身体安康: [
    ({ recipient, message }) => ({
      title: `愿${recipient}身心安康，日日平稳`,
      templateName: "平安灯愿",
      body: `愿这一盏心灯，为${recipient}照见安稳与从容。愿身体慢慢恢复力量，饮食有节，睡眠安宁，心中少些牵挂，多些宽慰。${message ? `也愿这份牵挂被温柔承接：${message}` : "若近日有劳累与不适，愿一切都能循序渐进地好转。"}愿家人之间多一分理解，多一分照看，在平常日子里互相扶持，安稳前行。`,
      shortBlessing: `愿${recipient}身体安康，心中安稳，日有小喜，夜得好眠。`,
      dailyActions: ["提醒对方按时休息与饮水", "少用焦急催促，多用温和陪伴", "重要健康问题优先遵循医生建议"]
    }),
    ({ recipient, message }) => ({
      title: `为${recipient}祈愿少病少忧`,
      templateName: "莲心护念",
      body: `愿清净莲心护念${recipient}，让疲惫渐渐散去，让不安慢慢沉静。愿每一次呼吸都更舒展，每一餐饭都更安稳，每一个夜晚都能睡得踏实。${message ? `你写下的心愿是：${message}` : "愿眼前的小难处被耐心化开，愿身体与心情都得到妥善照顾。"}愿此愿不止停在文字，也化作日常里的关怀、问候与照看。`,
      shortBlessing: `愿${recipient}少病少忧，福气常在，平安相随。`,
      dailyActions: ["安排一次真诚问候", "陪伴处理一件实际小事", "保持规律作息，不把焦虑传给对方"]
    })
  ],
  心情安稳: [
    ({ recipient, message }) => ({
      title: `愿${recipient}心安如水`,
      templateName: "静心愿",
      body: `愿${recipient}在纷扰中保有一处安静。愿焦虑来时能够慢一点，难过来时有人倾听，犹豫来时能看见下一步。${message ? `愿这段心声被看见：${message}` : "愿心里的结慢慢松开，不急着证明，也不急着否定自己。"}愿今日有光，愿夜里有眠，愿每一个平凡时刻都能重新积蓄力量。`,
      shortBlessing: `愿${recipient}心定神安，少忧少惧，温柔有力。`,
      dailyActions: ["给对方一句稳定的回应", "少讲大道理，多听真实感受", "鼓励对方把压力拆成可处理的小事"]
    }),
    ({ recipient, message }) => ({
      title: `为${recipient}祈一份从容`,
      templateName: "月明愿",
      body: `愿月光照见${recipient}心中的疲惫，也照见继续向前的勇气。愿烦乱的念头慢慢沉下去，愿紧绷的心有机会松开。${message ? `这份祈愿也记住了你的牵挂：${message}` : "愿所有暂时想不明白的事，都能在时间里逐渐清晰。"}愿身边人以柔和相待，愿自己也能以慈悲对待自己。`,
      shortBlessing: `愿${recipient}心有安处，所遇皆缓，所行皆稳。`,
      dailyActions: ["邀请对方散步或喝水休息", "避免用责备方式催促改变", "睡前减少争论和信息刺激"]
    })
  ],
  学业顺利: [
    ({ recipient, message }) => ({
      title: `愿${recipient}学业稳进，心有光明`,
      templateName: "文昌愿",
      body: `愿${recipient}读书有耐心，临事不慌张。愿该记住的慢慢记住，该理解的逐渐明白，遇到难题时不轻易否定自己。${message ? `也愿这份期待被温和承接：${message}` : "愿学习过程有清晰计划，也有足够休息。"}愿努力有方向，愿考试或挑战前心神稳定，把平日积累自然发挥出来。`,
      shortBlessing: `愿${recipient}学有所成，心稳笔顺，日日精进。`,
      dailyActions: ["把大目标拆成每日任务", "保证睡眠，不用熬夜消耗换安全感", "多鼓励过程，少只盯结果"]
    }),
    ({ recipient, message }) => ({
      title: `为${recipient}祈愿聪慧勤勉`,
      templateName: "书灯愿",
      body: `愿一盏书灯照亮${recipient}眼前的路。愿学习时能专注，休息时能放松，面对比较时能守住自己的节奏。${message ? `你写下的心愿是：${message}` : "愿每一次练习都有收获，每一次复盘都更接近答案。"}愿知识慢慢沉淀为底气，愿勤勉不变成压力，愿成长自有花开时。`,
      shortBlessing: `愿${recipient}聪慧安定，步步有进，所学有成。`,
      dailyActions: ["建立固定复习时间", "错题只做复盘，不做自责", "考试前先稳定作息和心态"]
    })
  ],
  事业平稳: [
    ({ recipient, message }) => ({
      title: `愿${recipient}事业平稳，行事有依`,
      templateName: "稳行愿",
      body: `愿${recipient}在工作中稳住心气，遇事能看清轻重缓急，做选择时不被一时焦虑牵着走。${message ? `这份心愿也包含你的牵挂：${message}` : "愿眼前的任务有条理，关系有分寸，机会有准备。"}愿努力被看见，合作少些误会，前路虽有起伏，也能一步一步走得踏实。`,
      shortBlessing: `愿${recipient}事业安稳，贵人相助，步履从容。`,
      dailyActions: ["先完成最关键的一件事", "重要沟通留下清晰记录", "遇到变动先评估成本与风险"]
    }),
    ({ recipient, message }) => ({
      title: `为${recipient}祈愿工作顺遂`,
      templateName: "山河愿",
      body: `愿山河稳重之气护持${recipient}，让工作中的压力有处安放，让前行的方向逐渐清楚。${message ? `愿这份期待被妥善照见：${message}` : "愿收入稳定，合作顺畅，选择更有余地。"}愿忙碌不伤身心，愿每一分认真都能化作长久的积累。`,
      shortBlessing: `愿${recipient}工作顺遂，心定事明，稳中有进。`,
      dailyActions: ["明确本周优先级", "减少无效消耗和情绪争执", "重要机会先做资料准备"]
    })
  ],
  家庭和睦: [
    ({ recipient, message }) => ({
      title: `愿${recipient}家中和暖，彼此相安`,
      templateName: "和合愿",
      body: `愿一家人说话多些体谅，遇事多些商量，争执时能记得彼此本意并非伤害。${message ? `你写下的牵挂是：${message}` : "愿家中少些冷言，多些照看；少些急躁，多些理解。"}愿平常饭桌有温度，日常相处有余地，家人之间能在细小处互相成全。`,
      shortBlessing: `愿家宅安宁，亲人和睦，日日有暖意。`,
      dailyActions: ["先听完对方一句话再回应", "把指责换成具体请求", "主动完成一件能减轻家人负担的小事"]
    }),
    ({ recipient, message }) => ({
      title: `为${recipient}祈愿家宅安宁`,
      templateName: "家安愿",
      body: `愿${recipient}家中有安宁气象，门内少争执，心里少隔阂。愿长辈被尊重，晚辈被理解，伴侣之间有商量，亲人之间有耐心。${message ? `愿这份心愿慢慢落地：${message}` : "愿旧的不快能被温和化解，新的日子能重新积攒信任。"}愿一家人各自辛苦，也能彼此体谅。`,
      shortBlessing: `愿${recipient}家和人安，福气长存，诸事和顺。`,
      dailyActions: ["安排一次不争对错的沟通", "多表达感谢，少翻旧账", "共同制定一个家庭小计划"]
    })
  ],
  出行平安: [
    ({ recipient, message }) => ({
      title: `愿${recipient}出入平安，往返顺遂`,
      templateName: "行路愿",
      body: `愿${recipient}一路平安，出门有准备，路上少波折，抵达能安心。${message ? `这份出行牵挂也被记下：${message}` : "愿天气、交通、行程都能稳妥配合。"}愿行路之人心不慌，事有序，身边遇到善意与方便，平安归来。`,
      shortBlessing: `愿${recipient}出入平安，路途顺遂，早去安归。`,
      dailyActions: ["提前检查证件、车票和天气", "给家人留下行程信息", "路上不赶急，安全优先"]
    }),
    ({ recipient, message }) => ({
      title: `为${recipient}祈愿旅途安稳`,
      templateName: "归途愿",
      body: `愿清明之光照护${recipient}的去路与归程。愿每一步都稳，每一次转程都顺，每一个陌生环境都能从容应对。${message ? `愿这份心声随行护念：${message}` : "愿旅途有序，身心安定，所遇皆平和。"}愿远行不忘谨慎，归来带着平安与喜悦。`,
      shortBlessing: `愿${recipient}旅途安稳，平安抵达，欢喜归来。`,
      dailyActions: ["出发前确认联系人和应急信息", "避免疲劳驾驶或深夜赶路", "重要物品分开放置"]
    })
  ]
};

function pickTemplate(input: PrayerInput) {
  const list = templates[input.direction] ?? templates["身体安康"];
  const seed = `${input.recipient}${input.direction}${input.message}`.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return list[seed % list.length];
}

export function generatePrayer(input: PrayerInput): PrayerResult {
  const recipient = input.recipient.trim() || "家人";
  const direction = input.direction || "身体安康";
  const message = input.message.trim();
  const normalized: PrayerInput = { recipient, direction, message };
  const template = pickTemplate(normalized)(normalized);

  return {
    ...template,
    direction,
    disclaimer: "本内容基于传统佛学文化与祝福文案模板生成，仅供祈愿、记录与情绪安定参考，不构成医学、投资、法律或现实决策依据。"
  };
}
