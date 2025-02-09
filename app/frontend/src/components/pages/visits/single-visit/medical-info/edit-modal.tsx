import Loader from "@/components/small/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateVisit } from "@/mutations/visit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  symptoms: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  patientId: number;
  patientName: string;
  visitId: string;
};

export default function MedicalInfoEdit({
  symptoms,
  diagnosis,
  treatment,
  notes,
  patientId,
  patientName,
  visitId,
}: Props) {
  const queryClient = useQueryClient();
  const { isPending, mutate: mutateVisit } = useMutation({
    mutationFn: () => updateVisit({ ...data, visitId }),
    onError: (error) => {
      console.log(error, "during visit update");
      toast.error("Failed to update this visit");
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Visit updated successfully");
        queryClient.refetchQueries({ queryKey: ["visits", visitId] });
      } else {
        toast.error(data.message);
      }
    },
  });

  const [data, setData] = useState({
    diagnosis,
    treatment,
    notes,
    symptoms,
  });

  return (
    <Dialog>
      {isPending && <Loader message="Updating this visit..." />}
      <DialogTrigger asChild>
        <Button variant="outline" >
          <Pencil className="h-4 w-4" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-sm">
            {patientName} - Patient ID: {patientId}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="symptoms" className="text-xs font-medium">
                Symptoms
              </Label>
              <Textarea
                value={data.symptoms}
                onChange={(e) => setData({ ...data, symptoms: e.target.value })}
                id="symptoms"
                defaultValue={symptoms}
                className="mt-1"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="diagnosis" className="text-xs font-medium">
                Diagnosis
              </Label>
              <Textarea
              required
              minLength={1}
                id="diagnosis"
                defaultValue={diagnosis || ""}
                className="mt-1"
                rows={2}
                onChange={(e) =>
                  setData({ ...data, diagnosis: e.target.value })
                }
                value={data.diagnosis}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="treatment" className="text-xs font-medium">
                Treatment
              </Label>
              <Textarea
              required
              minLength={1}
                id="treatment"
                defaultValue={treatment || ""}
                className="mt-1"
                rows={2}
                onChange={(e) =>
                  setData({ ...data, treatment: e.target.value })
                }
                value={data.treatment}
              />
            </div>

            <div>
              <Label htmlFor="notes" className="text-xs font-medium">
                Notes
              </Label>
              <Textarea
              
                id="notes"
                defaultValue={notes || ""}
                className="mt-1"
                rows={2}
                onChange={(e) => setData({ ...data, notes: e.target.value })}
                value={data.notes}
              />
            </div>
          </div>

          <DialogClose asChild>
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  mutateVisit();
                }}
                size="sm"
              >
                Save Changes
              </Button>
            </div>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
