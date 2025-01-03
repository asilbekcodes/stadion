import React, { useEffect, useState } from "react";
import Layout from "../../components/Admin/Layout";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { Adminconfig } from "../../helpers/token/admintoken";
import dayjs from "dayjs";
import { message } from "antd";

const Times_Pages = () => {
  const [getSaved, setgetSaved] = useState([]);
  const [selectedStadion, setSelectedStadion] = useState("");
  const [stadionDetails, setStadionDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [selectedHours, setSelectedHours] = useState([]);
  const [bookedSlots, setBookedSlots] = useState({});

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
          setStadionDetails(res.data.stadion);
          setBookedSlots(res.data.brons);
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
    const formattedHour = `${hour}:00-${hour + 1}:00`;
    return bookedSlots[date]?.some((slot) => slot.time === formattedHour);
  };

  // Soatni tanlash yoki olib tashlash funksiyasi
  const handleHourClick = (hour) => {
    if (isHourPast(selectedDate, hour)) return;

    if (selectedHours.includes(hour)) {
      setSelectedHours(selectedHours.filter((h) => h !== hour));
    } else {
      setSelectedHours([...selectedHours, hour]);
    }
  };

  // Soatlar ro'yxatini render qilish
  const renderHours = () => {
    if (!stadionDetails) return null;

    const { start_time, end_time, price } = stadionDetails;
    const startHour = parseInt(start_time.split(":")[0]);
    const endHour = parseInt(end_time.split(":")[0]);

    const hours = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const isBooked = isHourBooked(selectedDate, hour);
      const isPast = isHourPast(selectedDate, hour);
      const isSelected = selectedHours.includes(hour);

      hours.push(
        <div
          key={hour}
          className={`flex items-center justify-center border rounded-lg py-4 cursor-pointer shadow-sm text-center ${
            isPast
              ? "bg-gray-300 text-gray-800 cursor-not-allowed dark:bg-gray-800 dark:text-gray-100"
              : isSelected
              ? "bg-green-600 text-white"
              : isBooked
              ? "bg-gray-300 text-black cursor-not-allowed dark:bg-gray-800 dark:text-gray-100"
              : "bg-white text-black dark:bg-gray-900 dark:text-gray-100"
          }`}
          onClick={() => !isBooked && !isPast && handleHourClick(hour)}
        >
          <span>
            {hour}:00 - {hour + 1}:00
          </span>
          <span className="ml-2">{price} so'm</span>
        </div>
      );
    }

    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">{hours}</div>;
  };

  useEffect(() => {
    Malumot();
  }, []);

  useEffect(() => {
    getData();
  }, [selectedStadion]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-gray-800 dark:text-gray-100">
            Stadion va vaqtlarni boshqarish
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
        {selectedHours.length > 0 && (
          <div className="mt-4 text-center">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-500"
              onClick={postBooking}
            >
              Tanlangan vaqtlar: {selectedHours.length} soat
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Times_Pages;
