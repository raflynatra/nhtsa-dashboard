import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleGuard from "./RoleGuard";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import VehiclesPage from "@/pages/VehiclesPage";
import NotFoundPage from "@/pages/NotFoundPage";
import UserManagementPage from "@/pages/UserManagementPage";

const PUBLIC_ROUTES: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  { path: "*", element: <NotFoundPage /> },
];

const SECURED_ROUTES: RouteObject[] = [
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/vehicles", element: <VehiclesPage /> },
  {
    element: <RoleGuard allowedRoles={["admin"]} />,
    children: [{ path: "/user-management", element: <UserManagementPage /> }],
  },
];

export const router = createBrowserRouter([
  ...PUBLIC_ROUTES,
  {
    element: <ProtectedRoute />,
    children: SECURED_ROUTES,
  },
]);
