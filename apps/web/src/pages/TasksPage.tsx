import { Card } from "../components/ui/card";
import { useTasks } from "../hooks/useWorkspaceData";

const columns = ["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"];

export function TasksPage() {
  const { data: tasks = [] } = useTasks();
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <p className="text-sm text-foreground/60">Status tracking, priorities, labels, owners, and due-date ready records.</p>
      </div>
      <div className="grid gap-3 lg:grid-cols-4">
        {columns.map((column) => (
          <section key={column} className="min-h-96 rounded-lg border border-border bg-muted/40 p-3">
            <h2 className="mb-3 text-xs font-semibold uppercase text-foreground/55">{column.replaceAll("_", " ")}</h2>
            <div className="space-y-3">
              {tasks.filter((task) => task.status === column).map((task) => (
                <Card key={task.id} className="p-3">
                  <div className="text-sm font-medium">{task.title}</div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {task.labels.map((label) => <span key={label} className="rounded bg-muted px-2 py-1 text-xs text-foreground/60">{label}</span>)}
                  </div>
                  <div className="mt-3 text-xs text-foreground/50">{task.priority} · {task.assignee?.name ?? "Unassigned"}</div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
