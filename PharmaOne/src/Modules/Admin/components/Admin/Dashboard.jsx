import React, { useState, useEffect } from 'react';
import compliant from '../../assets/svgs/compliant.svg';
import total from '../../assets/svgs/Total.svg';
import medicbag from '../../assets/svgs/medicbag.svg';
import shield from '../../assets/svgs/Shield.svg';

const Dashboard = () => {
  const [userStats, setUserStats] = useState(null);
  const [inventoryData, setInventoryData] = useState(null);
  const [pharmData, setPharmData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user stats
        const statsResponse = await fetch('http://localhost:5000/api/user-stats');
        const statsData = await statsResponse.json();
        setUserStats(statsData);

        // Fetch inventory data with credentials
        const inventoryResponse = await fetch('http://localhost:5000/api/get-inventory-all', {
          credentials: 'include' // Required for session cookies
        });
        if (!inventoryResponse.ok) throw new Error('Inventory fetch failed');
        const inventoryJson = await inventoryResponse.json();
        console.log(inventoryJson);
        setInventoryData(inventoryJson);

        const pharmResponse = await fetch('http://localhost:5000/api/get-pharinventory-all', {
          credentials: 'include' // Required for session cookies
        });
        if (!pharmResponse.ok) throw new Error('P-Inventory fetch failed');
        const pharmJson = await pharmResponse.json();
        console.log(pharmJson);
        setPharmData(pharmJson.pharmacies);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-full h-full bg-gray-100'>
      <div className='bg-white-200 px-10 py-10'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>Dashboard</h1>
            <h3 className='text-gray-600'>A quick data overview of the inventory.</h3>
          </div>
          <div>
            <button className='border px-4 py-2 bg-white border-gray-500 rounded hover:bg-gray-200'>
              Download Reports
            </button>
          </div>
        </div>

        <div className='w-full flex gap-8'>
          <a href="/userreportA" className='w-full'>
            <div className='bg-white flex flex-col items-center border-2 border-green-400 rounded-lg w-full overflow-hidden p-5 gap-2 transition-transform transform hover:scale-105 hover:shadow-lg'>
              <img src={compliant} alt="Compliant Icon" className='w-13 mb-5' />
              <h3 className='text-2xl font-bold text-gray-800'>
                {userStats?.activeUsers?.toLocaleString() ?? 'Loading...'}
              </h3>
              <p className='font-semibold text-gray-600 leading-none mb-4'>Total Active Users</p>
              <div className='w-full py-2 bg-green-200 text-green-600 text-center'>
                <p className='font-semibold'><u>View Detailed Report</u></p>
              </div>
            </div>
          </a>          
          <a href="/medicineA" className='w-full'>
            <div className='bg-white flex flex-col items-center border-2 border-yellow-400 rounded-lg w-full overflow-hidden p-5 gap-2 transition-transform transform hover:scale-105 hover:shadow-lg'>
              <img src={total} alt="Total Icon" className='w-11 mb-4' />
              <h3 className='text-2xl font-bold text-gray-800'>
                {pharmData && pharmData.length > 0 && inventoryData
                ? (pharmData[0].total_quantity + inventoryData.total_quantity).toLocaleString()
                : 'Loading...'}              </h3>
              <p className='font-semibold text-gray-600 text-center text-sm leading-tight mb-3'>
                Total Inventory Items
              </p>
              <div className='w-full py-2 bg-yellow-200 text-yellow-600 text-center'>
                <p className='font-semibold'><u>View Details</u></p>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className='px-10 py-10'>
        <div className='grid grid-cols-2 gap-8'>
          <div className='border bg-white rounded-lg shadow-md'>
            <div className='px-5 py-4 flex items-center justify-between border-b'>
              <h3 className='text-xl font-bold text-gray-800'>User Management</h3>
              <a href='/inventoryA' className='text-blue-600 hover:underline cursor-pointer'>Go to User Detail &gt;</a>
            </div>
            <div className='px-5 py-6 flex'>
              <div className='w-1/2 text-left'>
                <h3 className='text-2xl font-bold text-gray-800'>{userStats?.activeUsers?.toLocaleString() ?? 'Loading...'}</h3>
                <p className='font-semibold text-gray-600'>Active Users</p>
              </div>
              <div className='w-1/2 text-left'>
                <h3 className='text-2xl font-bold text-gray-800'>{userStats?.inactiveUsers?.toLocaleString() ?? 'Loading...'}</h3>
                <p className='font-semibold text-gray-600'>Inactive Users</p>
              </div>
            </div>
          </div>

          <div className='border bg-white rounded-lg shadow-md'>
            <div className='px-5 py-4 flex items-center justify-between border-b'>
              <h3 className='text-xl font-bold text-gray-800'>Inventory Details</h3>
              <span className='text-gray-600'>Medicine Quantity</span>
            </div>
            <div className='px-5 py-6 flex'>
              <div className='w-1/2 text-left'>
                <h3 className='text-2xl font-bold text-gray-800'>{inventoryData?.total_quantity?.toLocaleString() ?? 'Loading...'}</h3>
                <p className='font-semibold text-gray-600'>Manufacturer</p>
              </div>
              <div className='w-1/2 text-left'>
                <h3 className='text-2xl font-bold text-gray-800'>
                  <h3 className='text-2xl font-bold text-gray-800'>
                    {pharmData && pharmData.length > 0 
                      ? pharmData[0].total_quantity.toLocaleString() 
                      : 'Loading...'}
                  </h3>
                </h3>
                <p className='font-semibold text-gray-600'>Pharmacy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;