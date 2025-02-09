import React, { useEffect, useState } from "react"
import axios from "axios"
import { FaHeart, FaSearch, FaShoppingBag, FaUser, FaUserShield } from "react-icons/fa"
import { Link } from "react-router-dom"
import { baseUrl } from "../../helpers/api/baseUrl"
import Modal from "./Modal"
import logo1 from "../../assets/StadionTop.png"
import { IoLocationOutline } from "react-icons/io5"
import { Dropdown, Space } from "antd"
import { DownOutlined } from "@ant-design/icons"

const Navbar = ({ onRegionSelect }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isPhoneModalOpen, setIsPhoneModalOpen] = React.useState(false)
  const [regions, setRegions] = useState([])
  const [selectedRegion, setSelectedRegion] = useState("Viloyatlar")

  // Backenddan ma'lumotlarni olish
  useEffect(() => {
    axios
      .get(`${baseUrl}stadion/all-stadion/`)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => console.error("Error fetching data:", error))
  }, [])

  // Qidiruv natijalarini filtrlash
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData([])
    } else {
      const results = data.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredData(results)
    }
  }, [searchTerm, data])

  useEffect(() => {
    axios
      .get(`${baseUrl}utils/viloyatlar/`)
      .then((response) => {
        setRegions(response.data)
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error)
      })
  }, [])

  const handleRegionSelect = (district) => {
    if (!district.id) return; 
    setSelectedRegion(district.name)
    onRegionSelect(district.id )
  }

  const menuItems = regions.map((region) => ({
    key: region.id,
    label: region.name,
    children: region.tumanlar.map((district) => ({
      key: district.id,
      label: district.name,
      onClick: () => handleRegionSelect(district),
    })),
  }))

  const RegionDropdown = () => (
    <div className="flex items-center gap-1 z-50">
      <IoLocationOutline className="text-gray-600" />
      <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {selectedRegion}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  )

  return (
    <div>
      <nav className="flex items-center justify-between p-3 lg:px-40 lg:py-2 border-b bg-gray-100">
        {/* Chap taraf */}
        <div className="flex items-center space-x-6">
          <RegionDropdown />
          <span className="text-sm text-gray-700 cursor-pointer">Stadionlar</span>
        </div>

        {/* O'ng taraf */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-blue-700 cursor-pointer">Admin bo'lish</span>
          <span className="text-sm text-blue-700 cursor-pointer">Stadion qo'shish</span>
          <span className="text-sm text-gray-700 cursor-pointer">Savol-javob</span>
          <span className="text-sm text-gray-700 cursor-pointer">Buyurtmalarim</span>

          {/* Til tanlash */}
          <div className="flex items-center space-x-1 cursor-pointer">
            <span className="text-sm text-gray-700">O'zbekcha</span>
          </div>
        </div>
      </nav>
      <nav className="flex items-center justify-between bg-gray-50 pb-3 lg:px-40 lg:pb-6">
        {/* Kompyuter versiyasi */}
        <div className="hidden lg:flex items-center justify-between w-full">
          <Link to={"/"} className="w-32 h-16">
            <img src={logo1 || "/placeholder.svg"} className="relative bottom-7" alt="logo" />
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
              className="px-4 xl:px-7 py-[13.5px] text-sm font-medium h-full text-white rounded-e-lg border bg-gray-200 relative right-1"
            >
              <FaSearch className="text-gray-500" />
            </button>
            {/* Filtrlash natijalarini ko'rsatish */}
            {filteredData.length > 0 && (
              <ul className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg z-10 max-h-52 overflow-y-auto">
                {filteredData.map((item) => (
                  <Link to={`/about/${item.id}`} key={item.id}>
                    <li className="hover:cursor-pointer hover:bg-gray-50 p-2" onClick={() => setSearchTerm(item.title)}>
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
                  setIsPhoneModalOpen(true)
                }
              }}
              className="flex items-center text-gray-700 hover:text-black"
            >
              <FaUser className="mr-1" />
              {localStorage.getItem("userToken") ? "Profil" : "Kirish"}
            </Link>
            {!localStorage.getItem("userToken") && (
              <Link to="/auth/login" className="flex items-center text-gray-700 hover:text-black">
                <FaUserShield className="text-xl mr-1" />
                Admin
              </Link>
            )}
            <Link to="/favorites" className="flex items-center text-gray-700 hover:text-black">
              <FaHeart className="mr-1" />
              Sevimlilar
            </Link>
            <Link to="/ordersPage" className="flex items-center text-gray-700 hover:text-black">
              <FaShoppingBag className="mr-1" />
              Buyurtmalar
            </Link>
          </div>
        </div>

        {/* Telefon versiyasi */}
        <div className="relative w-full lg:hidden">
          <input
            type="search"
            id="search-mobile"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-3 pl-10 pr-3 w-full bg-gray-100 text-sm text-gray-900 rounded-lg border border-gray-300 outline-none"
            placeholder="Qidirish..."
            required
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          {/* Filtrlash natijalarini ko'rsatish */}
          {filteredData.length > 0 && (
            <ul className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-lg z-10 max-h-52 overflow-y-auto">
              {filteredData.map((item) => (
                <Link to={`/about/${item.id}`} key={item.id}>
                  <li className="hover:cursor-pointer hover:bg-gray-50 p-2" onClick={() => setSearchTerm(item.title)}>
                    {item.title}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
        <div className="z-50">
          <Modal isOpen={isPhoneModalOpen} onClose={() => setIsPhoneModalOpen(false)} />
        </div>
      </nav>
    </div>
  )
}

export default Navbar

