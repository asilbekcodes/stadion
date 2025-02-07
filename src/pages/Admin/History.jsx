import React, { useEffect, useState } from "react";
import Layout from "../../components/Admin/Layout";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { Adminconfig } from "../../helpers/token/admintoken";

function History() {
  const [historys, setHistorys] = useState([]);

  const getHistory = () => {
    axios
      .get(`${baseUrl}order/my-stadion-history-bron/`, Adminconfig)
      .then((res) => {
        setHistorys(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getHistory();
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
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month} ${year} yil`;
  };

  return (
    <Layout>
      <div className="md:p-8 p-4 dark:bg-gray-900 bg-gray-100 min-h-screen">
        <h2 className="md:text-2xl text-xl">Buyurtmalar tarixi</h2>
        {historys && historys.length > 0 ? (
          historys.map((item, index) => (
            <div key={index}>
              <h3 className="mb-2 mt-6">{formatDate(item.date)}</h3>
              <table className="w-full text-sm text-left text-gray-800 dark:text-gray-300 m">
                <thead className="text-xs text-black border-y dark:border-gray-200 border-gray-800 uppercase bg-gray-50 dark:bg-gray-800 dark:text-white">
                  <tr>
                    <th scope="col" className="pr-6 pl-2 py-3">
                      id
                    </th>
                    <th scope="col" className="pr-6 py-3">
                      Ism familya
                    </th>
                    <th scope="col" className="pr-6 py-3">
                      tel
                    </th>
                    <th scope="col" className="pr-6 py-3">
                      stadion name
                    </th>
                    <th scope="col" className="pr-6 py-3">
                      olingan vaqti
                    </th>
                  </tr>
                </thead>
                <tbody className="border-b border-gray-800 dark:border-gray-200">
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="pr-6 pl-2 py-3">
                      {index + 1}
                    </th>
                    <td className="pr-6 py-3">
                      {item.user.first_name + " " + item.user.last_name}
                    </td>
                    <td className="pr-6 py-3">{item.user.phone_number}</td>
                    <td className="pr-6 py-3">{item.stadion}</td>
                    <td className="pr-6 py-3">{item.time}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p className="text-center text-black text-lg dark:text-white">Ma'lumot yo'q</p>
        )}
      </div>
    </Layout>
  );
}

export default History;
