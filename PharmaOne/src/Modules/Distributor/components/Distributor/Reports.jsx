import React from 'react'
import money from '../../assets/svgs/money.svg'
import qualrec from '../../assets/svgs/QualityReport.svg'
import comrep from '../../assets/svgs/ComReport.svg'

const Reports = () => {
  return (
    <div className='w-full h-full bg-stone-200 '>
    <div className=' px-10 py-10'>
        <div className='flex justify-between items-center mb-5'>
            <div>
                <h1 className='text-2xl font-bold '>Reports</h1>
                <h3>Overall reports related to the checks.</h3>
            </div>
            
        </div>
        <div className='w-full flex gap-5 '>
       
        <a href="/disreportD">
                    <div className='bg-white flex flex-col items-center border-2 border-blue-400 rounded-lg w-64 overflow-hidden pt-5 gap-1'>
                        <img src={comrep} alt="" className='w-10 mb-1'/>
                        <h3 className='text-2xl font-bold text-center'>Dispatch <br></br>Report</h3>
                        <p className='font-semibold leading-none mb-2.5'></p>
                        <div className='w-full py-1 bg-blue-200 text-center '>
                            <p>
                                View Detailed Report 
                            </p>
                        </div>
                    </div>
        </a>

                <a href="/qsalesD">
                    <div className='bg-white flex flex-col items-center border-2 border-green-400 rounded-lg w-64 overflow-hidden pt-5 gap-1'>
                        <img src={qualrec} alt="" className='w-10 mb-1'/>
                        <h3 className='text-2xl font-bold text-center'>Quality <br></br>Report</h3>
                        <p className='font-semibold leading-none mb-2.5'></p>
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