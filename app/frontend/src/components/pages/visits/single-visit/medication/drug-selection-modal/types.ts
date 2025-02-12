export type Drug = ManualDrug | DrugFromStock;
export type ManualDrug = {
  name: string;
  description: string | null;
  dosage: string;
  quantity: number | null;
};

export type DrugFromStock = {
  quantity: number;
  unit: string;
  totalPrice: number;
  stockItemId: string;
} & ManualDrug;

export interface HospitalDrug {
  name: string;
  description: string;
  quantity: number;
  unit: string;
  id: string;
}
