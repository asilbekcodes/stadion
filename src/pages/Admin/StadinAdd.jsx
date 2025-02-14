import { useEffect, useState, useCallback } from "react";
import Layout from "../../components/Admin/Layout";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Adminconfig } from "../../helpers/token/admintoken";

const StadinAdd = ({ stadionCount }) => {
  const [getAdd, setGetadd] = useState(false);
  const [getMalumot, setGetMalumot] = useState([]);
  const [loading, setLoading] = useState(false);

  const addStadion = () => {
    setGetadd(!getAdd);
  };

  const deleteStadion = async (item) => {
    setLoading(true);
    try {
      await axios.delete(
        `${baseUrl}stadion/admin-stadion-delete/${item.id}/`,
        Adminconfig()
      );
      getMalumotlar();
    } catch (err) {
      console.error("Stadion o‘chirishda xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  const getMalumotlar = useCallback(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}stadion/admin-stadion-get/`, Adminconfig())
      .then((res) => {
        setGetMalumot(res.data);
        stadionCount(res.data.length);
      })
      .catch((err) => console.error("Ma'lumot olishda xatolik:", err))
      .finally(() => setLoading(false));
  }, [stadionCount]);

  useEffect(() => {
    getMalumotlar();
  }, [getMalumotlar]);

  return (
    <Layout>
      <div className="bg-gray-100 min-h-[100vh] dark:bg-gray-900">
        <div className="p-4 md:p-8">
          <Link to={"/general"}>
            <button className="flex items-center gap-2 bg-green-500 dark:bg-green-700 text-white px-4 py-2 rounded-lg transition">
              Stadion qo'shish
            </button>
          </Link>
        </div>

        <div className="px-4 md:px-8">
          <div className="hidden sm:block relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Stadion nomi</th>
                  <th className="px-6 py-3">Stadion haqida ma'lumot</th>
                  <th className="px-6 py-3">Narxi</th>
                  <th className="px-6 py-3">Manzili</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center p-5">
                      Yuklanmoqda...
                    </td>
                  </tr>
                ) : getMalumot.length > 0 ? (
                  getMalumot.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.title}
                      </th>
                      <td className="px-6 py-4">
                        {item.description.length > 30
                          ? item.description.slice(0, 30) + "..."
                          : item.description}
                      </td>
                      <td className="px-6 py-4">{item.price} so'm</td>
                      <td className="px-6 py-4">{item.address}</td>
                      <td className="px-6 py-4 flex gap-3">
                        <Link to={`/stadionEdit/${item.id}`}>
                          <button className="text-blue-600 dark:text-blue-500 hover:underline flex items-center">
                            <FaEdit className="w-5 h-5 mr-1" />
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteStadion(item)}
                          disabled={loading}
                          className="text-red-600 dark:text-red-500 hover:underline flex items-center"
                        >
                          <FaTrash className="w-5 h-5 mr-1" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-5 text-center text-gray-500 dark:text-gray-400"
                    >
                      Siz hali stadion qo'shmagansiz !
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="block sm:hidden">
            {getMalumot && getMalumot.length > 0 ? (
              getMalumot.map((item, index) => (
                <div
                  key={index}
                  className="p-4 mb-4 flex flex-col gap-3 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
                >
                  <p className="text-sm text-gray-900 dark:text-white flex items-center gap-2 justify-between">
                    <span >Stadion nomi:</span>
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-white flex items-center gap-2 justify-between">
                    <span >Stadion haqida</span>{" "}
                    {item.description.length > 20
                      ? item.description.slice(0, 20) + "..."
                      : item.description}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-white flex items-center gap-2 justify-between">
                    <span >Narxi:</span> {item.price}{" "}
                    so'm
                  </p>
                  <p className="text-sm text-gray-700 dark:text-white flex items-center gap-2 justify-between">
                    <span >Manzili:</span>{" "}
                    {item.address}
                  </p>
                  <div className="flex justify-between gap-3 items-center ">
                    <p className="text-sm text-gray-700 dark:text-white">
                      Action
                    </p>
                    <div>
                      <Link to={`/stadionEdit/${item.id}`}>
                        <button className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          <FaEdit className="w-5 h-5 mr-3 " />
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteStadion(item)}
                        className="mt-2 font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        <FaTrash className="w-5 h-5 mr-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-black dark:text-white">
                Siz hali stadion qo'shmagansiz
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StadinAdd;
