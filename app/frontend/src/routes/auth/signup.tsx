import SignupPage from "@/components/pages/auth/signup";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signup")({
  component: SignupPage,
});
