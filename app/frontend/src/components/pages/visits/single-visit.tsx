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
import { Clock, Pencil, Plus } from "lucide-react";

const VisitDetailsPage = () => {
  // Sample data - replace with actual data
  const patient = {
    name: "John Doe",
    id: "P12345",
    arrivalTime: "09:30 AM",
    leaveTime: "11:45 AM",
    symptoms: "Fever, headache, fatigue",
    diagnosis: "Viral infection",
    treatment: "Rest and hydration",
    notes: "Follow up in 3 days if symptoms persist",
    lab: null, // or lab results object
    expenses: [
      { item: "Consultation", amount: 50 },
      { item: "Blood test", amount: 30 }
    ],
    drugs: [
      { name: "Paracetamol", fromStock: true, quantity: "10 tablets" },
      { name: "Antibiotics", fromStock: false, quantity: "14 tablets" }
    ]
  };

  const handleEdit = (section) => {
    console.log(`Editing section: ${section}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Patient Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{patient.name}</h1>
          <p className="text-gray-500">ID: {patient.id}</p>
        </div>
      </div>

      {/* Time Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Visit Time</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => handleEdit('time')}>
            <Pencil className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Arrival: {patient.arrivalTime}</span>
          </div>
          {patient.leaveTime && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Leave: {patient.leaveTime}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lab Results */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Lab Results</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => handleEdit('lab')}>
            {patient.lab ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </CardHeader>
        <CardContent>
          {patient.lab ? (
            <div>{/* Lab results content */}</div>
          ) : (
            <p className="text-gray-500">No lab results added</p>
          )}
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Medical Information</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => handleEdit('medical')}>
            <Pencil className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Symptoms</h3>
            <p>{patient.symptoms}</p>
          </div>
          {patient.diagnosis && (
            <div>
              <h3 className="font-medium">Diagnosis</h3>
              <p>{patient.diagnosis}</p>
            </div>
          )}
          {patient.treatment && (
            <div>
              <h3 className="font-medium">Treatment</h3>
              <p>{patient.treatment}</p>
            </div>
          )}
          {patient.notes && (
            <div>
              <h3 className="font-medium">Notes</h3>
              <p>{patient.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Expenses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Expenses</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => handleEdit('expenses')}>
            <Pencil className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patient.expenses.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell>{expense.item}</TableCell>
                  <TableCell className="text-right">${expense.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Drugs */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Medications</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => handleEdit('drugs')}>
            <Pencil className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patient.drugs.map((drug, index) => (
                <TableRow key={index}>
                  <TableCell>{drug.name}</TableCell>
                  <TableCell>{drug.quantity}</TableCell>
                  <TableCell>
                    {drug.fromStock ? "Hospital Stock" : "Prescribed"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitDetailsPage;