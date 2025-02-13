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
import { formatCurrency } from "@/lib/format";
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
      <Card className="bg-white shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-900">
            Lab Tests
          </CardTitle>
          <Input
            type="text"
            placeholder="Search by Patient ID, Name, Test Name, or Description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4 border-gray-300 focus:border-blue-500"
          />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-blue-100 text-blue-900">
              <TableRow>
                <TableHead>Patient Number</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Test Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLabs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">
                    No labs to display.
                  </TableCell>
                </TableRow>
              )}
              {filteredLabs.map((lab, index) => (
                <TableRow key={index} className="odd:bg-gray-50 even:bg-white">
                  <TableCell className="font-medium">
                    {lab.patientVisit.patientId}
                  </TableCell>
                  <TableCell>{lab.patientVisit.patient.name}</TableCell>
                  <TableCell>{lab.name}</TableCell>
                  <TableCell className="truncate max-w-[200px]">
                    {lab.description}
                  </TableCell>
                  <TableCell>{formatCurrency(lab.feesKes)}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        lab.status === "DONE"
                          ? "bg-green-100 text-green-700"
                          : lab.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }
                    >
                      {lab.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      asChild
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      <Link
                        to="/visits/$visitId"
                        params={{ visitId: lab.patientVisitId }}
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
