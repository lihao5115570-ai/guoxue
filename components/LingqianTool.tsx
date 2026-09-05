"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { PaymentModal } from "@/components/PaymentModal";
import type { CreateOrderInput, OfferingReceipt as PaidOfferingReceipt, PublicOrder } from "@/lib/payment/types";

type LingqianResult = {
  no: number;
  level: string;
  poem: string;
  title: string;
  summary: string;
  blocks: Array<{ title: string; body: string }>;
  actions: string[];
};

type LampOrder = {
  orderId: string;
  targetPerson: string;
  amount: number;
  createdAt: string;
  status: "mock_paid";
};

const questionTypes = ["事业工作", "财运机会", "感情关系", "家庭人际", "学业考试", "出行搬迁", "其他选择"];
const amounts = [6.6, 15.6, 66.6];
const successVideo = "/brand-assets/lamp-offering-success.mp4";
const drawVideo = "/brand-assets/fortune-stick-divination.mp4";

const signBank = [
  {
    level: "中吉",
    poem: "云开月渐明，行人缓缓程。莫急争前路，守正自逢春。",
    title: "守正待时，缓中见机",
    summary: "此签重在稳住心气，不宜急于求成。眼前事情并非没有机会，只是需要先把条件、关系和节奏理清。"
  },
  {
    level: "上吉",
    poem: "灯前一念定，花发满庭香。贵人从近处，好事在寻常。",
    title: "善缘渐起，近处有助",
    summary: "此签提示可从身边资源入手，贵人未必来自远方，可能是熟人、同事、家人或已有合作关系里的支持。"
  },
  {
    level: "小吉",
    poem: "水浅舟宜慢，风轻帆自安。若能心不躁，转处见平宽。",
    title: "慢行避险，转处见宽",
    summary: "此签提醒先降低急躁，事情仍有转圜空间。越是想立刻见结果，越要检查细节和边界。"
  },
  {
    level: "平稳",
    poem: "山路虽回折，清泉绕石来。凡事留余地，春风自然开。",
    title: "留有余地，关系可和",
    summary: "此签偏向调和。若问关系，重在缓和语气；若问事业，重在保留备选方案，不宜把路走窄。"
  }
];

const typeAdvice: Record<string, string[]> = {
  事业工作: ["先稳住当前交付，再谈新的机会。", "重要沟通要留文字记录，避免口头误会。", "不要因短期情绪立刻换方向。"],
  财运机会: ["先看现金流和风险边界。", "不熟悉的项目不宜重仓投入。", "适合做长期积累，不适合被高收益话术带动。"],
  感情关系: ["先把真实感受说清楚，不用试探代替沟通。", "给彼此一点缓冲，不急着定性关系。", "边界清楚，关系才更容易稳定。"],
  家庭人际: ["少讲道理，多讲感受。", "先处理一个最具体的小矛盾。", "不要把长期积压的问题一次全部翻出。"],
  学业考试: ["先补最薄弱的一项。", "用固定节奏复盘，比临时焦虑更有用。", "考试前减少无效比较。"],
  出行搬迁: ["把时间、路线、预算和备选方案列清楚。", "手续和合同要提前确认。", "不宜赶在情绪最急时做决定。"],
  其他选择: ["把问题拆成可验证的小步骤。", "先确认自己真正想要什么。", "给决定留一个复盘窗口。"]
};

function seededIndex(seed: string, length: number) {
  return Array.from(seed || "禅心阁").reduce((sum, char) => sum + char.charCodeAt(0), 0) % length;
}

async function createLingqianLampOrder(data: Omit<LampOrder, "orderId" | "status">): Promise<LampOrder> {
  // TODO: 接入真实支付
  // 微信支付 / 支付宝 / Stripe
  await new Promise((resolve) => window.setTimeout(resolve, 1000));
  return { ...data, orderId: `LQ-LAMP${Date.now()}`, status: "mock_paid" };
}

export function LingqianTool() {
  const [type, setType] = useState(questionTypes[0]);
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<LingqianResult | null>(null);
  const [pendingResult, setPendingResult] = useState<LingqianResult | null>(null);
  const [drawAnimationOpen, setDrawAnimationOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [amount, setAmount] = useState(6.6);
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [paying, setPaying] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentPayload, setPaymentPayload] = useState<Omit<CreateOrderInput, "payChannel"> | null>(null);
  const [animationOpen, setAnimationOpen] = useState(false);
  const [receipt, setReceipt] = useState<LampOrder | null>(null);
  const animationRef = useRef<HTMLDivElement | null>(null);
  const drawAnimationRef = useRef<HTMLDivElement | null>(null);
  const drawTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const resultRef = useRef<HTMLElement | null>(null);
  const orderRef = useRef<LampOrder | null>(null);

  const finalAmount = useMemo(() => {
    const parsed = Number(customAmount);
    return customAmount.trim() && Number.isFinite(parsed) && parsed > 0 ? parsed : amount;
  }, [amount, customAmount]);

  const castSign = () => {
    const seed = `${type}${question}${status}`;
    const base = signBank[seededIndex(seed, signBank.length)];
    const no = seededIndex(seed + "签号", 100) + 1;
    const advice = typeAdvice[type] ?? typeAdvice.其他选择;
    const nextResult = {
      no,
      ...base,
      blocks: [
        { title: "签文总解", body: `${base.summary} 你问的是“${type}”，更适合把签文当作提醒，而不是把结果当作绝对答案。` },
        { title: "现实处境", body: status.trim() ? `你当前写下的状态是：“${status.trim()}”。这说明问题已经有现实牵引，接下来要先确认事实、成本、关系和可承受范围。` : "当前状态未填写，建议补充已有条件、阻力、你最担心的点，以及目前可以掌握的资源。" },
        { title: "机会与阻力", body: `机会在于事情仍有调整空间，阻力在于心里容易急着要答案。若能先稳住节奏，把问题拆成两三步推进，会更容易看清方向。` },
        { title: "供灯加持", body: "求签让你看见问题，供灯则是把心愿安放下来。可以为自己或相关家人点一盏线上祈福灯，作为郑重面对当下、记录心念与祝福的仪式。" }
      ],
      actions: advice
    };
    setResult(null);
    setPendingResult(nextResult);
    setDrawAnimationOpen(true);
    setCheckoutOpen(false);
    setReceipt(null);
  };

  const revealSignResult = () => {
    if (!pendingResult) return;
    drawTimelineRef.current?.kill();
    setResult(pendingResult);
    setDrawAnimationOpen(false);
    window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
  };

  const startSuccessVideo = (order: LampOrder) => {
    setAnimationOpen(true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setReceipt(order);
      return;
    }
    window.setTimeout(() => {
      const shell = animationRef.current?.querySelector(".lamp-success-video-shell");
      if (!shell) return;
      gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: () => setReceipt(order) })
        .fromTo(shell, { autoAlpha: 0, y: 18, scale: 0.96, filter: "brightness(.86)" }, { autoAlpha: 1, y: 0, scale: 1, filter: "brightness(1)", duration: 0.9 })
        .to(shell, { scale: 1.015, filter: "brightness(1.08)", boxShadow: "0 0 70px rgba(214,181,108,.18)", duration: 4.9 })
        .to(shell, { autoAlpha: 0.92, scale: 1, duration: 0.5 });
    }, 0);
  };

  const confirmLamp = async () => {
    if (!result) return;
    const payload: Omit<CreateOrderInput, "payChannel"> = {
      prayerText: `第 ${result.no} 签 · ${result.title}\n${result.poem}\n${result.summary}`,
      blessingType: "求签供灯加持",
      targetPerson: "求签供灯加持",
      amount: finalAmount,
      customMessage: message
    };
    setPaymentPayload(payload);
    setCheckoutOpen(false);
    setPaymentOpen(true);
  };

  const handlePaymentPaid = ({ receipt }: { order: PublicOrder; receipt: PaidOfferingReceipt }) => {
    const order: LampOrder = {
      targetPerson: receipt.targetPerson,
      amount: receipt.amount,
      createdAt: new Date(receipt.offeringTime).toLocaleString("zh-CN", { hour12: false }),
      orderId: receipt.orderNo,
      status: "mock_paid"
    };
    orderRef.current = order;
    setPaymentOpen(false);
    startSuccessVideo(order);
  };

  const skipAnimation = () => {
    if (orderRef.current) setReceipt(orderRef.current);
  };

  useEffect(() => {
    if (!drawAnimationOpen || !pendingResult) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      revealSignResult();
      return;
    }

    window.setTimeout(() => {
      const root = drawAnimationRef.current;
      if (!root) return;

      const videoShell = root.querySelector(".lingqian-draw-video-shell");
      const seal = root.querySelector(".lingqian-draw-seal");
      const title = root.querySelector(".lingqian-draw-title");
      const particles = root.querySelectorAll(".lingqian-draw-particle");

      gsap.set([videoShell, seal, title], { autoAlpha: 0, y: 18, scale: 0.96 });
      gsap.set(particles, { autoAlpha: 0, y: 20, scale: 0.3 });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: revealSignResult
      });

      timeline
        .to(videoShell, { autoAlpha: 1, y: 0, scale: 1, duration: 0.85, filter: "brightness(1)" })
        .to(seal, { autoAlpha: 1, y: 0, scale: 1, rotate: 0, duration: 0.75 }, "-=0.3")
        .to(title, { autoAlpha: 1, y: 0, scale: 1, duration: 0.65 }, "-=0.35")
        .to(particles, { autoAlpha: 1, y: -42, scale: 1, stagger: 0.045, duration: 1.15 }, "-=0.15")
        .to(videoShell, { scale: 1.012, filter: "brightness(1.08)", boxShadow: "0 0 72px rgba(214,181,108,.2)", duration: 1.25 }, "-=0.65")
        .to([seal, title], { autoAlpha: 0, y: -12, duration: 0.55 }, "-=0.15")
        .to(videoShell, { autoAlpha: 0.88, scale: 1, duration: 0.35 });

      drawTimelineRef.current = timeline;
    }, 0);

    return () => {
      drawTimelineRef.current?.kill();
    };
  }, [drawAnimationOpen, pendingResult]);

  return (
    <div className="grid gap-5">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--paper)]">求一支灵签</h2>
        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">静心写下一个问题，系统会生成签号、签诗、签意解读、现实提醒和行动建议。</p>
      </div>
      <label className="field">
        <span>问题类型</span>
        <select value={type} onChange={(event) => setType(event.target.value)}>
          {questionTypes.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label className="field">
        <span>具体问题</span>
        <textarea value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="例如：我现在是否适合换工作？这段合作应该继续推进吗？" rows={4} />
      </label>
      <label className="field">
        <span>当前状态</span>
        <input value={status} onChange={(event) => setStatus(event.target.value)} placeholder="例如：已经收到 offer，但担心不稳定；或关系正在冷淡。" />
      </label>
      <button className="gold-button justify-center" type="button" onClick={castSign}>静心求签</button>

      {drawAnimationOpen && pendingResult && (
        <div className="lingqian-draw-overlay" role="dialog" aria-modal="true" aria-labelledby="lingqian-draw-title">
          <div className="lingqian-draw-panel" ref={drawAnimationRef}>
            <button className="offering-preview-skip" type="button" onClick={revealSignResult}>跳过动画</button>
            <div className="lingqian-draw-video-shell">
              <video className="lingqian-draw-video" src={drawVideo} autoPlay muted playsInline preload="auto" />
              <span className="lingqian-draw-glow" />
            </div>
            <div className="lingqian-draw-seal">签</div>
            <div className="lingqian-draw-title" id="lingqian-draw-title">
              <span>静心求签</span>
              <strong>第 {pendingResult.no} 签将出</strong>
            </div>
            <div className="lingqian-draw-particles" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, index) => (
                <i className="lingqian-draw-particle" key={index} style={{ left: `${12 + index * 4.5}%` }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {result && (
        <article className="lingqian-result" ref={resultRef}>
          <div className="lingqian-sign-head">
            <span>第 {result.no} 签</span>
            <strong>{result.level}</strong>
          </div>
          <h3>{result.title}</h3>
          <blockquote>{result.poem}</blockquote>
          <div className="lingqian-result-scroll">
            <div className="practice-result-blocks">
              {result.blocks.map((block) => (
                <section className="practice-result-block" key={block.title}>
                  <h4>{block.title}</h4>
                  <p>{block.body}</p>
                </section>
              ))}
              <section className="practice-result-block">
                <h4>今日行动建议</h4>
                <ul>{result.actions.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            </div>
            <div className="lamp-prayer-preview">
              <span>供灯加持</span>
              <h3>把签文里的提醒，安放成一盏灯</h3>
              <p>签文让你看见问题的方向，供灯则把心愿安放下来。若此刻心中仍有牵挂，可以为自己或家人点一盏线上祈福灯，愿心念被记录，也愿接下来的行动更安稳。</p>
              <button className="gold-button justify-center" type="button" onClick={() => setCheckoutOpen(true)}>前往供灯付款</button>
            </div>
          </div>
        </article>
      )}

      {checkoutOpen && result && (
        <section className="lamp-checkout-panel">
          <div>
            <span className="text-xs tracking-[0.18em] text-[var(--gold-bright)]">供灯付款</span>
            <h3>为此签供灯加持</h3>
            <p>当前先使用静态收款码完成支付，后续可接微信支付、支付宝或 Stripe 商户订单接口。付款成功后会播放供灯成功动画。</p>
          </div>
          <div className="lamp-checkout-summary">
            <span>签文：第 {result.no} 签 · {result.level}</span>
            <span>方向：{type}</span>
          </div>
          <div className="lamp-amount-grid">
            {amounts.map((item) => (
              <button key={item} className={amount === item && !customAmount ? "selected" : ""} type="button" onClick={() => { setAmount(item); setCustomAmount(""); }}>随喜 {item.toFixed(1)} 元</button>
            ))}
            <input value={customAmount} onChange={(event) => setCustomAmount(event.target.value)} placeholder="自定义金额" inputMode="decimal" />
          </div>
          <label className="field">
            <span>供灯留言</span>
            <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="可写下你的名字、愿望或祝福。" rows={4} />
          </label>
          <button className="gold-button justify-center" type="button" onClick={confirmLamp} disabled={paying}>确认供奉</button>
          <p className="lamp-compliance">本功能为线上供灯与祝愿表达服务，用于记录心愿、安放心念与保存纪念，不承诺现实结果。</p>
        </section>
      )}

      <PaymentModal
        open={paymentOpen}
        payload={paymentPayload}
        title="选择支付方式"
        onBack={() => {
          setPaymentOpen(false);
          setCheckoutOpen(true);
        }}
        onPaid={handlePaymentPaid}
      />

      {animationOpen && (
        <div className="lamp-animation-overlay">
          <div ref={animationRef} className="lamp-animation-panel">
            {!receipt ? (
              <>
                <button className="offering-preview-skip" type="button" onClick={skipAnimation}>跳过动画</button>
                <div className="lamp-success-video-shell">
                  <video className="lamp-success-video" src={successVideo} autoPlay muted playsInline preload="auto" />
                </div>
              </>
            ) : (
              <article className="lamp-receipt-card">
                <span>供灯成功</span>
                <h3>功德回执</h3>
                <dl>
                  <div><dt>供灯编号</dt><dd>{receipt.orderId}</dd></div>
                  <div><dt>供灯对象</dt><dd>{receipt.targetPerson}</dd></div>
                  <div><dt>供灯金额</dt><dd>{receipt.amount.toFixed(1)} 元</dd></div>
                  <div><dt>供灯时间</dt><dd>{receipt.createdAt}</dd></div>
                  <div><dt>签文摘要</dt><dd>第 {result?.no} 签 · {result?.title}</dd></div>
                </dl>
                <p>供灯内容仅作情感寄托与文化体验，请理性看待。</p>
                <button className="gold-button justify-center" type="button" onClick={() => setAnimationOpen(false)}>返回页面</button>
              </article>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
