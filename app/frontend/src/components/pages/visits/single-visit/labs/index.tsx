import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddLabModal from "./add-lab-modal";
import LabItem from "./lab-item";

type Lab = {
  status: string;
  result: string | null;
  comment: string | null;
  name: string;
  description: string;
  fees: number;
};

type Props = {
  labs: Lab[];
  patientId: number;
  patientName: string;
  visitId: string;
};

export default function Labs({ labs, patientId, patientName, visitId }: Props) {
  function handleEdit(labId: number) {
    console.log(`Editing lab: ${labId}`);
  }

  function handleViewResults(labId: number) {
    console.log(`Viewing results for lab: ${labId}`);
  }

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Labs</CardTitle>
        <AddLabModal
          patientId={patientId}
          patientName={patientName}
          visitId={visitId}
        />
      </CardHeader>
      <CardContent>
        {labs.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No labs available
          </div>
        ) : (
          <div className="space-y-6">
            {labs.map((lab, index) => (
              <LabItem
                key={index}
                lab={lab}
                index={index}
                isLast={index === labs.length - 1}
                onEdit={handleEdit}
                onViewResults={handleViewResults}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}