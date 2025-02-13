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
import { getItemMovements, getStockItem } from "@/queries/stock";
import { Route } from "@/routes/stock/$itemId";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { ArrowLeft } from "lucide-react";

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

  const { data: itemData, isLoading: isItemLoading } = useQuery({
    queryKey: ["stockItems", itemId],
    queryFn: () => getStockItem(itemId),
  });

  const item = itemData?.success ? itemData.item : null;

  const stockMovements: StockMovement[] = data?.success ? data.movements : [];

  useEffect(() => {
    if (data?.success === false) {
      toast.error(data.message);
    }
  }, [data]);

  // Calculate totals
  const totalKshIn = stockMovements
    .filter((m) => m.type === "IN")
    .reduce((sum, m) => sum + m.batchPriceKes, 0);

  const totalKshOut = stockMovements
    .filter((m) => m.type === "OUT")
    .reduce((sum, m) => sum + m.batchPriceKes, 0);

  const revenue = totalKshOut - totalKshIn;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {isLoading && <Loader message="Loading stock movement history..." />}

      {/* Item Details */}

      <Card className="mb-4 shadow-sm border border-gray-200 bg-white">
        <CardHeader className="flex flex-row items-center justify-between p-3 border-b">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Item Details
          </CardTitle>
          <Button
            asChild
            variant="ghost"
            className="text-blue-600 hover:bg-blue-50"
          >
            <Link to="/stock">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Stock
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-3 text-sm">
          {isItemLoading ? (
            <div className="text-center py-2 text-gray-500">
              Loading item...
            </div>
          ) : item ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium">{item.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Description</p>
                <p>{item.description || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500">Quantity</p>
                <p className="font-bold text-blue-600">
                  {item.quantity} {item.unit}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              {itemData?.message ?? "Could not load item details."}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="bg-blue-50 border border-blue-200 shadow-sm">
          <CardContent className="p-4">
            <p className="text-blue-800 text-lg font-semibold">Total In</p>
            <p className="text-2xl font-bold text-green-700">
              {formatCurrency(totalKshIn)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border border-red-200 shadow-sm">
          <CardContent className="p-4">
            <p className="text-red-800 text-lg font-semibold">Total Out</p>
            <p className="text-2xl font-bold text-red-700">
              {formatCurrency(totalKshOut)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <p className="text-gray-800 text-lg font-semibold">Revenue</p>
            <p
              className={`text-2xl font-bold ${
                revenue >= 0 ? "text-green-700" : "text-red-700"
              }`}
            >
              {formatCurrency(revenue)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stock Movement History Table */}
      <Card className="shadow-md border border-blue-100 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-900">
            Stock Movement History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-blue-100 text-blue-900">
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Batch Price</TableHead>
                <TableHead className="text-center">Unit Price</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockMovements.length === 0 && !isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-gray-500 py-4"
                  >
                    No stock movement history available for this item.
                  </TableCell>
                </TableRow>
              ) : (
                stockMovements.map((movement, index) => (
                  <TableRow
                    key={movement.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <TableCell className="font-medium">
                      <span
                        className={`px-2 py-1 rounded-md text-white ${
                          movement.type === "IN" ? "bg-green-600" : "bg-red-600"
                        }`}
                      >
                        {movement.type}
                      </span>
                    </TableCell>
                    <TableCell>{movement.description || "N/A"}</TableCell>
                    <TableCell className="text-center font-bold">
                      <span
                        className={
                          movement.type === "IN"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {movement.type === "IN" ? "+" : "-"}
                        {movement.quantity}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(movement.batchPriceKes)}
                    </TableCell>
                    <TableCell className="text-center">
                      {movement.quantity > 0
                        ? formatCurrency(
                            movement.batchPriceKes / movement.quantity
                          )
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatDateTime(movement.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      {movement.patientVisitId ? (
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          <Link
                            params={{ visitId: movement.patientVisitId }}
                            to="/visits/$visitId"
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
