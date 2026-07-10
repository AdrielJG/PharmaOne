import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react"; // Icon for loading state

const ManufacturersPharmaciesList = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [pharmacies, setPharmacies] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [inventory, setInventory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/api/get-manufacturer-names")
            .then((response) => response.json())
            .then((data) => setManufacturers(data.manufacturers))
            .catch((error) => setError(error.message));

        fetch("http://localhost:5000/api/get-pharmacie-names")
            .then((response) => response.json())
            .then((data) => setPharmacies(data.pharmacies))
            .catch((error) => setError(error.message));
    }, []);

    const handleUserClick = (email) => {
        setLoading(true);
        setSelectedUser(email);
        fetch(`http://localhost:5000/api/get-inventory-details/${email}`)
            .then((response) => response.json())
            .then((data) => setInventory(data.inventory))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 p-10">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Manufacturers & Pharmacies
                </h1>

                {error && <p className="text-red-500 text-center mb-4">Error: {error}</p>}

                <div className="grid grid-cols-2 gap-8">
                    {/* Manufacturers */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-3">Manufacturers</h2>
                        <div className="space-y-3">
                            {manufacturers.map((manufacturer) => (
                                <div
                                    key={manufacturer.email}
                                    onClick={() => handleUserClick(manufacturer.email)}
                                    className={`cursor-pointer p-4 rounded-xl shadow-md transition-all duration-300 ${
                                        selectedUser === manufacturer.email
                                            ? "bg-teal-500 text-white"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                >
                                    {manufacturer.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pharmacies */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-3">Pharmacies</h2>
                        <div className="space-y-3">
                            {pharmacies.map((pharmacy) => (
                                <div
                                    key={pharmacy.email}
                                    onClick={() => handleUserClick(pharmacy.email)}
                                    className={`cursor-pointer p-4 rounded-xl shadow-md transition-all duration-300 ${
                                        selectedUser === pharmacy.email
                                            ? "bg-teal-500 text-white"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                >
                                    {pharmacy.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Inventory Section */}
                {selectedUser && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-3">Inventory</h2>

                        {loading ? (
                            <div className="flex justify-center items-center">
                                <Loader className="animate-spin w-8 h-8 text-teal-500" />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white shadow-md rounded-lg">
                                    <thead className="bg-teal-500 text-white">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                                                Medicine Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                                                Quantity
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventory.length > 0 ? (
                                            inventory.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                                                >
                                                    <td className="px-6 py-4 text-sm text-gray-800">
                                                        {item.medicine_name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-800">
                                                        {item.quantity}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2" className="text-center text-gray-500 py-4">
                                                    No inventory available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManufacturersPharmaciesList;
