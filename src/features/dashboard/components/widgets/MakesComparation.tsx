import { useMemo, type FC } from "react";
import useVehicleModelsCount from "@/hooks/useVehicleModelsCount";
import { ChartSkeleton, BarChart } from "@/components";
import { useVehicleStore } from "@/store/useVehicleStore";

export const MakesComparation: FC = () => {
  const vehicleMakes = useVehicleStore((state) => state.vehicleMakes);
  const { data, isLoading } = useVehicleModelsCount(vehicleMakes);

  const barData = useMemo(() => {
    if (!data) return { labels: [], values: [] };

    return {
      labels: data.map((value) => value.make),
      values: data.map((value) => value.count),
    };
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      {!isLoading ? (
        <div className="p-4 border border-gray-200 rounded-xl">
          <BarChart labels={barData.labels} values={barData.values} />
        </div>
      ) : (
        <ChartSkeleton />
      )}
    </div>
  );
};
