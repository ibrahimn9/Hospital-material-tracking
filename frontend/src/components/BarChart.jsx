import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

// Static data for materials by state

const BarChart = ({ materials }) => {
  const materialStates = {
    Active: materials.filter((mat) => mat.State.stateName === "actif").length,
    Damaged: materials.filter((mat) => mat.State.stateName === "endommagé")
      .length,
    Maintenance: materials.filter(
      (mat) => mat.State.stateName === "maintenance"
    ).length,
  };

  const data = {
    labels: ["Actif", "Endommagé", "Maintenance"],
    datasets: [
      {
        label: "Materials by State",
        data: [
          materialStates.Active,
          materialStates.Damaged,
          materialStates.Maintenance,
        ],
        backgroundColor: ["#2E86FB", "#FF6F6F", "#FFD700"], // Colors for each state
        hoverBackgroundColor: ["#4F46E5", "#FF5733", "#FFA500"], // Hover colors
        borderWidth: 1,
        barPercentage: 0.2,
        categoryPercentage: 0.8,
      },
    ],
  };

  // Chart options
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Materials by State",
        font: {
          size: 14,
          weight: "bold",
        },
        textAlign: "start",
        color: "#1C1C1C",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        right: 0, // Adjust the padding between the right edge of the chart and the end of the last bar
      },
    },
    indexAxis: "x", // Indicates labels are on the x-axis
  };

  return (
    <div className="text-center sm:col-span-3">
      <div className="rounded-lg overflow-hidden max-h-[450px] shadow-md bg-white px-6 py-2">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
