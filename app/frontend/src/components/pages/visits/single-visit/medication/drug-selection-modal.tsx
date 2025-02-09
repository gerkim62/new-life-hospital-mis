import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Custom hook to detect if the screen meets a media query.
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
}

/**
 * Types for hospital stock items and medications.
 */
type StockItem = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unit: string; // e.g. Kg, Litres, etc.
};

type StockMedication = {
  type: "stock";
  stockItemId: string;
  quantity: number;
  bulkPriceKes: number; // computed based on price & selection below
  description?: string;
  dosage: string;
};

type ManualMedication = {
  type: "manual";
  name: string;
  quantity: number;
  description?: string;
  dosage: string;
};

type Medication = StockMedication | ManualMedication;

/**
 * Dummy data for hospital stock.
 */
const dummyStockItems: StockItem[] = [
  { id: "1", name: "Paracetamol", description: "Pain reliever", quantity: 100, unit: "tablets" },
  { id: "2", name: "Ibuprofen", description: "Anti-inflammatory", quantity: 50, unit: "tablets" },
  { id: "3", name: "Amoxicillin", description: "Antibiotic", quantity: 200, unit: "capsules" },
];

/**
 * Component for adding a medication from stock.
 */
type StockSearchFormProps = {
  onAddMedication: (med: Medication) => void;

};

const StockSearchForm: React.FC<StockSearchFormProps> = ({ onAddMedication }) => {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [priceType, setPriceType] = useState<"whole" | "perUnit">("whole");
  const [description, setDescription] = useState("");
  const [dosage, setDosage] = useState("");

  // Filter stock items by the search query.
  const filteredItems = dummyStockItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectItem = (item: StockItem) => {
    setSelectedItem(item);
    setQuery(item.name); // auto-fill search box with selected name
  };

  const handleAdd = () => {
    // Minimal validation: ensure an item is selected, quantity and price are positive and dosage is entered.
    if (!selectedItem || quantity <= 0 || price <= 0 || dosage.trim() === "") return;
    // Compute bulkPriceKes: if the entered price is for the whole quantity, leave it;
    // if per unit, multiply by the quantity.
    const bulkPriceKes = priceType === "whole" ? price : price * quantity;
    const medication: StockMedication = {
      type: "stock",
      stockItemId: selectedItem.id,
      quantity,
      bulkPriceKes,
      description: description.trim() !== "" ? description : undefined,
      dosage,
    };
    onAddMedication(medication);
    // Reset the form.
    setSelectedItem(null);
    setQuery("");
    setQuantity(1);
    setPrice(0);
    setPriceType("whole");
    setDescription("");
    setDosage("");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Stock Search</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Search Stock Item by Name
        </label>
        <Input
          type="text"
          placeholder="Enter stock item name"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedItem(null);
          }}
          className="mt-1 w-full"
        />
        {/* Show matching items if user types a query and no item is yet selected */}
        {query && !selectedItem && (
          <ul className="mt-2 max-h-40 overflow-auto border rounded">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <li
                  key={item.id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectItem(item)}
                >
                  <span className="font-medium">{item.name}</span> - {item.description}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No matching stock items</li>
            )}
          </ul>
        )}
        {selectedItem && (
          <p className="mt-2 text-green-600">Selected: {selectedItem.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="mt-1 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <Input
          type="number"
          placeholder="Enter price"
          value={price || ""}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="mt-1 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price Type</label>
        <div className="flex space-x-4 mt-1">
          <label className="flex items-center">
            <input
              type="radio"
              name="priceType"
              value="whole"
              checked={priceType === "whole"}
              onChange={() => setPriceType("whole")}
              className="mr-1"
            />
            Whole Quantity
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="priceType"
              value="perUnit"
              checked={priceType === "perUnit"}
              onChange={() => setPriceType("perUnit")}
              className="mr-1"
            />
            Per Unit
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description (Optional)
        </label>
        <Input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Dosage</label>
        <Input
          type="text"
          placeholder="Enter dosage instructions"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          className="mt-1 w-full"
        />
      </div>

      <Button onClick={handleAdd} variant="secondary" className="w-full">
        Add Medication from Stock
      </Button>
    </div>
  );
};

/**
 * Component for manually entering a medication.
 */
type ManualEntryFormProps = {
  onAddMedication: (med: Medication) => void;
};

const ManualEntryForm: React.FC<ManualEntryFormProps> = ({ onAddMedication }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState("");
  const [dosage, setDosage] = useState("");

  const handleAdd = () => {
    if (name.trim() === "" || quantity <= 0 || dosage.trim() === "") return;
    const medication: ManualMedication = {
      type: "manual",
      name,
      quantity,
      description: description.trim() !== "" ? description : undefined,
      dosage,
    };
    onAddMedication(medication);
    setName("");
    setQuantity(1);
    setDescription("");
    setDosage("");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Manual Entry</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Drug Name</label>
        <Input
          type="text"
          placeholder="Enter drug name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="mt-1 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description (Optional)
        </label>
        <Input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Dosage</label>
        <Input
          type="text"
          placeholder="Enter dosage instructions"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          className="mt-1 w-full"
        />
      </div>

      <Button onClick={handleAdd} variant="secondary" className="w-full">
        Add Manual Medication
      </Button>
    </div>
  );
};

/**
 * Component for listing medications selected so far.
 */
type SelectedMedicationsListProps = {
  medications: Medication[];
  onRemove?: (index: number) => void;
};

const SelectedMedicationsList: React.FC<SelectedMedicationsListProps> = ({
  medications,
  onRemove,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Medications Selected</h3>
      {medications.length > 0 ? (
        <ul className="space-y-2">
          {medications.map((med, index) => (
            <li key={index} className="p-3 border rounded shadow-sm">
              {med.type === "stock" ? (
                <div>
                  <p>
                    <span className="font-medium">Stock Item ID:</span>{" "}
                    {med.stockItemId}
                  </p>
                  <p>
                    <span className="font-medium">Quantity:</span> {med.quantity}
                  </p>
                  <p>
                    <span className="font-medium">Bulk Price Kes:</span>{" "}
                    {med.bulkPriceKes}
                  </p>
                </div>
              ) : (
                <div>
                  <p>
                    <span className="font-medium">Drug Name:</span> {med.name}
                  </p>
                  <p>
                    <span className="font-medium">Quantity:</span> {med.quantity}
                  </p>
                </div>
              )}
              <p>
                <span className="font-medium">Dosage:</span> {med.dosage}
              </p>
              {med.description && (
                <p>
                  <span className="font-medium">Description:</span> {med.description}
                </p>
              )}
              {onRemove && (
                <Button
                  variant="destructive"
                  onClick={() => onRemove(index)}
                  className="mt-2"
                >
                  Remove
                </Button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No medications added yet.</p>
      )}
    </div>
  );
};

/**
 * Main modal component.
 * On wide screens the form (with tabbed options for Stock Search and Manual Entry)
 * is displayed side by side with the selected medications list.
 * On narrow screens, the form is shown in a tabbed layout with the list below.
 */
type MedicationSelectionStockModalProps = {
  onClose: () => void;
};

export function DrugSelectionStockModal({
  onClose,
}: MedicationSelectionStockModalProps) {
  const [medications, setMedications] = useState<Medication[]>([]);
  // Manage which form tab is active ("stock" or "manual")
  const [activeFormTab, setActiveFormTab] = useState<"stock" | "manual">("stock");
  const isWideScreen = useMediaQuery("(min-width: 768px)");

  const handleAddMedication = (med: Medication) => {
    setMedications((prev) => [...prev, med]);
  };

  const handleRemoveMedication = (index: number) => {
    setMedications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog defaultOpen onOpenChange={onClose}>
      <DialogContent className={isWideScreen ? "max-w-4xl p-6" : "max-w-md p-6"}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Medication Selection</DialogTitle>
        </DialogHeader>

        {isWideScreen ? (
          // Wide screens: two-column layout
          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <div className="flex space-x-4 border-b mb-4">
                <button
                  className={`py-2 px-4 ${
                    activeFormTab === "stock" ? "border-b-2 font-bold" : ""
                  }`}
                  onClick={() => setActiveFormTab("stock")}
                >
                  Stock Search
                </button>
                <button
                  className={`py-2 px-4 ${
                    activeFormTab === "manual" ? "border-b-2 font-bold" : ""
                  }`}
                  onClick={() => setActiveFormTab("manual")}
                >
                  Manual Entry
                </button>
              </div>
              {activeFormTab === "stock" ? (
                <StockSearchForm onAddMedication={handleAddMedication} />
              ) : (
                <ManualEntryForm onAddMedication={handleAddMedication} />
              )}
            </div>
            <div>
              <SelectedMedicationsList
                medications={medications}
                onRemove={handleRemoveMedication}
              />
            </div>
          </div>
        ) : (
          // Narrow screens: tabbed form with the medication list below
          <div className="mt-4">
            <div className="flex space-x-4 border-b mb-4">
              <button
                className={`py-2 px-4 ${
                  activeFormTab === "stock" ? "border-b-2 font-bold" : ""
                }`}
                onClick={() => setActiveFormTab("stock")}
              >
                Stock Search
              </button>
              <button
                className={`py-2 px-4 ${
                  activeFormTab === "manual" ? "border-b-2 font-bold" : ""
                }`}
                onClick={() => setActiveFormTab("manual")}
              >
                Manual Entry
              </button>
            </div>
            {activeFormTab === "stock" ? (
              <StockSearchForm onAddMedication={handleAddMedication} />
            ) : (
              <ManualEntryForm onAddMedication={handleAddMedication} />
            )}
            <div className="mt-6">
              <SelectedMedicationsList
                medications={medications}
                onRemove={handleRemoveMedication}
              />
            </div>
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button onClick={() => console.log("Save clicked", medications)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
