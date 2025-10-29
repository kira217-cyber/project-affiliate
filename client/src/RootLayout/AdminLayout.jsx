import React from 'react';
import Sidebar from '../AdminComponents/Shared/Sidebar/Sidebar';
import { Outlet } from 'react-router';

const AdminLayout = () => {
    return (
        <div>
            <Sidebar></Sidebar>
        </div>
    );
};

export default AdminLayout;