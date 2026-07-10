import React from 'react';
import { ReactSVG } from 'react-svg';

// Import SVGs
import pendingIcon from '../../assets/svgs/pending.svg';
import dispatchedIcon from '../../assets/svgs/dispatched.svg';

const Orders = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <p className="text-gray-600">List of pending/dispatched orders.</p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Pending Orders Card */}
        <div className="bg-white border border-blue-200 rounded-lg shadow p-6 flex flex-col items-center">
          <ReactSVG
            src={pendingIcon}
            className="w-12 h-12 mb-4" // Adjust SVG size
          />
          <h2 className="text-3xl font-bold text-gray-800">5</h2>
          <p className="font-semibold text-gray-600">Pending Orders</p>
          <a href='/pendingordersD' className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition">
            View Full List &gt;&gt;
          </a>
        </div>

        {/* Dispatched Orders Card */}
        <div className="bg-white border border-green-200 rounded-lg shadow p-6 flex flex-col items-center">
          <ReactSVG
            src={dispatchedIcon}
            className="w-12 h-12 mb-4" // Adjust SVG size
          />
          <h2 className="text-3xl font-bold text-gray-800">18</h2>
          <p className="font-semibold text-gray-600">Dispatched Orders</p>
          <a href='/dispatchedordersD' className="mt-4 px-4 py-2 bg-green-100 text-green-600 rounded hover:bg-green-200 transition">
            View Full List &gt;&gt;
          </a>
        </div>
      </div>
    </div>
  );
};

export default Orders;
