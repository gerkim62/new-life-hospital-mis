import { PatientAdmission } from "@app/backend/src/types/prisma";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCurrentDate from "@/hooks/use-current-date";
import { formatCurrency } from "@/lib/format";
import {
  Bed,
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  Heart,
  Package,
  Receipt,
  Stethoscope,
} from "lucide-react";
import { calculateDays } from "@/lib/date";

type Props = {
  endDate: Date | null;
  admission: PatientAdmission;
};

const AdmissionDetails = ({
  endDate,
  admission: {
    admittedAt,
    bedNumber,
    dailyBedCharges,
    dailyDoctorsFee,
    dailyNurseCareFee,
    dailySundriesFee,
    admissionFee,
  },
}: Props) => {
  const today = useCurrentDate();

  const days = calculateDays(new Date(admittedAt), new Date(endDate ?? today));
  const dailyTotal =
    dailySundriesFee + dailyDoctorsFee + dailyNurseCareFee + dailyBedCharges;
  const totalAmount = dailyTotal * days + admissionFee;

  // Calculate accumulated amounts
  const accumulatedBedCharges = dailyBedCharges * days;
  const accumulatedDoctorsFee = dailyDoctorsFee * days;
  const accumulatedNurseFee = dailyNurseCareFee * days;
  const accumulatedSundriesFee = dailySundriesFee * days;

  return (
    <Card className="w-full bg-blue-50">
      <CardHeader className="bg-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Receipt size={24} />
          Inpatient Admission Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Bed className="text-blue-600" size={18} />
            <span className="text-sm font-medium">Bed Number:</span>
          </div>
          <div className="text-sm">{bedNumber}</div>

          <div className="flex items-center gap-2">
            <Calendar className="text-blue-600" size={18} />
            <span className="text-sm font-medium">Admission Date:</span>
          </div>
          <div className="text-sm">
            {new Date(admittedAt).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-2">
            <Clock className="text-blue-600" size={18} />
            <span className="text-sm font-medium">Days Elapsed:</span>
          </div>
          <div className="text-sm">{days} days</div>
        </div>

        <div className="mt-6 border-t border-blue-200 pt-4">
          <h3 className="text-lg font-semibold mb-4 text-blue-800 flex items-center gap-2">
            <CreditCard size={20} />
            Charges Breakdown
          </h3>
          <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-lg shadow-sm">
            <div className="font-medium text-sm text-blue-600">Type</div>
            <div className="font-medium text-sm text-blue-600 text-right">
              Daily Rate
            </div>
            <div className="font-medium text-sm text-blue-600 text-right">
              Accumulated ({days} days)
            </div>

            <div className="flex items-center gap-2">
              <Bed className="text-blue-600" size={16} />
              <span className="text-sm">Bed Charges</span>
            </div>
            <div className="text-sm text-right">
              {formatCurrency(dailyBedCharges)}
            </div>
            <div className="text-sm text-right font-medium">
              {formatCurrency(accumulatedBedCharges)}
            </div>

            <div className="flex items-center gap-2">
              <Stethoscope className="text-blue-600" size={16} />
              <span className="text-sm">Doctor's Fee</span>
            </div>
            <div className="text-sm text-right">
              {formatCurrency(dailyDoctorsFee)}
            </div>
            <div className="text-sm text-right font-medium">
              {formatCurrency(accumulatedDoctorsFee)}
            </div>

            <div className="flex items-center gap-2">
              <Heart className="text-blue-600" size={16} />
              <span className="text-sm">Nurse Care</span>
            </div>
            <div className="text-sm text-right">
              {formatCurrency(dailyNurseCareFee)}
            </div>
            <div className="text-sm text-right font-medium">
              {formatCurrency(accumulatedNurseFee)}
            </div>

            <div className="flex items-center gap-2">
              <Package className="text-blue-600" size={16} />
              <span className="text-sm">Sundries</span>
            </div>
            <div className="text-sm text-right">
              {formatCurrency(dailySundriesFee)}
            </div>
            <div className="text-sm text-right font-medium">
              {formatCurrency(accumulatedSundriesFee)}
            </div>

            <div className="flex items-center gap-2 font-medium border-t border-blue-100 pt-2">
              <DollarSign className="text-blue-600" size={16} />
              <span className="text-sm">Daily Total</span>
            </div>
            <div className="text-sm font-medium text-right border-t border-blue-100 pt-2">
              {formatCurrency(dailyTotal)}
            </div>
            <div className="text-sm font-medium text-right border-t border-blue-100 pt-2">
              {formatCurrency(dailyTotal * days)}
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-blue-200 pt-4">
          <div className="grid grid-cols-2 gap-3 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <CreditCard className="text-blue-600" size={16} />
              <span className="text-sm">One-time Admission Fee:</span>
            </div>
            <div className="text-sm text-right">
              {formatCurrency(admissionFee)}
            </div>

            <div className="flex items-center gap-2 text-lg font-bold mt-4 text-blue-800">
              <Receipt className="text-blue-600" size={20} />
              <span>Total Amount:</span>
            </div>
            <div className="text-lg font-bold text-right mt-4 text-blue-800">
              {formatCurrency(totalAmount)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdmissionDetails;
