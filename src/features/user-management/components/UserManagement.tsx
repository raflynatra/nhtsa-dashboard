import { useMemo, useState, type FC } from "react";
import { USERS } from "@/data/users";
import { UserManagementTable } from "./tables/VehicleTable";
import { SearchInput } from "@/components";

export const UserManagement: FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const tableData = useMemo(() => {
    return USERS.filter(({ username }) =>
      username.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [searchValue]);

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <SearchInput
        onSearch={(e) => setSearchValue(e?.target.value ?? "")}
        placeholder="Search username"
      />

      <UserManagementTable dataSource={tableData} />
    </div>
  );
};
