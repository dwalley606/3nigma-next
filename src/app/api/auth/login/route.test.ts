import { POST } from "./route";
import { NextRequest } from "next/server";
import pool from "@/lib/db";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

jest.mock("@/lib/db", () => ({
  query: jest.fn(),
}));
jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
}));
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("POST /api/auth/login", () => {
  it("returns token for valid credentials", async () => {
    (pool.query as jest.Mock).mockResolvedValue({
      rows: [{ id: "1", email: "test@example.com", password: "$2a$10$..." }],
    });
    (compare as jest.Mock).mockResolvedValue(true);
    (sign as jest.Mock).mockReturnValue("fake-token");

    const req = new NextRequest("http://localhost/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: "test@example.com", password: "test123" })
    });
    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ token: "fake-token", user: { id: "1", email: "test@example.com" } });
  });

  it("returns 401 for invalid credentials", async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

    const req = new NextRequest("http://localhost/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: "wrong@example.com", password: "wrong" })
    });
    const res = await POST(req);

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Invalid credentials" });
  });
});