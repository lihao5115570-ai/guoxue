"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { PaymentModal } from "@/components/PaymentModal";
import { prayerDirections, type PrayerDirection } from "@/lib/pray/constants";
import { type PrayerResult } from "@/lib/pray/templates";
import type { CreateOrderInput, OfferingReceipt as PaidOfferingReceipt, PublicOrder } from "@/lib/payment/types";

type OfferingData = {
  prayerText: string;
  blessingType: string;
  targetPerson: string;
  amount: number;
  customMessage: string;
  createdAt: string;
};

type OfferingOrder = OfferingData & {
  orderId: string;
  status: "mock_paid";
};

type OfferingReceipt = {
  orderId: string;
  targetPerson: string;
  blessingType: string;
  amount: number;
  prayerSummary: string;
  createdAt: string;
  status: "已供奉";
};

const offeringAmounts = [
  { label: "随喜 6.6 元", value: 6.6 },
  { label: "虔诚 15.6 元", value: 15.6 },
  { label: "圆满 66.6 元", value: 66.6 },
  { label: "自定义金额", value: 0 }
];

const OFFERING_VIDEO_SRC = "/brand-assets/golden-scroll-offering.mp4";

const blessingTypeByDirection: Partial<Record<PrayerDirection, string>> = {
  身体安康: "健康祈愿",
  心情安稳: "平安祈愿",
  学业顺利: "佛缘文化",
  事业平稳: "事业祈愿",
  家庭和睦: "家人祈愿",
  出行平安: "平安祈愿"
};

function summarizePrayer(text: string) {
  const compact = text.replace(/\s+/g, " ").trim();
  return compact.length > 76 ? `${compact.slice(0, 76)}...` : compact;
}

function inferOfferingTarget(recipient: string) {
  const name = recipient.trim();
  return name ? `为${name}祈福` : "为家人祈福";
}

function inferBlessingType(direction: PrayerDirection) {
  return blessingTypeByDirection[direction] ?? "平安祈愿";
}

async function createOfferingOrder(offeringData: OfferingData): Promise<OfferingOrder> {
  // TODO payment integration: 接入真实支付
  // WeChat Pay / Alipay / Stripe
  await new Promise((resolve) => window.setTimeout(resolve, 1000));

  return {
    ...offeringData,
    orderId: `OF${Date.now()}`,
    status: "mock_paid"
  };
}

function generateOfferingReceipt(orderData: OfferingOrder): OfferingReceipt {
  return {
    orderId: orderData.orderId,
    targetPerson: orderData.targetPerson,
    blessingType: orderData.blessingType,
    amount: orderData.amount,
    prayerSummary: summarizePrayer(orderData.prayerText),
    createdAt: orderData.createdAt,
    status: "已供奉"
  };
}

export function PrayGenerator() {
  const [recipient, setRecipient] = useState("");
  const [direction, setDirection] = useState<PrayerDirection>("身体安康");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<PrayerResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [offeringModalOpen, setOfferingModalOpen] = useState(false);
  const [modalIntroDone, setModalIntroDone] = useState(false);
  const [animationOpen, setAnimationOpen] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [offeringLoading, setOfferingLoading] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentPayload, setPaymentPayload] = useState<Omit<CreateOrderInput, "payChannel"> | null>(null);
  const [amount, setAmount] = useState(6.6);
  const [customAmount, setCustomAmount] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [orderData, setOrderData] = useState<OfferingOrder | null>(null);
  const [receipt, setReceipt] = useState<OfferingReceipt | null>(null);
  const modalPreviewRef = useRef<HTMLDivElement | null>(null);
  const animationRootRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const modalTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const prayerText = useMemo(() => {
    if (!result) return "";
    return `${result.title}\n${result.body}\n${result.shortBlessing}`;
  }, [result]);
  const modalPrayerSummary = useMemo(() => {
    if (!result) return "";
    return summarizePrayer(`${result.body}\n${result.shortBlessing}`);
  }, [result]);
  const inferredTargetPerson = useMemo(() => inferOfferingTarget(recipient), [recipient]);
  const inferredBlessingType = useMemo(() => inferBlessingType(direction), [direction]);

  async function handleSubmit() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/pray", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient, direction, message })
      });

      if (!response.ok) {
        throw new Error("生成失败，请稍后再试。");
      }

      const data = (await response.json()) as { result: PrayerResult };
      setResult(data.result);
      setReceipt(null);
      setOrderData(null);
      setAnimationDone(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败，请稍后再试。");
    } finally {
      setLoading(false);
    }
  }

  function openOfferingModal() {
    if (!result) return;
    setModalIntroDone(false);
    setOfferingModalOpen(true);
  }

  function closeOfferingModal() {
    modalTimelineRef.current?.kill();
    setOfferingModalOpen(false);
    setModalIntroDone(false);
    setOfferingLoading(false);
  }

  function completeOfferingAnimation(order: OfferingOrder) {
    timelineRef.current?.kill();
    setReceipt(generateOfferingReceipt(order));
    setAnimationDone(true);
  }

  function startOfferingAnimation(order: OfferingOrder, text: string) {
    setOrderData(order);
    setReceipt(null);
    setAnimationDone(false);
    setAnimationOpen(true);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      window.setTimeout(() => completeOfferingAnimation(order), 0);
      return;
    }

    window.setTimeout(() => {
      const root = animationRootRef.current;
      if (!root) return;

      const videoShell = root.querySelector(".offering-video-shell");
      const caption = root.querySelector(".offering-video-status");
      const summary = root.querySelector(".offering-animation-summary");
      const done = root.querySelector(".offering-done");

      gsap.set(done, { autoAlpha: 0, y: 18, scale: 0.96 });
      gsap.set([caption, summary], { autoAlpha: 0, y: 18 });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => completeOfferingAnimation(order)
      });

      timeline
        .fromTo(videoShell, { autoAlpha: 0, y: 22, scale: 0.96, filter: "brightness(.78)" }, { autoAlpha: 1, y: 0, scale: 1, filter: "brightness(1)", duration: 1.15 })
        .to([caption, summary], { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.08 }, "-=0.45")
        .to(videoShell, { scale: 1.018, filter: "brightness(1.12)", boxShadow: "0 0 58px rgba(214,181,108,.22)", duration: 2.3 }, "-=0.2")
        .to([caption, summary], { autoAlpha: 0.62, y: -8, duration: 0.8 }, "-=0.65")
        .to(done, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 }, "-=0.2")
        .to({}, { duration: 0.8 });

      timelineRef.current = timeline;
    }, 0);
  }

  async function handleOfferingConfirm() {
    if (!result || !prayerText) return;

    const finalAmount = amount === 0 ? Number(customAmount || 0) : amount;
    const offeringData: Omit<CreateOrderInput, "payChannel"> = {
      prayerText,
      blessingType: inferredBlessingType,
      targetPerson: inferredTargetPerson,
      amount: Number.isFinite(finalAmount) && finalAmount > 0 ? finalAmount : 6.6,
      customMessage
    };

    setPaymentPayload(offeringData);
    closeOfferingModal();
    setPaymentOpen(true);
  }

  function handlePaymentPaid({ receipt }: { order: PublicOrder; receipt: PaidOfferingReceipt }) {
    if (!paymentPayload) return;
    const order: OfferingOrder = {
      ...paymentPayload,
      createdAt: new Date(receipt.offeringTime).toLocaleString("zh-CN", { hour12: false }),
      orderId: receipt.orderNo,
      status: "mock_paid"
    };
    setPaymentOpen(false);
    startOfferingAnimation(order, paymentPayload.prayerText);
  }

  function skipOfferingAnimation() {
    if (!orderData) return;
    completeOfferingAnimation(orderData);
  }

  function resetOffering() {
    setAnimationOpen(false);
    setAnimationDone(false);
    setReceipt(null);
    setOrderData(null);
  }

  function saveReceipt() {
    if (!receipt) return;
    const text = [
      "禅心阁功德回执",
      `供奉编号：${receipt.orderId}`,
      `供奉对象：${receipt.targetPerson}`,
      `供奉类型：${receipt.blessingType}`,
      `供奉金额：${receipt.amount} 元`,
      `供奉时间：${receipt.createdAt}`,
      `祈文摘要：${receipt.prayerSummary}`,
      "祈福内容仅作情感寄托与文化体验，请理性看待。"
    ].join("\n");

    void navigator.clipboard?.writeText(text);
  }

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!offeringModalOpen) return;

    const root = modalPreviewRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const videoShell = root.querySelector(".offering-preview-video-shell");
    const caption = root.querySelector(".offering-video-status");
    const summary = root.querySelector(".offering-video-summary");
    const done = root.querySelector(".offering-preview-done");

    modalTimelineRef.current?.kill();
    setModalIntroDone(false);
    gsap.set([videoShell, caption, summary, done], { clearProps: "all" });

    if (reduceMotion) {
      gsap.set([videoShell, caption, summary, done], { autoAlpha: 1 });
      setModalIntroDone(true);
      return;
    }

    gsap.set(done, { autoAlpha: 0, y: 10, scale: 0.96 });
    gsap.set([caption, summary], { autoAlpha: 0, y: 14 });

    const previewTimeline = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => setModalIntroDone(true)
    });
    previewTimeline
      .fromTo(videoShell, { autoAlpha: 0, y: 24, scale: 0.95, filter: "brightness(.78)" }, { autoAlpha: 1, y: 0, scale: 1, filter: "brightness(1)", duration: 1.1 })
      .to([caption, summary], { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.08 }, "-=0.45")
      .to(videoShell, { scale: 1.012, filter: "brightness(1.1)", boxShadow: "0 0 48px rgba(214,181,108,.2)", duration: 1.7 }, "-=0.1")
      .fromTo(done, { autoAlpha: 0, y: 12, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.75 }, "-=0.35")
      .to({}, { duration: 0.45 });

    modalTimelineRef.current = previewTimeline;
    return () => {
      previewTimeline.kill();
    };
  }, [offeringModalOpen, receipt]);

  return (
    <div className="grid gap-5">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--paper)]">生成祈福文</h2>
        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
          选择祈福方向后，系统会从对应模板中生成一段完整祈愿，并附上一句适合保存的短祝福。
        </p>
      </div>

      <label className="field">
        <span>为谁祈福</span>
        <input value={recipient} onChange={(event) => setRecipient(event.target.value)} placeholder="例如：父亲、母亲、孩子、伴侣、朋友" />
      </label>

      <label className="field">
        <span>祈福方向</span>
        <select value={direction} onChange={(event) => setDirection(event.target.value as PrayerDirection)}>
          {prayerDirections.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>想说的话</span>
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="写下你的牵挂，例如：愿母亲身体慢慢恢复，少些操劳，心里安稳。" rows={5} />
      </label>

      <button className="gold-button justify-center" type="button" onClick={handleSubmit} disabled={loading}>
        {loading ? "正在生成..." : "生成祈福文"}
      </button>

      {error && <p className="border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">{error}</p>}

      {result && (
        <div className="prayer-result">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--gold-bright)]">
            <span>{result.direction}</span>
            <span>·</span>
            <span>{result.templateName}</span>
          </div>
          <h3>{result.title}</h3>
          <p>{result.body}</p>
          <blockquote>{result.shortBlessing}</blockquote>
          <div className="mt-5">
            <h4>今日可做的小事</h4>
            <ul>
              {result.dailyActions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </div>
          <div className="offering-entry">
            <div>
              <h4>供奉此祈文</h4>
              <p>你可以将这段祈文供奉于线上祈福台，愿心意被安放，愿祝福随灯火而上。</p>
            </div>
            <button className="gold-button" type="button" onClick={openOfferingModal}>
              供奉祈文
            </button>
          </div>
        </div>
      )}

      {offeringModalOpen && (
        <div className="offering-overlay" role="dialog" aria-modal="true" aria-labelledby="offering-modal-title">
          <div className="offering-modal">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.24em] text-[var(--gold-bright)]">安放心愿</p>
                <h3 id="offering-modal-title">供奉此祈文</h3>
              </div>
              <button className="offering-close" type="button" onClick={closeOfferingModal} aria-label="关闭供奉弹窗">
                ×
              </button>
            </div>

            <div className="offering-form-grid">
              <div className="offering-preview" ref={modalPreviewRef}>
                {!modalIntroDone && (
                  <button
                    className="offering-preview-skip"
                    type="button"
                    onClick={() => {
                      modalTimelineRef.current?.progress(1);
                      setModalIntroDone(true);
                    }}
                  >
                    跳过动画
                  </button>
                )}
                <div className="offering-video-shell offering-preview-video-shell">
                  <video className="offering-video" src={OFFERING_VIDEO_SRC} autoPlay muted loop playsInline preload="metadata" />
                  <span className="offering-video-shade" />
                  <span className="offering-video-status">祈文已安放</span>
                </div>
                <div className="offering-video-summary">
                  <span>祈文摘要</span>
                  <strong>{result?.title}</strong>
                  <p>{modalPrayerSummary}</p>
                </div>
                <div className="offering-preview-done">
                  <strong>祈文已安放</strong>
                  <span>愿所念皆安，愿所愿渐成。</span>
                </div>
              </div>

              {modalIntroDone && (
                <div className="offering-payment-panel">
                  <div className="offering-derived-row">
                    <div>
                      <span>供奉对象</span>
                      <strong>{inferredTargetPerson}</strong>
                    </div>
                    <div>
                      <span>供奉类型</span>
                      <strong>{inferredBlessingType}</strong>
                    </div>
                  </div>

                  <div>
                    <span className="offering-label">供奉金额</span>
                    <div className="offering-choice-grid offering-amount-grid">
                      {offeringAmounts.map((item) => (
                        <button className={amount === item.value ? "is-active" : ""} key={item.label} type="button" onClick={() => setAmount(item.value)}>
                          {item.label}
                        </button>
                      ))}
                    </div>
                    {amount === 0 && (
                      <label className="field mt-3">
                        <span>自定义金额</span>
                        <input inputMode="decimal" value={customAmount} onChange={(event) => setCustomAmount(event.target.value)} placeholder="请输入随喜金额" />
                      </label>
                    )}
                  </div>

                  <label className="field">
                    <span>用户留言</span>
                    <textarea value={customMessage} onChange={(event) => setCustomMessage(event.target.value)} placeholder="可写下你想供奉的名字、愿望或祝福。" rows={4} />
                  </label>
                </div>
              )}
            </div>

            <p className="offering-compliance">本功能为线上祈福与祝愿表达服务，供用户记录心愿、安放心念与保存纪念，不承诺现实结果。</p>

            <div className="offering-modal-actions">
              <button className="ghost-button" type="button" onClick={closeOfferingModal}>
                取消
              </button>
              {modalIntroDone && (
                <button className="gold-button" type="button" onClick={handleOfferingConfirm} disabled={offeringLoading}>
                  确认供奉
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <PaymentModal
        open={paymentOpen}
        payload={paymentPayload}
        title="选择支付方式"
        onBack={() => {
          setPaymentOpen(false);
          setOfferingModalOpen(true);
        }}
        onPaid={handlePaymentPaid}
      />

      {animationOpen && orderData && (
        <div className="offering-animation-overlay" role="dialog" aria-modal="true" aria-labelledby="offering-animation-title">
          <div className="offering-animation-panel" ref={animationRootRef}>
            {!animationDone && (
              <>
                <button className="offering-skip" type="button" onClick={skipOfferingAnimation}>
                  跳过动画
                </button>
                <div className="offering-stage offering-stage-video">
                  <div className="offering-video-shell">
                    <video className="offering-video" src={OFFERING_VIDEO_SRC} autoPlay muted loop playsInline preload="auto" />
                    <span className="offering-video-shade" />
                    <span className="offering-video-status">祈文升起</span>
                  </div>
                  <p className="offering-animation-summary">{summarizePrayer(prayerText)}</p>
                  <div className="offering-done">
                    <h3 id="offering-animation-title">祈文已供奉</h3>
                    <p>愿所念皆安，愿所愿渐成。</p>
                  </div>
                </div>
              </>
            )}

            {animationDone && receipt && (
              <div className="offering-receipt">
                <p className="text-xs font-semibold tracking-[0.24em] text-[var(--gold-bright)]">功德回执</p>
                <h3>祈文已供奉</h3>
                <div className="offering-receipt-grid">
                  <span>供奉编号</span>
                  <strong>{receipt.orderId}</strong>
                  <span>供奉对象</span>
                  <strong>{receipt.targetPerson}</strong>
                  <span>供奉类型</span>
                  <strong>{receipt.blessingType}</strong>
                  <span>供奉金额</span>
                  <strong>{receipt.amount} 元</strong>
                  <span>供奉时间</span>
                  <strong>{receipt.createdAt}</strong>
                  <span>祈文摘要</span>
                  <strong>{receipt.prayerSummary}</strong>
                </div>
                <p className="offering-compliance">祈福内容仅作情感寄托与文化体验，请理性看待。</p>
                <div className="offering-lamp-bridge">
                  <span>继续安放心愿</span>
                  <h4>把这份愿望点成一盏灯</h4>
                  <p>结果只是看见问题的开始，真正重要的是把心愿安放下来。</p>
                  <p>如果你此刻心中有牵挂的人或事，可以将这份愿望写成祈文，并为自己或家人点亮一盏线上祈福灯。</p>
                  <p>一盏灯，不承诺改变命运，但代表你愿意郑重面对当下，也愿这份心念被安放、被记录、被祝福。</p>
                  <strong>愿所念皆安，愿所愿渐成。</strong>
                  <Link className="gold-button justify-center" href="/face-palm">
                    前往佛前供灯
                  </Link>
                </div>
                <div className="offering-modal-actions">
                  <button className="ghost-button" type="button" onClick={saveReceipt}>
                    保存回执
                  </button>
                  <button className="ghost-button" type="button" onClick={() => {
                    setAnimationOpen(false);
                    openOfferingModal();
                  }}>
                    再供奉一次
                  </button>
                  <button className="gold-button" type="button" onClick={resetOffering}>
                    返回页面
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
