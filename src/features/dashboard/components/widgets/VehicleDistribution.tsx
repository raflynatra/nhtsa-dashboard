import { useMemo, type FC } from "react";
import useVehicleTypeDistribution from "@/hooks/useVehicleTypesDistribution";
import { ChartSkeleton, DoughnutChart } from "@/components";
import { Table, type TableProps } from "antd";
import { useVehicleStore } from "@/store/useVehicleStore";
import { COLORS } from "../../constants";

const columns: TableProps["columns"] = [
  {
    key: "type",
    dataIndex: "type",
    title: "Type",
  },
  {
    key: "count",
    dataIndex: "count",
    title: "Total Manufacturer",
  },
  {
    key: "color",
    dataIndex: "backgroundColor",
    render: (value) => (
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: value }}
      />
    ),
  },
];

export const VehicleDistribution: FC = () => {
  const vehicleMakes = useVehicleStore((state) => state.vehicleMakes);
  const { data, isLoading } = useVehicleTypeDistribution(vehicleMakes);

  const dataset = useMemo(
    () =>
      data?.map((value, index) => ({
        ...value,
        backgroundColor: COLORS[index % COLORS.length],
      })),
    [data],
  );

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="w-full order-2 md:w-1/2 md:order-1">
        <Table
          columns={columns}
          dataSource={dataset}
          rowKey="type"
          loading={isLoading}
          pagination={false}
          scroll={{ x: 100 }}
        />
      </div>
      <div className="w-full order-1 md:w-1/2 md:order-2">
        {dataset ? (
          <div className="min-h-110 p-4 border border-gray-200 rounded-xl flex flex-col justify-center">
            <DoughnutChart
              labels={dataset.map(({ type }) => type)}
              values={dataset.map(({ count }) => count)}
              backgroundColor={dataset.map(
                ({ backgroundColor }) => backgroundColor,
              )}
            />
          </div>
        ) : (
          <ChartSkeleton />
        )}
      </div>
    </div>
  );
};
