import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MedicalInfoEdit from "./edit-modal";
import { Route } from "@/routes/visits/$visitId";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import MedicalReportPdf, {
  MedicalReportProps,
} from "@/components/pdf/medical-report";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { formatDateTime } from "@/lib/format";
import { toast } from "react-toastify";
import { printPDF } from "@/lib/print";

type Props = MedicalReportProps;
// {
//   symptoms: string;
//   diagnosis: string | null;
//   treatment: string | null;
//   notes: string | null;
//   patientId: number;
//   patientName: string;
// };

export default function MedicalInfo(props: Props) {
  const visitId = Route.useParams().visitId;
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Medical Information
        </CardTitle>
        <div className="flex items-center space-x-2">
          {/* <Button
            variant={"outline"}
            type="button"
            onClick={() => console.log("Download Report clicked")}
            className="inline-flex items-center space-x-1 px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            <span>Report</span>
          </Button> */}
          <PDFDownloadLink
            document={<MedicalReportPdf {...props} />}
            fileName={`Report-${props.patient.name}-PatientID:${props.patient.id}----------${formatDateTime(new Date())}.pdf`}
          >
            {({ url, loading, error }) => (
              <Button
                onClick={() => {
                  if (!url) return toast.error("Error generating PDF Report");
                  printPDF(url);
                }}
                disabled={Boolean(loading || error)}
                className="flex gap-2"
              >
                <Download className="h-4 w-4" />
                {loading
                  ? "Loading report..."
                  : error
                    ? "Error loading report"
                    : "Report"}
              </Button>
            )}
          </PDFDownloadLink>
          <MedicalInfoEdit
            diagnosis={props.diagnosis ?? ""}
            treatment={props.treatment ?? ""}
            notes={props.notes ?? ""}
            patientId={props.patient.id}
            patientName={props.patient.name}
            symptoms={props.symptoms ?? ""}
            visitId={visitId}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-medium text-gray-900">Symptoms</h3>
            <p className="mt-1 text-gray-600  whitespace-pre-wrap ">
              {props.symptoms}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Diagnosis</h3>
            <p
              className={`mt-1 whitespace-pre-wrap ${
                props.diagnosis ? "text-gray-600" : "text-gray-400 italic"
              }`}
            >
              {props.diagnosis ?? "No diagnosis added"}
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Treatment</h3>
          <p
            className={`mt-1 whitespace-pre-wrap ${
              props.treatment ? "text-gray-600" : "text-gray-400 italic"
            }`}
          >
            {props.treatment ?? "No treatment added"}
          </p>
        </div>
        {props.notes && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="font-medium text-gray-900">Notes</h3>
            <p
              className={`mt-1 whitespace-pre-wrap ${
                props.notes ? "text-gray-600" : "text-gray-400 italic"
              }`}
            >
              {props.notes ?? "No notes added"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
