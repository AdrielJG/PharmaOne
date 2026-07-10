import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const OrdersTable = () => {
  const [inventory, setInventory] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memoExists, setMemoExists] = useState({});
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingOfferId, setUploadingOfferId] = useState(null);
  const navigate = useNavigate();

  // Fetch orders from backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/requests", {
          credentials: "include", // Include session cookies
        });

        const data = await response.json();
        if (response.ok) {
          // Separate orders by status
          setInventory(data); // Accepted
        } else {
          console.error("Error fetching requests:", data.error);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleCancelOffer = async (offer, orderId) => {
    console.log(offer.name); // Log offer name
    console.log(offer._id); // Log offer ID
  
    try {
      const response = await fetch("http://localhost:5000/update-status-cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offer_name: offer.name, // Send only offer.name
          offer_id: offer._id, // Send only offer._id
        }),
      });
  
      const data = await response.json();
      console.log(data); // Log the response from the server
  
      if (response.ok) {
        console.log("Success:", data.message);
        alert("Status updated successfully!");
  
        // Reload the page after successful update
        window.location.reload();
      } else {
        console.error("Error:", data.error || data.message);
        alert(data.error || data.message);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleViewOffer = async (order) => {
    if (!order || !order.orderid) {
      console.error("Order is undefined or missing orderid.");
      return;
    }
  
    setSelectedOrder(order);
  
    try {
      const response = await fetch(`http://localhost:5000/api/getOfferDetails?orderid=${order.orderid}`);
  
      if (!response.ok) {
        throw new Error(`Error fetching offer details: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (!Array.isArray(data)) {
        console.error("Invalid offer details format:", data);
        return;
      }
  
      setSelectedOrderDetails(data);
      setIsModalOpen(true);
      
      // Check if memo exists
      for (const offer of data) {
        const memoExists = await checkMemoExists(offer._id);
        offer.memoExists = memoExists;
      }
    } catch (error) {
      console.error("Error fetching offer details:", error);
    }
  };
    
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Status: newStatus }),
        }
      );

      if (response.ok) {
        console.log(`Order ${orderId} status updated to ${newStatus}`);
        setInventory((prev) =>
          prev.filter((order) => order["order-id"] !== orderId)
        );
        if (newStatus === 2) {
          setApprovedRequests((prev) => [
            ...prev,
            inventory.find((order) => order["order-id"] === orderId),
          ]);
        }
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleAcceptOffer = async (offer) => {
    if (!selectedOrder) return;

    try {
      const response = await fetch("http://localhost:5000/api/acceptOffer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offer_id: offer._id, // The ID of the offer being accepted
          order_id: selectedOrder.orderid, // The ID of the order
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to accept offer");
      }

      const data = await response.json();
      console.log("Offer accepted:", data);

      // Close the modal and reload the page to reflect changes
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error accepting offer:", error);
      alert("Failed to accept offer. Please try again.");
    }
  };

  const checkMemoExists = async (offerId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/checkMemo?filename=memo_${offerId}`);
      const data = await response.json();
      setMemoExists((prev) => ({ ...prev, [offerId]: data.exists }));
    } catch (error) {
      console.error("Error checking memo existence:", error);
    }
  };

  const handleRejectOffer = () => {
    if (selectedOrder) {
      updateOrderStatus(selectedOrder["order-id"], -1); // Status -1 = Rejected
      setIsModalOpen(false);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadPaymentProof = async () => {
    if (!selectedFile || !uploadingOfferId) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("offer_id", uploadingOfferId);

    try {
      const response = await fetch("http://localhost:5000/api/uploadPaymentProof", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Payment proof uploaded successfully!");
        setIsUploadModalOpen(false);
        setSelectedFile(null);
        setUploadingOfferId(null);
      } else {
        alert("Failed to upload payment proof.");
      }
    } catch (error) {
      console.error("Error uploading payment proof:", error);
      alert("Failed to upload payment proof. Please try again.");
    }
  };

  const handleDownloadInvoice = async (offerId) => {
    try {
      const response = await fetch(`http://localhost:5000/invoices/invoice_${offerId}.pdf`);
      if (!response.ok) {
        throw new Error('Failed to fetch invoice');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice_${offerId}.pdf`;
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice. Please try again.');
    }
  };
  

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      {/* Title and Place Order Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Orders</h1>
          <p className="text-gray-600">List of Order Requests.</p>
        </div>
        <Link
          to="orderpage"
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
        >
          Place Order
        </Link>
      </div>

      {/* Inventory Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        {inventory.length > 0 ? (
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-left table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-gray-700">Medicine Name</th>
                  <th className="px-4 py-2 text-gray-700">Medicine Group</th>
                  <th className="px-4 py-2 text-gray-700">Quantity</th>
                  <th className="px-4 py-2 text-gray-700">Status</th>
                  <th className="px-4 py-2 text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, idx) => (
                  <tr
                    key={item["order-id"]}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2">{item.MedicineName}</td>
                    <td className="px-4 py-2">{item.MedicineGroup}</td>
                    <td className="px-4 py-2">{item.Quantity}</td>
                    <td className="px-4 py-2">
                      {item.Status === 0
                        ? "Awaiting Response"
                        : item.Status === 1
                        ? "Sent to Manufacturers"
                        : item.Status === 2
                        ? "Offered"
                        : item.Status === 3
                        ? "Offer Accepted"
                        : item.Status === -1
                        ? "Offer Rejected"
                        : "Unknown Status"}
                    </td>
                    <td className="px-4 py-2">
                      {item.Status === 2 && (
                        <button
                          className="text-teal-500 hover:underline"
                          onClick={() => handleViewOffer(item)}
                        >
                          View Offer
                        </button>
                      )}
                      {item.Status === 3 && (
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => handleViewOffer(item)}
                        >
                          View Offer
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

      {/* Modal for Offer Details */}
      {selectedOrder && isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-4xl w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              ✖
            </button>
            <h3 className="text-lg font-bold mb-4">Offer Details</h3>

            {/* Table Displaying Offer Details */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border">Manufacturer Name</th>
                    <th className="px-4 py-2 border">Quantity</th>
                    <th className="px-4 py-2 border">Quotation</th>
                    <th className="px-4 py-2 border">Delivery Date</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrderDetails && selectedOrderDetails.length > 0 ? (
                    selectedOrderDetails.map((offer, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-2 border">{offer.name || "N/A"}</td>
                        <td className="px-4 py-2 border">{offer.quantity || "N/A"}</td>
                        <td className="px-4 py-2 border">
                          {offer.quotation ? `$${offer.quotation}` : "Pending"}
                        </td>
                        <td className="px-4 py-2 border">
                          {offer.delivery_date ? new Date(offer.delivery_date).toLocaleDateString() : "Not Set"}
                        </td>
                        <td className="px-4 py-2 border flex gap-2 justify-center">
                          {offer.status === 1 && (
                            <>
                              <button
                                className="bg-teal-500 text-white px-3 py-1 rounded-md hover:bg-teal-600"
                                onClick={() => handleAcceptOffer(offer)}
                              >
                                Accept
                              </button>
                              <button
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                onClick={() => handleRejectOffer(offer)}
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {offer.status === 2 && (
                        <>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={() => handleCancelOffer(offer)}
                          >
                            Cancel Offer
                          </button>
                          {memoExists[offer._id] && (
                            <>
                              <a
                                href={`http://localhost:5000/memo/memo_${offer._id}.pdf`}
                                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 ml-2"
                                download={`memo_${offer._id}.pdf`}
                              >
                                Download Memo
                              </a>
                              <button
                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 ml-2"
                                onClick={() => {
                                  setUploadingOfferId(offer._id);
                                  setIsUploadModalOpen(true);
                                }}
                              >
                                Upload Payment Proof
                              </button>
                            </>
                          )}
                        </>
                      )}
                      {offer.status === 3 && (
                        <>
                          <p className="text-green-600 text-center py-4">Payment Made. Please wait for Payment Confirmation.</p>
                        </>
                      )}
                      {offer.status === 5 && (
                        <div className="flex gap-2">
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                            onClick={() => handleDownloadInvoice(offer._id)}
                          >
                            Download Invoice
                          </button>
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                            onClick={() => navigate("/ordersP")}
                          >
                            Go to Orders
                          </button>
                        </div>
                      )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-500">
                        No offers available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}    

      {/* Modal for Upload Payment Proof */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Upload Payment Proof</h3>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
                onClick={() => setIsUploadModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={handleUploadPaymentProof}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;