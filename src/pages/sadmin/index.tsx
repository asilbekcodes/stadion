import React from 'react'
import AdminHeader from '@/components/custom/AdminHeader'
import { Link, useLocation } from 'react-router-dom'
import Dashboard from "../dashboard/dashboard"

const SAdmin: React.FC = () => {
    const { pathname } = useLocation()

    return (
        <div>
            <AdminHeader title="Admin" pageName="Dashboard" />
            <div>
                {/* <div className="w-64 bg-gray-100 h-screen">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/sadmin/sadmindashboard" className={`${pathname === '/sadmin' ? 'bg-gray-300' : 'bg-gray-300'} flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300 gap-5 font-semibold items-center`}><FaTerminal />Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/sadmin/sadminmaster" className='flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300 gap-5 font-semibold items-center'><LuUserCog /> Master</Link>
                            </li>
                            <li>
                                <Link to="/sadmin/sadminclient" className='flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300 gap-5 font-semibold items-center'><FiUsers />Clients</Link>
                            </li>
                        </ul>
                    </nav>
                </div> */}
                <Dashboard/>
            </div>
        </div>
    )
}

export default SAdmin