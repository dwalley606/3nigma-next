// src/app/api/messages/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let userId;
  try {
    const decoded = verify(token, process.env.JWT_SECRET || "secret") as { id: string };
    userId = decoded.id;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { rows } = await pool.query(
    "SELECT * FROM messages WHERE sender_id = $1 OR recipient_id = $1 ORDER BY created_at DESC",
    [userId]
  );

  return NextResponse.json(rows);
}