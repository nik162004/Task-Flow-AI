import { describe, expect, it } from "vitest";
import { hashToken, signAccessToken, signRefreshToken, verifyAccessToken } from "../utils/tokens.js";
import { forbidden, notFound, unauthorized } from "../utils/errors.js";

describe("token helpers", () => {
  it("signs and verifies access tokens", () => {
    const token = signAccessToken({ sub: "user_1", email: "ada@example.com", organizations: [{ id: "org_1", role: "OWNER" }] });
    expect(verifyAccessToken(token).sub).toBe("user_1");
  });

  it("creates refresh tokens and stable hashes", () => {
    const refresh = signRefreshToken("user_1");
    expect(refresh.split(".")).toHaveLength(3);
    expect(hashToken("secret")).toBe(hashToken("secret"));
  });
});

describe("error helpers", () => {
  it("returns typed application errors", () => {
    expect(unauthorized().statusCode).toBe(401);
    expect(forbidden().code).toBe("FORBIDDEN");
    expect(notFound("Task").message).toBe("Task not found");
  });
});
