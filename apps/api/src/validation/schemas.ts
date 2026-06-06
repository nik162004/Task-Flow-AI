import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(10),
  organizationName: z.string().min(2).max(80)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const projectSchema = z.object({
  name: z.string().min(2).max(120),
  key: z.string().min(2).max(8).regex(/^[A-Z0-9]+$/),
  description: z.string().max(1000).optional(),
  color: z.string().default("#14b8a6")
});

export const taskSchema = z.object({
  title: z.string().min(2).max(180),
  description: z.string().max(4000).optional(),
  status: z.enum(["BACKLOG", "TODO", "IN_PROGRESS", "IN_REVIEW", "DONE", "CANCELED"]).default("TODO"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  labels: z.array(z.string().min(1).max(32)).default([]),
  dueDate: z.coerce.date().optional(),
  projectId: z.string(),
  assigneeId: z.string().optional()
});

export const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(["ADMIN", "MEMBER", "VIEWER"]).default("MEMBER")
});
