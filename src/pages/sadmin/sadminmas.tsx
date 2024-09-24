import React from 'react'
import AdminHeader from '@/components/custom/AdminHeader'
import SiderbarMaster from '../dashboard/sidebarmas'

const sadminMaster: React.FC = () => {
    return (
        <div>
            <AdminHeader title="Admin" pageName="Dashboard" />
            <div>
                <SiderbarMaster />
            </div>
        </div>
    )
}

export default sadminMaster