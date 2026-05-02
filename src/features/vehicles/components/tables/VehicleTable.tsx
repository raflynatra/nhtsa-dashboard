import type { VehicleMake } from "@/types/vehicle";
import { Table, type TableColumnsType } from "antd";
import type { FC } from "react";
import { ViewDetailButton } from "../actions/ViewDetail";

const vehicleColumns: TableColumnsType<VehicleMake> = [
  {
    title: "Make ID",
    dataIndex: "Make_ID",
    key: "Make_ID",
    sorter: (a, b) => a.Make_ID - b.Make_ID,
    width: 200,
  },
  {
    title: "Make Name",
    dataIndex: "Make_Name",
    key: "Make_Name",
    sorter: (a, b) => a.Make_Name.localeCompare(b.Make_Name),
  },
  {
    title: "Actions",
    key: "actions",
    width: 100,
    render: (_, record) => <ViewDetailButton record={record} />,
  },
];

interface VehicleTableProps {
  dataSource: VehicleMake[];
  loading: boolean;
}

export const VehicleTable: FC<VehicleTableProps> = ({
  dataSource,
  loading,
}) => {
  return (
    <Table<VehicleMake>
      columns={vehicleColumns}
      dataSource={dataSource}
      rowKey="Make_ID"
      loading={loading}
      pagination={{
        pageSizeOptions: ["10", "25", "50"],
        showTotal: (total) => `${total} makes`,
      }}
      scroll={{ x: "max-content" }}
    />
  );
};
