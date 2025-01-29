import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAge, getDateOfBirth } from "@/lib/date"; // Assuming getAge handles age calculation.
import { DateRouteResponse } from "@app/backend/src/routes/date/types";
import { Button } from "@/components/ui/button";

export default function NewUser() {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<string>();
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [age, setAge] = useState<number | "">("");

  useEffect(() => {
    fetchDate();
  }, []);

  useEffect(() => {
    if (dateOfBirth) {
      const dateOfBirthDate = new Date(dateOfBirth);
      setAge(getAge(dateOfBirthDate, currentDate)); // Update age when dateOfBirth or currentDate changes
    }
  }, [dateOfBirth, currentDate]);

  async function fetchDate() {
    const res = await fetch("/api/v1/date");
    const json: DateRouteResponse = await res.json();
    if (!json.success) {
      console.log(json.message);
      return;
    }

    setCurrentDate(new Date(json.date.current));
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Enter full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            max={200}
            min={0}
            id="age"
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => {
              if (!e.target.value.length) {
                setAge("");
                return;
              }
              const newAge = Number(e.target.value);
              if (isNaN(newAge)) {
                setAge("");
                return;
              }

              setAge(newAge);
              setDateOfBirth(getDateOfBirth(newAge, currentDate).toISOString()); // Update dateOfBirth based on new age
            }}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={
              dateOfBirth
                ? dateOfBirth.split("T")[0] // Format date for input field
                : ""
            }
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          placeholder="Enter place name (e.g., Nairobi)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
              Proceed
            </Button>
    </div>
  );
}
