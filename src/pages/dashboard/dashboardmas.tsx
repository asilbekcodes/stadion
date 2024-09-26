import React from 'react'
import { FaTerminal } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { LuUserCog } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AdminHeader from '@/components/custom/AdminHeader'
import { Button } from '@/components/ui/button'
import Tables from '@/components/custom/MasterTables'

const dashboardmas: React.FC = () => {
    const { pathname } = useLocation()

    return (
        <div>

            <div>
                <AdminHeader pageName="Masters" title="Admin" />
                <div className='flex gap-8'>
                    <div>
                        <div className="w-64 bg-gray-100 h-screen">
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/sadmin/sadmindashboard" className='flex p-4 active:w-full active:bg-gray-400 hover:w-full hover:bg-gray-400 gap-5 font-semibold items-center'><FaTerminal />Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/sadmin/sadminmaster" className={`${pathname === 'sadmin/sadminmaster' ? 'bg-gray-400 text-white' : 'bg-gray-400 text-white'} flex p-4 active:w-full active:bg-gray-400 hover:w-full hover:bg-gray-400  gap-5 font-semibold items-center`}><LuUserCog /> Master</Link>
                                    </li>
                                    <li>
                                        <Link to="/sadmin/sadminclient" className='flex p-4 active:w-full active:bg-gray-400 hover:w-full hover:bg-gray-400 gap-5 font-semibold items-center'><FiUsers />Clients</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div>
                        <div className='my-5'>
                            <Link to='/sadmin/sadminmaster'>
                                <Button variant="outline" className='mr-5 bg-gray-200'>Confirmed Masters</Button>
                            </Link>
                            <Link to='/sadmin/sadminmasterr'>
                                <Button variant="outline">Not Confirmed Masters</Button>
                            </Link>
                        </div>
                        <Tables firstName="John" lastName="Doe" phoneNumber="1234567890"  btn="Delete" btn2="Info" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default dashboardmas;