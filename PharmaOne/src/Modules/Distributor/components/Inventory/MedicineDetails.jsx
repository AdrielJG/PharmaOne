import React from 'react';
import { useParams, Link } from 'react-router-dom';

const MedicineDetails = () => {
    const { id } = useParams();

    // Sample data, ideally fetched from a server or context
    const medicines = [
        { id: '001', name: 'Paracetamol', stock: 100, completedStatus: 'Completed', dispatchStatus: 'Ready', category: 'Pain Relief' },
        { id: '002', name: 'Aspirin', stock: 50, completedStatus: 'In Progress', dispatchStatus: 'Pending', category: 'Pain Relief' },
        { id: '003', name: 'Vitamin C', stock: 75, completedStatus: 'Rejected', dispatchStatus: 'Ready', category: 'Vitamins & Supplements' },
        // Add more medicine data as needed
    ];

    const medicine = medicines.find((med) => med.id === id);

    if (!medicine) {
        return <div>Medicine not found</div>;
    }

    return (
        <div className='w-full h-full bg-stone-200'>
            <div className='px-10 py-10'>
                <div className='flex justify-between items-center mb-5'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            <span>
                                <Link to='/inventory' className=' text-gray-400 hover:text-black'>
                                    Inventory
                                </Link>{' '}
                                &gt; <Link to='/inventory/medicinelist' className='text-gray-400 hover:text-black'>
                                    List of Medicines
                                </Link>{' '}
                                &gt; {medicine.name}
                            </span>
                        </h1>
                        <h3>List of medicines available for sales.</h3>
                    </div>
                    <div>
                        <button className='border px-4 py-2 bg-blue-500 text-white border-blue-500 rounded'>
                            Edit Details
                        </button>
                    </div>
                </div>
                <div>
                    <div className='flex gap-10 '>

                        <div className='border-2 border-stone-400 w-1/2 bg-white py-2'>
                            <div className='px-5 py-1 flex items-center justify-between border-b  border-stone-400'>
                                <h3 className='text-xl font-bold'>Medicine</h3>
                            </div>
                            <div className='px-5 flex py-5'>
                                <div className='w-1/2 text-start'>
                                    <h3 className='text-xl font-bold'>{medicine.id}</h3>
                                    <p className='font-semibold'>Medicine ID</p>
                                </div>
                                <div className='w-1/2 text-start'>
                                    <h3 className='text-xl font-bold'>{medicine.category}</h3>
                                    <p className='font-semibold'>Medicine Groups</p>
                                </div>
                            </div>
                        </div>

                        <div className='border-2 border-gray-400 w-1/2 bg-white py-2'>
                            <div className='px-5 py-1 flex items-center justify-between border-b border-gray-400'>
                                <h3 className='text-xl font-bold'>Inventory</h3>
                            </div>
                            <div className='px-5 flex py-5'>
                                <div className='w-1/2 text-start'>
                                    <h3 className='text-xl font-bold'>298</h3>
                                    <p className='font-semibold'>Lifetime Supply</p>
                                </div>
                                <div className='w-1/2 text-start'>
                                    <h3 className='text-xl font-bold'>290</h3>
                                    <p className='font-semibold'>Lifetime Sales</p>
                                </div>
                                <div className='w-1/2 text-start'>
                                    <h3 className='text-xl font-bold'>08</h3>
                                    <p className='font-semibold'>Stock Left</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-5 space-y-5'>

                        <div className='border-2 border-gray-400 w-full bg-white py-2'>
                            <div className='px-5 py-1 flex items-center justify-between border-b border-gray-400'>
                                <h3 className='text-xl font-bold'>How to use</h3>
                            </div>
                            <div className='px-5 flex py-2'>
                                <div className=' text-start'>
                                    <p className='font-semibold'>Take this medication by mouth with or without food as directed by your doctor, usually once daily.</p>
                                </div>
                            </div>
                        </div>

                        <div className='border-2 border-gray-400 w-full bg-white py-2'>
                            <div className='px-5 py-1 flex items-center justify-between border-b border-gray-400'>
                                <h3 className='text-xl font-bold'>Side Effects</h3>
                            </div>
                            <div className='px-5 flex py-2'>
                                <div className=' text-start'>
                                    <p className='font-semibold'>Dizziness, lightheadedness, drowsiness, nausea, vomiting, tiredness, excess saliva/drooling, blurred vision, weight gain, constipation, headache, and trouble sleeping may occur. If any of these effects persist or worsen, consult your doctor.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button className='border px-4 py-2 bg-white font-semibold text-red-500 border-red-500 rounded'>
                                Delete Medicine
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MedicineDetails;
