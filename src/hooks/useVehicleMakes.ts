import { useQuery } from "@tanstack/react-query";
import { getAllMakes } from "@/services/vehicleApi";

const useVehicleMakes = () => {
  return useQuery({
    queryKey: ["makes"],
    queryFn: getAllMakes,
    staleTime: 5 * 60 * 1000,
    select: (data) => data.Results,
  });
};

export default useVehicleMakes;
