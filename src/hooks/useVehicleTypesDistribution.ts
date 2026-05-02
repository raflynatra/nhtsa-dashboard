import { useQuery } from "@tanstack/react-query";
import { getVehicleTypesByMake } from "@/services/vehicleApi";
import type { VehicleMake } from "@/types/vehicle";

const useVehicleTypeDistribution = (makes: VehicleMake[]) => {
  return useQuery({
    queryKey: ["vehicleTypeDistribution", makes],
    queryFn: async () => {
      const allTypes: string[] = [];

      await Promise.all(
        makes.map(async ({ Make_ID }) => {
          const data = await getVehicleTypesByMake(Make_ID);

          data.Results.forEach((item) => {
            if (item.VehicleTypeName) {
              allTypes.push(item.VehicleTypeName);
            }
          });
        }),
      );

      const distribution = allTypes.reduce<Record<string, number>>(
        (accumulator, type) => {
          accumulator[type] = (accumulator[type] || 0) + 1;

          return accumulator;
        },
        {},
      );

      return Object.entries(distribution).map(([type, count]) => ({
        type,
        count,
      }));
    },
    enabled: makes.length > 0,
    staleTime: 1000 * 60 * 30,
    meta: { errorMessage: "Failed to load vehicle types" },
  });
};

export default useVehicleTypeDistribution;
