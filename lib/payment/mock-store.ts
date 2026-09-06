import type { CreateOrderInput, OfferingReceipt, Order, PublicOrder } from "@/lib/payment/types";

const orders = new Map<string, Order>();

function safeAmount(value: number) {
  return Number.isFinite(value) && value > 0 ? Number(value.toFixed(2)) : 6.6;
}

function summarize(text: string) {
  const compact = text.replace(/\s+/g, " ").trim();
  return compact.length > 82 ? `${compact.slice(0, 82)}...` : compact;
}

export function createMockOrder(input: CreateOrderInput): PublicOrder {
  const now = new Date();
  const orderNo = `OF${now.getTime()}`;
  const order: Order = {
    id: crypto.randomUUID(),
    orderNo,
    prayerText: input.prayerText,
    blessingType: input.blessingType,
    targetPerson: input.targetPerson,
    amount: safeAmount(input.amount),
    payChannel: input.payChannel,
    status: "pending",
    createdAt: now.toISOString()
  };

  orders.set(orderNo, order);

  return {
    orderNo,
    amount: order.amount,
    payChannel: order.payChannel,
    status: order.status
  };
}

export function getMockOrder(orderNo: string) {
  const order = orders.get(orderNo);
  if (!order) return null;

  const elapsed = Date.now() - new Date(order.createdAt).getTime();
  if (order.status === "pending" && elapsed >= 2000) {
    order.status = "paid";
    order.paidAt = new Date().toISOString();
    order.transactionId = `MOCK-${order.payChannel.toUpperCase()}-${Date.now()}`;
    orders.set(orderNo, order);
  }

  return order;
}

export function createMockReceipt(orderNo: string): OfferingReceipt | null {
  const order = getMockOrder(orderNo);
  if (!order || order.status !== "paid") return null;

  return {
    id: crypto.randomUUID(),
    orderNo: order.orderNo,
    targetPerson: order.targetPerson,
    blessingType: order.blessingType,
    amount: order.amount,
    prayerSummary: summarize(order.prayerText),
    offeringTime: order.paidAt ?? new Date().toISOString(),
    status: "已供奉",
    receiptText: "愿所念皆安，愿所愿渐成。"
  };
}
