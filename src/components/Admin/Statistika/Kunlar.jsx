import React, { useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";
import Card from "../Card";
import { baseUrl } from "../../../helpers/api/baseUrl";
import axios from "axios";
import { Adminconfig } from "../../../helpers/token/admintoken";

function Kunlar({
  kunlarDateChange,
  kunlarDate,
  kunlarDaysChange,
  kunlarDays,
}) {
  const [getSaved, setgetSaved] = useState([]);
  const [selectedStadion, setSelectedStadion] = useState("");

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
      setSelectedStadion(getSaved[0].id); // Agar faqat bitta stadion bo'lsa, uni avtomatik tanlang
    }
  }, [getSaved]);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
          Kunlar orasidagi statistika
        </h2>
        <div className="flex gap-4 mb-5 items-center">
          <select
            className="p-1 border rounded dark:bg-gray-800 dark:text-gray-100"
            value={selectedStadion}
            onChange={(e) => setSelectedStadion(e.target.value)}
          >
            <option disabled value="">
              Stadion tanlang
            </option>
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
            className="p-1 border rounded dark:bg-gray-800 dark:text-gray-100"
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
          //   value={dataKunlik?.bron_count || 0}
        />
        <Card
          icon={<FaMoneyBillWave />}
          title="Olingan daromat"
          //   value={`${dataKunlik?.daromat || 0} so'm`}
        />
      </div>
      <div className="mb-10">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
          Bronlar soni
        </h2>
      </div>
    </div>
  );
}

export default Kunlar;
