import { getPatient } from "@/queries/patients";
import { useQuery } from "@tanstack/react-query";

function usePatient(id: number | null) {
  return useQuery({
    queryKey: ["patient", id],
    queryFn: () => getPatient(id as number),
    enabled: id !== null,
  });
}

export default usePatient;
