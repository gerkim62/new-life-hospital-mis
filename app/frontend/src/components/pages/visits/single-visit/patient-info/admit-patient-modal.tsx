import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVisit } from "@/mutations/visit";
import { Route } from "@/routes/visits/$visitId";
import { toast } from "react-toastify";
import Loader from "@/components/small/loader";

interface AdmitPatientModalProps {
  onClose: () => void;
}

const AdmitPatientModal: React.FC<AdmitPatientModalProps> = ({ onClose }) => {
  const [bedNumber, setBedNumber] = useState("");
  const visitId = Route.useParams().visitId;
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: () =>
      updateVisit({
        visitId,
        admissionBed: bedNumber,
      }),
    onError: () => toast.error("Something went wrong, please retry."),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Patient admitted successfully.");

        queryClient.refetchQueries({
          queryKey: ["visits"],
        });
        onClose();
      } else {
        toast.error(data.message);
      }
    },
  });

  const handleAdmit = () => {
    console.log("Patient admitted to bed:", bedNumber);
    mutate();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Admit Patient</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <strong>Patient Name:</strong> John Doe
          </p>
          <p>
            <strong>Patient ID:</strong> 123456
          </p>
          <div>
            <Label htmlFor="bedNumber">Bed Number</Label>
            <Input
              id="bedNumber"
              placeholder="Enter bed number"
              value={bedNumber}
              onChange={(e) => setBedNumber(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAdmit} disabled={!bedNumber.trim()}>
            Admit
          </Button>
        </DialogFooter>
        {isPending && <Loader message="Admitting patient..." />}
      </DialogContent>
    </Dialog>
  );
};

export default AdmitPatientModal;
