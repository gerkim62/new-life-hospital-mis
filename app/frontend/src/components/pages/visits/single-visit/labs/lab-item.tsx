import { FileText } from "lucide-react";
import AddLabResultModal from "./add-lab-result-modal";

type LabItemProps = {
  lab: {
    status: string;
    result: string | null;
    comment: string | null;
    name: string;
    description: string;
    fees: number;
  };
  index: number;
  isLast: boolean;
  onEdit: (index: number) => void;
  onViewResults: (index: number) => void;
};

export default function LabItem({ lab, index, isLast,  }: LabItemProps) {
  const hasNoResults = !lab.result && !lab.comment;

  const handleSubmitResult = (data: { result: string; comment: string }) => {
    console.log("Submitting result for lab index:", index, data);
    // You can call your API or update state here
  };

  return (
    <div className="relative">
      <div className="space-y-4">
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
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Result</h3>
            {hasNoResults && (
              <AddLabResultModal
                lab={lab}
                onSubmit={handleSubmitResult}
              />
            )}
          </div>
          {hasNoResults ? (
            <div className="flex items-center gap-2 text-gray-500 mt-2">
              <FileText className="h-4 w-4" />
              <span className="text-sm">No results provided</span>
            </div>
          ) : (
            <>
              <p className="mt-1">{lab.result}</p>
              {lab.comment && (
                <p className="text-gray-500 text-sm mt-2">
                  Comment: {lab.comment}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {!isLast && <div className="border-b border-gray-200 my-6" />}
    </div>
  );
}