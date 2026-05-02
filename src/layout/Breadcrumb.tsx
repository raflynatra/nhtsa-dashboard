import { Link, useLocation } from "react-router-dom";
import { ChevronRight, HomeIcon } from "lucide-react";
import type { FC } from "react";

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  vehicles: "Vehicles",
  "error-demo": "Error Demo",
};

const Breadcrumb: FC = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500">
      <Link to="/dashboard" className="hover:text-gray-800">
        <HomeIcon size={16} />
      </Link>

      {segments.map((segment, i) => {
        const path = "/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;

        return (
          <span key={path} className="flex items-center gap-1">
            <ChevronRight size={14} />
            {isLast ? (
              <span className="text-gray-800 font-medium">
                {LABELS[segment] ?? segment}
              </span>
            ) : (
              <Link to={path} className="hover:text-gray-800">
                {LABELS[segment] ?? segment}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
