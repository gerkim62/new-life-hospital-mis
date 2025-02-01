import { Button } from "@/components/ui/button"; // shadcn Button
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

// Mock data for a single patient and their visits
const patient = {
  id: 12345,
  name: "John Doe",
};

const patientVisits = [
  {
    id: 1,
    arrivalTime: new Date("2023-10-01T09:00:00"),
    leaveTime: new Date("2023-10-01T12:00:00"),
    symptoms: "Fever, headache",
    diagnosis: "Viral infection",
    treatment: "Rest and hydration",
    notes: "Patient advised to follow up in 3 days.",
  },
  {
    id: 2,
    arrivalTime: new Date("2023-10-02T10:30:00"),
    leaveTime: null, // Patient still in hospital
    symptoms: "Chest pain",
    diagnosis: null, // Pending diagnosis
    treatment: null,
    notes: "Patient undergoing tests.",
  },
];

const PatientVisitsPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Patient Info at the Top */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{patient.name}</h1>
        <p className="text-sm text-gray-500">Patient ID: {patient.id}</p>
      </div>

      {/* List of Visits */}
      <div className="space-y-4">
        {patientVisits.map((visit) => (
          <Card key={visit.id} className="shadow-sm">
            <CardHeader>
              <CardTitle>Visit ID: {visit.id}</CardTitle>
              <CardDescription>
                Arrival Time: {visit.arrivalTime.toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Leave Time:</p>
                  <p className="font-medium">
                    {visit.leaveTime
                      ? visit.leaveTime.toLocaleString()
                      : "Still in hospital"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Symptoms:</p>
                  <p className="font-medium">{visit.symptoms}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                params={{ visitId: visit.id.toString() }}
                to={`/visits/$visitId`}
              >
                <Button variant="outline">More Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientVisitsPage;
