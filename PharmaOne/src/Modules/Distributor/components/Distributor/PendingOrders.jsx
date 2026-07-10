import React from 'react';

const PendingOrders = () => {
  const orders = [
    {
      medicineName: 'Augmentin 625 Duo Tablet',
      medicineID: 'D06JD2324345454',
      destination: 'Distributor B',
      status: 'In Progress',
      action: 'View Full Detail'
    },
    {
      medicineName: 'Ascoril LS Syrup',
      medicineID: 'D06JD2324345452',
      destination: 'Pharmacy',
      status: 'Pending',
      action: 'Dispatch'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders &gt; Pending Orders</h1>
        <p className="text-gray-600">
          List of medicines whose delivery is either pending or in progress.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Medicine Inventory..."
          className="w-1/2 p-2 border border-gray-300 rounded"
        />
        <select className="p-2 border border-gray-300 rounded">
          <option value="">Select Group</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 font-medium text-gray-700">Medicine Name</th>
              <th className="py-3 px-6 font-medium text-gray-700">Medicine ID</th>
              <th className="py-3 px-6 font-medium text-gray-700">Destination</th>
              <th className="py-3 px-6 font-medium text-gray-700">Status</th>
              <th className="py-3 px-6 font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 text-gray-800">{order.medicineName}</td>
                <td className="py-4 px-6 text-gray-600">{order.medicineID}</td>
                <td className="py-4 px-6 text-gray-600">{order.destination}</td>
                <td className="py-4 px-6">
                  <span
                    className={`py-1 px-3 rounded-full text-white text-sm ${
                      order.status === 'In Progress' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button
                    className={`py-2 px-4 text-sm font-medium rounded ${
                      order.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-green-500 text-white'
                    }`}
                  >
                    {order.action} &gt;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600">
          Showing 1 - {orders.length} of 298
        </p>
        <div className="flex items-center">
          <button className="px-3 py-1 border border-gray-300 rounded bg-white hover:bg-gray-100">
            Page 01 &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingOrders;