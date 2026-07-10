import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import Swal from 'sweetalert2';
import logoUrl from "../assets/Logo.png";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [reqtomanData, setReqtomanData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    quantity: "",
    quotation: "",
    shippingDate: "",
  });

  useEffect(() => {
    // Fetch data from MongoDB collections
    const fetchData = async () => {
      try {
        // Fetch requests from reqtoman collection
        const reqtomanResponse = await fetch("http://localhost:5000/api/getman", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const reqtomanData = await reqtomanResponse.json();
    
        // Fetch user data from user collection
        const userResponse = await fetch("http://localhost:5000/api/mandetail", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const userData = await userResponse.json();
    
        // Store both datasets separately
        setReqtomanData(reqtomanData);
        setUserData(userData);
    
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
    
  }, []);

  const handleCancelOffer = async (id) => {
    try {
      console.log("Cancelling offer for request ID:", id);
  
      const response = await fetch(`http://localhost:5000/api/update_manoffer_status/${id}`, {
        method: "PUT", // ✅ Change to PUT
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          status: 0, // ✅ Only send status
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error("Failed to cancel offer");
      }
  
      // Update the local state after API success
      setReqtomanData((prevRequests) =>
        prevRequests.map((req) => (req._id === id ? { ...req, status: 0 } : req))
      );
  
      console.log("Offer cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling offer:", error);
    }
  };
  
  const handleViewRequest = (request) => {
    console.log("Selected Request:", request); // Log the selected request
    setSelectedRequest(request);
    setFormData({ quantity: request.quantity, quotation: "", shippingDate: "" });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMakeOffer = async () => {
    if (!selectedRequest || !selectedRequest._id) {
      console.error("No request selected or missing request ID");
      return;
    }
  
    try {
      console.log("Selected Request ID:", selectedRequest._id); // Log the selected request ID
      console.log("Payload:", {
        requestId: selectedRequest._id,
        quotation: formData.quotation,
        shippingDate: formData.shippingDate,
      });
  
      const response = await fetch("http://localhost:5000/api/makeoffer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          requestId: selectedRequest._id, // Ensure this is the correct ID
          quotation: formData.quotation,
          shippingDate: formData.shippingDate,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error("Failed to make offer");
      }
  
      console.log(`Offer made for ${selectedRequest.medicine_name}`, formData);
      updateRequestStatus(selectedRequest._id, 1); // Assuming 1 is the status for "Offer Made"
      closeModal();
    } catch (error) {
      console.error("Error making offer:", error);
    }
  };

  const handleRejectRequest = async () => {
    try {
      updateRequestStatus(selectedRequest._id, 4); 
      closeModal();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const updateRequestStatus = async (id, status) => {
    try {
      console.log("Updating status for request ID:", id); // Log the request ID
      console.log("New status:", status); // Log the new status
  
      const response = await fetch("http://localhost:5000/api/updatestatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          requestId: id,
          status: status,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error("Failed to update status");
      }
  
      // Update the local state if the API call is successful
      setReqtomanData((prevRequests) =>
        prevRequests.map((req) => (req._id === id ? { ...req, status } : req))
      );
  
      console.log("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const generateMemo = (request, userData) => {
    const doc = new jsPDF();

    // Extract the number after the 3 underscores in request.id
    const orderId = request._id.split('___')[1];

    // Header section (Using Manufacturer Details)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(userData.name.toUpperCase(), 105, 15, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(userData.address, 105, 25, { align: "center" });
    doc.text(`Phone: ${userData.phone}`, 105, 32, { align: "center" });
    doc.text(`Email: ${userData.email}`, 105, 40, { align: "center" });

    // Cash Memo Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("CASH MEMO", 105, 50, { align: "center" });

    // Memo Details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Order ID: ${orderId}`, 20, 60); // Use extracted orderId
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 160, 60);

    // Table Headers
    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(230, 230, 230);
    doc.rect(20, 70, 170, 10, "F"); // Shaded header background
    doc.rect(20, 70, 170, 60); // Outer border for the table
    doc.line(60, 70, 60, 130); // Vertical line (Quantity column)
    doc.line(100, 70, 100, 130); // Vertical line (Rate column)
    doc.line(140, 70, 140, 130); // Vertical line (Description column)

    doc.text("Quantity", 30, 77);
    doc.text("Rate", 70, 77);
    doc.text("Description", 110, 77);
    doc.text("Total", 160, 77);

    // Table Data (Dynamic Rows)
    let rowStart = 80;
    const rowHeight = 10;

    const rate = request.quotation / request.quantity; // Calculate rate
    const total = request.quotation; // Total is the quotation amount

    doc.text(`${request.quantity}`, 30, rowStart + 7);
    doc.text(`${rate.toFixed(2)}`, 70, rowStart + 7);
    doc.text(`${request.medicine_name}`, 110, rowStart + 7);
    doc.text(`${total.toFixed(2)}`, 160, rowStart + 7);
    doc.line(20, rowStart + rowHeight, 190, rowStart + rowHeight);

    // Footer - Grand Total
    doc.text("G. Total:", 120, 150);
    doc.text(`${total.toFixed(2)}`, 160, 150);
    doc.line(140, 150, 190, 150);

    // Bank Account Details and UPI Information
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Payment Information:", 20, 170);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Bank Name: ${userData.bankName}`, 20, 180);
    doc.text(`Account Number: ${userData.accountNumber}`, 20, 190);
    doc.text(`IFSC Code: ${userData.ifscCode}`, 20, 200);
    doc.text(`UPI ID: ${userData.upiId}`, 20, 210);

    // Return the PDF data as a Blob
    return doc.output('blob');
};

const handleSendToPharmacy = async (request, userData) => {
  try {
    // Generate the memo PDF
    const memoBlob = generateMemo(request, userData);

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('memo', memoBlob, `memo_${request._id}.pdf`);

    // Send the memo to the server
    const response = await fetch('http://localhost:5000/api/saveMemo', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to send memo to pharmacy');
    }

    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Successfully sent memo to pharmacy!',
    });
    console.log('Memo sent to pharmacy successfully');
  } catch (error) {
    console.error('Error sending memo to pharmacy:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Failed to send memo to pharmacy. Please try again.',
    });
  }
};

  const downloadMemo = (request, userData) => {
    // Generate the memo PDF as a Blob
    const memoBlob = generateMemo(request, userData);
    const orderId = request._id.split('___')[1]; 
  
    // Create a URL for the Blob
    const url = URL.createObjectURL(memoBlob);
  
    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `memo_${orderId}.pdf`; // Set the filename
    document.body.appendChild(a);
    a.click(); // Trigger the download
  
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadInvoice = (request, userData) => {
    // Generate the invoice PDF as a Blob
    const invoiceBlob = generateInvoice(request, userData);
    const orderId = request._id.split('___')[1]; // Extract the order ID from the request ID
  
    // Create a URL for the Blob
    const url = URL.createObjectURL(invoiceBlob);
  
    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice_${orderId}.pdf`; // Set the filename
    document.body.appendChild(a);
    a.click(); // Trigger the download
  
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateInvoice = (request, userData) => {
    // Validate userData
    if (!userData || !userData.name || !userData.address || !userData.phone || !userData.email) {
      console.error("Invalid userData:", userData);
      return;
    }
  
    // Validate request
    if (!request || !request._id || !request.pharmacy_name || !request.quantity || !request.quotation || !request.medicine_name) {
      console.error("Invalid request:", request);
      return;
    }
  
    const doc = new jsPDF();
  
    // Set default font
    doc.setFont("helvetica");
  
    // Add PharmaChain logo and title at the top
    doc.addImage(logoUrl, "PNG", 20, 10, 30, 30); // Adjust size and position as needed
    doc.setFontSize(24);
    doc.setTextColor(40, 53, 147); // Dark blue text
    doc.text("PharmaChain", 60, 25);
  
    // Add a horizontal line below the header
    doc.setDrawColor(200, 200, 200); // Light gray line
    doc.line(20, 40, 190, 40);
  
    // Manufacturer details on the side
    doc.setFontSize(12);
    doc.setTextColor(40, 53, 147); // Dark blue text
    doc.text("Manufacturer Details:", 20, 50);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black text
    doc.text(userData.name, 20, 55);
    doc.text(userData.address, 20, 60);
    doc.text(`Phone: ${userData.phone}`, 20, 65);
    doc.text(`Email: ${userData.email}`, 20, 70);
  
    // Invoice details section
    doc.setFontSize(14);
    doc.setTextColor(40, 53, 147); // Dark blue text
    doc.text("INVOICE", 160, 50);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black text
    doc.text(`Invoice No: ${request._id.split('___')[1]}`, 160, 55);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 160, 60);
  
    // Billing information
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 53, 147); // Dark blue text
    doc.text("Billing To:", 20, 85);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black text
    doc.text(request.pharmacy_name, 20, 90);
  
    // Table headers with a subtle background color
    doc.setFillColor(245, 245, 245); // Light gray background
    doc.rect(20, 100, 170, 10, "F"); // Shaded header background
    doc.setDrawColor(200, 200, 200); // Light gray border
    doc.rect(20, 100, 170, 10); // Outer border for the table
  
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 53, 147); // Dark blue text
    doc.text("Quantity", 30, 107);
    doc.text("Rate", 80, 107);
    doc.text("Description", 120, 107);
    doc.text("Total", 160, 107);
  
    // Table data
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black text
    const rate = request.quotation / request.quantity; // Calculate rate
    const total = request.quotation; // Total is the quotation amount
  
    doc.text(`${request.quantity}`, 30, 117); // Quantity
    doc.text(`${rate.toFixed(2)}`, 80, 117); // Rate
    doc.text(`${request.medicine_name}`, 120, 117); // Description
    doc.text(`${total.toFixed(2)}`, 160, 117); // Total
  
    // Add a horizontal line below the table
    doc.setDrawColor(200, 200, 200); // Light gray line
    doc.line(20, 125, 190, 125);
  
    // Grand total section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 53, 147); // Dark blue text
    doc.text("Grand Total:", 120, 140);
    doc.text(`${total.toFixed(2)}`, 160, 140);
  
    // Add a footer with a thank-you message
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100); // Gray text
    doc.text("Thank you for your business!", 105, 180, { align: "center" });
    doc.text("Please contact us for any questions or concerns.", 105, 185, { align: "center" });
  
    // Save the invoice as a PDF file
    return doc.output('blob');
  };
  
  const handleSendInvoice = async (request, userData) => {
    try {
      // Generate the invoice PDF
      const invoiceBlob = generateInvoice(request, userData);
  
      // Create a FormData object to send the file and additional data
      const formData = new FormData();
      formData.append('invoice', invoiceBlob, `invoice_${request._id}.pdf`);
      formData.append('orderid', request._id);
      formData.append('manufacturer_name', userData.name);
      formData.append('pharmacy_name', request.pharmacy_name);
      formData.append('medicine_name', request.medicine_name);
      formData.append('quantity', request.quantity);
      formData.append('quotation', request.quotation);
      formData.append('shipping_date', request.delivery_date);
  
      // Send the invoice to the Flask server
      const response = await fetch('http://localhost:5000/api/saveInvoice', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to send invoice');
      }
  
      const result = await response.json();
      console.log('Invoice sent successfully:', result);

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Successfully sent invoice and saved order details!',
      }).then(() => {
        window.location.reload(); // Reloads the page after user clicks "OK"
      });

    } catch (error) {
      console.error('Error sending invoice:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to send invoice. Please try again.',
      });
    }
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  const handleDownloadPaymentProof = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/downloadPaymentProof/${requestId}`, {
        method: 'GET',
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Failed to download payment proof');
      }
  
      // Get the file name from the response headers
      const contentDisposition = response.headers.get('Content-Disposition');
      let fileName = `payment_proof_${requestId}`; // Default file name
      if (contentDisposition && contentDisposition.includes('filename=')) {
        fileName = contentDisposition
          .split('filename=')[1]
          .split(';')[0]
          .replace(/['"]/g, ''); // Extract file name from headers
      }
  
      // Convert the response to a blob
      const blob = await response.blob();
  
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
  
      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; // Use the file name from the response headers
      document.body.appendChild(a);
      a.click(); // Trigger the download
  
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading payment proof:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to download payment proof. Please try again.',
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
      <div className="p-6 max-w-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Pharmacy Requests</h1>
        <div className="bg-white shadow-lg rounded-lg">
          {reqtomanData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 rounded-lg">
                <thead className="bg-[#009099] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Pharmacy</th>
                    <th className="px-4 py-3 text-left">Medicine</th>
                    <th className="px-4 py-3 text-left">Quantity</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reqtomanData.map((request, idx) => (
                    <tr
                      key={request._id}
                      className={idx % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "bg-white hover:bg-gray-50"}
                    >
                      <td className="px-4 py-3">{request.pharmacy_name}</td>
                      <td className="px-4 py-3">{request.medicine_name}</td>
                      <td className="px-4 py-3">{request.quantity}</td>
                      <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded ${
                          request.status === 0
                            ? "bg-yellow-100 text-yellow-800"
                            : request.status === 1
                            ? "bg-green-100 text-green-800"
                            : request.status === 2
                            ? "bg-blue-100 text-blue-800"
                            : request.status === 3
                            ? "bg-teal-100 text-teal-800"
                            : request.status === 5
                            ? "bg-purple-100 text-purple-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {request.status === 0
                          ? "Pending"
                          : request.status === 1
                          ? "Offer Made"
                          : request.status === 2
                          ? "Offer Accepted"
                          : request.status === 3
                          ? "Payment Completed"
                          : request.status === 4
                          ? "Request Rejected"
                          : request.status === 5
                          ? "Order Placed"
                          : "Unknown Status"}
                      </span>
                      </td>
                      <td className="px-4 py-3">
                        {request.status === 0 && (
                          <button className="text-teal-600 hover:text-teal-800" onClick={() => handleViewRequest(request)}>
                            View Details
                          </button>
                        )}
                        {request.status === 2 && (
                          <>
                            <button className="text-blue-600 hover:text-blue-800 mr-4" onClick={() => downloadMemo(request, userData)}>
                              Generate Memo
                            </button>
                            <button className="text-teal-600 hover:text-teal-800" onClick={() => handleSendToPharmacy(request, userData)}>
                              Send to Pharmacy
                            </button>
                          </>
                        )}
                        {request.status === 3 && (
                          <>
                            <button className="text-blue-600 hover:text-blue-800 mr-4" onClick={() => downloadInvoice(request, userData)}>
                              Generate Invoice
                            </button>
                            <button className="text-teal-600 hover:text-teal-800" onClick={() => handleSendInvoice(request, userData)}>
                              Send Invoice
                            </button>
                            <button className="text-green-600 hover:text-green-800 ml-4" onClick={() => handleDownloadPaymentProof(request._id)}>
                              View Payment Proof
                            </button>
                          </>
                        )}
                        {request.status === 1 || request.status === 2 || request.status === 3 ? (
                          <button
                            className="text-red-600 hover:text-red-800 ml-4"
                            onClick={() => handleCancelOffer(request._id)}
                          >
                            Cancel Offer
                          </button>
                        ) : null}
                        {request.status === 5 && (
                          <>
                            <button
                              className="text-blue-600 hover:text-blue-800 mr-4"
                              onClick={() => downloadInvoice(request, userData)}
                            >
                              Download Invoice
                            </button>
                            <button
                              className="text-green-600 hover:text-green-800"
                              onClick={() => window.location.href = "/orders"} // Redirect to Orders page
                            >
                              Go to Orders
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">No requests found.</p>
          )}
        </div>

        {/* Modal */}
        {selectedRequest && isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
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
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Request Details
              </h3>
              <p className="mb-2">
                <strong>Pharmacy:</strong> {selectedRequest.pharmacy_name}
              </p>
              <p className="mb-4">
                <strong>Medicine:</strong> {selectedRequest.medicine_name}
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label
                    htmlFor="quotation"
                    className="block text-gray-700 font-medium"
                  >
                    Quotation
                  </label>
                  <input
                    type="text"
                    id="quotation"
                    name="quotation"
                    value={formData.quotation}
                    onChange={handleFormChange}
                    className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="shippingDate"
                    className="block text-gray-700 font-medium"
                  >
                    Shipping Date
                  </label>
                  <input
                    type="date"
                    id="shippingDate"
                    name="shippingDate"
                    value={formData.shippingDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={handleFormChange}
                    className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleRejectRequest}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Reject Request
                  </button>
                  <button
                    type="button"
                    onClick={handleMakeOffer}
                    className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
                  >
                    Make Offer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;