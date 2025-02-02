import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Pencil } from "lucide-react";
import AddLabModal from "./add-lab-modal";

type Lab = {
  status: string;
  result: string | null;
  comment: string | null;
  name: string;
  description: string;
  fees: number; // Added fees field
};

type Props = {
  labs: Lab[];
  patientId: number;
  patientName: string;
  visitId: string;
};

export default function Labs({ labs
  ,
  patientId,
  patientName,
  visitId,
 }: Props) {
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
              <div key={index} className="relative">
                <div className="flex justify-end gap-2 absolute right-0 top-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewResults(index)}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(index)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4 pr-20">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{lab.name}</h3>
                      <span className="text-sm font-medium text-gray-900">
                        KES {lab.fees.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">{lab.description}</p>
                    <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Status: {lab.status}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-900">Result</h3>
                    <p className="mt-1">{lab.result}</p>
                    {lab.comment && (
                      <p className="text-gray-500 text-sm mt-2">
                        Comment: {lab.comment}
                      </p>
                    )}
                  </div>
                </div>

                {index < labs.length - 1 && (
                  <div className="border-b border-gray-200 my-6" />
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
