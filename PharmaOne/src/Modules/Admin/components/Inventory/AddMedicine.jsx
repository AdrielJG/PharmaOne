import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddMedicine = () => {
    const [selectedCategory, setSelectedCategory] = useState('Select Category');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const categories = [
        'Pain Relief',
        'Cold and Flu',
        'Vitamins & Supplements',
        'Prescription Medications',
        'Herbal Remedies',
    ];

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);
    };

    const handleDropdownClick = (e) => {
        e.preventDefault();  // Prevent form submission if inside a form
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className='w-full  bg-stone-200'>
            <div className='px-10 py-10'>
                <div className='flex justify-between items-center mb-5'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            <span>
                                <Link to='/inventory' className='text-gray-400 hover:text-black'>
                                    Inventory
                                </Link>{' '}
                                &gt; <Link to='/inventory/medicinelist' className='text-gray-400 hover:text-black'>
                                    List of Medicines
                                </Link>{' '}
                                &gt; Add New Medicine
                            </span>
                        </h1>
                        <h3>*All fields are mandatory, except mentioned as (optional).</h3>
                    </div>
                </div>

                <div className='w-full '>
                    <form className='w-3/4 '>
                        <div className='w-full gap-10 mb-4 flex'>
                            <div className='w-1/2'>
                                <label className='block mb-2 text-sm font-semibold text-gray-700'>Medicine Name</label>
                                <input type="text" className='w-full rounded outline-none bg-gray-300 px-2 py-1' />
                            </div>

                            <div className='w-1/2'>
                                <label className='block mb-2 text-sm font-semibold text-gray-700'>Medicine ID</label>
                                <input type="text" className='w-full rounded outline-none bg-gray-300 px-2 py-1' />
                            </div>
                        </div>

                        <div className='w-full gap-10 flex'>
                            <div className='w-1/2'>
                                <label className='block mb-2 text-sm font-semibold text-gray-700'>Medicine Group</label>
                                <div className='relative'>
                                    <button
                                        onClick={handleDropdownClick}
                                        className='border w-full flex items-center gap-5 text-black px-2 py-1 bg-gray-300 border-gray-300 rounded'
                                    >
                                        {selectedCategory}
                                    </button>
                                    {isDropdownOpen && (
                                        <ul className='absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10'>
                                            {categories.map((category) => (
                                                <li
                                                    key={category}
                                                    onClick={() => handleCategorySelect(category)}
                                                    className='px-4 py-2 cursor-pointer hover:bg-gray-100'
                                                >
                                                    {category}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className='w-1/2'>
                                <label className='block mb-2 text-sm font-semibold text-gray-700'>Quantity in Number</label>
                                <input type="number" className='w-full rounded outline-none bg-gray-300 px-2 py-1' />
                            </div>
                        </div>
                        <div className='w-full mt-4'>
                                <label className='block mb-2 text-sm font-semibold text-gray-700'>How to use</label>
                                <textarea  type="text" className='text-wrap w-full rounded outline-none bg-gray-300 px-2 py-1 h-32' />
                            </div>
                        <div className='w-full'>
                                <label className='block mb-2 text-sm font-semibold text-gray-700'>Side Effects</label>
                                <textarea  type="text" className='text-wrap w-full rounded outline-none bg-gray-300 px-2 py-1 h-32' />
                            </div>
                            
                            <button className='border mt-5 px-4 py-2 text-white font-semibold bg-red-500 border-red-500 rounded'>
                                Proceed
                            </button>
                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMedicine;
