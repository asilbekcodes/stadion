import React from "react";
import Card from "../Card";
import { Bar } from "react-chartjs-2";

function Yillik({ selectedYear, handleYearChange, yearlyData }) {
  // Bar chart uchun data va options
  const chartData = {
    labels: yearlyData.details.map((row) => row.month), // Oylik nomlari
    datasets: [
      {
        label: "Oylik bronlar soni",
        data: yearlyData.details.map((row) => row.count), // Bronlar soni
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "rgba(55, 65, 81)", // Legend rangi
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "rgba(55, 65, 81)" }, // X o'qdagi matn rangi
        grid: { color: "rgba(229, 231, 235)" }, // X o'q panjarasi
      },
      y: {
        ticks: { color: "rgba(55, 65, 81)" }, // Y o'qdagi matn rangi
        grid: { color: "rgba(229, 231, 235)" }, // Y o'q panjarasi
      },
    },
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
          Yillik statistika
        </h2>
        <div>
          <select className="p-1 border rounded dark:bg-gray-800 dark:text-gray-100 mr-5">
            <option value="">stadion tanlang</option>
          </select>
          <input
            type="number"
            min="2000"
            max="2100"
            value={selectedYear}
            onChange={handleYearChange}
            className="mb-4 p-1 border rounded dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 gap-4">
        <Card icon="📅" title="Yil" value={yearlyData.year} />
        <Card icon="🛒" title="Bronlar soni" value={yearlyData.totalBookings} />
        <Card
          icon="💰"
          title="Olingan daromat"
          value={yearlyData.totalRevenue}
        />
      </div>
      <div className="mb-10">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
          Oylik bronlar soni
        </h2>
        <Bar
          className="dark:bg-gray-800 bg-white p-5"
          data={chartData}
          options={chartOptions}
        />
      </div>
      <div>
        <h1 className="text-lg mb-4 text-gray-900 dark:text-gray-100">
          Bronlar (oylar bo'yicha)
        </h1>
        <table className="min-w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                Oylik
              </th>
              <th className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                Bronlar soni
              </th>
              <th className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                Bronlar summasi
              </th>
            </tr>
          </thead>
          <tbody>
            {yearlyData.details.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-700"
                }`}
              >
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  {row.month}
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  {row.count} ta
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  {row.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Yillik;
