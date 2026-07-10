import React, { useState } from 'react';

const DispatchedOrders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [productStatus, setProductStatus] = useState('Received');

  const openModal = (info) => {
    setTrackingInfo(info);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTrackingInfo(null);
  };

  const handleStatusChange = (e) => {
    setProductStatus(e.target.value);
  };

  return (
    <div className='p-8 flex-1'>
      <h2 className='text-3xl font-bold mb-6 text-gray-800'>
        Orders &gt; <span className="text-gray-600">Dispatched Orders</span>
      </h2>
      <p className='text-sm text-gray-500 mb-4'>
        List of medicines whose checks are either completed or in progress
      </p>
      <div className='mb-6'>
        <input
          type="text"
          placeholder="Search Medicine Groups.."
          className="px-4 py-2 border border-gray-300 rounded-lg w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
        />
      </div>
      <div className='bg-white shadow rounded-lg'>
        <table className='w-full'>
          <thead className='bg-gray-100 border-b'>
            <tr>
              <th className='p-4 text-left text-gray-700'>Medicine Name</th>
              <th className='p-4 text-left text-gray-700'>Medicine ID</th>
              <th className='p-4 text-left text-gray-700'>Destination</th>
              <th className='p-4 text-left text-gray-700'>Status</th>
              <th className='p-4 text-left text-gray-700'>Dispatch Date</th>
              <th className='p-4 text-left text-gray-700'>Tracking Info</th>
              <th className='p-4 text-left text-gray-700'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b'>
              <td className='p-4 text-gray-800'>Augmentin 625 Duo Tablet</td>
              <td className='p-4 text-gray-600'>D06ID232435454</td>
              <td className='p-4 text-gray-600'>Distributor B</td>
              <td className='p-4 text-green-600 font-semibold'>In Transit</td>
              <td className='p-4 text-gray-600'>08-07-2024</td>
              <td className='p-4 text-blue-600'>
                <button onClick={() => openModal("Tracking info for Augmentin 625 Duo Tablet")} className="text-[#00BFFF] hover:underline">
                  Track
                </button>
              </td>
              <td className='p-4'>
                <a href='//medicine/:id' className='text-[#00BFFF] hover:underline'>View Full Detail</a>
              </td>
            </tr>
            <tr className='border-b'>
              <td className='p-4 text-gray-800'>Ascoril LS Syrup</td>
              <td className='p-4 text-gray-600'>D06ID232435452</td>
              <td className='p-4 text-gray-600'>Pharmacy</td>
              <td className='p-4 text-green-600 font-semibold'>In Transit</td>
              <td className='p-4 text-gray-600'>04-07-2024</td>
              <td className='p-4 text-blue-600'>
                <button onClick={() => openModal("Tracking info for Ascoril LS Syrup")} className="text-[#00BFFF] hover:underline">
                  Track
                </button>
              </td>
              <td className='p-4'>
                <button className='text-[#00BFFF] hover:underline'>View Full Detail</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='flex justify-between items-center mt-4'>
        <span className="text-gray-600">Showing 1-2 results of 298</span>
        <div>
          <button className='py-2 px-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 shadow-sm'>
            Page 01
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full mx-4">
            <nav className="text-sm text-gray-500 mb-6">
              <a href="#" className="hover:underline">Home</a> &gt; 
              <a href="#" className="hover:underline"> Orders </a> &gt; 
              ID 3354654654526
            </nav>
            
            <h1 className="text-2xl font-bold mb-2 text-gray-800">Order ID: 3354654654526</h1>
            <p className="text-sm text-gray-600 mb-2">Order date: Feb 16, 2022</p>
            <p className="text-sm text-green-500 font-semibold mb-6">Estimated delivery: May 16, 2022</p>
            
            <div className="flex justify-between items-center mb-6">
              <div className="text-center">
                <p className="font-semibold text-[#00BFFF]">Order Confirmed</p>
                <p className="text-sm text-gray-600">Wed, 11th Jan</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">Shipped</p>
                <p className="text-sm text-gray-600">Wed, 11th Jan</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">Out For Delivery</p>
                <p className="text-sm text-gray-600">Wed, 11th Jan</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">Delivered</p>
                <p className="text-sm text-gray-600">Expected by, Mon 16th</p>
              </div>
            </div>

            <hr className="mb-6"/>
            <div className="flex items-center mb-6">
              <img src="https://via.placeholder.com/80" alt="Product" className="w-20 h-20 object-cover rounded-lg mr-4"/>
              <div>
                <h2 className="font-semibold text-gray-800">Ascoril LS Syrup</h2>
                <p className="text-lg font-semibold mt-2 text-gray-800">$259.00 <span className="text-sm text-gray-600">Qty: 2</span></p>
              </div>
            </div>

            <hr className="mb-6"/>
            <div className="mb-6">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800">Payment</h3>
                <p className="text-gray-500">Visa ****56</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Delivery</h3>
                <address className="not-italic text-gray-500">
                  847 Jewess Bridge Apt.<br/>
                  174 London, UK<br/>
                  474-769-3919
                </address>
              </div>
            </div>

            <hr className="mb-6"/>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-semibold text-gray-800">Need Help</h3>
                <ul className="text-[#00BFFF] text-sm">
                  <li><a href="#" className="hover:underline">Order Issues</a></li>
                  <li><a href="#" className="hover:underline">Delivery Info</a></li>
                  <li><a href="#" className="hover:underline">Returns</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Order Summary</h3>
                <ul className="text-gray-500 text-sm">
                  <li>Discount: $5554</li>
                  <li>Discount (20%): -$1109.40</li>
                  <li>Delivery: $0.00</li>
                  <li>Tax: +$221.88</li>
                </ul>
                <p className="font-semibold mt-2 text-gray-800">Total: $0.00</p>
              </div>
            </div>

            <hr className="mb-6"/>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-semibold text-gray-800">Product Status</h3>
                <select
                  value={productStatus}
                  onChange={handleStatusChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#00BFFF] focus:border-[#00BFFF] sm:text-sm rounded-md"
                >
                  <option>Received</option>
                  <option>Shipped</option>
                  <option>Out for Delivery</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <button className="bg-[#00BFFF] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#0099cc]">Upload Proof</button>
            </div>

            <div className="text-right">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DispatchedOrders;