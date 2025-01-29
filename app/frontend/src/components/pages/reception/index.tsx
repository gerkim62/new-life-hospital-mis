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
    <div className="  flex justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Reception Entry</CardTitle>
          <CardDescription className="text-xl">
            Enter patient information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Tabs defaultValue="new">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="new">New Patient</TabsTrigger>
                <TabsTrigger value="existing">Existing Patient</TabsTrigger>
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
