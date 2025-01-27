// import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaReceipt, FaHeart, FaUser } from "react-icons/fa";
import ModalComponent from "./Modal";
import { useState } from "react";

const Footer = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Ekran o'lchami uchun media query (desktopda yashirish uchun)
  const isDesktop = window.innerWidth >= 1024;

  if (isDesktop) return null;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-md z-50">
      <div className="flex justify-around py-2 text-sm text-gray-700">
        <Link
          to="/"
          className={`flex flex-col items-center ${
            currentPath === "/" ? "text-blue-500" : ""
          }`}
        >
          <FaHome className="text-xl mb-1" />
          <span>Bosh sahifa</span>
        </Link>
        <Link
          to="/ordersPage"
          className={`flex flex-col items-center ${
            currentPath === "/ordersPage" ? "text-blue-500" : ""
          }`}
        >
          <FaReceipt className="text-xl mb-1" />
          <span>Buyurtmalar</span>
        </Link>
        <Link
          to="/favorites"
          className={`flex flex-col items-center ${
            currentPath === "/favorites" ? "text-blue-500" : ""
          }`}
        >
          <FaHeart className="text-xl mb-1" />
          <span>Sevimlilar</span>
        </Link>
        <Link
          onClick={() => {
            if (!localStorage.getItem("userToken")) {
              setIsModalOpen(true);
            }
          }}
          to={localStorage.getItem("userToken") ? "/client/profil" : "#"}
          className={`flex flex-col items-center ${
            currentPath === "/client/profil" ? "text-blue-500" : ""
          }`}
        >
          <FaUser className="text-xl mb-1" />
          <span>{localStorage.getItem("userToken") ? "Profil" : "Kirish"}</span>
        </Link>
      </div>
      <div>
        <ModalComponent 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Footer;
