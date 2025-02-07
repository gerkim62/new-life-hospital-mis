import PatientList from '@/components/pages/patients/patient-list'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/patients/')({
  component: PatientList
})
