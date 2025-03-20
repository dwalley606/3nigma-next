import { POST } from "./route"; // Adjust path if needed
import { NextRequest } from "next/server";
import pool from "@/lib/db";
import { hash } from "bcryptjs";
import { generateKeyPairSync } from "crypto";

jest.mock("@/lib/db", () => ({
  query: jest.fn(),
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
}));

jest.mock("crypto", () => ({
  generateKeyPairSync: jest.fn(),
}));

describe("POST /api/signup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if required fields are missing", async () => {
    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ email: "test@example.com" }), // Missing username and password
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Username, email, and password are required");
  });

  it("should return 409 if user already exists", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [{ id: 1 }] });

    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        username: "testuser",
        email: "test@example.com",
        password: "securepassword",
      }),
    });

    const res = await POST(req);

    expect(res.status).toBe(409);
    const json = await res.json();
    expect(json.error).toBe("User already exists");
  });

  it("should create a new user and return 201", async () => {
    (pool.query as jest.Mock)
      .mockResolvedValueOnce({ rows: [] }) // No existing user
      .mockResolvedValueOnce({ rows: [{ id: 1, username: "testuser", email: "test@example.com" }] }) // Inserted user
      .mockResolvedValueOnce({ rows: [] }); // Inserted keys

    (hash as jest.Mock).mockResolvedValue("hashedpassword");

    (generateKeyPairSync as jest.Mock).mockReturnValue({
      publicKey: "mockPublicKey",
      privateKey: "mockPrivateKey",
    });

    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        username: "testuser",
        email: "test@example.com",
        password: "securepassword",
        phoneNumber: "1234567890",
      }),
    });

    const res = await POST(req);

    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.user).toEqual({ id: 1, username: "testuser", email: "test@example.com" });
  });
});
