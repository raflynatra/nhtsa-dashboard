import { UserManagement } from "@/features/user-management";
import SecuredLayout from "@/layout/SecuredLayout";
import type { FC } from "react";

const UserManagementPage: FC = () => {
  return (
    <SecuredLayout>
      <UserManagement />
    </SecuredLayout>
  );
};

export default UserManagementPage;
