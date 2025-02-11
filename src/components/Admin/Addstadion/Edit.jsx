
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Adminconfig } from "../../../helpers/token/admintoken";
import { baseUrl } from "../../../helpers/api/baseUrl";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import RegionSelect from "../RegionSelect";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapClick({ onMapClick }) {
  useMapEvents({
    click: onMapClick,
  });
  return null;
}

function LocationMarker({ position, setPosition }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [map, position]);

  return position === null ? null : <Marker position={position} />;
}

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const addressRef = useRef(null);
  const imgRef = useRef(null);
  

  const [facilities, setFacilities] = useState({
    kiyinish: false,
    yuvinish: false,
    formal: false,
    yoritish: false,
    parkofka: false,
    tishli_oyoqkiyim: false,
    usti_ochiq_yopiq: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [position, setPosition] = useState(null);

//   const [regionId, setRegionId] = useState(null);
//   const [districtId, setDistrictId] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}stadion/${id}/`, Adminconfig)
      .then((res) => {
        const data = res.data;
        nameRef.current.value = data.title;
        descriptionRef.current.value = data.description;
        priceRef.current.value = data.price;
        addressRef.current.value = data.address;
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setPosition({ lat: data.latitude, lng: data.longitude });
        // setRegionId(data.viloyat);
        // setDistrictId(data.tuman);
        setFacilities({
          kiyinish: data.kiyinish_xonasi || false,
          yuvinish: data.dush || false,
          formal: data.forma || false,
          yoritish: data.yoritish || false,
          parkofka: data.parkofka || false,
          tishli_oyoqkiyim: data.tishli_oyoqkiyim || false,
          usti_ochiq_yopiq: data.usti_ochiq_yopiq || false,
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFacilities((prev) => ({ ...prev, [name]: checked }));
  };

//   const handleSelectRegion = (id) => {
//     setRegionId(id);
//   };

//   const handleSelectDistrict = (id) => {
//     setDistrictId(id);
//   };

  const handleGetLocation = () => {
    setIsMapOpen(true);
  };

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setPosition({ lat, lng });
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleCloseMap = () => {
    if (latitude && longitude) {
      setIsMapOpen(false);
      toast.success("Joylashuv aniqlandi!");
    } else {
      toast.error("Joylashuvni aniqlang!");
    }
  };

  const updateStadion = () => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", nameRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("address", addressRef.current.value);
    // formData.append("viloyat", regionId);
    // formData.append("tuman", districtId);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("kiyinish_xonasi", facilities.kiyinish);
    formData.append("dush", facilities.yuvinish);
    formData.append("yoritish", facilities.yoritish);
    formData.append("parkofka", facilities.parkofka);
    formData.append("forma", facilities.formal);
    formData.append("tishli_oyoqkiyim", facilities.tishli_oyoqkiyim);
    formData.append("usti_ochiq_yopiq", facilities.usti_ochiq_yopiq);

    // if (imgRef.current.files.length > 0) {
    //   formData.append("photo", imgRef.current.files[0]);
    // }

    axios
      .put(`${baseUrl}stadion/admin-stadion-put/${id}/`, formData, Adminconfig)
      .then(() => {
        toast.success("Stadion muvaffaqiyatli yangilandi");
        navigate("/stadionAdd");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Xatolik yuz berdi");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">Stadionni tahrirlash</h2>
      <div className="grid grid-cols-1 gap-4">
        {/* Stadion nomi */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-10">
          <label className="block mb-1 md:mb-0 dark:text-white md:text-lg">
            Stadion nomi:<span className="text-red-500 mx-1">*</span>
          </label>
          <input
            type="text"
            ref={nameRef}
            className="w-full md:w-96 px-3 py-2 border border-gray-700 dark:border-gray-300 rounded-md dark:bg-slate-800 text-white"
            required
          />
        </div>

        {/* Stadion haqida */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-[26px]">
          <label className="block mb-1 md:mb-0 dark:text-white md:text-lg">
            Stadion haqida:<span className="text-red-500 mx-1">*</span>
          </label>
          <textarea
            ref={descriptionRef}
            className="w-full md:w-96 px-3 py-2 border border-gray-700 dark:border-gray-300 rounded-md dark:bg-slate-800 text-white"
            required
          />
        </div>

        {/* Stadion Narxi */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-[38px]">
          <label className="block mb-1 md:mb-0 dark:text-white md:text-lg">
            Stadion Narxi:<span className="text-red-500 mx-1">*</span>
          </label>
          <input
            type="number"
            ref={priceRef}
            className="w-full md:w-96 px-3 py-2 border border-gray-700 dark:border-gray-300 rounded-md dark:bg-slate-800 text-white"
            required
          />
        </div>

        {/* Stadion Manzili */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-6">
          <label className="block mb-1 md:mb-0 dark:text-white md:text-lg">
            Stadion Manzili:<span className="text-red-500 mx-1">*</span>
          </label>
          <input
            type="text"
            ref={addressRef}
            className="w-full md:w-96 px-3 py-2 border border-gray-700 dark:border-gray-300 rounded-md dark:bg-slate-800 text-white"
            required
          />
        </div>

        {/* <RegionSelect
          onSelectRegion={handleSelectRegion}
          onSelectDistrict={handleSelectDistrict}
          initialRegionId={regionId}
          initialDistrictId={districtId}
        /> */}

        {/* Joylashuv */}
        <div className="flex flex-col md:flex-row gap-2">
          <label className="block mb-1 md:mb-0 dark:text-white md:text-lg">
            Stadion joylashuvi:<span className="text-red-500 mx-1">*</span>
          </label>
          <button
            type="button"
            onClick={handleGetLocation}
            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Joylashuvni aniqlash
          </button>
          {latitude && longitude && (
            <p className="mt-1 text-sm text-white">
              Latitude: {latitude.toFixed(6)}, Longitude: {longitude.toFixed(6)}
            </p>
          )}
        </div>

        {/* Stadion rasmi */}
        {/* <div className="flex flex-col md:flex-row gap-2 md:gap-10">
          <label className="block mb-1 md:mb-0 dark:text-white md:text-lg">
            Stadion rasmi:
          </label>
          <input
            type="file"
            ref={imgRef}
            className="w-full md:w-96 px-3 py-2 border border-gray-700 dark:border-gray-300 rounded-md dark:bg-slate-800 text-white"
          />
        </div> */}

        {/* Stadion holati */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-10">
          <label className="block mb-1 md:mb-0 dark:text-white md:text-lg">
            Stadion holati:<span className="text-red-500 mx-1">*</span>
          </label>
          <div className="grid gap-4">
            {[
              { name: "kiyinish", label: "Kiyinish xonasi" },
              { name: "yuvinish", label: "Yuvinish xonasi" },
              { name: "formal", label: "Formalar" },
              { name: "yoritish", label: "Yoritish" },
              { name: "tishli_oyoqkiyim", label: "Tishli butsalarga ruxsat" },
              { name: "parkofka", label: "Parkovka" },
              { name: "usti_ochiq_yopiq", label: "Stadion usti yopiq" },
            ].map((item) => (
              <div key={item.name} className="flex items-center">
                <input
                  type="checkbox"
                  name={item.name}
                  checked={facilities[item.name]}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                />
                <span className="ml-2 dark:text-white flex items-center gap-2">
                  {item.label}
                  {facilities[item.name] ? (
                    <FaCheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <FaTimesCircle className="w-5 h-5 text-red-500" />
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Saqlash tugmasi */}
      <button
        onClick={updateStadion}
        disabled={isSubmitting}
        className="w-full md:max-w-max py-2 px-4 mt-5 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
      </button>

      {/* Xarita */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-[600px] h-[400px]">
            <MapContainer
              center={position || [38.8601, 65.7961]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
              <MapClick onMapClick={handleMapClick} />
              <LocationMarker position={position} setPosition={setPosition} />
            </MapContainer>
            <div className="absolute bottom-10 right-10 z-[1000]">
              <button
                onClick={handleCloseMap}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Belgilash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
