import Loader from "@/components/small/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import usePatient from "@/hooks/use-patient";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { Link } from "@tanstack/react-router";
type Props = {
  transaction: {
    date: Date;
    amount: number;
    description: string | null;
    patientId: number | null;
    visitId: string | null;
    id: string;
  };
};

export default function TransactionDialog({ transaction }: Props) {
  const { data, isPending } = usePatient(transaction.patientId);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent>
        {isPending && <Loader message="Loading details..." />}
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Patient Name:</p>
            <p>{data?.success ? data.patient.name : "N/A"}</p>
          </div>
          <div>
            <p className="font-medium">Amount:</p>
            <p>{formatCurrency(transaction.amount)}</p>
          </div>
          <div>
            <p className="font-medium">Date:</p>
            <p>{formatDateTime(transaction.date)}</p>
          </div>
          <div>
            <p className="font-medium">Description:</p>
            <p>{transaction.description ?? "N/A"}</p>
          </div>
          {/* go to visit */}
          {transaction.visitId ? (
            <Button variant={"outline"} className="w-fit">
              <Link
                className="w-fit"
                to={`/visits/$visitId`}
                params={{ visitId: transaction.visitId }}
              >
                View associated visit &rarr;
              </Link>
            </Button>
          ) : (
            <>
              <p>This transaction is not associated with any patient visit.</p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
