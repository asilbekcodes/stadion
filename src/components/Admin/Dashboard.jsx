import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { Adminconfig } from "../../helpers/token/admintoken";
import Calendar from "./Calendar";
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineStar,
  AiOutlineStop,
} from "react-icons/ai";
import TopUsers from "./TopUser";

const Dashboard = () => {
  const [date, setDate] = useState({});
  const [selectedStadion, setSelectedStadion] = useState("");
  const [getSaved, setGetSaved] = useState([]);

  const fetchDate = () => {
    if (!selectedStadion) return; // Agar stadion tanlanmagan bo'lsa, funksiyani qaytarib yuboramiz
    axios
      .get(
        `${baseUrl}order/stadion-statistika/${selectedStadion}/`,
        Adminconfig
      )
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
    Malumot(); // Birinchi marta chaqiriladi
  }, []);

  useEffect(() => {
    if (Array.isArray(getSaved) && getSaved.length > 0) {
      setSelectedStadion(getSaved[0]?.id);
    }
  }, [getSaved]);

  useEffect(() => {
    if (selectedStadion) {
      fetchDate();
      getComments();
    }
  }, [selectedStadion]);

  const [comments, setComments] = useState([]);

  const getComments = () => {
    axios
      .get(`${baseUrl}/stadion/stadion-review/${selectedStadion}/`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) =>
        console.error("Stadionlar ro'yxatini olishda xato:", err)
      );
  };

  useEffect(() => {
    if (selectedStadion) {
      getComments();
    }
  }, [selectedStadion]);

  const formatDate = (dateString) => {
    const months = [
      "yan",
      "fev",
      "mar",
      "apr",
      "may",
      "iyn",
      "iyl",
      "avg",
      "sen",
      "okt",
      "noy",
      "dek",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    return { day, month };
  };

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
          icon={<AiOutlineCalendar />}
          title="Bugungi zakazlar soni"
          value={
            date.zakazlar_soni > 0
              ? `${date.zakazlar_soni} ta`
              : `zakazlar yo'q`
          }
        />
        <Card
          icon={<AiOutlineStar />}
          title="Tasdiqlangan bronlar"
          value={`${date.tasdiqlangan_bronlar || 0} ta`}
        />
        <Card
          icon={<AiOutlineStop />}
          title="Bekor qilingan bronlar"
          value={`${date.bekorqilingan_bronlar || 0} ta`}
        />
        <Card
          icon={<AiOutlineClockCircle />}
          title="Kutulayotgan bronlar"
          value={`${date.kutilayotgan_bronlar || 0} ta`}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Attendance */}
        <Calendar selectedStadion={selectedStadion} />
        <TopUsers data={date}/>

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
            {comments && comments.length > 0 ? (
              comments.map((item) => {
                const { day, month } = formatDate(item.created_at);
                return (
                  <li key={item.title} className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <p className="dark:bg-gray-200 bg-gray-100 text-lg text-black rounded-md py-1 px-4 font-semibold">
                        {day}
                        <p className="font-semibold text-xs">{month}</p>
                      </p>
                    </div>
                    <div className="flex-grow">
                      <p className="text-[13px] dark:text-gray-200 text-gray-600">
                        {item.user.first_name + " " + item.user.last_name}
                      </p>
                      <p className="font-medium text-sm">{item.comment}</p>
                    </div>
                  </li>
                );
              })
            ) : (
              <p className="text-center text-gray-500">Malumot yo'q</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
