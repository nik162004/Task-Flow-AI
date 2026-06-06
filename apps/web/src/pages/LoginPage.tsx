import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Chrome, LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { api } from "../lib/api";
import { useSessionStore } from "../store/session";

export function LoginPage() {
  const navigate = useNavigate();
  const setSession = useSessionStore((state) => state.setSession);
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [form, setForm] = useState({ name: "Demo Founder", email: "demo@taskflow.ai", password: "TaskFlow123!", organizationName: "Acme AI" });
  const mutation = useMutation({
    mutationFn: async () => {
      const endpoint = mode === "signup" ? "/auth/signup" : "/auth/login";
      const { data } = await api.post(endpoint, form);
      return data;
    },
    onSuccess: (data) => {
      setSession(data);
      navigate("/");
    }
  });

  function submit(event: FormEvent) {
    event.preventDefault();
    mutation.mutate();
  }

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[1.1fr_.9fr]">
      <section className="relative flex items-center overflow-hidden px-6 py-12 sm:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(33,198,168,.22),transparent_30%),linear-gradient(135deg,rgba(255,255,255,.16),transparent)]" />
        <div className="relative max-w-2xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm text-foreground/70">
            <LockKeyhole size={15} /> Secure multi-tenant project operations
          </div>
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">TaskFlow AI</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-foreground/65">
            Plan work, assign priorities, manage billing, audit actions, and keep every organization isolated by design.
          </p>
        </div>
      </section>
      <section className="flex items-center justify-center px-6 py-10">
        <Card className="w-full max-w-md p-6">
          <div className="mb-6 flex rounded-md bg-muted p-1">
            {(["signup", "login"] as const).map((item) => (
              <button key={item} onClick={() => setMode(item)} className={`h-9 flex-1 rounded-md text-sm font-medium ${mode === item ? "bg-background shadow-sm" : "text-foreground/55"}`}>
                {item === "signup" ? "Sign up" : "Log in"}
              </button>
            ))}
          </div>
          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && <Input aria-label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />}
            <Input aria-label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input aria-label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            {mode === "signup" && <Input aria-label="Organization" value={form.organizationName} onChange={(e) => setForm({ ...form, organizationName: e.target.value })} />}
            {mutation.isError && <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">The API is not reachable or rejected the request.</div>}
            <Button className="w-full" disabled={mutation.isPending}>{mode === "signup" ? "Create workspace" : "Log in"} <ArrowRight size={16} /></Button>
            <Button type="button" variant="outline" className="w-full"><Chrome size={16} /> Continue with Google</Button>
          </form>
        </Card>
      </section>
    </main>
  );
}
