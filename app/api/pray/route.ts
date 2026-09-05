import { NextResponse } from "next/server";
import { prayerDirections, type PrayerDirection } from "@/lib/pray/constants";
import { generatePrayer } from "@/lib/pray/templates";

function isPrayerDirection(value: unknown): value is PrayerDirection {
  return typeof value === "string" && prayerDirections.includes(value as PrayerDirection);
}

export async function POST(request: Request) {
  const body = (await request.json()) as { recipient?: string; direction?: string; message?: string };
  const direction = isPrayerDirection(body.direction) ? body.direction : "身体安康";

  const result = generatePrayer({
    recipient: body.recipient ?? "",
    direction,
    message: body.message ?? ""
  });

  return NextResponse.json({ result });
}
