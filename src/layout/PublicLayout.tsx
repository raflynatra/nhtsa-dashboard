import type { FC } from "react";

const PublicLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <main className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
        {children}
      </main>
    </div>
  );
};

export default PublicLayout;
