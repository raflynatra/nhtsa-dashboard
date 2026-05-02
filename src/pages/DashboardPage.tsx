import SecuredLayout from "@/layout/SecuredLayout";
import { Dashboard } from "@/features/dashboard";
import type { FC } from "react";

const DashboardPage: FC = () => {
  return (
    <SecuredLayout>
      <Dashboard />
    </SecuredLayout>
  );
};

export default DashboardPage;
