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

export interface StackedDataset {
  label: string;
  data: number[];
  backgroundColor: string;
}

interface StackedBarChartProps {
  labels: string[];
  datasets: StackedDataset[];
}

export const StackedBarChart: FC<StackedBarChartProps> = ({
  labels,
  datasets,
}) => {
  return (
    <Bar
      data={{ labels, datasets }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: { boxWidth: 12, font: { size: 11 } },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => (ctx.parsed.y === 1 ? ctx.dataset.label : ""),
            },
          },
        },
        scales: {
          x: { stacked: true, ticks: { font: { size: 11 } } },
          y: {
            stacked: true,
            beginAtZero: true,
            ticks: { stepSize: 1, precision: 0 },
          },
        },
      }}
    />
  );
};
