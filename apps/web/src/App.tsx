import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useSessionStore } from "./store/session";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { TasksPage } from "./pages/TasksPage";
import { BillingPage } from "./pages/BillingPage";
import { AdminPage } from "./pages/AdminPage";
import { Shell } from "./pages/Shell";

function Protected() {
  const token = useSessionStore((state) => state.token);
  if (!token) return <Navigate to="/login" replace />;
  return <Shell />;
}

export default function App() {
  const dark = useSessionStore((state) => state.dark);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Protected />}>
        <Route index element={<DashboardPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}
