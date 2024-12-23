import React, { useEffect, useState } from "react";
import MapComponent from "../../components/MapComponent";
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";

function Map() {
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

  return (
    <div>
      <div className="h-screen w-full relative z-0">
        {markers.length > 0 ? (
          <MapComponent
            center={[markers[0]?.latitude || 0, markers[0]?.longitude || 0]}
            zoom={13}
            className="h-screen w-full"
            markers={markers} // markersni to'g'ri o'tkazish
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Markerlar yuklanmoqda...
          </div>
        )}
      </div>
      <Link to={"/"}>
        <div className="fixed z-50 bottom-[30px] right-0 left-0 flex justify-center">
          <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition lg:hidden">
            <IoIosMenu />
            <span className="text-sm">Bosh sahifa</span>
          </button>
        </div>
      </Link>
    </div>
  );
}

export default Map;
