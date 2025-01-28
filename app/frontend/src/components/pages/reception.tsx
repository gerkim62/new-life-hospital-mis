"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type React from "react";
import { useEffect, useState } from "react";
import { DateRouteResponse } from "@app/backend/src/routes/date/types";
import { getAge, getDateOfBirth } from "@/lib/date";

export default function ReceptionPage() {
  const [patientType, setPatientType] = useState<"existing" | "new">("new");
  const [patientNumber, setPatientNumber] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [currentDate, setCurrentDate] = useState(new Date());

  const [age, setAge] = useState(
    getAge(dateOfBirth ?? currentDate, currentDate)
  );

  useEffect(() => {
    fetchDate();
  }, []);

  async function fetchDate() {
    const res = await fetch("/api/v1/date");
    const json: DateRouteResponse = await res.json();
    if (!json.success) {
      // toast.error(json.message);
      console.log(json.message);
      return;
    }

    setCurrentDate(new Date(json.date.current));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", {
      patientType,
      patientNumber,
      name,
      age,
      dateOfBirth,
      address,
      phoneNumber,
    });
  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs
              defaultValue="new"
              onValueChange={(value) =>
                setPatientType(value as "existing" | "new")
              }
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="new">New Patient</TabsTrigger>
                <TabsTrigger value="existing">Existing Patient</TabsTrigger>
              </TabsList>
              <TabsContent value="existing">
                <div className="space-y-2">
                  <Label htmlFor="patientNumber">Patient Number</Label>
                  <Input
                    id="patientNumber"
                    placeholder="Enter patient number"
                    value={patientNumber}
                    onChange={(e) => setPatientNumber(e.target.value)}
                    required
                  />
                </div>
              </TabsContent>
              <TabsContent value="new">
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
                        id="age"
                        type="number"
                        placeholder="Enter age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        onChange={(e) =>
                          setDateOfBirth(new Date(e.target.value))
                        }
                        id="dateOfBirth"
                        type="date"
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
                </div>
              </TabsContent>
            </Tabs>
            <Button type="submit" className="w-full">
              Proceed
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
