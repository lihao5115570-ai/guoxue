import { NextResponse } from "next/server";
import { getMockOrder } from "@/lib/payment/mock-store";

export async function GET(_request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const order = getMockOrder(orderId);

  if (!order) {
    return NextResponse.json({ orderId, status: "closed" }, { status: 404 });
  }

  return NextResponse.json({
    orderId: order.orderNo,
    status: order.status
  });
}
