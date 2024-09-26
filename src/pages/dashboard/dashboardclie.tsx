import React from 'react'
import { FaTerminal } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { LuUserCog } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AdminHeader from '@/components/custom/AdminHeader'

const dashboardclie: React.FC = () => {
    const { pathname } = useLocation()

    return (
        <div>
            <AdminHeader pageName="Clients" title="Admin" />
            <div>
                <div>
                    <div className="w-64 bg-gray-100 h-screen">
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/sadmin/sadmindashboard" className='flex p-4 active:w-full active:bg-gray-400 hover:w-full hover:bg-gray-400 gap-5 font-semibold items-center'><FaTerminal />Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/sadmin/sadminmaster" className='flex p-4 active:w-full active:bg-gray-400 hover:w-full hover:bg-gray-400  gap-5 font-semibold items-center'><LuUserCog /> Master</Link>
                                </li>
                                <li>
                                    <Link to="/sadmin/sadminclient" className={`${pathname === '/sadmin/sadmindashboard' ? 'bg-gray-400 text-white' : 'bg-gray-400 text-white'} flex p-4 active:w-full active:bg-gray-400 hover:w-full hover:bg-gray-400 gap-5 font-semibold items-center`} ><FiUsers />Clients</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default dashboardclie