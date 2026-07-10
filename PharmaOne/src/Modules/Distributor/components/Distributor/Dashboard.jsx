import React from 'react';
import { ReactSVG } from 'react-svg';
import { useEffect, useState } from 'react';

// Import SVGs
import truckIcon from '../../assets/svgs/truck.svg';
import boxIcon from '../../assets/svgs/box.svg';
import clockIcon from '../../assets/svgs/clock.svg';

const Dashboard = () => {

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        // Redirect to the returned dashboard
        window.location.href = data.dashboard;
      } else if (response.status === 403) {
        if (data.status === 'verification_pending') {
          window.location.href = '/notverified';
        } else if (data.status === 'rejected') {
          window.location.href = '/rejected';
        }
      } else {
        alert(data.message); // "Invalid email or password"
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  
  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div className='w-full h-full p-6 bg-gray-100'>
      {/* Header Section */}
      <div className='bg-white shadow-lg rounded-lg p-6 mb-8'>
        <div className='flex justify-between items-center mb-5'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>Distributor Dashboard</h1>
            <h3 className='text-gray-600'>A quick data overview of the distribution process.</h3>
          </div>
          <div>
            <button className='px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition'>
              Download Reports
            </button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className='grid grid-cols-3 gap-6'>
        {/* Active Orders */}
        <a href="/ordersD" className='w-full'>
          <div className='bg-white flex flex-col items-center border border-blue-200 rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-300'>
            <img src={truckIcon} alt="Truck Icon" className='w-13 mb-5' />
            <h3 className='text-3xl font-bold text-gray-800'>75</h3>
            <p className='font-semibold text-gray-600 text-center'>Active Orders</p>
            <div className='w-full mt-4 py-2 bg-blue-50 text-center rounded'>
              <p className='text-blue-600 font-semibold hover:underline'>View Detailed Report</p>
            </div>
          </div>
        </a>

        {/* Total Products in Stock */}
        <a href="/inventoryD" className='w-full'>
          <div className='bg-white flex flex-col items-center border border-green-200 rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-300'>
            <img src={boxIcon} alt="Box Icon" className='w-13 mb-5' />
            <h3 className='text-3xl font-bold text-gray-800'>5,000</h3>
            <p className='font-semibold text-gray-600 text-center'>Total Products in Stock</p>
            <div className='w-full mt-4 py-2 bg-green-50 text-center rounded'>
              <p className='text-green-600 font-semibold hover:underline'>View Detailed Report</p>
            </div>
          </div>
        </a>

        {/* On-Time Delivery Rate */}
        <a href="/shipmentD" className='w-full'>
          <div className='bg-white flex flex-col items-center border border-yellow-200 rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-300'>
            <img src={clockIcon} alt="Clock Icon" className='w-13 mb-5' />
            <h3 className='text-3xl font-bold text-gray-800'>92%</h3>
            <p className='font-semibold text-gray-600 text-center'>On-Time Delivery Rate</p>
            <div className='w-full mt-4 py-2 bg-yellow-50 text-center rounded'>
              <p className='text-yellow-600 font-semibold hover:underline'>View Detailed Report</p>
            </div>
          </div>
        </a>
      </div>
      </div>

      {/* Additional Sections */}
      <div className='grid grid-cols-2 gap-6'>
        <div className='bg-white shadow-lg rounded-lg p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-xl font-bold text-gray-800'>Inventory Overview</h3>
            <a href='/InventoryOverviewD' className='text-blue-600 hover:underline'>Go to Inventory &gt;</a>
          </div>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-2xl font-bold text-gray-800'>8,500</h3>
              <p className='font-semibold text-gray-600'>Total Orders Completed</p>
            </div>
            <div>
              <h3 className='text-2xl font-bold text-gray-800'>150</h3>
              <p className='font-semibold text-gray-600'>Products to be Restocked</p>
            </div>
          </div>
        </div>

        <div className='bg-white shadow-lg rounded-lg p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-xl font-bold text-gray-800'>Financial Overview</h3>
            <a href='/financialsD' className='text-blue-600 hover:underline'>Go to Financials &gt;</a>
          </div>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-2xl font-bold text-gray-800'>Rs. 12,45,000</h3>
              <p className='font-semibold text-gray-600'>Total Revenue</p>
            </div>
            <div>
              <h3 className='text-2xl font-bold text-gray-800'>Rs. 35,000</h3>
              <p className='font-semibold text-gray-600'>Total Discounts Given</p>
            </div>
          </div>
        </div>

        <div className='bg-white shadow-lg rounded-lg p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-xl font-bold text-gray-800'>Shipment Performance</h3>
            <a href='/shipmentD' className='text-blue-600 hover:underline'>Go to Shipments &gt;</a>
          </div>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-2xl font-bold text-gray-800'>2 Days</h3>
              <p className='font-semibold text-gray-600'>Average Delivery Time</p>
            </div>
            <div>
              <h3 className='text-2xl font-bold text-gray-800'>8</h3>
              <p className='font-semibold text-gray-600'>Delivery Issues</p>
            </div>
          </div>
        </div>

        <div className='bg-white shadow-lg rounded-lg p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-xl font-bold text-gray-800'>Supplier Management</h3>
            <a href='/supplierD' className='text-blue-600 hover:underline'>Go to Suppliers &gt;</a>
          </div>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-2xl font-bold text-gray-800'>10</h3>
              <p className='font-semibold text-gray-600'>Total Suppliers</p>
            </div>
            <div>
              <h3 className='text-2xl font-bold text-gray-800'>2</h3>
              <p className='font-semibold text-gray-600'>Contracts Due for Renewal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
