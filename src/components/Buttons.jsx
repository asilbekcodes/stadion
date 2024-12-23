import React from 'react'
import { HiChevronLeft } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

function Buttons({ text }) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }
  return (
    <div onClick={goBack} className="p-3 mb-2 flex items-center rounded-lg bg-gray-200 text-gray-500 w-full shadow-sm">
      <HiChevronLeft className="text-lg mr-2" />
      <span className="flex-1 text-center pr-10">{text}</span>
    </div>
  )
}

export default Buttons
