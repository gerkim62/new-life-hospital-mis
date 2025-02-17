import Loader from "@/components/small/loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { markVisitAsLeft } from "@/mutations/visit";
import { Route } from "@/routes/visits/$visitId.lazy";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

const MarkAsLeftModal = () => {
  const visitId = Route.useParams().visitId;

  const queryClient = useQueryClient();

  const { mutate: markAsLeft, isPending: isLoading } = useMutation({
    mutationFn: () => markVisitAsLeft(visitId),
    onSuccess: (data) => {
      console.log("Patient marked as left", data);
      if (data.success) {
        toast.success("Patient marked as left successfully");
        queryClient.invalidateQueries({
          queryKey: ["visits", visitId],
        });
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      console.log("Error marking patient as left", error);
      toast.error("An error occurred. Please try again.");
    },
  });
  function onConfirm() {
    console.log("Marking patient as left");
    markAsLeft();
  }
  return (
    <AlertDialog>
      {isLoading && <Loader message="Marking patient as left..." />}
      <AlertDialogTrigger asChild>
        <Button
        id="mark-as-left-btn"
         className="gap-2">
          <CheckCircle className="w-4 h-4" />
          Discharge Patient
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Confirm Patient Release
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            This will indicate that the patient has been discharged from the hospital. After
            discharging, you won't be able to:
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Update lab results</li>
              <li>Add or modify expenses</li>
              <li>Update medications</li>
            </ul>
            <div className="mt-4 font-medium text-muted-foreground">
              This change is permanent and applies for the current visit only.
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} className="text-sm">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={onConfirm}
            className="bg-primary hover:bg-primary/90 text-sm"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MarkAsLeftModal;
