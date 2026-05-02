import { useQuery } from "@tanstack/react-query";
import { getVehicleTypesByMake } from "@/services/vehicleApi";
import type { VehicleMake } from "@/types/vehicle";

const useVehicleTypesPresenceMatrix = (makes: VehicleMake[]) => {
  return useQuery({
    queryKey: ["vehicleTypesByMake", makes.map(({ Make_ID }) => Make_ID)],
    queryFn: async () => {
      const data = await Promise.all(
        makes.map(async ({ Make_Name, Make_ID }) => {
          const result = await getVehicleTypesByMake(Make_ID);
          const types = result.Results.map(
            (item) => item.VehicleTypeName,
          ).filter(Boolean);
          return { makeName: Make_Name, types };
        }),
      );

      const typeNames = Array.from(
        new Set(data.flatMap(({ types }) => types)),
      ).sort();

      const labels = data.map(({ makeName }) => makeName);

      const presenceMatrix = typeNames.map((typeName) =>
        data.map(({ types }) => (types.includes(typeName) ? 1 : 0)),
      );

      return { labels, typeNames, presenceMatrix };
    },
    enabled: makes.length > 0,
    staleTime: 1000 * 60 * 30,
    meta: { errorMessage: "Failed to load vehicle types" },
  });
};

export default useVehicleTypesPresenceMatrix;
