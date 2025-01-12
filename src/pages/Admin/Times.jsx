import React, { useEffect, useState } from "react";
import Layout from "../../components/Admin/Layout";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { Adminconfig } from "../../helpers/token/admintoken";
import dayjs from "dayjs";
import { message, Modal, Input, } from "antd";
import { BsPencil } from "react-icons/bs";

const Times_Pages = () => {
  const [getSaved, setgetSaved] = useState([]);
  const [selectedStadion, setSelectedStadion] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedHours, setSelectedHours] = useState([]);
  const [bookedSlots, setBookedSlots] = useState({});
  const [price, setPrice] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal holati
  const [modalData, setModalData] = useState({}); // Modal uchun ma'lumotlar

  // Stadionlarni olish
  const Malumot = () => {
    axios
      .get(`${baseUrl}stadion/admin-stadion-get/`, Adminconfig)
      .then((res) => {
        setgetSaved(res.data);
        if (res.data.length > 0) {
          setSelectedStadion(res.data[0].id);
        }
      })
      .catch((err) => console.log(err));
  };

  // Stadion va bron qilingan vaqtlarni olish
  const getData = () => {
    if (selectedStadion) {
      axios
        .get(`${baseUrl}order/stadion/${selectedStadion}/`, Adminconfig)
        .then((res) => {
          setBookedSlots(res.data.brons);
          setPrice(res.data.prices);
        })
        .catch((err) => console.log(err));
    }
  };

  // POST so'rovi orqali vaqtlarni bron qilish
  const postBooking = () => {
    const brons = selectedHours.map((hour) => ({
      bron: hour.toString(),
      date: selectedDate,
    }));

    axios
      .post(
        `${baseUrl}order/stadion/${selectedStadion}/`,
        { brons: brons },
        Adminconfig
      )
      .then(() => {
        message.success("Vaqtlar muvaffaqiyatli bron qilindi!");
        getData();
        setSelectedHours([]);
      })
      .catch(() => message.error("Bron qilishda xatolik yuz berdi!"));
  };

  // Sana tanlanganda ishlovchi funksiya
  const onDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedHours([]);
  };

  // O'tgan vaqtlarni tekshirish
  const isHourPast = (date, hour) => {
    const now = dayjs();
    const selectedDateTime = dayjs(`${date} ${hour}:00`, "YYYY-MM-DD HH:mm");
    return selectedDateTime.isBefore(now);
  };

  // Bron qilingan soatlarni tekshirish
  const isHourBooked = (date, hour) => {
    const formattedHour = bookedSlots[date] || [];
    const timeString = `${hour.toString().padStart(2, "0")}:00-${(hour + 1)
      .toString()
      .padStart(2, "0")}:00`;
    return formattedHour.some((slot) => slot.time === timeString);
  };

  // Modalni ochish funksiyasi
  const openModal = (hour, priceForHour) => {
    setModalData({ hour, price: priceForHour });
    setIsModalVisible(true);
  };

  // Modalni yopish funksiyasi
  const closeModal = () => {
    setIsModalVisible(false);
    setModalData({});
  };

  // Modalda saqlash funksiyasi
  const saveChanges = () => {
    console.log("Saqlangan ma'lumotlar:", modalData);
    message.success("Ma'lumotlar saqlandi!");
    closeModal();
  };

  // Soatlar ro'yxatini render qilish
  const renderHours = () => {
    const hours = [];
    for (let hour = 0; hour < 24; hour++) {
      const isBooked = isHourBooked(selectedDate, hour);
      const isPast = isHourPast(selectedDate, hour);
      const isSelected = selectedHours.includes(hour);

      const priceForHour = price?.find((p) => p.time === hour)?.price || 0;

      hours.push(
        <div
          key={hour}
          className={`relative flex items-center justify-center border rounded-lg py-4 shadow-sm text-center ${
            isPast
              ? "bg-gray-300 text-gray-800 cursor-not-allowed dark:bg-red-900 dark:text-gray-100"
              : isSelected
              ? "bg-green-600 text-white cursor-pointer"
              : isBooked
              ? "bg-gray-300 text-black cursor-not-allowed dark:bg-red-900 dark:text-gray-100"
              : "bg-white text-black dark:bg-gray-900 dark:text-gray-100 cursor-pointer"
          }`}
          onClick={() => !isBooked && !isPast && handleHourClick(hour)}
        >
          <span>
            {hour}:00 - {hour + 1}:00
          </span>
          <span className="ml-2">{priceForHour} so'm</span>

          <BsPencil
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => openModal(hour, priceForHour)}
          />
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {hours}
      </div>
    );
  };

  useEffect(() => {
    Malumot();
  }, []);

  useEffect(() => {
    getData();
  }, [selectedStadion]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
        <div className="md:flex justify-between items-center ">
          <h1 className="text-xl md:text-2xl mb-3 text-gray-800 dark:text-gray-100">
            Stadion vaqtlarni boshqarish
          </h1>
          <select
            className="p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
            value={selectedStadion}
            onChange={(e) => setSelectedStadion(e.target.value)}
          >
            <option disabled value="">
              Stadion tanlang
            </option>
            {Array.isArray(getSaved) &&
              getSaved.map((stadion) => (
                <option key={stadion.id} value={stadion.id}>
                  {stadion.title}
                </option>
              ))}
          </select>
        </div>
        <div className="my-5">
          <input
            type="date"
            className="border p-2 rounded dark:bg-gray-800 dark:text-gray-100"
            value={selectedDate}
            onChange={onDateChange}
          />
        </div>
        {renderHours()}

        {/* Modal */}
        <Modal
          title="Narxni tahrirlash"
          visible={isModalVisible}
          darkMode
          onCancel={closeModal}
          width={400}
          footer={[
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 mr-2 py-1 rounded"
              onClick={closeModal}
            >
              Bekor qilish
            </button>,
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
              onClick={saveChanges}
            >
              Saqlash
            </button>,
          ]}
        >
          <p className="my-3">
            Soat: {modalData.hour}:00 - {modalData.hour + 1}:00
          </p>
          <Input
            type="number"
            className="mb-3"
            placeholder="Narxni kiriting"
            value={modalData.price}
            onChange={(e) =>
              setModalData({ ...modalData, price: e.target.value })
            }
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default Times_Pages;
