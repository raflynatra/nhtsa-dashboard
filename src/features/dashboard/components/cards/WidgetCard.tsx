interface WidgetCardProps {
  title: string;
  subtitle?: string;
  component: React.ReactNode;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({
  title,
  subtitle,
  component,
}) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex flex-col justify-between mb-4 flex-wrap gap-1">
        <h2 className="text-lg font-bold text-gray-700">{title}</h2>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </div>
      <div className="min-h-100">{component}</div>
    </div>
  );
};
