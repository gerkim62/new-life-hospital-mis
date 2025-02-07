// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import {
//   CalendarDays,
//   ChevronRight,
//   Clock,
//   MapPin,
//   Phone,
//   Plus,
// } from "lucide-react";

// const formatDate = (date) => {
//   return new Date(date).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// };

// const formatDateTime = (date) => {
//   return new Date(date).toLocaleString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//   });
// };

// const LabStatusBadge = ({ status }) => {
//   const variants = {
//     PENDING: "default",
//     IN_PROGRESS: "warning",
//     DONE: "success",
//   } as const;

//   return (
//     <Badge variant={variants[status]} className="ml-2">
//       {status.toLowerCase().replace("_", " ")}
//     </Badge>
//   );
// };

// const PatientProfilePage = () => {
//   // Mock data for demonstration
//   const mockPatient = {
//     id: 1,
//     name: "John Doe",
//     birthDate: new Date("1990-05-15"),
//     phone: "+1 234 567 8900",
//     address: "123 Medical Lane, Healthcare City, HC 12345",
//     totalVisits: 15,
//     latestVisit: {
//       arrivalTime: new Date("2024-01-29T09:30:00"),
//       leaveTime: new Date("2024-01-29T10:45:00"),
//       symptoms: "Fever and headache",
//       diagnosis: "Seasonal flu",
//       treatment: "Prescribed antipyretics and rest",
//       notes: "Patient showing good response to treatment",
//       labs: [
//         {
//           id: 1,
//           name: "Complete Blood Count",
//           status: "DONE",
//           result: "Normal",
//         },
//         {
//           id: 2,
//           name: "Blood Sugar",
//           status: "DONE",
//           result: "Slightly elevated",
//         },
//         { id: 3, name: "Liver Function", status: "IN_PROGRESS" },
//         { id: 4, name: "Thyroid Panel", status: "PENDING" },
//         { id: 5, name: "Lipid Profile", status: "PENDING" },
//         { id: 6, name: "Vitamin D", status: "PENDING" },
//       ],
//       stockItems: [
//         { name: "Paracetamol", quantity: 2, fromStock: true },
//         { name: "Vitamin C", quantity: 1, fromStock: true },
//       ],
//       drugsPrescribed: [
//         { name: "Ibuprofen", dosage: "400mg", fromStock: false },
//         { name: "Amoxicillin", dosage: "500mg", fromStock: true },
//       ],
//       expenses: [
//         { item: "Consultation", amount: 50 },
//         { item: "Medicine", amount: 35 },
//       ],
//     },
//   };

//   const data = mockPatient;
//   const displayedLabs = data.latestVisit.labs.slice(0, 5);
//   const remainingLabs = data.latestVisit.labs.length - 5;

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       {/* Patient Basic Info Card */}
//       <Card>
//         <CardHeader>
//           <div className="flex justify-between items-start">
//             <div>
//               <CardTitle className="text-2xl">{data.name}</CardTitle>
//               <CardDescription>Patient ID: {data.id}</CardDescription>
//             </div>
//             <div className="flex items-center gap-4">
//               <Badge variant="secondary" className="text-lg">
//                 {data.totalVisits} Visits
//               </Badge>
//               <Button size="sm">
//                 <Plus className="h-4 w-4 mr-2" />
//                 New Visit
//               </Button>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="flex items-center gap-2">
//               <CalendarDays className="h-4 w-4 text-muted-foreground" />
//               <span>Born: {formatDate(data.birthDate)}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Phone className="h-4 w-4 text-muted-foreground" />
//               <span>{data.phone}</span>
//             </div>
//             <div className="flex items-center gap-2 md:col-span-2">
//               <MapPin className="h-4 w-4 text-muted-foreground" />
//               <span>{data.address}</span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Latest Visit Card */}
//       <Card>
//         <CardHeader>
//           <div className="flex justify-between items-center">
//             <CardTitle>Latest Visit</CardTitle>
//             <Button variant="outline" size="sm">
//               View All Visits
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-6">
//             {/* Visit Timeline */}
//             <div className="flex items-center gap-4">
//               <Clock className="h-4 w-4 text-muted-foreground" />
//               <div className="grid gap-1">
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm font-medium">Arrival:</span>
//                   <span>{formatDateTime(data.latestVisit.arrivalTime)}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm font-medium">Leave:</span>
//                   <span>
//                     {data.latestVisit.leaveTime
//                       ? formatDateTime(data.latestVisit.leaveTime)
//                       : "Not recorded"}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Medical Details */}
//             <div className="grid gap-4">
//               <div>
//                 <Label className="text-sm font-medium">Symptoms</Label>
//                 <p className="mt-1">{data.latestVisit.symptoms}</p>
//               </div>
//               <div>
//                 <Label className="text-sm font-medium">Diagnosis</Label>
//                 <p className="mt-1">{data.latestVisit.diagnosis}</p>
//               </div>
//               <div>
//                 <Label className="text-sm font-medium">Treatment</Label>
//                 <p className="mt-1">{data.latestVisit.treatment}</p>
//               </div>
//               <div>
//                 <Label className="text-sm font-medium">Notes</Label>
//                 <p className="mt-1">{data.latestVisit.notes}</p>
//               </div>
//             </div>

//             {/* Labs, Medications, and Expenses Summary */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <Card className="md:col-span-2">
//                 <CardHeader className="p-4">
//                   <div className="flex justify-between items-center">
//                     <CardTitle className="text-sm">Labs</CardTitle>
//                     <div className="flex gap-2">
//                       <Button variant="ghost" size="sm">
//                         <Plus className="h-4 w-4 mr-2" />
//                         New Lab
//                       </Button>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <div className="space-y-2">
//                     {displayedLabs.map((lab) => (
//                       <div
//                         key={lab.id}
//                         className="flex items-center justify-between"
//                       >
//                         <div className="flex items-center">
//                           <span className="text-sm">{lab.name}</span>
//                           <LabStatusBadge status={lab.status} />
//                         </div>
//                         <Button variant="ghost" size="sm">
//                           View Details
//                         </Button>
//                       </div>
//                     ))}
//                     {remainingLabs > 0 && (
//                       <Button variant="ghost" size="sm" className="w-full mt-2">
//                         View {remainingLabs} more labs{" "}
//                         <ChevronRight className="h-4 w-4 ml-2" />
//                       </Button>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="p-4">
//                   <div className="flex justify-between items-center">
//                     <CardTitle className="text-sm">Medications</CardTitle>
//                     <div className="flex gap-2">
//                       <Button variant="ghost" size="sm">
//                         <Plus className="h-4 w-4 mr-2" />
//                         Add
//                       </Button>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <ul className="text-sm space-y-2">
//                     {data.latestVisit.drugsPrescribed.map((drug, index) => (
//                       <li
//                         key={index}
//                         className="flex items-center justify-between"
//                       >
//                         <span>
//                           {drug.name} - {drug.dosage}
//                         </span>
//                         <Badge
//                         variant={"outline"}
//                           className="text-xs"
//                         >
//                           {drug.fromStock ? "Stock" : "External"}
//                         </Badge>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>

//               <Card className="md:col-span-3">
//                 <CardHeader className="p-4">
//                   <div className="flex justify-between items-center">
//                     <CardTitle className="text-sm">Expenses</CardTitle>
//                     <div className="flex gap-2">
//                       <Button variant="ghost" size="sm">
//                         <Plus className="h-4 w-4 mr-2" />
//                         Add Expense
//                       </Button>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <div className="space-y-1">
//                     {data.latestVisit.expenses.map((expense, index) => (
//                       <div key={index} className="flex justify-between text-sm">
//                         <span>{expense.item}</span>
//                         <span>${expense.amount}</span>
//                       </div>
//                     ))}
//                     <div className="border-t pt-1 mt-2 flex justify-between font-medium">
//                       <span>Total</span>
//                       <span>
//                         $
//                         {data.latestVisit.expenses.reduce(
//                           (acc, curr) => acc + curr.amount,
//                           0
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default PatientProfilePage;

