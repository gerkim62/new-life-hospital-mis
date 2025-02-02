import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MedicalInfoEdit from "./edit-modal";
import { Route } from "@/routes/visits/$visitId";

type Props = {
  symptoms: string;
  diagnosis: string | null;
  treatment: string | null;
  notes: string | null;
  patientId: number;
  patientName: string;
};

export default function MedicalInfo({
  symptoms,
  diagnosis = "Not available",
  treatment = "Not available",
  notes = "Not available",
  patientId,
  patientName,
}: Props) {
  const visitId = Route.useParams().visitId;
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Medical Information
        </CardTitle>
        <MedicalInfoEdit
        
          diagnosis={diagnosis ?? ""}
          treatment={treatment ?? ""}
          notes={notes ?? ""}
          patientId={patientId}
          patientName={patientName}
          symptoms={symptoms}
          visitId={visitId}
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-medium text-gray-900">Symptoms</h3>
            <p className="mt-1 text-gray-600">{symptoms}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Diagnosis</h3>
            <p
              className={`mt-1 ${diagnosis ? "text-gray-600" : "text-gray-400 italic"}`}
            >
              {diagnosis ?? "No diagnosis added"}
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Treatment</h3>
          <p
            className={`mt-1 ${treatment ? "text-gray-600" : "text-gray-400 italic"}`}
          >
            {treatment ?? "No treatment added"}
          </p>
        </div>
        {notes && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="font-medium text-gray-900">Notes</h3>
            <p
              className={`mt-1 ${notes ? "text-gray-600" : "text-gray-400 italic"}`}
            >
              {notes ?? "No notes added"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
