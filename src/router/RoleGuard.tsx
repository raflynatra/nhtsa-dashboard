import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import type { Role } from "@/features/auth";

interface Props {
  allowedRoles: Role[];
}

export default function RoleGuard({ allowedRoles }: Props) {
  const user = useAuthStore((s) => s.user);
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
