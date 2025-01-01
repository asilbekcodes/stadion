import React, { useEffect, useState } from "react";
import Card from "../Card";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from "axios";
import { baseUrl } from "../../../helpers/api/baseUrl";
import { Adminconfig } from "../../../helpers/token/admintoken";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);


function Oylik({ selectedDate, handleDateChange }) {

  const [oylikData, setOylikData] = useState(null);

  const fetchOylikData = () => {
    axios.get(`${baseUrl}stadion/statistika-oy/?stadion_id=14&stadion_date=2025-01-01`, Adminconfig)
      .then((res) => {
        setOylikData(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchOylikData();
  }, []);

  console.log(oylikData);
  



  // Bar chart uchun data va options
  const chartData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    datasets: [
      {
        label: "Kunlar bo'yicha bronlar soni",
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
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
          Oylik statistika
        </h2>
        <div>
          <select className="p-1 border rounded dark:bg-gray-800 dark:text-gray-100 mr-5">
            <option value="">stadion tanlang</option>
          </select>
          <input
            type="month"
            value={selectedDate}
            onChange={handleDateChange}
            className="mb-4 p-1 border rounded dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 gap-4">
        <Card icon="📅" title="Oy"  />
        <Card
          icon="🛒"
          title="Bronlar soni"
        />
        <Card
          icon="💰"
          title="Olingan daromat"
        />
      </div>
      <div className="mb-10">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
          Bronlar soni
        </h2>
        <Bar
          className="dark:bg-gray-800 bg-white p-5 "
          data={chartData}
          options={chartOptions}
        />
      </div>
      <div>
        <h1 className="text-lg mb-4 text-gray-900 dark:text-gray-100">
          Bronlar (kunlar bo'yicha)
        </h1>
        <table className="min-w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                Kunlar
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
            {/* {monthlyData.details.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-700"
                }`}
              >
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  {row.day}
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  {row.count} ta
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  {row.amount}
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Oylik;
