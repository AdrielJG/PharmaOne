import React from 'react';
import compliant from '../../assets/svgs/compliant.svg';
import total from '../../assets/svgs/Total.svg';
import medicbag from '../../assets/svgs/medicbag.svg';
import shield from '../../assets/svgs/Shield.svg';

const Dashboard = () => {
  return (
    <div className='w-full h-full bg-gray-100'>
      <div className='bg-stone-200 px-10 py-10'>
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
          <a href="/complianceR" className='w-full'>
            <div className='bg-white flex flex-col items-center border-2 border-green-400 rounded-lg w-full overflow-hidden p-5 gap-2 transition-transform transform hover:scale-105 hover:shadow-lg'>
              <img src={compliant} alt="Compliant Icon" className='w-13 mb-5' />
              <h3 className='text-2xl font-bold text-gray-800'>Compliant</h3>
              <p className='font-semibold text-gray-600 leading-none mb-4'>Entity Status</p>
              <div className='w-full py-2 bg-green-200 text-green-600 text-center'>
                <p className='font-semibold'><u>View Detailed Report</u></p>
              </div>
            </div>
          </a>
          <a href="/reportsR" className='w-full'>
            <div className='bg-white flex flex-col items-center border-2 border-yellow-400 rounded-lg w-full overflow-hidden p-5 gap-2 transition-transform transform hover:scale-105 hover:shadow-lg'>
              <img src={total} alt="Total Icon" className='w-8 mb-2' />
              <h3 className='text-2xl font-bold text-gray-800'>523</h3>
              <p className='font-semibold text-gray-600 text-center text-sm leading-tight mb-4'>Total Compliance Checks:<br />Jan 2024</p>
              <div className='w-full py-2 bg-yellow-200 text-yellow-600 text-center'>
                <p className='font-semibold'><u>View Detailed Report</u></p>
              </div>
            </div>
          </a>
          <a href="/qualityrecR" className='w-full'>
            <div className='bg-white flex flex-col items-center border-2 border-blue-400 rounded-lg w-full overflow-hidden p-5 gap-2 transition-transform transform hover:scale-105 hover:shadow-lg'>
              <img src={shield} alt="Shield Icon" className='w-8 mb-2' />
              <h3 className='text-2xl font-bold text-gray-800'>298</h3>
              <p className='font-semibold text-gray-600 text-center text-sm leading-tight mb-4'>Total Quality Checks:<br />Jan 2024</p>
              <div className='w-full py-2 bg-blue-200 text-blue-600 text-center'>
                <p className='font-semibold'><u>View Detailed Report</u></p>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className='px-10 py-10'>
        <div className='grid grid-cols-2 gap-8'>
          <div className='border bg-white rounded-lg shadow-md'>
            <div className='px-5 py-4 flex items-center justify-between border-b'>
              <h3 className='text-xl font-bold text-gray-800'>Regulations</h3>
              <a href='/reportsR' className='text-blue-600 hover:underline cursor-pointer'>Go to Reports &gt;</a>
            </div>
            <div className='px-5 py-6 flex'>
              <div className='w-1/2 text-left'>
                <h3 className='text-2xl font-bold text-gray-800'>98</h3>
                <p className='font-semibold text-gray-600'>Total no of Entities Monitored</p>
              </div>
              <div className='w-1/2 text-left'>
                <h3 className='text-2xl font-bold text-gray-800'>16</h3>
                <p className='font-semibold text-gray-600'>Supply Groups</p>
              </div>
            </div>
          </div>

          <div className='border bg-white rounded-lg shadow-md'>
            <div className='px-5 py-4 flex items-center justify-between border-b'>
              <h3 className='text-xl font-bold text-gray-800'>Quick Report</h3>
              <span className='text-gray-600'>January 2024</span>
            </div>
            <div className='px-5 py-6 flex'>
              <div className='w-1/2 text-left'>
                <h3 className='text-2xl font-bold text-gray-800'>1063</h3>
                <p className='font-semibold text-gray-600'>Checks Done</p>
              </div>
              <div className='w-1/2 text-left'>
                <h3 className='text-2xl font-bold text-gray-800'>52</h3>
                <p className='font-semibold text-gray-600'>Checks Pending</p>
              </div>
            </div>
          </div>

          <div className='border bg-white rounded-lg shadow-md'>
            <div className='px-5 py-4 flex items-center justify-between border-b'>
              <h3 className='text-xl font-bold text-gray-800'>Compliance</h3>
              <a href='/complianceR' className='text-blue-600 hover:underline cursor-pointer'>Go to Compliance Checks &gt;</a>
            </div>
            <div className='px-5 py-6 flex'>
              <div className='w-1/2 text-left'>
                <h3 className='text-2xl font-bold text-gray-800'>82%</h3>
                <p className='font-semibold text-gray-600'>Current Compliance Rate</p>
              </div>
              <div className='w-1/2 text-left'>
                <h3 className='text-2xl font-bold text-gray-800'>05</h3>
                <p className='font-semibold text-gray-600'>Outstanding Issues</p>
              </div>
            </div>
          </div>

          <div className='border bg-white rounded-lg shadow-md'>
            <div className='px-5 py-4 flex items-center justify-between border-b'>
              <h3 className='text-xl font-bold text-gray-800'>Quality</h3>
              <a href='qualityrecR' className='text-blue-600 hover:underline cursor-pointer'>Go to Quality Checks &gt;</a>
            </div>
            <div className='px-5 py-6 flex'>
              <div className='w-1/2 text-left'>
                <h3 className='text-2xl font-bold text-gray-800'>89%</h3>
                <p className='font-semibold text-gray-600'>Quality Check Pass Rate</p>
              </div>
              <div className='w-1/2 text-left'>
                <h3 className='text-2xl font-bold text-gray-800'>11%</h3>
                <p className='font-semibold text-gray-600'>Defect Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
