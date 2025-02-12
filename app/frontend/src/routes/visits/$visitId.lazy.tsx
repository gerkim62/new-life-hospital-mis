import VisitDetailsPage from "@/components/pages/visits/single-visit";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/visits/$visitId")({
  component: VisitDetailsPage,
});
