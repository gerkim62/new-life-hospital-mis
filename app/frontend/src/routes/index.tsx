import ReceptionPage from "@/components/pages/reception";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: ReceptionPage,
});
