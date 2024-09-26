// import React, { useEffect } from 'react'
import { FaTerminal } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { LuUserCog } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AdminHeader from '@/components/custom/AdminHeader'
import { Button } from '@/components/ui/button'
import Tables from '@/components/custom/Tables'
// import { useGlobalFunction } from '@/helpers/function/global-function'
// import { swaggerUrl } from '@/helpers/api/swagger-url'
// import { config } from 'process'
// import { TableTypes } from '@/helpers/interface/types'

const dashboardmas: React.FC = () => {
    const { pathname } = useLocation()
    // const RejectedMaster = useGlobalFunction(
    //     `${swaggerUrl}api/v1/user/rejected/list`,
    //     'get',
    //     undefined,
    //     config
    // )
    // useEffect(() => {
    //     const fetchRejectedMaster = async () => {
    //         await RejectedMaster.globalDataFunc();
    //     };

    //     fetchRejectedMaster();
    // }, []);

    // if (RejectedMaster.loading) {
    //     return <p>Loading...</p>
    // }
    // if (RejectedMaster.error) {
    //     return <p>error</p>
    // }
    // console.log(RejectedMaster.response);
    

  return (
    <div>
        <AdminHeader pageName="Masters" title="Admin"/>
        <div className='flex gap-8'>
            <div>
                <div className="w-64 bg-gray-100 h-screen">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/sadmin/sadmindashboard"  className='flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300 gap-5 font-semibold items-center'><FaTerminal />Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/sadmin/sadminmaster" className={`${pathname === 'sadmin/sadminmaster' ? 'bg-gray-300' : 'bg-gray-300'} flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300  gap-5 font-semibold items-center`}><LuUserCog /> Master</Link>
                            </li>
                            <li>
                                <Link to="/sadmin/sadminclient" className='flex p-4 active:w-full active:bg-gray-300 hover:w-full hover:bg-gray-300 gap-5 font-semibold items-center'><FiUsers />Clients</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div>
                <div className='my-5'>
                    <Button variant="outline" className='mr-5'>Confirmed Masters</Button>
                    <Button variant="outline">Not Confirmed Masters</Button>
                </div>
                <div>
                    {/* {RejectedMaster.response && Array.isArray(RejectedMaster.response) && RejectedMaster.response.map((item: TableTypes) =>
                        <Tables firstName={item.firstName} lastName={item.lastName} phoneNumber={item.phoneNumber} />
                    )} */}
                    <Tables firstName="John" lastName="Doe" phoneNumber="1234567890"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default dashboardmas