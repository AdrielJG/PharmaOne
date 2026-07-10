import React, { useEffect, useRef, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaCalendarAlt, FaUserAlt, FaPills } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const SalesReport = () => {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);

  const [lineChartData, setLineChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);

  const orderData = [
    { id: '1', dateTime: '01 Dec 2021 10:25', amount: 50 },
    { id: '2', dateTime: '02 Dec 2021 11:15', amount: 120 },
    { id: '3', dateTime: '03 Dec 2021 13:40', amount: 75 },
    { id: '4', dateTime: '05 Dec 2021 09:20', amount: 90 },
    { id: '5', dateTime: '10 Dec 2021 14:50', amount: 200 },
    { id: '6', dateTime: '15 Dec 2021 16:30', amount: 135 },
    { id: '7', dateTime: '20 Dec 2021 11:10', amount: 170 },
    { id: '8', dateTime: '31 Dec 2021 18:00', amount: 146 },
    { id: '9', dateTime: '02 Jan 2022 12:25', amount: 95 },
    { id: '10', dateTime: '05 Jan 2022 14:45', amount: 110 },
    { id: '11', dateTime: '10 Jan 2022 15:50', amount: 80 },
    { id: '12', dateTime: '15 Jan 2022 17:05', amount: 60 },
    { id: '13', dateTime: '20 Jan 2022 09:35', amount: 100 },
    { id: '14', dateTime: '25 Jan 2022 11:55', amount: 140 },
    { id: '15', dateTime: '30 Jan 2022 13:20', amount: 130 },
  ];

  useEffect(() => {
    const lineData = {
      labels: orderData.map(order => order.dateTime.split(' ')[0]),
      datasets: [
        {
          label: 'Sales Made',
          data: orderData.map(order => order.amount),
          fill: false,
          borderColor: '#009099',
          borderWidth: 2,
        },
      ],
    };

    const aggregateData = orderData.reduce((acc, order) => {
      const date = order.dateTime.split(' ')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += order.amount;
      return acc;
    }, {});

    const barData = {
      labels: Object.keys(aggregateData),
      datasets: [
        {
          label: 'Total Sales Per Day',
          data: Object.values(aggregateData),
          backgroundColor: 'rgba(0, 144, 153, 0.8)',
        },
      ],
    };

    setLineChartData(lineData);
    setBarChartData(barData);
  }, []);

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: {
            size: 12,
            weight: '500',
          },
          color: '#A3A3A3',
        },
      },
      y: {
        grid: {
          color: '#E6E6E6',
          drawBorder: false,
        },
        ticks: {
          beginAtZero: true,
          stepSize: 50,
          font: {
            size: 12,
            weight: '500',
          },
          color: '#A3A3A3',
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#009099',
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { display: true },
        ticks: { beginAtZero: true },
      },
    },
  };

  return (
    <div className="SalesReport w-full p-10 bg-[#F7F7F7]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#333333]">Reports &gt; Quality Report</h2>
          <p className="text-sm text-[#666666]">Quality report of the products.</p>
        </div>
        <button className="px-4 py-2 bg-white text-black rounded-md border border-gray-300 shadow-sm">
          Download Report
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="w-1/3 relative">
          <label className="text-sm text-[#666666] flex items-center mb-2">
            <FaCalendarAlt className="mr-2" /> Date Range
          </label>
          <input
            type="date"
            className="px-4 py-2 border rounded-md w-full"
          />
        </div>

        <div className="w-1/3 relative">
          <label className="text-sm text-[#666666] flex items-center mb-2">
            <FaPills className="mr-2" /> Medicine Group
          </label>
          <select className="px-4 py-2 border rounded-md w-full">
            <option value="">- Select Group -</option>
            <option value="group1">Group 1</option>
            <option value="group2">Group 2</option>
          </select>
        </div>

        <div className="w-1/3 relative">
          <label className="text-sm text-[#666666] flex items-center mb-2">
            <FaUserAlt className="mr-2" /> User Name
          </label>
          <select className="px-4 py-2 border rounded-md w-full">
            <option value="">- Select User Name -</option>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
          </select>
        </div>
      </div>

      <div className="flex">
        <div className="w-7/12 p-4 bg-white rounded-lg shadow-md border border-[#E6E6E6]">
          <h3 className="mb-4 text-[#009099] font-semibold">Sales Made</h3>
          <div className="h-64 relative">
            {lineChartData && <Line ref={lineChartRef} data={lineChartData} options={lineChartOptions} />}
          </div>
        </div>

        <div className="w-5/12 p-4 bg-white rounded-lg shadow-md ml-4 border border-[#E6E6E6]">
          <h3 className="mb-4 text-[#009099] font-semibold">Order Details</h3>
          <div className="overflow-y-auto h-64">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border-b-2 pb-2 text-[#666666]">Order ID</th>
                  <th className="border-b-2 pb-2 text-[#666666]">Date/Time</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map(order => (
                  <tr key={order.id}>
                    <td className="border-b py-2">{order.id}</td>
                    <td className="border-b py-2">{order.dateTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white rounded-lg shadow-md border border-[#E6E6E6]">
        <h3 className="mb-4 text-[#009099] font-semibold">Cumulative Sales Per Day</h3>
        <div className="h-64 relative">
          {barChartData && <Bar ref={barChartRef} data={barChartData} options={barChartOptions} />}
        </div>
      </div>
    </div>
  );
};

export default SalesReport;