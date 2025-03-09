// src/app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import pool from "@/lib/db";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Validate input
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  // Check if user exists
  const { rows: existingUsers } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (existingUsers.length > 0) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  // Hash password
  const hashedPassword = await hash(password, 10);

  // Insert new user
  const { rows } = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
    [email, hashedPassword]
  );

  const user = rows[0];
  return NextResponse.json({ user: { id: user.id, email: user.email } }, { status: 201 });
}