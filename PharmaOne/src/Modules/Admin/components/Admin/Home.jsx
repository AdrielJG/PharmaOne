import React from 'react'
import Logo from '../../assets/Logo.png'
import dotillustration from '../../assets/homeImg/dotillustration.png'
import illustration from '../../assets/homeImg/illustration1.png'
import bgImg from '../../assets/homeImg/page2bg.png'
import leftImg from '../../assets/homeImg/page3left.png'
import rightImg from '../../assets/homeImg/page3right.png'
import Location from '../../assets/homeImg/location.svg'
import Contract from '../../assets/homeImg/Contract.svg'
import Security from '../../assets/homeImg/Security.svg'
import form from '../../assets/homeImg/form.svg'
import report from '../../assets/homeImg/report.svg'
import trust from '../../assets/homeImg/trust.png'
import construct from '../../assets/homeImg/construct.png'
import track from '../../assets/homeImg/track.png'
import verify from '../../assets/homeImg/verification.png'
import consumer from '../../assets/homeImg/consumer.png'
import { Link } from 'react-router-dom'
import GlobalStyle from './GlobalStyle';

const Home = () => {
    const cards = [
        { id: 1, title: 'End-to-End Traceability',img: Location, description: 'Our solution ensures complete traceability of pharmaceuticals, tracking each drug from production to delivery using blockchain technology.' },
        { id: 2, title: 'Smart Contracts ',img:Contract, description: 'Automated smart contracts enforce regulatory compliance at every stage, ensuring that only high-quality drugs reach consumers.' },
        { id: 3, title: 'Enhanced Security',img:Security, description: "Blockchain's tamper-proof nature protects the integrity of all supply chain records, preventing unauthorized data manipulation." },
        { id: 4, title: 'Real-Time Updates',img:form, description: 'Stakeholders receive real-time updates on product status and delivery, improving coordination and reducing delays.' },
        { id: 5, title: 'Audit and Reporting',img:report, description: 'The system streamlines audits and reporting with transparent, easily accessible records of all transactions and compliance checks.' },
        { id: 6, title: 'Consumer Trust',img:trust, description: 'Consumers can verify the authenticity of their medications, increasing trust in the pharmaceutical products they purchase.' },
    ];

    const workCard = [
        { id: 1, title: 'Manufacturing and Quality Check',img: construct, description: 'Pharmaceutical products are produced and undergo rigorous quality checks, with records securely logged on the blockchain.' },
        { id: 2, title: 'Distribution Tracking ',img:track, description: 'The products are tracked throughout the distribution process, ensuring that their journey is transparent and tamper-proof.' },
        { id: 3, title: 'Pharmacy Verification',img:verify, description: "Pharmacies verify the authenticity and compliance of the products before dispensing them to consumers." },
        { id: 4, title: 'Consumer Access and Verification',img:consumer, description: "Consumers can easily access and verify the authenticity of their purchased medications through a simple online portal." },
    ]
    return (
        <>
        <GlobalStyle />
        <div className='bg-[#EDF1F5]'>
            <header className='px-14 py-2 flex items-center gap-4 w-full bg-gradient-to-tr from-[#67C3F3] to-[#5A98F2]'>
                <img src={Logo} alt="logo" className='w-14' />
                <h1 className='text-white text-3xl font-semibold'>PharmaChain</h1>
            </header>
            <main className='h-full'>
                <section className='relative h-full pb-5 '>
                    <img src={dotillustration} alt="" className='absolute w-24' />
                    <div className='flex w-full h-full justify-center '>
                        <div className='w-1/3  ml-20 flex flex-col justify-center gap-5 items-start'>
                            <h2 className='text-4xl font-bold w-11/12 '>
                                Ensuring Transparency in the Pharmaceutical Supply Chain
                            </h2>
                            <h3>
                                Blockchain-based solution for tracking and verifying drug authenticity from manufacturer to consumer.
                            </h3>
                            <Link to='login'className='bg-blue-500 px-6 text-white  py-2 rounded-full'>Get Started</Link>
                        </div>
                        <div>
                            <img src={illustration} alt="" className='w-[600px]' />
                        </div>
                    </div>
                </section>
                <section className=' relative flex justify-center py-5 z-20 '>

                    <div className='text-center w-4/5 flex flex-col items-center '>
                        <h2 className='font-semibold text-3xl mb-2'>Our Services</h2>
                        <p className='w-10/12 '>
                            To address the critical challenges in the pharmaceutical supply chain, we propose a Blockchain-Based Supply Chain Transparency System designed specifically for the pharmaceutical industry. This solution leverages blockchain technology and smart contracts to create a secure, transparent, and efficient supply chain from manufacturers to consumers.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mt-5">
                            {cards.map((card) => (
                                <div key={card.id} className="bg-white p-6 rounded-xl shadow-md">
                                    <img src={card.img} alt="" className='h-20 mb-4'/>
                                    <h2 className="text-xl text-start font-bold mb-2">{card.title}</h2>
                                    <p className="text-gray-700 text-start">{card.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <img src={bgImg} alt="" className='w-[600px] absolute left-14 top-[20%] -z-10' />
                    <img src={dotillustration} alt="" className='absolute right-20 top-1/2 -z-10' />
                </section>

                <section className=' relative flex justify-center py-5 z-20 overflow-hidden'>

                    <div className='text-center w-4/5 flex flex-col items-center '>
                        <h2 className='font-semibold text-3xl mb-2'>How It Works</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-4 mt-5 w-2/3">
                            {workCard.map((card) => (
                                <div key={card.id} className="bg-white p-6 rounded-xl shadow-md">
                                    <p className='text-start text-gray-400 mb-2'>STEP {card.id}</p>
                                    <img src={card.img} alt="" className='h-18 mb-4'/>
                                    <h2 className="text-xl text-start font-bold mb-2">{card.title}</h2>
                                    <p className="text-gray-700 text-start">{card.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <img src={leftImg} alt="" className='w-[350px] absolute left-32 top-[5%] -z-10' />
                    <img src={rightImg} alt="" className='w-[650px] absolute right-32 top-[5%] -z-10' />
                    <img src={dotillustration} alt="" className='absolute right-20 top-1/2 -z-10' />
                </section>

            </main>
            <footer className='bg-gradient-to-tr from-[#67C3F3] to-[#5A98F2] py-12 flex justify-evenly  gap-10 text-white'>
                        <div className='w-[300px]'>
                            <p>
                            <span className='font-bold'>Ensuring Transparency in the Pharmaceutical Supply Chain </span> provides progressive, and affordable healthcare, accessible on mobile and online 
                            for everyone
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li className='font-bold text-lg'>Company</li>
                                <li>About</li>
                                <li>Testimonials</li>
                                <li>Find a Doctor</li>
                                <li>Apps</li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li  className='font-bold text-lg'>Help</li>
                                <li>Help Center</li>
                                <li>Contact Support</li>
                                <li>Instructions</li>
                                <li>How it works</li>
                            </ul>
                        </div>
            </footer>
        </div>
        </>    
    )
}

export default Home