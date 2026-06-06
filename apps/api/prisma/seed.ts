import { PrismaClient, Priority, Role, TaskStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("TaskFlow123!", 12);
  const user = await prisma.user.upsert({
    where: { email: "demo@taskflow.ai" },
    update: {},
    create: {
      email: "demo@taskflow.ai",
      name: "Demo Founder",
      passwordHash,
      emailVerified: true
    }
  });

  const organization = await prisma.organization.upsert({
    where: { slug: "acme-ai" },
    update: {},
    create: {
      name: "Acme AI",
      slug: "acme-ai",
      memberships: { create: { userId: user.id, role: Role.OWNER } },
      subscriptions: { create: { plan: "Pro", status: "ACTIVE" } }
    }
  });

  const project = await prisma.project.upsert({
    where: { organizationId_key: { organizationId: organization.id, key: "TF" } },
    update: {},
    create: {
      organizationId: organization.id,
      key: "TF",
      name: "TaskFlow Launch",
      description: "Launch-ready SaaS workspace for cross-functional teams.",
      color: "#2dd4bf"
    }
  });

  await prisma.task.createMany({
    data: [
      {
        title: "Connect Google OAuth",
        description: "Enable workspace sign-in with managed Google accounts.",
        status: TaskStatus.IN_PROGRESS,
        priority: Priority.HIGH,
        labels: ["auth", "security"],
        organizationId: organization.id,
        projectId: project.id,
        creatorId: user.id,
        assigneeId: user.id
      },
      {
        title: "Prepare billing launch",
        status: TaskStatus.TODO,
        priority: Priority.URGENT,
        labels: ["stripe", "revenue"],
        organizationId: organization.id,
        projectId: project.id,
        creatorId: user.id
      }
    ],
    skipDuplicates: true
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
