import { POST } from "./route"; // Adjust the path if needed
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

describe("POST /api/login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if the user does not exist", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ email: "nonexistent@example.com", password: "password123" }),
    });

    const res = await POST(req);

    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json.error).toBe("Invalid credentials");
  });

  it("should return 401 if the password is incorrect", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ id: 1, email: "test@example.com", username: "testuser", password: "hashedpassword" }],
    });

    (compare as jest.Mock).mockResolvedValueOnce(false); // Simulate password mismatch

    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ email: "test@example.com", password: "wrongpassword" }),
    });

    const res = await POST(req);

    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json.error).toBe("Invalid credentials");
  });

  it("should return a token and user details on successful login", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ id: 1, email: "test@example.com", username: "testuser", password: "hashedpassword" }],
    });

    (compare as jest.Mock).mockResolvedValueOnce(true); // Simulate correct password

    (sign as jest.Mock).mockReturnValue("mockedToken");

    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ email: "test@example.com", password: "password123" }),
    });

    const res = await POST(req);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.token).toBe("mockedToken");
    expect(json.user).toEqual({ id: 1, username: "testuser", email: "test@example.com" });
  });
});
