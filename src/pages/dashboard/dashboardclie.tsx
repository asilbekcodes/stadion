import React, { useState } from 'react'
import { FaTerminal } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { LuUserCog } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AdminHeader from '@/components/custom/AdminHeader'

const DashboardClient: React.FC = () => {
    const { pathname } = useLocation()
    const [isOpen, setIsOpen] = useState(true);

    // Sidebar toggle function
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <AdminHeader pageName="Clients" title="Admin" toggleSidebar={toggleSidebar} />
            <div className="flex">
                {/* Sidebar */}
                <div className={`transition-width duration-300 ${isOpen ? 'w-64' : 'w-16'} bg-gray-100 h-screen`}>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/sadmin/sadmindashboard" className={`flex p-4 gap-5 font-semibold items-center`}>
                                    <FaTerminal /> {isOpen && 'Dashboard'}
                                </Link>
                            </li>
                            <li>
                                <Link to="/sadmin/sadminmaster" className={`flex p-4 gap-5 font-semibold items-center`}>
                                    <LuUserCog /> {isOpen && 'Master'}
                                </Link>
                            </li>
                            <li>
                                <Link to="/sadmin/sadminclient" className={`${pathname === '/sadmin/sadminclient' ? 'bg-gray-400 text-white' : 'bg-gray-300 text-white'} flex p-4 gap-5 font-semibold items-center`}>
                                    <FiUsers /> {isOpen && 'Clients'}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Main content */}
                <div className="flex-1 pr-8">
                    {/* Content for Clients goes here */}
                </div>
            </div>
        </div>
    )
}

export default DashboardClient;
