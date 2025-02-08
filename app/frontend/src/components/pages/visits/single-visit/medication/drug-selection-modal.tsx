import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Define a type for stock items
type StockItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
};

// Mock stock items
const stockItems: StockItem[] = [
  { id: "1", name: "Paracetamol", quantity: 100, unit: "tablets" },
  { id: "2", name: "Ibuprofen", quantity: 50, unit: "tablets" },
  { id: "3", name: "Amoxicillin", quantity: 30, unit: "capsules" },
];

// Mock async function to fetch stock items
const getStockItems = async (query: string): Promise<StockItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        stockItems.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 500);
  });
};

interface DrugSelectionModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DrugSelectionModal({ open, onClose }: DrugSelectionModalProps) {
  const [fromStock, setFromStock] = useState<boolean>(true);
  const [selectedStockItems, setSelectedStockItems] = useState<StockItem[]>([]);
  const [stockSearch, setStockSearch] = useState<string>("");
  const [filteredStock, setFilteredStock] = useState<StockItem[]>(stockItems);
  const [description, setDescription] = useState<string>("");
  const [dosage, setDosage] = useState<string>("");
  const [drugName, setDrugName] = useState<string>("");

  const handleStockSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setStockSearch(query);
    const results = await getStockItems(query);
    setFilteredStock(results);
  };

  const handleStockSelection = (drugName: string) => {
    const selectedDrug = stockItems.find((item) => item.name === drugName);
    if (selectedDrug && !selectedStockItems.some((item) => item.id === selectedDrug.id)) {
      setSelectedStockItems([...selectedStockItems, selectedDrug]);
    }
  };

  const removeStockItem = (id: string) => {
    setSelectedStockItems(selectedStockItems.filter((item) => item.id !== id));
  };

  const handleSubmit = () => {
    const selectedDrugs = fromStock
      ? selectedStockItems.map((item) => ({ name: item.name, description, dosage }))
      : [{ name: drugName, description, dosage }];

    console.log("Selected Drugs:", selectedDrugs);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Drug</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox checked={fromStock} onCheckedChange={(checked) => setFromStock(checked as boolean)} />
            <Label>From Hospital Stock</Label>
          </div>

          {fromStock ? (
            <div>
              <Label>Search Drug</Label>
              <Input placeholder="Search by name..." value={stockSearch} onChange={handleStockSearch} />
              <Select onValueChange={handleStockSelection}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Drug" />
                </SelectTrigger>
                <SelectContent>
                  {filteredStock.map((item) => (
                    <SelectItem key={item.id} value={item.name}>
                      {item.name} ({item.quantity} {item.unit})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedStockItems.length > 0 && (
                <div className="mt-2 space-y-2">
                  <Label>Selected Drugs</Label>
                  {selectedStockItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                      <span>{item.name} ({item.quantity} {item.unit})</span>
                      <Button variant="ghost" size="sm" onClick={() => removeStockItem(item.id)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <Label>Drug Name</Label>
              <Input placeholder="Enter drug name" value={drugName} onChange={(e) => setDrugName(e.target.value)} />
            </div>
          )}

          <div>
            <Label>Description</Label>
            <Input placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div>
            <Label>Dosage</Label>
            <Input placeholder="Enter dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} />
          </div>

          <Button onClick={handleSubmit}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
