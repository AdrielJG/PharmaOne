import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import arrowdown from '../../assets/svgs/arrowdown.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

const MedicineGroups = () => {
    const [selectedCategory, setSelectedCategory] = useState('None');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [dispatchedMedicines, setDispatchedMedicines] = useState([]);

    const categories = [
        'None',
        'Pain Relief',
        'Cold and Flu',
        'Vitamins & Supplements',
        'Prescription Medications',
        'Herbal Remedies',
    ];

    const medicines = [
        {
            id: '001',
            name: 'Paracetamol',
            stock: 100,
            completedStatus: 'Completed',
            dispatchStatus: 'Ready',
            category: 'Pain Relief',
        },
        {
            id: '002',
            name: 'Aspirin',
            stock: 50,
            completedStatus: 'In Progress',
            dispatchStatus: 'Pending',
            category: 'Pain Relief',
        },
        {
            id: '003',
            name: 'Vitamin C',
            stock: 75,
            completedStatus: 'Rejected',
            dispatchStatus: 'Ready',
            category: 'Vitamins & Supplements',
        },
        // Add more medicine data as needed
    ];

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleDispatchClick = (id) => {
        setDispatchedMedicines((prev) => [...prev, id]);
        toast.success('Medicine dispatched successfully!');
    };

    const filteredMedicines = medicines.filter((medicine) =>
        (selectedCategory === 'None' || medicine.category === selectedCategory) &&
        (medicine.name.toLowerCase().includes(searchQuery) || medicine.id.toLowerCase().includes(searchQuery))
    );

    // Define styles for completed status
    const completedStatusStyles = {
        Completed: 'text-green-500 font-bold',
        'In Progress': 'text-yellow-500 font-bold',
        Rejected: 'text-red-500 font-bold',
    };

    return (
        <div className='w-full h-full bg-stone-200'>
            <div className='px-10 py-10'>
                <div className='flex justify-between items-center mb-5'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            <span>
                                <Link to='/inventory' className='hover:text-gray-400'>
                                    Inventory
                                </Link>{' '}
                                &gt; List of Medicines
                            </span>
                        </h1>
                        <h3>List of medicines available for sales.</h3>
                    </div>
                    <div>
                        <Link to='addmedicine' className='border px-4 py-2 bg-red-500 text-white border-red-500 rounded'>
                            &#43; Add New Gruop
                        </Link>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='flex justify-between items-center mb-5'>
                        <div className='w-4/12 rounded-md overflow-hidden border border-gray-400'>
                            <input
                                type="text"
                                className='w-full px-2 py-1 outline-none bg-gray-200'
                                placeholder="Search by Medicine Name or ID."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        
                    </div>
                    {/* Table */}
                    <div className='overflow-x-auto'>
                        <table className='min-w-full bg-white font-semibold'>
                            <thead>
                                <tr>
                                    <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Group Name
                                    </th>
                                    <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        No. of Medicine
                                    </th>
                                    
                                    <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMedicines.map((medicine) => (
                                    <tr key={medicine.id}>
                                        <td className='px-6 py-4 border-b border-gray-300 text-sm'>{medicine.name}</td>
                                        <td className='px-6 py-4 border-b border-gray-300 text-sm'>{medicine.stock}</td>
                                       
                                        
                                        <td className='px-6 py-4 border-b border-gray-300 text-sm'>
                                            <Link to={`/inventory/medicinelist/${medicine.id}`} className='px-3 py-1  text-black rounded hover:text-blue-700'>
                                                View Full Details &gt;
                                            </Link>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MedicineGroups;
