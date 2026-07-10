import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import health from '../assets/svgs/health.svg';
import money from '../assets/svgs/money.svg';
import medicbag from '../assets/svgs/medicbag.svg';

const Dashboard = () => {
  const [inventoryCount, setInventoryCount] = useState(0);
  const [transactionData, setTransactionData] = useState({ 
    totalQuotation: 0, 
    transactionCount: 0 
  });
  const [isInventoryLoading, setIsInventoryLoading] = useState(true);
  const [isTransactionLoading, setIsTransactionLoading] = useState(true);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch inventory count
        const inventoryResponse = await fetch('http://localhost:5000/api/get-inventory', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (!inventoryResponse.ok) throw new Error('Inventory fetch failed');
        const inventoryData = await inventoryResponse.json();
        setInventoryCount(inventoryData.count);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsInventoryLoading(false);
      }

      try {
        // Fetch transaction data
        const transactionResponse = await fetch('http://localhost:5000/api/total-transactions', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (!transactionResponse.ok) throw new Error('Transaction data fetch failed');
        const transactionData = await transactionResponse.json();
        
        setTransactionData({
          totalQuotation: transactionData.total_quotation,
          transactionCount: transactionData.transaction_count
        });
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsTransactionLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className='bg-[#f4f5f7] w-full h-full'>
      <div className='bg-white px-10 py-6 shadow-md'>
        <div className='flex justify-between items-center mb-4'>
          <div>
            <h1 className='text-3xl font-semibold text-gray-800'>Dashboard</h1>
            <h3 className='text-gray-600'>A quick data overview of the Manufacturing process.</h3>
          </div>
          <div>
            <button className='border px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
              Download Reports
            </button>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-6'>
          {/* Revenue Card */}
          <a href='/reports'>
            <div className='bg-white border border-yellow-400 rounded-lg shadow-sm p-4 transition-transform transform hover:scale-105 hover:shadow-lg'>
              <div className='flex flex-col items-center'>
                <div className='bg-yellow-100 p-2 rounded-full mb-2'>
                  <img src={money} alt="Money Icon" className='w-8 h-8' />
                </div>
                <h3 className='text-2xl font-bold text-gray-800'>
                  {isTransactionLoading ? (
                    <Skeleton width={100} height={30} />
                  ) : (
                    formatCurrency(transactionData.totalQuotation)
                  )}
                </h3>
                <p className='font-medium text-gray-600'>Total Revenue</p>
              </div>
              <button className='w-full py-2 mt-4 bg-yellow-100 text-yellow-600 font-semibold rounded-b'>
                View Financial Report
              </button>
            </div>
          </a>

          {/* Medicines Available Card */}
          <a href='/inventory'>
            <div className='bg-white border border-blue-400 rounded-lg shadow-sm p-4 transition-transform transform hover:scale-105 hover:shadow-lg'>
              <div className='flex flex-col items-center'>
                <div className='bg-blue-100 p-2 rounded-full mb-2'>
                  <img src={medicbag} alt="Medicbag Icon" className='w-7 h-7' />
                </div>
                <h3 className='text-2xl font-bold text-gray-800'>
                  {isInventoryLoading ? (
                    <Skeleton width={50} height={30} />
                  ) : (
                    inventoryCount
                  )}
                </h3>
                <p className='font-medium text-gray-600'>Medicines Available</p>
              </div>
              <button className='w-full py-2 mt-4 bg-blue-100 text-blue-600 font-semibold rounded-b'>
                Visit Inventory
              </button>
            </div>
          </a>
        </div>
      </div>

      <div className='px-10 py-6 grid grid-cols-2 gap-6'>
        {/* Inventory Section */}
        <div className='bg-white border border-gray-200 rounded-lg shadow-md p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-2xl font-semibold text-gray-900'>Inventory</h3>
            <a href='/inventory' className='text-blue-700 cursor-pointer'>Go to Inventory &gt;</a>
          </div>
          <div className='flex justify-between'>
            <div className='text-left'>
              <h3 className='text-3xl font-bold text-gray-800'>
                {isInventoryLoading ? (
                  <Skeleton width={80} height={40} />
                ) : (
                  inventoryCount
                )}
              </h3>
              <p className='text-lg text-gray-500'>Total no of Medicines</p>
            </div>
          </div>
        </div>

        {/* Transaction Summary Section */}
        <div className='bg-white border border-gray-200 rounded-lg shadow-md p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-2xl font-semibold text-gray-900'>Transaction Summary</h3>
            <span className='text-gray-500'>Lifetime Total</span>
          </div>
          <div className='flex justify-between'>
            <div className='text-left'>
              <h3 className='text-3xl font-bold text-gray-800'>
                {isTransactionLoading ? (
                  <Skeleton width={100} height={40} />
                ) : (
                  formatCurrency(transactionData.totalQuotation)
                )}
              </h3>
              <p className='text-lg text-gray-500'>Total Transactions Value</p>
            </div>
            <div className='text-left'>
              <h3 className='text-3xl font-bold text-gray-800'>
                {isTransactionLoading ? (
                  <Skeleton width={50} height={40} />
                ) : (
                  transactionData.transactionCount
                )}
              </h3>
              <p className='text-lg text-gray-500'>Completed Orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;