import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddMedicine = () => {
    const navigate = useNavigate(); // Move this inside the component

    const [formData, setFormData] = useState({
        medicine_name: '',
        medicine_id: '',
        medicine_group: 'Select Category',
        quantity: '',
        usage_instructions: '',
        side_effects: '',
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategorySelect = (category) => {
        setFormData({ ...formData, medicine_group: category });
        setIsDropdownOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log("Submitting form...", formData); // Debug: log form data
        
        try {
            const response = await fetch("http://localhost:5000/api/add-medicine", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Send the formData state
                credentials: "include", // For session handling
            });
    
            const result = await response.json();
            console.log("API Response:", result);
    
            if (response.ok) {
                alert("Medicine added successfully!");
                navigate('/inventory/medicinelist'); // Redirect to the desired page
            } else {
                alert(result.message || "An error occurred.");
            }
        } catch (error) {
            console.error("Error occurred:", error);
            alert("Failed to add the medicine. Please try again.");
        }
    };
            
    return (
        <div className='w-full bg-stone-200'>
            <div className='px-10 py-10'>
                <div className='flex justify-between items-center mb-5'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            <span>
                                <Link to='/inventory' className='text-gray-400 hover:text-black'>
                                    Inventory
                                </Link>{' '}
                                &gt;{' '}
                                <Link to='/inventory/medicinelist' className='text-gray-400 hover:text-black'>
                                    List of Medicines
                                </Link>{' '}
                                &gt; Add New Medicine
                            </span>
                        </h1>
                        <h3>*All fields are mandatory, except mentioned as (optional).</h3>
                    </div>
                </div>

                <div className='w-full '>
                    <form className='w-3/4' onSubmit={handleSubmit}>
                        <div className='w-full gap-10 mb-4 flex'>
                            <div className='w-1/2'>
                                <label className='block mb-2 text-sm font-semibold text-gray-700'>Medicine Name</label>
                                <input
                                    type="text"
                                    name="medicine_name"
                                    value={formData.medicine_name}
                                    onChange={handleInputChange}
                                    className='w-full rounded outline-none bg-gray-300 px-2 py-1'
                                />
                            </div>

                            <div className='w-1/2'>
                                <label className='block mb-2 text-sm font-semibold text-gray-700'>Medicine ID</label>
                                <input
                                    type="text"
                                    name="medicine_id"
                                    value={formData.medicine_id}
                                    onChange={handleInputChange}
                                    className='w-full rounded outline-none bg-gray-300 px-2 py-1'
                                />
                            </div>
                        </div>

                        <div className='w-full gap-10 flex'>
                            <div className='w-1/2'>
                                <label className='block mb-2 text-sm font-semibold text-gray-700'>Medicine Group</label>
                                <div className='relative'>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsDropdownOpen(!isDropdownOpen);
                                        }}
                                        className='border w-full flex items-center gap-5 text-black px-2 py-1 bg-gray-300 border-gray-300 rounded'
                                    >
                                        {formData.medicine_group}
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
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    className='w-full rounded outline-none bg-gray-300 px-2 py-1'
                                />
                            </div>
                        </div>

                        <div className='w-full mt-4'>
                            <label className='block mb-2 text-sm font-semibold text-gray-700'>How to use</label>
                            <textarea
                                name="usage_instructions"
                                value={formData.usage_instructions}
                                onChange={handleInputChange}
                                className='text-wrap w-full rounded outline-none bg-gray-300 px-2 py-1 h-32'
                            />
                        </div>

                        <div className='w-full'>
                            <label className='block mb-2 text-sm font-semibold text-gray-700'>Side Effects</label>
                            <textarea
                                name="side_effects"
                                value={formData.side_effects}
                                onChange={handleInputChange}
                                className='text-wrap w-full rounded outline-none bg-gray-300 px-2 py-1 h-32'
                            />
                        </div>

                        <input
                            type="submit"
                            value="Proceed"
                            className="border mt-5 px-4 py-2 text-white font-semibold bg-red-500 border-red-500 rounded cursor-pointer"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMedicine;
