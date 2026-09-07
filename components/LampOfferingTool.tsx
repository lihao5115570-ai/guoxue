"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { PaymentModal } from "@/components/PaymentModal";
import type { CreateOrderInput, OfferingReceipt as PaidOfferingReceipt, PublicOrder } from "@/lib/payment/types";

type LampPrayer = {
  title: string;
  body: string;
  summary: string;
  actions: string[];
};

type LampOrderData = {
  prayerText: string;
  lampDirection: string;
  targetPerson: string;
  amount: number;
  customMessage: string;
  createdAt: string;
  orderId: string;
  status: "paid";
};

type LampReceipt = {
  orderId: string;
  targetPerson: string;
  lampDirection: string;
  amount: number;
  prayerSummary: string;
  createdAt: string;
  status: "已供灯";
};

const lampDirections = ["平安光明", "健康安稳", "学业智慧", "事业顺遂", "姻缘和合", "家宅清宁"];
const amountOptions = [6.6, 15.6, 66.6];
const LAMP_SUCCESS_VIDEO_SRC = "/brand-assets/lamp-offering-success.mp4";

const directionCopy: Record<string, { title: string; body: string; actions: string[] }> = {
  平安光明: {
    title: "愿心灯长明，所行平安",
    body: "愿这一盏灯照见前路，也照见心中安稳。愿所念之人行路有护，出入平安，遇事少些慌乱，多些从容；愿日常里的小烦恼慢慢散去，心里有光，脚下有路。",
    actions: ["今天少说一句急话", "出门前向家人报一声平安", "把一件悬着的小事妥善收尾"]
  },
  健康安稳: {
    title: "愿灯火温和，身心康宁",
    body: "愿灯前一念，化作安稳的陪伴。愿身体慢慢恢复力量，饮食有节，睡眠安宁，心中少些牵挂；也愿照顾他人的人不忘照顾自己，在平常日子里得一份宽慰。",
    actions: ["提醒对方按时休息与饮水", "少用焦急催促，多用温和陪伴", "重要健康问题优先听从医生建议"]
  },
  学业智慧: {
    title: "愿智慧开明，学业渐进",
    body: "愿这一盏智慧灯，照亮求学之路。愿读书者心神安定，理解更清楚，记忆更稳当；愿努力有方向，考试有定力，在日复一日的积累中看见自己的成长。",
    actions: ["整理一张今日学习清单", "先完成最重要的一道题", "睡前复盘一个真正学会的知识点"]
  },
  事业顺遂: {
    title: "愿事业有序，行稳致远",
    body: "愿灯火不急不躁，照见事业里的方向。愿所做之事有章法，所遇之人有善缘，重要选择少些冲动，多些判断；也愿辛苦能被看见，能力能被沉淀。",
    actions: ["先处理最关键的一项工作", "重要沟通提前写清楚要点", "机会与风险都留出复盘空间"]
  },
  姻缘和合: {
    title: "愿善缘相惜，言语和合",
    body: "愿一盏灯照见彼此的真心，也照见相处里的分寸。愿有缘之人少些猜疑，多些理解；愿已有关系能在日常琐碎中保持温柔，未至之缘也能自然安放。",
    actions: ["把感谢说出口", "争执时先慢一口气", "不把沉默当作惩罚"]
  },
  家宅清宁: {
    title: "愿家宅清宁，福暖日常",
    body: "愿灯火照入家中，照见平安、和气与团圆。愿长辈安心，孩子顺遂，家人之间多些体谅；愿柴米油盐里少些争执，多些照顾，日子稳稳向前。",
    actions: ["主动问候一位家人", "把家里一个角落整理干净", "把担心说成关心，不说成责备"]
  }
};

function summarize(text: string) {
  const compact = text.replace(/\s+/g, " ").trim();
  return compact.length > 82 ? `${compact.slice(0, 82)}...` : compact;
}

async function createLampOfferingOrder(orderData: Omit<LampOrderData, "orderId" | "status">): Promise<LampOrderData> {
  // TODO: 接入真实支付
  // 微信支付 / 支付宝 / Stripe
  await new Promise((resolve) => window.setTimeout(resolve, 1000));
  return {
    ...orderData,
    orderId: `LAMP${Date.now()}`,
    status: "paid"
  };
}

function generateLampReceipt(order: LampOrderData): LampReceipt {
  return {
    orderId: order.orderId,
    targetPerson: order.targetPerson,
    lampDirection: order.lampDirection,
    amount: order.amount,
    prayerSummary: summarize(order.prayerText),
    createdAt: order.createdAt,
    status: "已供灯"
  };
}

export function LampOfferingTool() {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [direction, setDirection] = useState(lampDirections[0]);
  const [wish, setWish] = useState("");
  const [amount, setAmount] = useState(6.6);
  const [customAmount, setCustomAmount] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [prayer, setPrayer] = useState<LampPrayer | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paying, setPaying] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentPayload, setPaymentPayload] = useState<Omit<CreateOrderInput, "payChannel"> | null>(null);
  const [animationOpen, setAnimationOpen] = useState(false);
  const [receipt, setReceipt] = useState<LampReceipt | null>(null);
  const [order, setOrder] = useState<LampOrderData | null>(null);
  const checkoutRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const receiver = useMemo(() => target.trim() || name.trim() || "所念之人", [name, target]);
  const finalAmount = useMemo(() => {
    const parsed = Number(customAmount);
    return customAmount.trim() && Number.isFinite(parsed) && parsed > 0 ? parsed : amount;
  }, [amount, customAmount]);

  const generateLampPrayer = () => {
    const copy = directionCopy[direction];
    const extra = wish.trim() ? ` 也愿“${wish.trim()}”这份心愿被温柔安放，化作日常里的善意与行动。` : "";
    setPrayer({
      title: copy.title,
      body: `为${receiver}供灯。${copy.body}${extra}`,
      summary: `愿${receiver}${direction.replace("光明", "平安").replace("安稳", "康宁").replace("顺遂", "顺遂安然")}。`,
      actions: copy.actions
    });
    setCheckoutOpen(false);
    setReceipt(null);
    setOrder(null);
  };

  const openCheckout = () => {
    if (!prayer) return;
    setCheckoutOpen(true);
    window.setTimeout(() => checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
  };

  const completeAnimation = (paidOrder: LampOrderData) => {
    timelineRef.current?.kill();
    setReceipt(generateLampReceipt(paidOrder));
  };

  const startLampAnimation = (paidOrder: LampOrderData) => {
    setAnimationOpen(true);
    setReceipt(null);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      window.setTimeout(() => completeAnimation(paidOrder), 0);
      return;
    }

    window.setTimeout(() => {
      const root = animationRef.current;
      if (!root) return;
      const videoShell = root.querySelector(".lamp-success-video-shell");

      gsap.set(videoShell, { autoAlpha: 0, y: 18, scale: 0.96, filter: "brightness(.86)" });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => completeAnimation(paidOrder)
      });

      timeline
        .fromTo(videoShell, { autoAlpha: 0, y: 18, scale: 0.96, filter: "brightness(.86)" }, { autoAlpha: 1, y: 0, scale: 1, filter: "brightness(1)", duration: 0.9 })
        .to(videoShell, { scale: 1.015, filter: "brightness(1.08)", boxShadow: "0 0 70px rgba(214,181,108,.18)", duration: 4.9 })
        .to(videoShell, { autoAlpha: 0.92, scale: 1, duration: 0.5 });

      timelineRef.current = timeline;
    }, 0);
  };

  const confirmPayment = async () => {
    if (!prayer) return;
    const payload: Omit<CreateOrderInput, "payChannel"> = {
      prayerText: `${prayer.title}\n${prayer.body}\n${prayer.summary}`,
      blessingType: direction,
      targetPerson: `为${receiver}供灯`,
      amount: finalAmount,
      customMessage
    };
    setPaymentPayload(payload);
    setCheckoutOpen(false);
    setPaymentOpen(true);
  };

  const handlePaymentPaid = ({ receipt }: { order: PublicOrder; receipt: PaidOfferingReceipt }) => {
    if (!paymentPayload) return;
    const paidOrder: LampOrderData = {
      prayerText: paymentPayload.prayerText,
      lampDirection: paymentPayload.blessingType,
      targetPerson: paymentPayload.targetPerson,
      amount: receipt.amount,
      customMessage: paymentPayload.customMessage,
      createdAt: new Date(receipt.offeringTime).toLocaleString("zh-CN", { hour12: false }),
      orderId: receipt.orderNo,
      status: "paid"
    };
    setOrder(paidOrder);
    setPaymentOpen(false);
    startLampAnimation(paidOrder);
  };

  const skipAnimation = () => {
    if (order) completeAnimation(order);
  };

  const closeAnimation = () => {
    timelineRef.current?.kill();
    setAnimationOpen(false);
  };

  return (
    <div className="grid gap-5">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--paper)]">佛前供灯</h2>
        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">写下供灯对象与心愿，先生成供灯愿文，再进入供灯付款。供灯完成后会点亮心灯动画并生成回执。</p>
      </div>

      <div className="lamp-altar-preview" aria-hidden="true">
        <span className="lamp-flame" />
        <div>
          <strong>灯火将明</strong>
          <p>一念清净，一灯破暗。愿善愿被安放，愿心中有光。</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="field">
          <span>供灯人</span>
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="例如：张先生、李女士" />
        </label>
        <label className="field">
          <span>为谁供灯</span>
          <input value={target} onChange={(event) => setTarget(event.target.value)} placeholder="例如：父母、孩子、伴侣、自己" />
        </label>
      </div>

      <label className="field">
        <span>供灯方向</span>
        <select value={direction} onChange={(event) => setDirection(event.target.value)}>
          {lampDirections.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>供灯心愿</span>
        <textarea value={wish} onChange={(event) => setWish(event.target.value)} placeholder="可写下你想祝愿的名字、愿望或一段牵挂。" rows={5} />
      </label>

      <button className="gold-button justify-center" type="button" onClick={generateLampPrayer}>
        生成供灯愿文
      </button>

      {prayer && (
        <article className="lamp-prayer-preview">
          <span>供灯愿文预览</span>
          <h3>{prayer.title}</h3>
          <p>{prayer.body}</p>
          <blockquote>{prayer.summary}</blockquote>
          <button className="gold-button justify-center" type="button" onClick={openCheckout}>
            前往供灯支付
          </button>
        </article>
      )}

      {checkoutOpen && prayer && (
        <section ref={checkoutRef} className="lamp-checkout-panel">
          <div>
            <span className="text-xs tracking-[0.18em] text-[var(--gold-bright)]">供灯支付</span>
            <h3>确认供灯信息</h3>
            <p>确认信息后进入支付。付款完成后，系统会点亮供灯动画并生成供灯回执。</p>
          </div>
          <div className="lamp-checkout-summary">
            <span>供灯对象：为{receiver}供灯</span>
            <span>供灯方向：{direction}</span>
          </div>
          <div className="lamp-amount-grid">
            {amountOptions.map((item) => (
              <button key={item} className={amount === item && !customAmount ? "selected" : ""} type="button" onClick={() => { setAmount(item); setCustomAmount(""); }}>
                随喜 {item.toFixed(1)} 元
              </button>
            ))}
            <input value={customAmount} onChange={(event) => setCustomAmount(event.target.value)} placeholder="自定义金额" inputMode="decimal" />
          </div>
          <label className="field">
            <span>供灯留言</span>
            <textarea value={customMessage} onChange={(event) => setCustomMessage(event.target.value)} placeholder="可写下你想随回执保存的名字、愿望或祝福。" rows={4} />
          </label>
          <button className="gold-button justify-center" type="button" onClick={confirmPayment} disabled={paying}>
            确认供奉
          </button>
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

      {animationOpen && order && (
        <div className="lamp-animation-overlay">
          <div ref={animationRef} className="lamp-animation-panel">
            {!receipt ? (
              <>
                <button className="offering-preview-skip" type="button" onClick={skipAnimation}>跳过动画</button>
                <div className="lamp-success-video-shell">
                  <video className="lamp-success-video" src={LAMP_SUCCESS_VIDEO_SRC} autoPlay muted playsInline preload="auto" />
                </div>
              </>
            ) : (
              <article className="lamp-receipt-card">
                <span>供灯成功</span>
                <h3>功德回执</h3>
                <dl>
                  <div><dt>供灯编号</dt><dd>{receipt.orderId}</dd></div>
                  <div><dt>供灯对象</dt><dd>{receipt.targetPerson}</dd></div>
                  <div><dt>供灯方向</dt><dd>{receipt.lampDirection}</dd></div>
                  <div><dt>供灯金额</dt><dd>{receipt.amount.toFixed(1)} 元</dd></div>
                  <div><dt>供灯时间</dt><dd>{receipt.createdAt}</dd></div>
                  <div><dt>祈文摘要</dt><dd>{receipt.prayerSummary}</dd></div>
                </dl>
                <p>祈福内容仅作情感寄托与文化体验，请理性看待。</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <button className="ghost-button justify-center" type="button" onClick={() => navigator.clipboard?.writeText(JSON.stringify(receipt, null, 2))}>保存回执</button>
                  <button className="gold-button justify-center" type="button" onClick={closeAnimation}>返回页面</button>
                </div>
              </article>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { createLampOfferingOrder, generateLampReceipt };
