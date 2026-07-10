import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MedicineDetails = () => {
    const { id } = useParams(); // Extract the medicine ID from the URL

    const [medicine, setMedicine] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Assuming you have an API to fetch medicine details
        fetch(`https://api.example.com/medicines/${id}`)
        .then(response => response.json())
        .then(data => {
            setMedicine(data);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching medicine data:", error);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!medicine) {
        return <p>Medicine not found</p>;
    }
    
  return (
    <div className='p-8 flex-1'>
      <h2 className='text-2xl font-semibold mb-6'>
        Compliance Checks <span className="text-gray-600">&gt; Compliance Status</span> <span className="text-gray-800">Azithral 500 Tablet</span>
      </h2>
      <p className='text-sm text-gray-500 mb-4'>List of medicines available for sales.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold text-gray-800">Medicine</h3>
          <p className="text-gray-500 mt-2">298 <span className="block text-sm text-gray-400">Medicine ID</span></p>
          <p className="text-gray-500 mt-2">24 <span className="block text-sm text-gray-400">Medicine Group</span></p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold text-gray-800">Inventory in Qty</h3>
          <p className="text-gray-500 mt-2">298 <span className="block text-sm text-gray-400">Lifetime Supply</span></p>
          <p className="text-gray-500 mt-2">290 <span className="block text-sm text-gray-400">Lifetime Sales</span></p>
          <p className="text-gray-500 mt-2">08 <span className="block text-sm text-gray-400">Stock Left</span></p>
        </div>
        <div className="bg-white shadow rounded p-4 flex items-center justify-center">
          <button className="bg-[#00BFFF] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#0099cc]">
            Send Stock Request
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="font-semibold text-gray-800">How to use</h3>
        <p className="text-gray-500 mt-2">Take this medication by mouth with or without food as directed by your doctor, usually once daily.</p>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h3 className="font-semibold text-gray-800">Side Effects</h3>
        <p className="text-gray-500 mt-2">
          Dizziness, lightheadedness, drowsiness, nausea, vomiting, tiredness, excess saliva/drooling, blurred vision, weight gain,
          constipation, headache, and trouble sleeping may occur. If any of these effects persist or worsen, consult your doctor.
        </p>
      </div>
    </div>
  );
};

export default MedicineDetails;
