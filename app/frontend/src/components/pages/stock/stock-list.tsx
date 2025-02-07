import Loader from "@/components/small/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllStockItems } from "@/queries/stock";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export function StockList() {
  const { data, isLoading } = useQuery({
    queryKey: ["stockItems"],
    queryFn: getAllStockItems,
  });

  const stockItems = (data?.success ? data.items : []) || [];

  function handleAdjustStock(id: string) {
    console.log(`Open modal to adjust stock for item ${id}`);
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {isLoading && <Loader message="Loading stock items..." />}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Stock Inventory</CardTitle>
          <Button>Add Stock Item</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockItems.length === 0 && !isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-gray-500 py-4"
                  >
                    No stock items available.
                  </TableCell>
                </TableRow>
              ) : (
                stockItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell className="text-right flex gap-2 justify-end">
                      <Button
                        size="sm"
                        onClick={() => handleAdjustStock(item.id)}
                      >
                        +/-
                      </Button>
                      <Button asChild variant="outline">
                        <Link
                          to="/stock/$stockId/history"
                          params={{ stockId: item.id }}
                        >
                          View History &rarr;
                        </Link>
                      </Button>
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
