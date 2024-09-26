import React from 'react'
import { FaTerminal } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { LuUserCog } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AdminHeader from '@/components/custom/AdminHeader'

const dashboardmas: React.FC = () => {
    const { pathname } = useLocation()

    return (
        <div>
            <AdminHeader pageName="Masters" title="Admin" />
            <div className='flex'>
                <div>
                    <div>
                        <div className="w-64 bg-gray-100 h-screen">
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/sadmin/sadmindashboard" className='flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300 gap-5 font-semibold items-center'><FaTerminal />Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/sadmin/sadminmaster" className={`${pathname === '/sadmin/sadminmaster' ? 'bg-gray-300' : 'bg-gray-300'} flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300  gap-5 font-semibold items-center`}><LuUserCog /> Master</Link>
                                    </li>
                                    <li>
                                        <Link to="/sadmin/sadminclient" className='flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300 gap-5 font-semibold items-center'><FiUsers />Clients</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className='p-8'>
                    <div className='flex space-x-4 items-center'>
                        <Link to={"/sadmin/sadminmasterconfirmedmas"}>
                            <p className={`${pathname === '/sadmin/sadminmaster' && '/sadmin/sadminmasterconfirmedmas' ? 'bg-gray-300' : 'bg-gray-300'} rounded-sm text-md font-semibold p-2`}>Confirmed Masters</p>
                        </Link>
                        <Link to={"/sadmin/sadminmasternotconfirmedmas"}>
                            <p className={`${pathname === '/sadmin/sadminmasternotconfirmedmas' ? 'bg-gray-300' : 'bg-white'} rounded-sm text-md font-semibold p-2`}>Not Confirmed Masters</p>
                        </Link>
                    </div>
                    <div>
                        masters
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dashboardmas