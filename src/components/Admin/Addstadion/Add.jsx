import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Adminconfig } from "../../../helpers/token/admintoken";
import { baseUrl } from "../../../helpers/api/baseUrl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import RegionSelect from "../RegionSelect";

function MapClick({ onMapClick }) {
  useMapEvents({
    click: onMapClick,
  });
  return null;
}

function LocationMarker({ position, setPosition }) {
  const map = useMap();

  useEffect(() => {
    map
      .locate()
      .on("locationfound", (e) => {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      })
      .on("locationerror", (e) => {
        console.log(e);
        // Joylashuv topilmasa, Qarshi markaziga o'rnatamiz
        setPosition({ lat: 38.8601, lng: 65.7961 });
        map.flyTo([38.8601, 65.7961], map.getZoom());
      });
  }, [map]);

  return position === null ? null : <Marker position={position} />;
}

function Add() {
  const nameRef = useRef(null);
  const locationRef = useRef(null);
  const capacityRef = useRef(null);
  const imgRef = useRef(null);
  const address = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [getSaved, setgetSaved] = useState("");
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [position, setPosition] = useState(null);

  const [regionId, setRegionId] = useState(null);
  const [districtId, setDistrictId] = useState(null);

  const handleSelectRegion = (id) => {
    setRegionId(id);
  };

  const handleSelectDistrict = (id) => {
    setDistrictId(id);
  };

  const Malumot = () => {
    axios
      .get(`${baseUrl}user/user-info/`, Adminconfig)
      .then((res) => setgetSaved(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Malumot();
  }, []);

  const [facilities, setFacilities] = useState({
    kiyinish: false,
    yuvinish: false,
    formal: false,
    yoritish: false,
    parkofka: false,
    tishli_oyoqkiyim: false,
    usti_ochiq_yopiq: false,
  });

  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFacilities((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

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

  const handleSubmit = () => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", nameRef.current.value);
    formData.append("description", locationRef.current.value);
    formData.append("price", capacityRef.current.value);

    if (imgRef.current.files.length > 0) {
      formData.append("photo", imgRef.current.files[0]);
    } else {
      toast.error("Iltimos, stadion rasmini tanlang!");
      setIsSubmitting(false);
      return;
    }

    formData.append("address", address.current.value);
    formData.append("viloyat", regionId);
    formData.append("tuman", districtId);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("kiyinish_xonasi", facilities.kiyinish);
    formData.append("dush", facilities.yuvinish);
    formData.append("yoritish", facilities.yoritish);
    formData.append("parkofka", facilities.parkofka);
    formData.append("forma", facilities.formal);
    formData.append("tishli_oyoqkiyim", facilities.tishli_oyoqkiyim);
    formData.append("usti_ochiq_yopiq", facilities.usti_ochiq_yopiq);
    formData.append("user", getSaved.id);

    axios
      .post(`${baseUrl}stadion/add-stadion/`, formData, Adminconfig)
      .then((res) => {
        toast.success("Stadion muvaffaqiyatli qo'shildi!");
        navigate("/stadionAdd");
      })
      .catch((err) => {
        toast.error("Xatolik yuz berdi!");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="">
      <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-4">
          {/* Stadion nomi */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-10">
            <label className="block mb-1 md:mb-0 dark:text-white md:text-lg">
              Stadion nomi:<span className="text-red-500 mx-1">*</span>
            </label>
            <input
              type="text"
              ref={nameRef}
              placeholder="Stadion nomi"
              className="w-full md:w-96 px-3 py-2 border border-gray-700 dark:border-gray-300 rounded-md dark:bg-slate-800 dark:text-white"
              required
            />
          </div>

          {/* Stadion haqida */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-[26px]">
            <label className="block mb-1 md:mb-0 dark:text-white md:text-lg">
              Stadion haqida:<span className="text-red-500 mx-1">*</span>
            </label>
            <textarea
              ref={locationRef}
              placeholder="Stadion manzili"
              className="w-full md:w-96 px-3 py-2 border border-gray-700 dark:border-gray-300 rounded-md dark:bg-slate-800 dark:text-white"
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
              ref={capacityRef}
              placeholder="50000"
              className="w-full md:w-96 px-3 py-2 border border-gray-700 dark:border-gray-300 rounded-md dark:bg-slate-800 dark:text-white"
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
              ref={address}
              placeholder="Masalan: Marka ro'parasida"
              className="w-full md:w-96 px-3 py-2 border border-gray-700 dark:border-gray-300 rounded-md dark:bg-slate-800 dark:text-white"
              required
            />
          </div>

          <RegionSelect
            onSelectRegion={handleSelectRegion}
            onSelectDistrict={handleSelectDistrict}
          />

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
                Latitude: {latitude.toFixed(6)}, Longitude:{" "}
                {longitude.toFixed(6)}
              </p>
            )}
          </div>

          {/* Stadion rasmi */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-10">
            <label className="block mb-1 md:mb-0 dark:text-white md:text-lg">
              Stadion rasmi:<span className="text-red-500 mx-1">*</span>
            </label>
            <input
              type="file"
              ref={imgRef}
              className="w-full md:w-96 px-3 py-2 border border-gray-700 dark:border-gray-300 rounded-md dark:bg-slate-800 text-white"
              required
            />
          </div>

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

          {/* Qo‘shish tugmasi */}
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full md:max-w-max py-2 px-4 mt-5 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          {isSubmitting ? "Yuborilmoqda..." : "Qo‘shish"}
        </button>
      </div>

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
}

export default Add;
