import { useEffect, useState } from "react";
import Tables from "../Tables";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { Adminconfig } from "../../helpers/token/admintoken";

function OrderCom( {onOrderCount}) {
    const [getOrder, setGetOrder] = useState([]); // GET ma'lumotlari
    const [openModal, setopenModal] = useState(false); // Modalni boshqarish
    const [selectedOrder, setSelectedOrder] = useState(null);
    // const []
    // Modalni ochish
    function OpenModal(order) {
        setSelectedOrder(order); // Tanlangan orderni saqlash
        setopenModal(true); // Modalni ochish
    }
    

    // Modalni yopish
    function CloseModal() {
        setopenModal(false); // Modalni yopish
        setSelectedOrder(null); // Tanlangan orderni tozalash
        console.log("Modal yopildi");
    }

    // Tasdiqlash va bekor qilish tugmalari uchun POST so'rov
    function postStatus(isActive) {
        if (!selectedOrder) return; // Agar tanlangan order yo'q bo'lsa, hech narsa qilmaydi

        const data = {
            bron_id: selectedOrder.id,
            is_active: isActive ? "T" : "F", // Tasdiqlash yoki bekor qilish holati
        };

        axios
            .post(`${baseUrl}order/verify-stadion-bron/`, data, Adminconfig)
            .then((res) => {
                console.log("Response:", res.data);
                fetchOrders(); // Ma'lumotlarni qayta yuklash
                CloseModal(); // Modalni yopish
            })
            .catch((err) => console.log("Error:", err));
    }

    // Tasdiqlash
    function handleTasdiqlash() {
        console.log("Tasdiqlash bosildi");
        postStatus(true); // Tasdiqlash uchun "true" yuborish
    }

    // Bekor qilish
    function handleBekorQilish() {
        console.log("Bekor qilish bosildi");
        postStatus(false); // Bekor qilish uchun "false" yuborish
    }

    // Ma'lumotlarni serverdan olish uchun GET so'rov
    function fetchOrders() {
        axios
            .get(`${baseUrl}order/my-stadion-bron/`, Adminconfig)
            .then((res) => {
                console.log("Orders fetched:", res.data);
                setGetOrder(res.data);
                onOrderCount(res.data.length);
            })
            .catch((err) => console.log("Error fetching orders:", err));
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const columns = ["ID", "Stadion nomi","Telefon", "Olingan_vaqt", "Kuni", "Status", "Status o'zgartirish"];

    // GET ma'lumotlarini moslashtirish
    const data = getOrder.map((order, index) => ({
        ID: index + 1,
        "Stadion nomi": order.stadion,
        Telefon: order.user?.phone_number,
        Olingan_vaqt: order.time,
        Kuni: order.date,
        Status: order.is_active  === true ? "Tasdiqlangan" : "Tasdiqlanmagan", // Tasdiqlash holatini ko'rsatish
        "Status o'zgartirish": (
            <button
                className="cursor-pointer text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"// Agar tasdiqlangan bo'lsa, disabled
                onClick={() => OpenModal(order)}
            >
                O'zgartirish
            </button>
        ),
    }));

    return (
        <div className="p-8 ">
            <h2 className="text-2xl mb-4 text-slate-500">Orders</h2>
            <Tables columns={columns} rows={data} />
            <div className="flex justify-center items-center p-2">
                {openModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="p-6 max-w-[400px] bg-slate-600 rounded-lg">
                            <p className="text-center mb-4">
                                Siz foydalanuvchini bron vaqtini{" "}
                                <span className="text-green-500">Tasdiqlash</span> yoki{" "}
                                <span className="text-red-500">Bekor qilish</span>ni xohlaysizmi?
                            </p>
                            <div className="flex gap-4 flex-col justify-center">
                                <button
                                    onClick={handleTasdiqlash}
                                    className="bg-green-600 text-white p-2 rounded-md"
                                >
                                    Tasdiqlash
                                </button>
                                <button
                                    onClick={handleBekorQilish}
                                    className="bg-red-600 text-white p-2 rounded-md"
                                >
                                    Bekor qilish
                                </button>
                            </div>
                            <button
                                onClick={CloseModal}
                                className="mt-4 block mx-auto bg-gray-400 text-white p-2 rounded-md"
                            >
                                Yopish
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default OrderCom