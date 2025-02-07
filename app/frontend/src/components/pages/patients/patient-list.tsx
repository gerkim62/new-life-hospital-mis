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
          <CardTitle className="text-2xl font-bold">Patient Records</CardTitle>
          <Input
            type="text"
            placeholder="Search by Name, Phone, Address, or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4"
          />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Birth Date</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!filteredPatients.length && (
                <tr>
                  <td
                    className="py-4 px-6 border-b text-center text-gray-500"
                    colSpan={5}
                  >
                    {search ? (
                      <>
                        No patients found for search{" "}
                        <span className="font-medium text-gray-700">
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
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{formatTime(patient.birthDate)}</TableCell>
                  <TableCell>
                    {getAge(new Date(patient.birthDate), currentDate)} {""}yrs
                  </TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.address}</TableCell>
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
