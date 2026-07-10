import React, { useState } from 'react';

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Supplier A', contractsDue: 2, contact: 'supplierA@example.com' },
    { id: 2, name: 'Supplier B', contractsDue: 0, contact: 'supplierB@example.com' },
    { id: 3, name: 'Supplier C', contractsDue: 1, contact: 'supplierC@example.com' },
  ]);

  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contractsDue: '',
    contact: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier((prevSupplier) => ({ ...prevSupplier, [name]: value }));
    setError(''); // Clear error message when the user starts typing
  };

  const addSupplier = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!newSupplier.name || !newSupplier.contractsDue || !newSupplier.contact) {
      setError('Please fill in all fields.');
      return;
    }

    const newId = suppliers.length ? suppliers[suppliers.length - 1].id + 1 : 1;
    setSuppliers([...suppliers, { id: newId, ...newSupplier }]);
    setNewSupplier({ name: '', contractsDue: '', contact: '' });
  };

  return (
    <div className="no-scrollbar w-full h-full p-6 bg-gray-100 overflow-y-scroll">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 relative z-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Supplier Management</h1>
        
        {/* Supplier Table */}
        <div className="overflow-x-auto mb-6 relative z-10">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Supplier ID</th>
                <th className="px-4 py-2">Supplier Name</th>
                <th className="px-4 py-2">Contracts Due</th>
                <th className="px-4 py-2">Contact</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="border px-4 py-2">{supplier.id}</td>
                  <td className="border px-4 py-2">{supplier.name}</td>
                  <td className="border px-4 py-2">{supplier.contractsDue}</td>
                  <td className="border px-4 py-2">{supplier.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Supplier Form */}
        <form onSubmit={addSupplier} className="bg-gray-50 p-4 rounded-lg shadow-md relative z-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Supplier</h2>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Supplier Name</label>
            <input
              type="text"
              name="name"
              value={newSupplier.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Contracts Due</label>
            <input
              type="number"
              name="contractsDue"
              value={newSupplier.contractsDue}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Contact</label>
            <input
              type="email"
              name="contact"
              value={newSupplier.contact}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
          >
            Add Supplier
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupplierManagement;