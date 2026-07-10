import React from 'react';

const ComplianceRecordsPage = () => {
  // Compliance Records Data
  const complianceRecords = [
    { medicineName: "Augmentin 625 Duo Tablet", entity: "Manufacturer", status: "Compliant" },
    { medicineName: "Ascoril LS Syrup", entity: "Distributor", status: "Non-Compliant" },
    { medicineName: "Crocin 500mg Tablet", entity: "Retailer", status: "Pending" },
    { medicineName: "Aspirin 75mg", entity: "Manufacturer", status: "Compliant" },
    { medicineName: "Metformin 500mg", entity: "Distributor", status: "Non-Compliant" },
    { medicineName: "Amoxicillin 250mg", entity: "Retailer", status: "Pending" }
  ];

  // Function to get color for the status
  const getStatusColor = (status) => {
    switch (status) {
      case "Compliant":
        return "bg-green-100 text-green-700";
      case "Non-Compliant":
        return "bg-red-100 text-red-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "";
    }
  };

  return (
    <div className="p-10 bg-[#F7F8FA] h-screen overflow-y-auto">
      {/* Page Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-700">
          Compliance Management &gt; List of Compliance Records
        </h1>
        <p className="text-sm text-gray-500">
          List of medicines and their compliance status with respective entities
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-5">
        <input
          type="text"
          className="w-1/3 p-2 border border-gray-300 rounded"
          placeholder="Search Medicines..."
        />
      </div>

      {/* Compliance Records Table */}
      <div className="bg-white shadow-md rounded">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3 text-sm font-medium text-gray-600 tracking-wider">
                Medicine Name
              </th>
              <th className="text-left p-3 text-sm font-medium text-gray-600 tracking-wider">
                Regulating Entity
              </th>
              <th className="text-left p-3 text-sm font-medium text-gray-600 tracking-wider">
                Status of Compliance
              </th>
            </tr>
          </thead>
          <tbody>
            {complianceRecords.map((record, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="p-3 text-sm text-gray-600 whitespace-nowrap">{record.medicineName}</td>
                <td className="p-3 text-sm text-gray-600 whitespace-nowrap">{record.entity}</td>
                <td className={`p-3 text-sm font-semibold whitespace-nowrap rounded ${getStatusColor(record.status)}`}>
                  {record.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplianceRecordsPage;
