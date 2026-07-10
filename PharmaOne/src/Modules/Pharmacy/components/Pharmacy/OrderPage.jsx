import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
    const navigate = useNavigate();

    const [medicineList, setMedicineList] = useState([]);
    const [formData, setFormData] = useState({
        medicine_name: '',
        medicine_group: 'Select Category',
        quantity: '',
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const categories = [
        "Pain and Inflammation", "Anti-Infectives", "Cardiovascular", "Respiratory", 
        "Gastrointestinal", "Endocrine", "Nervous System", "Musculoskeletal", 
        "Dermatological", "Miscellaneous"
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategorySelect = (category) => {
        setFormData({ ...formData, medicine_group: category });
        setIsDropdownOpen(false);
    };

    const handleAddMedicine = () => {
        if (!formData.medicine_name || !formData.quantity || formData.medicine_group === 'Select Category') {
            alert("Please fill out all fields before adding.");
            return;
        }

        setMedicineList([...medicineList, { ...formData, id: Date.now() }]);
        setFormData({ medicine_name: '', medicine_group: 'Select Category', quantity: '' });
    };

    const handleRemoveMedicine = (id) => {
        setMedicineList(medicineList.filter((med) => med.id !== id));
    };

    const handleEditMedicine = (id) => {
        const medicineToEdit = medicineList.find((med) => med.id === id);
        setFormData(medicineToEdit);
        handleRemoveMedicine(id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (medicineList.length === 0) {
            alert("Please add at least one medicine before submitting.");
            return;
        }

        setIsConfirmationOpen(true);
    };

    const confirmOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/order-medicine", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(medicineList),
                credentials: "include",
            });

            const result = await response.json();
            console.log("API Response:", result);

            if (response.ok) {
                alert("Order placed successfully!");
                navigate('/ordernowP');
            } else {
                alert(result.message || "An error occurred.");
            }
        } catch (error) {
            console.error("Error occurred:", error);
            alert("Failed to place the order. Please try again.");
        } finally {
            setIsConfirmationOpen(false);
        }
    };

    return (
        <div className='w-full h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center items-center'>
            <div className='bg-white shadow-lg rounded-lg p-8 w-3/4 max-w-2xl'>
                <button onClick={() => navigate('/ordernowP')} className="mb-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-300">
                    ← Back to Orders
                </button>
                <h1 className='text-3xl font-bold text-gray-800 mb-2'>Place a New Order</h1>
                <p className='text-gray-600'>Fill out the form below to order your medicines.</p>
                
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block mb-2 text-sm font-semibold text-gray-700'>Medicine Name</label>
                        <input type="text" name="medicine_name" value={formData.medicine_name} onChange={handleInputChange} 
                            className='w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Enter medicine name" />
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2 text-sm font-semibold text-gray-700'>Medicine Group</label>
                        <div className='relative'>
                            <button onClick={(e) => { e.preventDefault(); setIsDropdownOpen(!isDropdownOpen); }} 
                                className='w-full text-left rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                                {formData.medicine_group}
                            </button>
                            {isDropdownOpen && (
                                <ul className='absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10'>
                                    {categories.map((category) => (
                                        <li key={category} onClick={() => handleCategorySelect(category)}
                                            className='px-3 py-1 text-sm text-gray-700 cursor-pointer hover:bg-blue-100'>
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2 text-sm font-semibold text-gray-700'>Quantity</label>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} 
                            className='w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Enter quantity" />
                    </div>
                    <button type="button" onClick={handleAddMedicine} className='bg-green-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 mb-4'>
                        + Add Medicine
                    </button>
                    <ul className='mb-4'>
                        {medicineList.map((med) => (
                            <li key={med.id} className='flex justify-between items-center text-gray-800 mb-2'>
                                <span>
                                    {med.medicine_name} ({med.medicine_group}) - {med.quantity}
                                </span>
                                <div>
                                    <button onClick={() => handleEditMedicine(med.id)} className='text-blue-500 hover:text-blue-700 mr-2'>
                                        Edit
                                    </button>
                                    <button onClick={() => handleRemoveMedicine(med.id)} className='text-red-500 hover:text-red-700'>
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='flex justify-end'>
                        <button type="submit" className='bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200'>
                            Place Order
                        </button>
                    </div>
                </form>

                {isConfirmationOpen && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                        <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
                            <h2 className='text-xl font-bold mb-4'>Confirm Order</h2>
                            <p className='mb-4'>Please review the medicines you are about to order:</p>
                            <ul className='mb-4'>
                                {medicineList.map((med) => (
                                    <li key={med.id} className='text-gray-800 mb-2'>
                                        {med.medicine_name} ({med.medicine_group}) - {med.quantity}
                                    </li>
                                ))}
                            </ul>
                            <div className='flex justify-end mt-4'>
                                <button onClick={() => setIsConfirmationOpen(false)} className='bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600'>
                                    Keep Editing
                                </button>
                                <button onClick={confirmOrder} className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>
                                    Confirm Order
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderPage;