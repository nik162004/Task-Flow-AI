import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useProjects } from "../hooks/useWorkspaceData";

export function ProjectsPage() {
  const { data: projects = [] } = useProjects();
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-foreground/60">Tenant-scoped project portfolios and delivery status.</p>
        </div>
        <Button><Plus size={16} /> New</Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="min-h-44">
            <div className="mb-6 flex items-start justify-between">
              <span className="rounded-md px-2 py-1 text-xs font-semibold text-white" style={{ backgroundColor: project.color }}>{project.key}</span>
              <span className="text-xs text-foreground/50">{project.status}</span>
            </div>
            <h2 className="text-lg font-semibold">{project.name}</h2>
            <p className="mt-2 text-sm leading-6 text-foreground/58">Tasks, files, analytics, and audit trails stay isolated to this organization.</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
