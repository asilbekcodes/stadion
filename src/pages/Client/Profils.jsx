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
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const navigate = useNavigate();
  const [getProfil, setgetProfil] = useState(null);
  const first_name = useRef(null);
  const last_name = useRef(null);

  function handleProfil() {
    axios
      .get(`${baseUrl}user/user-info/`, userConfig)
      .then((res) => {
        setgetProfil(res.data);
        setCurrentPhoneNumber(res.data.phone_number);
        setNewPhoneNumber(res.data.phone_number);
      })
      .catch((err) => console.log(err));
  }

  const isPhoneNumberChanged = () => {
    return newPhoneNumber !== currentPhoneNumber && newPhoneNumber.length > 0;
  }
  const isNameChanged = () => {
    return first_name.current.value !== getProfil.first_name || last_name.current.value !== getProfil.last_name;
  }

  async function handleProfileUpdate() {
    setIsLoading(true);
    try {
      if (!isNameChanged() && !isPhoneNumberChanged()) {
        toast.info("Hech qanday o'zgarish yo'q");
        return;
      }
      // First update name if changed
      const nameData = {
        first_name: first_name.current.value,
        last_name: last_name.current.value,
      };
      
      await axios.put(`${baseUrl}user/user-info/`, nameData, userConfig);
      
      // Then check if phone number needs updating
      if (isPhoneNumberChanged()) {
        const phoneData = {
          phone_number: newPhoneNumber,
        };
        await axios.post(`${baseUrl}user/reset-phone-number/`, phoneData, userConfig);
        setIsVerificationModalOpen(true);
        toast.success("Tasdiqlash kodi yuborildi");
      } else {
        toast.success("Ma'lumotlar muvaffaqiyatli yangilandi");
      }
    } catch (err) {
      console.log(err);
      toast.error("Ma'lumotlarni yangilashda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  }

  function verifyPhoneNumber() {
    setIsLoading(true);
    const verificationData = {
      phone_number: newPhoneNumber,
      code: verificationCode
    };
    
    axios
      .post(`${baseUrl}user/verify-reset-phone-number/`, verificationData, userConfig)
      .then((res) => {
        toast.success("Barcha ma'lumotlar muvaffaqiyatli yangilandi");
        setIsVerificationModalOpen(false);
        handleProfil();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Tasdiqlash kodida xatolik");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function removeItem() {
    localStorage.removeItem("userToken");
    navigate("/");
    window.location.reload("");
  }

  useEffect(() => {
    handleProfil();
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const VerificationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Telefon raqamini tasdiqlash</h2>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">{newPhoneNumber}</span> raqamiga yuborilgan tasdiqlash kodini kiriting
        </p>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Tasdiqlash kodi"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsVerificationModalOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Bekor qilish
          </button>
          <button
            onClick={verifyPhoneNumber}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-blue-300"
          >
            {isLoading ? "Yuklanmoqda..." : "Tasdiqlash"}
          </button>
        </div>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-gray-50">
        <div className="p-4 block lg:hidden">
          <Buttons text={"Profil"} />
        </div>
        <div className="hidden lg:block">
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
    <div className="bg-gray-50">
      <div className="p-4 block lg:hidden">
        <Buttons text={"Профиль"} />
      </div>
      <div className="hidden lg:block">
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
                defaultValue={getProfil.first_name}
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
                value={newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
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
          onClick={handleProfileUpdate}
          disabled={isLoading}
          className="p-2 rounded-lg text-md mt-4 bg-gray-500 hover:bg-gray-700 transition duration-200 ease-in-out w-max font-semibold text-white disabled:bg-blue-300"
        >
          {isLoading ? "Yuklanmoqda..." : "Ma'lumotlarni yangilash"}
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
      {isVerificationModalOpen && <VerificationModal />}
      <Footers />
      <Footer />
    </div>
  );
}

export default Profils;