import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ShipmentPerformance = () => {
  // Initial data for chart and metrics
  const [shipmentData, setShipmentData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    onTimeDeliveries: [85, 90, 88, 92, 95, 93, 97],
    delayedDeliveries: [15, 10, 12, 8, 5, 7, 3],
    averageDeliveryTime: '2 Days',
    deliveryIssues: 8,
    onTimeRate: '92%',
    lateDeliveries: '3%',
  });

  // State for new data inputs
  const [newData, setNewData] = useState({
    month: '',
    onTime: '',
    delayed: '',
  });

  // Handle form submission to add new data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newData.month && newData.onTime && newData.delayed) {
      setShipmentData((prevData) => ({
        labels: [...prevData.labels, newData.month],
        onTimeDeliveries: [...prevData.onTimeDeliveries, parseInt(newData.onTime)],
        delayedDeliveries: [...prevData.delayedDeliveries, parseInt(newData.delayed)],
        averageDeliveryTime: prevData.averageDeliveryTime,
        deliveryIssues: prevData.deliveryIssues + 1, // Update based on new data
        onTimeRate: `${Math.round((parseInt(newData.onTime) / (parseInt(newData.onTime) + parseInt(newData.delayed))) * 100)}%`,
        lateDeliveries: `${Math.round((parseInt(newData.delayed) / (parseInt(newData.onTime) + parseInt(newData.delayed))) * 100)}%`,
      }));

      // Clear input fields after submission
      setNewData({
        month: '',
        onTime: '',
        delayed: '',
      });
    }
  };

  const data = {
    labels: shipmentData.labels,
    datasets: [
      {
        label: 'On-Time Deliveries',
        data: shipmentData.onTimeDeliveries,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: '#4CAF50',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4CAF50',
      },
      {
        label: 'Delayed Deliveries',
        data: shipmentData.delayedDeliveries,
        borderColor: '#F44336',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: '#F44336',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#F44336',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          beginAtZero: true,
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className='no-scrollbar w-full h-full p-6 bg-gray-100 overflow-y-scroll'>
      <div className='bg-white shadow-lg rounded-lg p-6 mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>Shipment Performance</h1>
        <h3 className='text-gray-600 mb-6'>Overview of the shipment performance metrics.</h3>

        <div style={{ height: '300px' }} className='relative'>
          <Line data={data} options={options} />
        </div>
      </div>

      {/* Additional Stats */}
      <div className='grid grid-cols-2 gap-6 mb-8'>
        <div className='bg-white shadow-lg rounded-lg p-6'>
          <h3 className='text-xl font-bold text-gray-800 mb-2'>Average Delivery Time</h3>
          <p className='text-2xl font-semibold text-gray-700'>{shipmentData.averageDeliveryTime}</p>
        </div>
        <div className='bg-white shadow-lg rounded-lg p-6'>
          <h3 className='text-xl font-bold text-gray-800 mb-2'>Delivery Issues</h3>
          <p className='text-2xl font-semibold text-gray-700'>{shipmentData.deliveryIssues} Issues</p>
        </div>
        <div className='bg-white shadow-lg rounded-lg p-6'>
          <h3 className='text-xl font-bold text-gray-800 mb-2'>On-Time Delivery Rate</h3>
          <p className='text-2xl font-semibold text-gray-700'>{shipmentData.onTimeRate}</p>
        </div>
        <div className='bg-white shadow-lg rounded-lg p-6'>
          <h3 className='text-xl font-bold text-gray-800 mb-2'>Late Deliveries</h3>
          <p className='text-2xl font-semibold text-gray-700'>{shipmentData.lateDeliveries}</p>
        </div>
      </div>

      {/* Form to Add New Data */}
      <div className='bg-white shadow-lg rounded-lg p-6'>
        <h3 className='text-xl font-bold text-gray-800 mb-4'>Add New Shipment Data</h3>
        <form onSubmit={handleSubmit} className='grid grid-cols-3 gap-4'>
          <div>
            <label className='block text-gray-600 font-semibold mb-2'>Month</label>
            <input
              type='text'
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
              value={newData.month}
              onChange={(e) => setNewData({ ...newData, month: e.target.value })}
              placeholder='Enter Month'
            />
          </div>
          <div>
            <label className='block text-gray-600 font-semibold mb-2'>On-Time Deliveries</label>
            <input
              type='number'
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
              value={newData.onTime}
              onChange={(e) => setNewData({ ...newData, onTime: e.target.value })}
              placeholder='Enter On-Time Deliveries'
            />
          </div>
          <div>
            <label className='block text-gray-600 font-semibold mb-2'>Delayed Deliveries</label>
            <input
              type='number'
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
              value={newData.delayed}
              onChange={(e) => setNewData({ ...newData, delayed: e.target.value })}
              placeholder='Enter Delayed Deliveries'
            />
          </div>
          <div className='col-span-3 text-right'>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition'>
              Add Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipmentPerformance;