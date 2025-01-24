import { useEffect, useRef, useState } from "react";
import StadionAdds from "../../components/Admin/Addstadions";
import Layout from "../../components/Admin/Layout";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { IoClose } from "react-icons/io5";
import { Adminconfig } from "../../helpers/token/admintoken";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const StadinAdd = ({ stadionCount }) => {
  const [getAdd, setGetadd] = useState(false);
  const [getMalumot, setgetMalumot] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setopenModal] = useState(false);

  // Refs for input fields
  const title = useRef(null);
  const description = useRef(null);
  const price = useRef(null);

  // Checkbox State
  const [facilities, setFacilities] = useState({
    kiyinish: false,
    yuvinish: false,
    formal: false,
    yoritish: false,
  });

  // Checkbox Change Handler
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFacilities((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  const imgRef = useRef()

  // Tasvirlarni yuborish
  const postPhoto = () => {
    const formData = new FormData();
  
    if (!imgRef.current || imgRef.current.files.length === 0) {
      toast.error("Iltimos, stadion rasmini tanlang!");
      return;
    }
  
    formData.append("image", imgRef.current.files[0]);
  
    axios
      .post(
        `${baseUrl}stadion/stadion-images/${selectedItem.id}/add/`,
        formData,
        Adminconfig
      )
      .then((res) => {
        console.log(res);
        toast.success("Rasmlar muvaffaqiyatli yuborildi");
        imgRef.current.value = ""; // Faylni tozalash
      })
      .catch((err) => {
        console.error(err);
        toast.error("Rasm yuklashda xatolik yuz berdi.");
      });
  };


  function addStadion() {
    setGetadd(!getAdd);
  }
  // Modal Open
  function ModalOpen(item) {
    setSelectedItem(item);
    setFacilities({
      kiyinish: item.kiyinish_xonasi || false,
      yuvinish: item.dush || false,
      formal: item.forma || false,
      yoritish: item.yoritish || false,
    });
    setopenModal(true);
  }

  // Modal Close
  function closeModal() {
    setSelectedItem(null);
    setopenModal(false);
  }

  function deleteStadion(item) {
    axios
      .delete(`${baseUrl}stadion/admin-stadion-delete/${item.id}/`, Adminconfig)
      .then((res) => {
        getMalumotlar(); // Jadvalni yangilash
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  // Fetching Data
  function getMalumotlar() {
    axios
      .get(`${baseUrl}stadion/admin-stadion-get/`, Adminconfig)
      .then((res) => {
        setgetMalumot(res.data);
        stadionCount(res.data.length);
      })
      .catch((err) => console.log(err.message));
  }

  // Updating Stadion
  function updateStadion() {
    const updatedData = {
      title: title.current.value,
      description: description.current.value,
      price: price.current.value,
      kiyinish_xonasi: facilities.kiyinish,
      dush: facilities.yuvinish,
      forma: facilities.formal,
      yoritish: facilities.yoritish,
    };

    axios
      .put(
        `${baseUrl}stadion/admin-stadion-put/${selectedItem.id}/`,
        updatedData,
        Adminconfig
      )
      .then((res) => {
        console.log("Stadion muvaffaqiyatli yangilandi:", res.data);
        getMalumotlar(); // Jadvalni yangilash
        closeModal(); // Modalni yopish
      })
      .catch((err) => console.error("Xatolik:", err));
  }

  // Fetch Data on Load
  useEffect(() => {
    getMalumotlar();
  }, []);

  return (
    <Layout>
      <div className="bg-gray-100 min-h-[100vh] dark:bg-gray-900">
        <div className="p-4 md:p-8">
          <button
            onClick={addStadion}
            className="flex items-center gap-2 bg-slate-500 dark:bg-slate-700 text-white px-4 py-2 rounded-full transition"
          >
            Stadion qoshish
          </button>
        </div>

        <div className="px-4 md:px-8">
          {/* Table for Larger Screens */}
          <div className="hidden sm:block relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Stadion nomi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Stadion haqida ma'lumot
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Narxi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Manzili
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {getMalumot && getMalumot.length > 0 ? (
                  getMalumot.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.title}
                      </th>
                      <td className="px-6 py-4">
                        {item.description.length > 30
                          ? item.description.slice(0, 30) + "..."
                          : item.description}
                      </td>
                      <td className="px-6 py-4">{item.price} so'm</td>
                      <td className="px-6 py-4">{item.address}</td>
                      <td className="px-6 py-4 flex gap-3 text-right">
                        <button
                          onClick={() => ModalOpen(item)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center"
                        >
                          <FaEdit className="w-5 h-5 mr-1" />
                        </button>
                        <button
                          onClick={() => deleteStadion(item)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline flex items-center"
                        >
                          <FaTrash className="w-5 h-5 mr-1" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-5 bg-white dark:bg-gray-800 text-center text-gray-500 dark:text-gray-400"
                    >
                      Siz hali stadion qo'shmagansiz
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Card Layout for Phones */}
          <div className="block sm:hidden">
            {getMalumot && getMalumot.length > 0 ? (
              getMalumot.map((item, index) => (
                <div
                  key={index}
                  className="p-4 mb-4 flex flex-col gap-3 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
                >
                  <p className="text-sm text-gray-900 dark:text-white flex items-center gap-2 justify-between">
                    <span className="font-semibold">Stadion nomi:</span>
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-white flex items-center gap-2 justify-between">
                    <span className="font-semibold">Stadion haqida</span>{" "}
                    {item.description.length > 20
                      ? item.description.slice(0, 20) + "..."
                      : item.description}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-white flex items-center gap-2 justify-between">
                    <span className="font-semibold">Narxi:</span> {item.price}{" "}
                    so'm
                  </p>
                  <p className="text-sm text-gray-700 dark:text-white flex items-center gap-2 justify-between">
                    <span className="font-semibold">Manzili:</span>{" "}
                    {item.address}
                  </p>
                  <div className="flex justify-between gap-3 items-center ">
                    <p className="font-semibold text-sm text-gray-700 dark:text-white">
                      Action
                    </p>
                    <div>
                      <button
                        onClick={() => ModalOpen(item)}
                        className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <FaEdit className="w-5 h-5 mr-1" />
                      </button>
                      <button
                        onClick={() => deleteStadion(item)}
                        className="mt-2 font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        <FaTrash className="w-5 h-5 mr-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-black dark:text-white">
                Siz hali stadion qo'shmagansiz
              </p>
            )}
          </div>
        </div>
        {/* Edit Modal */}
        {openModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="p-5 bg-slate-600 rounded max-h-[90vh] overflow-y-scroll w-[90%] max-w-[900px]">
              <div className="flex mb-4 items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">
                  Stadion Tahrirlash
                </h2>
                <IoClose
                  className="text-2xl cursor-pointer text-white"
                  onClick={closeModal}
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block mb-2 text-white">Stadion nomi:</label>
                  <input
                    type="text"
                    ref={title}
                    defaultValue={selectedItem.title}
                    placeholder="Stadion nomi"
                    className="w-full px-4 py-2 border rounded-md bg-slate-800 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-white">
                    Stadion haqida:
                  </label>
                  <textarea
                    ref={description}
                    defaultValue={selectedItem.description}
                    placeholder="Stadion haqida ma'lumot"
                    className="w-full px-4 py-4 border rounded-md bg-slate-800 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-white">
                    Stadion Narxi:
                  </label>
                  <input
                    type="number"
                    ref={price}
                    defaultValue={selectedItem.price}
                    className="w-full px-4 py-2 border rounded-md bg-slate-800 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Stadion holati:</label>
                  <div className="flex flex-col gap-3">
                    <div>
                      <input
                        type="checkbox"
                        name="kiyinish"
                        checked={facilities.kiyinish}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4"
                      />
                      <span className="ml-2">Kiyinish xonasi</span>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="yuvinish"
                        checked={facilities.yuvinish}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4"
                      />
                      <span className="ml-2">Yuvinish xonasi</span>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="formal"
                        checked={facilities.formal}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4"
                      />
                      <span className="ml-2">Formalar</span>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="yoritish"
                        checked={facilities.yoritish}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4"
                      />
                      <span className="ml-2">Yoritish</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="text-center text-xl">Qo'shimcha rasm qo'shish</p>
                      <div className="flex gap-3 items-center">
                        <input
                          className="w-full px-2 py-2 border rounded-md bg-slate-800 text-white"
                          type="file"
                          ref={imgRef}
                        />
                      </div>
                    </div>

                  </div>
                </div>
                <button
                  type="submit"
                  onClick={() => { updateStadion(); postPhoto() }}
                  className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Saqlash
                </button>
              </div>
            </div>
          </div>
        )}

        {getAdd && <StadionAdds addStadion={addStadion} />}
      </div>
    </Layout>
  );
};

export default StadinAdd;