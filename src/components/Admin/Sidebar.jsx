import { useState } from 'react';
import { FaBars, FaChartPie, FaClipboardList, FaPlusCircle, FaRegCalendarAlt, FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { AiOutlineLineChart } from "react-icons/ai";
import { BsClockHistory } from 'react-icons/bs';
import logo from '../../assets/StadionTopLogo.png';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const data = [
    {
      icon: <FaChartPie />,
      title: 'Dashboard',
      pathName: 'dashboard',
    },
    {
      icon: <FaPlusCircle />,
      title: "Stadion Qo'shish",
      pathName: 'stadionAdd',
    },
    {
      icon: <AiOutlineLineChart />,
      title: 'Statistika',
      pathName: 'statistika',
    },
    {
      icon: <FaClipboardList />,
      title: 'Buyurtmalar',
      pathName: 'orders',
    },
    {
      icon: <FaRegCalendarAlt   />,
      title: 'Buyurtmalar tarixi',
      pathName: 'history',
    },
    {
      icon: <BsClockHistory />,
      title: 'Vaqtlar',
      pathName: 'times',
    },
    {
      icon: <FaUserCircle />,
      title: 'Profil',
      pathName: 'profil',
    },
  ];

  return (
    <div>
      {/* Mobil versiya uchun yon panelni ochuvchi tugma */}
      <button
        onClick={toggleSidebar}
        className="p-2 text-white bg-gray-500 fixed top-3 left-3 rounded-full z-50 md:hidden"
      >
        <FaBars size={20} />
      </button>

      {/* Yon panel */}
      <div
        className={`bg-gray-100 text-gray-900 h-screen p-4 fixed top-0 left-0 w-64 border-r border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-600 z-40 
          ${isSidebarOpen ? 'block' : 'hidden'} md:block`}
      >
        {/* <h1 className="text-2xl font-bold mt-4 text-center italic">Stadion Top</h1> */}
        <img className='h-[70px]' src={logo} alt="" />
        <ul className="flex flex-col mt-5 text-xl">
          {data.map((item, index) => (
            <NavLink
              to={`/${item.pathName}`}
              key={index}
              className={({ isActive }) =>
                `flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-700 hover:text-white 
                 ${isActive ? 'bg-gray-500 text-white dark:bg-gray-800' : ''}`
              }
              onClick={() => setIsSidebarOpen(false)} // Link bosilganda mobil panel yopiladi
            >
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
