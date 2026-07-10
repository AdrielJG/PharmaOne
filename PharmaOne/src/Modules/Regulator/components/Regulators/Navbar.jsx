import React from 'react';
import { FaGlobe, FaChevronDown, FaSun } from 'react-icons/fa'; // Import icons

const Navbar = () => {
  return (
    <div className='w-full px-10 py-4 bg-white shadow h-16'>
      <div className='w-full flex justify-between items-center h-full'>
        {/* Search Bar */}
        <div className='w-5/12 rounded-md overflow-hidden'>
          <input
            type="text"
            className='w-full px-4 py-2 outline-none bg-gray-200 rounded'
            placeholder="Search for anything here..."
          />
        </div>
        
        {/* Language Selector and Date */}
        <div className='flex items-center space-x-6'>
          {/* Language Selector */}
          <div className='flex items-center space-x-2 cursor-pointer'>
            <FaGlobe />  {/* Globe Icon */}
            <span>English (US)</span>
            <FaChevronDown />  {/* Chevron Down Icon */}
          </div>

          {/* Date, Time, and Greeting */}
          <div className='text-right flex items-center space-x-2'>
            <div className='flex flex-col items-center'>
              <FaSun />  {/* Sun Icon */}
            </div>
            <div>
              <div className='text-sm flex items-center'>
                <span>Good Morning</span>
              </div>
              <div className='text-xs text-gray-500'>14 January 2022 · 22:45:04</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
