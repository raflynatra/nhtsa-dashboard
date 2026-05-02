import { useAuthStore } from "@/store/useAuthStore";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div
      role="button"
      onClick={handleLogout}
      className="flex items-center gap-2"
    >
      <LogOut size={16} />
      <span>Logout</span>
    </div>
  );
};
