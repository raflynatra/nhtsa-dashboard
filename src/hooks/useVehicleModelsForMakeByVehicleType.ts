import { getModelsForMakeYear } from "@/services/vehicleApi";
import type { VehicleMake, VehicleType } from "@/types/vehicle";
import { useQuery } from "@tanstack/react-query";

const useVehicleModelsForMakeByVehicleType = (
  payload: {
    make: VehicleMake;
    types: VehicleType[];
  },
  enabled: boolean,
) => {
  return useQuery({
    queryKey: ["modal-models", payload.make.Make_Name, payload.types],
    queryFn: async () => {
      const { make, types } = payload;
      const results = await Promise.all(
        types.map(async ({ VehicleTypeName }) => {
          const response = await getModelsForMakeYear(
            make.Make_Name,
            VehicleTypeName,
          );
          return response.Results.map((model) => ({
            model: model.Model_Name,
            type: VehicleTypeName,
          }));
        }),
      );
      return results.flat();
    },
    enabled,
    staleTime: 0,
    meta: { errorMessage: "Failed to load models list" },
  });
};

export default useVehicleModelsForMakeByVehicleType;
