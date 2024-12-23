import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Client/Navbar";
import Buttons from "../../components/Buttons";
import Footer from "../../components/Client/Footer";
import { FaUserShield } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { toast } from "react-toastify";
import { userConfig } from "../../helpers/token/userToken";
import Footers from "./Footer";

function Profils() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [getProfil, setgetProfil] = useState(null);
  const first_name = useRef(null);
  const last_name = useRef(null);
  const phone_number = useRef(null);

  function handleProfil() {
    axios
      .get(`${baseUrl}user/user-info/`, userConfig)
      .then((res) => {
        setgetProfil(res.data); // Set profile data
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
  function pullProfil() {
    const data = {
      first_name: first_name.current.value,
      last_name: last_name.current.value,
      phone_number: phone_number.current.value,
    };
    axios
      .put(`${baseUrl}user/user-info/`, data, userConfig)
      .then((res) => {
        console.log(res);
        toast.success("O'zgarish Saqlandi");
      })
      .catch((err) => console.log(err));
  }
  function removeItem() {
    localStorage.removeItem("userToken");
    navigate("/");
  }
  
  

  useEffect(() => {
    handleProfil();
    // Tokenni localStorage'dan tekshirish
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-gray-50">
        <div className="p-4 block lg:hidden">
          <Buttons text={"Profil"} />
        </div>
        <div className=" hidden lg:block">
          <Navbar />
        </div>
        <div className="flex flex-col items-center justify-center h-[85vh] bg-gray-50">
          <h1 className="text-2xl font-semibold text-black">
            Siz hali akkauntga kirmagansiz!
          </h1>
          <p className="text-gray-600 mt-2">
            Iltimos, tizimga kirish uchun stadion bron qiling.
          </p>
          <Link
            to={"/auth/login"}
            className="p-2 bg-green-600 rounded-md text-white mt-3"
          >
            Admin Bo'lish
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50  ">
      <div className="p-4 block lg:hidden">
        <Buttons text={"Профиль"} />
      </div>
      <div className=" hidden lg:block">
        <Navbar />
      </div>
      <div className="px-4 lg:px-40 font-sans h-[75vh]">
        <h1 className="text-black text-[18px] font-semibold my-5 lg:text-[24px]">
          Mening ma`lumotlar
        </h1>
        {getProfil ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-200">
                Ism
              </label>
              <input
                type="text"
                ref={first_name}
                defaultValue={getProfil.first_name} // Access individual fields
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 dark:bg-gray-700 dark:text-white dark:border-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-200">
                Familiya
              </label>
              <input
                type="text"
                ref={last_name}
                defaultValue={getProfil.last_name}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 dark:bg-gray-700 dark:text-white dark:border-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-200">
                Telefon raqam
              </label>
              <input
                defaultValue={getProfil.phone_number}
                ref={phone_number}
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 dark:bg-gray-700 dark:text-white dark:border-gray-500"
              />
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-300">
            Ma'lumotlar yuklanmoqda...
          </div>
        )}
        <button
          onClick={pullProfil}
          className="p-2 rounded-lg text-md mt-4 bg-gray-400 hover:bg-gray-600 transition duration-200 ease-in-out w-max font-semibold text-white dark:bg-gray-700 dark:hover:bg-gray-500"
        >
          O'zgartirishlarni saqlang
        </button>
        <hr className="mt-5 mb-2 py-2" />
        <div className="grid lg:grid-cols-2 gap-4">
          <Link
            to={"/auth/login"}
            className="py-4 px-3 flex items-center rounded-lg bg-gray-200 text-gray-500 w-full shadow-sm"
          >
            <FaUserShield className="text-lg mr-2 text-red-500" />
            <span className="pr-10 text-black">Admin bo`lib o`tish</span>
          </Link>
          <div
            onClick={removeItem}
            className="py-4 cursor-pointer px-3 flex items-center rounded-lg bg-gray-200 text-gray-500 w-full shadow-sm"
          >
            <IoExitOutline className="text-lg mr-2 text-red-500" />
            <span className="pr-10 text-gray-900">Tizimdan chiqish</span>
          </div>
        </div>
      </div>
      <Footers />
      <Footer />
    </div>
  );
}

export default Profils;
