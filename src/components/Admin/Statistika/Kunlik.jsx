import React, { useEffect } from "react";
import Card from "../Card";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { baseUrl } from "../../../helpers/api/baseUrl";
import { Adminconfig } from "../../../helpers/token/admintoken";

function Kunlik({ kunlikDateChange, kunlikDate }) {
  const data = {
    labels: [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ],
    datasets: [
      {
        label: "Soatlar bo'yicha faollik",
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0,
          0,
        ],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const kunlikStatistika = () => {
    axios
      .get(`http://footzone.pythonanywhere.com/stadion/statistika-kun/?stadion_id=11&stadion_date=2024-12-26`, Adminconfig)
      .then((res) => {
        data.datasets[0].data = res.data;
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    kunlikStatistika();
  }, [kunlikDate]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
          Kunlik statistika
        </h2>
        <div>
            <select className="p-1 border rounded dark:bg-gray-800 dark:text-gray-100 mr-5">
                <option value="">stadion tanlang</option>
            </select>
          <input
            type="date"
            value={kunlikDate}
            onChange={kunlikDateChange}
            className="mb-4 p-1 border rounded dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 gap-4">
        <Card icon="📅" title="Sana" value={kunlikDate} />
        <Card icon={"🛒"} title="Bronlar soni" value="1" />
        <Card icon={"💰"} title="Olingan daromat" value="10,000 so'm" />
      </div>
      <div className="mt-10">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
          Soatlik statistika
        </h2>
        <Line
          className="dark:bg-gray-800 bg-white p-5"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}

export default Kunlik;
