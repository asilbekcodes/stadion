import React from 'react'
import { FaTerminal } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { LuUserCog } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AdminHeader from '@/components/custom/AdminHeader'
import ChartOrder from '@/components/custom/ChartOrder'
import ChartPrice from '@/components/custom/ChartPrice'
import ChartClient from '@/components/custom/ChartClient'

const dashboard: React.FC = () => {
    const { pathname } = useLocation()

    return (
        <div>
            <AdminHeader pageName="Dashboard" title="Admin" />
            <div className='flex'>
                <div>
                    <div className="w-64 bg-gray-100 h-screen">
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/sadmin/sadmindashboard" className={`${pathname === '/sadmin/sadmindashboard' ? 'bg-gray-300' : 'bg-gray-300'} flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300 gap-5 font-semibold items-center`} ><FaTerminal />Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/sadmin/sadminmaster" className='flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300  gap-5 font-semibold items-center'><LuUserCog /> Master</Link>
                                </li>
                                <li>
                                    <Link to="/sadmin/sadminclient" className='flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300  gap-5 font-semibold items-center'><FiUsers />Clients</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className='w-full relative px-16 py-4'>
                    <form className='flex text-end absolute right-16 items-center gap-3'>
                        <label htmlFor="search" className='text-md font-semibold'>Enter Year:</label>
                        <input type="number" className='p-2 text-gray-900 border shadow-md border-gray-300 rounded-lg font-semibold bg-white text-xs focus:ring-blue-500 focus:border-blue-500' />
                    </form>
                    <div className='flex justify-between items-center'>
                        <ChartOrder/>
                        <ChartPrice/>
                        <ChartClient/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dashboard