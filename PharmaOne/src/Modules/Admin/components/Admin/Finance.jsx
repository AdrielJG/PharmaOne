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
                data: [15000, 18000, 22000, 27000, 29000, 31000, 35000, 32000, 34000],
                fill: false,
                backgroundColor: 'rgba(16, 185, 129, 1)',
                borderColor: 'rgba(16, 185, 129, 0.5)',
                tension: 0.4, // Adjusted for smoother curves
                pointHoverRadius: 8, // Larger points on hover
                pointHoverBackgroundColor: 'rgba(16, 185, 129, 0.8)',
            },
            {
                label: 'Expenses',
                data: [10000, 12000, 9000, 15000, 16000, 18000, 20000, 19000, 21000],
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
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Revenue and Expenses of the Website',
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
            mode: 'dataset',
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
            height: '600px', // Set a fixed height for the component
            overflowY: 'auto', // Enable vertical scrolling
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
                }}>Admin Financial Overview</h2>
                <button style={{
                    padding: '10px 20px',
                    backgroundColor: '#3B82F6',
                    color: '#fff',
                    fontWeight: '600',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                }}>+ Add Financial Record</button>
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
                    <p style={{ color: '#10B981', fontSize: '1.5rem', fontWeight: '700' }}>$250,000</p>
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
                    <p style={{ color: '#EF4444', fontSize: '1.5rem', fontWeight: '700' }}>$130,000</p>
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
                    <p style={{ color: '#10B981', fontSize: '1.5rem', fontWeight: '700' }}>$120,000</p>
                </div>
            </div>

            {/* Financial Chart */}
            <div style={{
                marginBottom: '24px',
                padding: '20px',
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
                height: '300px',
            }}>
                <h3 style={{
                    marginBottom: '16px',
                    fontSize: '1.25rem',
                    color: '#1f2937',
                    fontWeight: '600',
                }}>Monthly Revenue and Expenses</h3>
                <div style={{ height: '100%' }}>
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
                }}>Recent Financial Transactions</h3>
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
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>TXN123459</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Ad Revenue Payment</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB', color: '#10B981' }}>+$30,000</td>
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
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>TXN123460</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Web Hosting Fee</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB', color: '#EF4444' }}>-$500</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB', color: '#EF4444' }}>Pending</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>
                                <button style={{
                                    backgroundColor: 'transparent',
                                    color: '#3B82F6',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}>View Detail &gt;</button>
                            </td>
                        </tr>
                        {/* More rows can be added here */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Financials;
