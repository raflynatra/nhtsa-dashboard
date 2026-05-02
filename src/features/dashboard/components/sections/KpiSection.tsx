import { Trophy, Car, Factory, Layers } from "lucide-react";
import { KpiCard } from "../cards/KpiCard";
import { useVehicleStore } from "@/store/useVehicleStore";
import useMakesAnalytics from "@/hooks/useMakesAnalytics";
import useVehicleTypeDistribution from "@/hooks/useVehicleTypesDistribution";

export const KpiSection = () => {
  const { vehicleMakes } = useVehicleStore();
  const { data, isLoading } = useMakesAnalytics(vehicleMakes);
  const { data: vehicleTypes, isLoading: loadingVt } =
    useVehicleTypeDistribution(vehicleMakes);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <KpiCard
        label="Top Make"
        value={data?.[0].name}
        icon={Trophy}
        color="bg-orange-500"
      />
      <KpiCard
        label="Total Makes"
        value={data?.length ?? 0}
        icon={Factory}
        color="bg-blue-500"
        loading={isLoading}
        linkTo="/vehicles"
      />
      <KpiCard
        label="Total Models"
        value={data?.reduce((acc, curr) => acc + curr.modelsCount, 0) ?? 0}
        icon={Car}
        color="bg-indigo-500"
        loading={isLoading}
        linkTo="/vehicles"
      />
      <KpiCard
        label="Vehicle Types"
        value={vehicleTypes?.length ?? 0}
        icon={Layers}
        color="bg-violet-500"
        linkTo="/vehicles"
        loading={loadingVt}
      />
    </div>
  );
};
