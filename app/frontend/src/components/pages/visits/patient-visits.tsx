import Loader from "@/components/small/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCurrentDate from "@/hooks/use-current-date";
import { formatDateTime } from "@/lib/format";
import { getVisits } from "@/queries/visits";
import { VisitWithPatient } from "@app/backend/src/routes/visits/types";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
          message={`Getting visits for ${
            patientId ? `patient with ID ${patientId}` : "all patients"
          }`}
        />
      )}
      <Card className="shadow-md border border-blue-100 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-900">
            Patient Visits
          </CardTitle>
          <form onSubmit={handleSubmit} className="mt-4 flex gap-4">
            <Input
              type="text"
              placeholder="Enter Patient Number"
              value={candidatePatientId ?? ""}
              onChange={(e) => setCandidatePatientId(e.target.value)}
              className="max-w-sm border-gray-300 focus:border-blue-500"
            />
            <Button
              type="submit"
              className="bg-blue-900 text-white hover:bg-blue-950"
            >
              <Search />
              Search
            </Button>
          </form>
          <RadioGroup
            className="mt-4 flex flex-wrap gap-4"
            value={filter}
            onValueChange={setFilter}
          >
            {[
              { value: "all", label: "All" },
              { value: "active", label: "Active" },
              { value: "today", label: "Today" },
              { value: "inpatient", label: "Inpatient" },
              { value: "outpatient", label: "Outpatient" },
            ].map(({ value, label }) => (
              <div key={value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={value}
                  id={value}
                  checked={filter === value}
                  onChange={() => setFilter(value)}
                  className="peer hidden"
                />
                <Label
                  htmlFor={value}
                  className="cursor-pointer px-4 py-2 border rounded-md 
                   peer-checked:bg-blue-600 peer-checked:text-white"
                >
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-blue-100 text-blue-900">
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
                filteredVisits.map((visit, index) => (
                  <TableRow
                    key={visit.id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <TableCell className="font-medium text-blue-800">
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
                        className="flex items-center px-3 py-1 bg-blue-100 text-blue-900 rounded hover:bg-blue-200"
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
