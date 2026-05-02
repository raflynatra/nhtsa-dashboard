import useMakesAnalytics from "@/hooks/useMakesAnalytics";
import useVehicleTypeDistribution from "@/hooks/useVehicleTypesDistribution";
import { useVehicleStore } from "@/store/useVehicleStore";
import { cn } from "@/lib/utils";
import {
  Award,
  Car,
  Cog,
  Target,
  Motorbike,
  Forklift,
  Truck,
  Van,
  type LucideIcon,
} from "lucide-react";
import { useMemo, type FC } from "react";

const iconMap: Record<string, LucideIcon> = {
  truck: Truck,
  passengercar: Car,
  motorcycle: Motorbike,
  "lowspeedvehicle(lsv)": Forklift,
  incompletevehicle: Cog,
  mostDiverse: Award,
  mostSpecialized: Target,
};

const colorMap: Record<string, string> = {
  mostDiverse: "bg-orange-500",
  mostSpecialized: "bg-violet-500",
  passengercar: "bg-blue-500",
  truck: "bg-indigo-500",
  motorcycle: "bg-pink-500",
  lowspeedvehicle: "bg-green-500",
  incompletevehicle: "bg-gray-500",
};

export const Insights: FC = () => {
  const { vehicleMakes } = useVehicleStore();
  const { data, isLoading } = useMakesAnalytics(vehicleMakes);
  const { data: vehicleTypes, isLoading: loadingVt } =
    useVehicleTypeDistribution(vehicleMakes);

  const insights = useMemo(() => {
    const sortedByCount = vehicleTypes?.toSorted((a, b) => a.count - b.count);
    const minCount = sortedByCount?.[0]?.count;
    const maxCount = sortedByCount?.at(-1)?.count;
    const leastCommonTypes =
      sortedByCount?.filter((type) => type.count === minCount) ?? [];
    const mostCommonTypes =
      sortedByCount?.filter((type) => type.count === maxCount) ?? [];

    const sortedBySpecialization = data?.toSorted(
      (a, b) => a.vehicleTypeCount - b.vehicleTypeCount,
    );
    const minVehicleTypeCount = sortedBySpecialization?.[0]?.vehicleTypeCount;
    const mostSpecializedMakes =
      sortedBySpecialization?.filter(
        (specialized) => specialized.vehicleTypeCount === minVehicleTypeCount,
      ) ?? [];

    const maxDiversityScore = data?.[0]?.diversityScore;
    const mostDiverseMakes =
      data?.filter((diverse) => diverse.diversityScore === maxDiversityScore) ??
      [];

    return [
      {
        key: "mostDiverse",
        icon: "mostDiverse",
        label: "Most Diverse Make",
        names: mostDiverseMakes.map((m) => m.name),
        sub: `Diversity score: ${maxDiversityScore ?? "—"}`,
      },
      {
        key: "mostCommonType",
        icon: mostCommonTypes[0]?.type.replace(/\s+/g, "").toLowerCase() ?? "",
        label: "Most Common Vehicle Type",
        names: mostCommonTypes.map((t) => t.type),
        sub: `${maxCount ?? "—"} makes`,
      },
      {
        key: "leastCommonType",
        icon: leastCommonTypes[0]?.type.replace(/\s+/g, "").toLowerCase() ?? "",
        label: "Least Common Vehicle Type",
        names: leastCommonTypes.map((t) => t.type),
        sub: `${minCount ?? "—"} makes`,
      },
      {
        key: "mostSpecialized",
        icon: "mostSpecialized",
        label: "Most Specialized Make",
        names: mostSpecializedMakes.map((m) => m.name),
        sub: `${minVehicleTypeCount ?? "—"} vehicle types`,
      },
    ];
  }, [data, vehicleTypes]);

  const loading = isLoading || loadingVt;

  return (
    <ul className="flex flex-col divide-y divide-gray-100">
      {insights.map((insight) => {
        const Icon = iconMap[insight.icon] ?? Van;
        const color = colorMap[insight.icon] ?? "bg-gray-400";
        return (
          <li
            key={insight.key}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div className={cn("rounded-lg p-2 shrink-0", color)}>
              <Icon size={18} className="text-white" />
            </div>
            <div className="min-w-0">
              {loading ? (
                <div className="h-4 w-24 rounded bg-gray-100 animate-pulse mb-1" />
              ) : (
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {insight.names.length > 0 ? insight.names.join(", ") : "—"}
                </p>
              )}
              <p className="text-xs text-gray-500">{insight.label}</p>
              <p className="text-xs text-gray-400">{insight.sub}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
