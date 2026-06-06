import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { AppError } from "../utils/errors.js";
import { signAccessToken, signRefreshToken } from "../utils/tokens.js";
import type { OrganizationRepository, UserRepository } from "../repositories/prismaRepositories.js";

const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export class AuthService {
  constructor(
    private users: UserRepository,
    private organizations: OrganizationRepository
  ) {}

  async signup(input: { name: string; email: string; password: string; organizationName: string }) {
    const existing = await this.users.findByEmail(input.email);
    if (existing) throw new AppError(409, "Email is already registered", "EMAIL_EXISTS");

    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await this.users.create({ email: input.email, name: input.name, passwordHash, emailVerified: false });
    const organization = await this.organizations.create({
      name: input.organizationName,
      slug: `${slugify(input.organizationName)}-${Date.now().toString(36)}`,
      memberships: { create: { userId: user.id, role: Role.OWNER } },
      subscriptions: { create: { plan: "Free", status: "TRIALING" } }
    });

    return this.session({ ...user, memberships: [{ organizationId: organization.id, role: Role.OWNER }] });
  }

  async login(input: { email: string; password: string }) {
    const user = await this.users.findByEmail(input.email);
    if (!user?.passwordHash || !(await bcrypt.compare(input.password, user.passwordHash))) {
      throw new AppError(401, "Invalid email or password", "INVALID_CREDENTIALS");
    }
    return this.session(user);
  }

  private session(user: { id: string; email: string; name: string; memberships: Array<{ organizationId: string; role: string }> }) {
    const organizations = user.memberships.map((membership) => ({ id: membership.organizationId, role: membership.role }));
    return {
      user: { id: user.id, email: user.email, name: user.name },
      accessToken: signAccessToken({ sub: user.id, email: user.email, organizations }),
      refreshToken: signRefreshToken(user.id),
      organizations
    };
  }
}
