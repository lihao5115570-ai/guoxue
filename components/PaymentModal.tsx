"use client";

import { useEffect, useMemo, useState } from "react";
import type { CreateOrderInput, OfferingReceipt, PayChannel, PublicOrder } from "@/lib/payment/types";

type PaymentPayload = Omit<CreateOrderInput, "payChannel">;

type PaymentModalProps = {
  open: boolean;
  payload: PaymentPayload | null;
  title?: string;
  onBack: () => void;
  onPaid: (data: { order: PublicOrder; receipt: OfferingReceipt }) => void;
};

const payChannels: Array<{ value: PayChannel; label: string; hint: string }> = [
  { value: "wechat", label: "微信支付", hint: "适合微信内或扫码支付场景" },
  { value: "alipay", label: "支付宝支付", hint: "适合支付宝扫码或手机支付场景" }
];

const qrSources: Record<PayChannel, string> = {
  wechat: "/payment/wechat-qr.png",
  alipay: "/payment/alipay-qr.jpg"
};

function summarize(text: string) {
  const compact = text.replace(/\s+/g, " ").trim();
  return compact.length > 72 ? `${compact.slice(0, 72)}...` : compact;
}

export function PaymentModal({ open, payload, title = "选择支付方式", onBack, onPaid }: PaymentModalProps) {
  const [payChannel, setPayChannel] = useState<PayChannel>("wechat");
  const [stage, setStage] = useState<"select" | "paying">("select");
  const [order, setOrder] = useState<PublicOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const prayerSummary = useMemo(() => summarize(payload?.prayerText ?? ""), [payload?.prayerText]);

  useEffect(() => {
    if (!open) {
      setStage("select");
      setOrder(null);
      setLoading(false);
      setError("");
    }
  }, [open]);

  if (!open || !payload) return null;

  async function createOrderAndPay() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, payChannel })
      });
      if (!response.ok) throw new Error("订单创建失败，请稍后再试。");
      const createdOrder = (await response.json()) as PublicOrder;
      setOrder(createdOrder);
      setStage("paying");
    } catch (err) {
      setError(err instanceof Error ? err.message : "订单创建失败，请稍后再试。");
    } finally {
      setLoading(false);
    }
  }

  async function completeStaticQrPayment() {
    if (!order) return;
    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 2100));
      const statusResponse = await fetch(`/api/orders/${order.orderNo}/status`, { cache: "no-store" });
      const statusData = (await statusResponse.json()) as { status?: string };
      if (statusData.status !== "paid") throw new Error("暂未查询到支付完成，请稍后再试。");

      const receiptResponse = await fetch("/api/offerings/receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNo: order.orderNo })
      });
      if (!receiptResponse.ok) throw new Error("回执生成失败，请稍后再试。");
      const receipt = (await receiptResponse.json()) as OfferingReceipt;
      onPaid({ order: { ...order, status: "paid" }, receipt });
    } catch (err) {
      setError(err instanceof Error ? err.message : "支付状态查询失败，请稍后再试。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="offering-overlay payment-overlay" role="dialog" aria-modal="true" aria-labelledby="payment-modal-title">
      <div className="offering-modal payment-modal">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--gold-bright)]">支付系统</p>
            <h3 id="payment-modal-title">{title}</h3>
          </div>
          <button className="offering-close" type="button" onClick={onBack} aria-label="关闭支付弹窗">
            ×
          </button>
        </div>

        {stage === "select" ? (
          <div className="payment-content">
            <section className="payment-order-card">
              <h4>订单信息</h4>
              <dl>
                <div><dt>供奉类型</dt><dd>{payload.blessingType}</dd></div>
                <div><dt>供奉对象</dt><dd>{payload.targetPerson}</dd></div>
                <div><dt>供奉金额</dt><dd>{payload.amount.toFixed(1)} 元</dd></div>
                <div><dt>祈文摘要</dt><dd>{prayerSummary}</dd></div>
              </dl>
            </section>

            <section className="payment-channel-card">
              <h4>支付方式</h4>
              <div className="payment-channel-grid">
                {payChannels.map((channel) => (
                  <button key={channel.value} className={payChannel === channel.value ? "is-active" : ""} type="button" onClick={() => setPayChannel(channel.value)}>
                    <strong>{channel.label}</strong>
                    <span>{channel.hint}</span>
                  </button>
                ))}
              </div>
            </section>

            <p className="payment-note">请选择支付方式完成供奉。支付成功后，系统将为你点亮祈福灯，并生成专属供奉回执。</p>
          </div>
        ) : (
          <div className="payment-mock-panel">
            <div className="payment-qr payment-real-qr">
              <img src={qrSources[payChannel]} alt={payChannel === "wechat" ? "微信支付收款码" : "支付宝收款码"} />
            </div>
            <div>
              <h4>{payChannel === "wechat" ? "微信扫码支付" : "支付宝扫码支付"}</h4>
              <p>请使用{payChannel === "wechat" ? "微信" : "支付宝"}扫描左侧收款码完成支付。</p>
              <p>当前为静态收款码临时接入，后续仍建议改为后端商户订单系统。</p>
              <div className="payment-status-line">
                <span>订单号：{order?.orderNo}</span>
                <strong>扫码完成后点击下方按钮进入供灯仪式</strong>
              </div>
            </div>
          </div>
        )}

        {error && <p className="payment-error">{error}</p>}

        <div className="offering-modal-actions">
          <button className="ghost-button" type="button" onClick={onBack}>
            返回修改
          </button>
          {stage === "select" && (
            <button className="gold-button" type="button" onClick={createOrderAndPay} disabled={loading}>
              {loading ? "正在创建订单..." : "去支付"}
            </button>
          )}
          {stage === "paying" && (
            <button className="gold-button" type="button" onClick={completeStaticQrPayment} disabled={loading}>
              {loading ? "正在确认支付..." : "我已完成支付"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
