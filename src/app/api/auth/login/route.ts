import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = rows[0];

  if (!user || !(await compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1h" }
  );
  return NextResponse.json({ token, user: { id: user.id, username: user.username, email: user.email } });
}