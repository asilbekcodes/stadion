import React, { useEffect, useState } from "react";
import Navbar from "../../components/Client/Navbar";
import { IoHeart, IoLocationOutline } from "react-icons/io5";
import img from "../../assets/photo.png";
import Footer from "../../components/Client/Footer";
import Buttons from "../../components/Buttons";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { GiRoundStar } from "react-icons/gi";
import Footers from "./Footer";
import { baseUrl } from "../../helpers/api/baseUrl";
import { userConfig } from "../../helpers/token/userToken";
import axios from "axios";

function Favorites() {
  // LocalStorage'dan favorites ma'lumotini olish
  const [favorites, setFavorites] = useState();

  const getFavorites = () => {
    axios
      .get(`${baseUrl}common/liked-stadion/`, userConfig())
      .then((res) => {
        setFavorites(res.data);
      })
      .catch((err) => console.error(err));
  };  

  const handleRemoveFavorite = (id) => {
    axios
      .delete(
        `${baseUrl}common/delete-liked-stadion/${id}/`,
        userConfig()
      )
      .then((res) => {
        getFavorites();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="h-screen bg-white">
      <div className="p-4 block lg:hidden">
        <Buttons text={"Sevimlilar"} />
      </div>
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div>
        <div className="min-h-[75vh]">
          {favorites && favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4 lg:px-40">
              {favorites.map((stadium) => (
                <div
                  key={stadium.id}
                  className="flex flex-col rounded-lg bg-white"
                >
                  <div className="relative">
                    <button
                      onClick={() => handleRemoveFavorite(stadium.id)}
                      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md cursor-pointer"
                    >
                      <IoHeart className="text-red-600 text-xl" />
                    </button>
                  </div>

                  <Link to={`/about/${stadium.stadion.id}`}>
                    <img
                      className="rounded-t-lg h-[200px] md:h-[150px] w-full object-cover"
                      src={stadium.stadion.photo || img}
                      alt={stadium.stadion.name || "Favorite Stadium"}
                    />
                    {/* Stadion ismi rasmning ostiga joylashadi */}
                    <div className="flex flex-col justify-center p-[10px] font-sans">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] text-gray-500 flex items-center gap-1">
                          {stadium.stadion.star ? (
                            <GiRoundStar className="text-red-600 text-[15px]" />
                          ) : (
                            ""
                          )}
                          {stadium.stadion.star || "Bu hali yangi"}
                        </span>
                        <span className="text-xs px-1 text-white bg-green-600">
                          {stadium.stadion.star ? "" : "Yangi"}
                        </span>
                      </div>
                      <h3 className="text-sm mt-3 mb-1">
                        {stadium.stadion.title}
                      </h3>
                      <p className="text-xs flex items-center gap-1">
                        <span className="text-green-500">
                          <IoLocationOutline />
                        </span>
                        {stadium.stadion.viloyat +
                          " " +
                          stadium.stadion.tuman +
                          " " +
                          stadium.stadion.address || "Manzil kiritilmagan"}
                      </p>
                      <p className="text-sm font-semibold mt-5">
                        {stadium.stadion.price
                          ? stadium.stadion.price.toLocaleString("ru-Ru")
                          : "0"}{" "}
                        so`m
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center text-center p-4 rounded-md h-[80vh]">
              <p className="text-xl font-semibold text-gray-700">
                Sevimlilar ro'yxati bo'sh
              </p>
              <Link to={"/main"}>
                <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white">
                  Stadionlarni ko'rish
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Footer components that won't be affected by state changes */}
      <Footers />
      <Footer />
    </div>
  );
}

export default Favorites;
