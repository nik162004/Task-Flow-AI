import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import App from "../App";
import { useSessionStore } from "../store/session";

vi.mock("../lib/api", () => ({
  api: {
    get: vi.fn(async () => ({ data: [] })),
    post: vi.fn(async () => ({ data: {} })),
    interceptors: { request: { use: vi.fn() } }
  }
}));

function renderApp(route = "/") {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("App", () => {
  it("renders login for anonymous users", () => {
    useSessionStore.getState().logout();
    renderApp("/");
    expect(screen.getByText("TaskFlow AI")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create workspace/i })).toBeInTheDocument();
  });

  it("renders the protected dashboard for authenticated users", () => {
    useSessionStore.getState().setSession({ accessToken: "token", user: { id: "u1", name: "Ada", email: "ada@example.com" }, organizations: [{ id: "org1" }] });
    renderApp("/");
    expect(screen.getByText("Command center")).toBeInTheDocument();
    expect(screen.getByText("Project pulse")).toBeInTheDocument();
  });
});
