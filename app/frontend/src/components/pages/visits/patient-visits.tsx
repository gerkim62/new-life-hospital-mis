import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import Loader from "@/components/small/loader";
import { formatDateTime } from "@/lib/format";
import { getVisits } from "@/queries/visits";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import useCurrentDate from "@/hooks/use-current-date";
import { VisitWithPatient } from "@app/backend/src/routes/visits/types";

export function PatientsVisitsList() {
  const [visits, setVisits] = useState<VisitWithPatient[]>([]);
  const [patientId, setPatientId] = useState<null | number>(null);
  const [filter, setFilter] = useState("all"); // all, active, today, inpatient, outpatient

  const currentDate = useCurrentDate();
  const { isLoading, data } = useQuery({
    queryKey: ["visits", patientId],
    queryFn: () =>
      getVisits({ patientId: patientId ?? undefined }).catch(console.error),
  });

  useEffect(() => {
    if (data?.success) setVisits(data.visits);
  }, [data]);

  const [candidatePatientId, setCandidatePatientId] = useState<string | null>(
    null
  );
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (candidatePatientId?.trim() === "") setPatientId(null);
    const pid = Number(candidatePatientId);
    if (isNaN(pid)) return toast.error("Invalid patient ID entered");
    setPatientId(pid);
  }

  const filteredVisits = visits.filter((visit) => {
    const arrivalTime = new Date(visit.arrivalTime);
    const today = new Date(currentDate);
    if (filter === "active") return visit.leaveTime === null;
    if (filter === "today")
      return (
        arrivalTime.getDate() === today.getDate() &&
        arrivalTime.getMonth() === today.getMonth() &&
        arrivalTime.getFullYear() === today.getFullYear()
      );
    if (filter === "inpatient") return Boolean(visit.admissionBed);
    if (filter === "outpatient") return !visit.admissionBed;
    return true;
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {isLoading && (
        <Loader
          message={`Getting visits for ${patientId ? `patient with ID ${patientId}` : "all patients"}`}
        />
      )}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Patient Visits</CardTitle>
          <form onSubmit={handleSubmit} className="mt-4 flex gap-4">
            <Input
              type="text"
              placeholder="Enter Patient ID"
              value={candidatePatientId ?? ""}
              onChange={(e) => setCandidatePatientId(e.target.value)}
              className="max-w-sm"
            />
            <Button type="submit">Search</Button>
          </form>
          <RadioGroup
            className="mt-4 flex flex-wrap gap-4"
            value={filter}
            onValueChange={setFilter}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" />
              <Label>All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="active" />
              <Label>Active </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="today" />
              <Label>Today</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inpatient" />
              <Label>Inpatient</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="outpatient" />
              <Label>Outpatient</Label>
            </div>
          </RadioGroup>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Arrival Time</TableHead>
                <TableHead>Leave Time</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVisits.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-gray-500 py-4"
                  >
                    {patientId
                      ? `No visits found for patient ID ${patientId}.`
                      : "No matching visits found."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredVisits.map((visit) => (
                  <TableRow key={visit.id}>
                    <TableCell className="font-medium">
                      {visit.patientId}
                    </TableCell>
                    <TableCell>{visit.patient.name}</TableCell>
                    <TableCell>
                      {visit.admissionBed ? "Inpatient" : "Outpatient"}
                    </TableCell>
                    <TableCell>{formatDateTime(visit.arrivalTime)}</TableCell>
                    <TableCell>
                      {visit.leaveTime
                        ? formatDateTime(visit.leaveTime)
                        : "Not yet"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        to="/visits/$visitId"
                        params={{ visitId: visit.id }}
                        className="flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                      >
                        View <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
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
