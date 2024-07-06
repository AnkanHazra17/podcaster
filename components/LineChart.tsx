import React from 'react'
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
  ChartOptions,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

interface LineChartProps{
    labels: string[],
    dataArray: number[],
    labelText: string,
    bgColor: string,
    borderColor: string,
    title: string,
    header: string,
}

const LineChart = ({
    labels,
    dataArray,
    labelText,
    bgColor,
    borderColor,
    title,
    header,
}: LineChartProps) => {
    const data = {
    labels: labels,
    datasets: [
      {
        label: labelText,
        data: dataArray,
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems: { label: any; }[]) => {
            // Return the label for the x-axis on hover
            return tooltipItems[0].label || "";
          },
        },
      },
      legend: {
        position: "top",
        align: "end",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  return (
    <div className='w-full p-6 min-h-[400px] rounded-xl bg-black-1 text-white shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl'>
        <p className='text-lg font-semibold text-white-1'>{header}</p>
        <Line data={data} options={options}></Line>
    </div>
  )
}

export default LineChart