import React, { useEffect, useRef, useState } from "react";
import { Tabs } from "antd";
import { UserOutlined, PhoneOutlined, IdcardOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify"; // Toastify kutubxonasini ishlatish tavsiya qilinadi
import { baseUrl } from "../../helpers/api/baseUrl";
import { Adminconfig } from "../../helpers/token/admintoken";

const { TabPane } = Tabs;

function ProfilCom() {
  const [activeTab, setActiveTab] = useState("1");
  const [getProfil, setgetProfil] = useState(null); // Backend ma'lumotlari uchun holat

  const onChange = (key) => {
    setActiveTab(key);
  };

  // Backenddan ma'lumotlarni olish funksiyasi
  const handleProfil = () => {
    axios
      .get(`${baseUrl}user/user-info/`, Adminconfig)
      .then((res) => {
        setgetProfil(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleProfil();
  }, []);

  // Ma'lumotlarni o'zgartirish uchun ref'lar
  const first_name = useRef(null);
  const last_name = useRef(null);
  const phone_number = useRef(null);

  // Ma'lumotlarni yangilash funksiyasi
  const pullProfil = (e) => {
    e.preventDefault();
    const data = {
      first_name: first_name.current.value,
      last_name: last_name.current.value,
      phone_number: phone_number.current.value,
    };

    axios
      .put(`${baseUrl}user/user-info/`, data, Adminconfig)
      .then((res) => {
        console.log(res);
        toast.success("Ma'lumotlar muvaffaqiyatli o'zgartirildi!");
        handleProfil(); // Yangilangan ma'lumotlarni qaytadan olish
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ma'lumotlarni o'zgartirishda xatolik yuz berdi!");
      });
  };

  return (
    <div className="p-4 md:p-8 bg-white dark:bg-gray-900 dark:text-gray-100 min-h-screen">
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
          tab={<span className="dark:text-gray-100">Mening ma'lumotlarim</span>}
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
              Ma'lumotlarni o'zgartirish
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
            <form className="space-y-4" onSubmit={pullProfil}>
              {/* Ism */}
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

              {/* Familya */}
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

              {/* Telefon raqami */}
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
                  ref={phone_number}
                  className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  defaultValue={getProfil?.phone_number || ""}
                />
              </div>

              {/* Submit tugmasi */}
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500"
              >
                O'zgartirish
              </button>
            </form>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfilCom;
