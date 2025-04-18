import SymptomsModal from "@/components/modals/symptoms";
import Loader from "@/components/small/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePatient from "@/hooks/use-patient";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ExistingUser() {
  const [patientNumber, setPatientNumber] = useState("");
  const [submittedPatientNumber, setSubmittedPatientNumber] = useState<
    number | null
  >(null);

  const { data, isLoading } = usePatient(submittedPatientNumber);

  const [modal, setModal] = useState<null | "symptoms">(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    console.log(data);
    if (isLoading || !data) return;
    if (data?.success) {
      setModal("symptoms");
    } else {
      toast.error(data.message);
    }
  }, [data, isLoading]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmittedPatientNumber(Number(patientNumber));

        if (data?.success) {
          setModal("symptoms");
        } else
          queryClient.invalidateQueries({
            queryKey: ["patient", submittedPatientNumber],
          });
      }}
      className="space-y-2"
    >
      {isLoading && (
        <Loader
          message="Fetching patient details..."
          
        />
      )}
      {data?.success && (
        <SymptomsModal
          isOpen={modal === "symptoms"}
          patientId={data.patient.id}
          onClose={() => setModal(null)}
        />
      )}

      <Label htmlFor="patientNumber" className="text-gray-700">
        Patient Number
      </Label>
      <Input
        disabled={isLoading}
        type="number"
        id="patientNumber"
        placeholder="Enter patient number"
        value={patientNumber}
        onChange={(e) => setPatientNumber(e.target.value)}
        required
        className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
      />
      <Button
        disabled={isLoading}
        type="submit"
        className="w-full bg-blue-900 text-white hover:bg-blue-700"
      >
        Proceed
      </Button>
    </form>
  );
}
