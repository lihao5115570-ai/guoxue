import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const notifyRaw = await request.json().catch(() => ({}));

  // TODO: 接入支付宝异步通知验签。
  // 必须从 process.env.ALIPAY_* 读取配置，验签通过后再更新订单状态。
  // 订单 paid 后不能重复处理回调。
  return NextResponse.json({
    ok: true,
    channel: "alipay",
    received: Boolean(notifyRaw)
  });
}
