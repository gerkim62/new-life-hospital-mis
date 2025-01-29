import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ExistingUser() {
  const [patientNumber, setPatientNumber] = useState("");
  return (
    <div className="space-y-2">
      <Label htmlFor="patientNumber">Patient Number</Label>
      <Input
        id="patientNumber"
        placeholder="Enter patient number"
        value={patientNumber}
        onChange={(e) => setPatientNumber(e.target.value)}
        required
      />
       <Button type="submit" className="w-full">
              Proceed
            </Button>
    </div>
  );
}
