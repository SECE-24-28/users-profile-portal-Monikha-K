import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromHeader } from "@/lib/auth";
import { saveBase64Image } from "@/lib/upload";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const token = getTokenFromHeader(auth);
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { image } = await req.json();
  if (!image) return NextResponse.json({ error: "No image" }, { status: 400 });

  const path = saveBase64Image(image);
  return NextResponse.json({ path });
}
