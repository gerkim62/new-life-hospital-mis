import LabList from "@/components/pages/labs/lab-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/labs/")({
  component: LabList,
});
