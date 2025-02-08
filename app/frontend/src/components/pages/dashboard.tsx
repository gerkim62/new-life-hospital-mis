import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const visits = [
  { id: 1, patientId: "P-001", revenue: 200, date: "2025-02-01" },
  { id: 2, patientId: "P-002", revenue: 150, date: "2025-02-03" },
  { id: 3, patientId: "P-003", revenue: 300, date: "2025-02-05" },
];

export default function Dashboard() {
  const [, setSelectedRange] = useState("month");

  const totalRevenue = visits.reduce((acc, visit) => acc + visit.revenue, 0);

  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <Card className="p-6 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-semibold text-blue-600">
          Total Revenue: ${totalRevenue}
        </h2>
      </Card>

      <div className="flex space-x-4">
        <Button
          onClick={() => setSelectedRange("day")}
          variant="outline"
          className="px-4 py-2"
        >
          Today
        </Button>
        <Button
          onClick={() => setSelectedRange("week")}
          variant="outline"
          className="px-4 py-2"
        >
          This Week
        </Button>
        <Button
          onClick={() => setSelectedRange("month")}
          variant="outline"
          className="px-4 py-2"
        >
          This Month
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="px-4 py-2">
              Select Date
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar />
          </PopoverContent>
        </Popover>
      </div>

      <Card className="p-6 shadow-lg rounded-lg bg-white">
        <CardContent>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Visits</h2>
          <div className="space-y-4">
            {visits.map((visit) => (
              <div
                key={visit.id}
                className="flex justify-between p-4 border rounded-md bg-gray-50 shadow-sm"
              >
                <span className="font-medium text-gray-700">
                  Patient ID: {visit.patientId}
                </span>
                <span className="font-medium text-green-600">
                  Revenue: ${visit.revenue}
                </span>
                <Button variant="link" className="text-blue-600">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="p-6 shadow-lg rounded-lg bg-white">
        <CardContent>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Revenue Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visits}>
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
