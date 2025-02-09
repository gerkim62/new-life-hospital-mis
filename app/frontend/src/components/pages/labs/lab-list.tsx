import Loader from "@/components/small/loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getALlLabs } from "@/queries/labs";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

const LabList = () => {
  const [search, setSearch] = useState("");

  const { isLoading, data } = useQuery({
    queryKey: ["labs"],
    queryFn: getALlLabs,
  });

  const labs = (data?.success && data.labs) || [];

  const filteredLabs = labs.filter(
    (lab) =>
      lab.name.toLowerCase().includes(search.toLowerCase()) ||
      lab.description.toLowerCase().includes(search.toLowerCase()) ||
      lab.patientVisit.patient.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      lab.patientVisit.patientId.toString().includes(search)
  );

  console.log(labs);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {isLoading && <Loader message="Loading labs..." />}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Lab Tests</CardTitle>
          <Input
            type="text"
            placeholder="Search by Patient ID, Name, Test Name, or Description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4"
          />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Test Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Fees (KES)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLabs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No labs to display.
                  </TableCell>
                </TableRow>
              )}
              {filteredLabs.map((lab, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {lab.patientVisit.patientId}
                  </TableCell>
                  <TableCell>{lab.patientVisit.patient.name}</TableCell>
                  <TableCell>{lab.name}</TableCell>
                  <TableCell>{lab.description}</TableCell>
                  <TableCell>{lab.feesKes.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={lab.status === "DONE" ? "default" : "secondary"}
                    >
                      {lab.status }
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline">
                      <Link
                        to="/visits/$visitId"
                        params={{
                          visitId: lab.patientVisitId,
                        }}
                      >
                        Visit →
                      </Link>
                    </Button>
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

export default LabList;
