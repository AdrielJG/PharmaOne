import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MedicineDetails = () => {
    const { id } = useParams(); // Extract medicine ID from URL parameters
    const navigate = useNavigate(); // For redirecting the user
    const [medicine, setMedicine] = useState(null); // Medicine data state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [editMode, setEditMode] = useState(false); // Toggle edit mode
    const [updatedFields, setUpdatedFields] = useState({}); // Track updated fields

    useEffect(() => {
        const fetchMedicineDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/medicinedetails/${id}`, {
                    withCredentials: true, // Ensure cookies are sent with the request
                });
                setMedicine(response.data);
            } catch (err) {
                console.error('Error:', err);
                if (err.response && err.response.status === 401) {
                    navigate('/login'); // Redirect to login if the user is unauthorized
                } else {
                    setError('Error fetching medicine details');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMedicineDetails();
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedFields({ ...updatedFields, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:5000/api/medicinedetails/${id}`,
                updatedFields,
                { withCredentials: true }
            );
            alert(response.data.message || 'Medicine details updated successfully!');
            setEditMode(false); // Exit edit mode
            setUpdatedFields({}); // Clear updated fields
            setMedicine({ ...medicine, ...updatedFields }); // Update medicine data locally
        } catch (err) {
            console.error('Error updating medicine:', err);
            alert('Failed to update medicine details.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!medicine) return <div>Medicine not found</div>;

    return (
        <div className="w-full min-h-screen bg-stone-200">
            <div className="px-10 py-10">
                {/* Breadcrumb */}
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <h1 className="text-2xl font-bold">
                            <Link to="/inventory" className="text-gray-400 hover:text-black">
                                Inventory
                            </Link>{' '}
                            &gt;{' '}
                            <Link to="/inventory/medicinelist" className="text-gray-400 hover:text-black">
                                List of Medicines
                            </Link>{' '}
                            &gt; {medicine.medicine_name || 'N/A'}
                        </h1>
                        <h3>List of medicines available for sales.</h3>
                    </div>
                    <button
                        className="border px-4 py-2 bg-blue-500 text-white border-blue-500 rounded"
                        onClick={() => setEditMode(!editMode)}
                    >
                        {editMode ? 'Cancel Edit' : 'Edit Details'}
                    </button>
                </div>

                {!editMode ? (
                    // View Mode
                    <>
                        {/* Main details */}
                        <div className="flex flex-wrap gap-10">
                            {/* Medicine Details */}
                            <div className="border-2 border-stone-400 w-full lg:w-1/2 bg-white py-2">
                                <div className="px-5 py-1 border-b border-stone-400">
                                    <h3 className="text-xl font-bold">Medicine</h3>
                                </div>
                                <div className="px-5 py-5">
                                    <div className="flex justify-between">
                                        <div className="w-1/2">
                                            <h3 className="text-xl font-bold">{medicine.medicine_id || 'N/A'}</h3>
                                            <p className="font-semibold">Medicine ID</p>
                                        </div>
                                        <div className="w-1/2">
                                            <h3 className="text-xl font-bold">{medicine.medicine_group || 'N/A'}</h3>
                                            <p className="font-semibold">Medicine Group</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Inventory Details */}
                            <div className="border-2 border-gray-400 w-full lg:w-1/2 bg-white py-2">
                                <div className="px-5 py-1 border-b border-gray-400">
                                    <h3 className="text-xl font-bold">Inventory</h3>
                                </div>
                                <div className="px-5 py-5">
                                    <div className="flex justify-between">
                                        <div className="w-1/3">
                                            <h3 className="text-xl font-bold">{medicine.quantity || 'N/A'}</h3>
                                            <p className="font-semibold">Stock Left</p>
                                        </div>
                                        <div className="w-1/3">
                                            <h3 className="text-xl font-bold">{medicine.sales || 'N/A'}</h3>
                                            <p className="font-semibold">Lifetime Sales</p>
                                        </div>
                                        <div className="w-1/3">
                                            <h3 className="text-xl font-bold">{medicine.stock || 'N/A'}</h3>
                                            <p className="font-semibold">Lifetime Supply</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-5 space-y-5">
                            {/* How to use */}
                            <div className="border-2 border-gray-400 w-full bg-white py-2">
                                <div className="px-5 py-1 border-b border-gray-400">
                                    <h3 className="text-xl font-bold">How to Use</h3>
                                </div>
                                <div className="px-5 py-2">
                                    <p className="font-semibold">
                                        {medicine.usage_instructions || 'No instructions available'}
                                    </p>
                                </div>
                            </div>

                            {/* Side Effects */}
                            <div className="border-2 border-gray-400 w-full bg-white py-2">
                                <div className="px-5 py-1 border-b border-gray-400">
                                    <h3 className="text-xl font-bold">Side Effects</h3>
                                </div>
                                <div className="px-5 py-2">
                                    <p className="font-semibold">
                                        {medicine.side_effects || 'No side effects listed'}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end">
                                <button className="border px-4 py-2 bg-white font-semibold text-red-500 border-red-500 rounded">
                                    Delete Medicine
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    // Edit Mode
                    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-5 rounded shadow-md">
                        <div>
                            <label className="block font-semibold">Medicine Name</label>
                            <input
                                type="text"
                                name="medicine_name"
                                defaultValue={medicine.medicine_name}
                                onChange={handleInputChange}
                                className="border w-full px-3 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Medicine Group</label>
                            <input
                                type="text"
                                name="medicine_group"
                                defaultValue={medicine.medicine_group}
                                onChange={handleInputChange}
                                className="border w-full px-3 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                defaultValue={medicine.quantity}
                                onChange={handleInputChange}
                                className="border w-full px-3 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">How to Use</label>
                            <textarea
                                name="usage_instructions"
                                defaultValue={medicine.usage_instructions}
                                onChange={handleInputChange}
                                className="border w-full px-3 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Side Effects</label>
                            <textarea
                                name="side_effects"
                                defaultValue={medicine.side_effects}
                                onChange={handleInputChange}
                                className="border w-full px-3 py-2 rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Save Changes
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default MedicineDetails;
