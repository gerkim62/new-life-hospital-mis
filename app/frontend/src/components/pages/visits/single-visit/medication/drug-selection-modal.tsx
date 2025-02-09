// import React, { useState } from "react";
// import { Search } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// // Mock data for demonstration
// const mockStockItems = [
//   {
//     id: "1",
//     name: "Paracetamol",
//     description: "Pain reliever",
//     quantity: 1000,
//     unit: "tablets",
//   },
//   {
//     id: "2",
//     name: "Amoxicillin",
//     description: "Antibiotic",
//     quantity: 500,
//     unit: "capsules",
//   },
// ];

// const StockItemSearch = ({ onSelect }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [quantity, setQuantity] = useState("");
//   const [priceType, setPriceType] = useState("per_unit");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//     const results = mockStockItems.filter((item) =>
//       item.name.toLowerCase().includes(term.toLowerCase())
//     );
//     setSearchResults(results);
//   };

//   const handleSelect = () => {
//     if (!selectedItem || !quantity || !price) return;

//     const bulkPrice =
//       priceType === "per_unit"
//         ? Number(price) * Number(quantity)
//         : Number(price);

//     onSelect({
//       stockItemId: selectedItem.id,
//       quantity: Number(quantity),
//       bulkPriceKes: bulkPrice,
//       description,
//     });

//     // Reset form
//     setSelectedItem(null);
//     setQuantity("");
//     setPrice("");
//     setDescription("");
//   };

//   return (
//     <div className="space-y-4">
//       <div className="relative">
//         <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
//         <Input
//           placeholder="Search items..."
//           value={searchTerm}
//           onChange={(e) => handleSearch(e.target.value)}
//           className="pl-8"
//         />
//       </div>

//       {searchResults.length > 0 && !selectedItem && (
//         <div className="border rounded-md p-2">
//           {searchResults.map((item) => (
//             <div
//               key={item.id}
//               className="p-2 hover:bg-gray-100 cursor-pointer"
//               onClick={() => setSelectedItem(item)}
//             >
//               {item.name} ({item.unit})
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedItem && (
//         <div className="space-y-4">
//           <div>
//             <Label>Selected Item: {selectedItem.name}</Label>
//             <p className="text-sm text-gray-500">
//               Available: {selectedItem.quantity} {selectedItem.unit}
//             </p>
//           </div>

//           <div className="space-y-2">
//             <Label>Quantity</Label>
//             <Input
//               type="number"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               max={selectedItem.quantity}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Price Type</Label>
//             <Select value={priceType} onValueChange={setPriceType}>
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="per_unit">Per Unit</SelectItem>
//                 <SelectItem value="bulk">Bulk Price</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label>Price (KES)</Label>
//             <Input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Description (Optional)</Label>
//             <Input
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>

//           <Button onClick={handleSelect}>Add Item</Button>
//         </div>
//       )}
//     </div>
//   );
// };

// const CustomDrugEntry = ({ onAdd }) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [dosage, setDosage] = useState("");
//   const [quantity, setQuantity] = useState("");

//   const handleAdd = () => {
//     if (!name || !quantity) return;

//     onAdd({
//       name,
//       description,
//       dosage,
//       quantity: Number(quantity),
//     });

//     // Reset form
//     setName("");
//     setDescription("");
//     setDosage("");
//     setQuantity("");
//   };

//   return (
//     <div className="space-y-4">
//       <div className="space-y-2">
//         <Label>Drug Name</Label>
//         <Input value={name} onChange={(e) => setName(e.target.value)} />
//       </div>

//       <div className="space-y-2">
//         <Label>Description (Optional)</Label>
//         <Input
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </div>

//       <div className="space-y-2">
//         <Label>Dosage</Label>
//         <Input value={dosage} onChange={(e) => setDosage(e.target.value)} />
//       </div>

//       <div className="space-y-2">
//         <Label>Quantity</Label>
//         <Input
//           type="number"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//         />
//       </div>

//       <Button onClick={handleAdd}>Add Drug</Button>
//     </div>
//   );
// };

// const MedicationList = ({ items, onRemove }) => {
//   if (items.length === 0) return null;

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Name</TableHead>
//           <TableHead>Quantity</TableHead>
//           <TableHead>Description</TableHead>
//           <TableHead>Price (KES)</TableHead>
//           <TableHead></TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {items.map((item, index) => (
//           <TableRow key={index}>
//             <TableCell>
//               {item.name || `Stock Item ${item.stockItemId}`}
//             </TableCell>
//             <TableCell>{item.quantity}</TableCell>
//             <TableCell>{item.description}</TableCell>
//             <TableCell>{item.bulkPriceKes}</TableCell>
//             <TableCell>
//               <Button
//                 variant="destructive"
//                 size="sm"
//                 onClick={() => onRemove(index)}
//               >
//                 Remove
//               </Button>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// const MedicationSelectionStockModal = ({ onClose, onSave }) => {
//   const [mode, setMode] = useState("search"); // 'search' or 'custom'
//   const [selectedItems, setSelectedItems] = useState([]);

//   const handleAddItem = (item) => {
//     setSelectedItems([...selectedItems, item]);
//   };

//   const handleRemoveItem = (index) => {
//     setSelectedItems(selectedItems.filter((_, i) => i !== index));
//   };

//   const handleSave = () => {
//     if (selectedItems.length === 0) return;
//     onSave(selectedItems);
//     setSelectedItems([]);
//     onClose();
//   };

//   return (
//     <Dialog defaultOpen onOpenChange={onClose}>
//       <DialogContent className="max-w-2xl">
//         <DialogHeader>
//           <DialogTitle>Select Medications</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4">
//           <div className="flex space-x-2">
//             <Button
//               variant={mode === "search" ? "default" : "outline"}
//               onClick={() => setMode("search")}
//             >
//               Search Stock
//             </Button>
//             <Button
//               variant={mode === "custom" ? "default" : "outline"}
//               onClick={() => setMode("custom")}
//             >
//               Custom Entry
//             </Button>
//           </div>

//           {mode === "search" ? (
//             <StockItemSearch onSelect={handleAddItem} />
//           ) : (
//             <CustomDrugEntry onAdd={handleAddItem} />
//           )}

//           <MedicationList items={selectedItems} onRemove={handleRemoveItem} />
//         </div>

//         <DialogFooter>
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSave} disabled={selectedItems.length === 0}>
//             Save
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default MedicationSelectionStockModal;
