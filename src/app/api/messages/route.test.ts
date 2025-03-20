// src/app/api/messages/route.test.ts
import { GET } from "./route";
import { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
import pool from "@/lib/db";

jest.mock("@/lib/db", () => ({
  query: jest.fn(),
}));
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

describe("GET /api/messages", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches messages for authenticated user", async () => {
    (verify as jest.Mock).mockReturnValue({ id: "uuid-user" });
    (pool.query as jest.Mock).mockResolvedValue({
      rows: [
        { id: "uuid-1", sender_id: "uuid-user", recipient_id: "uuid-other", encrypted_content: "Hi!", created_at: "2025-03-09T12:00:00Z" },
      ],
    });

    const req = new NextRequest("http://localhost:3000/api/messages", {
      headers: { "Authorization": "Bearer valid-token" },
    });

    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([
      { id: "uuid-1", sender_id: "uuid-user", recipient_id: "uuid-other", encrypted_content: "Hi!", created_at: "2025-03-09T12:00:00Z" },
    ]);
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM messages WHERE sender_id = $1 OR recipient_id = $1 ORDER BY created_at DESC",
      ["uuid-user"]
    );
  });

  it("returns 401 if no token provided", async () => {
    const req = new NextRequest("http://localhost:3000/api/messages");

    const res = await GET(req);
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Unauthorized" });
  });

  it("returns 401 if token is invalid", async () => {
    (verify as jest.Mock).mockImplementation(() => { throw new Error("Invalid token"); });

    const req = new NextRequest("http://localhost:3000/api/messages", {
      headers: { "Authorization": "Bearer invalid-token" },
    });

    const res = await GET(req);
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Invalid token" });
  });
});