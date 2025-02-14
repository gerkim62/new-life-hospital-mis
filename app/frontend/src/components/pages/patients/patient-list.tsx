import Loader from "@/components/small/loader";
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
import useCurrentDate from "@/hooks/use-current-date";
import { getAge } from "@/lib/date";
import { formatTime } from "@/lib/format";
import { getAllPatients } from "@/queries/patients";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const PatientList = () => {
  const [search, setSearch] = useState("");
  const currentDate = useCurrentDate();

  const { isLoading, data } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
  });

  const patients = (data?.success && data.patients) || [];

  const filteredPatients = patients.filter((patient) => {
    return (
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone.includes(search) ||
      patient.address.toLowerCase().includes(search.toLowerCase()) ||
      patient.id.toString().includes(search)
    );
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {isLoading && <Loader message="Fetching patients" />}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-900">
            Patient Records
          </CardTitle>
          <Input
            type="text"
            placeholder="Search by Name, Phone, Address, or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4 border-blue-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-blue-100">
              <TableRow>
                <TableHead className="w-24 text-blue-800">Patient No.</TableHead>
                <TableHead className="text-blue-800">Name</TableHead>
                <TableHead className="text-blue-800">Birth Date</TableHead>
                <TableHead className="text-blue-800">Age</TableHead>
                <TableHead className="text-blue-800">Phone</TableHead>
                <TableHead className="text-blue-800">Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!filteredPatients.length && (
                <tr>
                  <td
                    className="py-4 px-6 border-b border-blue-300 text-center text-blue-600"
                    colSpan={6}
                  >
                    {search ? (
                      <>
                        No patients found for search{" "}
                        <span className="font-medium text-blue-800">
                          {search}
                        </span>
                        . Please adjust your search.
                      </>
                    ) : (
                      "No patients found. Go to reception to add your first patient."
                    )}
                  </td>
                </tr>
              )}

              {filteredPatients.map((patient) => (
                <TableRow
                  key={patient.id}
                  className="border-blue-300 hover:bg-blue-50"
                >
                  <TableCell className="font-medium text-blue-900">
                    {patient.id}
                  </TableCell>
                  <TableCell className="text-blue-800">
                    {patient.name}
                  </TableCell>
                  <TableCell className="text-blue-800">
                    {formatTime(patient.birthDate)}
                  </TableCell>
                  <TableCell className="text-blue-800">
                    {getAge(new Date(patient.birthDate), currentDate)} yrs
                  </TableCell>
                  <TableCell className="text-blue-800">
                    {patient.phone}
                  </TableCell>
                  <TableCell className="text-blue-800">
                    {patient.address}
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

export default PatientList;
