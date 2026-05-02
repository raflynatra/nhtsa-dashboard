import { Table, type TableColumnsType } from "antd";
import { type FC } from "react";

interface VehicleDetailData {
  model: string;
  type: string;
}

interface VehicleDetailTableProps {
  dataSource: VehicleDetailData[];
}

const vehicleColumns: TableColumnsType<VehicleDetailData> = [
  {
    title: "Model",
    dataIndex: "model",
    key: "model",
    sorter: (a, b) => a.model.localeCompare(b.model),
    width: 200,
  },
  {
    title: "Vehicle Type",
    dataIndex: "type",
    key: "type",
    sorter: (a, b) => a.type.localeCompare(b.type),
  },
];

export const VehicleDetailTable: FC<VehicleDetailTableProps> = ({
  dataSource,
}) => {
  return (
    <Table<VehicleDetailData>
      columns={vehicleColumns}
      dataSource={dataSource}
      pagination={false}
      rowKey="Make_ID"
      scroll={{ y: 280 }}
    />
  );
};
