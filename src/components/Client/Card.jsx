import { IoHeart, IoHeartOutline, IoLocationOutline } from "react-icons/io5";
import img from "../../assets/photo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { GiRoundStar } from "react-icons/gi";
import { baseUrl } from "../../helpers/api/baseUrl";
import { userConfig } from "../../helpers/token/userToken";

function Card({ className, classNames, classNm, selectedRegionId }) {
  const [stadiums, setStadiums] = useState([]); // Stadionlar ro'yxati
  const [favorites, setFavorites] = useState([]); // Sevimli stadionlar ro'yxati

  // API orqali stadionlarni olish
  const getCard = () => {
    axios
      .get(`${baseUrl}stadion/all-stadion/`, {
        params: { tuman: selectedRegionId },
      })
      .then((res) => {
        setStadiums(res.data);
      })
      .catch((err) => console.error(err));
  };

  // API orqali sevimli stadionlarni olish
  const getFavorites = () => {
    axios
      .get(`${baseUrl}common/liked-stadion/`, userConfig())
      .then((res) => {
        setFavorites(res.data);
      })
      .catch((err) => console.error(err));
  };

  // Sahifa birinchi yuklanganda API chaqirish
  useEffect(() => {
    getCard();
    getFavorites();
  }, [selectedRegionId]);

  // Like holatini o'zgartiruvchi funksiya
  const handleLikeClick = (stadionId) => {
    // const isFavorite = favorites.some((fav) => fav.id === stadionId);

    if (favorites.length > 0) {
      // Agar stadion allaqachon sevimlilarga qo'shilgan bo'lsa, DELETE so'rovini yuborish
      axios
        .delete(`${baseUrl}common/delete-liked-stadion/${id}`, userConfig())
        .then((res) => {
          getFavorites(); // Sevimlilar ro'yxatini yangilash
        })
        .catch((err) => console.error(err));
    } else {
      // Agar stadion sevimlilarga qo'shilmagan bo'lsa, POST so'rovini yuborish
      axios
        .post(
          `${baseUrl}common/liked-stadion/`,
          {
            stadion_id: stadionId,
          },
          userConfig()
        )
        .then((res) => {
          getFavorites(); // Sevimlilar ro'yxatini yangilash
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className={className}>
      <div className={classNames}>
        {stadiums.map((stadium, index) => (
          <div key={stadium.id || index} className={classNm}>
            {/* Yurakcha ikonkasi */}
            <button
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md z-10 cursor-pointer"
              onClick={() => handleLikeClick(stadium.id)} // Like holatini o'zgartirish
            >
              {favorites.length > 0 && favorites ? (
                <IoHeart className="text-red-600 text-xl" /> // Yurak qizil
              ) : (
                <IoHeartOutline className="text-black text-xl" /> // Yurak qora
              )}
            </button>

            {/* Stadion rasmi */}
            <Link to={`/about/${stadium.id}`}>
              <img
                className="rounded-t-lg w-full h-[200px] md:h-[150px]"
                src={stadium.photo || img} // Agar API'da rasm bo'lmasa, default rasm
                alt={stadium.name || "Stadium"}
              />

              {/* Stadion ma'lumotlari */}
              <div className="flex flex-col justify-center p-3 font-sans">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-gray-500 flex items-center gap-1">
                    {stadium.star ? (
                      <GiRoundStar className="text-red-600 text-[15px]" />
                    ) : (
                      ""
                    )}
                    {stadium.star || "Bu hali yangi"}
                  </span>
                  <span className="text-xs px-1 text-white bg-green-600">
                    {stadium.star ? "" : "Yangi"}
                  </span>
                </div>
                <h3 className="text-sm mt-3 mb-1">{stadium.title}</h3>
                <p className="text-xs flex items-start gap-1">
                  <span className="text-green-500 mt-1">
                    <IoLocationOutline />
                  </span>
                  {stadium.viloyat + ' ' + stadium.tuman + ' ' + stadium.address || "Manzil kiritilmagan"}
                </p>
                <p className="text-sm font-semibold mt-5">
                  {stadium.price ? stadium.price.toLocaleString("ru-RU") : "0"} so`m
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;