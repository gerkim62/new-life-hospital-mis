import VisitDetailsPage from "@/components/pages/visits/single-visit";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/visits/$visitId")({
  component: VisitDetailsPage,
});
