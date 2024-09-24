import React from 'react'
import AdminHeader from '@/components/custom/AdminHeader'
import SidebarDashboard from '../dashboard/sidebardash'

const SadminDash : React.FC = () => {
    return (
        <div>
            <AdminHeader title="Admin" pageName="Dashboard" />
            <div>
                <SidebarDashboard />
            </div>
        </div>
    )
}

export default SadminDash