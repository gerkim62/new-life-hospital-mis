import PatientProfilePage from "@/components/pages/patients/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/patients/$patientId")({
  component: PatientProfilePage,
});
