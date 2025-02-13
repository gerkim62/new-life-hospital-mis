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
import { Pencil } from "lucide-react";
import { useState } from "react";
import EditStockItemModal from "./edit-stock-item";
import { MoveStockItemModal } from "./move-stock";
import { NewStockModal } from "./new-stock-modal";

export function StockList() {
  const [modal, setModal] = useState<null | "new-stock">(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["stockItems"],
    queryFn: () => getAllStockItems(undefined),
  });

  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const stockItems = (data?.success ? data.items : []) || [];

  function handleAdjustStock(id: string) {
    console.log(`Open modal to adjust stock for item ${id}`);
    setSelectedItemId(id);
  }

  return (
    <div className="p-8 max-w-6xl mx-auto ">
      {isLoading && <Loader message="Loading stock items..." />}

      {modal === "new-stock" && (
        <NewStockModal
          toggle={(isOpen) => setModal(isOpen ? "new-stock" : null)}
        />
      )}

      {selectedItemId && (
        <MoveStockItemModal
          item={stockItems.find((item) => item.id === selectedItemId)!}
          toggle={() => setSelectedItemId(null)}
        />
      )}

      {editingItemId && (
        <EditStockItemModal
          initialData={stockItems.find((item) => item.id === editingItemId)!}
          onClose={() => setEditingItemId(null)}
        />
      )}

      <Card className="shadow-md border border-blue-100 bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-blue-900">
            Stock Inventory
          </CardTitle>
          <Button
            onClick={() => setModal("new-stock")}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Add Stock Item
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-blue-100 text-blue-900">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Unit</TableHead>
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
                stockItems.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <TableCell className="font-medium text-blue-900">
                      {item.name}
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-center">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-center">{item.unit}</TableCell>
                    <TableCell className="text-right flex gap-2 justify-end">
                      <Button
                        size="sm"
                        onClick={() => setEditingItemId(item.id)}
                        className="bg-blue-100 text-blue-900 hover:bg-blue-200"
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAdjustStock(item.id)}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                      >
                        +/-
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        <Link params={{ itemId: item.id }} to="/stock/$itemId">
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
