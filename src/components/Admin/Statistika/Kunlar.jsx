import React, { useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";
import Card from "../Card";
import { baseUrl } from "../../../helpers/api/baseUrl";
import axios from "axios";
import { Adminconfig } from "../../../helpers/token/admintoken";
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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

function Kunlar({
  kunlarDateChange,
  kunlarDate,
  kunlarDaysChange,
  kunlarDays,
}) {
  const [getSaved, setgetSaved] = useState([]);
  const [selectedStadion, setSelectedStadion] = useState("");
  const [kunDate, setKunDate] = useState({});
  const [chartLabels, setChartLabels] = useState([]);
  const [chartDataValues, setChartDataValues] = useState([]);

  const fetchkunlar = () => {
    if (selectedStadion && kunlarDate && kunlarDays) {
      axios
        .get(
          `${baseUrl}stadion/statistika-kunlar/?stadion_id=${selectedStadion}&date_to=${kunlarDate}&date_from=${kunlarDays}`,
          Adminconfig
        )
        .then((res) => {
          setKunDate(res.data);

          // Diagramma uchun ma'lumotlarni tayyorlash
          const labels = Object.keys(res.data).filter((key) =>
            key.includes("-")
          ); // Sana kalitlarini olish
          const bronValues = labels.map((key) => res.data[key].bron || 0);

          setChartLabels(labels);
          setChartDataValues(bronValues);
        })
        .catch((err) => console.log(err));
    }
  };

  const Malumot = () => {
    axios
      .get(`${baseUrl}stadion/admin-stadion-get/`, Adminconfig)
      .then((res) => {
        setgetSaved(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Malumot();
  }, []);

  useEffect(() => {
    if (getSaved.length === 1) {
      setSelectedStadion(getSaved[0].id);
    }
  }, [getSaved]);

  useEffect(() => {
    fetchkunlar();
  }, [selectedStadion, kunlarDate, kunlarDays]);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Kunlar bo'yicha bronlar soni",
        data: chartDataValues,
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
          color: "rgba(55, 65, 81)",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "rgba(55, 65, 81)" },
        grid: { color: "rgba(229, 231, 235)" },
      },
      y: {
        ticks: { color: "rgba(55, 65, 81)" },
        grid: { color: "rgba(229, 231, 235)" },
      },
    },
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
          Kunlar orasidagi statistika
        </h2>
        <div className="md:flex block gap-4 mb-5 items-center">
          <select
            className="p-1 border rounded dark:bg-gray-800 dark:text-gray-100"
            value={selectedStadion}
            onChange={(e) => setSelectedStadion(e.target.value)}
          >
            <option disabled value="">
              Stadion tanlang
            </option>
            <option value="all">Barcha stadionlar</option>
            {Array.isArray(getSaved) &&
              getSaved.map((stadion) => (
                <option key={stadion.id} value={stadion.id}>
                  {stadion.title}
                </option>
              ))}
          </select>
          <input
            type="date"
            value={kunlarDate}
            onChange={kunlarDateChange}
            className="p-1 border my-2 md:my-0 rounded dark:bg-gray-800 dark:text-gray-100"
          />
          <input
            type="date"
            value={kunlarDays}
            onChange={kunlarDaysChange}
            className="p-1 border rounded dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 gap-4">
        <Card
          icon={<AiOutlineCalendar />}
          title="Sana"
          value={kunlarDate + " / " + kunlarDays}
        />
        <Card
          icon={<FaShoppingCart />}
          title="Bronlar soni"
          value={kunDate?.bron_count || 0}
        />
        <Card
          icon={<FaMoneyBillWave />}
          title="Olingan daromat"
          value={`${kunDate?.daromat || 0} so'm`}
        />
      </div>
      <div className="mb-10">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
          Bronlar soni
        </h2>
        <Bar
          className="dark:bg-gray-800 bg-white p-5"
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
                Sana (Kunlar)
              </th>
              <th className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                Bronlar soni
              </th>
              <th className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                Bron summasi
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(kunDate)
              .filter(([key]) => key.includes("-"))
              .map(([day, data], index) => (
                <tr
                  key={day}
                  className={`${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-700"
                  }`}
                >
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                    {day}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                    {data.bron || 0} ta
                  </td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                    {data.price || 0} so'm
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Kunlar;
