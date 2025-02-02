import useVisit from "@/hooks/use-visit";
import Expenses from "./expenses";
import Labs from "./labs";
import MedicalInfo from "./medical-info";
import Medication from "./medication";
import PatientInfo from "./patient-info";
import { Route } from "@/routes/visits/$visitId";
import Loader from "@/components/small/loader";
import { formatDateTime } from "@/lib/format";

const VisitDetailsPage = () => {
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

  // Calculate total expenses including medications from stock
  const medicationExpenses = visit.drugs.reduce((acc, drug) => {
    if (drug.fromStock && drug.price) {
      return acc + drug.price;
    }
    return acc;
  }, 0);

  const labFees = visit.labs.reduce((acc, lab) => {
    if (lab.result) {
      return acc + lab.feesKes;
    }
    return acc;
  }, 0);

  const allExpenses = [
    ...visit.expenses,
    {
      name: "Medication",
      amount: medicationExpenses,
    },
    {
      name: "Lab Fees",
      amount: labFees,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Patient Information & Visit Time */}
      <PatientInfo
        name={visit.patient.name}
        id={visit.patient.id}
        arrivalTime={formatDateTime(visit.arrivalTime)}
        leaveTime={visit.leaveTime && formatDateTime(visit.leaveTime)}
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
        patientId={visit.patient.id}
        patientName={visit.patient.name}
      />

      {/* Medications */}
      <Medication drugs={visit.drugs} />

      {/* Expenses */}
      <Expenses expenses={allExpenses} />
    </div>
  );
};

export default VisitDetailsPage;
