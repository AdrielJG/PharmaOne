import React from 'react';

const DistributorDashboard = () => {
  return (
    <div className='w-full h-full'>
        <div className='bg-stone-200 px-10 py-10'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h1 className='text-2xl font-bold'>Distributor Dashboard</h1>
                    <h3>A summary of the distribution process, including key metrics like order status and shipment details.</h3>
                </div>
                <div>
                    <button className='border px-4 py-2 bg-white border-gray-500 rounded'>
                        Download Reports
                    </button>
                </div>
            </div>
            <div className='w-full flex gap-5'>
                <a href="/ordersR">
                    <div className='bg-white flex flex-col items-center border-2 border-blue-400 rounded-lg w-64 overflow-hidden pt-3.5 gap-1'>
                        <h3 className='text-2xl font-bold'>75</h3>
                        <p className='font-semibold text-xs leading-none mb-1'>Active Orders</p>
                        <div className='w-full py-1 bg-blue-200 text-center '>
                            <p><u>
                                View Detailed Report 
                            </u></p>
                        </div>
                    </div>
                </a>
                <a href="/inventoryR">
                    <div className='bg-white flex flex-col items-center border-2 border-green-400 rounded-lg w-64 overflow-hidden pt-5 gap-1'>
                        <h3 className='text-2xl font-bold'>5,000</h3>
                        <p className='font-semibold text-sm leading-none mb-1'>Total Products in Stock</p>
                        <div className='w-full bg-green-200 text-center py-1'>
                            <p><u>
                                View Detailed Report 
                            </u></p>
                        </div>
                    </div>
                </a>
                <a href="/shipmentR">
                    <div className='bg-white flex flex-col items-center border-2 border-yellow-400 rounded-lg w-64 overflow-hidden pt-3.5 gap-1'>
                        <h3 className='text-2xl font-bold'>92%</h3>
                        <p className='font-semibold text-xs leading-none mb-1'>On-Time Delivery Rate</p>
                        <div className='w-full py-1 bg-yellow-200 text-center '>
                            <p><u>
                                View Detailed Report 
                            </u></p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div className='px-10 py-10'>
            <div className='grid grid-cols-2 gap-4'>
                <div className='border'>
                    <div className='px-5 py-1 flex items-center justify-between border-b'>
                        <h3 className='text-xl font-bold'>Order Status</h3>
                        <span>Current Orders &gt;</span>
                    </div>
                    <div className='px-5 flex py-5'>
                        <div className='w-1/2 text-start'>
                            <h3 className='text-xl font-bold'>75</h3>
                            <p className='font-semibold'>Active Orders</p>
                        </div>
                        <div className='w-1/2 text-start'>
                            <h3 className='text-xl font-bold'>55</h3>
                            <p className='font-semibold'>Dispatched Orders</p>
                        </div>
                    </div>
                </div>

                <div className='border'>
                    <div className='px-5 py-1 flex items-center justify-between border-b'>
                        <h3 className='text-xl font-bold'>Inventory Overview</h3>
                        <span>Inventory Details &gt;</span>
                    </div>
                    <div className='px-5 flex py-5'>
                        <div className='w-1/2 text-start'>
                            <h3 className='text-xl font-bold'>5,000</h3>
                            <p className='font-semibold'>Products in Stock</p>
                        </div>
                        <div className='w-1/2 text-start'>
                            <h3 className='text-xl font-bold'>150</h3>
                            <p className='font-semibold'>Products to be Restocked</p>
                        </div>
                    </div>
                </div>

                <div className='border'>
                    <div className='px-5 py-1 flex items-center justify-between border-b'>
                        <h3 className='text-xl font-bold'>Shipment Performance</h3>
                        <span>Shipment Details &gt;</span>
                    </div>
                    <div className='px-5 flex py-5'>
                        <div className='w-1/2 text-start'>
                            <h3 className='text-xl font-bold'>92%</h3>
                            <p className='font-semibold'>On-Time Delivery Rate</p>
                        </div>
                        <div className='w-1/2 text-start'>
                            <h3 className='text-xl font-bold'>8</h3>
                            <p className='font-semibold'>Delivery Issues</p>
                        </div>
                    </div>
                </div>

                <div className='border'>
                    <div className='px-5 py-1 flex items-center justify-between border-b'>
                        <h3 className='text-xl font-bold'>Financial Overview</h3>
                        <span>View Financials &gt;</span>
                    </div>
                    <div className='px-5 flex py-5'>
                        <div className='w-1/2 text-start'>
                            <h3 className='text-xl font-bold'>Rs. 12,45,000</h3>
                            <p className='font-semibold'>Total Revenue (Current Month)</p>
                        </div>
                        <div className='w-1/2 text-start'>
                            <h3 className='text-xl font-bold'>1,200</h3>
                            <p className='font-semibold'>Invoices Generated</p>
                        </div>
                    </div>
                </div>

                <div className='border'>
                    <div className='px-5 py-1 flex items-center justify-between border-b'>
                        <h3 className='text-xl font-bold'>Supplier Management</h3>
                        <span>Supplier Details &gt;</span>
                    </div>
                    <div className='px-5 flex py-5'>
                        <div className='w-1/2 text-start'>
                            <h3 className='text-xl font-bold'>10</h3>
                            <p className='font-semibold'>Active Suppliers</p>
                        </div>
                        <div className='w-1/2 text-start'>
                            <h3 className='text-xl font-bold'>2</h3>
                            <p className='font-semibold'>Contracts Due for Renewal</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default DistributorDashboard;