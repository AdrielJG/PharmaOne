import React from 'react';

const ScheduledChecksAuditsPage = () => {
  // Data for Scheduled Checks and Audits
  const scheduledItems = [
    { name: "Augmentin 625 Duo Tablet", entity: "Manufacturer", type: "Check", status: "Scheduled" },
    { name: "Ascoril LS Syrup", entity: "Distributor", type: "Audit", status: "Scheduled" },
    { name: "Crocin 500mg Tablet", entity: "Retailer", type: "Check", status: "Scheduled" },
    { name: "Aspirin 75mg", entity: "Manufacturer", type: "Audit", status: "Scheduled" },
    { name: "Metformin 500mg", entity: "Distributor", type: "Check", status: "Scheduled" },
    { name: "Amoxicillin 250mg", entity: "Retailer", type: "Audit", status: "Scheduled" }
  ];

  // Filter data for Checks and Audits
  const checks = scheduledItems.filter(item => item.type === "Check");
  const audits = scheduledItems.filter(item => item.type === "Audit");

  return (
    <div className="p-10 bg-[#F7F8FA] h-screen overflow-y-auto">
      {/* Page Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-700">
          Scheduled Checks and Audits
        </h1>
        <p className="text-sm text-gray-500">
          List of medicines scheduled for compliance checks and audits
        </p>
      </div>

      {/* Table of Scheduled Compliance Checks */}
      <div className="mb-8 bg-white shadow-md rounded">
        <h2 className="text-xl font-bold text-gray-700 p-3">Scheduled Compliance Checks</h2>
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
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {checks.map((item, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="p-3 text-sm text-gray-600 whitespace-nowrap">{item.name}</td>
                <td className="p-3 text-sm text-gray-600 whitespace-nowrap">{item.entity}</td>
                <td className={`p-3 text-sm font-semibold whitespace-nowrap ${item.status === "Scheduled" ? "text-blue-600" : "text-gray-600"}`}>
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduledChecksAuditsPage;
