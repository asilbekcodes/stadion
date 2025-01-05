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
      .catch((err) =>
        console.error("Stadionlar ro'yxatini olishda xato:", err)
      );
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

  const activities = [
    {
      date: '25',
      dateText: 'yan',
      time: 'asilbek coder',
      title: 'Meeting for campaign with sales team',
      avatarCount: 5,
    },
    {
      date: '20',
      dateText: 'yan',
      time: 'asilbek coder',
      title: 'Adding a new event with attachments',
      avatarCount: 3,
    },
  ];

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
                ? `${date.start_time?.slice(0, 5) || "--"} dan ${
                    date.end_time?.slice(0, 5) || "--"
                  } gacha`
                : ""}
            </span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-6 gap-4">
        <Card
          icon={<FaClipboardList />}
          title="Bugungi zakazlar soni"
          value={
            date.zakazlar_soni > 0
              ? `${date.zakazlar_soni} ta`
              : `zakazlar yo'q`
          }
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Attendance */}
        <div className="dark:bg-gray-700 bg-white shadow rounded-lg p-6">
          <div className="flex justify-between">
            <h2 className="text-lg font-bold mb-4">Calendar </h2>
            <h2 className="text-lg font-bold mb-4">Yanvar</h2>
          </div>
          <div>
            <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-700">
              {/* Days */}
              {[...Array(31).keys()].map((day) => (
                <div
                  key={day}
                  className={`p-2 rounded ${
                    day >= 8 && day <= 20
                      ? "bg-yellow-300 text-gray-800 font-semibold"
                      : "bg-gray-100 dark:bg-gray-300"
                  }`}
                >
                  {day + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dark:bg-gray-700 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Top users</h2>
          <div className="flex justify-between">
            {/* Student 1 */}
            <div className="bg-green-500 w-40 p-4 rounded-lg shadow-md text-center text-white relative">
              {/* Profile Image */}
              <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-white">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Kenzi Mohamd"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="mt-3 font-bold text-lg">Kenzi Mohamd</h3>

              {/* Percentage */}
              <p className="text-2xl font-bold">15 ta</p>

              {/* Rank */}
              <div className="bg-green-600 mt-2 px-4 py-1 rounded-lg text-sm">
                1st
              </div>
            </div>

            {/* Student 2 */}
            <div className="bg-purple-500 w-40 p-4 rounded-lg shadow-md text-center text-white relative">
              {/* Profile Image */}
              <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-white">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Kenzi Mohamd"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="mt-3 font-bold text-lg">Kenzi Mohamd</h3>

              {/* Percentage */}
              <p className="text-2xl font-bold">12 ta</p>

              {/* Rank */}
              <div className="bg-purple-600 mt-2 px-4 py-1 rounded-lg text-sm">
                2nd
              </div>
            </div>

            {/* Student 3 */}
            <div className="bg-yellow-300 w-40 p-4 rounded-lg shadow-md text-center text-white relative">
              {/* Profile Image */}
              <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-white">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Kenzi Mohamd"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="mt-3 font-bold text-lg">Kenzi Mohamd</h3>

              {/* Percentage */}
              <p className="text-2xl font-bold">8 ta</p>

              {/* Rank */}
              <div className="bg-yellow-600 mt-2 px-4 py-1 rounded-lg text-sm">
                3rd
              </div>
            </div>
          </div>
        </div>

        {/* Educational Stage */}
        <div className="dark:bg-gray-700 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4 ">Users</h2>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 m">
            <thead className="text-xs text-gray-700 border-t border-gray-200 border-b  uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
              <tr>
                <th scope="col" className="pr-6 py-3">
                  id
                </th>
                <th scope="col" className="pr-6 py-3">
                  Ism
                </th>
                <th scope="col" className="pr-6 py-3">
                  familiya
                </th>
                <th scope="col" className="pr-6 py-3">
                  tel
                </th>
                <th scope="col" className="pr-6 py-3">
                  bron soni
                </th>
              </tr>
            </thead>
            <tbody className="border-b border-gray-200">
              <tr className="bg-white dark:bg-gray-700">
                <th scope="row" className="pr-6 py-3">
                  1
                </th>
                <td className="pr-6 py-3">Mohamd</td>
                <td className="pr-6 py-3">Kenzi</td>
                <td className="pr-6 py-3">+998 99 999 99 99</td>
                <td className="pr-6 py-3">5 ta</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Activities & Events */}
        <div className="dark:bg-gray-700 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Commit</h2>
          <ul className="space-y-4">
            {activities.map((activity) => (
              <li key={activity.title} className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <p className=" dark:bg-gray-200 bg-gray-100 text-lg text-black rounded-md py-1 px-4 font-semibold">
                    {activity.date}
                    <p className="font-normal text-xs">
                      {activity.dateText}
                    </p>
                  </p>
                </div>
                <div className="flex-grow">
                  <p className="text-[13px] dark:text-gray-200 text-gray-600">{activity.time}</p>
                  <p className="font-medium text-sm">{activity.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Students */}
      </div>
    </div>
  );
};

export default Dashboard;
