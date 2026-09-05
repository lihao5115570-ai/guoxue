import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    ok: true,
    article: {
      id: `article-${Date.now().toString(36)}`,
      ...body,
      status: body.status ?? "draft",
      updatedAt: new Date().toISOString()
    }
  });
}
