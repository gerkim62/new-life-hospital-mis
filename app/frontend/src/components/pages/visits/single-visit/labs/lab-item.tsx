import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Clipboard,
  Edit,
  Eye,
  FileText,
  Info,
  MessageSquare
} from "lucide-react";
import AddLabResultModal from "./add-lab-result-modal";

type LabItemProps = {
  lab: {
    status: "DONE" | "IN_PROGRESS" | "PENDING";
    result: string | null;
    comment: string | null;
    name: string;
    description: string;
    fees: number;
    id: string;
  };
  index: number;
  isLast: boolean;
  onEdit: (index: number) => void;
  onViewResults: (index: number) => void;
};

export default function LabItem({
  lab,
  index,
  isLast,
  onEdit,
  onViewResults,
}: LabItemProps) {
  const hasNoResults = !lab.result && !lab.comment;

  const handleSubmitResult = (data: { result: string; comment: string }) => {
    console.log("Submitting result for lab index:", index, data);
    // You can call your API or update state here
  };

  return (
    <div className="relative  ">
      <div className="space-y-4">
        {/* Header Section */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clipboard className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-gray-900">{lab.name}</h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900 flex items-center">
                <span
                className="mr-1 text-muted-foreground"
                >
                  Lab Fees:{" "}
                </span>
                KES {lab.fees.toLocaleString()}
              </span>
              <button
                hidden
                onClick={() => onEdit(index)}
                className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-1">{lab.description}</p>
          <Badge
            className={cn(
              {
                "bg-green-100 text-green-800": lab.status === "DONE",
                "bg-yellow-100 text-yellow-800": lab.status === "IN_PROGRESS",
                "bg-blue-100 text-blue-800": lab.status === "PENDING",
              },
              "my-2"
            )}
          >
            <Info className="w-4 h-4 mr-1" />
            Status: {lab.status}
          </Badge>
        </div>

        {/* Result Section */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-green-500" />
              <h3 className="font-medium text-gray-900">Results</h3>
            </div>
            {hasNoResults ? (
              <AddLabResultModal
                initialData={
                  lab.result
                    ? { result: lab.result, comment: lab.comment ?? "" }
                    : null
                }
                lab={lab}
                onSubmit={handleSubmitResult}
              />
            ) : (
              <>
                <button
                  hidden
                  onClick={() => onViewResults(index)}
                  className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <AddLabResultModal
                  initialData={
                    lab.result
                      ? { result: lab.result, comment: lab.comment ?? "" }
                      : null
                  }
                  lab={lab}
                  onSubmit={handleSubmitResult}
                />
              </>
            )}
          </div>
          {hasNoResults ? (
            <div className="flex items-center gap-2 text-gray-500 mt-2">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">No results provided</span>
            </div>
          ) : (
            <div className="mt-2">
              <p className="text-gray-800">{lab.result}</p>
              {lab.comment && (
                <p className="flex items-center text-gray-500 text-sm mt-2">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  <span>Comment: {lab.comment}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {!isLast && <div className="border-b border-gray-200 my-6" />}
    </div>
  );
}
