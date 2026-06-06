import { BarChart3, Bell, CreditCard, KanbanSquare, LogOut, Moon, Shield, Sparkles, Sun, Users } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useSessionStore } from "../store/session";
import { cn } from "../lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: BarChart3 },
  { to: "/projects", label: "Projects", icon: KanbanSquare },
  { to: "/tasks", label: "Tasks", icon: Sparkles },
  { to: "/billing", label: "Billing", icon: CreditCard },
  { to: "/admin", label: "Admin", icon: Shield }
];

export function Shell() {
  const { user, dark, toggleTheme, logout } = useSessionStore();
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-border bg-white/80 p-4 backdrop-blur-xl dark:bg-black/20 lg:block">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-brand text-sm font-black text-brand-ink">TF</div>
          <div>
            <div className="text-sm font-semibold">TaskFlow AI</div>
            <div className="text-xs text-foreground/55">Acme AI workspace</div>
          </div>
        </div>
        <nav className="space-y-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground/70 transition hover:bg-muted hover:text-foreground", isActive && "bg-muted text-foreground")
              }
            >
              <item.icon size={17} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-brand font-black text-brand-ink">TF</div>
            <span className="font-semibold">TaskFlow AI</span>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-foreground/60 lg:flex">
            <Users size={15} />
            Multi-tenant workspace
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" title="Notifications" className="h-9 w-9 px-0"><Bell size={17} /></Button>
            <Button variant="ghost" title="Toggle theme" className="h-9 w-9 px-0" onClick={toggleTheme}>{dark ? <Sun size={17} /> : <Moon size={17} />}</Button>
            <div className="hidden text-right sm:block">
              <div className="text-sm font-medium">{user?.name ?? "Demo Founder"}</div>
              <div className="text-xs text-foreground/50">{user?.email ?? "demo@taskflow.ai"}</div>
            </div>
            <Button variant="outline" title="Log out" className="h-9 w-9 px-0" onClick={logout}><LogOut size={16} /></Button>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
