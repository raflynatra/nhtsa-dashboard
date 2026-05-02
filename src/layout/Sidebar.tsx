import { NavLink } from "react-router-dom";
import { LayoutDashboard, Car, Users, X } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useLayoutStore } from "@/store/useLayoutStore";
import { cn } from "@/lib/utils";
import type { FC } from "react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/vehicles", label: "Vehicles", icon: Car },
];

const adminItems = [
  { to: "/user-management", label: "User Management", icon: Users },
];

const Sidebar: FC = () => {
  const user = useAuthStore((state) => state.user);
  const { sidebarOpen, setSidebarOpen } = useLayoutStore();

  const items =
    user?.role === "admin" ? [...navItems, ...adminItems] : navItems;

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex w-60 flex-col bg-gray-900 text-white transition-transform duration-200 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
          <span className="text-lg font-bold tracking-tight">
            NHTSA Dashboard
          </span>
          <button
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-600! text-white!"
                    : "text-gray-300! hover:bg-gray-800! hover:text-white!",
                )
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User info */}
        <div className="px-4 py-3 border-t border-gray-700 text-xs text-gray-400">
          <span className="capitalize">{user?.role}</span>
          {" · "}
          <span>{user?.username}</span>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
