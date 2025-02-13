import { Clock, ArrowLeft, Hospital } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MarkAsLeftModal from "./mark-as-left";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import AdmitPatientModal from "./admit-patient-modal";

type Props = {
  name: string;
  id: number;
  arrivalTime: string;
  leaveTime: string | null;
  bedNumber: string | null;
};

export default function PatientInfo({
  name,
  id,
  arrivalTime,
  leaveTime,
  bedNumber,
}: Props) {
  const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false);

  return (
    <Card className="border-l-4 border-blue-500 shadow-md p-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              {name} ({bedNumber ? "Inpatient" : "Outpatient"})
            </CardTitle>
            <p className="text-gray-500 text-sm">Patient Number: {id}</p>
            {bedNumber && (
              <p className="text-gray-500 text-sm">Bed Number: {bedNumber}</p>
            )}
          </div>
          {!leaveTime && <MarkAsLeftModal />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-6 items-center text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Arrived: {arrivalTime}</span>
            </div>
            {leaveTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Left: {leaveTime}</span>
              </div>
            )}
          </div>

          {!bedNumber && (
            <Button
              onClick={() => setIsAdmitModalOpen(true)}
              variant="default"
              className="w-fit flex items-center gap-2"
            >
              <Hospital className="h-4 w-4" />
              Admit Patient
            </Button>
          )}

          <Button
            asChild
            variant="ghost"
            className="w-fit flex items-center gap-2"
          >
            <Link
              to="/visits"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              View All Visits
            </Link>
          </Button>
        </div>
      </CardContent>
      {isAdmitModalOpen && (
        <AdmitPatientModal onClose={() => setIsAdmitModalOpen(false)} />
      )}
    </Card>
  );
}
