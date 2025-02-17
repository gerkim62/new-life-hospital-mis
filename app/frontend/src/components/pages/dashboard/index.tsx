import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { getRevenue } from "@/queries/revenue";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loader from "../../small/loader";
import TransactionDialog from "./transaction-dialog";
import { toast } from "react-toastify";
import { filterMedicalRecords } from "./utils";
import { NeatRevenue } from "@app/backend/src/routes/revenue/controllers";

const FinanceDashboard = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["revenue"],
    queryFn: getRevenue,
  });

  type TimeFrame = "daily" | "weekly" | "monthly" | "yearly";

  const [timeFrame, setTimeFrame] = useState<TimeFrame>("daily");

  const transactions = filterMedicalRecords(
    data?.success
      ? data.revenue
      : {
          labs: [],
          admissions: [],
          medications: [],
          others: [],
        },
    timeFrame
  ) as {
    labs: NeatRevenue[];
    medications: NeatRevenue[];
    others: NeatRevenue[];
    admissions: NeatRevenue[];
  };

  useEffect(() => {
    if (!data?.success && !isFetching) {
      toast.error(
        data?.message ?? "An error occurred while fetching transactions.",
        {
          toastId: data?.message ?? "error",
        }
      );
    }
  }, [data, isFetching]);

  // define the type of each array in the transactions object

  type UnifiedTransactionType =
    | (typeof transactions.admissions)[number]
    | (typeof transactions.medications)[number]
    | (typeof transactions.others)[number];

  type Category = keyof typeof transactions;

  const calculateTotal = (category: Category) => {
    return transactions[category].reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  };

  const calculateGrandTotal = () => {
    return Object.keys(transactions).reduce(
      (sum, category) => sum + calculateTotal(category as Category),
      0
    );
  };

  const TransactionTable = ({ data }: { data: UnifiedTransactionType[] }) => (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32">Date</TableHead>
            <TableHead className="w-32">Amount</TableHead>
            <TableHead className="w-32">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            // show a message if there are no transactions
            data.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No transactions for this category and time frame.
                </TableCell>
              </TableRow>
            )
          }
          {data.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{formatDateTime(transaction.date)}</TableCell>
              <TableCell>{formatCurrency(transaction.amount)}</TableCell>
              <TableCell>
                <TransactionDialog transaction={transaction} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="h-screen w-full bg-gray-50">
      {isFetching && <Loader message="Loading transactions..." />}
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <Card className="w-72">
            <CardHeader className="pb-2">
              <CardTitle>
                {" "}
                {timeFrame === "daily"
                  ? " Daily"
                  : timeFrame === "weekly"
                  ? " Weekly"
                  : timeFrame === "monthly"
                  ? " Monthly"
                  : " Yearly"}{" "}
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatCurrency(calculateGrandTotal())}
              </div>
            </CardContent>
          </Card>

          <Select
            value={timeFrame}
            onValueChange={(value) => {
              if (
                (["daily", "weekly", "monthly", "yearly"] as const).includes(
                  value as TimeFrame
                )
              )
                setTimeFrame(value as TimeFrame);
              else toast.error("Invalid time frame selected");
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="labs" className="w-full">
          <TabsList className="w-full h-12 bg-white mb-6">
            <TabsTrigger value="labs" className="flex-1">
              Laboratory ({formatCurrency(calculateTotal("labs"))})
            </TabsTrigger>
            <TabsTrigger value="admitted" className="flex-1">
              Admitted Patients ({formatCurrency(calculateTotal("admissions"))})
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex-1">
              Medications ({formatCurrency(calculateTotal("medications"))})
            </TabsTrigger>
            <TabsTrigger value="other" className="flex-1">
              Other Expenses ({formatCurrency(calculateTotal("others"))})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="labs">
            <Card className="border-0 shadow-sm">
              <CardHeader className="bg-white">
                <CardTitle>Revenue from Laboratory Tests</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <TransactionTable data={transactions.labs} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admitted">
            <Card className="border-0 shadow-sm">
              <CardHeader className="bg-white">
                <CardTitle> Revenue from Admitted Patients</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <TransactionTable data={transactions.admissions} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications">
            <Card className="border-0 shadow-sm">
              <CardHeader className="bg-white">
                <CardTitle>
                  {" "}
                  Revenue from Medications and other stock items
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <TransactionTable data={transactions.medications} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="other">
            <Card className="border-0 shadow-sm">
              <CardHeader className="bg-white">
                <CardTitle> Revenue from Patient's Other Expenses</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <TransactionTable data={transactions.others} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinanceDashboard;
