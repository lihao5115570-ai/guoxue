export type PayChannel = "wechat" | "alipay";

export type OrderStatus = "pending" | "paid" | "failed" | "closed";

export type CreateOrderInput = {
  prayerText: string;
  blessingType: string;
  targetPerson: string;
  amount: number;
  customMessage: string;
  payChannel: PayChannel;
};

export type Order = {
  id: string;
  orderNo: string;
  prayerText: string;
  blessingType: string;
  targetPerson: string;
  amount: number;
  payChannel: PayChannel;
  status: OrderStatus;
  transactionId?: string;
  createdAt: string;
  paidAt?: string;
  notifyRaw?: object;
};

export type PublicOrder = Pick<Order, "orderNo" | "amount" | "payChannel" | "status"> & {
  payUrl?: string;
  qrCodeUrl?: string;
};

export type OfferingReceipt = {
  id: string;
  orderNo: string;
  targetPerson: string;
  blessingType: string;
  amount: number;
  prayerSummary: string;
  offeringTime: string;
  status: "已供奉";
  receiptText: string;
};
