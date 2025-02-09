import { getVisit } from "@/queries/visits";
import { useQuery } from "@tanstack/react-query";

function useVisit(visitId: string) {
  return useQuery({
    queryKey: ["visits", visitId],
    queryFn: () => getVisit(visitId),
    enabled: !!visitId,
  });
}

export default useVisit;
