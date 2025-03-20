import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import pool from "@/lib/db";
import { generateKeyPairSync } from "crypto"; // For E2EE keys

export async function POST(req: NextRequest) {
  const { username, email, password, phoneNumber } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json({ error: "Username, email, and password are required" }, { status: 400 });
  }

  const { rows: existingUsers } = await pool.query(
    "SELECT * FROM users WHERE email = $1 OR username = $2",
    [email, username]
  );
  if (existingUsers.length > 0) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await hash(password, 10);
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });

  const { rows } = await pool.query(
    "INSERT INTO users (username, email, password, phone_number, public_key) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email",
    [username, email, hashedPassword, phoneNumber || null, publicKey]
  );

  await pool.query(
    "INSERT INTO encryption_keys (user_id, public_key, private_key) VALUES ($1, $2, $3)",
    [rows[0].id, publicKey, privateKey]
  );

  return NextResponse.json({ user: rows[0] }, { status: 201 });
}