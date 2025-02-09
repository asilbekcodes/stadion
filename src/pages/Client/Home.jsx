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
      <div className="min-h-screen bg-gray-50 p-4 lg:px-40">
        <div className="hidden lg:block">
          <BannerCarousel />
        </div>
        <section>
          <div className="flex font-sans justify-between items-center md:mt-24">
            <div>
              <h2 className="text-[15px] md:text-[25px] font-semibold mb-4">
                Tanlangan
              </h2>
            </div>
            <div className="flex">
              <Link to={"/main"}>
                <h2 className="text-[11px] md:text-[15px] mb-4 flex items-center gap-1">
                  Hammasini ko`rish <FaChevronRight />
                </h2>
              </Link>
            </div>
          </div>
          <Card
            selectedRegionId={selectedRegionId}
            className={"overflow-x-scroll md:overflow-x-hidden"}
            classNames={
              "grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-[330px] gap-y-5 sm:gap-5"
            }
            classNm={
              "flex flex-col rounded-lg border border-gray-200 bg-white shadow-md relative w-[320px] sm:w-full"
            }
          />
          <div className="font-sans mt-8 md:mt-24">
            <div className="flex justify-between">
              <p className="text-[15px] md:text-[25px] font-semibold mb-4">
                Eng yangi
              </p>
              <Link to={"/main"}>
                <h2 className="text-[11px] md:text-[15px] mb-4 flex items-center gap-1">
                  Hammasini ko`rish <FaChevronRight />
                </h2>
              </Link>
            </div>
            <Card
              selectedRegionId={selectedRegionId}
              className={"overflow-x-scroll md:overflow-x-hidden"}
              classNames={
                "grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-[330px] gap-y-5 sm:gap-5"
              }
              classNm={
                "flex flex-col rounded-lg border border-gray-200 bg-white shadow-md relative w-[320px] sm:w-full"
              }
            />
          </div>
          <div className="my-8 md:my-24 hidden lg:block">
            {/* <MapComponent className={"h-screen lg:h-[450px] w-full"}/> */}
            {markers.length > 0 ? (
              <MapComponent
                center={[markers[0]?.latitude || 0, markers[0]?.longitude || 0]}
                zoom={13}
                className="h-screen lg:h-[450px] w-full z-0"
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
