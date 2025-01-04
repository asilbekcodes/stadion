import { useEffect, useState } from "react";
import Card from "./Card";
import { FaClipboardList, FaStar } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { Adminconfig } from "../../helpers/token/admintoken";

const Dashboard = () => {
  const [date, setDate] = useState({});
  const [selectedStadion, setSelectedStadion] = useState("");
  const [getSaved, setGetSaved] = useState([]);

  const fetchDate = (stadionId) => {
    if (!stadionId) return; // Agar stadion tanlanmagan bo'lsa, funksiyani qaytarib yuboramiz
    axios
      .get(`${baseUrl}order/stadion-statistika/${stadionId}/`, Adminconfig)
      .then((res) => {
        setDate(res.data);
      })
      .catch((err) => console.error("Statistika olishda xato:", err));
  };

  const Malumot = () => {
    axios
      .get(`${baseUrl}stadion/admin-stadion-get/`, Adminconfig)
      .then((res) => {
        setGetSaved(res.data);
      })
      .catch((err) => console.error("Stadionlar ro'yxatini olishda xato:", err));
  };

  useEffect(() => {
    if (getSaved.length === 1) {
      setSelectedStadion(getSaved[0].id); // Agar faqat bitta stadion bo'lsa, uni avtomatik tanlang
    }
    fetchDate(selectedStadion);
    Malumot();
  }, [getSaved.length, selectedStadion]);

  useEffect(() => {
    if (selectedStadion) {
      fetchDate(selectedStadion);
    }
  }, [selectedStadion]);

  return (
    <div className="md:p-8 p-4 grow dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <h2 className="md:text-2xl text-xl">Dashboard</h2>
        <div className="flex items-center">
          <select
            className="p-1 border rounded dark:bg-gray-800 dark:text-gray-100 mr-5"
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
          <p className="font-semibold text-blue-700 dark:text-green-500 text-xl hidden md:block">
            Ish vaqti:{" "}
            <span className="font-normal text-black dark:text-white text-lg">
              {selectedStadion
                ? `${date.start_time?.slice(0, 5) || "--"} dan ${date.end_time?.slice(0, 5) || "--"} gacha`
                : ""}
            </span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-6 gap-4">
        <Card
          icon={<FaClipboardList />}
          title="Bugungi zakazlar soni"
          value={date.zakazlar_soni > 0 ? `${date.zakazlar_soni} ta` : `zakazlar yo'q`}
        />
        <Card
          icon={<FaStar />}
          title="Tasdiqlangan bronlar"
          value={`${date.tasdiqlangan_bronlar || 0} ta`}
        />
        <Card
          icon={<FaHandHoldingDollar />}
          title="Bekor qilingan bronlar"
          value={`${date.bekorqilingan_bronlar || 0} ta`}
        />
        <Card
          icon={<FaHandHoldingDollar />}
          title="Kutulayotgan bronlar"
          value={`${date.kutilayotgan_bronlar || 0} ta`}
        />
      </div>
    </div>
  );
};

export default Dashboard;
