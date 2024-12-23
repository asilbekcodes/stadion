import { IoHeart, IoHeartOutline, IoLocationOutline } from "react-icons/io5";
import img from "../../assets/photo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { GiRoundStar } from "react-icons/gi";
import { baseUrl } from "../../helpers/api/baseUrl";
import { userConfig } from "../../helpers/token/userToken";

function Card({ className, classNames, classNm }) {
  const [stadiums, setStadiums] = useState([]); // Stadionlarni saqlash uchun state

  const getStadions = () => {
    axios
      .get(`${baseUrl}stadion/all-stadion/`)
      .then((res) => setStadiums(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStadions();
  }, []);

  const postLike = (index) => {
    axios
      .post(
        `${baseUrl}common/liked-stadion/`,
        { stadion_id: stadiums[index].id },
        userConfig
      )
      .then((res) => {
        setStadiums((prev) => {
          const updatedStadiums = [...prev];
          // Serverdan qaytgan 'liked' holatini yangilash
          updatedStadiums[index] = {
            ...updatedStadiums[index],
            liked: res.data.liked, // Serverdan qaytarilgan yangi qiymat
          };
          return updatedStadiums;
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={className}>
      <div className={classNames}>
        {stadiums.map((stadium, index) => (
          <div key={stadium.id || index} className={classNm}>
            {/* Yurakcha ikonkasi */}
            <button
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md z-10 cursor-pointer"
              onClick={() => postLike(index)} // Like holatini o'zgartirish
            >
              {stadium.liked ? (
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
                    {stadium.rank_ratio ? (
                      <GiRoundStar className="text-red-600 text-[15px]" />
                    ) : (
                      ""
                    )}
                    {stadium.rank_ratio || "Bu hali yangi"}
                  </span>
                  <span className="text-xs px-1 pb-0.5 text-white bg-green-600">
                    {stadium.rank_ratio ? "" : "Yangi"}
                  </span>
                </div>
                <h3 className="text-sm mt-3 mb-1">{stadium.title}</h3>
                <p className="text-xs flex items-center gap-1">
                  <span className="text-green-500">
                    <IoLocationOutline />
                  </span>
                  {stadium.address || "Manzil kiritilmagan"}
                </p>
                <p className="text-sm font-semibold mt-5">
                  {stadium.price || "0"} So`m
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
