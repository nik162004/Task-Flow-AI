import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { AdminPage } from "../pages/AdminPage";
import { BillingPage } from "../pages/BillingPage";
import { DashboardPage } from "../pages/DashboardPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { TasksPage } from "../pages/TasksPage";
import { useSessionStore } from "../store/session";

vi.mock("../lib/api", () => ({
  api: {
    get: vi.fn(async () => ({ data: [] })),
    post: vi.fn(async () => ({ data: {} })),
    interceptors: { request: { use: vi.fn() } }
  }
}));

function renderWithQuery(ui: ReactElement) {
  return render(<QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>);
}

describe("workspace pages", () => {
  it("renders dashboard, project, and task surfaces", () => {
    renderWithQuery(<DashboardPage />);
    expect(screen.getByText("Command center")).toBeInTheDocument();
    expect(screen.getByText("Active projects")).toBeInTheDocument();

    cleanup();
    renderWithQuery(<ProjectsPage />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /new/i })).toBeInTheDocument();

    cleanup();
    renderWithQuery(<TasksPage />);
    expect(screen.getByText("Tasks")).toBeInTheDocument();
    expect(screen.getAllByText("IN PROGRESS").length).toBeGreaterThan(0);
  });

  it("renders billing and admin operations", () => {
    render(<BillingPage />);
    expect(screen.getByText("Stripe checkout, subscriptions, invoice history, and plan controls.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /choose pro/i })).toBeInTheDocument();

    render(<AdminPage />);
    expect(screen.getByText("Audit log")).toBeInTheDocument();
    expect(screen.getByText("INVITE_CREATED")).toBeInTheDocument();
  });
});

describe("session store", () => {
  it("toggles theme and clears session", () => {
    useSessionStore.getState().setSession({ accessToken: "token", user: { id: "u1", name: "Ada", email: "ada@example.com" }, organizations: [{ id: "org1" }] });
    const before = useSessionStore.getState().dark;
    useSessionStore.getState().toggleTheme();
    expect(useSessionStore.getState().dark).toBe(!before);
    useSessionStore.getState().logout();
    expect(useSessionStore.getState().token).toBeUndefined();
  });
});
