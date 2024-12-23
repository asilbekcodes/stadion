import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { baseUrl } from "../../helpers/api/baseUrl";
import { toast } from "react-toastify";
import { Adminconfig } from "../../helpers/token/admintoken";
// import StadionAdds from "./Addstadions";

function ProfilCom() { // Accept userId as a prop
  const [getProfil, setgetProfil] = useState(null);
  const first_name = useRef(null);
  const last_name = useRef(null);
  const phone_number = useRef(null);

  function handleProfil() {
    axios
      .get(`${baseUrl}user/user-info/`, Adminconfig)
      .then((res) => {
        setgetProfil(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    handleProfil();
  }, []);

  function pullProfil() {
    const data = {
      "first_name": first_name.current.value,
      "last_name": last_name.current.value,
      "phone_number": phone_number.current.value
    };
    axios.put(`${baseUrl}user/user-info/`, data, Adminconfig)
      .then(res => {
        console.log(res);
        toast.success("Yaxshi");
      })
      .catch(err => console.log(err));
  }
  // console.log(getProfil.id);
  

  return (
    <div className="flex flex-col items-center p-8 ">
      <div className="w-full max-w-7xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <BsPersonCircle className="w-40 h-40 rounded-full object-cover" />
        </div>
        <div className="text-center text-black-500 text-xl mb-4 dark:text-white">
          Sizning Ma'lumotlaringiz
        </div>
        {getProfil ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-200">
                Ism
              </label>
              <input
                type="text"
                ref={first_name}
                defaultValue={getProfil.first_name}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 dark:bg-gray-700 dark:text-white dark:border-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-200">
                Familiya
              </label>
              <input
                type="text"
                ref={last_name}
                defaultValue={getProfil.last_name}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 dark:bg-gray-700 dark:text-white dark:border-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-200">
                Telefon raqam
              </label>
              <input
                defaultValue={getProfil.phone_number}
                ref={phone_number}
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 dark:bg-gray-700 dark:text-white dark:border-gray-500"
              />
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-300">
            Ma'lumotlar yuklanmoqda...
          </div>
        )}
        <button onClick={pullProfil}
          className="p-2 rounded-lg text-md mt-4 bg-gray-400 hover:bg-gray-600 transition duration-200 ease-in-out w-max font-semibold text-white dark:bg-gray-700 dark:hover:bg-gray-500"
        >
          O'zgartirishlarni saqlang
        </button>
       {/* <div className="hidden">
       {getProfil && (
        <StadionAdds getProfil1={getProfil.id}/>
       )
        }
       </div> */}
      </div>
    </div>
  );
}

export default ProfilCom;