import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const Requests = () => {
  const [inventory, setInventory] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [manufacturers, setManufacturers] = useState([]); // New state for manufacturers
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/get-requests", {
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
    
        // Replace emails with usernames and retain the original email
        const updatedInventory = await Promise.all(
          data.inventory.map(async (item) => {
            try {
              const usernameResponse = await fetch(
                `http://localhost:5000/api/get-username?email=${item.Client}`,
                {
                  headers: { "Content-Type": "application/json" },
                }
              );
              if (!usernameResponse.ok) {
                throw new Error(`HTTP error! status: ${usernameResponse.status}`);
              }
              const usernameData = await usernameResponse.json();
              return {
                ...item,
                ClientName: usernameData.name || item.Client, // Store username
                ClientEmail: item.Client, // Store original email
              };
            } catch (error) {
              console.error(`Error fetching username for ${item.Client}:`, error.message);
              return { ...item, ClientName: item.Client, ClientEmail: item.Client }; // Fallback
            }
          })
        );
        console.log("Updated inventory:", updatedInventory);
        setInventory(updatedInventory || []);
      } catch (error) {
        console.error("Error fetching inventory data:", error.message);
      }
    };
      
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchInventory()]);
      setLoading(false);
    };
  
    fetchData();
  }, []);
  
  const handleAssign = async (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
    console.log(order.MedicineName);
    try {
      const response = await fetch(
        `http://localhost:5000/api/get-manufacturers?medicineName=${order.MedicineName}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(`Fetching: http://localhost:5000/api/get-manufacturers?medicineName=${order.MedicineName}`);
      const data = await response.json();
      console.log(data);
  
      // Group manufacturers by name and sum their quantities
      const groupedManufacturers = data.reduce((acc, manufacturer) => {
        if (acc[manufacturer.name]) {
          // Ensure quantities are treated as integers
          acc[manufacturer.name].quantity += parseInt(manufacturer.quantity, 10);
        } else {
          // Ensure quantity is treated as an integer
          acc[manufacturer.name] = { ...manufacturer, quantity: parseInt(manufacturer.quantity, 10) };
        }
        return acc;
      }, {});
  
      // Convert the grouped object back to an array
      const uniqueManufacturers = Object.values(groupedManufacturers);
  
      // Directly set the fetched data as manufacturers
      setManufacturers(uniqueManufacturers || []); // Assuming the API response is an array
    } catch (error) {
      console.error("Error fetching manufacturers data:", error.message);
    }
  };
  
  const [selectedQuantities, setSelectedQuantities] = useState({}); // Track selected quantities for each manufacturer
  const [totalSelected, setTotalSelected] = useState(0); // Track total selected quantity

  const handleSubmit = async () => {
    const payload = {
      medicineID: selectedOrder.orderid,
      medicineName: selectedOrder.MedicineName,
      medicineGroup: selectedOrder.MedicineGroup,
      requiredQuantity: selectedOrder.Quantity,
      clientEmail: selectedOrder.ClientEmail, // Original email
      clientName: selectedOrder.ClientName, // Username
      manufacturers: manufacturers.map((manufacturer) => ({
        name: manufacturer.name,
        email: manufacturer.added_by, // Include the email of the manufacturer
        quantity: selectedQuantities[manufacturer.name] || 0, // Selected quantity
      })),
    };

    console.log(payload);
    
    try {
      const response = await fetch("http://localhost:5000/api/reqtoman", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to submit request: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Request successfully submitted:", result);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };
    
  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Requests</h1>
          <p className="text-gray-600">List of Requests.</p>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600">
          Place Order
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#4A90E2" loading={loading} size={35} />
            <span className="ml-2 text-gray-600">Loading Requests...</span>
          </div>
        ) : inventory.length > 0 ? (
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-left table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-gray-700">Medicine Name</th>
                  <th className="px-4 py-2 text-gray-700">Medicine Group</th>
                  <th className="px-4 py-2 text-gray-700">Quantity</th>
                  <th className="px-4 py-2 text-gray-700">Client</th>
                  <th className="px-4 py-2 text-gray-700">Status</th>
                  <th className="px-4 py-2 text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, idx) => (
                  <tr
                    key={`${item.id}-${idx}`}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2">{item.MedicineName}</td>
                    <td className="px-4 py-2">{item.MedicineGroup}</td>
                    <td className="px-4 py-2">{item.Quantity}</td>
                    <td className="px-4 py-2">{item.Client}</td>
                    <td className="px-4 py-2">
                      {item.Status === 2 && (
                        <span className="text-green-600 font-semibold">
                          Accepted
                        </span>
                      )}
                      {item.Status === 1 && (
                        <span className="text-yellow-500 font-semibold">
                          Awaiting Response
                        </span>
                      )}
                      {item.Status === 0 && (
                        <span className="text-teal-500 font-semibold">
                          New!
                        </span>
                      )}
                      {item.Status === -1 && (
                        <span className="text-red-600 font-semibold">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {item.Status === 0 && (
                        <button
                          className="text-teal-500 hover:underline"
                          onClick={() => handleAssign(item)}
                        >
                          Assign
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No inventory records found.</p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-3xl w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-lg font-bold mb-4">Assign Manufacturer</h3>
            <p>
              <strong>Medicine Name:</strong> {selectedOrder.MedicineName}<br />
              <strong>Required Quantity:</strong> {selectedOrder.Quantity}<br />
              <strong>Client:</strong> {selectedOrder.Client}
            </p>
            <div className="mt-4">
              <h4 className="font-semibold mb-2"><strong>Manufacturers:</strong></h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left table-auto border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-gray-700">Name</th>
                      <th className="px-4 py-2 text-gray-700">Available Quantity</th>
                      <th className="px-4 py-2 text-gray-700">Select Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {manufacturers.map((manufacturer, idx) => {
                      const maxQuantity = Math.min(
                        selectedOrder.Quantity - totalSelected + (selectedQuantities[manufacturer.name] || 0),
                        manufacturer.quantity
                      );

                      return (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-4 py-2">{manufacturer.name || "N/A"}</td>
                          <td className="px-4 py-2">{manufacturer.quantity || "N/A"}</td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              className="border rounded-md px-2 py-1 w-40"
                              min="0"
                              max={maxQuantity}
                              placeholder={`Max: ${maxQuantity}`}
                              value={selectedQuantities[manufacturer.name] || ""}
                              onChange={(e) => {
                                const value = Math.min(maxQuantity, Math.max(0, parseInt(e.target.value) || 0));
                                const updatedQuantities = {
                                  ...selectedQuantities,
                                  [manufacturer.name]: value,
                                };

                                const newTotalSelected = Object.values(updatedQuantities).reduce((sum, qty) => sum + qty, 0);

                                setSelectedQuantities(updatedQuantities);
                                setTotalSelected(newTotalSelected);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;