// import React from 'react'
import Buttons from "../../components/Buttons"
import Navbar from "../../components/Client/Navbar"

const ClintIsm_familiya = () => {
    return (
        <div>
            <div className="bg-gray-50 h-screen">
                <div className="p-4 block lg:hidden">
                    <Buttons text={"Avtorizatsiya"}/>
                </div>
                <div className="hidden lg:block">
                    <Navbar />
                </div>
                <div className=" lg:flex justify-center flex-col items-center h-[80%]">
                <div className="p-4 flex-col lg:w-[500px] lg:flex lg:justify-center flex gap-5">
                    <h1>Ismingiz va familiyangizni kiriting :</h1>
                    <input type="text" placeholder="Ismingiz" className="border bg-gray-100 border-gray-300 rounded-lg p-2 w-full" />
                    <input type="text" placeholder="Familiyangiz" className="border bg-gray-100 border-gray-300 rounded-lg p-2 w-full" />
                    <button className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">Tasdiqlash</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ClintIsm_familiya