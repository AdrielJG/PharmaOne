import React from 'react';

const Notification = () => {
  return (
    <div className='p-8 flex-1'>
      <h2 className='text-2xl font-semibold mb-6'>New for you</h2>
      <div className='space-y-6'>
        <div className='flex justify-between items-center p-4 bg-white shadow rounded'>
          <div className='flex items-center gap-4'>
            <div className='text-[#FED600]'>📦</div>
            <div>
              <p className='font-medium'>Distribution</p>
              <p className='text-sm text-gray-500'>Bender Rodriguez - DesignDrops - Mar 4</p>
            </div>
          </div>
          <div className='text-blue-600'>Mark as read</div>
        </div>
        {/* Repeat similar blocks for other notifications */}
      </div>
    </div>
  );
};

export default Notification;
