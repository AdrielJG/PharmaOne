import React from 'react'
import money from '../assets/svgs/money.svg'
import health from '../assets/svgs/health.svg'

const Reports = () => {
  return (
    <div className='w-full h-full bg-stone-200 '>
    <div className=' px-10 py-10'>
        <div className='flex justify-between items-center mb-5'>
            <div>
                <h1 className='text-2xl font-bold '>Reports</h1>
                <h3>Detailed sales and payment report.</h3>
            </div>
            
        </div>
        <div className='w-full flex gap-5 '>
       
        <a href="/sales">
                    <div className='bg-white flex flex-col items-center border-2 border-yellow-400 rounded-lg w-64 overflow-hidden pt-5 gap-1'>
                        <img src={money} alt="" className='w-10 mb-2'/>
                        <h3 className='text-2xl font-bold'>Rs. 8,55,875</h3>
                        <p className='font-semibold leading-none mb-5'>Total Sales Report</p>
                        <div className='w-full py-1 bg-yellow-200 text-center '>
                            <p>
                                View Detailed Report 
                            </p>
                        </div>
                    </div>
                </a>

                <a href="">
                    <div className='bg-white flex flex-col items-center border-2 border-green-400 rounded-lg w-64 overflow-hidden pt-5 gap-1'>
                        <img src={health} alt="" className='w-8'/>
                        <h3 className='text-2xl font-bold'>523</h3>
                        <p className='font-semibold leading-none mb-5'>Payment Report</p>
                        <div className='w-full py-1 bg-green-200 text-center '>
                            <p>
                                View Detailed Report 
                            </p>
                        </div>
                    </div>
                </a>
            
            
        </div>
    </div>
    
</div>
  )
}

export default Reports