import { FaChartPie, FaClipboardList, FaMoneyCheckAlt, FaPlusCircle, FaUserCircle, } from 'react-icons/fa'
import { TbCalendarTime } from "react-icons/tb";
import { NavLink, useLocation } from 'react-router-dom'
import { AiOutlineLineChart } from "react-icons/ai";

const Sidebar = () => {
  const { pathName } = useLocation()
  const data = [
    {
      icon: <FaChartPie />,
      title: 'Dashboard',
      pathName: 'dashboard',
    },
    {
      icon:  <FaPlusCircle />,
      title: 'Stadion Qo\'shish',
      pathName: 'stadionAdd',

    },
    {
      icon: <AiOutlineLineChart/>,
      title: 'Statistika',
      pathName: 'statistika',
    },
    {
      icon: <FaClipboardList />,
      title: 'Orders',
      pathName: 'orders',

    },
    {
      icon: <TbCalendarTime />,
      title: 'Times',
      pathName: 'times',
    },
    {
      icon: <FaUserCircle />,
      title: 'Profil',
      pathName: 'profil',

    },
  ]
  return (
    <div className='bg-gray-100 text-gray-900 h-screen p-4 fixed w-16 md:w-64 border-r border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-600'>
    <h1 className='text-2xl font-bold hidden md:block mt-4 text-center italic'>Admin</h1>
    <ul className='flex flex-col mt-5 text-xl'>
      {
        data.map((item, index) => (
          <NavLink 
            to={`/${item.pathName}`} 
            key={index} 
            className={({ isActive }) =>
              `flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-700 hover:text-white 
               ${isActive ? 'bg-gray-500 text-white dark:bg-gray-800' : ''}`
            }>
            {item.icon}
            <span className='hidden md:inline'>{item.title}</span>
          </NavLink>
        ))
      }
    </ul>
</div>
  )
}

export default Sidebar