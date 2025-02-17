import {
  Lab,
  LabResult,
  PatientVisit,
  Drug,
  Expense,
  Patient,
  PatientAdmission,
} from "@prisma/client";
import { ApiResponse } from "../../../types/api/response";

type ComprehensiveLab = Lab & {
  result: LabResult | null;
};

export type ComprehensiveDrug = Drug &
  (
    | {
        price: number;
        fromStock: true;

        quantity: number;
        unit: string;
      }
    | {
        fromStock: false;
        price: null;
      }
  );

export type ComprehensiveVisit = PatientVisit & {
  labs: ComprehensiveLab[];
  drugs: ComprehensiveDrug[];
  expenses: Expense[];
  patient: Patient;
  admission: PatientAdmission | null;
};

export type GetVisitResponse = ApiResponse<
  ComprehensiveVisit,
  unknown,
  "visit"
>;

export type MarkAsLeftResponse = ApiResponse<PatientVisit, unknown, "visit">;

export type PutVisitResponse = ApiResponse<PatientVisit, unknown, "visit">;
