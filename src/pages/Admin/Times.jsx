import React, { useEffect, useState } from "react";
import Layout from "../../components/Admin/Layout";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { Adminconfig } from "../../helpers/token/admintoken";
import dayjs from "dayjs";
import { message, Modal, Input } from "antd";
import { BsPencil } from "react-icons/bs";

const Times_Pages = () => {
  const [getSaved, setGetSaved] = useState([]);
  const [selectedStadion, setSelectedStadion] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedHours, setSelectedHours] = useState([]);
  const [bookedSlots, setBookedSlots] = useState({});
  const [price, setPrice] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  // Fetch stadion data
  const fetchStadions = () => {
    axios
      .get(`${baseUrl}stadion/admin-stadion-get/`, Adminconfig())
      .then((res) => {
        setGetSaved(res.data || []);
        if (res.data?.length > 0) {
          setSelectedStadion(res.data[0].id);
        }
      })
      .catch((err) => console.error(err));
  };

  // Fetch booking and pricing data for the selected stadion
  const fetchStadionData = () => {
    if (selectedStadion) {
      axios
        .get(`${baseUrl}order/stadion/${selectedStadion}/`, Adminconfig())
        .then((res) => {
          setBookedSlots(res.data?.brons || {});
          setPrice(res.data?.prices || []);
        })
        .catch((err) => console.error(err));
    }
  };

  // Book selected hours
  const postBooking = () => {
    const brons = selectedHours.map((hour) => ({
      bron: hour.toString(),
      date: selectedDate,
    }));

    axios
      .post(
        `${baseUrl}order/stadion/${selectedStadion}/`,
        { brons },
        Adminconfig()
      )
      .then(() => {
        message.success("Vaqtlar muvaffaqiyatli bron qilindi!");
        fetchStadionData();
        setSelectedHours([]);
      })
      .catch(() => message.error("Bron qilishda xatolik yuz berdi!"));
  };

  // Handle date change
  const onDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedHours([]);
  };

  // Check if the hour is already booked
  const isHourBooked = (date, hour) => {
    const bookingsForDate = bookedSlots[date] || [];
    const timeString =
      hour === 23
        ? "23:00-00:00"
        : `${hour.toString().padStart(2, "0")}:00-${(hour + 1)
            .toString()
            .padStart(2, "0")}:00`;
    return bookingsForDate.some((slot) => slot.time === timeString);
  };

  // Handle hour selection
  const handleHourClick = (hour) => {
    setSelectedHours((prev) =>
      prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour]
    );
  };

  // Render hour slots
  const renderHours = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {Array.from({ length: 24 }, (_, hour) => {
          const isBooked = isHourBooked(selectedDate, hour);
          const isSelected = selectedHours.includes(hour);
          const priceForHour = price?.find((p) => p.time === hour)?.price || 0;

          return (
            <div
              key={hour}
              className={`relative flex items-center justify-center border rounded-lg py-4 shadow-sm text-center ${
                isSelected
                  ? "bg-green-600 text-white cursor-pointer"
                  : isBooked
                  ? "bg-gray-300 text-black cursor-not-allowed dark:bg-red-900 dark:text-gray-100"
                  : "bg-white text-black dark:bg-gray-900 dark:text-gray-100 cursor-pointer"
              }`}
              onClick={() => !isBooked && handleHourClick(hour)}
            >
              <span>
                {hour}:00 - {hour === 23 ? "00" : hour + 1}:00
              </span>
              <span className="ml-2">
                {priceForHour ? priceForHour.toLocaleString("ru-Ru") : "0"} so'm
              </span>
              <BsPencil
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => openModal(hour, priceForHour)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  // Open modal to edit price
  const openModal = (hour, priceForHour) => {
    setModalData({ hour, price: priceForHour });
    setIsModalVisible(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalVisible(false);
    setModalData({});
  };

  // Update price for a specific hour
  const editPrice = () => {
    const data = {
      time: modalData.hour,
      price: modalData.price,
    };
    axios
      .post(
        `${baseUrl}stadion/edit-price/${selectedStadion}/`,
        data,
        Adminconfig()
      )
      .then(() => {
        message.success("Narx muvaffaqiyatli o'zgartirildi!");
        fetchStadionData();
        closeModal();
      })
      .catch(() => message.error("Narx o'zgartirishda xatolik yuz berdi!"));
  };

  useEffect(() => {
    fetchStadions();
  }, []);

  useEffect(() => {
    fetchStadionData();
  }, [selectedStadion]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
        <div className="md:flex justify-between items-center">
          <h1 className="text-xl md:text-2xl mb-3">
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
            {getSaved.map((stadion) => (
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
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
              onClick={postBooking}
            >
              Tanlangan vaqtlar: {selectedHours.length} soat {}
            </button>
          </div>
        )}

        {/* Modal */}
        <Modal
          title="Narxni tahrirlash"
          visible={isModalVisible}
          onCancel={closeModal}
          width={400}
          footer={[
            <button
              className="bg-gray-300 px-3 py-1 mr-2 rounded"
              onClick={closeModal}
            >
              Bekor qilish
            </button>,
            <button
              className="bg-green-500 px-4 py-1 rounded text-white"
              onClick={editPrice}
            >
              Saqlash
            </button>,
          ]}
        >
          <p className="my-3 font-semibold">
            Soat: {modalData.hour}:00 -{" "}
            {modalData.hour === 23 ? "00" : modalData.hour + 1}:00
          </p>
          <Input
            type="number"
            className="w-full p-2 border rounded mb-4"
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
