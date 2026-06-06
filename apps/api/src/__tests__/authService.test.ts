import { describe, expect, it, vi } from "vitest";
import bcrypt from "bcryptjs";
import { AuthService } from "../services/authService.js";

const organizations = {
  create: vi.fn(async () => ({ id: "org_1", memberships: [] })),
  listForUser: vi.fn(),
  invite: vi.fn()
};

describe("AuthService", () => {
  it("creates a user and owner organization during signup", async () => {
    const users = {
      findByEmail: vi.fn(async () => null),
      findById: vi.fn(),
      create: vi.fn(async (data) => ({ id: "user_1", email: data.email, name: data.name, memberships: [] }))
    };
    const service = new AuthService(users as any, organizations as any);

    const session = await service.signup({ name: "Ada", email: "ada@example.com", password: "LongPassword123", organizationName: "Acme" });

    expect(users.create).toHaveBeenCalled();
    expect(organizations.create).toHaveBeenCalled();
    expect(session.accessToken).toBeTruthy();
    expect(session.organizations[0]).toEqual({ id: "org_1", role: "OWNER" });
  });

  it("rejects invalid login credentials", async () => {
    const users = { findByEmail: vi.fn(async () => ({ passwordHash: await bcrypt.hash("correct", 4) })) };
    const service = new AuthService(users as any, organizations as any);

    await expect(service.login({ email: "ada@example.com", password: "wrong" })).rejects.toThrow("Invalid email or password");
  });
});
