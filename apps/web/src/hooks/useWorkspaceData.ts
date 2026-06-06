import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export type Project = { id: string; name: string; key: string; status: string; color: string; tasks?: Task[] };
export type Task = { id: string; title: string; status: string; priority: string; labels: string[]; project?: { name: string }; assignee?: { name: string } };

export const fallbackProjects: Project[] = [
  { id: "p1", name: "TaskFlow Launch", key: "TF", status: "ACTIVE", color: "#21c6a8" },
  { id: "p2", name: "Enterprise Readiness", key: "ENT", status: "ACTIVE", color: "#7c3aed" },
  { id: "p3", name: "Mobile Workspace", key: "MOB", status: "PAUSED", color: "#f97316" }
];

export const fallbackTasks: Task[] = [
  { id: "t1", title: "Ship organization invitations", status: "IN_PROGRESS", priority: "HIGH", labels: ["teams", "email"], project: { name: "TaskFlow Launch" }, assignee: { name: "Demo Founder" } },
  { id: "t2", title: "Audit billing webhooks", status: "TODO", priority: "URGENT", labels: ["stripe"], project: { name: "Enterprise Readiness" } },
  { id: "t3", title: "Refine mobile task board", status: "IN_REVIEW", priority: "MEDIUM", labels: ["ux"], project: { name: "Mobile Workspace" } },
  { id: "t4", title: "Publish SOC2 evidence checklist", status: "DONE", priority: "HIGH", labels: ["security"], project: { name: "Enterprise Readiness" } }
];

export function useProjects() {
  return useQuery({ queryKey: ["projects"], queryFn: async () => (await api.get<Project[]>("/organizations/current/projects")).data, retry: false, placeholderData: fallbackProjects });
}

export function useTasks() {
  return useQuery({ queryKey: ["tasks"], queryFn: async () => (await api.get<Task[]>("/tasks")).data, retry: false, placeholderData: fallbackTasks });
}
