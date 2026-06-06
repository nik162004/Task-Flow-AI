import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { AuditRepository, OrganizationRepository, ProjectRepository, TaskRepository, UserRepository } from "../repositories/prismaRepositories.js";
import { AuthService } from "../services/authService.js";
import { ProviderService } from "../services/providerService.js";
import { WorkspaceService } from "../services/workspaceService.js";
import { inviteSchema, loginSchema, projectSchema, signupSchema, taskSchema } from "../validation/schemas.js";

const users = new UserRepository(prisma);
const organizations = new OrganizationRepository(prisma);
const projects = new ProjectRepository(prisma);
const tasks = new TaskRepository(prisma);
const audits = new AuditRepository(prisma);
const auth = new AuthService(users, organizations);
const workspace = new WorkspaceService(organizations, projects, tasks, audits);
const providers = new ProviderService();

export const controllers = {
  health: (_req: Request, res: Response) => res.json({ ok: true, service: "taskflow-api" }),
  signup: async (req: Request, res: Response) => res.status(201).json(await auth.signup(signupSchema.parse(req.body))),
  login: async (req: Request, res: Response) => res.json(await auth.login(loginSchema.parse(req.body))),
  me: async (req: Request, res: Response) => res.json({ user: req.user, organizations: await workspace.listOrganizations(req.user!.sub) }),
  invite: async (req: Request, res: Response) => res.status(201).json(await workspace.invite({ ...inviteSchema.parse(req.body), organizationId: req.organizationId!, actorId: req.user!.sub })),
  listProjects: async (req: Request, res: Response) => res.json(await workspace.listProjects(req.organizationId!)),
  createProject: async (req: Request, res: Response) => res.status(201).json(await workspace.createProject(req.organizationId!, req.user!.sub, projectSchema.parse(req.body))),
  listTasks: async (req: Request, res: Response) => res.json(await workspace.listTasks(req.organizationId!)),
  createTask: async (req: Request, res: Response) => res.status(201).json(await workspace.createTask(req.organizationId!, req.user!.sub, taskSchema.parse(req.body))),
  notifications: (_req: Request, res: Response) => res.json(providers.notifications()),
  checkout: (req: Request, res: Response) => res.json(providers.createStripeCheckout(req.organizationId!, String(req.body.plan ?? "Pro"))),
  invoices: (_req: Request, res: Response) => res.json([{ id: "inv_001", amountPaid: 2900, currency: "usd", hostedUrl: "https://billing.stripe.com/mock" }]),
  uploadSignature: (req: Request, res: Response) => res.json(providers.uploadSignature(`organizations/${req.organizationId}`)),
  auditLogs: async (req: Request, res: Response) => res.json(await workspace.listAuditLogs(req.organizationId!)),
  analytics: (_req: Request, res: Response) => res.json({ activeProjects: 8, completedTasks: 142, cycleTimeDays: 3.4, utilization: 0.82 })
};
