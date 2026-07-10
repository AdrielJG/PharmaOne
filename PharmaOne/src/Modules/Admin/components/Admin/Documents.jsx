import React, { useState, useEffect } from 'react';
import DocOverlay from './DocOverlay'; // Ensure the correct import path

const DocumentVerification = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch documents from the backend
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/documents'); // Replace with your backend URL
        if (!response.ok) {
          throw new Error('Failed to fetch documents');
        }
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleViewClick = (document, documentField) => {
    // Pass the required document details to the overlay
    setSelectedDocument({
      name: document.name,
      module: document.account_type,
      fileUrl: `http://localhost:5000/uploads/${document[documentField]}`,
      fileType: document[documentField].endsWith('.pdf') ? 'pdf' : 'image',
      documentType: documentField === 'document1' ? 'Document 1' : 'Document 2',
    });
    setIsOverlayOpen(true);
  };

  const handleOverlayClose = () => {
    setIsOverlayOpen(false);
    setSelectedDocument(null);
  };

  const handleDownloadClick = async (filename) => {
    try {
      const response = await fetch(`http://localhost:5000/uploads/${filename}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to download document');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url); // Clean up
      window.location.reload();
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  const handleVerification = async (documentName, status) => {
    try {
      const payload = {
        document_name: documentName, // Use name instead of id
        verified: status,
      };
  
      console.log("Payload being sent:", payload);
  
      const response = await fetch("http://localhost:5000/api/update-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const error = await response.text();
        console.error("Server response:", error);
        throw new Error("Failed to update verification status");
      }
  
      const result = await response.json();
      console.log(result.message);
  
      // Update the frontend state
      setDocuments((prevDocuments) =>
        prevDocuments.map((doc) =>
          doc.name === documentName ? { ...doc, verified: status } : doc
        )
      );
    } catch (error) {
      console.error("Error updating verification:", error);
    }
  };
          
  return (
    <div className="p-10 bg-[#F7F8FA] h-screen overflow-y-auto">
      {/* Page Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-700">
          Document Verification
        </h1>
        <p className="text-sm text-gray-500">
          List of documents submitted by users for verification
        </p>
      </div>

      {/* Table of Documents */}
      {isLoading ? (
        <div className="text-center text-gray-600">Loading documents...</div>
      ) : (
        <div className="bg-white shadow-md rounded">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-gray-600 tracking-wider">
                  Name
                </th>
                <th className="text-left p-3 text-sm font-medium text-gray-600 tracking-wider">
                  Account Type
                </th>
                <th 
                  className="text-left p-3 text-sm font-medium text-gray-600 max-w-100px tracking-wider" 
                  style={{ width: '100px' }} // Fixed width for Document 1
                >
                  License
                </th>
                <th 
                  className="text-left p-3 text-sm font-medium text-gray-600 tracking-wider" 
                  style={{ width: '200px' }} // Fixed width for Document 2
                >
                  Aadhaar
                </th>
                <th className="text-left p-3 text-sm font-medium text-gray-600 tracking-wider">
                  View
                </th>
                <th className="text-left p-3 text-sm font-medium text-gray-600 tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="p-3 text-sm text-gray-600 whitespace-nowrap">{document.name}</td>
                  <td className="p-3 text-sm text-gray-600 whitespace-nowrap">{document.account_type}</td>
                  <td 
                    className="p-3 text-sm text-gray-600 whitespace-nowrap" 
                    style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {document.document1}
                  </td>
                  <td 
                    className="p-3 text-sm text-gray-600 whitespace-nowrap" 
                    style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {document.document2}
                  </td>
                  <td className="p-3 text-sm text-gray-600 whitespace-nowrap">
                    {document.document1 && (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                        onClick={() => handleDownloadClick(document.document1)}
                      >
                        View Lincense
                      </button>
                    )}
                    {document.document2 && (
                      <button
                        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                        onClick={() => handleDownloadClick(document.document2)}
                      >
                        View Aadhaar
                      </button>
                    )}
                  </td>
                  <td className="p-3 text-sm text-gray-600 whitespace-nowrap">
                    <button 
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                      onClick={() => handleVerification(document.name, 1)} // Send name
                    >
                      Accept
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                      onClick={() => handleVerification(document.name, 2)} // Send name
                    >
                      Reject
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Document View Overlay */}
      {isOverlayOpen && selectedDocument && (
        <DocOverlay 
          isOpen={isOverlayOpen}
          document={selectedDocument}
          onClose={handleOverlayClose}
        />
      )}
    </div>
  );
};



export default DocumentVerification;
