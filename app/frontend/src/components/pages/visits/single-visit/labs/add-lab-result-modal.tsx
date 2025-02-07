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
import { useState } from "react";

type AddLabResultModalProps = {
  lab: {
    name: string;
  };
  onSubmit: (data: { result: string; comment: string }) => void;
  trigger?: React.ReactNode;
};

export default function AddLabResultModal({ 
  lab, 
  onSubmit,
  trigger 
}: AddLabResultModalProps) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ result, comment });
    setResult("");
    setComment("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            Add Lab Result
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Result for {lab.name}</DialogTitle>
       
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
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
            <Button type="submit">
              Save Result
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}