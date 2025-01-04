import { useContext, useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { BsPersonCircle } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContextProvider'
import axios from 'axios'
import { Adminconfig } from '../../helpers/token/admintoken'
import { baseUrl } from '../../helpers/api/baseUrl'

const Navbar = () => {
  const navigate = useNavigate()
   
  function removeItem(){
    localStorage.removeItem("adminToken")
    localStorage.removeItem("role")
    navigate("/") 
    window.location.reload("")
   }
    const {theme, toggleTheme} = useContext(ThemeContext)

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const openMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    const [getSaved , setgetSaved] = useState("")

  const Malumot = ()=>{
    axios.get(`${baseUrl}user/user-info/`,Adminconfig)
    .then(res=>setgetSaved(res.data))
    .catch(err=>console.log(err))
  }
 
  useEffect(()=>{
    Malumot()
  },[])
  return (
    <div className='bg-gray-100 text-gray-900 border-b border-gray-300 px-4 md:px-8 py-4 flex justify-end item-center dark:bg-gray-900 dark:text-white dark:border-gray-600'>
      {/* <h1>Dashboard</h1> */}
      <div className="flex items-center gap-5">
        <button className='text-2xl text-dark' onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
        <button onClick={openMenu} className="flex items-center gap-2 pr-1 text-gray-900 dark:text-white">
          <BsPersonCircle className='text-2xl'/>
          <h1 className='hidden md:inline'>{getSaved.first_name}</h1>
        </button>
        {isMenuOpen && (
          <div className="z-10 absolute top-16 right-2 xl:right-8 bg-white rounded-lg shadow w-44 dark:bg-gray-700 ">
            <Link to={'/profil'}>
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div className="font-medium ">Stadion Admin</div>
                <div className="truncate">{getSaved.phone_number}</div>
              </div>
            </Link>
            <div className='px-[17px]'>
              <hr />
            </div>
            <div className="flex justify-center">
              <button onClick={removeItem} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Tizimdan chiqish</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar