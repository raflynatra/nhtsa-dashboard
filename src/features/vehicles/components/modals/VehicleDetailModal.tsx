import { type FC } from "react";
import { Modal, Spin, Tag, Typography } from "antd";
import type { VehicleMake } from "@/types/vehicle";
import useVehicleTypesForMakeId from "@/hooks/useVehicleTypesForMakeId";
import useVehicleModelsForMakeByVehicleType from "@/hooks/useVehicleModelsForMakeByVehicleType";
import { VehicleDetailTable } from "../tables/VehicleDetailTable";

const { Text } = Typography;

interface VehicleDetailModalProps {
  open: boolean;
  make: VehicleMake;
  onClose: () => void;
}

export const VehicleDetailModal: FC<VehicleDetailModalProps> = ({
  open,
  make,
  onClose,
}) => {
  const enabled = open && make != null;

  const { data: vehicleTypes, isPending: loadingTypes } =
    useVehicleTypesForMakeId(make, enabled);
  const {
    data: models,
    isPending: loadingModels,
    error: modelsError,
  } = useVehicleModelsForMakeByVehicleType(
    { make, types: vehicleTypes ?? [] },
    enabled && !!vehicleTypes,
  );

  const isLoading = loadingModels || loadingTypes;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={make?.Make_Name ?? "Vehicle Details"}
      width={580}
      destroyOnHidden
    >
      <Spin spinning={isLoading}>
        <div className="flex flex-col gap-4 py-2">
          <div>
            <Text type="secondary" className="text-xs uppercase tracking-wide">
              Make ID
            </Text>
            <p className="font-mono text-sm mt-0.5">{make?.Make_ID}</p>
          </div>

          {vehicleTypes && vehicleTypes.length > 0 && (
            <div>
              <Text
                type="secondary"
                className="text-xs uppercase tracking-wide"
              >
                Vehicle Types
              </Text>
              <div className="flex flex-wrap gap-1 mt-1">
                {vehicleTypes.map((type) => (
                  <Tag key={type.VehicleTypeId} color="blue">
                    {type.VehicleTypeName}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          {!modelsError && models !== undefined && (
            <div>
              <Text
                type="secondary"
                className="text-xs uppercase tracking-wide"
              >
                Models ({models.length})
              </Text>
              <div className="mt-1 py-2">
                <VehicleDetailTable dataSource={models} />
              </div>
            </div>
          )}
        </div>
      </Spin>
    </Modal>
  );
};
