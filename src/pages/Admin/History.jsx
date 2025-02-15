import { useEffect, useState } from "react";
import Layout from "../../components/Admin/Layout";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { Adminconfig } from "../../helpers/token/admintoken";
import Tables from "../../components/Tables";

function History() {
  const [historys, setHistorys] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}order/my-stadion-history-bron/`, Adminconfig())
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

  const columns = [
    "ID",
    "Stadion nomi",
    "Telefon",
    "Kuni",
    "Olingan_vaqt",
    "Status",
  ];

  const data = historys.map((order, index) => ({
    ID: index + 1,
    "Stadion nomi": order.stadion,
    Telefon: order.user.phone_number,
    Kuni: formatDate(order.date),
    Olingan_vaqt: order.time,
    Status:
      order.status === "T" ? (
        <span className="border border-green-600 rounded-lg py-1.5 px-3 text-green-600">
          Tasdiqlangan
        </span>
      ) : order.status === "B" ? (
        <span className="border border-red-600 rounded-lg py-1.5 px-2 text-red-600">
          Bekor qilingan
        </span>
      ) : order.status === "K" ? (
        <span className="border border-yellow-500 rounded-lg py-1.5 px-3 text-yellow-500">
          Kutilmoqda...
        </span>
      ) : (
        <span className="text-gray-600">Noma'lum</span>
      ),
  }));

  return (
    <Layout>
      <div className="md:p-8 p-4 dark:bg-gray-900 bg-gray-100 min-h-screen">
        <h2 className="md:text-2xl text-xl mb-6">Buyurtmalar tarixi</h2>
        {historys.length === 0 ? (
          <div className="text-center text-black text-lg dark:text-white">
            Ma'lumot yo'q
          </div>
        ) : (
          <Tables columns={columns} rows={data} />
        )}
      </div>
    </Layout>
  );
}

export default History;
