import { useRef, useState } from "react";
import axios from "axios";
import Buttons from "../../components/Buttons";
import Navbar from "../../components/Client/Navbar";
import { baseUrl } from "../../helpers/api/baseUrl";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ClintLogin = () => {
  const phone = useRef(null);
  const password = useRef(null);
  const [showPassword, setShowPassword] = useState(false); // Parol ko'rinishini boshqaradi
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Parolni ko'rsatishni almashtiradi
  };

  const postLogin = () => {
    const phoneValue = phone.current.value;

    // Validatsiyalar
    if (!phoneValue.startsWith("+998")) {
      toast.warning("Telefon raqamingiz +998 bilan boshlanishi shart!");
      return;
    }
    if (!phoneValue || phoneValue.length === 0) {
      toast.warning("Iltimos, telefon raqamingizni kiriting!");
      return;
    }
    if (phoneValue.length !== 13) {
      toast.warning("Iltimos, telefon raqamini to'g'ri kiriting!");
      return;
    }
    if (!password.current.value) {
      toast.warning("Iltimos, parolni kiriting!");
      return;
    }

    const data = {
      phone_number: phoneValue,
      password: password.current.value,
    };

    // API so'rov
    axios
      .post(`${baseUrl}user/logiin/`, data)
      .then((res) => {
        if (res.status === 200) {
          // Tokenlarni saqlash
          localStorage.setItem("adminToken", res.data.access);
          localStorage.setItem("role", res.data.role);
          toast.success("Tizimga muvaffaqiyatli kirdingiz!");
          setTimeout(() => {
            window.location.reload("/dashboard");
          }, 1);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(`${err.response?.data?.message || err.message}`);
      });
  };

  return (
    <div className="bg-white h-screen">
      <div className="p-4 block lg:hidden">
        <Buttons text={"Tizimga kirish"} />
      </div>

      {/* Katta ekranlar uchun */}
      <div className="hidden lg:block">
        <Navbar />
      </div>

      {/* Kontent qismi */}
      <div className="p-4 flex justify-space-between flex-col items-center gap-5">
        <div className="w-[100%] max-w-[362px] md:max-w-[500px] md:p-10 rounded-md">
          <h2 className="text-lg font-semibold text-center mb-2 md:text-2xl">
            Login
          </h2>
          <div className="mb-4 flex flex-col gap-1">
            <label htmlFor="phone">Telefon raqami</label>
            <input
              id="phone"
              type="text"
              ref={phone}
              defaultValue={"+998"}
              className="px-4 py-2 bg-white border rounded-md"
            />
          </div>
          <div className="mb-4 flex flex-col gap-1 relative">
            <label htmlFor="">Parolni kiriting</label>
            <input
              type={showPassword ? "text" : "password"}
              ref={password}
              className="px-4 py-2 bg-white border rounded-md"
              placeholder=".........."
            />
            {/* Kuzcha (eye icon) */}
            <span
              className="absolute right-3 top-10 cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {/* Tasdiqlash tugmasi */}
          <button
            onClick={postLogin}
            className="w-full py-2 bg-[#34B271] text-white rounded-md hover:bg-green-600 transition"
          >
            Kirish
          </button>
        </div>
        {/* Foydalanuvchi shartnomasi va siyosati */}
        <div className="mt-20 flex justify-end">
          <p className="text-center w-[320px] text-gray-500 text-sm mt-10 md:text-base">
            <Link to={"/auth/register"}>
              Hisobingiz bormi?{" "}
              <span className="text-blue-500">Ro'yhatdan o'tish</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClintLogin;
