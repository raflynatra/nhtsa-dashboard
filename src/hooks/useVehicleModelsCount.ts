import { useQuery } from "@tanstack/react-query";
import { getModelsForMakeId } from "@/services/vehicleApi";
import type { VehicleMake } from "@/types/vehicle";

const useVehicleModelsForMakeCount = (makes: VehicleMake[]) => {
  return useQuery({
    queryKey: ["models", makes],
    queryFn: async () => {
      return await Promise.all(
        makes.map(async ({ Make_ID, Make_Name }) => {
          const models = await getModelsForMakeId(Make_ID);

          return {
            make: Make_Name,
            count: models.Count,
          };
        }),
      );
    },
    enabled: makes.length > 0,
    staleTime: 0,
    meta: { errorMessage: "Failed to load models" },
  });
};

export default useVehicleModelsForMakeCount;
