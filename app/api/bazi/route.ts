import { NextResponse } from "next/server";
import { calculateBazi, createResultId } from "@/lib/bazi/calculator";
import type { BirthProfileInput } from "@/lib/bazi/types";

export async function POST(request: Request) {
  const profile = (await request.json()) as BirthProfileInput;
  const id = createResultId("bazi", JSON.stringify(profile));
  const data = calculateBazi(profile, id);
  return NextResponse.json({ id, data });
}
