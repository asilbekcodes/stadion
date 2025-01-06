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

function Oylik({ selectedDate, handleDateChange }) {
  const [oylikData, setOylikData] = useState(null);
  const [getStadion, setGetStadion] = useState(null);
  const [selectedStadion, setSelectedStadion] = useState("");
  const [bronArray, setBronArray] = useState(Array(31).fill(0)); // Bronlar uchun bo'sh massiv

  // Oylik statistika ma'lumotlarini yuklash
  const fetchOylikData = () => {
    if (selectedStadion) {
      axios
        .get(
          `${baseUrl}stadion/statistika-oy/?stadion_id=${selectedStadion}&data=${selectedDate}`,
          Adminconfig
        )
        .then((res) => {
          setOylikData(res.data);

          // Bronlar sonini massivga joylashtirish
          const newBronArray = Array(31).fill(0);
          Object.keys(res.data).forEach((key) => {
            if (!isNaN(key)) {
              const index = parseInt(key, 10) - 1; // 1 dan 31 gacha kunlarni 0 asosli indeksga aylantirish
              newBronArray[index] = res.data[key].bron || 0;
            }
          });
          setBronArray(newBronArray);
        })
        .catch((err) => console.log(err));
    }
  };

  // Stadionlar ro'yxatini olish
  const getStadionlar = () => {
    axios
      .get(`${baseUrl}stadion/admin-stadion-get/`, Adminconfig)
      .then((res) => {
        setGetStadion(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStadionlar();
  }, []);

  useEffect(() => {
    if (getStadion && getStadion.length === 1) {
      setSelectedStadion(getStadion[0].id); // Agar faqat bitta stadion bo'lsa, uni avtomatik tanlash
    }
  }, [getStadion]);

  useEffect(() => {
    fetchOylikData();
  }, [selectedStadion, selectedDate]); // selectedStadion yoki selectedDate o'zgarsa, qayta ishlaydi

  // Diagramma uchun ma'lumotlar va sozlamalar
  const chartData = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1), // 1 dan 31 gacha kunlar
    datasets: [
      {
        label: "Kunlar bo'yicha bronlar soni",
        data: bronArray,
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

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
          Oylik statistika
        </h2>
        <div>
          <select
            className="p-1 border rounded dark:bg-gray-800 dark:text-gray-100 mr-5"
            value={selectedStadion}
            onChange={(e) => setSelectedStadion(e.target.value)}
          >
            <option disabled value="">
              Stadion tanlang
            </option>
            {Array.isArray(getStadion) &&
              getStadion.map((stadion) => (
                <option key={stadion.id} value={stadion.id}>
                  {stadion.title}
                </option>
              ))}
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
        <Card icon={<AiOutlineCalendar />} title="Oy" value={selectedDate} />
        <Card
          icon={<FaShoppingCart />}
          title="Bronlar soni"
          value={`${oylikData?.bron_count || 0} ta`} // Umumiy bronlar soni
        />
        <Card
          icon={<FaMoneyBillWave />}
          title="Olingan daromat"
          value={`${oylikData?.daromad || 0} so'm`} // Daromad qiymati
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
          Bronlar (oylar bo'yicha)
        </h1>
        <table className="min-w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                Sana (Kun-Oy)
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
            {Object.entries(oylikData || {}).map(([day, data]) => {
              if (!isNaN(day)) {
                return (
                  <tr
                    key={day}
                    className={`${
                      day % 2 === 0
                        ? "bg-white dark:bg-gray-800"
                        : "bg-gray-50 dark:bg-gray-700"
                    }`}
                  >
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {day} - {monthNames[parseInt(oylikData.oy, 10) - 1]}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {data.bron} ta
                    </td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {data.price} so'm
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

export default Oylik;
