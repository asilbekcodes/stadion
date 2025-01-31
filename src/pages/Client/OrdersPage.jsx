import React, { useEffect, useState } from "react";
import { Card, Button } from "flowbite-react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Footer from "../../components/Client/Footer";
import Buttons from "../../components/Buttons";
import Navbar from "../../components/Client/Navbar";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { Star } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { userConfig } from "../../helpers/token/userToken";
import Footers from "./Footer";

const OrdersPage = () => {
  const [openCards, setOpenCards] = useState({});
  const [data, setData] = useState([]);

  const toggleDetails = (index) => {
    setOpenCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const fetchData = () => {
    axios
      .get(`${baseUrl}order/my-bron/`, userConfig)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-50  w-full">
      {/* Mobil versiyada "Заказы" tugmasi */}
      <div className="p-4 block lg:hidden">
        <Buttons text={"Buyurtmalar"} />
      </div>

      {/* Navbar faqat katta ekranlarda */}
      <div className="hidden lg:block">
        <Navbar />
      </div>

      {/* Asosiy kontent */}
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start min-h-[75vh] gap-4 mx-auto px-4 py-8 lg:px-40">
          {data &&
            data.map((item, index) => (
              <Card
                key={index}
                className="mb-4 w-full border border-gray-400 bg-gray-100 shadow-sm rounded-lg"
              >
                <div>
                  {/* Buyurtma vaqti */}
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-lg font-bold">{item.time}</h5>
                  </div>
                  {/* Sana va holat tugmasi */}
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">{item.date}</p>
                    <Button
                      size="xs"
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === "K"
                          ? "bg-yellow-500 text-white" // Kutulmoqda
                          : item.status === "B"
                          ? "bg-red-500 text-white" // Bekor qilingan
                          : item.status === "T"
                          ? "bg-green-500 text-white" // Tasdiqlangan
                          : "bg-gray-500 text-white" // Noma'lum holat
                      }`}
                    >
                      {item.status === "K"
                        ? "Kutilmoqda"
                        : item.status === "B"
                        ? "Bekor qilingan"
                        : item.status === "T"
                        ? "Tasdiqlangan"
                        : "Noma'lum"}
                    </Button>
                  </div>
                  <hr className="my-5" />
                  {/* Stadion haqida ma'lumot */}
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-sm mt-3 font-medium">
                      {item?.stadion?.title || "Stadion nomi yuq"}
                    </p>
                    <div
                      onClick={() => toggleDetails(index)}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {openCards[index] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </div>
                  </div>
                  {openCards[index] && (
                    <div className="mt-4">
                      <hr className="my-3" />
                      <div>
                        <img
                          src={item.stadion?.photo}
                          alt="Stadion rasmi"
                          className="mt-3 rounded w-full h-40 object-cover"
                        />
                        <div className="flex justify-between items-center my-2">
                          <p className="text-red-700 text-sm flex items-center gap-1">
                            <Star /> {item.stadion?.star}{" "}
                          </p>
                          <p className="text-sm">{item?.stadion?.price ? item?.stadion?.price.toLocaleString("ru-Ru") : "0"} so'm</p>
                        </div>
                        <p className="text-sm">{item.stadion?.title || "Stadion nomi yuq"}</p>
                        <p className="text-sm text-gray-500">
                          {item.stadion?.address || "Stadion manzili yuq"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center p-4 rounded-md h-[80vh] ">
          <p className="text-xl font-semibold text-gray-700">
            Sizda buyurtmalar mavjud emas.
          </p>
          <Link to={"/"}>
            <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white">
              Stadion buyurtma qilish
            </Button>
          </Link>
        </div>
      )}
      <Footers />
      <Footer />
    </div>
  );
};

export default OrdersPage;
