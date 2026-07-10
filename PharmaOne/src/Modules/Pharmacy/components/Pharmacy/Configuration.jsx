import React from 'react'

const Configuration = () => {
    return (

        <div className='w-full h-full bg-stone-200 '>
            <div className=' px-10 pt-10'>
                <div className='flex justify-between items-center mb-5'>
                    <div>
                        <h1 className='text-2xl font-bold '>Configuration</h1>
                        <h3>Configure your pharmacy application.</h3>
                    </div>

                </div>

            </div>
            <div className='grid grid-cols-2 gap-4 px-10 '>
                <div className='border border-gray-500 bg-white'>
                    <div className='px-5 py-1 flex items-center justify-between border-b border-gray-500'>
                        <h3 className='text-xl font-bold'>Branding</h3>
                    </div>
                    <div className='px-5 flex py-5'>
                        <div className='w-1/2 text-start'>
                            <h3 className='text-xl font-bold'>Enter Name</h3>
                            <p className='font-semibold'>Pharmacy Name</p>
                        </div>
                        <div className='w-1/2 text-start'>
                            <h3 className='text-xl font-bold'>PH349TY228</h3>
                            <p className='font-semibold'>Pharmacy ID</p>
                        </div>
                    </div>
                </div>

                <div className='border border-gray-500 bg-white'>
                    <div className='px-5 py-1 flex items-center justify-between border-b border-gray-500'>
                        <h3 className='text-xl font-bold'>Owner</h3>
                    </div>
                    <div className='px-5 flex py-5'>
                        <div className='w-1/2 text-start'>
                            <h3 className='text-xl font-bold'>Enter Name</h3>
                            <p className='font-semibold'>Owner Name</p>
                        </div>
                        <div className='w-1/2 text-start'>
                            <h3 className='text-xl font-bold'>user@mail.com</h3>
                            <p className='font-semibold'>Email ID</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Configuration