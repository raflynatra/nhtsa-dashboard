import { VehicleMakesSelector } from "./filters/VehicleMakesSelector";
import { AnalyticSection } from "./sections/AnalyticSection";
import { KpiSection } from "./sections/KpiSection";
import { WidgetSection } from "./sections/WidgetSection";

export const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <VehicleMakesSelector />
      <KpiSection />
      <WidgetSection />
      <AnalyticSection />
    </div>
  );
};
