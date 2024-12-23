import Card from './Card';
import { FaClipboardList, FaStar } from 'react-icons/fa';
import { FaHandHoldingDollar } from "react-icons/fa6";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../helpers/api/baseUrl';
import { Adminconfig } from '../../helpers/token/admintoken';
import { toast } from 'react-toastify';
import StadinAdd from '../../pages/Admin/StadinAdd';
import OrderCom from './OrderCom';

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  const [order, setOrderCount] = useState(); // Orderlar uchun
  const [stadion, setStadion] = useState(); // Stadionlar uchun
  const [getMoney, setGetMoney] = useState(); // Daromad uchun
  const [chartData, setChartData] = useState({
    labels: [], // Sana ro'yxati
    datasets: [
      {
        label: 'Bron soni',
        data: [], // Bron ma'lumotlari
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
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
              label: 'Bron soni',
              data: bron || [], // API-dan kelgan bronlar
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
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
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 gap-4">
        {/* Kartalar */}
        <Card icon={<FaClipboardList />} title="Barcha olingan vaqtlar" value={order ? order : " Bron vaqtlari yo'q"} />
        <Card icon={<FaStar />} title="Barcha stadionlar" value={stadion ? stadion : "Stadion yo'q"} />
        <Card icon={<FaHandHoldingDollar />} title="Bugungi daromat" value={getMoney ? getMoney : "Daromat yo'q"} />
      </div>
      <div className='hidden'>
        <OrderCom onOrderCount={setOrderCount} />
        </div>
        <div className='hidden'>
        <StadinAdd stadionCount={setStadion} />
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        {/* Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-4">Bron Statistikasi</h3>
          <Line data={chartData} /> 
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
