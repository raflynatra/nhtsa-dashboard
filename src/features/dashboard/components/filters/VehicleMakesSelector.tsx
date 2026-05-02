import useVehicleMakes from "@/hooks/useVehicleMakes";
import { useVehicleStore } from "@/store/useVehicleStore";
import { Select, type SelectProps } from "antd";
import { useMemo, type FC } from "react";

export const VehicleMakesSelector: FC = () => {
  const { vehicleMakes, setVehicleMakes } = useVehicleStore();
  const { data, isLoading } = useVehicleMakes();

  const options: SelectProps["options"] = useMemo(
    () =>
      data?.map((make) => ({
        key: make.Make_ID,
        label: make.Make_Name,
        value: make.Make_Name,
      })),
    [data],
  );

  const handleChange: SelectProps["onChange"] = (value) => {
    const newSelection =
      data?.filter(({ Make_Name }) => value.includes(Make_Name)) ?? [];
    setVehicleMakes?.(newSelection);
  };

  return (
    <Select
      mode="multiple"
      value={vehicleMakes?.map(({ Make_Name }) => Make_Name)}
      maxCount={5}
      options={options}
      onChange={handleChange}
      loading={isLoading}
      placeholder="Select up to 5 makes to compare"
      showSearch={{
        optionFilterProp: "label",
      }}
    />
  );
};
