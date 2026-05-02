import type { User } from "@/types/auth";
import { Table, type TableColumnsType } from "antd";
import type { FC } from "react";

const userColumns: TableColumnsType<User> = [
  {
    title: "User ID",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id.localeCompare(b.id),
    width: 200,
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    sorter: (a, b) => a.username.localeCompare(b.username),
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    sorter: (a, b) => a.role.localeCompare(b.role),
  },
];

interface UserManagementTableProps {
  dataSource: User[];
}

export const UserManagementTable: FC<UserManagementTableProps> = ({
  dataSource,
}) => {
  return (
    <Table<User>
      columns={userColumns}
      dataSource={dataSource}
      rowKey="id"
      pagination={{
        pageSizeOptions: ["10", "25", "50"],
        showTotal: (total) => `${total} makes`,
      }}
      scroll={{ x: "max-content" }}
    />
  );
};
