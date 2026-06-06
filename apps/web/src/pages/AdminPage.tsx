import { Card } from "../components/ui/card";

export function AdminPage() {
  const rows = [
    ["INVITE_CREATED", "Invitation", "2 minutes ago"],
    ["TASK_CREATED", "Task", "14 minutes ago"],
    ["PROJECT_CREATED", "Project", "1 hour ago"]
  ];
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="text-sm text-foreground/60">User management, analytics, roles, and audit visibility.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card><div className="text-sm text-foreground/55">Members</div><div className="mt-2 text-3xl font-semibold">18</div></Card>
        <Card><div className="text-sm text-foreground/55">Audit events</div><div className="mt-2 text-3xl font-semibold">1,284</div></Card>
        <Card><div className="text-sm text-foreground/55">Risk alerts</div><div className="mt-2 text-3xl font-semibold">0</div></Card>
      </div>
      <Card>
        <h2 className="mb-3 font-semibold">Audit log</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="text-foreground/50">
              <tr><th className="py-2">Action</th><th>Entity</th><th>Time</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => <tr key={row[0]} className="border-t border-border"><td className="py-3 font-medium">{row[0]}</td><td>{row[1]}</td><td className="text-foreground/55">{row[2]}</td></tr>)}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
