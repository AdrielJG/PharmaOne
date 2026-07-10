import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Financials = () => {
    // Sample data for the chart
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
        datasets: [
            {
                label: 'Revenue',
                data: [120000, 150000, 130000, 170000, 190000, 210000, 250000, 220000, 240000],
                fill: false,
                backgroundColor: 'rgba(16, 185, 129, 1)',
                borderColor: 'rgba(16, 185, 129, 0.5)',
                tension: 0.4, // Adjusted for smoother curves
                pointHoverRadius: 8, // Larger points on hover
                pointHoverBackgroundColor: 'rgba(16, 185, 129, 0.8)',
            },
            {
                label: 'Expenses',
                data: [80000, 90000, 75000, 120000, 130000, 150000, 180000, 160000, 170000],
                fill: false,
                backgroundColor: 'rgba(239, 68, 68, 1)',
                borderColor: 'rgba(239, 68, 68, 0.5)',
                tension: 0.4, // Adjusted for smoother curves
                pointHoverRadius: 8, // Larger points on hover
                pointHoverBackgroundColor: 'rgba(239, 68, 68, 0.8)',
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
        },
    };

    return (
        <div style={{
            backgroundColor: '#fff',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '24px',
            width: '100%',
            overflow: 'hidden',
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
            }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#1f2937',
                }}>Financials Overview</h2>
                <button style={{
                    padding: '10px 20px',
                    backgroundColor: '#3B82F6',
                    color: '#fff',
                    fontWeight: '600',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                }}>+ Add Transaction</button>
            </div>

            {/* Financial Summary */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '24px',
            }}>
                {/* Total Revenue */}
                <div style={{
                    backgroundColor: '#F3F4F6',
                    padding: '20px',
                    borderRadius: '8px',
                    width: '30%',
                    textAlign: 'center',
                }}>
                    <h3 style={{ marginBottom: '8px', color: '#1f2937', fontSize: '1.25rem', fontWeight: '600' }}>Total Revenue</h3>
                    <p style={{ color: '#10B981', fontSize: '1.5rem', fontWeight: '700' }}>$1,200,000</p>
                </div>

                {/* Total Expenses */}
                <div style={{
                    backgroundColor: '#F3F4F6',
                    padding: '20px',
                    borderRadius: '8px',
                    width: '30%',
                    textAlign: 'center',
                }}>
                    <h3 style={{ marginBottom: '8px', color: '#1f2937', fontSize: '1.25rem', fontWeight: '600' }}>Total Expenses</h3>
                    <p style={{ color: '#EF4444', fontSize: '1.5rem', fontWeight: '700' }}>$800,000</p>
                </div>

                {/* Net Profit */}
                <div style={{
                    backgroundColor: '#F3F4F6',
                    padding: '20px',
                    borderRadius: '8px',
                    width: '30%',
                    textAlign: 'center',
                }}>
                    <h3 style={{ marginBottom: '8px', color: '#1f2937', fontSize: '1.25rem', fontWeight: '600' }}>Net Profit</h3>
                    <p style={{ color: '#10B981', fontSize: '1.5rem', fontWeight: '700' }}>$400,000</p>
                </div>
            </div>

            {/* Financial Chart */}
            <div style={{
                marginBottom: '24px',
                padding: '20px',
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
                height: '300px', // Adjusted for a smaller chart
            }}>
                <h3 style={{
                    marginBottom: '16px',
                    fontSize: '1.25rem',
                    color: '#1f2937',
                    fontWeight: '600',
                }}>Monthly Revenue and Expenses</h3>
                <div style={{ height: '100%' }}> {/* Make chart fill its container */}
                    <Line data={data} options={options} />
                </div>
            </div>

            {/* Transactions Table */}
            <div>
                <h3 style={{
                    marginBottom: '16px',
                    fontSize: '1.25rem',
                    color: '#1f2937',
                    fontWeight: '600',
                }}>Recent Transactions</h3>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginBottom: '16px',
                }}>
                    <thead style={{
                        backgroundColor: '#F3F4F6',
                        textAlign: 'left',
                    }}>
                        <tr>
                            <th style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Date</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Transaction ID</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Description</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Amount</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Status</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>2024-09-01</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>TXN123456</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Purchase of Raw Materials</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB', color: '#EF4444' }}>-$50,000</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB', color: '#10B981' }}>Completed</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>
                                <button style={{
                                    backgroundColor: 'transparent',
                                    color: '#3B82F6',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}>View Detail &gt;</button>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>2024-09-02</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>TXN123457</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Sale of Finished Goods</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB', color: '#10B981' }}>+$120,000</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB', color: '#10B981' }}>Completed</td>
                            <td style={{
                                padding: '12px', borderBottom: '1px solid #E5E7EB'
                            }}>
                                <button style={{
                                    backgroundColor: 'transparent',
                                    color: '#3B82F6',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}>View Detail &gt;</button>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>2024-09-03</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>TXN123458</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Utility Payment</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB', color: '#EF4444' }}>-$5,000</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB', color: '#10B981' }}>Completed</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>
                                <button style={{
                                    backgroundColor: 'transparent',
                                    color: '#3B82F6',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}>View Detail &gt;</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <p>Showing 1 – 3 results of 150</p>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <button style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        marginRight: '8px',
                        cursor: 'pointer',
                    }}>Page 01</button>
                    {/* Add additional pagination buttons here if needed */}
                </div>
            </div>
        </div>
    );
};

export default Financials;
