import React from 'react'
import { Link } from 'react-router-dom'
import medicbag from '../../assets/svgs/medicbag.svg'
import medicbaggreen from '../../assets/svgs/medicbaggreen.svg'

const Inventory = () => {
  return (
    <div className='w-full h-full bg-stone-200 '>
    <div className=' px-10 py-10'>
        <div className='flex justify-between items-center mb-5'>
            <div>
                <h1 className='text-2xl font-bold '>Inventory</h1>
                <h3>List of medicines available for sales.</h3>
            </div>
            <Link to="medicinelist/addmedicine">
                <div>
                    <button className='border px-4 py-2 bg-red-500 text-white border-red-500 rounded'>
                    &#43; Add New Item
                    </button>
                </div>
            </Link>
        </div>
        <div className='w-full flex gap-5 '>
        <Link to="medicinelist">
            <div className='bg-white flex flex-col items-center border-2 border-blue-400 rounded-lg w-64 overflow-hidden pt-5 gap-1'>
                <img src={medicbag} alt="" className='w-8 mb-1'/>
                <h3 className='text-2xl font-bold'>298</h3>
                <p className='font-semibold leading-none mb-5'>Medicines Available</p>
                <div className='w-full bg-blue-200 text-center py-1'>
                    <p>
                        View Full List 
                    </p>
                </div>
            </div>
        </Link>

        <Link to="medicinegroups">
            <div className='bg-white flex flex-col items-center border-2 border-green-400 rounded-lg w-64 overflow-hidden pt-5 gap-1'>
                <img src={medicbaggreen} alt="" className='w-8'/>
                <h3 className='text-2xl font-bold'>Good</h3>
                <p className='font-semibold leading-none mb-5'>Inventory Status</p>
                <div className='w-full py-1 bg-green-200 text-center '>
                    <p>
                        View Groups 
                    </p>
                </div>
            </div>
        </Link>
        </div>
    </div>
</div>
  )
}

export default Inventory