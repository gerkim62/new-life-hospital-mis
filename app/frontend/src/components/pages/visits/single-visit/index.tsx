import useVisit from "@/hooks/use-visit";
import Expenses from "./expenses";
import Labs from "./labs";
import MedicalInfo from "./medical-info";
import Medication from "./medication";
import PatientInfo from "./patient-info";
import { Route } from "@/routes/visits/$visitId.lazy";
import Loader from "@/components/small/loader";
import { formatDateTime } from "@/lib/format";
import useCurrentDate from "@/hooks/use-current-date";

const VisitDetailsPage = () => {
  const currentDate = useCurrentDate();
  const { data, isLoading } = useVisit(Route.useParams().visitId);

  if (!data?.success && !isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">{data?.message}</div>
    );
  }

  if (isLoading) {
    return <Loader message="Fetching details..." />;
  }

  if (!data || !data.success) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        Something went wrong:
        {data?.message}
      </div>
    );
  }

  const visit = data.visit;

  console.log(visit.labs);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Patient Information & Visit Time */}
      <PatientInfo
        name={visit.patient.name}
        id={visit.patient.id}
        arrivalTime={formatDateTime(visit.arrivalTime)}
        leaveTime={visit.leaveTime && formatDateTime(visit.leaveTime)}
        bedNumber={visit.admissionBed}
      />

      {/* Lab Results */}
      <Labs
        labs={visit.labs.map((lab) => ({
          name: lab.name,
          description: lab.description,
          status: lab.status,
          result: lab.result?.value ?? null,
          comment: lab.result?.comment ?? null,
          fees: lab.feesKes,
          id: lab.id,
        }))}
        patientId={visit.patient.id}
        patientName={visit.patient.name}
        visitId={visit.id}
      />

      {/* Medical Information */}
      <MedicalInfo
        diagnosis={visit.diagnosis}
        notes={visit.notes}
        symptoms={visit.symptoms}
        treatment={visit.treatment}
        labs={
          visit.labs.map((lab) => ({
            name: lab.name,
            price: lab.feesKes,
            description: lab.description,
            comment: lab.result?.comment ?? null,
            result: lab.result?.value ?? null,
          })) ?? []
        }
        medications={
          visit.drugs.map((drug) => ({
            name: drug.name,
            price: drug.price,
            description: drug.description,
            dosage: drug.dosage,
            fromStock: drug.fromStock,
          })) ?? []
        }
        patient={{
          name: visit.patient.name,
          arrivalTime: visit.arrivalTime,
          id: visit.patient.id,
          printedTime: new Date(currentDate),
          admissionBed: visit.admissionBed,
        }}
      />

      {/* Medications */}
      <Medication drugs={visit.drugs} />

      {/* Expenses */}
      <Expenses
        patient={{
          name: visit.patient.name,
          arrivalTime: visit.arrivalTime,
          id: visit.patient.id,
          printedTime: new Date(currentDate),
        }}
        labs={
          visit.labs.map((lab) => ({
            name: lab.name,
            price: lab.feesKes,
          })) ?? []
        }
        medications={
          visit.drugs
            .filter((drug) => drug.fromStock)
            .map((drug) => ({
              name: drug.name,
              price: drug.price,
              description: drug.description ?? undefined,
            })) ?? []
        }
        otherExpenses={
          visit.expenses.map((expense) => ({
            name: expense.name,
            price: expense.amount,
            description: expense.description ?? undefined,
          })) ?? []
        }
      />
    </div>
  );
};

export default VisitDetailsPage;
