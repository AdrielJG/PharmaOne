import React from 'react';

const DocOverlay = ({ isOpen, onClose, document }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg overflow-hidden w-2/3 max-w-2xl">
        <div className="p-5">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              &times;
            </button>
          </div>

          {/* Document Details */}
          <h2 className="text-xl font-bold mb-2">{document.name}</h2>
          <p className="text-sm text-gray-600 mb-4">{document.accountType}</p>
          <p className="text-sm text-gray-600 mb-4">{document.documentType}</p>

          {/* Document View */}
          <div className="h-64 overflow-y-scroll border border-gray-200 rounded-lg p-3">
            {document.fileType === 'pdf' ? (
              <iframe
                src={`http://localhost:5000/uploads/${document.fileName}`}
                title="Document Viewer"
                className="w-full h-full"
              />
            ) : (
              <img
                src={`http://localhost:5000/uploads/${document.fileName}`}
                alt="Document Viewer"
                className="w-full h-auto"
              />
            )}
          </div>

        </div>

        {/* Action Buttons */}
        <div className="p-5 bg-gray-100 flex justify-end">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocOverlay;
