import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ClipboardEdit } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  visitId: string;
};

const OnAddedSymptoms = ({ open, onOpenChange, visitId }: Props) => {
  const navigate = useNavigate();

  const handleReceptionClick = () => {
    console.log("Navigating to reception screen");
    onOpenChange(false);
  };

  const handleDetailsClick = () => {
    console.log("Navigating to patient visit details");
    onOpenChange(false);

    navigate({
      to: `/visits/$visitId`,
      params: { visitId },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Patient Actions</DialogTitle>
          <DialogDescription>
            Choose where you would like to navigate
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleReceptionClick}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to reception screen (Esc)
          </Button>
          <Button
            className="flex items-center gap-2"
            onClick={handleDetailsClick}
          >
            <ClipboardEdit className="h-4 w-4" />
            Add more details on this patient's visit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnAddedSymptoms;
