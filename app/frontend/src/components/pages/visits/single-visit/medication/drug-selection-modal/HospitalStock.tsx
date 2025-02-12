import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DrugDetailsDialog from "./DrugDetailsDialog";
import { Drug, DrugFromStock, HospitalDrug } from "./types";
import Loader from "@/components/small/loader";
import { useQuery } from "@tanstack/react-query";
import { getAllStockItems } from "@/queries/stock";
import { toast } from "react-toastify";

interface HospitalStockProps {
  selectedDrugs: Drug[];
  setSelectedDrugs: React.Dispatch<React.SetStateAction<Drug[]>>;
}

const HospitalStock: React.FC<HospitalStockProps> = ({
  selectedDrugs,
  setSelectedDrugs,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 700);
  const [selectedHospitalDrug, setSelectedHospitalDrug] =
    useState<HospitalDrug | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const { data, isFetching: isSearching } = useQuery({
    queryKey: ["stockItems", debouncedSearchTerm],
    queryFn: () => getAllStockItems(debouncedSearchTerm),
  });

  const searchResults = data?.success ? data.items : [];

  const handleStockSelect = (drug: HospitalDrug) => {
    if (
      selectedDrugs.some(
        (d) => (d as DrugFromStock | undefined)?.stockItemId === drug.id
      )
    ) {
      return toast.error("Has already been added to the list.", {
        toastId: "already-added",
      });
    }
    setSelectedHospitalDrug(drug);
    setDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search hospital stock..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button disabled={isSearching}>
          {isSearching ? <Loader2 className="animate-spin" /> : <Search />}
        </Button>
        {isSearching && <Loader message="Searching..." />}
      </div>

      {searchResults.length === 0 && !isSearching && searchTerm && (
        <p className="text-gray-500 text-center">No results found.</p>
      )}

      {searchResults.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchResults.map((drug, index) => (
              <TableRow key={index}>
                <TableCell>{drug.name}</TableCell>
                <TableCell>{drug.description}</TableCell>
                <TableCell>
                  {drug.quantity} ({drug.unit})
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStockSelect(drug)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {selectedHospitalDrug && (
        <DrugDetailsDialog
          drug={selectedHospitalDrug}
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
          onConfirm={(drug) => setSelectedDrugs([...selectedDrugs, drug])}
        />
      )}
    </div>
  );
};

export default HospitalStock;
