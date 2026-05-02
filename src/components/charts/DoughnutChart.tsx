import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { FC } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  labels: string[];
  values: number[];
  backgroundColor: string[];
}

export const DoughnutChart: FC<DoughnutChartProps> = ({
  labels,
  values,
  backgroundColor,
}) => {
  return (
    <Doughnut
      data={{
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: backgroundColor,
            borderWidth: 2,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            titleAlign: "center",
            displayColors: false,
            padding: {
              x: 12,
              y: 8,
            },
            callbacks: {
              title: (tooltipItems) => {
                return tooltipItems[0].dataset.label;
              },
              label: (context) => {
                const values = context.dataset.data;
                const totalvalue = values.reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0,
                );
                const percentage =
                  (values[context.dataIndex] / totalvalue) * 100;

                return `${percentage.toFixed()}%`;
              },
            },
          },
        },
      }}
    />
  );
};
