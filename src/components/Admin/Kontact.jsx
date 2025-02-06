import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../helpers/api/baseUrl";
import { Adminconfig } from "../../helpers/token/admintoken";
import { AiOutlineDelete } from "react-icons/ai";
import { Modal, Input, Button, message } from "antd";
import { toast } from "react-toastify";

function Kontact() {
  const [phones, setPhones] = useState([]); // phone raqamlar ro'yxati
  const [isModalVisible, setIsModalVisible] = useState(false); // modalni ko'rsatish holati
  const [newPhone, setNewPhone] = useState(""); // yangi telefon raqami

  const getPhones = () => {
    axios
      .get(`${baseUrl}user/phones/`, Adminconfig)
      .then((res) => {
        setPhones(res.data); // telefon raqamlarini holatga saqlash
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPhones();
  }, []);

  // Input qiymatini yangilash funksiyasi
  const handleChange = (index, value) => {
    const updatedPhones = [...phones];
    updatedPhones[index].phone_number = value;
    setPhones(updatedPhones);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${baseUrl}user/phones/${id}/`, Adminconfig)
      .then((res) => {
        getPhones();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showModal = () => {
    setIsModalVisible(true); // modalni ko'rsatish
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewPhone("");
  };

  const handleAddPhone = () => {
    const data = {
      phone_number: newPhone,
      is_active: true,
    };
    axios
      .post(`${baseUrl}user/phones/`, { ...data }, Adminconfig)
      .then((res) => {
        getPhones();
        setIsModalVisible(false);
        setNewPhone("");
      })
      .catch((err) => {
        message.error(err.response.data);
      });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4 gap-5">
        <button
          onClick={showModal}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 disabled:bg-blue-300"
        >
          Qo'shish
        </button>
        <h2 className="text-[17px] md:text-xl dark:text-blue-400">
          Qo'shimcha telefon raqamlar
        </h2>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Bu yerda qo'shimcha telefon raqamlar qo‘shishingiz mumkin.
      </p>
      <form className="space-y-4">
        {phones && phones.length > 0 ? (
          phones.map((phone, index) => (
            <div key={phone.id}>
              <label
                htmlFor={`phone_${index}`}
                className="block text-sm font-medium dark:text-gray-100"
              >
                {index + 1}-raqam
              </label>
              <div className="flex items-center gap-2">
                <input
                  value={phone.phone_number}
                  disabled
                  type="text"
                  id={`phone_${index}`}
                  className=" block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
                <button
                  type="button"
                  onClick={() => handleDelete(phone.id)} // Pass the id of the phone to delete
                  className="px-4 py-[10px] text-sm text-red-500 bg-red-100 rounded-md hover:bg-red-200 dark:text-red-400 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  <AiOutlineDelete className="text-lg" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-300">
            Ma'lumot mavjud emas.
          </p>
        )}
      </form>

      {/* Modal for adding new phone */}
      <Modal
        title="Yangi telefon raqami qo'shish"
        visible={isModalVisible}
        width={400}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Bekor qilish
          </Button>,
          <Button
            key="add"
            type="primary"
            onClick={handleAddPhone}
            disabled={!newPhone}
          >
            Qo'shish
          </Button>,
        ]}
      >
        <Input
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          placeholder="Telefon raqamini kiriting"
          className="my-4"
        />
      </Modal>
    </div>
  );
}

export default Kontact;
