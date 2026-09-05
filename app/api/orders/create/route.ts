import { NextResponse } from "next/server";
import { createMockOrder } from "@/lib/payment/mock-store";
import type { CreateOrderInput, PayChannel } from "@/lib/payment/types";

function isPayChannel(value: unknown): value is PayChannel {
  return value === "wechat" || value === "alipay";
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<CreateOrderInput>;
  const payChannel = isPayChannel(body.payChannel) ? body.payChannel : "wechat";

  const order = createMockOrder({
    prayerText: body.prayerText ?? "",
    blessingType: body.blessingType ?? "平安祈愿",
    targetPerson: body.targetPerson ?? "所念之人",
    amount: Number(body.amount),
    customMessage: body.customMessage ?? "",
    payChannel
  });

  return NextResponse.json(order);
}
