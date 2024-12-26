import React, { useEffect, useState } from "react";
import Layout from "../../components/Admin/Layout";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { Adminconfig } from "../../helpers/token/admintoken";
import Times from "./Times"; // Times sahifasi uchun import

const Times_Pages = () => {
  const [stadions, setStadions] = useState([]); // Stadionlar ro'yxati
  const [selectedStadionId, setSelectedStadionId] = useState(null); // Tanlangan stadion ID
  const [showTimes, setShowTimes] = useState(false); // Times sahifasini ko'rsatish

  // Stadion ma'lumotlarini olish funksiyasi
  const fetchStadions = () => {
    axios
      .get(`${baseUrl}stadion/admin-stadion-get/`, Adminconfig)
      .then((res) => setStadions(res.data))
      .catch((err) => console.log("Error:", err));
  };

  useEffect(() => {
    fetchStadions();
  }, []);

  // Kartaga bosilganda ishlaydi
  const handleCardClick = (id) => {
    setSelectedStadionId(id); // Tanlangan stadion ID ni o'rnatadi
    setShowTimes(true); // Times sahifasini ko'rsatadi
  };

  return (
    <Layout>
      <div className="p-4">
        {/* Agar Times sahifasi ko'rinmasligi kerak bo'lsa */}
        {!showTimes ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">
              Stadion vaqtlarini boshqarish
            </h1>
            <div className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stadions.length > 0 ? (
                stadions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleCardClick(item.id)} // Kartaga bosilganda ID o'rnatiladi
                    className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:shadow-xl transition"
                  >
                    <img
                      src={item.photo || "https://via.placeholder.com/400x200"}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-800 mb-1">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-500 flex py-2 items-center">
                        {item.address}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center">
                        {item.description || "Joylashuv noma'lum"}
                      </p>
                      <p className="text-lg font-bold text-gray-800 mt-3">
                        {item.price
                          ? `${item.price} So'm`
                          : "Narx belgilanmagan"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  Ma'lumot hozircha yo'q
                </p>
              )}
            </div>
          </>
        ) : (
          // Agar Times sahifasi ko'rsatilishi kerak bo'lsa
          <Times selectedId={selectedStadionId} />
        )}
      </div>
    </Layout>
  );
};

export default Times_Pages;
