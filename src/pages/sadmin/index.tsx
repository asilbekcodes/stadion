import React from 'react'
import AdminHeader from '@/components/custom/AdminHeader'
import { FaTerminal } from 'react-icons/fa'
import { LuUserCog } from 'react-icons/lu'
import { FiUsers } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const SAdmin : React.FC = () => {
    return (
        <div>
            <AdminHeader title="Admin" pageName="Dashboard" />
            <div>
                <div className="w-64 bg-gray-100 h-screen">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/sadmin/sadmindashboard" className='flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300 gap-5 font-semibold items-center'><FaTerminal />Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/sadmin/sadminmaster" className='flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300 gap-5 font-semibold items-center'><LuUserCog /> Master</Link>
                            </li>
                            <li>
                                <Link to="/sadmin/sadminclient" className='flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300 gap-5 font-semibold items-center'><FiUsers />Clients</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default SAdmin