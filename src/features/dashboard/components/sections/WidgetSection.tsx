import type { FC } from "react";
import { Insights } from "../widgets/Insights";
import { MakesComparation } from "../widgets/MakesComparation";
import { VehicleDistribution } from "../widgets/VehicleDistribution";
import { VehicleTypesByMake } from "../widgets/VehicleTypesByMake";
import { WidgetCard } from "../cards/WidgetCard";

const WIDGET_LIST = [
  {
    id: "insights",
    title: "Key Insights",
    component: <Insights />,
  },
  {
    id: "modelsComparation",
    title: "Models per Makes",
    subtitle: "Compare the number of models for each selected make",
    component: <MakesComparation />,
  },
  {
    id: "vehicleDistribution",
    title: "Vehicle Distributon by Type",
    subtitle: "Breakdown of vehicle types across selected makes",
    component: <VehicleDistribution />,
  },
  {
    id: "vehicleTypesByMake",
    title: "Vehicle Types by Make",
    subtitle: "See which vehicle types are offered by each make",
    component: <VehicleTypesByMake />,
  },
];

export const WidgetSection: FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {WIDGET_LIST.map((widget) => (
        <WidgetCard key={widget.id} {...widget} />
      ))}
    </div>
  );
};
