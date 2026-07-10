import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import arrowdown from '../../assets/svgs/arrowdown.svg';


const DispatchModal = ({ onClose, onNext }) => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg">
            <h2 className="text-xl mb-3 font-bold">Dispatch </h2>
            <p className='text-gray-400'>how would you like to dispatch the medicines?</p>
            <div className='flex justify-evenly mt-3 '>

                <button className="btn px-6 py-2 text-white rounded-lg bg-[#009099]" onClick={() => onNext('username')}>By Username</button>
                <button className="btn px-6 py-2 text-white rounded-lg bg-[#009099]" onClick={() => onNext('address')}>By Address</button><br />
            </div>
            <div className='flex w-full justify-center mt-5'>

                <button className="btn px-6 py-2 text-white rounded-lg bg-red-500 " onClick={onClose}>Cancel</button>
            </div>
        </div>
    </div>
);

const InputModal = ({ type, onClose, onProceed }) => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg">
            <h2 className="text-xl mb-4">Enter {type === 'username' ? 'Username' : 'Address'}</h2>
            <input type="text" className="input w-full outline-none bg-gray-300 px-2 py-1 rounded" placeholder={`Enter ${type}`} />
            <div className='flex justify-evenly mt-3 gap-10'>
                <button className="btn  mt-4 px-6 py-2 text-white rounded-lg bg-red-500" onClick={onClose}>Cancel</button>
                <button className="btn mt-4 px-6 py-2 text-white rounded-lg bg-[#009099]" onClick={onProceed}>Dispatch</button>
            </div>
        </div>
    </div>
);

const MultiStepModal = ({ step, onNext, onCancel, onComplete }) => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg w-[600px]">
            <div className="mb-1">
                <h2 className='text-center font-semibold text-xl'>Create an Order</h2>
                <p className='text-center text-gray-400'>fill out the form below to go to next step.</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                    <div className="bg-gray-700 h-2.5 rounded-full" style={{ width: `${(step / 3) * 100}%` }}></div>
                </div>

            </div>
            {step === 1 && (
                <>
                    <div className='flex w-full justify-between'>

                        <h3 className="font-bold mb-4">Pickup Contact Details</h3>
                        <h2 className=" mb-2">Step {step} of 3</h2>
                    </div>
                    <div>
                        <label className="block text-sm mt-2 font-semibold">Address</label>
                        <input type="text" className="input w-full outline-none border px-3 py-1" />
                    </div>
                    <div className='flex gap-2 mt-2'>
                        <div className='w-1/2'>

                            <label className="block text-sm mt-2 font-semibold">Road/Apartment/House No</label>
                            <input type="text" className="input w-full outline-none border px-3 py-1" />
                        </div>
                        <div className='w-1/2'>

                            <label className="block text-sm mt-2 font-semibold">Email</label>
                            <input type="text" className="input w-full outline-none border px-3 py-1" />
                        </div>
                    </div>
                    <div className='flex gap-2 mt-2'>
                        <div className='w-2/3'>

                            <label className="block text-sm mt-2 font-semibold">Name</label>
                            <input type="text" className="input w-full outline-none border px-3 py-1" />
                        </div>
                        <div className='w-1/2'>

                            <label className="block text-sm mt-2 font-semibold">Phone Number</label>
                            <input type="text" className="input w-full outline-none border px-3 py-1" />
                        </div>
                    </div>
                    <div className='mt-2'>
                        <label className="block text-sm mt-2 font-semibold">Pickup Notes</label>
                        <textarea type="text" className="input w-full outline-none border px-3 py-1" ></textarea>
                    </div>
                </>
            )}
            {step === 2 && (
                <>
                <div className='flex w-full justify-between'>

                    <h3 className="font-bold mb-4">Dropoff Contact Details</h3>
                    <h2 className=" mb-2">Step {step} of 3</h2>
                </div>
                <div>
                    <label className="block text-sm mt-2 font-semibold">Address</label>
                    <input type="text" className="input w-full outline-none border px-3 py-1" />
                </div>
                <div className='flex gap-2 mt-2'>
                    <div className='w-1/2'>

                        <label className="block text-sm mt-2 font-semibold">Road/Apartment/House No</label>
                        <input type="text" className="input w-full outline-none border px-3 py-1" />
                    </div>
                    <div className='w-1/2'>

                        <label className="block text-sm mt-2 font-semibold">Email</label>
                        <input type="text" className="input w-full outline-none border px-3 py-1" />
                    </div>
                </div>
                <div className='flex gap-2 mt-2'>
                    <div className='w-2/3'>

                        <label className="block text-sm mt-2 font-semibold">Name</label>
                        <input type="text" className="input w-full outline-none border px-3 py-1" />
                    </div>
                    <div className='w-1/2'>

                        <label className="block text-sm mt-2 font-semibold">Phone Number</label>
                        <input type="text" className="input w-full outline-none border px-3 py-1" />
                    </div>
                </div>
                <div className='mt-2'>
                    <label className="block text-sm mt-2 font-semibold">Pickup Notes</label>
                    <textarea type="text" className="input w-full outline-none border px-3 py-1" ></textarea>
                </div>
            </>
            )}
            {step === 3 && (
                <>
                <div className='flex w-full justify-between'>

                    <h3 className="font-bold mb-4">Pickup Contact Details</h3>
                    <h2 className=" mb-2">Step {step} of 3</h2>
                </div>
                
                <div className='flex gap-2 mt-2'>
                    <div className='w-1/2'>

                        <label className="block text-sm mt-2 font-semibold">Ref</label>
                        <input type="text" className="input w-full outline-none border px-3 py-1" />
                    </div>
                    <div className='w-1/2'>

                        <label className="block text-sm mt-2 font-semibold">Tag</label>
                        <input type="text" className="input w-full outline-none border px-3 py-1" />
                    </div>
                </div>
                <div className='flex gap-2 mt-2'>
                    <div className='w-1/2'>

                        <label className="block text-sm mt-2 font-semibold">Branch</label>
                        <input type="text" className="input w-full outline-none border px-3 py-1" />
                    </div>
                    <div className='w-1/2'>

                        <label className="block text-sm mt-2 font-semibold">Special Skills</label>
                        <input type="text" className="input w-full outline-none border px-3 py-1" />
                    </div>
                </div>
                <div className='flex gap-2 mt-2'>
                    <div className='w-1/2'>

                        <label className="block text-sm mt-2 font-semibold">Service Time</label>
                        <input type="text" className="input w-full outline-none border px-3 py-1" />
                    </div>
                    <div className='w-1/2'>

                        <label className="block text-sm mt-2 font-semibold">Priority (0-100)</label>
                        <input type="text" className="input w-full outline-none border px-3 py-1" />
                    </div>
                </div>
                <div className='flex gap-2 mt-2'>
                    <div className='w-1/2'>

                        <label className="block text-sm mt-2 font-semibold">Height</label>
                        <input type="text" className="input w-full outline-none border px-3 py-1" />
                    </div>
                    <div className='w-1/2'>

                        <label className="block text-sm mt-2 font-semibold">Weight</label>
                        <input type="text" className="input w-full outline-none border px-3 py-1" />
                    </div>
                </div>
                <div className='flex gap-2 mt-2'>
                    <div className='w-1/2'>

                        <label className="block text-sm mt-2 font-semibold">Price</label>
                        <input type="text" className="input w-full outline-none border px-3 py-1" />
                    </div>
                    <div className='w-1/2'>

                        <label className="block text-sm mt-2 font-semibold">Payment Method</label>
                        <input type="text" className="input w-full outline-none border px-3 py-1" />
                    </div>
                </div>
                
            </>
            )}
            <div className="mt-4 text-end">
                <button className="btn px-6 py-2 text-white rounded-lg bg-red-500 mr-5" onClick={onCancel}>Cancel</button>
                {step < 3 ? (
                    <button className="btn mt-4 px-6 py-2 text-white rounded-lg bg-[#009099]" onClick={onNext}>Next</button>
                ) : (
                    <button className="btn mt-4 px-6 py-2 text-white rounded-lg bg-[#009099]" onClick={onComplete}>Dispatch</button>
                )}
            </div>
        </div>
    </div>
);

const MedicineList = () => {
    const [dispatchStep, setDispatchStep] = useState(0);
    const [inputType, setInputType] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
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
        setDispatchStep(1);
    };

    const handleNext = (type) => {
        setInputType(type);
        setDispatchStep(2);
    };

    const handleProceed = () => {
        setDispatchStep(3);
    };

    const handleStepNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleComplete = () => {
        alert('Order dispatched successfully!');
        setDispatchStep(0);
        setCurrentStep(1);
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
                            &#43; Add New Item
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
                        <div className='relative'>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className='border flex items-center gap-5 text-black px-4 py-2 bg-white border-gray-300 rounded'
                            >
                                {selectedCategory}
                                <img src={arrowdown} alt="Dropdown Arrow" />
                            </button>
                            {isDropdownOpen && (
                                <ul className='absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg'>
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
                    {/* Table */}
                    <div className='overflow-x-auto'>
                        <table className='min-w-full bg-white font-semibold'>
                            <thead>
                                <tr>
                                    <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Medicine Name
                                    </th>
                                    <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Medicine ID
                                    </th>
                                    <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Stock (Ql)
                                    </th>
                                    <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Completed Status
                                    </th>
                                    <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Dispatch Status
                                    </th>
                                    <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Dispatch
                                    </th>
                                    <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMedicines.map((medicine) => (
                                    <tr key={medicine.id}>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{medicine.name}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{medicine.id}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{medicine.stock}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            <span className={completedStatusStyles[medicine.completedStatus]}>
                                                {medicine.completedStatus}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{medicine.dispatchStatus}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            <button
                                                onClick={() => handleDispatchClick(medicine.id)}
                                                className={`btn ${dispatchedMedicines.includes(medicine.id) ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-blue-500 text-white'} px-4 py-2 rounded`}
                                                disabled={dispatchedMedicines.includes(medicine.id)}
                                            >
                                                Dispatch
                                            </button>
                                        </td>
                                        <td className='px-2 py-4   text-sm'>
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
                {dispatchStep === 1 && <DispatchModal onClose={() => setDispatchStep(0)} onNext={handleNext} />}
                {dispatchStep === 2 && <InputModal type={inputType} onClose={() => setDispatchStep(0)} onProceed={handleProceed} />}
                {dispatchStep === 3 && (
                    <MultiStepModal
                        step={currentStep}
                        onNext={handleStepNext}
                        onCancel={() => setDispatchStep(0)}
                        onComplete={handleComplete}
                    />
                )}
            </div>
        </div>
    );
};

export default MedicineList;
