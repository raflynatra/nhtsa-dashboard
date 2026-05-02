import { Menu } from "lucide-react";
import { useLayoutStore } from "@/store/useLayoutStore";
import { LogoutButton } from "@/features/auth";
import type { FC } from "react";
import { Button, Dropdown, type MenuProps } from "antd";
import { useAuthStore } from "@/store/useAuthStore";

const items: MenuProps["items"] = [
  {
    key: "logout",
    label: <LogoutButton />,
  },
];

const Header: FC = () => {
  const user = useAuthStore((state) => state.user);
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);

  return (
    <header className="flex items-center justify-between h-14 px-6 bg-white border-b border-gray-200 shrink-0 lg:px-8">
      <div className="flex items-center gap-3">
        <Button
          type="text"
          onClick={toggleSidebar}
          className="px-0! text-gray-500 lg:hidden!"
        >
          <Menu size={20} />
        </Button>
      </div>

      <Dropdown trigger={["click"]} menu={{ items }}>
        <Button type="primary" className="w-8 h-8 rounded-full!">
          <span>{user?.username.charAt(0).toUpperCase()}</span>
        </Button>
      </Dropdown>
    </header>
  );
};

export default Header;
