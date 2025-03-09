// src/app/api/messages/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let senderId;
  try {
    const decoded = verify(token, process.env.JWT_SECRET || "secret") as { id: string };
    senderId = decoded.id;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { recipient_id, encrypted_content } = await req.json();
  if (!recipient_id || !encrypted_content) {
    return NextResponse.json({ error: "Recipient ID and message required" }, { status: 400 });
  }

  const { rows } = await pool.query(
    "INSERT INTO messages (sender_id, recipient_id, encrypted_content) VALUES ($1, $2, $3) RETURNING *",
    [senderId, recipient_id, encrypted_content]
  );

  return NextResponse.json(rows[0], { status: 201 });
}