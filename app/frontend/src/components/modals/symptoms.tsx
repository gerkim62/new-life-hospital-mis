import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import usePatient from "@/hooks/use-patient";
import { createVisit } from "@/mutations/visit";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../small/loader";
import OnAddedSymptoms from "./on-added-symptoms";

type SymptomsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  patientId: number;
};

const SymptomsModal = ({
  isOpen,
  onClose = () => {},
  patientId,
}: SymptomsModalProps) => {
  const [symptoms, setSymptoms] = useState("");
  const [showOnAddedSymptomsModal, setShowOnAddedSymptomsModal] =
    useState(false);

  const {
    mutate: mutateVisit,
    isPending: isSubmitting,
    data: visitData,
  } = useMutation({
    mutationFn: () => {
      return createVisit({
        symptoms,
        patientId,
      });
    },
    onError: (error) => {
      console.log(error, "during visit creation");
      toast.error("Error while recording patient symptoms");
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Symptoms recorded successfully");
        setShowOnAddedSymptomsModal(true);
        setSymptoms("");
        onClose();
      } else {
        toast.error(data.message ?? "Something went wrong");
      }
    },
  });

  const { data: patientData } = usePatient(patientId);
  let patientName = "";

  if (patientData?.success) {
    patientName = patientData.patient.name;
  } else {
    toast.error(patientData?.message ?? "Something went wrong");
  }

  const handleSubmit = () => {
    mutateVisit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {showOnAddedSymptomsModal && visitData?.success && (
        <OnAddedSymptoms
          open={showOnAddedSymptomsModal}
          onOpenChange={(open: boolean) => {
            setShowOnAddedSymptomsModal(open);
            if (!open) {
              onClose();
            }
          }}
          visitId={visitData.visit.id}
        />
      )}
      <DialogContent className="sm:max-w-[500px]">
        
      {isSubmitting && <Loader message="Submitting symptoms..." />}
        <DialogHeader>
          <DialogTitle>Patient Symptoms Entry</DialogTitle>
          <DialogDescription>
            Please enter the reason for the patient's visit today
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Patient ID</Label>
            <div className="col-span-3">
              <p className="text-muted-foreground">{patientId}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Name</Label>
            <div className="col-span-3">
              <p className="text-muted-foreground">{patientName}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="symptoms">
              Symptoms
            </Label>
            <Textarea
              id="symptoms"
              className="col-span-3"
              placeholder="Please describe the reason for visit and any symptoms..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={5}
            />
          </div>
        </div>

        <DialogFooter className="space-x-4">
          <Button
          disabled={isSubmitting}
           variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
          disabled={isSubmitting}
           onClick={handleSubmit} disabled={!symptoms.trim()}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SymptomsModal;
