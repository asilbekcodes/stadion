import React, { useState } from 'react'
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/modal"
import { Button } from '../ui/button'

interface Props {
  title: string
  pageName: string
  toggleSidebar: () => void;
}

const Header: React.FC<Props> = ({ title, pageName, toggleSidebar: propsToggleSidebar }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }


  // Toggle funksiyasi menyuni ochadi yoki yopadi
  const handleToggleSidebar = () => {
    propsToggleSidebar();
  };

  return (
    <header className="w-full mb-[0.5px] bg-gray-100 shadow px-[30px] p-4 flex justify-between items-center">
      {/* Left: Hamburger Menu */}
      <div className="flex items-center space-x-6">
        {/* Hamburger Icon */}
        <BiMenuAltLeft cursor={"pointer"} onClick={handleToggleSidebar} className='text-xl ml-48' />

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
                <Dialog>
                  <DialogTrigger className='text-[13px] text-start px-2 py-1 w-[115px] hover:bg-gray-100'>Log Out</DialogTrigger>
                    <DialogContent>
                    <DialogHeader>
                      <DialogTitle className='text-center pt-[30px] text-xl font-bold'>Are you sure log out?</DialogTitle>
                      <DialogDescription className='text-end pt-[80px]'>
                        <DialogClose>
                          <Button  className='bg-red-600 w-[100px] mr-2'>No</Button>  
                        </DialogClose> 
                        <Button onClick={handleLogout} className='bg-green-600 w-[100px]'>Yes</Button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header