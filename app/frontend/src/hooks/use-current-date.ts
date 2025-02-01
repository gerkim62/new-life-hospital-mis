import { fetchDate } from "@/queries/date";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

function useCurrentDate() {
  const { data } = useQuery({
    queryKey: ["date"],
    queryFn: fetchDate,
  });

  if (data?.success) {
    return new Date(data.date.current);
  } else {
    if (toast.isActive("current-date-error"))
      toast.error("Could not fetch current date from server", {
        toastId: "current-date-error",
      });
    return new Date();
  }
}

export default useCurrentDate;
