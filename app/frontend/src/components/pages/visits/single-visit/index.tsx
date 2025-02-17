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
import AdmissionDetails from "./admission";
import { calculateDays } from "@/lib/date";

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
  console.log({ visit });

  const daysSinceAdmission = calculateDays(
    new Date(visit.admission?.admittedAt ?? currentDate),
    new Date(visit.leaveTime ?? currentDate)
  );

  const admissionFees: {
    name: string;
    price: number;
    description: string | undefined;
  }[] = visit.admission
    ? [
        {
          name: "Admission Fee",
          price: visit.admission?.admissionFee ?? 0,
          description: "One time fee for admission",
        },
        {
          name: "Daily Bed Charges (" + daysSinceAdmission + " days)",
          price: (visit.admission?.dailyBedCharges ?? 0) * daysSinceAdmission,
          description: "Daily charges for bed" + daysSinceAdmission + " days",
        },
        {
          name: "Daily Doctor's Fee (" + daysSinceAdmission + " days)",
          price: (visit.admission?.dailyDoctorsFee ?? 0) * daysSinceAdmission,
          description:
            "Daily charges for doctor's visit" + daysSinceAdmission + " days",
        },
        {
          name: "Daily Nurse Care Fee (" + daysSinceAdmission + " days)",
          price: (visit.admission?.dailyNurseCareFee ?? 0) * daysSinceAdmission,
          description:
            "Daily charges for nurse care" + daysSinceAdmission + " days",
        },
        {
          name: "Daily Sundries Fee (" + daysSinceAdmission + " days)",
          price: (visit.admission?.dailySundriesFee ?? 0) * daysSinceAdmission,
          description:
            "Daily charges for sundries" + daysSinceAdmission + " days",
        },
      ]
    : [];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Patient Information & Visit Time */}
      <PatientInfo
        name={visit.patient.name}
        id={visit.patient.id}
        arrivalTime={formatDateTime(visit.arrivalTime)}
        leaveTime={visit.leaveTime && formatDateTime(visit.leaveTime)}
        bedNumber={visit.admission?.bedNumber ?? null}
      />
      {
        /* Admission Details */
        visit.admission ? (
          <AdmissionDetails
            admission={visit.admission}
            endDate={visit.leaveTime}
          />
        ) : (
          <div className="bg-red-100 p-4 rounded-lg">
            Patient is not admitted
          </div>
        )
      }

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
          admissionBed: visit.admission?.bedNumber ?? null,
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
        otherExpenses={(
          visit.expenses.map((expense) => ({
            name: expense.name,
            price: expense.amount,
            description: expense.description ?? undefined,
          })) ?? []
        ).concat(admissionFees)}
      />
    </div>
  );
};

export default VisitDetailsPage;
