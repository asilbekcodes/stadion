import React, { useEffect, useState } from "react";
import Navbar from "../../components/Client/Navbar";
import { Calendar, message, Modal, Rate, theme } from "antd";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import ModalComponent from "../../components/Client/Modal";
import { userConfig } from "../../helpers/token/userToken";
import Footers from "./Footer";

function ClintBron() {
  const { resultId } = useParams();
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: "100%",
    border: `3px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const [stadion, setStadion] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [selectedHours, setSelectedHours] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [bookedSlots, setBookedSlots] = useState({});
  const [isRate, setIsRate] = useState(false);
  const [rating, setRating] = useState(0);

  // Stadion ma'lumotlarini olish
  const getStadion = () => {
    axios
      .get(`${baseUrl}order/stadion/${resultId}/`)
      .then((res) => {
        setStadion(res.data.stadion);
        setBookedSlots(res.data.brons);
      })
      .catch((err) => console.error(err));
  };

  // POST so'rovini yuborish
  const postStadion = () => {
    const brons = selectedHours.map((hour) => ({
      bron: hour.toString(),
      date: selectedDate,
    }));

    axios
      .post(
        `${baseUrl}order/stadion/${resultId}/`,
        { brons: brons },
        userConfig
      )
      .then(() => {
        message.success("Muvaffaqiyatli bron qilindi!");
        getStadion();
        setSelectedHours([]);
        setIsRate(true);
      })
      .catch(() => message.error(`Bron qilishda xatolik yuz berdi!`));
  };

  useEffect(() => {
    getStadion();
  }, [resultId]);

  // Soatni bosilganda ishlovchi funksiya
  const handleHourClick = (hour) => {
    if (selectedHours.includes(hour)) {
      setSelectedHours(selectedHours.filter((h) => h !== hour));
    } else {
      setSelectedHours([...selectedHours, hour]);
    }
  };

// Bron qilingan soatlarni tekshirish
const isHourBooked = (date, hour) => {
  const bookingsForDate = bookedSlots[date] || [];
  // Soatni "HH:00-HH:00" formatiga o'tkazish
  const timeString = `${hour.toString().padStart(2, '0')}:00-${(hour + 1).toString().padStart(2, '0')}:00`;
  
  return bookingsForDate.some(booking => booking.time === timeString);
};
  // Soatlar ro'yxatini ko'rsatish
  const renderHours = () => {
    if (!stadion) return null;

    const { price } = stadion;

    const hours = [];
    for (let hour = 0; hour < 24; hour++) {
      const nextHour = hour + 1;
      const isDisabled =
        selectedDate === dayjs().format("YYYY-MM-DD") && hour <= dayjs().hour();
      const isBooked = isHourBooked(selectedDate, hour);
      const isSelected = selectedHours.includes(hour);

      hours.push(
        <div
          key={hour}
          className={`flex items-center justify-center border border-gray-500 rounded-lg py-4 cursor-pointer shadow-sm text-center ${
            isSelected
              ? "bg-green-600 text-white"
              : isDisabled || isBooked
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white"
          }`}
          onClick={() => !isDisabled && !isBooked && handleHourClick(hour)}
        >
          <span>
            {hour}:00 - {nextHour}:00
          </span>
          <span className="ml-2">{price} so'm</span>
        </div>
      );
    }
    return (
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {hours}
      </div>
    );
  };

  // Sana tanlanganda ishlaydigan funksiya
  const onDateSelect = (value) => {
    const formattedDate = value.format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    setSelectedHours([]);
  };

  // Tanlangan soatlar soni va umumiy narxni hisoblash
  const calculateTotalPrice = () => {
    if (!stadion) return 0;
    return selectedHours.length * stadion.price;
  };

  // O'tib ketgan kunlarni 'disabled' qilish
  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  // Modal ochish yoki boshqa modalga yo'naltirish
  const handleOpenModal = () => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setOpenModal(true);
    } else {
      setIsPhone(true);
    }
  };

  // Reytingni yuborish uchun funksiya
  const postRank = () => {
    axios
      .post(
        `${baseUrl}common/rank-stadion/`,
        {
          rank: rating,
          stadion: resultId,
        },
        userConfig
      )
      .then(() => {
        message.success("Reytingingiz muvaffaqiyatli saqlandi!");
        setIsRate(false);
        getStadion();
      })
      .catch(() => message.error("Reytingni saqlashda xatolik yuz berdi!"));
  };

  return (
    <div>
      <Navbar />
      <div className="lg:px-40 bg-slate-50 p-4">
        <div style={wrapperStyle}>
          <Calendar
            fullscreen={false}
            onSelect={onDateSelect}
            disabledDate={disabledDate}
          />
        </div>
        <p className="mt-4 text-center text-lg font-semibold">
          Tanlangan sana: {selectedDate || dayjs().format("YYYY-MM-DD")}
        </p>
        {renderHours()}
        {selectedHours.length > 0 && (
          <div className="mt-4 text-center">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-500"
              onClick={handleOpenModal}
            >
              Tanlangan vaqtlar: {selectedHours.length} soat,{" "}
              {calculateTotalPrice()} so'm
            </button>
          </div>
        )}
      </div>
      <Modal
        okText="Saqlash"
        open={openModal}
        onOk={() => {
          postStadion();
          setOpenModal(false);
        }}
        onCancel={() => {
          setOpenModal(false);
          setSelectedHours([]);
        }}
        okButtonProps={{
          style: {
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            width: "100%",
            height: "40px",
            borderRadius: "5px",
            position: "relative",
            left: "-10px",
          },
        }}
        cancelButtonProps={{ style: { display: "none" } }}
        centered
        bodyStyle={{
          textAlign: "center",
          borderRadius: "10px",
          paddingBottom: "20px",
        }}
        width={400}
      >
        <h3 style={{ fontSize: "18px", marginTop: "20px" }}>
          Haqiqatdan ham bron qilmoqchimisiz?
        </h3>
      </Modal>
      <Modal
        okText="Jo'natish"
        open={isRate}
        onOk={postRank}
        onCancel={() => setIsRate(false)}
        centered
        width={400}
        okButtonProps={{
          style: {
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            width: "100%",
            height: "40px",
            borderRadius: "5px",
            position: "relative",
            left: "-10px",
          },
        }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <h3
          style={{
            fontSize: "15px",
            marginBottom: "10px",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Fikrlaringiz biz uchun muhim! Iltimos, reytingingizni bildiring.
        </h3>
        <div className="text-center my-5">
          <Rate className="text-4xl" onChange={(value) => setRating(value)} />
        </div>
      </Modal>
      <ModalComponent isOpen={isPhone} onClose={() => setIsPhone(false)} />
      <div className="pt-10 bg-gray-50">
        <Footers />
      </div>
    </div>
  );
}

export default ClintBron;
