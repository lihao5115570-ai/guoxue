import { NextResponse } from "next/server";
import { createMockReceipt } from "@/lib/payment/mock-store";

export async function POST(request: Request) {
  const body = (await request.json()) as { orderNo?: string; orderId?: string };
  const orderNo = body.orderNo ?? body.orderId ?? "";
  const receipt = createMockReceipt(orderNo);

  if (!receipt) {
    return NextResponse.json({ error: "订单未支付或不存在" }, { status: 400 });
  }

  return NextResponse.json(receipt);
}
