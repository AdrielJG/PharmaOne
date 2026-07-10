import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MedicineGroups = () => {
    const [inventory, setInventory] = useState([]);
    const [error, setError] = useState(null);

    // Predefined categories
    const categories = [
        "Pain and Inflammation",
        "Anti-Infectives",
        "Cardiovascular",
        "Respiratory",
        "Gastrointestinal",
        "Endocrine",
        "Nervous System",
        "Musculoskeletal",
        "Dermatological",
        "Miscellaneous"
    ];

    // Fetch inventory data from backend
    useEffect(() => {
        fetch("http://localhost:5000/api/get-inventory", {
            credentials: "include", // Ensure cookies/session data are sent
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch inventory");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setInventory(data.inventory); // Set inventory data to state
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    // Calculate the number of medicines in each category
    const medicineCounts = categories.reduce((acc, category) => {
        // Filter inventory items that match the current category (case-insensitive, trimming spaces)
        acc[category] = inventory.filter(
            (item) =>
                item.medicine_group?.trim().toLowerCase() === category.trim().toLowerCase()
        ).length;
        return acc;
    }, {});

    // Optionally log the counts to debug
    console.log(medicineCounts);

    return (
        <div className="w-full h-full bg-stone-200">
            <div className="px-10 py-10">
                <div>
                    <h1 className='text-2xl font-bold'>
                        <span>
                            <Link to='/inventory' className='hover:text-gray-400'>
                                Inventory
                            </Link>{' '}
                            &gt; Medicine Groups
                        </span>
                    </h1>
                    <h3>Categories of medicines.</h3>
                </div>
                <div className="mt-4">
                    {/* Display category counts */}
                    <table className="min-w-full bg-white font-semibold">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Group
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    No. of Medicines
                                </th>
                                <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Action
                                </th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category}>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm">{category}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm">{medicineCounts[category] || 0}</td>
                                    <td className='px-6 py-4 border-b border-gray-300 text-sm'>
                                            <Link to={`/inventory/`} className='px-3 py-1  text-black rounded hover:text-blue-700'>
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
    );
};

export default MedicineGroups;
