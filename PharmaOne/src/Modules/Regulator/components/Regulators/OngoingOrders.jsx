import React from 'react';
import OrderCard from './OrderCard';
import GlobalStyle from './GlobalStyle';

const orders = [
  { orderId: 'HWDSF776567DS', status: 'On the way', date: '24 June', fromLocation: 'Delhi, India', toLocation: 'California, US' },
  { orderId: 'HWDSF776567DS', status: 'On the way', date: '24 June', fromLocation: 'Delhi, India', toLocation: 'California, US' },
  { orderId: 'HWDSF776567DS', status: 'On the way', date: '24 June', fromLocation: 'Delhi, India', toLocation: 'California, US' },
  { orderId: 'HWDSF776567DS', status: 'On the way', date: '24 June', fromLocation: 'Delhi, India', toLocation: 'California, US' },
  { orderId: 'HWDSF776567DS', status: 'On the way', date: '24 June', fromLocation: 'Delhi, India', toLocation: 'California, US' },
  { orderId: 'HWDSF776567DS', status: 'On the way', date: '24 June', fromLocation: 'Delhi, India', toLocation: 'California, US' },
  { orderId: 'HWDSF776567DS', status: 'On the way', date: '24 June', fromLocation: 'Delhi, India', toLocation: 'California, US' },
];

const OngoingOrders = () => {
  return (
    <>
    <GlobalStyle />
    <div className="w-full p-10 bg-gray-100 min-h-screen"> {/* Ensuring min-height covers the full screen */}
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>
      <p className="text-sm text-gray-600 mb-8">Order details and their progress</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order, index) => (
          <OrderCard key={index} {...order} />
        ))}
      </div>
    </div>
    </>
  );
};

export default OngoingOrders;

