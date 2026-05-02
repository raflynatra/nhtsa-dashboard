import useMakesAnalytics from "@/hooks/useMakesAnalytics";
import { useVehicleStore } from "@/store/useVehicleStore";
import { Table, Tooltip, type TableProps } from "antd";
import { type FC } from "react";
import { Info } from "lucide-react";
import { WidgetCard } from "../cards/WidgetCard";

const columns: TableProps["columns"] = [
  {
    title: "Make ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Make Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Total Model",
    dataIndex: "modelsCount",
    key: "modelsCount",
  },
  {
    title: "Total Vehicle Type",
    dataIndex: "vehicleTypeCount",
    key: "vehicleTypeCount",
  },
  {
    title: (
      <div className="flex gap-1 items-center">
        <span>Diversity Score</span>
        <Tooltip title="Diversity Score = Total Models * Total Vehicle Types">
          <Info className="cursor-pointer" size={14} />
        </Tooltip>
      </div>
    ),
    dataIndex: "diversityScore",
    key: "diversityScore",
  },
];

export const AnalyticSection: FC = () => {
  const { vehicleMakes } = useVehicleStore();
  const { data, isLoading } = useMakesAnalytics(vehicleMakes);

  return (
    <WidgetCard
      title="Makes Analytic"
      subtitle="Measures how varied a make's vehicle lineup is based on models and
          types"
      component={
        <Table
          dataSource={data}
          loading={isLoading}
          columns={columns}
          pagination={false}
          scroll={{ x: 300 }}
        />
      }
    />
  );
};
