import {
  StackedBarChart,
  type StackedDataset,
  ChartSkeleton,
} from "@/components";
import useVehicleTypesPresenceMatrix from "@/hooks/useVehicleTypesPresenceMatrix";
import { useVehicleStore } from "@/store/useVehicleStore";
import { useMemo, type FC } from "react";
import { COLORS } from "../../constants";

export const VehicleTypesByMake: FC = () => {
  const vehicleMakes = useVehicleStore((state) => state.vehicleMakes);
  const { data, isLoading } = useVehicleTypesPresenceMatrix(vehicleMakes);

  const datasets = useMemo<StackedDataset[]>(() => {
    if (!data) return [];

    return data.typeNames.map((typeName, index) => ({
      label: typeName,
      data: data.presenceMatrix[index],
      backgroundColor: COLORS[index % COLORS.length],
    }));
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      {!isLoading ? (
        <div className="p-4 border border-gray-200 rounded-xl">
          <StackedBarChart labels={data?.labels ?? []} datasets={datasets} />
        </div>
      ) : (
        <ChartSkeleton />
      )}
    </div>
  );
};
