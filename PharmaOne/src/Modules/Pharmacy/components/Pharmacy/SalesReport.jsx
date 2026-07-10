import React, { useEffect, useRef, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { startOfMonth, endOfMonth, format } from 'date-fns';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const SalesReport = () => {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);

  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [lineChartData, setLineChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);

  const [filters, setFilters] = useState({
    date: '',
    medicineName: '',
    customerName: '',
  });

  const [dropdownOptions, setDropdownOptions] = useState({
    medicineNames: [],
    customerNames: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSale, setNewSale] = useState({
    date_time: new Date().toISOString(),
    amount: '',
    user_email: '',
    medicine_name: '',
    quantity: '',
    group: '',
    payment_method: 'Cash',
    status: 'Completed',
    customer_name: '',
    notes: '',
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sales');
        const data = await response.json();

        if (Array.isArray(data)) {
          const sortedData = data.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));
          setSalesData(sortedData);
          setFilteredData(sortedData);

          const medicineNames = [...new Set(sortedData.map((item) => item.medicine_name))].filter(Boolean);
          const customerNames = [...new Set(sortedData.map((item) => item.customer_name))].filter(Boolean);

          setDropdownOptions({ medicineNames, customerNames });
        } else {
          console.error('Expected an array but got:', data);
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let updatedData = salesData;

      if (filters.date) {
        updatedData = updatedData.filter((order) => {
          const orderDate = new Date(order.date_time).toISOString().split('T')[0];
          return orderDate === filters.date;
        });
      }

      if (filters.medicineName) {
        updatedData = updatedData.filter((order) => order.medicine_name === filters.medicineName);
      }

      if (filters.customerName) {
        updatedData = updatedData.filter((order) => order.customer_name === filters.customerName);
      }

      setFilteredData(updatedData);
    };

    applyFilters();
  }, [filters, salesData]);

  const groupDataByMonth = (data) => {
    const groupedData = {};
    data.forEach((order) => {
      const monthStart = startOfMonth(new Date(order.date_time));
      const rangeLabel = `${format(monthStart, 'MMM yyyy')}`;
      if (!groupedData[rangeLabel]) {
        groupedData[rangeLabel] = 0;
      }
      groupedData[rangeLabel] += order.amount;
    });
    return groupedData;
  };

  useEffect(() => {
    if (filteredData.length > 0) {
      let lineData, barData;
      const isFiltered = filters.date || filters.medicineName || filters.customerName;

      if (isFiltered) {
        lineData = {
          labels: filteredData.map((order) =>
            new Intl.DateTimeFormat('en-GB').format(new Date(order.date_time))
          ),
          datasets: [
            {
              label: 'Sales Made',
              data: filteredData.map((order) => order.amount),
              fill: false,
              borderColor: '#009099',
              borderWidth: 2,
            },
          ],
        };

        const aggregateData = filteredData.reduce((acc, order) => {
          const date = new Intl.DateTimeFormat('en-GB').format(new Date(order.date_time));
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += order.amount;
          return acc;
        }, {});

        barData = {
          labels: Object.keys(aggregateData),
          datasets: [
            {
              label: 'Total Sales Per Day',
              data: Object.values(aggregateData),
              backgroundColor: 'rgba(0, 144, 153, 0.8)',
            },
          ],
        };
      } else {
        const groupedData = groupDataByMonth(filteredData);

        lineData = {
          labels: Object.keys(groupedData),
          datasets: [
            {
              label: 'Sales Made',
              data: Object.values(groupedData),
              fill: false,
              borderColor: '#009099',
              borderWidth: 2,
            },
          ],
        };

        barData = {
          labels: Object.keys(groupedData),
          datasets: [
            {
              label: 'Total Sales Per Month',
              data: Object.values(groupedData),
              backgroundColor: 'rgba(0, 144, 153, 0.8)',
            },
          ],
        };
      }

      setLineChartData(lineData);
      setBarChartData(barData);
    } else {
      setLineChartData(null);
      setBarChartData(null);
    }
  }, [filteredData, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSale((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSale = () => {
    console.log('New Sale:', newSale);
    setIsModalOpen(false);
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { color: '#E6E6E6', drawBorder: false },
        ticks: { beginAtZero: true },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: true }, ticks: { beginAtZero: true } },
    },
  };

  return (
    <div className="SalesReport w-full p-10 bg-[#F7F7F7]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#333333]">Sales Report</h2>
          <p className="text-sm text-[#666666]">Sales-related report of the pharmacy.</p>
        </div>
        <div>
          <button
            className="px-4 py-2 bg-[#009099] text-white rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            Add Sale
          </button>
        </div>
      </div>

      {/* Sales Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="mb-4 text-lg font-semibold">Add New Sale</h3>
            <div className="space-y-4">
              <input
                type="datetime-local"
                name="date_time"
                value={newSale.date_time}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="amount"
                placeholder="Amount"
                value={newSale.amount}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="user_email"
                placeholder="User Email"
                value={newSale.user_email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="medicine_name"
                placeholder="Medicine Name"
                value={newSale.medicine_name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={newSale.quantity}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="group"
                placeholder="Group"
                value={newSale.group}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <select
                name="payment_method"
                value={newSale.payment_method}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
              </select>
              <select
                name="status"
                value={newSale.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
              <input
                type="text"
                name="customer_name"
                placeholder="Customer Name"
                value={newSale.customer_name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="notes"
                placeholder="Notes"
                value={newSale.notes}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#009099] text-white rounded-md"
                onClick={handleAddSale}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="p-2 border rounded-md w-1/4"
        />
        <select
          name="medicineName"
          value={filters.medicineName}
          onChange={handleFilterChange}
          className="p-2 border rounded-md w-1/4"
        >
          <option value="">Filter by Medicine Name</option>
          {dropdownOptions.medicineNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
        <select
          name="customerName"
          value={filters.customerName}
          onChange={handleFilterChange}
          className="p-2 border rounded-md w-1/4"
        >
          <option value="">Filter by Customer Name</option>
          {dropdownOptions.customerNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Charts */}
      <div className="flex">
        <div className="w-7/12 p-4 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 text-[#009099] font-semibold">Sales Made</h3>
          <div className="h-64 relative">
            {lineChartData && <Line ref={lineChartRef} data={lineChartData} options={lineChartOptions} />}
          </div>
        </div>

        <div className="w-5/12 p-4 bg-white rounded-lg shadow-md ml-4">
          <h3 className="mb-4 text-[#009099] font-semibold">Order Details</h3>
          <div className="overflow-y-auto h-64">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border-b-2 pb-2">Customer Name</th>
                  <th className="border-b-2 pb-2">Date/Time</th>
                  <th className="border-b-2 pb-2">Amount</th>
                  <th className="border-b-2 pb-2">Medicine Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((order, index) => (
                    <tr key={index}>
                      <td className="border-b py-2">{order.customer_name || 'N/A'}</td>
                      <td className="border-b py-2">
                        {new Intl.DateTimeFormat('en-GB').format(new Date(order.date_time))}
                      </td>
                      <td className="border-b py-2">${order.amount}</td>
                      <td className="border-b py-2">{order.medicine_name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No sales data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <h3 className="mb-4 text-[#009099] font-semibold">Aggregate Sales</h3>
        <div className="h-64 relative">
          {barChartData && <Bar ref={barChartRef} data={barChartData} options={barChartOptions} />}
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
