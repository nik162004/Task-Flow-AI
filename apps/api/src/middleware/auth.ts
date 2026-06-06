import type { NextFunction, Request, Response } from "express";
import { forbidden, unauthorized } from "../utils/errors.js";
import { verifyAccessToken, type AccessPayload } from "../utils/tokens.js";

declare global {
  namespace Express {
    interface Request {
      user?: AccessPayload;
      organizationId?: string;
      role?: string;
    }
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  if (!token) return next(unauthorized());

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    next(unauthorized());
  }
}

export function requireOrganization(req: Request, _res: Response, next: NextFunction) {
  const organizationId = req.header("x-organization-id") ?? req.params.organizationId;
  const membership = req.user?.organizations.find((org) => org.id === organizationId);
  if (!organizationId || !membership) return next(forbidden());
  req.organizationId = organizationId;
  req.role = membership.role;
  next();
}

export function requireRole(roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.role || !roles.includes(req.role)) return next(forbidden());
    next();
  };
}
