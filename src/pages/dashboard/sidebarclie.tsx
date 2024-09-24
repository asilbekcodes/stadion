import React from 'react'
import { FaTerminal } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { LuUserCog } from 'react-icons/lu'
import { Link } from 'react-router-dom'

const SidebarClient: React.FC = () => {
    return (
        <div>
            <div className="w-64 bg-gray-100 h-screen">
                <nav>
                    <ul>
                        <li>
                            <Link to="/sadmin/sadmindashboard" className='flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300 gap-5 font-semibold items-center'><FaTerminal />Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/sadmin/sadminmaster" className='flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300  gap-5 font-semibold items-center'><LuUserCog /> Master</Link>
                        </li>
                        <li>
                            <Link to="/sadmin/sadminclient" className='flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300 bg-gray-300 gap-5 font-semibold items-center'><FiUsers />Clients</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default SidebarClient