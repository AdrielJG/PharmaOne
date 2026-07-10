import React from 'react';

const ComplianceRecords = () => {
  return (
    <div className="p-10 bg-[#F7F8FA] h-screen">
      {/* Page Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-700">
          Compliance Checks &gt; Compliance Records
        </h1>
        <p className="text-sm text-gray-500">
          List of medicines whose checks are either completed or in progress
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-5">
        <input
          type="text"
          className="w-1/3 p-2 border border-gray-300 rounded"
          placeholder="Search Medicine Groups..."
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3 text-sm font-medium text-gray-600 tracking-wider">
                Medicine Name
              </th>
              <th className="text-left p-3 text-sm font-medium text-gray-600 tracking-wider">
                Medicine ID
              </th>
              <th className="text-left p-3 text-sm font-medium text-gray-600 tracking-wider">
                Source of Check
              </th>
              <th className="text-left p-3 text-sm font-medium text-gray-600 tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <td className="p-3 text-sm text-gray-600 whitespace-nowrap">
                Augmentin 625 Duo Tablet
              </td>
              <td className="p-3 text-sm text-gray-600 whitespace-nowrap">
                D06ID232435454
              </td>
              <td className="p-3 text-sm text-gray-600 whitespace-nowrap">
                Manufacturer
              </td>
              <td className="p-3 text-sm text-gray-600 whitespace-nowrap">
                <button className="bg-green-500 text-white px-4 py-2 rounded">
                  Perform Checks &raquo;
                </button>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 text-sm text-gray-600 whitespace-nowrap">
                Ascoril LS Syrup
              </td>
              <td className="p-3 text-sm text-gray-600 whitespace-nowrap">
                D06ID232435452
              </td>
              <td className="p-3 text-sm text-gray-600 whitespace-nowrap">
                Distributor
              </td>
              <td className="p-3 text-sm text-gray-600 whitespace-nowrap">
                <button className="bg-green-500 text-white px-4 py-2 rounded">
                  Perform Checks &raquo;
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplianceRecords;
