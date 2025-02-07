import { PatientsVisitsList } from '@/components/pages/visits/patient-visits'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/visits/')({
  component: PatientsVisitsList
})


