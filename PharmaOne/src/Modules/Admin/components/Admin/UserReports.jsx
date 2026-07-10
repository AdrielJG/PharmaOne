import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Registering necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UserReports = () => {
    const [userStats, setUserStats] = useState({ activeUsers: 0, inactiveUsers: 0, totalUsers: 0 });
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Monthly User Activity',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Week',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Users',
                },
                beginAtZero: true,
            },
        },
    };

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/user-stats');
                if (!response.ok) {
                    throw new Error('Failed to fetch user stats');
                }
                const data = await response.json();
                console.log('Fetched user stats:', data); // Log data to debug
                setUserStats(data);
    
                const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    
                const activeUsersData = [
                    Math.round(data.activeUsers * 0.9),
                    Math.round(data.activeUsers * 0.8),
                    Math.round(data.activeUsers),
                    Math.round(data.activeUsers * 1.1)
                ];
                const inactiveUsersData = [
                    Math.round(data.inactiveUsers * 0.9),
                    Math.round(data.inactiveUsers * 1.2),
                    Math.round(data.inactiveUsers),
                    Math.round(data.inactiveUsers * 0.8)
                ];
    
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Active Users',
                            data: activeUsersData,
                            fill: false,
                            backgroundColor: 'rgba(59, 130, 246, 1)',
                            borderColor: 'rgba(59, 130, 246, 0.5)',
                            tension: 0.4,
                        },
                        {
                            label: 'Inactive Users',
                            data: inactiveUsersData,
                            fill: false,
                            backgroundColor: 'rgba(239, 68, 68, 1)',
                            borderColor: 'rgba(239, 68, 68, 0.5)',
                            tension: 0.4,
                        },
                    ],
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUserStats();
    }, []);
   
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Round the userStats values to avoid decimals in the summary
    const activeUsers = Math.round(userStats.activeUsers);
    const inactiveUsers = Math.round(userStats.inactiveUsers);
    const totalUsers = Math.round(userStats.totalUsers);

    return (
        <div style={{ backgroundColor: '#fff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '24px', marginBottom: '24px', width: '100%', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Report &gt; User Reports</h2>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ backgroundColor: '#F3F4F6', padding: '20px', borderRadius: '8px', width: '30%', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '8px', color: '#1f2937', fontSize: '1.25rem', fontWeight: '600' }}>Active Users</h3>
                    <p style={{ color: '#10B981', fontSize: '1.5rem', fontWeight: '700' }}>{activeUsers}</p>
                </div>

                <div style={{ backgroundColor: '#F3F4F6', padding: '20px', borderRadius: '8px', width: '30%', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '8px', color: '#1f2937', fontSize: '1.25rem', fontWeight: '600' }}>Inactive Users</h3>
                    <p style={{ color: '#EF4444', fontSize: '1.5rem', fontWeight: '700' }}>{inactiveUsers}</p>
                </div>

                <div style={{ backgroundColor: '#F3F4F6', padding: '20px', borderRadius: '8px', width: '30%', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '8px', color: '#1f2937', fontSize: '1.25rem', fontWeight: '600' }}>Total Users</h3>
                    <p style={{ color: '#10B981', fontSize: '1.5rem', fontWeight: '700' }}>{totalUsers}</p>
                </div>
            </div>

            <div style={{ marginBottom: '100px', padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '8px', height: '300px' }}>
                <h3 style={{ marginBottom: '16px', fontSize: '1.25rem', color: '#1f2937', fontWeight: '600' }}>Monthly User Activity</h3>
                <div style={{ height: '100%' }}>
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default UserReports;
