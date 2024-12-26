import Card from "./Card";
import { FaClipboardList, FaStar } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { Adminconfig } from "../../helpers/token/admintoken";
import { toast } from "react-toastify";
import StadinAdd from "../../pages/Admin/StadinAdd";
import OrderCom from "./OrderCom";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const Dashboard = () => {
  const [order, setOrderCount] = useState(); // Orderlar uchun
  const [stadion, setStadion] = useState(); // Stadionlar uchun
  const [getMoney, setGetMoney] = useState(); // Daromad uchun
  const [chartData, setChartData] = useState({
    labels: [], // Sana ro'yxati
    datasets: [
      {
        label: "Bron soni",
        data: [], // Bron ma'lumotlari
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  });

  // API orqali daromad va boshqa ma'lumotlarni olish
  const Money = () => {
    axios
      .get(`${baseUrl}order/stadion-statistika/`, Adminconfig)
      .then((res) => {
        const { date, bron } = res.data;
        setGetMoney(res.data.daily_price || 0);

        setChartData({
          labels: date || [], // API-dan kelgan sanalar
          datasets: [
            {
              label: "Bron soni",
              data: bron || [], // API-dan kelgan bronlar
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => toast.warn(err.message));
  };

  useEffect(() => {
    Money(); // Komponent yuklanganda API chaqirish
  }, []);

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
