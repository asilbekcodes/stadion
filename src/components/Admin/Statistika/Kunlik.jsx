import React, { useEffect, useState } from "react";
import Card from "../Card";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { baseUrl } from "../../../helpers/api/baseUrl";
import { Adminconfig } from "../../../helpers/token/admintoken";

function Kunlik({ kunlikDateChange, kunlikDate }) {
  const [dataKunlik, setDataKunlik] = useState();
  const [getSaved, setgetSaved] = useState([]);
  const [selectedStadion, setSelectedStadion] = useState("");

  const [labels, setLabels] = useState([]); // Soatlar uchun state
  const [bronData, setBronData] = useState([]); // Bron holati uchun state

  const data = {
    labels,
    datasets: [
      {
        label: "Soatlar bo'yicha bron holati",
        data: bronData,
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

  const kunlikStatistika = (stadionId) => {
    if (!stadionId) return;
    axios
      .get(
        `${baseUrl}stadion/statistika-kun/?stadion_id=${stadionId}&stadion_date=${kunlikDate}`,
        Adminconfig
      )
      .then((res) => {
        setDataKunlik(res.data);

        // Soatlar va bron ma'lumotlarini backenddan olish
        const bron = res.data.bron;
        const newLabels = Object.keys(bron); // Soatlar ro'yxati
        const bronArray = Object.values(bron).map((value) => (value ? 1 : 0)); // Bron holati (true -> 1, false -> 0)

        setLabels(newLabels); // Soatlarni diagrammaga o'rnatish
        setBronData(bronArray); // Bron ma'lumotlarini diagrammaga o'rnatish
      })
      .catch((err) => console.log(err));
  };

  const Malumot = () => {
    axios
      .get(`${baseUrl}stadion/admin-stadion-get/`, Adminconfig)
      .then((res) => setgetSaved(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Malumot();
  }, []);

  useEffect(() => {
    if (kunlikDate && selectedStadion) {
      kunlikStatistika(selectedStadion);
    }
  }, [kunlikDate, selectedStadion]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
          Kunlik statistika
        </h2>
        <div>
          <select
            className="p-1 border rounded dark:bg-gray-800 dark:text-gray-100 mr-5"
            value={selectedStadion}
            onChange={(e) => setSelectedStadion(e.target.value)}
          >
            <option disabled value="">Stadion tanlang</option>
            {Array.isArray(getSaved) &&
              getSaved.map((stadion) => (
                <option key={stadion.id} value={stadion.id}>
                  {stadion.title}
                </option>
              ))}
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
        <Card
          icon="🛒"
          title="Bronlar soni"
          value={dataKunlik?.bron_count || 0}
        />
        <Card
          icon="💰"
          title="Olingan daromat"
          value={`${dataKunlik?.daromat || 0} so'm`}
        />
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
