import { getVehicleTypesForMakeId } from "@/services/vehicleApi";
import type { VehicleMake } from "@/types/vehicle";
import { useQuery } from "@tanstack/react-query";

const useVehicleTypesForMakeId = (make: VehicleMake, enabled: boolean) => {
  return useQuery({
    queryKey: ["modal-types", make.Make_ID],
    queryFn: () => getVehicleTypesForMakeId(make.Make_ID),
    enabled,
    select: (data) => data.Results,
    staleTime: 0,
    meta: { errorMessage: "Failed to load vehicle type list" },
  });
};

export default useVehicleTypesForMakeId;
