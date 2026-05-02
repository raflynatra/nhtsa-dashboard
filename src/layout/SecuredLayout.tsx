import Sidebar from "./Sidebar";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";
import type { FC } from "react";

const SecuredLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
          <Breadcrumb />
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default SecuredLayout;
