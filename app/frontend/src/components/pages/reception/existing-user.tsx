import SymptomsModal from "@/components/modals/symptoms";
import Loader from "@/components/small/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePatient from "@/hooks/use-patient";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ExistingUser() {
  const [patientNumber, setPatientNumber] = useState("");
  const [submittedPatientNumber, setSubmittedPatientNumber] = useState<
    number | null
  >(null);

  const { data, isLoading } = usePatient(submittedPatientNumber);

  const [modal, setModal] = useState<null | "symptoms">(null);

  useEffect(() => {
    console.log(data);
    if (isLoading || !data) return;
    if (data?.success) {
      setModal("symptoms");
    } else {
      toast.error(data?.message ?? "Something went wrong");
    }
  }, [data, isLoading]);

  return (
    <div className="space-y-2">
      {isLoading && <Loader message="Fetching patient details..." />}
      {data?.success && (
        <SymptomsModal
          isOpen={modal === "symptoms"}
          patientId={data.patient.id}
          onClose={() => setModal(null)}
        />
      )}
      <Label htmlFor="patientNumber">Patient Number</Label>
      <Input
        type="number"
        id="patientNumber"
        placeholder="Enter patient number"
        value={patientNumber}
        onChange={(e) => setPatientNumber(e.target.value)}
        required
      />
      <Button
        onClick={() => {
          setSubmittedPatientNumber(Number(patientNumber));
          if (data?.success) {
            setModal("symptoms");
          }
        }}
        type="submit"
        className="w-full"
      >
        Proceed
      </Button>
    </div>
  );
}
