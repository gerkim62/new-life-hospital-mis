import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import Loader from "@/components/small/loader";
import { useQuery } from "@tanstack/react-query";
import { getItemMovements } from "@/queries/stock";
import { Route } from "@/routes/stock/$itemId";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { formatCurrency, formatDateTime } from "@/lib/format";

interface StockMovement {
  type: string;
  id: string;
  quantity: number;
  createdAt: Date;
  description: string | null;
  batchPriceKes: number;
  itemId: string;
  patientVisitId: string | null;
}

export default function StockMovementsHistory() {
  const itemId = Route.useParams().itemId;

  const { data, isLoading } = useQuery({
    queryKey: ["stockMovements", itemId],
    queryFn: () => getItemMovements({ id: itemId }),
  });

  const stockMovements: StockMovement[] = data?.success ? data.movements : [];

  useEffect(() => {
    if (data?.success === false) {
      toast.error(data.message);
    }
  }, [data]);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {isLoading && <Loader message="Loading stock movement history..." />}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Stock Movement History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Batch Price</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockMovements.length === 0 && !isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-gray-500 py-4"
                  >
                    No stock movement history available for this item.
                  </TableCell>
                </TableRow>
              ) : (
                stockMovements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell className="font-medium">
                      {movement.type}
                    </TableCell>
                    <TableCell>{movement.description || "N/A"}</TableCell>
                    <TableCell
                      className={
                        movement.type === "IN"
                          ? "text-green-500 font-bold"
                          : "text-yellow-500 font-bold"
                      }
                    >
                      {movement.type === "IN" ? "+" : "-"}
                      {movement.quantity}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(movement.batchPriceKes)}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(
                        movement.batchPriceKes / movement.quantity
                      )}
                    </TableCell>
                    <TableCell>{formatDateTime(movement.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      {movement.patientVisitId ? (
                        <Button asChild size="sm" variant="outline">
                          <Link
                            params={{ visitId: movement.patientVisitId }}
                            to={"/visits/$visitId"}
                          >
                            View Visit &rarr;
                          </Link>
                        </Button>
                      ) : (
                        <span className="text-gray-400 text-sm">
                          No associated Visit
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
