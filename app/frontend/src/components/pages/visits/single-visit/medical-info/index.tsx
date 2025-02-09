import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MedicalInfoEdit from "./edit-modal";
import { Route } from "@/routes/visits/$visitId";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="flex items-center space-x-2">
          <Button
          variant={"outline"}
            type="button"
            onClick={() => console.log("Download Report clicked")}
            className="inline-flex items-center space-x-1 px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            <span>Report</span>
          </Button>
          <MedicalInfoEdit
            diagnosis={diagnosis ?? ""}
            treatment={treatment ?? ""}
            notes={notes ?? ""}
            patientId={patientId}
            patientName={patientName}
            symptoms={symptoms}
            visitId={visitId}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-medium text-gray-900">Symptoms</h3>
            <p className="mt-1 text-gray-600  whitespace-pre-wrap ">{symptoms}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Diagnosis</h3>
            <p
              className={`mt-1 whitespace-pre-wrap ${
                diagnosis ? "text-gray-600" : "text-gray-400 italic"
              }`}
            >
              {diagnosis ?? "No diagnosis added"}
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Treatment</h3>
          <p
            className={`mt-1 whitespace-pre-wrap ${
              treatment ? "text-gray-600" : "text-gray-400 italic"
            }`}
          >
            {treatment ?? "No treatment added"}
          </p>
        </div>
        {notes && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="font-medium text-gray-900">Notes</h3>
            <p
              className={`mt-1 whitespace-pre-wrap ${
                notes ? "text-gray-600" : "text-gray-400 italic"
              }`}
            >
              {notes ?? "No notes added"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
