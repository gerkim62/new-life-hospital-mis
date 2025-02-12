import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Drug, ManualDrug } from "./types";
import { toast } from "react-toastify";

interface ManualEntryProps {
  selectedDrugs: Drug[];
  setSelectedDrugs: React.Dispatch<React.SetStateAction<Drug[]>>;
}

const ManualEntry: React.FC<ManualEntryProps> = ({
  selectedDrugs,
  setSelectedDrugs,
}) => {
  const [manualEntry, setManualEntry] = useState<ManualDrug>({
    name: "",
    description: "",
    dosage: "",
    quantity: null,
  });

  const handleManualAdd = () => {
    if (manualEntry.name && manualEntry.dosage) {
      setSelectedDrugs([...selectedDrugs, manualEntry]);

      toast.info(`Added ${manualEntry.name}. Don't forget to save!`);
      setManualEntry({
        name: "",
        description: "",
        dosage: "",
        quantity: null,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          value={manualEntry.name}
          onChange={(e) =>
            setManualEntry({ ...manualEntry, name: e.target.value })
          }
          placeholder="Enter drug name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Dosage</Label>
        <Input
          value={manualEntry.dosage}
          onChange={(e) =>
            setManualEntry({ ...manualEntry, dosage: e.target.value })
          }
          placeholder="Enter dosage"
          required
        />
      </div>{" "}
      <div className="space-y-2">
        <Label>Quantity (optional)</Label>
        <Input
          type="number"
          value={manualEntry.quantity ?? ""}
          onChange={(e) =>
            setManualEntry({
              ...manualEntry,
              quantity: parseInt(e.target.value),
            })
          }
          placeholder="Enter quantity"
        />
      </div>
      <div className="space-y-2">
        <Label>Description (optional)</Label>
        <Textarea
          value={manualEntry.description || ""}
          onChange={(e) =>
            setManualEntry({ ...manualEntry, description: e.target.value })
          }
          placeholder="Enter description"
          required
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleManualAdd}
          disabled={!manualEntry.name || !manualEntry.dosage}
        >
          Add Drug
        </Button>
      </div>
    </div>
  );
};

export default ManualEntry;
