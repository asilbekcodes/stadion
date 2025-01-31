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
import Footer from "../../components/Client/Footer";

function ClintBron() {
  const { resultId } = useParams();
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: "100%",
    border: `3px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const [stadion, setStadion] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedHours, setSelectedHours] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [bookedSlots, setBookedSlots] = useState({});
  const [isRate, setIsRate] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    getStadion();
  }, [resultId]);

  const getStadion = async () => {
    try {
      const response = await axios.get(`${baseUrl}order/stadion/${resultId}/`);
      setStadion(response.data.prices);
      setBookedSlots(response.data.brons);
    } catch (error) {
      console.error(error);
    }
  };

  const postStadion = async () => {
    const brons = selectedHours.map((hour) => ({
      bron: hour.toString(),
      date: selectedDate,
    }));

    try {
      await axios.post(
        `${baseUrl}order/stadion/${resultId}/`,
        { brons },
        userConfig
      );
      message.success("Muvaffaqiyatli bron qilindi!");
      getStadion();
      setSelectedHours([]);
      setIsRate(true);
    } catch (error) {
      message.error("Bron qilishda xatolik yuz berdi!");
    }
  };

  const handleHourClick = (hour) => {
    setSelectedHours((prevHours) =>
      prevHours.includes(hour)
        ? prevHours.filter((h) => h !== hour)
        : [...prevHours, hour]
    );
  };

  const isHourBooked = (date, hour) => {
    const bookingsForDate = bookedSlots[date] || [];
    const timeString =
      hour === 23
        ? "23:00-00:00"
        : `${hour.toString().padStart(2, "0")}:00-${(hour + 1)
            .toString()
            .padStart(2, "0")}:00`;
    return bookingsForDate.some((booking) => booking.time === timeString);
  };

  const formatTimeRange = (hour) => {
    const startHour = hour.toString().padStart(2, "0");
    const endHour = hour === 23 ? "00" : (hour + 1).toString().padStart(2, "0");
    return `${startHour}:00 - ${endHour}:00`;
  };

  const renderHours = () => {
    if (!stadion) return null;

    return (
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {Array.from({ length: 24 }, (_, hour) => {
          const isDisabled =
            selectedDate === dayjs().format("YYYY-MM-DD") &&
            hour <= dayjs().hour();
          const isBooked = isHourBooked(selectedDate, hour);
          const isSelected = selectedHours.includes(hour);
          const hourPrice =
            stadion?.find((price) => price.time === hour)?.price || 0;

          return (
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
              <span>{formatTimeRange(hour)}</span>
              <span className="ml-2">{hourPrice ? hourPrice.toLocaleString("ru-Ru") : "0"} so'm</span>
            </div>
          );
        })}
      </div>
    );
  };

  const onDateSelect = (value) => {
    setSelectedDate(value.format("YYYY-MM-DD"));
    setSelectedHours([]);
  };

  const calculateTotalPrice = () => {
    if (!stadion) return 0;
    return selectedHours.reduce((total, hour) => {
      const hourPrice =
        stadion?.find((price) => price.time === hour)?.price || 0;
      return total + hourPrice;
    }, 0);
  };

  const disabledDate = (current) => current && current < dayjs().startOf("day");

  const handleOpenModal = () => {
    const userToken = localStorage.getItem("userToken");
    userToken ? setOpenModal(true) : setIsPhone(true);
  };

  const postRank = async () => {
    try {
      await axios.post(
        `${baseUrl}common/rank-stadion/`,
        { rank: rating, stadion: resultId },
        userConfig
      );
      message.success("Reytingingiz muvaffaqiyatli saqlandi!");
      setIsRate(false);
      getStadion();
    } catch (error) {
      message.error("Reytingni saqlashda xatolik yuz berdi!");
    }
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
          Tanlangan sana: {selectedDate}
        </p>
        {renderHours()}
        {selectedHours.length > 0 && (
          <div className="mt-6 text-center md:bg-slate-50 rounded-3xl pb-3">
            <button
              className="bg-green-600 text-white max-w-max py-4 md:px-10 px-5 rounded-lg shadow-md hover:bg-green-500"
              onClick={handleOpenModal}
            >
              Tanlangan vaq: {selectedHours.length} soat,{" "}
              {calculateTotalPrice() ? calculateTotalPrice().toLocaleString("ru-RU") : "0"} so'm
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
        <Footer />
      </div>
    </div>
  );
}

export default ClintBron;
