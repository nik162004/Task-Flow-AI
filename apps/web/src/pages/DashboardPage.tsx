import { motion } from "framer-motion";
import { Activity, ArrowUpRight, Clock3, Target, Zap } from "lucide-react";
import { Card } from "../components/ui/card";
import { useProjects, useTasks } from "../hooks/useWorkspaceData";

const metrics = [
  { label: "Active projects", value: "8", delta: "+12%", icon: Target },
  { label: "Done this week", value: "42", delta: "+18%", icon: Zap },
  { label: "Cycle time", value: "3.4d", delta: "-9%", icon: Clock3 },
  { label: "Utilization", value: "82%", delta: "+6%", icon: Activity }
];

export function DashboardPage() {
  const { data: projects = [] } = useProjects();
  const { data: tasks = [] } = useTasks();
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Command center</h1>
          <p className="mt-1 text-sm text-foreground/60">Live portfolio health across your active organization.</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => (
          <motion.div key={metric.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
            <Card>
              <div className="mb-5 flex items-center justify-between text-foreground/55">
                <metric.icon size={18} />
                <span className="text-xs font-medium text-brand">{metric.delta}</span>
              </div>
              <div className="text-3xl font-semibold">{metric.value}</div>
              <div className="mt-1 text-sm text-foreground/55">{metric.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Project pulse</h2>
            <ArrowUpRight size={17} className="text-foreground/45" />
          </div>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center gap-3 rounded-md border border-border p-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: project.color }} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{project.name}</div>
                  <div className="text-xs text-foreground/50">{project.key} · {project.status}</div>
                </div>
                <div className="h-2 w-28 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-brand" style={{ width: `${project.key.length * 18 + 22}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 font-semibold">Priority queue</h2>
          <div className="space-y-3">
            {tasks.slice(0, 4).map((task) => (
              <div key={task.id} className="rounded-md bg-muted p-3">
                <div className="text-sm font-medium">{task.title}</div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-foreground/55">
                  <span>{task.priority}</span>
                  <span>{task.status.replaceAll("_", " ")}</span>
                  <span>{task.project?.name}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
