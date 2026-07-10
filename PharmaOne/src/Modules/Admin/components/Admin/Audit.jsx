import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [emailFilter, setEmailFilter] = useState("");

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/audit-logs');
                const data = await response.json();
                const normalizedData = data.map(log => ({
                    Date: log.Date,
                    User: log.User,
                    Action: log.Action,
                    Details: log.Details,
                    "IP Address": log["IP Address"],
                }));

                // Sort logs by Date (newest first)
                const sortedLogs = normalizedData.sort((a, b) => new Date(b.Date) - new Date(a.Date));

                setLogs(sortedLogs);
                setFilteredLogs(sortedLogs);
            } catch (error) {
                console.error('Error fetching logs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    // Filter logs based on email ID
    useEffect(() => {
        if (emailFilter.trim() === "") {
            setFilteredLogs(logs);
        } else {
            setFilteredLogs(
                logs.filter(log => 
                    log.User && log.User.toLowerCase().includes(emailFilter.toLowerCase())
                )
            );
        }
    }, [emailFilter, logs]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setEmailFilter(e.target.value);
        }
    };

    const downloadLogsAsExcel = () => {
        if (filteredLogs.length === 0) {
            alert("No logs available to download.");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(filteredLogs);
        worksheet["!cols"] = [
            { wch: 20 },
            { wch: 30 },
            { wch: 20 },
            { wch: 40 },
            { wch: 15 },
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Audit Logs');
        XLSX.writeFile(workbook, 'audit_logs.xlsx');
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-center">
            {/* Header */}
            <div className="w-full max-w-5xl bg-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <span className="mr-2 text-blue-500">
                        <i className="fas fa-clipboard-list"></i>
                    </span>
                    Admin Audit Logs
                </h2>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    <input
                        type="text"
                        placeholder="Filter by Email ID"
                        onKeyDown={handleSearch}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={downloadLogsAsExcel}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
                    >
                        Download Logs
                    </button>
                </div>
            </div>

            {/* Audit Logs Table */}
            <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                    </div>
                ) : filteredLogs.length > 0 ? (
                    <div className="overflow-y-auto max-h-[600px] border border-gray-300 rounded-lg">
                        <table className="w-full border-collapse text-gray-700">
                            <thead className="sticky top-0 bg-gray-300">
                                <tr>
                                    <th className="p-3 border-b border-gray-400 text-left">Date</th>
                                    <th className="p-3 border-b border-gray-400 text-left">User</th>
                                    <th className="p-3 border-b border-gray-400 text-left">Action</th>
                                    <th className="p-3 border-b border-gray-400 text-left">Details</th>
                                    <th className="p-3 border-b border-gray-400 text-left">IP Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.map((log, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-200 transition border-b border-gray-300"
                                    >
                                        <td className="p-3">{log.Date}</td>
                                        <td className="p-3">{log.User}</td>
                                        <td className="p-3">{log.Action}</td>
                                        <td className="p-3">{log.Details}</td>
                                        <td className="p-3">{log["IP Address"]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-6 text-center text-gray-500 font-medium">
                        No logs found for the given email ID.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuditLogs;
