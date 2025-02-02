import { Clock, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MarkAsLeftModal from "./mark-as-left";

type Props = {
  name: string;
  id: number;
  arrivalTime: string;
  leaveTime: string | null;
};

export default function PatientInfo({
  name,
  id,
  arrivalTime,
  leaveTime,
}: Props) {
  function handleMarkAsLeft() {
    console.log("Marking patient as left");
  }

  function handleViewAllVisits() {
    console.log("Viewing all visits");
  }

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold">{name}</CardTitle>
            <p className="text-gray-500 text-sm">Patient ID: {id}</p>
          </div>
          {!leaveTime && <MarkAsLeftModal />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-6 items-center text-gray-600">
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
          <Button
            variant="ghost"
            className="w-fit flex items-center gap-2"
            onClick={handleViewAllVisits}
          >
            <ArrowLeft className="h-4 w-4" />
            View All Visits
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
