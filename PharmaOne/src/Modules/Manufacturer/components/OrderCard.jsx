import React, { useState } from 'react';
import { FiPackage, FiChevronRight, FiX } from 'react-icons/fi';
import OrderDetails from './OrderDetails';

const OrderCard = ({ orderId, status, date, fromLocation, toLocation }) => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleCardClick = () => {
    setOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOverlayOpen(false);
      setIsClosing(false);
    }, 500); // Duration of the closing animation
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === 'overlay-background') {
      handleCloseOverlay();
    }
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4 transform transition-transform duration-500 hover:scale-105 hover:shadow-lg hover:bg-gray-50 cursor-pointer group"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-teal-500 p-2 rounded-full text-white">
              <FiPackage size={24} />
            </div>
            <div>
              <h2 className="text-md font-semibold">#{orderId}</h2>
              <span className="text-sm text-gray-500">
                {status} · {date}
              </span>
            </div>
          </div>
          <div
            className="text-gray-400 transition-transform duration-500 transform group-hover:rotate-90"
          >
            <FiChevronRight size={24} />
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500">{fromLocation}</span>
          <div className="w-full mx-4 flex items-center">
            <div className="flex items-center w-full justify-between">
              <span className="bg-black w-4 h-4 rounded-full"></span>
              <span className="h-0.5 bg-black flex-1 mx-1"></span>
              <span className="bg-black w-4 h-4 rounded-full"></span>
              <span className="h-0.5 bg-black flex-1 mx-1"></span>
              <span className="bg-black w-4 h-4 rounded-full"></span>
              <span className="h-0.5 bg-dashed flex-1 mx-1 border-t-2 border-gray-400"></span>
              <span className="bg-white w-4 h-4 rounded-full border-2 border-gray-400"></span>
            </div>
          </div>
          <span className="text-sm text-gray-500">{toLocation}</span>
        </div>
      </div>

      {/* Overlay */}
      {isOverlayOpen && (
        <div
          id="overlay-background"
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-500 ease-out ${
            isClosing ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={handleOverlayClick}
        >
          <div
            className={`relative transform transition-transform duration-500 ease-out ${
              isClosing
                ? 'scale-95 translate-y-10 opacity-0'
                : 'scale-100 translate-y-0 opacity-100'
            }`}
          >
            <OrderDetails />
            <button
              onClick={handleCloseOverlay}
              className="absolute top-4 right-4 text-gray p-2 rounded-full"
            >
              <FiX size={24} /> {/* Updated to use FiX icon */}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCard;
