import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegHeart, FaRegUser, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { baseUrl } from "../../helpers/api/baseUrl";
import Modal from "./Modal";
import logo1 from "../../assets/StadionTop.png";
import { IoLocationOutline } from "react-icons/io5";
import { Dropdown, Space } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineShopping } from "react-icons/ai";

const Navbar = ({ onRegionSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = React.useState(false);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("Viloyatlar");

  // Backenddan ma'lumotlarni olish
  useEffect(() => {
    axios
      .get(`${baseUrl}stadion/all-stadion/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Qidiruv natijalarini filtrlash
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData([]);
    } else {
      const results = data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(results);
    }
  }, [searchTerm, data]);

  useEffect(() => {
    axios
      .get(`${baseUrl}utils/viloyatlar/`)
      .then((response) => {
        setRegions(response.data);
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
      });
  }, []);

  const handleRegionSelect = (district) => {
    if (!district.id) return;
    setSelectedRegion(district.name);
    onRegionSelect(district.id);
  };

  const isMobile = window.innerWidth <= 768;

  const truncate = (text, maxLength = 20) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const menuItems = regions.map((region) => ({
    key: region.id,
    label: isMobile ? truncate(region.name) : region.name,
    children: region.tumanlar.map((district) => ({
      key: district.id,
      label: district.name,
      onClick: () => handleRegionSelect(district),
    })),
  }));

  const RegionDropdown = () => (
    <div className="flex items-center gap-1 z-40 cursor-pointer">
      <IoLocationOutline className="text-gray-600" />
      <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <span className="hidden md:block">{selectedRegion}</span>
            <IoIosArrowDown className="md:mb-0 mb-1" />
          </Space>
        </a>
      </Dropdown>
    </div>
  );

  return (
    <div>
      <div className="hidden md:block">
        <nav className="flex items-center justify-between p-3 lg:px-40 lg:py-2 border-b bg-[#F6F9FC]">
          {/* Chap taraf */}
          <div className="flex items-center space-x-6">
            <RegionDropdown />
            <span className="text-sm text-gray-700 cursor-pointer">
              Stadionlar
            </span>
          </div>

          {/* O'ng taraf */}
          <div className="flex items-center space-x-4">
            <Link
              to="/auth/login"
              className="text-sm text-blue-700 cursor-pointer"
            >
              Admin bo'lish
            </Link>
            <Link
              to="/auth/login"
              className="text-sm text-blue-700 cursor-pointer"
            >
              Stadion qo'shish
            </Link>
            <span className="text-sm text-gray-700 cursor-pointer">
              Savol-javob
            </span>

            {/* Til tanlash */}
            <div className="flex items-center space-x-1 cursor-pointer">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rounded-full"
              >
                <path
                  d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                  fill="#F4F5F5"
                ></path>
                <g>
                  <rect width="20" height="20" fill="#0099B5"></rect>
                  <rect y="13" width="20" height="7" fill="#1EB53A"></rect>
                  <rect y="13" width="20" height="1" fill="#CE1126"></rect>
                  <rect y="6" width="20" height="1" fill="#CE1126"></rect>
                  <rect y="6.5" width="20" height="7" fill="white"></rect>
                </g>
              </svg>

              <span className="text-sm text-gray-700">O'zbekcha</span>
            </div>
          </div>
        </nav>
      </div>
      <nav className="flex items-center justify-between bg-white pb-3 lg:px-40 lg:pb-6">
        {/* Kompyuter versiyasi */}
        <div className="hidden lg:flex items-center justify-between w-full">
          <Link to={"/"} className="w-32 h-16">
            <img
              src={logo1 || "/placeholder.svg"}
              className="relative bottom-7"
              alt="logo"
            />
          </Link>
          <div className="w-[200px] lg:w-[350px] xl:w-[500px] flex items-center relative">
            <input
              type="search"
              id="search-dropdown"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2.5 px-4 w-full text-sm text-gray-900 rounded-lg border-s-2 border border-gray-300 outline-none"
              placeholder="Stadionlar va futbol maydonlarini qidirish..."
              required
            />
            <button
              type="submit"
              className="px-4 xl:px-7 py-[13.5px] text-sm font-medium h-full text-white rounded-e-lg border bg-[#F6F9FC] relative right-1"
            >
              <FaSearch className="text-gray-500" />
            </button>
            {/* Filtrlash natijalarini ko'rsatish */}
            {filteredData.length > 0 && (
              <ul className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg z-10 max-h-52 overflow-y-auto">
                {filteredData.map((item) => (
                  <Link to={`/about/${item.id}`} key={item.id}>
                    <li
                      className="hover:cursor-pointer hover:bg-gray-50 p-2"
                      onClick={() => setSearchTerm(item.title)}
                    >
                      {item.title}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
          <div className="flex items-center space-x-3 xl:space-x-6">
            <Link
              to={localStorage.getItem("userToken") ? "/client/profil" : "#"}
              onClick={() => {
                if (!localStorage.getItem("userToken")) {
                  setIsPhoneModalOpen(true);
                }
              }}
              className="flex items-center text-gray-700 hover:text-black"
            >
              <FaRegUser className="mr-1" />
              {localStorage.getItem("userToken") ? "Profil" : "Kirish"}
            </Link>
            {/* {!localStorage.getItem("userToken") && (
              <Link
                to="/auth/login"
                className="flex items-center text-gray-700 hover:text-black"
              >
                <FaUserShield className="text-xl mr-1" />
                Admin
              </Link>
            )} */}
            <Link
              to="/favorites"
              className="flex items-center text-gray-700 hover:text-black"
            >
              <FaRegHeart className="mr-1 text-[17px]" />
              Sevimlilar
            </Link>
            <Link
              to="/ordersPage"
              className="flex items-center text-gray-700 hover:text-black"
            >
              <AiOutlineShopping className="mr-1 text-xl" />
              Buyurtmalar
            </Link>
          </div>
        </div>

        {/* Telefon versiyasi */}
        <div className="flex items-center justify-between gap-2 w-full lg:hidden mt-3">
          <input
            type="search"
            id="search-mobile"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-3 pl-10 pr-3 ml-4 w-full bg-gray-100 text-sm text-gray-900 rounded-lg border border-gray-300 outline-none"
            placeholder="Qidirish..."
            required
          />
          <FaSearch className="absolute top-7 left-7" />
          {/* Filtrlash natijalarini ko'rsatish */}
          {filteredData.length > 0 && (
            <ul className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-lg z-50 max-h-52 overflow-y-auto">
              {filteredData.map((item) => (
                <Link to={`/about/${item.id}`} key={item.id}>
                  <li
                    className="hover:cursor-pointer hover:bg-gray-50 p-2"
                    onClick={() => setSearchTerm(item.title)}
                  >
                    {item.title}
                  </li>
                </Link>
              ))}
            </ul>
          )}
          <button className="py-[9.6px] px-2 mr-4 bg-gray-100 text-sm text-gray-900 rounded-lg border border-gray-300">
            <RegionDropdown />
          </button>
        </div>
        <div className="z-50">
          <Modal
            isOpen={isPhoneModalOpen}
            onClose={() => setIsPhoneModalOpen(false)}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
