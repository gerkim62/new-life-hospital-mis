import Loader from "@/components/small/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addLabResult } from "@/mutations/labs/lab";
import { Route } from "@/routes/visits/$visitId.lazy";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type AddLabResultModalProps = {
  lab: {
    name: string;
    id: string;
  };
  onSubmit: (data: { result: string; comment: string }) => void;
  trigger?: React.ReactNode;
  initialData: { result: string; comment: string } | null;
};

export default function AddLabResultModal({
  lab,
  trigger,
  initialData,
}: AddLabResultModalProps) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(initialData?.result || "");
  const [comment, setComment] = useState(initialData?.comment || "");

  const visitId = Route.useParams().visitId;
  const queryClient = useQueryClient();

  const { mutate: addLabResultMutation, isPending } = useMutation({
    mutationFn: () => addLabResult({ comment, labId: lab.id, value: result }),
    onError: () => {
      console.error("Error adding lab result");
      toast.error("Failed to add lab result");
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Lab result added successfully");
        queryClient.invalidateQueries({
          queryKey: ["visits", visitId],
        });
        queryClient.invalidateQueries({
          queryKey: ["labs"],
        });
        setResult("");
        setComment("");
        setOpen(false);
      } else {
        toast.error(data.message);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLabResultMutation();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            {initialData ? (
              <PencilIcon className="h-4 w-4" />
            ) : (
              <PlusIcon className="h-4 w-4" />
            )}
            {initialData ? "Edit Result" : "Add Result"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Result for {lab.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {isPending && <Loader message="Saving lab result..." />}
          <div className="space-y-2">
            <Label htmlFor="result">Result</Label>
            <Input
              id="result"
              value={result}
              onChange={(e) => setResult(e.target.value)}
              placeholder="Enter lab result"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add any additional comments"
              className="h-32"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Result</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
