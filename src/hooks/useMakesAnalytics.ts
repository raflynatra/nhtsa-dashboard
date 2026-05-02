import {
  getModelsForMakeId,
  getVehicleTypesByMake,
} from "@/services/vehicleApi";
import type { VehicleMake } from "@/types/vehicle";
import { useQuery } from "@tanstack/react-query";

const useMakesAnalytics = (makes: VehicleMake[]) => {
  return useQuery({
    queryKey: ["makes-analytics", makes.map(({ Make_ID }) => Make_ID)],
    queryFn: async () => {
      const data = await Promise.all(
        makes.map(async ({ Make_ID, Make_Name }) => {
          const models = await getModelsForMakeId(Make_ID);
          const types = await getVehicleTypesByMake(Make_ID);

          return {
            id: Make_ID,
            name: Make_Name,
            modelsCount: models.Count,
            vehicleTypeCount: types.Count,
            diversityScore: models.Count * types.Count,
          };
        }),
      );

      return data.sort((a, b) => b.diversityScore - a.diversityScore);
    },
    enabled: makes.length > 0,
    staleTime: 1000 * 60 * 30,
    meta: { errorMessage: "Failed to load analytics" },
  });
};

export default useMakesAnalytics;
