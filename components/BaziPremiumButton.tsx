"use client";

import { useMemo, useState } from "react";
import { PaymentModal } from "@/components/PaymentModal";
import type { CreateOrderInput, OfferingReceipt, PublicOrder } from "@/lib/payment/types";

export function BaziPremiumButton({ resultId }: { resultId: string }) {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paidReceipt, setPaidReceipt] = useState<OfferingReceipt | null>(null);

  const payload = useMemo<Omit<CreateOrderInput, "payChannel">>(() => ({
    prayerText: `八字精批报告\n结果编号：${resultId}\n用于解锁更完整的命盘、事业、财运、感情、大运和流年详解。`,
    blessingType: "八字精批",
    targetPerson: "个人命盘详批",
    amount: 66.6,
    customMessage: ""
  }), [resultId]);

  function handlePaid({ receipt }: { order: PublicOrder; receipt: OfferingReceipt }) {
    setPaidReceipt(receipt);
    setPaymentOpen(false);
    window.setTimeout(() => {
      document.querySelector("#full-report")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  return (
    <>
      <button className="gold-button" type="button" onClick={() => setPaymentOpen(true)}>
        {paidReceipt ? "已解锁详批" : "完整详批"}
      </button>
      <PaymentModal
        open={paymentOpen}
        payload={payload}
        title="八字精批支付"
        onBack={() => setPaymentOpen(false)}
        onPaid={handlePaid}
      />
    </>
  );
}
