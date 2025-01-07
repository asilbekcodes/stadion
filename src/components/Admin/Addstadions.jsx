import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../helpers/api/baseUrl";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { Adminconfig } from "../../helpers/token/admintoken";

const StadionAdds = ({ addStadion }) => {
  const nameRef = useRef(null);
  const locationRef = useRef(null);
  const capacityRef = useRef(null);
  const imgRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const address = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [getSaved, setgetSaved] = useState("");

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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          toast.success("Joylashuv aniqlandi!");
        },
        (error) => {
          console.error("Joylashuv xatosi:", error);
          toast.error("Joylashuvni aniqlashda xatolik yuz berdi!");
        }
      );
    } else {
      toast.error("Brauzer geolokatsiyani qo'llab-quvvatlamaydi.");
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
    formData.append("start_time", startTimeRef.current.value);
    formData.append("end_time", endTimeRef.current.value);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("kiyinish_xonasi", facilities.kiyinish);
    formData.append("dush", facilities.yuvinish);
    formData.append("yoritish", facilities.yoritish);
    formData.append("parkofka", true);
    formData.append("forma", facilities.formal);
    formData.append("user", getSaved.id);
    console.log(getSaved.id);

    axios
      .post(`${baseUrl}stadion/add-stadion/`, formData, Adminconfig)
      .then((res) => {
        console.log(res.data);
        toast.success("Stadion muvaffaqiyatli qo'shildi!");
        addStadion();
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
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
            <h2 className="text-2xl font-semibold text-white">Stadion Qo‘shish</h2>
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
              <label className="block mb-2 text-white">Stadion joylashuvi:</label>
              <button
                type="button"
                onClick={handleGetLocation}
                className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                Joylashuvni aniqlash
              </button>
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
              <label className="block mb-2 text-white">Boshlanish vaqti:</label>
              <input
                type="time"
                ref={startTimeRef}
                className="w-full px-4 py-2 border rounded-md bg-slate-800 text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-white">Tugash vaqti:</label>
              <input
                type="time"
                ref={endTimeRef}
                className="w-full px-4 py-2 border rounded-md bg-slate-800 text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-white">Stadion holati:</label>
              <div className="flex flex-col gap-3">
                <div>
                  <input
                    type="checkbox"
                    name="kiyinish"
                    checked={facilities.kiyinish}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-2 text-white">Kiyinish xonasi</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="yuvinish"
                    checked={facilities.yuvinish}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-2 text-white">Yuvinish xonasi</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="formal"
                    checked={facilities.formal}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-2 text-white">Formalar</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="yoritish"
                    checked={facilities.yoritish}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-2 text-white">Yoritish</span>
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
    </div>
  );
};

export default StadionAdds;
