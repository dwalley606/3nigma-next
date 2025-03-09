// src/app/api/auth/signup/route.test.ts
import { POST } from "./route";
import { NextRequest } from "next/server";
import { hash } from "bcryptjs";
import pool from "@/lib/db";

jest.mock("@/lib/db", () => ({
  query: jest.fn(),
}));
jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
}));

describe("POST /api/auth/signup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates a new user with hashed password", async () => {
    // Mock DB: no existing user, then insert
    (pool.query as jest.Mock)
      .mockResolvedValueOnce({ rows: [] }) // Check existing user
      .mockResolvedValueOnce({ rows: [{ id: "uuid-123", email: "newuser@example.com" }] }); // Insert
    (hash as jest.Mock).mockResolvedValue("$2a$10$hashedpassword");

    const req = new NextRequest("http://localhost/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email: "newuser@example.com", password: "newpass123" })
    });
    const res = await POST(req);

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ user: { id: "uuid-123", email: "newuser@example.com" } });
    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      ["newuser@example.com", "$2a$10$hashedpassword"]
    );
  });

  it("returns 409 if user already exists", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [{ id: "uuid-123", email: "newuser@example.com" }] });

    const req = new NextRequest("http://localhost/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email: "newuser@example.com", password: "newpass123" })
    });
    const res = await POST(req);

    expect(res.status).toBe(409);
    expect(await res.json()).toEqual({ error: "User already exists" });
  });

  it("returns 400 if email or password is missing", async () => {
    const req = new NextRequest("http://localhost/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email: "", password: "newpass123" })
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Email and password are required" });
  });
});