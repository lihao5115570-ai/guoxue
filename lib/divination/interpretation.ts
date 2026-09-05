import type { HexagramResult, Interpretation } from "./types";

export function generateDivinationInterpretation(result: HexagramResult): Interpretation {
  const hasChange = result.changingLines.length > 0;
  return {
    current: `本卦为${result.originalHexagram}，更适合把它看作当下关系和处境的切面，而不是一句确定结论。`,
    tension: `主要矛盾在于问题中的期待与现实节奏还没有完全对齐，需要先分清什么能立刻行动，什么仍需观察。`,
    support: `有利因素来自清晰表达、稳定推进和小步验证。${result.upperTrigram}在上，提示你保留全局视角；${result.lowerTrigram}在下，提示从具体处落手。`,
    caution: `避免把一时情绪当作长期判断，也不要因为急于得到答案而跳过必要的信息确认。`,
    direction: hasChange && result.changedHexagram ? `动爻显示事情有变化空间，可参考变卦${result.changedHexagram}，重点观察接下来一到两次关键反馈。` : "本次无明显动爻，适合先稳住现状，等待信息更完整后再做大决定。",
    advice: "建议把问题拆成一个可以在七天内验证的小行动，用结果校准判断，而不是一次性押注。"
  };
}
