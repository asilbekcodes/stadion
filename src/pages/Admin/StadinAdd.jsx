import { useEffect, useRef, useState } from "react";
import StadionAdds from "../../components/Admin/Addstadions";
import Layout from "../../components/Admin/Layout";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { IoClose } from "react-icons/io5";
import { Adminconfig } from "../../helpers/token/admintoken";

const StadinAdd = ({ stadionCount }) => {
  const [getAdd, setGetadd] = useState(false);
  const [getMalumot, setgetMalumot] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setopenModal] = useState(false);

  // Refs for input fields
  const title = useRef(null);
  const description = useRef(null);
  const price = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);

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

  // Add Stadion Button
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
    axios.delete(`${baseUrl}stadion/admin-stadion-delete/${item.id}/`,Adminconfig)
      .then(res => {
        getMalumotlar(); // Jadvalni yangilash
       console.log(res); 
      })
      .catch(err => console.log(err))
  }

  // Fetching Data
  function getMalumotlar() {
    axios
      .get(`${baseUrl}stadion/admin-stadion-get/`, Adminconfig)
      .then((res) => {
        setgetMalumot(res.data);
        stadionCount(res.data.length)        
      })
      .catch((err) => console.log(err.message));
  }

  // Updating Stadion
  function updateStadion() {
    const updatedData = {
      title: title.current.value,
      description: description.current.value,
      price: price.current.value,
      start_time: startTime.current.value,
      end_time: endTime.current.value,
      kiyinish_xonasi: facilities.kiyinish,
      dush: facilities.yuvinish,
      forma: facilities.formal,
      yoritish: facilities.yoritish,
    };

    axios
      .put(`${baseUrl}stadion/admin-stadion-put/${selectedItem.id}/`, updatedData, Adminconfig)
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
    <Layout className={"bg-black"}>
      {/* Add Stadion Button */}
      <div className="p-2">
        <button
          onClick={addStadion}
          className="flex items-center gap-2 m-4 bg-slate-700 text-white px-4 py-2 rounded-full transition"
        >
          Stadion qo`shish
        </button>
      </div>

      <div className="p-5">
        {/* Table for Larger Screens */}
        <div className="hidden sm:block relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Stadion nomi</th>
                <th scope="col" className="px-6 py-3">Boshlanish vaqti</th>
                <th scope="col" className="px-6 py-3">Tugash vaqti</th>
                <th scope="col" className="px-6 py-3">Narxi</th>
                <th scope="col" className="px-6 py-3">Manzili</th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Tahrirlash</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {getMalumot &&
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
                    <td className="px-6 py-4">{item.start_time}</td>
                    <td className="px-6 py-4">{item.end_time}</td>
                    <td className="px-6 py-4">{item.price} so'm</td>
                    <td className="px-6 py-4">{item.address}</td>
                    <td className="px-6 py-4 flex gap-3 text-right">
                      <button
                        onClick={() => ModalOpen(item)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Tahrirlash
                      </button>
                      <button onClick={()=>deleteStadion(item)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Card Layout for Phones */}
        <div className="block sm:hidden">
          {getMalumot &&
            getMalumot.map((item, index) => (
              <div
                key={index}
                className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Boshlanish vaqti:</span> {item.start_time}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Tugash vaqti:</span> {item.end_time}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Narxi:</span> {item.price} so'm
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Manzili:</span> {item.address}
                </p>
                <div className="flex gap-3 items-center ">
                  <button
                    onClick={() => ModalOpen(item)}
                    className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Tahrirlash
                  </button>
                  <button onClick={()=>deleteStadion(item)} className="mt-2 font-medium text-red-600 dark:text-red-500 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Edit Modal */}
      {openModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-5 bg-slate-600 rounded max-h-[90vh] overflow-y-scroll w-[90%] max-w-[900px]">
            <div className="flex mb-4 items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Stadion Tahrirlash</h2>
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
                <label className="block mb-2 text-white">Stadion haqida:</label>
                <textarea
                  ref={description}
                  defaultValue={selectedItem.description}
                  placeholder="Stadion haqida ma'lumot"
                  className="w-full px-4 py-4 border rounded-md bg-slate-800 text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-white">Stadion Narxi:</label>
                <input
                  type="number"
                  ref={price}
                  defaultValue={selectedItem.price}
                  className="w-full px-4 py-2 border rounded-md bg-slate-800 text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-white">Boshlanish vaqti:</label>
                <input
                  type="time"
                  ref={startTime}
                  defaultValue={selectedItem.start_time}
                  className="w-full px-4 py-2 border rounded-md bg-slate-800 text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-white">Tugash vaqti:</label>
                <input
                  type="time"
                  ref={endTime}
                  defaultValue={selectedItem.end_time}
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
                </div>
              </div>
              <button
                type="submit"
                onClick={updateStadion}
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {getAdd && <StadionAdds addStadion={addStadion} />}
    </Layout>
  );
};

export default StadinAdd;
