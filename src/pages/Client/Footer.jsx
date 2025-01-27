import React from "react";
import logo1 from "../../assets/logo 1.svg";

const Footers = () => {
  return (
    <footer className="bg-gray-100 text-black py-6 px-6 md:px-20 lg:px-40">
      <div className="container">
        {/* Tepki qism */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logotip va qisqacha matn */}
          <div className="text-center md:text-left">
            <a href="/#" className="flex items-center justify-center md:justify-start">
              <img src={logo1} alt="Stadion logo" />
            </a>
            <p className="text-sm">Stadionlarni osongina bron qiling!</p>
          </div>

          {/* Navigatsiya bo‘limi */}
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 text-center">
            <a href="#" className="hover:text-gray-600 transition">
              Asosiy
            </a>
            <a href="#" className="hover:text-gray-600 transition">
              Biz haqimizda
            </a>
            <a href="#" className="hover:text-gray-600 transition">
              Stadionlar
            </a>
            <a href="#" className="hover:text-gray-600 transition">
              Aloqa
            </a>
          </div>

          {/* Ijtimoiy tarmoqlar */}
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.99 3.657 9.128 8.437 9.876v-6.988H7.896v-2.888h2.541V9.797c0-2.513 1.492-3.888 3.777-3.888 1.095 0 2.238.195 2.238.195v2.461h-1.26c-1.242 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.888h-2.33V21.876C18.343 21.128 22 16.99 22 12z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5Zm9.656 2.094c.51 0 .922.412.922.922 0 .51-.411.922-.922.922a.919.919 0 0 1-.922-.922c0-.51.411-.922.922-.922ZM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5Zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Z" />
              </svg>
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.474 3.29a2.09 2.09 0 0 0-2.199-.293L2.66 10.38a1.98 1.98 0 0 0 .129 3.667l3.734 1.284 1.488 4.69c.31.97 1.618 1.136 2.17.258l2.06-3.225 3.9 3.207c.732.61 1.87.247 2.088-.66l3.11-13.345a2.083 2.083 0 0 0-.866-2.29ZM8.624 12.794l6.662-3.812c.235-.135.472.147.27.343l-5.634 5.39-.227 2.465-1.071-4.386Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Mualliflik huquqi */}
        <div className="mt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} StadionBook. Barcha huquqlar
          himoyalangan.
        </div>
      </div>
    </footer>
  );
};

export default Footers;
