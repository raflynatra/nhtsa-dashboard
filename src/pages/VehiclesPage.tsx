import { Vehicle } from "@/features/vehicles";
import SecuredLayout from "@/layout/SecuredLayout";
import type { FC } from "react";

const VehiclesPage: FC = () => {
  return (
    <SecuredLayout>
      <Vehicle />
    </SecuredLayout>
  );
};

export default VehiclesPage;
