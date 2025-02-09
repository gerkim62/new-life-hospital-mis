import Loader from "@/components/small/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addLab } from "@/mutations/labs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  patientName: string;
  patientId: number;
  visitId: string;
};

const AddLabModal = ({ patientName, patientId, visitId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    fees: "",
  });

  const queryClient = useQueryClient();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    addLabMutation();
  };

  const { mutate: addLabMutation, isPending } = useMutation({
    mutationFn: () =>
      addLab({ visitId, ...formData, feesKes: parseFloat(formData.fees) }),
    onSuccess: (data) => {
      console.log("Lab added:", data);
      if (data.success) {
        toast.success("Lab added successfully");
        setIsOpen(false);

        setFormData({ name: "", description: "", fees: "" });

        queryClient.refetchQueries({ queryKey: ["visits", visitId] });
        queryClient.invalidateQueries({
          queryKey: ["labs"],
        });
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      console.error("Error adding lab:", error);
      toast.error("An error occurred. Please try again.");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Add new Lab
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add Lab Test - {patientName} (ID: {patientId})
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {isPending && <Loader message="Adding lab..." />}
          <div className="grid lg:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="name" className="text-sm">
                Lab Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter lab name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="fees" className="text-sm">
                Fees
              </Label>
              <Input
                id="fees"
                name="fees"
                type="number"
                placeholder="Amount"
                value={formData.fees}
                onChange={(e) =>
                  setFormData({ ...formData, fees: e.target.value })
                }
                required
                min="0"
                step="0.01"
                className="mt-1"
              />
            </div>
            <div className="lg:col-span-2">
              <Label htmlFor="description" className="text-sm">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="Brief description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter className="mt-4 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLabModal;
