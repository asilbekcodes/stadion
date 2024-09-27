import React, { useEffect } from 'react'
import { FaTerminal } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { LuUserCog } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AdminHeader from '@/components/custom/AdminHeader'
import { Button } from '@/components/ui/button'
import Tables from '@/components/custom/MasterTables'
import { swaggerUrl } from '@/helpers/api/swagger-url'
import { useGlobalFunction } from '@/helpers/function/global-function'
import { TableTypes } from '@/helpers/interface/types'
import { config } from '@/helpers/token/token'
import axios from 'axios'

const dashboardmas: React.FC = () => {
    const { pathname } = useLocation()
    // const conMAster = useGlobalFunction(
    //     `${swaggerUrl}api/v1/user/rejected/list`,
    //     'get',
    //     '',
    //     config
    // )
    
    // useEffect(() => {
    //     conMAster.globalDataFunc()
    // }, []);
    
    // if (conMAster.loading) {
    //     return <p>Loading...</p>
    // }
    // if (conMAster.error) {
    //     return <p>error</p>
    // }

    // const [data, setData] = React.useState<any>([])
    // function getData() {
    //     axios.get(`${swaggerUrl}api/v1/user/rejected/list`, config)
    //         .then(res => {
    //             setData(res.data.data.object)

    //         })
    // }


    


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
                        {/* {conMAster.response && Array.isArray(conMAster.response) && conMAster.response.map((item: TableTypes) =>
                        <Tables firstName={item.firstName} lastName={item.lastName} phoneNumber={item.phoneNumber} btn="Delete" btn2="Info"/>
                        )} */}
                        <Tables firstName="" lastName="" phoneNumber=""  btn="" btn2=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default dashboardmas;