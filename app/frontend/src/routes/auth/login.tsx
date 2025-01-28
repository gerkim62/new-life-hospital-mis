import LoginPage from "@/components/pages/auth/login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});
