import React from 'react';

const InventoryOverview = () => {
    return (
        <div style={{
            backgroundColor: '#fff',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '24px',
            width: '100%',
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
                }}>Inventory &gt;</h2>
                <button style={{
                    padding: '10px 20px',
                    backgroundColor: '#EF4444',
                    color: '#fff',
                    fontWeight: '600',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                }}>+ Add New Item</button>
            </div>

            {/* Search Bar and Filter */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
            }}>
                <input
                    type="text"
                    placeholder="Search Medicine Inventory.."
                    style={{
                        padding: '10px 20px',
                        width: '300px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                    }}
                />
                <select style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                }}>
                    <option>- Select Group -</option>
                    {/* Additional options can be added here */}
                </select>
            </div>

            {/* Inventory Table */}
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
                        <th style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Medicine Name</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Medicine ID</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Stock in Qt.</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Comp. Status</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Dispatch</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Augmentin 625 Duo Tablet</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>D06ID232435454</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>42</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB', color: '#F59E0B' }}>In Progress</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>
                            <button style={{
                                padding: '8px 16px',
                                backgroundColor: '#10B981',
                                color: '#fff',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                            }}>Dispatch</button>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>
                            <button style={{
                                backgroundColor: 'transparent',
                                color: '#3B82F6',
                                border: 'none',
                                cursor: 'pointer',
                            }}>View Full Detail &gt;</button>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Ascoril LS Syrup</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>D06ID232435452</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>69</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB', color: '#EF4444' }}>Rejected</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>
                            <button style={{
                                padding: '8px 16px',
                                backgroundColor: '#10B981',
                                color: '#fff',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                            }}>Dispatch</button>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>
                            <button style={{
                                backgroundColor: 'transparent',
                                color: '#3B82F6',
                                border: 'none',
                                cursor: 'pointer',
                            }}>View Full Detail &gt;</button>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Paracetamol</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>D06ID232435450</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>1000</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB', color: '#10B981' }}>Accepted</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>
                            <button style={{
                                padding: '8px 16px',
                                backgroundColor: '#10B981',
                                color: '#fff',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                            }}>Dispatch</button>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>
                            <button style={{
                                backgroundColor: 'transparent',
                                color: '#3B82F6',
                                border: 'none',
                                cursor: 'pointer',
                            }}>View Full Detail &gt;</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Pagination */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <p>Showing 1 – 3 results of 298</p>
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

export default InventoryOverview;
