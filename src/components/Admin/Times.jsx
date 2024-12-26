import React, { useEffect, useState } from "react";
import { Calendar, message, Modal, theme } from "antd";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import Layout from "./Layout";
import { Adminconfig } from "../../helpers/token/admintoken";
import Times_Pages from "../../pages/Admin/Times";

function Times() {
    const { resultId } = useParams();
    const { token } = theme.useToken();
    const wrapperStyle = {
        width: "100%",
        border: `3px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    // State management
    const [stadion, setStadion] = useState(null);
    const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [selectedHours, setSelectedHours] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [bookedSlots, setBookedSlots] = useState({});
    const [select, setSelect] = useState(null); // Tanlangan ID uchun

    // Stadion ma'lumotlarini olish
    const getStadion = () => {
        if (!select) return; // Agar `select` mavjud bo'lmasa, API chaqirilmaydi
        axios
            .get(`${baseUrl}order/stadion/${select}/`)
            .then((res) => {
                setStadion(res.data.stadion);
                setBookedSlots(res.data.brons);
            })
            .catch((err) => {
                console.error("Stadion ma'lumotlarini olishda xatolik:", err);
                message.error("Stadion ma'lumotlarini olishda xatolik yuz berdi!");
            });
    };

    // Bron qilish funksiyasi
    const postStadion = () => {
        const brons = selectedHours.map((hour) => ({
            bron: hour.toString(),
            date: selectedDate,
        }));

        axios
            .post(`${baseUrl}order/stadion/${select}/`, { brons }, Adminconfig)
            .then(() => {
                message.success("Muvaffaqiyatli bron qilindi!");
                getStadion();
                setSelectedHours([]);
            })
            .catch(() => {
                message.error("Bron qilishda xatolik yuz berdi!");
            });
    };

    useEffect(() => {
        getStadion();
    }, [select]); // `select` o'zgarganda API chaqiriladi

    // Soatni tanlash funksiyasi
    const handleHourClick = (hour) => {
        if (selectedHours.includes(hour)) {
            setSelectedHours(selectedHours.filter((h) => h !== hour));
        } else {
            setSelectedHours([...selectedHours, hour]);
        }
    };

    // Bron qilingan soatlarni tekshirish
    const isHourBooked = (date, hour) => {
        const formattedHour = `${hour}:00-${hour + 1}:00`;
        return bookedSlots[date]?.some((slot) => slot.time === formattedHour);
    };

    // Soatlarni ko'rsatish
    const renderHours = () => {
        if (!stadion) return <p>Ma'lumotlar yuklanmoqda...</p>;

        const { start_time, end_time, price } = stadion;
        const startHour = parseInt(start_time.split(":")[0]);
        const endHour = parseInt(end_time.split(":")[0]);

        const currentHour = dayjs().hour();
        const isToday = selectedDate === dayjs().format("YYYY-MM-DD");

        const hours = [];
        for (let hour = startHour; hour < endHour; hour++) {
            const isDisabled = isToday && hour <= currentHour;
            const isBooked = isHourBooked(selectedDate, hour);
            const isSelected = selectedHours.includes(hour);

            hours.push(
                <div
                    key={hour}
                    className={`flex items-center justify-center border rounded-lg py-4 cursor-pointer shadow-sm text-center ${isSelected
                            ? "bg-green-600 text-white"
                            : isDisabled || isBooked
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-white text-black"
                        }`}
                    onClick={() => !isDisabled && !isBooked && handleHourClick(hour)}
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

    // Sana tanlash funksiyasi
    const onDateSelect = (value) => {
        setSelectedDate(value.format("YYYY-MM-DD"));
        setSelectedHours([]);
    };

    // Umumiy narxni hisoblash
    const calculateTotalPrice = () => {
        return selectedHours.length * (stadion?.price || 0);
    };

    // O'tgan sanalarni o'chirish
    const disabledDate = (current) => {
        return current && current < dayjs().startOf("day");
    };

    return (
        <Layout>
            <div className="p-4 bg-slate-900">
                {/* Calendar */}
                {select && (
                    <>
                        <div style={wrapperStyle} className="mb-5">
                            <Calendar
                                fullscreen={false}
                                onSelect={onDateSelect}
                                disabledDate={disabledDate}
                            />
                        </div>

                        <p className="text-center text-lg font-semibold">
                            Tanlangan sana: {selectedDate || dayjs().format("YYYY-MM-DD")}
                        </p>

                        {/* Vaqtlar */}
                        {renderHours()}

                        {/* Bron qilish tugmasi */}
                        {selectedHours.length > 0 && (
                            <div className="text-center mt-4">
                                <button
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-500"
                                    onClick={() => setOpenModal(true)}
                                >
                                    Tanlangan vaqtlar: {selectedHours.length} soat, {calculateTotalPrice()} so'm
                                </button>
                            </div>
                        )}

                        {/* Bron qilish modali */}
                        <Modal
                            okText="Saqlash"
                            open={openModal}
                            onOk={() => {
                                postStadion();
                                setOpenModal(false);
                            }}
                            onCancel={() => setOpenModal(false)}
                            centered
                        >
                            <h3 className="text-center">Haqiqatdan ham bron qilmoqchimisiz?</h3>
                        </Modal>
                    </>
                )}
                <div className="hidden">
                    <Times_Pages selectedId={setSelect} />
                </div>
            </div>
        </Layout>
    );
}

export default Times;
