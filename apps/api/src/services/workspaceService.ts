import crypto from "node:crypto";
import type { AuditRepository, OrganizationRepository, ProjectRepository, TaskRepository } from "../repositories/prismaRepositories.js";

export class WorkspaceService {
  constructor(
    private organizations: OrganizationRepository,
    private projects: ProjectRepository,
    private tasks: TaskRepository,
    private audits: AuditRepository
  ) {}

  listOrganizations(userId: string) {
    return this.organizations.listForUser(userId);
  }

  async invite(input: { organizationId: string; email: string; role: "ADMIN" | "MEMBER" | "VIEWER"; actorId: string }) {
    const invitation = await this.organizations.invite({
      email: input.email,
      role: input.role,
      token: crypto.randomUUID(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      organization: { connect: { id: input.organizationId } }
    });
    await this.audits.create({ action: "INVITE_CREATED", entity: "Invitation", entityId: invitation.id, userId: input.actorId, organizationId: input.organizationId });
    return invitation;
  }

  listProjects(organizationId: string) {
    return this.projects.list(organizationId);
  }

  async createProject(organizationId: string, actorId: string, data: { name: string; key: string; description?: string; color: string }) {
    const project = await this.projects.create({ ...data, organizationId });
    await this.audits.create({ action: "PROJECT_CREATED", entity: "Project", entityId: project.id, userId: actorId, organizationId });
    return project;
  }

  listTasks(organizationId: string) {
    return this.tasks.list(organizationId);
  }

  async createTask(organizationId: string, creatorId: string, data: { title: string; projectId: string; description?: string; status: any; priority: any; labels: string[]; dueDate?: Date; assigneeId?: string }) {
    const task = await this.tasks.create({ ...data, organizationId, creatorId });
    await this.audits.create({ action: "TASK_CREATED", entity: "Task", entityId: task.id, userId: creatorId, organizationId });
    return task;
  }

  listAuditLogs(organizationId: string) {
    return this.audits.list(organizationId);
  }
}
