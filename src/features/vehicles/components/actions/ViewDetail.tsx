import type { VehicleMake } from "@/types/vehicle";
import { Button } from "antd";
import { useState, type FC } from "react";
import { VehicleDetailModal } from "../modals/VehicleDetailModal";

interface ViewDetailButtonProps {
  record: VehicleMake;
}

export const ViewDetailButton: FC<ViewDetailButtonProps> = ({ record }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        View
      </Button>
      <VehicleDetailModal
        open={open}
        make={record}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
