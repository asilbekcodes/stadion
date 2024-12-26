import { useEffect, useState } from "react";
import Tables from "../Tables";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { Adminconfig } from "../../helpers/token/admintoken";
import { FaEye } from "react-icons/fa";

function OrderCom({ onOrderCount }) {
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

  const columns = [
    "ID",
    "Stadion nomi",
    "Telefon",
    "Olingan_vaqt",
    "Kuni",
    "Status",
    "Status o'zgartirish",
  ];

  // GET ma'lumotlarini moslashtirish
  const data = getOrder.map((order, index) => ({
    ID: index + 1,
    "Stadion nomi": order.stadion,
    Telefon: order.user?.phone_number,
    Olingan_vaqt: order.time,
    Kuni: order.date,
    Status:
      order.status === "T" ? (
        <span className="border border-green-600 rounded-lg py-1.5 px-3 text-green-600">
          Tasdiqlangan
        </span>
      ) : order.status === "B" ? (
        <span className="border border-red-600 rounded-lg py-1.5 px-2 text-red-600">
          Bekor qilingan
        </span>
      ) : order.status === "K" ? (
        <span className="border border-yellow-500 rounded-lg py-1.5 px-3 text-yellow-500">
          Kutilmoqda...
        </span>
      ) : (
        <span className="text-gray-600">Noma'lum</span>
      ),
    "Status o'zgartirish": (
      <div>
        <button
          className="cursor-pointer text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" // Agar tasdiqlangan bo'lsa, disabled
          onClick={() => OpenModal(order)}
        >
          O'zgartirish
        </button>
        <button className="cursor-pointer text-white ml-2 bg-blue-800 p-2 rounded-lg" >
          <FaEye />
        </button>
      </div>
    ),
  }));

  console.log(getOrder);

  return (
    <div className="p-8 ">
      <h2 className="text-2xl mb-4 text-white">Orders</h2>
      <Tables columns={columns} rows={data} />
      <div className="flex justify-center items-center p-2">
        {openModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="p-6 max-w-[400px] bg-slate-600 rounded-lg relative">
              <button
                onClick={CloseModal}
                className="absolute top-2 right-5 text-white text-3xl cursor-pointer"
              >
                &times;
              </button>
              <p className="text-center my-4">
                Siz foydalanuvchini bron vaqtini{" "}
                <span className="text-green-500">Tasdiqlash</span> yoki{" "}
                <span className="text-red-500">Bekor qilish</span>ni
                xohlaysizmi?
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default OrderCom;
