import Loader from "@/components/small/loader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/format";
import { addMedications } from "@/mutations/medications";
import { Route } from "@/routes/visits/$visitId.lazy";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import HospitalStock from "./HospitalStock";
import ManualEntry from "./ManualEntry";
import SelectedDrugs from "./SelectedDrugs";
import { Drug } from "./types";

type Props = {
  onClose: () => void;
};

function DrugSelectorModal({ onClose }: Props) {
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([]);

  const visitId = Route.useParams().visitId;

  const queryClient = useQueryClient();

  const manualDrugs = selectedDrugs.filter((drug) => !("stockItemId" in drug));
  const fromStockDrugs = selectedDrugs.filter((drug) => "stockItemId" in drug);

  const currentTotal = selectedDrugs.reduce(
    (acc, drug) => acc + ("totalPrice" in drug ? drug.totalPrice : 0),
    0
  );

  const { isPending, mutate } = useMutation({
    mutationFn: () =>
      addMedications({
        medication: {
          fromStock: fromStockDrugs,
          manual: manualDrugs,
        },
        visitId,
      }),
    onError: () => toast.error("Something went wrong!"),
    onSuccess: (data) => {
      if (data.success) {
        setSelectedDrugs([]);
        toast.success("Saved medication successfully");
        onClose();
        queryClient.invalidateQueries({
          queryKey: ["visits"],
        });
        queryClient.invalidateQueries({
          queryKey: ["stock"],
        });
      } else {
        toast.error(data.message);
      }
    },
  });

  const handleSubmit = () => {
    console.log("Submitted drugs:", selectedDrugs);
    mutate();
  };

  return (
    <Dialog onOpenChange={onClose} defaultOpen>
      <DialogContent className="max-w-4xl w-[95vw]">
        {isPending && <Loader message="Saving patient medication..." />}
        <DialogHeader>
          <DialogTitle>
            Select Medication ({formatCurrency(currentTotal)})
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">Hospital Stock</TabsTrigger>
            <TabsTrigger value="manual">
              Not in Stock (Manual Entry)
            </TabsTrigger>
            <TabsTrigger value="selected">
              Selected Medication ({selectedDrugs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <HospitalStock
              setSelectedDrugs={setSelectedDrugs}
              selectedDrugs={selectedDrugs}
            />
          </TabsContent>

          <TabsContent value="manual">
            <ManualEntry
              setSelectedDrugs={setSelectedDrugs}
              selectedDrugs={selectedDrugs}
            />
          </TabsContent>

          <TabsContent value="selected">
            <SelectedDrugs
              selectedDrugs={selectedDrugs}
              setSelectedDrugs={setSelectedDrugs}
              onSubmit={handleSubmit}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default DrugSelectorModal;
