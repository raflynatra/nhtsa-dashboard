import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { FC } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface BarChartProps {
  labels: string[];
  values: number[];
  title?: string;
}

export const BarChart: FC<BarChartProps> = ({ labels, values, title }) => {
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Models",
            data: values,
            backgroundColor: "rgba(59, 130, 246, 0.7)",
            borderRadius: 4,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: !!title, text: title },
        },
        scales: {
          x: { ticks: { font: { size: 11 } } },
          y: { beginAtZero: true, ticks: { stepSize: 1 } },
        },
      }}
    />
  );
};
