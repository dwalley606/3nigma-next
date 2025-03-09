// src/app/api/messages/send/route.test.ts
import { POST } from "./route";
import { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
import pool from "@/lib/db";

jest.mock("@/lib/db", () => ({
  query: jest.fn(),
}));
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

describe("POST /api/messages/send", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sends a message with valid token and data", async () => {
    (verify as jest.Mock).mockReturnValue({ id: "uuid-sender" });
    (pool.query as jest.Mock).mockResolvedValue({
      rows: [{
        id: "uuid-msg",
        sender_id: "uuid-sender",
        recipient_id: "uuid-recipient",
        encrypted_content: "Hello!",
        created_at: "2025-03-09T12:00:00Z",
      }],
    });

    const req = new NextRequest("http://localhost:3000/api/messages/send", {
      method: "POST",
      headers: { "Authorization": "Bearer valid-token" },
      body: JSON.stringify({ recipient_id: "uuid-recipient", encrypted_content: "Hello!" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({
      id: "uuid-msg",
      sender_id: "uuid-sender",
      recipient_id: "uuid-recipient",
      encrypted_content: "Hello!",
      created_at: "2025-03-09T12:00:00Z",
    });
    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO messages (sender_id, recipient_id, encrypted_content) VALUES ($1, $2, $3) RETURNING *",
      ["uuid-sender", "uuid-recipient", "Hello!"]
    );
  });

  it("returns 401 if no token provided", async () => {
    const req = new NextRequest("http://localhost:3000/api/messages/send", {
      method: "POST",
      body: JSON.stringify({ recipient_id: "uuid-recipient", encrypted_content: "Hello!" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Unauthorized" });
  });

  it("returns 401 if token is invalid", async () => {
    (verify as jest.Mock).mockImplementation(() => { throw new Error("Invalid token"); });

    const req = new NextRequest("http://localhost:3000/api/messages/send", {
      method: "POST",
      headers: { "Authorization": "Bearer invalid-token" },
      body: JSON.stringify({ recipient_id: "uuid-recipient", encrypted_content: "Hello!" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Invalid token" });
  });

  it("returns 400 if recipient_id or encrypted_content is missing", async () => {
    (verify as jest.Mock).mockReturnValue({ id: "uuid-sender" });

    const req = new NextRequest("http://localhost:3000/api/messages/send", {
      method: "POST",
      headers: { "Authorization": "Bearer valid-token" },
      body: JSON.stringify({ recipient_id: "" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Recipient ID and message required" });
  });
});