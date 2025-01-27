import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../helpers/api/baseUrl";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo 1.svg";

function Regester() {
  const nemeRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const regesterPost = () => {
    if (!nemeRef.current.value) {
      toast.warning("Iltimos, ismingizni kiriting!");
      return;
    }
    if (!lastNameRef.current.value) {
      toast.warning("Iltimos, familiyangizni kiriting!");
      return;
    }
    if (!phoneRef.current.value) {
      toast.warning("Iltimos, telefon raqamingizni kiriting!");
      return;
    }
    if (!phoneRef.current.value.startsWith("+998")) {
      toast.warning("Telefon raqamingiz +998 bilan boshlanishi shart!");
      return;
    }
    if (!passwordRef.current.value) {
      toast.warning("Iltimos, parolni kiriting!");
      return;
    }

    axios
      .post(`${baseUrl}user/register/`, {
        first_name: nemeRef.current.value,
        last_name: lastNameRef.current.value,
        phone_number: phoneRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
          navigate("/auth/login");
        }
      })
      .catch((err) => {
        toast.error(
          `Xatolik yuz berdi: ${err.response?.data?.message || err.message}`
        );
      });
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col lg:flex-row w-full lg:w-5/6 lg:h-5/6 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="lg:w-3/5 w-full flex flex-col items-center justify-center bg-gray-50 p-8">
            <img className="w-44 lg:w-96" src={logo} alt="" />
          </div>

          <div className="flex justify-center items-center w-full lg:w-3/5 p-6 lg:p-8">
            <div className="w-full">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">
                Ro`yxatdan o`tish
              </h2>
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-gray-600"
                  >
                    Ism
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    ref={nemeRef}
                    placeholder="Ismingizni kiriting"
                    required
                    className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-gray-600"
                  >
                    Familiya
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    ref={lastNameRef}
                    name="lastName"
                    placeholder="Familiyangizni kiriting"
                    required
                    className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-semibold text-gray-600"
                  >
                    Telefon raqam
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Telefon raqamingizni kiriting"
                    ref={phoneRef}
                    defaultValue={"+998"}
                    required
                    className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-gray-600"
                  >
                    Yangi parol kiriting
                  </label>
                  <div className="flex items-center border rounded-lg mt-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      ref={passwordRef}
                      name="confirmPassword"
                      placeholder="Parolni qayta kiriting"
                      required
                      className="w-full px-4 py-2 text-sm rounded-lg focus:outline-none"
                    />
                    <span
                      className="px-3 cursor-pointer text-gray-800"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <p className="text-xs mt-2">
                    Parol kamida 5 ta belgidan iborat
                  </p>
                </div>
              </div>

              <button
                onClick={regesterPost}
                className="w-full py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
              >
                Regester
              </button>

              <div className="flex justify-center items-center mt-4 lg:mt-6">
                <Link
                  to={"/auth/login"}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Tizimga kirish
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Regester;
