import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { FC } from "react";

interface KpiCardProps {
  label: string;
  value: number | string | undefined;
  icon: LucideIcon;
  color: string;
  loading?: boolean;
  linkTo?: string;
}

export const KpiCard: FC<KpiCardProps> = ({
  label,
  value,
  icon: Icon,
  color,
  loading,
  linkTo,
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => linkTo && navigate(linkTo)}
      className={cn(
        "flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm border border-gray-100 text-left w-full transition-shadow",
        linkTo && "hover:shadow-md cursor-pointer",
        !linkTo && "cursor-default",
      )}
    >
      <div className={cn("rounded-lg p-3", color)}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        {loading ? (
          <div className="h-7 w-16 mt-1 rounded bg-gray-100 animate-pulse" />
        ) : (
          <p className="text-2xl font-semibold text-gray-800">{value ?? "—"}</p>
        )}
      </div>
    </button>
  );
};
