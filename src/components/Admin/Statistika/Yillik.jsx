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
} from "chart.js";
import axios from "axios";
import { baseUrl } from "../../../helpers/api/baseUrl";
import { Adminconfig } from "../../../helpers/token/admintoken";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

function Yillik({ selectedYear, handleYearChange }) {
  const [yillikData, setYillikData] = useState([]);
  const [selectedYil, setSelectedYil] = useState("");
  const [getYear, setGetYear] = useState([]);
  const [bronYear, setBronYear] = useState([]);

  const startYear = 2000;
  const endYear = 2100;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const YearData = () => {
    if (selectedYil) {
      axios
        .get(
          `${baseUrl}stadion/statistika-yil/?stadion_id=${selectedYil}&yil=${selectedYear}`,
          Adminconfig
        )
        .then((res) => {
          setYillikData(res.data);
          // Extract bron data for each month
          const monthBronData = Array(12).fill(0); // Initialize an array of 12 months with 0
          Object.keys(res.data).forEach((month) => {
            if (res.data[month]?.bron) {
              monthBronData[month - 1] = res.data[month].bron; // Set the bron count for each month (assuming month is 1-12)
            }
          });
          setBronYear(monthBronData); // Update bronYear state with the month-wise bron data
        })
        .catch((err) => console.log(err));
    }
  };

  const getStadionlar = () => {
    axios
      .get(`${baseUrl}stadion/admin-stadion-get/`, Adminconfig)
      .then((res) => {
        setGetYear(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStadionlar();
  }, []);

  useEffect(() => {
    if (getYear.length === 1) {
      setSelectedYil(getYear[0].id); // Automatically select the only stadion if there's one
    }
  }, [getYear]);

  useEffect(() => {
    YearData();
  }, [selectedYil, selectedYear]);

  const monthNames = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];

  // Bar chart uchun data va options
  const chartData = {
    labels: monthNames,
    datasets: [
      {
        label: "Oylik bronlar soni",
        data: bronYear,
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
          <select
            className="p-1 border rounded dark:bg-gray-800 dark:text-gray-100 mr-5"
            onChange={(e) => setSelectedYil(e.target.value)}
            value={selectedYil}
          >
            <option disabled value="">
              stadion tanlang
            </option>
            {getYear.map((stadion) => (
              <option key={stadion.id} value={stadion.id}>
                {stadion.title}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="mb-4 p-1 border rounded dark:bg-gray-800 dark:text-gray-100"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 gap-4">
        <Card icon={<AiOutlineCalendar />} title="Yil" value={selectedYear} />
        <Card
          icon={<FaShoppingCart />}
          title="Bronlar soni"
          value={`${yillikData?.bron_count || 0} ta`}
        />
        <Card
          icon={<FaMoneyBillWave />}
          title="Olingan daromat"
          value={`${yillikData?.daromad || 0} so'm`}
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
            {Object.entries(yillikData || {}).map(([month, data]) => {
              if (!isNaN(month)) {
                const monthName = monthNames[parseInt(month) - 1]; // Get the correct month name
                return (
                  <tr
                    key={month}
                    className={`${
                      month % 2 === 0
                        ? "bg-white dark:bg-gray-800"
                        : "bg-gray-50 dark:bg-gray-700"
                    }`}
                  >
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {monthName}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {data?.bron || 0} ta
                    </td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {data?.price || 0} so'm
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Yillik;
