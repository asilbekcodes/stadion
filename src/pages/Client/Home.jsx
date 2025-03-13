// import React from 'react'
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../../components/Client/Navbar";
import Footer from "../../components/Client/Footer";
import BannerCarousel from "../../components/Client/BannerCarousel";
import Card from "../../components/Client/Card";
import { MdOutlineLocationOn } from "react-icons/md";
import MapComponent from "../../components/MapComponent";
import { useEffect, useState } from "react";
import { baseUrl } from "../../helpers/api/baseUrl";
import axios from "axios";
import Footers from "./Footer";
import vector from "../../assets/icons/Vector 2.svg";
// import { toast } from 'react-toastify'

function Home() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axios.get(`${baseUrl}stadion/all-map/`);
        const validMarkers = response.data.filter(
          (marker) =>
            marker.latitude !== undefined && marker.longitude !== undefined
        );
        setMarkers(validMarkers);
      } catch (error) {
        console.error("Markerlarni olishda xatolik yuz berdi:", error);
      }
    };

    fetchMarkers();
  }, []);

  const [selectedRegionId, setSelectedRegionId] = useState(null)

  const handleRegionSelect = (regionId) => {
    setSelectedRegionId(regionId)
  }
  return (
    <div>
      <Navbar onRegionSelect={handleRegionSelect}/>
      <div className="min-h-screen bg-white p-4 lg:px-40">
        <div className="hidden lg:block">
          <BannerCarousel />
        </div>
        <section>
          <div className="flex font-sans justify-between items-center mt-[15px] md:mt-[100px] mb-[20px] lg:mb-[50px]">
            <div>
              <p className="text-[16px] md:text-[27px] font-semibold text-[#292929]">
                Tanlangan
              </p>
            </div>
            <div className="flex">
              <Link to={"/main"}>
                <p className="text-[12px] md:text-[16px] flex items-center gap-[15px] text-[#292929]">
                  Hammasini ko`rish <img src={vector} alt="" />
                </p>
              </Link>
            </div>
          </div>
          <Card
            selectedRegionId={selectedRegionId}
            className={"overflow-x-scroll md:overflow-x-hidden"}
            classNames={
              "grid grid-cols-3 sm:grid-cols-2 xl:grid-cols-3 gap-x-[330px] gap-y-5 sm:gap-5 "
            }
            classNm={
              "flex flex-col rounded-lg relative w-[320px] sm:w-full"
            }
          />
          <div className="font-sans mt-[50px] md:mt-[120px]">
            <div className="flex justify-between mb-[25px] lg:mb-[50px] ">
              <p className="text-[16px] md:text-[27px] font-semibold">
                Eng yangi
              </p>
              <Link to={"/main"}>
                <h2 className="text-[12px] md:text-[16px] flex items-center gap-[15px] text-[#292929]">
                  Hammasini ko`rish <img src={vector} alt="" />
                </h2>
              </Link>
            </div>
            <Card
              selectedRegionId={selectedRegionId}
              className={"overflow-x-scroll md:overflow-x-hidden"}
              classNames={
                "grid grid-cols-3 sm:grid-cols-2 xl:grid-cols-3 gap-x-[330px] gap-y-5 sm:gap-5"
              }
              classNm={
                "flex flex-col rounded-lg relative w-[320px] sm:w-full"
              }
            />
          </div>
          <div className="my-8 md:my-24 hidden lg:block">
            {/* <MapComponent className={"h-screen lg:h-[450px] w-full"}/> */}
            {markers.length > 0 ? (
              <MapComponent
                center={[markers[0]?.latitude || 0, markers[0]?.longitude || 0]}
                zoom={13}
                className="h-screen lg:h-[500px] w-full z-0 rounded-[20px]"
                markers={markers} // markersni to'g'ri o'tkazish
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Markerlar yuklanmoqda...
              </div>
            )}
          </div>
          <div className="fixed z-50 bottom-[75px] right-0 left-0 flex justify-center">
            <Link to={"/map"}>
              <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition lg:hidden">
                <MdOutlineLocationOn />
                <span className="text-sm">Карта</span>
              </button>
            </Link>
          </div>
        </section>
        
      </div>
        <Footers />
        <Footer />
    </div>
  );
}

export default Home;
