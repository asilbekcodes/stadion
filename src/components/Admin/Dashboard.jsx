import { useState } from "react";
import Card from "./Card";
import { FaClipboardList, FaStar } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";

const Dashboard = () => {
  const [date, setDate] = useState('');

  return (
    <div className="p-8 grow dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Dashboard</h2>
        <p className="font-semibold text-blue-700 dark:text-green-500 text-xl">
          Ish vaqti: <span className="font-normal text-black dark:text-white text-lg">8:00 dan 20:00 gacha</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-6 gap-4">
        <Card
          icon={<FaClipboardList />}
          title="Bugungi zakazlar soni"
          value={"Bron vaqtlari yo'q"}
        />
        <Card
          icon={<FaStar />}
          title="Tasdiqlangan bronlar"
          value={"Stadion yo'q"}
        />
        <Card
          icon={<FaHandHoldingDollar />}
          title="Bekor qilingan bronlar"
          value={"Daromat yo'q"}
        />
        <Card
          icon={<FaHandHoldingDollar />}
          title="Kutulayotgan bronlar"
          value={ "Daromat yo'q"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
