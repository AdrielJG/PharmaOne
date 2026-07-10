import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Sample data for groups
const groups = [
    {
        id: 'group-1',
        name: 'Group 1',
        medicines: [
            { id: '001', name: 'Paracetamol', stock: 100, completedStatus: 'Completed', dispatchStatus: 'Ready', category: 'Pain Relief' },
            { id: '002', name: 'Aspirin', stock: 50, completedStatus: 'In Progress', dispatchStatus: 'Pending', category: 'Pain Relief' }
        ],
    },
    {
        id: 'group-2',
        name: 'Group 2',
        medicines: [
            { id: '003', name: 'Vitamin C', stock: 75, completedStatus: 'Rejected', dispatchStatus: 'Ready', category: 'Vitamins & Supplements' }
        ],
    },
    // Add more groups as needed
];

const GroupsMedicinesList = () => {
    const { id } = useParams(); // Capture the group id from the URL
    const group = groups.find(g => g.id === id); // Retrieve the group based on the id

    // If the group is not found, display an error message
    if (!group) {
        return <div>Group not found</div>;
    }

    return (
        <div className='w-full h-full bg-stone-200'>
            <div className='px-10 py-10'>
                <div className='flex justify-between items-center mb-5'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            <span>
                                <Link to='/inventory' className='text-gray-400 hover:text-black'>
                                    Inventory
                                </Link>{' '}
                                &gt; <Link to='/inventory/groups' className='text-gray-400 hover:text-black'>Groups</Link> &gt; Medicines
                            </span>
                        </h1>
                        <h3>Medicines in {group.name}.</h3>
                    </div>
                    <div>
                        <button className='border px-4 py-2 bg-blue-500 text-white border-blue-500 rounded'>
                            Edit Group
                        </button>
                    </div>
                </div>
                {/* Display Medicines */}
                <div className='overflow-x-auto'>
                    <table className='min-w-full bg-white font-semibold'>
                        <thead>
                            <tr>
                                <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                    Medicine ID
                                </th>
                                <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                    Medicine Name
                                </th>
                                <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                    Stock
                                </th>
                                <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                    Completed Status
                                </th>
                                <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                    Dispatch Status
                                </th>
                                <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                    Category
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {group.medicines.map((medicine) => (
                                <tr key={medicine.id}>
                                    <td className='px-6 py-4 border-b border-gray-300 text-sm'>{medicine.id}</td>
                                    <td className='px-6 py-4 border-b border-gray-300 text-sm'>{medicine.name}</td>
                                    <td className='px-6 py-4 border-b border-gray-300 text-sm'>{medicine.stock}</td>
                                    <td className='px-6 py-4 border-b border-gray-300 text-sm'>{medicine.completedStatus}</td>
                                    <td className='px-6 py-4 border-b border-gray-300 text-sm'>{medicine.dispatchStatus}</td>
                                    <td className='px-6 py-4 border-b border-gray-300 text-sm'>{medicine.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GroupsMedicinesList;
