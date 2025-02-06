import React, { useEffect, useRef, useState } from "react";
import { Tabs } from "antd";
import { UserOutlined, PhoneOutlined, IdcardOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../helpers/api/baseUrl";
import { Adminconfig } from "../../helpers/token/admintoken";
import Kontact from "./Kontact";

const { TabPane } = Tabs;

function ProfilCom() {
  const [activeTab, setActiveTab] = useState("1");
  const [getProfil, setgetProfil] = useState(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");

  const onChange = (key) => {
    setActiveTab(key);
  };

  const handleProfil = () => {
    axios
      .get(`${baseUrl}user/user-info/`, Adminconfig)
      .then((res) => {
        setgetProfil(res.data);
        setCurrentPhoneNumber(res.data.phone_number);
        setNewPhoneNumber(res.data.phone_number);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleProfil();
  }, []);

  const first_name = useRef(null);
  const last_name = useRef(null);

  const isPhoneNumberChanged = () => {
    return newPhoneNumber !== currentPhoneNumber && newPhoneNumber.length > 0;
  };

  const isNameChanged = () => {
    return first_name.current.value !== getProfil.first_name || last_name.current.value !== getProfil.last_name;
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // First update name
      if (!isNameChanged() && !isPhoneNumberChanged()) {
        toast.info("Hech qanday o'zgarish yo'q");
        return;
      }
      const nameData = {
        first_name: first_name.current.value,
        last_name: last_name.current.value,
      };
      
      await axios.put(`${baseUrl}user/user-info/`, nameData, Adminconfig);
      
      // If phone number is changed, initiate verification
      if (isPhoneNumberChanged()) {
        const phoneData = {
          phone_number: newPhoneNumber,
        };
        await axios.post(`${baseUrl}user/reset-phone-number/`, phoneData, Adminconfig);
        setIsVerificationModalOpen(true);
        toast.success("Tasdiqlash kodi yuborildi");
      } else {
        toast.success("Ma'lumotlar muvaffaqiyatli yangilandi");
        handleProfil();
      }
    } catch (err) {
      console.log(err);
      toast.error("Ma'lumotlarni yangilashda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPhoneNumber = async () => {
    setIsLoading(true);
    try {
      const verificationData = {
        phone_number: newPhoneNumber,
        code: verificationCode
      };
      
      await axios.post(`${baseUrl}user/verify-reset-phone-number/`, verificationData, Adminconfig);
      toast.success("Barcha ma'lumotlar muvaffaqiyatli yangilandi");
      setIsVerificationModalOpen(false);
      handleProfil();
    } catch (err) {
      console.log(err);
      toast.error("Tasdiqlash kodida xatolik");
    } finally {
      setIsLoading(false);
    }
  };

  const VerificationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
          Telefon raqamini tasdiqlash
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          <span className="font-semibold">{newPhoneNumber}</span> raqamiga yuborilgan tasdiqlash kodini kiriting
        </p>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          placeholder="Tasdiqlash kodi"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsVerificationModalOpen(false)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded"
          >
            Bekor qilish
          </button>
          <button
            onClick={verifyPhoneNumber}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          >
            {isLoading ? "Yuklanmoqda..." : "Tasdiqlash"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="md:text-2xl text-xl dark:text-gray-100">Profil</h1>
      <Tabs
        activeKey={activeTab}
        onChange={onChange}
        tabBarStyle={{
          marginBottom: 24,
        }}
      >
        {/* Mening ma'lumotlarim */}
        <TabPane
          tab={<span className="dark:text-gray-100">Ma'lumotlarim</span>}
          key="1"
        >
          {getProfil ? (
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl dark:text-blue-400 mb-4">
                Ma'lumotlarim
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Bu yerda hisobingiz ma'lumotlarini ko'rishingiz mumkin.
              </p>
              <div className="flex items-center mb-4">
                <UserOutlined className="text-xl text-blue-500 dark:text-blue-400 mr-2" />
                <p className="dark:text-gray-100">
                  <span className="font-bold mr-2">Ism:</span>{" "}
                  {getProfil.first_name}
                </p>
              </div>
              <div className="flex items-center mb-4">
                <IdcardOutlined className="text-xl text-green-500 dark:text-green-400 mr-2" />
                <p className="dark:text-gray-100">
                  <span className="font-bold mr-2">Familya:</span>{" "}
                  {getProfil.last_name}
                </p>
              </div>
              <div className="flex items-center mb-4">
                <PhoneOutlined className="text-xl text-yellow-500 dark:text-yellow-400 mr-2" />
                <p className="dark:text-gray-100">
                  <span className="font-bold mr-2">Telfon raqami:</span>{" "}
                  {getProfil.phone_number}
                </p>
              </div>
              <div className="flex items-center">
                <IdcardOutlined className="text-xl text-purple-500 dark:text-purple-400 mr-2" />
                <p className="dark:text-gray-100">
                  <span className="font-bold mr-2">Rol:</span> Stadion admin
                </p>
              </div>
            </div>
          ) : (
            <p className="dark:text-gray-100">Ma'lumotlar yuklanmoqda...</p>
          )}
        </TabPane>

        {/* Ma'lumotlarni o'zgartirish */}
        <TabPane
          tab={
            <span className="dark:text-gray-100">
              O'zgartirish
            </span>
          }
          key="2"
        >
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl dark:text-blue-400 mb-4">
              Ma'lumotlarni o'zgartirish
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Bu yerda hisobingiz ma'lumotlarini o'zgartirishingiz mumkin.
            </p>
            <form className="space-y-4" onSubmit={handleProfileUpdate}>
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium dark:text-gray-100"
                >
                  Ism
                </label>
                <input
                  type="text"
                  id="first_name"
                  ref={first_name}
                  className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  defaultValue={getProfil?.first_name || ""}
                />
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium dark:text-gray-100"
                >
                  Familya
                </label>
                <input
                  type="text"
                  id="last_name"
                  ref={last_name}
                  className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  defaultValue={getProfil?.last_name || ""}
                />
              </div>

              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium dark:text-gray-100"
                >
                  Telefon raqami
                </label>
                <input
                  type="text"
                  id="phone_number"
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 disabled:bg-blue-300"
              >
                {isLoading ? "Yuklanmoqda..." : "O'zgartirish"}
              </button>
            </form>
          </div>
        </TabPane>
        <TabPane
          tab={
            <span className="dark:text-gray-100">
              Telfon raqamlar
            </span>
          }
          key="3"
        >
          <Kontact />
        </TabPane>
      </Tabs>
      {isVerificationModalOpen && <VerificationModal />}
    </div>
  );
}

export default ProfilCom;
