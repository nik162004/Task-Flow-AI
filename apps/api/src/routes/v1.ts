import { Router } from "express";
import { controllers } from "../controllers/controllers.js";
import { requireAuth, requireOrganization, requireRole } from "../middleware/auth.js";

export const v1 = Router();

v1.get("/health", controllers.health);
v1.post("/auth/signup", controllers.signup);
v1.post("/auth/login", controllers.login);
v1.get("/auth/me", requireAuth, controllers.me);
v1.post("/auth/logout", requireAuth, (_req, res) => res.status(204).send());
v1.post("/auth/forgot-password", (_req, res) => res.json({ ok: true }));
v1.post("/auth/verify-email", (_req, res) => res.json({ ok: true }));
v1.post("/auth/google", (_req, res) => res.status(501).json({ error: { code: "GOOGLE_OAUTH_NOT_CONFIGURED", message: "Set Google OAuth credentials to enable this route." } }));

v1.use(requireAuth, requireOrganization);
v1.get("/organizations/current/projects", controllers.listProjects);
v1.post("/organizations/current/projects", requireRole(["OWNER", "ADMIN"]), controllers.createProject);
v1.post("/organizations/current/invitations", requireRole(["OWNER", "ADMIN"]), controllers.invite);
v1.get("/tasks", controllers.listTasks);
v1.post("/tasks", controllers.createTask);
v1.get("/notifications", controllers.notifications);
v1.post("/billing/checkout", requireRole(["OWNER", "ADMIN"]), controllers.checkout);
v1.get("/billing/invoices", controllers.invoices);
v1.post("/files/signature", controllers.uploadSignature);
v1.get("/admin/audit-logs", requireRole(["OWNER", "ADMIN"]), controllers.auditLogs);
v1.get("/admin/analytics", requireRole(["OWNER", "ADMIN"]), controllers.analytics);
