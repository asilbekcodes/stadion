import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../helpers/api/baseUrl";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { Adminconfig } from "../../helpers/token/admintoken";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

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

const StadionAdds = ({ addStadion }) => {
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
        addStadion();
        window.location.reload();
      })
      .catch((err) => {
        toast.error("Xatolik yuz berdi!");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-[900px]">
        <div className="p-5 bg-slate-600 rounded-lg max-h-[90vh] overflow-y-auto">
          <div className="flex mb-4 items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">
              Stadion Qo‘shish
            </h2>
            <IoClose
              className="text-2xl text-white cursor-pointer"
              onClick={addStadion}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2 text-white">Stadion nomi:</label>
              <input
                type="text"
                ref={nameRef}
                placeholder="Stadion nomi"
                className="w-full px-4 py-2 border rounded-md bg-slate-800 text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-white">Stadion haqida:</label>
              <textarea
                ref={locationRef}
                placeholder="Stadion manzili"
                className="w-full px-4 py-4 border rounded-md bg-slate-800 text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-white">Stadion Narxi:</label>
              <input
                type="number"
                ref={capacityRef}
                placeholder="50000"
                className="w-full px-4 py-2 border rounded-md bg-slate-800 text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-white">Stadion Manzili:</label>
              <input
                type="text"
                ref={address}
                placeholder="Masalan:Marka ro'parasida "
                className="w-full px-4 py-2 border rounded-md bg-slate-800 text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-white">
                Stadion joylashuvi:
              </label>
              <button
                type="button"
                onClick={handleGetLocation}
                className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                Joylashuvni aniqlash
              </button>
              {latitude && longitude && (
                <p className="mt-2 text-white">
                  Latitude: {latitude.toFixed(6)}, Longitude:{" "}
                  {longitude.toFixed(6)}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-white">Stadion rasmi:</label>
              <input
                type="file"
                ref={imgRef}
                className="w-full px-4 py-2 border rounded-md bg-slate-800 text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-white">Stadion holati:</label>
              <div className="flex flex-col gap-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="kiyinish"
                    checked={facilities.kiyinish}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  <span className='ml-2 text-white flex items-center gap-2'>
                    Kiyinish xonasi
                    {facilities.kiyinish ? (
                      <FaCheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <FaTimesCircle className="w-5 h-5 text-red-500" />
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="yuvinish"
                    checked={facilities.yuvinish}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  <span
                    className={`ml-2 text-white flex items-center gap-2`}
                  >
                    Yuvinish xonasi
                    {facilities.yuvinish ? (
                      <FaCheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <FaTimesCircle className="w-5 h-5 text-red-500" />
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="formal"
                    checked={facilities.formal}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  <span
                    className={`ml-2 text-white flex items-center gap-2 `}
                  >
                    Formalar
                    {facilities.formal ? (
                      <FaCheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <FaTimesCircle className="w-5 h-5 text-red-500" />
                    )}
                  </span>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="yoritish"
                    checked={facilities.yoritish}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  <span
                    className={`ml-2 text-white flex items-center gap-2`}
                  >
                    Yoritish
                    {facilities.yoritish ? (
                      <FaCheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <FaTimesCircle className="w-5 h-5 text-red-500" />
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="tishli_oyoqkiyim"
                    checked={facilities.tishli_oyoqkiyim}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  <span
                    className={`ml-2 text-white flex items-center gap-2`}
                  >
                    Tishli butsalarga ruxsat
                    {facilities.tishli_oyoqkiyim ? (
                      <FaCheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <FaTimesCircle className="w-5 h-5 text-red-500" />
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="parkofka"
                    checked={facilities.parkofka}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  <span
                    className={`ml-2 text-white flex items-center gap-2`}
                  >
                    Parkofka
                    {facilities.parkofka ? (
                      <FaCheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <FaTimesCircle className="w-5 h-5 text-red-500" />
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="usti_ochiq_yopiq"
                    checked={facilities.usti_ochiq_yopiq}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  <span
                    className={`ml-2 text-white flex items-center gap-2`}
                  >
                    Stadion usti yopiq
                    {facilities.usti_ochiq_yopiq ? (
                      <FaCheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <FaTimesCircle className="w-5 h-5 text-red-500" />
                    )}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              {isSubmitting ? "Yuborilmoqda..." : "Qo‘shish"}
            </button>
          </div>
        </div>
      </div>
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-[600px] h-[400px]">
            <MapContainer
              center={position || [38.8601, 65.7961]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" />
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

export default StadionAdds;
