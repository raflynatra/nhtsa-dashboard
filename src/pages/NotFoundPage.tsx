import type { FC } from "react";
import { Link } from "react-router-dom";

const NotFoundPage: FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-4">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <p className="text-gray-500">Page not found.</p>
      <Link to="/dashboard" className="text-sm text-blue-600 hover:underline">
        Back to Dashboard
      </Link>
    </div>
  );
};
export default NotFoundPage;
