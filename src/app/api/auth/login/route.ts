import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import pool from "@/lib/db"; // Add next

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = rows[0];
  if (user && (await compare(password, user.password))) {
    const token = sign({ id: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
    return NextResponse.json({ token, user: { id: user.id, email: user.email } });
  }
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}