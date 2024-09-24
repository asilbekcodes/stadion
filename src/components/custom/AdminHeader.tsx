import React from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { LuUserCircle2 } from 'react-icons/lu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaChevronDown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface Props {
  title: string
  pageName: string
}

const Header: React.FC<Props> = ({ title, pageName }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className="w-full mb-[0.5px] bg-gray-100 shadow px-[30px] p-4 flex justify-between items-center">
      {/* Left: Hamburger Menu */}
      <div className="flex items-center space-x-6">
        {/* Hamburger Icon */}
        <BiMenuAltLeft className='text-xl ml-48' />

        {/* Dashboard Title */}
        <h1 className="text-md font-semibold text-gray-800">{pageName}</h1>
      </div>

      {/* Right: Admin Profile Section */}
      <div className="flex items-center space-x-3">
        <span className="text-gray-800 font-semibold">{title}</span>
        <div className="relative flex space-x-3">
          {/* Profile Icon */}

          <LuUserCircle2 className='text-xl' />
          {/* Dropdown Arrow */}
          <DropdownMenu>
            <DropdownMenuTrigger><FaChevronDown /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header