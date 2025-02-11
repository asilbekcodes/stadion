import React, { useEffect, useState } from "react";
import Layout from "../../components/Admin/Layout";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { Adminconfig } from "../../helpers/token/admintoken";

function History() {
  const [historys, setHistorys] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}order/my-stadion-history-bron/`, Adminconfig)
      .then((res) => setHistorys(res.data))
      .catch((err) => console.log(err));
  }, []);

  const formatDate = (dateString) => {
    const months = [
      "yanvar",
      "fevral",
      "mart",
      "aprel",
      "may",
      "iyun",
      "iyul",
      "avgust",
      "sentyabr",
      "oktyabr",
      "noyabr",
      "dekabr",
    ];
    const date = new Date(dateString);
    return `${date.getDate()}-${
      months[date.getMonth()]
    } ${date.getFullYear()} yil`;
  };

  const groupedHistory = historys.reduce((acc, item) => {
    const formattedDate = formatDate(item.date);
    if (!acc[formattedDate]) acc[formattedDate] = [];
    acc[formattedDate].push(item);
    return acc;
  }, {});

  return (
    <Layout>
      <div className="md:p-8 p-4 dark:bg-gray-900 bg-gray-100 min-h-screen">
        <h2 className="md:text-2xl text-xl">Buyurtmalar tarixi</h2>
        {Object.keys(groupedHistory).length > 0 ? (
          Object.entries(groupedHistory).map(([date, orders]) => (
            <div key={date}>
              <h3 className="mb-2 mt-6">{date}</h3>
              <table className="w-full text-sm text-left text-gray-800 dark:text-gray-300">
                <thead className="text-xs font-normal text-black border-b dark:border-gray-200 border-gray-800 uppercase bg-gray-50 dark:bg-gray-800 dark:text-white">
                  <tr>
                    <th className="pr-6 pl-2 py-4">id</th>
                    <th className="pr-6 py-4">Ism familya</th>
                    <th className="pr-6 py-4">tel</th>
                    <th className="pr-6 py-4">stadion name</th>
                    <th className="pr-6 py-4">olingan vaqti</th>
                    <th className="pr-6 py-4">status</th>
                  </tr>
                </thead>
                <tbody className="border-b border-gray-800 dark:border-gray-200">
                  {orders.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white dark:bg-gray-900 border-y"
                    >
                      <th className="pr-6 pl-2 py-4">{index + 1}</th>
                      <td className="pr-6 py-4">
                        {item.user.first_name} {item.user.last_name}
                      </td>
                      <td className="pr-6 py-4">{item.user.phone_number}</td>
                      <td className="pr-6 py-4">{item.stadion}</td>
                      <td className="pr-6 py-4">{item.time}</td>
                      <td className="pr-6 py-4">
                        {item.status === "T" ? (
                          <span className="border border-green-600 rounded-lg py-1.5 px-3 text-green-600">
                            Tasdiqlangan
                          </span>
                        ) : item.status === "B" ? (
                          <span className="border border-red-600 rounded-lg py-1.5 px-2 text-red-600">
                            Bekor qilingan
                          </span>
                        ) : item.status === "K" ? (
                          <span className="border border-yellow-500 rounded-lg py-1.5 px-3 text-yellow-500">
                            Kutilmoqda...
                          </span>
                        ) : (
                          <span className="text-gray-600">Noma'lum</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p className="text-center text-black text-lg dark:text-white">
            Ma'lumot yo'q
          </p>
        )}
      </div>
    </Layout>
  );
}

export default History;
