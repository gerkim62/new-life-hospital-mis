import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExistingUser from "./existing-user";
import NewUser from "./new-user";

export default function ReceptionPage() {
  return (
    <div className="flex justify-center p-4 ">
    <Card className="w-full max-w-2xl shadow-xl border border-gray-300 bg-white">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-4xl font-bold text-blue-900">
          Reception Entry
        </CardTitle>
        <CardDescription className="text-lg text-gray-700">
          Enter patient information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <Tabs defaultValue="existing">
            <TabsList className="grid grid-cols-2 gap-4">
              <TabsTrigger
                value="new"
                className="text-gray-700 data-[state=active]:text-blue-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-all"
              >
                New Patient
              </TabsTrigger>
              <TabsTrigger
                value="existing"
                className="text-gray-700 data-[state=active]:text-blue-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-all"
              >
                Existing Patient
              </TabsTrigger>
            </TabsList>
            <TabsContent value="existing">
              <ExistingUser />
            </TabsContent>
            <TabsContent value="new">
              <NewUser />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  </div>
  
  );
}
