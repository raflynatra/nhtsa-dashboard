import useVehicleMakes from "@/hooks/useVehicleMakes";
import type { VehicleMake } from "@/types/vehicle";
import { useMemo, useState, type FC } from "react";
import { VehicleTable } from "./tables/VehicleTable";
import { SearchInput } from "@/components";

interface VehicleProps {
  extraData?: VehicleMake[];
}

export const Vehicle: FC<VehicleProps> = ({ extraData }) => {
  const [searchValue, setSearchValue] = useState("");
  const { data = [], isPending } = useVehicleMakes();

  const tableData = useMemo(() => {
    const mergedData = extraData ? [...extraData, ...data] : data;

    return mergedData.filter(({ Make_Name }) =>
      Make_Name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [searchValue, data, extraData]);

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <SearchInput
        onSearch={(e) => setSearchValue(e?.target.value ?? "")}
        placeholder="Search make name"
      />

      <VehicleTable dataSource={tableData} loading={isPending} />
    </div>
  );
};
