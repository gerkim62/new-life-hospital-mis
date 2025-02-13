import SymptomsModal from "@/components/modals/symptoms";
import Loader from "@/components/small/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCurrentDate from "@/hooks/use-current-date";
import usePatient from "@/hooks/use-patient";
import { getAge, getDateOfBirth } from "@/lib/date"; // Assuming getAge handles age calculation.
import { createPatient } from "@/mutations/patient";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function NewUser() {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<string>();
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const currentDate = useCurrentDate();
  const [age, setAge] = useState<number | "">("");

  const [submittedPatientNumber, setSubmittedPatientNumber] = useState<
    number | null
  >(null);

  const [modal, setModal] = useState<null | "symptoms">(null);

  const { data: patientData, isLoading } = usePatient(submittedPatientNumber);

  useEffect(() => {
    if (dateOfBirth) {
      const dateOfBirthDate = new Date(dateOfBirth);
      setAge(getAge(dateOfBirthDate, currentDate)); // Update age when dateOfBirth or currentDate changes
    }
  }, [dateOfBirth, currentDate]);

  const { mutate: mutatePatient, isPending } = useMutation({
    mutationFn: () => {
      return createPatient({
        name,
        dateOfBirth: new Date(dateOfBirth ?? ""),
        address,
        phone: phoneNumber,
      });
    },
    onError: (error) => {
      console.log(error, "during patient creation");
      toast.error("Error during patient registration");
    },
    onSuccess: (data) => {
      if (data.success) {
        const pid = data.patient.id;
        toast.success(`Patient added with ID: ${pid}`);
        setName("");
        setAge("");
        setDateOfBirth("");
        setAddress("");
        setPhoneNumber("");
        setSubmittedPatientNumber(pid);
        setModal("symptoms");
      } else {
        toast.error(data.message);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutatePatient();
      }}
      className="space-y-4"
    >
      {isPending && (
        <Loader message="Adding patient..." />
      )}
      {isLoading && (
        <Loader
          message="Fetching patient details..."
         
        />
      )}

      {patientData?.success && (
        <SymptomsModal
          isOpen={modal === "symptoms"}
          patientId={patientData.patient.id}
          onClose={() => setModal(null)}
        />
      )}

      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-700">
          Full Name
        </Label>
        <Input
          minLength={3}
          id="name"
          placeholder="Enter full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age" className="text-gray-700">
            Age
          </Label>
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
                setDateOfBirth("");
                return;
              }
              const newAge = Number(e.target.value);
              if (isNaN(newAge)) {
                setAge("");
                return;
              }

              setAge(newAge);
              setDateOfBirth(getDateOfBirth(newAge, currentDate).toISOString());
            }}
            required
            className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="text-gray-700">
            Date of Birth
          </Label>
          <Input
            max={currentDate.toISOString().split("T")[0]}
            id="dateOfBirth"
            type="date"
            value={dateOfBirth ? dateOfBirth.split("T")[0] : ""}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-gray-700">
          Address
        </Label>
        <Input
          id="address"
          placeholder="Enter place name (e.g., Nairobi)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="text-gray-700">
          Phone Number
        </Label>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-900 text-white hover:bg-blue-700"
      >
        Proceed
      </Button>
    </form>
  );
}
