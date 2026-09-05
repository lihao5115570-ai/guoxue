import { NextResponse } from "next/server";
import { generateHexagram } from "@/lib/divination/generator";
import { generateDivinationInterpretation } from "@/lib/divination/interpretation";

export async function POST(request: Request) {
  const body = (await request.json()) as { question: string; category: string };
  const result = generateHexagram(body.question, body.category);
  return NextResponse.json({ id: result.id, result, interpretation: generateDivinationInterpretation(result) });
}
