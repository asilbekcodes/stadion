import React from 'react'
import AdminHeader from '@/components/custom/AdminHeader'
import SidebarClient from '../dashboard/sidebarclie'

const SadminClie : React.FC = () => {
    return (
        <div>
            <AdminHeader title="Admin" pageName="Dashboard" />
            <div>
                <SidebarClient />
            </div>
        </div>
    )
}

export default SadminClie