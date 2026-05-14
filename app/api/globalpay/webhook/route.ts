import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return NextResponse.json({ status: "success", message: "Webhook endpoint ready" });
}