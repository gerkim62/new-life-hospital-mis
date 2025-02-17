import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVisit } from "@/mutations/visit";
import { Route } from "@/routes/visits/$visitId.lazy";
import { toast } from "react-toastify";
import Loader from "@/components/small/loader";

interface AdmitPatientModalProps {
  onClose: () => void;
}

interface AdmissionForm {
  bedNumber: string;
  dailySundriesFee: string;
  dailyDoctorsFee: string;
  admissionFee: string;
  dailyNurseCareFee: string;
  dailyBedCharges: string;
}

const AdmitPatientModal: React.FC<AdmitPatientModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<AdmissionForm>({
    bedNumber: "",
    dailySundriesFee: "",
    dailyDoctorsFee: "",
    admissionFee: "",
    dailyNurseCareFee: "",
    dailyBedCharges: "",
  });

  const visitId = Route.useParams().visitId;
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: () =>
      updateVisit({
        visitId,
        admissionBed: formData.bedNumber,
        dailySundriesFee: parseFloat(formData.dailySundriesFee),
        dailyDoctorsFee: parseFloat(formData.dailyDoctorsFee),
        admissionFee: parseFloat(formData.admissionFee),
        dailyNurseCareFee: parseFloat(formData.dailyNurseCareFee),
        dailyBedCharges: parseFloat(formData.dailyBedCharges),
        admittedAt: new Date().toISOString(),
      }),
    onError: () => toast.error("Something went wrong, please retry."),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Patient admitted successfully.");
        queryClient.refetchQueries({
          queryKey: ["visits"],
        });
        onClose();
      } else {
        toast.error(data.message);
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== "") &&
           Object.values(formData).slice(1).every(value => !isNaN(parseFloat(value)));
  };

  const handleAdmit = () => {
    mutate();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-blue-50">
        <DialogHeader className="bg-blue-600 -mt-4 -mx-4 p-4 rounded-t-lg">
          <DialogTitle className="text-white">Admit Patient</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <div className="flex justify-between mb-4 text-sm">
            <p className="text-blue-800">
              <strong>Patient Name:</strong> John Doe
            </p>
            <p className="text-blue-800">
              <strong>Patient ID:</strong> 123456
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
            <div>
              <Label htmlFor="bedNumber" className="text-blue-700">Bed Number</Label>
              <Input
                id="bedNumber"
                placeholder="Enter bed number"
                value={formData.bedNumber}
                onChange={handleChange}
                className="h-8"
              />
            </div>
            
            <div>
              <Label htmlFor="admissionFee" className="text-blue-700">One-time Admission Fee</Label>
              <Input
                id="admissionFee"
                type="number"
                step="0.01"
                placeholder="Enter fee"
                value={formData.admissionFee}
                onChange={handleChange}
                className="h-8"
              />
            </div>

            <div>
              <Label htmlFor="dailyBedCharges" className="text-blue-700 flex items-center gap-1">
                Bed Charges <span className="text-xs text-blue-500">(daily)</span>
              </Label>
              <Input
                id="dailyBedCharges"
                type="number"
                step="0.01"
                placeholder="Enter charges"
                value={formData.dailyBedCharges}
                onChange={handleChange}
                className="h-8"
              />
            </div>

            <div>
              <Label htmlFor="dailyDoctorsFee" className="text-blue-700 flex items-center gap-1">
                Doctor's Fee <span className="text-xs text-blue-500">(daily)</span>
              </Label>
              <Input
                id="dailyDoctorsFee"
                type="number"
                step="0.01"
                placeholder="Enter fee"
                value={formData.dailyDoctorsFee}
                onChange={handleChange}
                className="h-8"
              />
            </div>

            <div>
              <Label htmlFor="dailyNurseCareFee" className="text-blue-700 flex items-center gap-1">
                Nurse Care Fee <span className="text-xs text-blue-500">(daily)</span>
              </Label>
              <Input
                id="dailyNurseCareFee"
                type="number"
                step="0.01"
                placeholder="Enter fee"
                value={formData.dailyNurseCareFee}
                onChange={handleChange}
                className="h-8"
              />
            </div>

            <div>
              <Label htmlFor="dailySundriesFee" className="text-blue-700 flex items-center gap-1">
                Sundries Fee <span className="text-xs text-blue-500">(daily)</span>
              </Label>
              <Input
                id="dailySundriesFee"
                type="number"
                step="0.01"
                placeholder="Enter fee"
                value={formData.dailySundriesFee}
                onChange={handleChange}
                className="h-8"
              />
            </div>
          </div>
        </div>
        
        <DialogFooter className="border-t border-blue-200 pt-3">
          <Button variant="outline" onClick={onClose} className="border-blue-300">
            Cancel
          </Button>
          <Button 
            onClick={handleAdmit} 
            disabled={!isFormValid()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Admit
          </Button>
        </DialogFooter>
        {isPending && <Loader message="Admitting patient..." />}
      </DialogContent>
    </Dialog>
  );
};

export default AdmitPatientModal;