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
import { Checkbox } from "@/components/ui/checkbox";

export function PatientsVisitsList() {
  const [visits, setVisits] = useState<
    {
      patientId: number;
      id: string;
      arrivalTime: Date;
      leaveTime: Date | null;
      symptoms: string;
      diagnosis: string | null;
      treatment: string | null;
      notes: string | null;
      patient: {
        id: number;
        name: string;
        birthDate: Date;
        phone: string;
        address: string;
        createdAt: Date;
        updatedAt: Date;
      };
    }[]
  >([]);

  const [patientId, setPatientId] = useState<null | number>(null);
  const [showOnlyActiveVisits, setShowOnlyActiveVisits] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ["visits", patientId],
    queryFn: () =>
      getVisits({
        patientId: patientId ?? undefined,
      }).catch((error) => {
        console.error(error);
      }),
  });

  useEffect(() => {
    if (data?.success) {
      setVisits(data.visits);
    }
  }, [data]);

  const [candidatePatientId, setCandidatePatientId] = useState<string | null>(
    null
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (candidatePatientId?.trim() === "") {
      setPatientId(null);
    }
    const pid = Number(candidatePatientId);
    if (isNaN(pid)) {
      toast.error("Invalid patient ID entered");
      return;
    }
    setPatientId(pid);
  }

  const filteredVisits = showOnlyActiveVisits
    ? visits.filter((visit) => visit.leaveTime === null)
    : visits;

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
            />
            <Button type="submit">Search</Button>
          </form>
          <div hidden={!visits.length} className="mt-4 flex items-center gap-2">
            <Checkbox
              id="active-visits"
              checked={showOnlyActiveVisits}
              onCheckedChange={(checked) => setShowOnlyActiveVisits(!!checked)}
            />
            <label htmlFor="active-visits" className="cursor-pointer">
              Show only active visits (patients still in hospital)
            </label>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Arrival Time</TableHead>
                <TableHead>Leave Time</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVisits.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-gray-500 py-4"
                  >
                    {patientId
                      ? `No visits found for patient ID ${patientId}.`
                      : showOnlyActiveVisits
                        ? "No active visits found."
                        : "No patient visits yet."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredVisits.map((visit) => (
                  <TableRow key={visit.id}>
                    <TableCell className="font-medium">
                      {visit.patientId}
                    </TableCell>
                    <TableCell>{visit.patient.name}</TableCell>
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
