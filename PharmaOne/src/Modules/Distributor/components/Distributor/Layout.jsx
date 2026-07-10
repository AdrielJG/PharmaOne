// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className='flex'>
      <div className='w-1/4 h-screen fixed'>
        <Sidebar />
      </div>
      <div className='flex-1 ml-[270px] flex flex-col overflow-y-auto h-screen'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
