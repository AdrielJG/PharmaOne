import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SiteReports = () => {
    // Sample data for the chart
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'];
    const pageViewsData = [1000, 1200, 1100, 1400, 1500, 1600, 1700, 1800, 1900];
    const uniqueVisitorsData = [800, 900, 850, 950, 1000, 1100, 1150, 1200, 1300];

    const data = {
        labels,
        datasets: [
            {
                label: 'Total Page Views',
                data: pageViewsData,
                fill: false,
                backgroundColor: 'rgba(59, 130, 246, 1)',
                borderColor: 'rgba(59, 130, 246, 0.5)',
                tension: 0.4,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: 'rgba(59, 130, 246, 0.8)',
            },
            {
                label: 'Unique Visitors',
                data: uniqueVisitorsData,
                fill: false,
                backgroundColor: 'rgba(34, 197, 94, 1)',
                borderColor: 'rgba(34, 197, 94, 0.5)',
                tension: 0.4,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: 'rgba(34, 197, 94, 0.8)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allows more control over chart size
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Revenue and Expenses',
            },
            tooltip: {
                enabled: true,
                mode: 'nearest',
                intersect: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        hover: {
            mode: 'dataset', // Hover animation for the entire dataset
        },    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full h-screen overflow-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Report &gt; Website Reports</h2>
            </div>

            {/* Website Summary */}
            <div className="flex flex-wrap gap-4 mb-6">
                {/* Total Page Views */}
                <div className="bg-gray-100 p-5 rounded-lg w-full md:w-1/4 text-center">
                    <h3 className="mb-2 text-gray-800 text-lg font-semibold">Total Page Views</h3>
                    <p className="text-blue-600 text-2xl font-bold">1900</p>
                </div>

                {/* Unique Visitors */}
                <div className="bg-gray-100 p-5 rounded-lg w-full md:w-1/4 text-center">
                    <h3 className="mb-2 text-gray-800 text-lg font-semibold">Unique Visitors</h3>
                    <p className="text-green-500 text-2xl font-bold">1300</p>
                </div>

                {/* Bounce Rate */}
                <div className="bg-gray-100 p-5 rounded-lg w-full md:w-1/4 text-center">
                    <h3 className="mb-2 text-gray-800 text-lg font-semibold">Bounce Rate</h3>
                    <p className="text-yellow-500 text-2xl font-bold">45%</p>
                </div>
            </div>

            {/* Average Session Duration */}
            <div className="mb-6 p-5 bg-gray-50 rounded-lg text-center">
                <h3 className="mb-4 text-gray-800 text-lg font-semibold">Average Session Duration</h3>
                <p className="text-green-600 text-2xl font-bold">4m 30s</p>
            </div>

            {/* Website Metrics Chart */}
            <div className="p-5 bg-gray-50 rounded-lg h-80 mb-5">
                <h3 className="mb-4 text-gray-800 text-lg font-semibold">Monthly Website Metrics</h3>
                <div className="h-full">
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default SiteReports;
