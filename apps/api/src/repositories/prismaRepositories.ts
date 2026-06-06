import type { PrismaClient, Prisma } from "@prisma/client";

export class UserRepository {
  constructor(private db: PrismaClient) {}
  findByEmail(email: string) {
    return this.db.user.findUnique({ where: { email }, include: { memberships: true } });
  }
  findById(id: string) {
    return this.db.user.findUnique({ where: { id }, include: { memberships: true } });
  }
  create(data: Prisma.UserCreateInput) {
    return this.db.user.create({ data, include: { memberships: true } });
  }
}

export class OrganizationRepository {
  constructor(private db: PrismaClient) {}
  create(data: Prisma.OrganizationCreateInput) {
    return this.db.organization.create({ data, include: { memberships: true } });
  }
  listForUser(userId: string) {
    return this.db.organization.findMany({ where: { memberships: { some: { userId } } }, include: { memberships: true } });
  }
  invite(data: Prisma.InvitationCreateInput) {
    return this.db.invitation.create({ data });
  }
}

export class ProjectRepository {
  constructor(private db: PrismaClient) {}
  list(organizationId: string) {
    return this.db.project.findMany({ where: { organizationId }, include: { tasks: true }, orderBy: { updatedAt: "desc" } });
  }
  create(data: Prisma.ProjectUncheckedCreateInput) {
    return this.db.project.create({ data });
  }
}

export class TaskRepository {
  constructor(private db: PrismaClient) {}
  list(organizationId: string) {
    return this.db.task.findMany({ where: { organizationId }, include: { assignee: true, project: true }, orderBy: [{ status: "asc" }, { position: "asc" }] });
  }
  create(data: Prisma.TaskUncheckedCreateInput) {
    return this.db.task.create({ data, include: { assignee: true, project: true } });
  }
  update(id: string, organizationId: string, data: Prisma.TaskUpdateInput) {
    return this.db.task.update({ where: { id, organizationId }, data });
  }
}

export class AuditRepository {
  constructor(private db: PrismaClient) {}
  create(data: Prisma.AuditLogUncheckedCreateInput) {
    return this.db.auditLog.create({ data });
  }
  list(organizationId: string) {
    return this.db.auditLog.findMany({ where: { organizationId }, orderBy: { createdAt: "desc" }, take: 100 });
  }
}
