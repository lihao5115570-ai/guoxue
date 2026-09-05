import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const notifyRaw = await request.json().catch(() => ({}));

  // TODO: 接入微信支付签名校验。
  // 必须从 process.env.WECHAT_PAY_* 读取配置，校验通过后再更新订单状态。
  // 订单 paid 后不能重复处理回调。
  return NextResponse.json({
    ok: true,
    channel: "wechat",
    received: Boolean(notifyRaw)
  });
}
