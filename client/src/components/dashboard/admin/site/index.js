import React from 'react';
import DashboardLayout from 'hoc/DashboardLayout';
import SiteVars from './SiteVars';

const ManageSite = () => {
    return (
        <DashboardLayout title='Manage site'>
            <SiteVars />
        </DashboardLayout>
    );
};

export default ManageSite;
