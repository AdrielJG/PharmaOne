import React, { useState, useEffect } from 'react';
import { FiPackage, FiChevronRight, FiX } from 'react-icons/fi';

const OrderDetails = ({
  orderId,
  manufacturer_name,
  manufacturer_address,
  pharmacy_name,
  pharmacy_address,
  medicine_name,
  quantity,
  quotation,
  shipping_date,
  created_at,
  handleCloseOverlay,
}) => {
  // Calculate order summary
  const {
    originalPrice,
    discount,
    discountPercentage,
    tax,
    taxPercentage,
    totalAmount,
  } = calculateOrderSummary(Number(quotation));

  // Format dates
  const formattedCreatedDate = new Date(created_at).toDateString();
  const formattedShippingDate = new Date(shipping_date).toDateString();

  // Generate or retrieve shipped and out for delivery dates
  const getRandomDate = (startDate, endDate) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const randomTime = start + Math.random() * (end - start);
    return new Date(randomTime).toDateString();
  };

  // Use local storage to persist dates
  const [shippedDate, setShippedDate] = useState(null);
  const [outForDeliveryDate, setOutForDeliveryDate] = useState(null);

  useEffect(() => {
    const storedShippedDate = localStorage.getItem(`shippedDate_${orderId}`);
    const storedOutForDeliveryDate = localStorage.getItem(`outForDeliveryDate_${orderId}`);

    if (storedShippedDate && storedOutForDeliveryDate) {
      // Use stored dates if they exist
      setShippedDate(storedShippedDate);
      setOutForDeliveryDate(storedOutForDeliveryDate);
    } else {
      // Generate and store new dates
      const newShippedDate = getRandomDate(created_at, shipping_date);
      const newOutForDeliveryDate = getRandomDate(newShippedDate, shipping_date);

      localStorage.setItem(`shippedDate_${orderId}`, newShippedDate);
      localStorage.setItem(`outForDeliveryDate_${orderId}`, newOutForDeliveryDate);

      setShippedDate(newShippedDate);
      setOutForDeliveryDate(newOutForDeliveryDate);
    }
  }, [orderId, created_at, shipping_date]);

  // Calculate progress based on current date
  const currentDate = new Date();
  const createdDate = new Date(created_at);
  const shippingDate = new Date(shipping_date);

  const totalDuration = shippingDate - createdDate;
  const elapsedDuration = currentDate - createdDate;
  const progress = Math.min((elapsedDuration / totalDuration) * 100, 100);

  // Determine which stages are completed
  const isShipped = shippedDate && currentDate >= new Date(shippedDate);
  const isOutForDelivery = outForDeliveryDate && currentDate >= new Date(outForDeliveryDate);
  const isDelivered = currentDate >= shippingDate;

  return (
    <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-3xl transform transition-all duration-500 ease-in-out border border-white/20 relative">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
        </div>
        <button
          onClick={handleCloseOverlay}
          className="text-gray-600 hover:text-gray-900 p-2 rounded-full transition-colors duration-300 bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Order Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Information</h3>
          <div className="space-y-2">
            <p><span className="text-gray-500">Order ID:</span> {orderId}</p>
            <p><span className="text-gray-500">Order Date:</span> {formattedCreatedDate}</p>
            <p><span className="text-gray-500">Estimated Delivery:</span> {formattedShippingDate}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Manufacturer Address</h3>
          <div className="space-y-2">
            <p>{manufacturer_name}</p>
            <p>{manufacturer_address}</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h3>
        <div className="flex justify-between items-center relative">
          {/* Confirmed Stage */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
              progress >= 0 ? 'bg-teal-500' : 'bg-gray-300'
            }`}>1</div>
            <span className="text-sm text-gray-600 mt-2">Confirmed</span>
            <span className="text-xs text-gray-400">{formattedCreatedDate}</span>
          </div>

          {/* Shipped Stage */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
              isShipped ? 'bg-teal-500' : 'bg-gray-300'
            }`}>2</div>
            <span className="text-sm text-gray-600 mt-2">Shipped</span>
            <span className="text-xs text-gray-400">{shippedDate}</span>
          </div>

          {/* Out for Delivery Stage */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
              isOutForDelivery ? 'bg-teal-500' : 'bg-gray-300'
            }`}>3</div>
            <span className="text-sm text-gray-600 mt-2">Out for Delivery</span>
            <span className="text-xs text-gray-400">{outForDeliveryDate}</span>
          </div>

          {/* Delivered Stage */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
              isDelivered ? 'bg-teal-500' : 'bg-gray-300'
            }`}>4</div>
            <span className="text-sm text-gray-600 mt-2">Delivered</span>
            <span className="text-xs text-gray-400">Expected by {formattedShippingDate}</span>
          </div>

          {/* Progress Bar */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0">
            <div className="h-0.5 bg-teal-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Product</h3>
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div>
            <p className="font-semibold text-gray-800">{medicine_name}</p>
            <p className="text-sm text-gray-500">Qty: {quantity}</p>
          </div>
          <p className="text-lg font-semibold text-gray-800">₹{originalPrice}</p>
        </div>
      </div>

      {/* Delivery */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Delivery</h3>
        <div className="space-y-2">
          <p><span className="text-gray-500">Pharmacy:</span> {pharmacy_name}</p>
          <p><span className="text-gray-500">Address:</span> {pharmacy_address}</p>
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Discount ({discountPercentage}%):</span>
            <span className="text-gray-800">-₹{discount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Delivery:</span>
            <span className="text-gray-800">₹0.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tax ({taxPercentage}%):</span>
            <span className="text-gray-800">+₹{tax}</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="text-lg font-semibold text-gray-800">Total:</span>
            <span className="text-lg font-semibold text-gray-800">₹{totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const calculateOrderSummary = (totalAmount) => {
  const discountPercentage = 19; // 10% to 30%
  const discount = (totalAmount * discountPercentage) / 100;

  const taxPercentage = 13; // 5% to 15%
  const tax = (totalAmount * taxPercentage) / 100;

  const originalPrice = totalAmount + discount - tax;

  return {
    originalPrice: originalPrice.toFixed(2),
    discount: discount.toFixed(2),
    discountPercentage,
    tax: tax.toFixed(2),
    taxPercentage,
    totalAmount: totalAmount.toFixed(2),
  };
};

const OrderCard = ({
  orderId,
  status,
  date,
  fromLocation,
  toLocation,
  manufacturer_name,
  manufacturer_address,
  pharmacy_name,
  pharmacy_address,
  medicine_name,
  quantity,
  quotation,
  shipping_date,
  created_at, // Add created_at prop
}) => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const formattedShippingDate = new Date(date).toDateString();
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
        className="bg-gradient-to-r from-teal-50 to-purple-50 p-6 rounded-xl shadow-lg flex flex-col gap-4 transform transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer group border border-gray-100"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-teal-500 p-3 rounded-full text-white shadow-md">
              <FiPackage size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">#{orderId}</h2>
              <span className="text-sm text-gray-600">
                {status} · {formattedShippingDate}
              </span>
            </div>
          </div>
          <div className="text-gray-400 transition-transform duration-500 transform group-hover:rotate-90">
            <FiChevronRight size={24} />
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-600">{fromLocation}</span>
          <div className="w-full mx-4 flex items-center">
            <div className="flex items-center w-full justify-between">
              <span className="bg-teal-500 w-4 h-4 rounded-full shadow-sm"></span>
              <span className="h-0.5 bg-teal-500 flex-1 mx-1"></span>
              <span className="w-4 h-9 text-2xl text-teal-700 font-bold">&gt;</span>
              </div>
          </div>
          <span className="text-sm text-gray-600">{toLocation}</span>
        </div>
      </div>

      {/* Overlay */}
      {isOverlayOpen && (
        <div
          id="overlay-background"
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-500 ease-out ${
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
            <OrderDetails 
              orderId={orderId}
              manufacturer_name={manufacturer_name}
              manufacturer_address={manufacturer_address}
              pharmacy_name={pharmacy_name}
              pharmacy_address={pharmacy_address}
              medicine_name={medicine_name}
              quantity={quantity}
              quotation={quotation}
              shipping_date={shipping_date}
              created_at={created_at} // Pass created_at prop
              handleCloseOverlay={handleCloseOverlay}
            />
          </div>
        </div>
      )}
    </>
  );
};

const OngoingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/manorders', {
          credentials: 'include', // Include cookies for session management
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="w-full p-10 bg-gray-100 min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="w-full p-10 bg-gray-100 min-h-screen flex items-center justify-center">Error: {error}</div>;
  }

  return (
    <div className="w-full p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Orders</h1>
      <p className="text-sm text-gray-600 mb-8">Order details and their progress</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order, index) => (
          <OrderCard 
            key={index}
            orderId={order.orderid}
            date={order.shipping_date}
            fromLocation={order.manufacturer_address}
            toLocation={order.pharmacy_address}
            manufacturer_name={order.manufacturer_name}
            manufacturer_address={order.manufacturer_address} // Pass this prop
            pharmacy_name={order.pharmacy_name}
            pharmacy_address={order.pharmacy_address}
            medicine_name={order.medicine_name}
            quantity={order.quantity}
            quotation={order.quotation}
            shipping_date={order.shipping_date}
            created_at={order.created_at} // Pass created_at prop
          />
        ))}
      </div>
    </div>
  );
};

export default OngoingOrders;