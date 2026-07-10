import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import dotillustration from '../../assets/homeImg/dotillustration.png';
import illustration from '../../assets/homeImg/illustration1.png';
import bgImg from '../../assets/homeImg/page2bg.png';
import leftImg from '../../assets/homeImg/page3left.png';
import rightImg from '../../assets/homeImg/page3right.png';
import Location from '../../assets/homeImg/location.svg';
import Contract from '../../assets/homeImg/Contract.svg';
import Security from '../../assets/homeImg/Security.svg';
import form from '../../assets/homeImg/form.svg';
import report from '../../assets/homeImg/report.svg';
import trust from '../../assets/homeImg/trust.png';
import construct from '../../assets/homeImg/construct.png';
import track from '../../assets/homeImg/track.png';
import verify from '../../assets/homeImg/verification.png';
import consumer from '../../assets/homeImg/consumer.png';
import videoSrc from '../../assets/Vdo.mp4';
import GlobalStyle from './GlobalStyle';
import { useState } from 'react';
import DraggableScrollBar from './DraggableScrollBar';

const Home = () => {
    const cards = [
        { id: 1, title: 'End-to-End Traceability', img: Location, description: 'Our solution ensures complete traceability of pharmaceuticals, tracking each drug from production to delivery using blockchain technology.' },
        { id: 2, title: 'Smart Contracts', img: Contract, description: 'Automated smart contracts enforce regulatory compliance at every stage, ensuring that only high-quality drugs reach consumers.' },
        { id: 3, title: 'Enhanced Security', img: Security, description: "Blockchain's tamper-proof nature protects the integrity of all supply chain records, preventing unauthorized data manipulation." },
        { id: 4, title: 'Real-Time Updates', img: form, description: 'Stakeholders receive real-time updates on product status and delivery, improving coordination and reducing delays.' },
        { id: 5, title: 'Audit and Reporting', img: report, description: 'The system streamlines audits and reporting with transparent, easily accessible records of all transactions and compliance checks.' },
        { id: 6, title: 'Consumer Trust', img: trust, description: 'Consumers can verify the authenticity of their medications, increasing trust in the pharmaceutical products they purchase.' },
    ];

    const workCard = [
        { id: 1, title: 'Manufacturing and Quality Check', img: construct, description: 'Pharmaceutical products are produced and undergo rigorous quality checks, with records securely logged on the blockchain.' },
        { id: 2, title: 'Distribution Tracking', img: track, description: 'The products are tracked throughout the distribution process, ensuring that their journey is transparent and tamper-proof.' },
        { id: 3, title: 'Pharmacy Verification', img: verify, description: "Pharmacies verify the authenticity and compliance of the products before dispensing them to consumers." },
        { id: 4, title: 'Consumer Access and Verification', img: consumer, description: "Consumers can easily access and verify the authenticity of their purchased medications through a simple online portal." },
    ];

    const testimonials = [
        { id: 1, name: 'John Doe', feedback: 'PharmaChain has revolutionized the way we ensure drug safety. Transparency has never been this easy.' },
        { id: 2, name: 'Jane Smith', feedback: 'The platform’s real-time updates and security features are a game-changer for our pharmacy operations.' },
    ];

    const faqs = [
        { id: 1, question: 'What is PharmaChain?', answer: 'PharmaChain is a blockchain-based solution that ensures transparency and traceability in the pharmaceutical supply chain.' },
        { id: 2, question: 'How does PharmaChain ensure security?', answer: 'Our platform uses blockchain technology to provide a tamper-proof record of all transactions in the supply chain.' },
    ];

    const [email, setEmail] = useState('');
    // State for messages (success or error)
    const [message, setMessage] = useState('');

    const handleSubscription = async (e) => {
        e.preventDefault();
        console.log('Email:', email); // Log email to ensure it has a value
        try {
            const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
    
            if (response.ok) {
                setMessage('Thank you for subscribing!');
                setEmail(''); // Clear the input field
            } else {
                let result;
                try {
                    result = await response.json();
                } catch (e) {
                    result = { message: 'Subscription failed.' };
                }
                setMessage(result.message || 'Subscription failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };
    
  
    return (
        <>
        <div>
            <DraggableScrollBar />
            <GlobalStyle />
            <div className='bg-gray-50'>
                {/* Hero Section with Video Background */}
                <section className='relative h-screen'>
                    {/* Background Video with Blur Effect */}
                    <div className='absolute w-full h-full overflow-hidden'>
                        <video
                            autoPlay
                            loop
                            muted
                            className='w-full h-full object-cover filter blur-md'
                            playsInline
                        >
                            <source src={videoSrc} type='video/mp4' />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    {/* Overlay for Darkening the Background */}
                    <div className='absolute w-full h-full bg-black bg-opacity-60 z-10'></div>

                    {/* Text Content */}
                    <div className='absolute w-full h-full flex flex-col items-center justify-center text-center z-20'>
                        {/* Logo and Website Name */}
                        <div className='absolute top-4 left-4 flex items-center gap-4'>
                            <img src={Logo} alt="logo" className='w-10' />
                            <h1 className='text-white text-3xl font-extrabold tracking-wide'>PharmaChain</h1>
                        </div>

                        {/* Login/Signup Button */}
                        <div className='absolute top-4 right-4'>
                            <Link to='/login' className='bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all'>
                                Login/Signup
                            </Link>
                        </div>

                        <h2 className='text-5xl text-white font-extrabold mb-4'>Revolutionizing Pharmaceutical Supply Chains</h2>
                        <p className='text-lg text-gray-300 mb-6 max-w-lg'>Ensuring safety, transparency, and trust with blockchain technology.</p>
                        <button
                            onClick={() => {
                                document.getElementById("our-services").scrollIntoView({ behavior: "smooth" });
                            }}
                            className="bg-blue-500 text-white px-10 py-3 rounded-full shadow-md hover:bg-blue-600 transition-all"
                        >
                            Learn More
                        </button>
                    </div>
                </section>

                {/* Our Services */}
                <section id="our-services" className='relative flex justify-center py-16 bg-white'>
                    <div className='text-center w-4/5 flex flex-col items-center'>
                        <h2 className='font-bold text-3xl mb-4 text-gray-800'>Our Services</h2>
                        <p className='w-10/12 text-gray-600 mb-8'>
                            Our blockchain-based pharmaceutical supply chain transparency system offers innovative solutions to combat fraud, increase trust, and provide end-to-end traceability for all stakeholders.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 mt-8">
                            {cards.map((card) => (
                                <div key={card.id} className="flex flex-col items-center bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                                    <img src={card.img} alt={card.title} className='h-20 mb-4' />
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{card.title}</h3>
                                    <p className="text-gray-600 text-center">{card.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <img src={bgImg} alt="" className='w-[600px] absolute left-14 top-[30%] opacity-30 z-[-1]' />
                    <img src={dotillustration} alt="" className='absolute right-20 top-1/2 opacity-30 z-[-1]' />
                </section>
                {/* Work Process Section */}
                <section className='relative flex justify-center py-16 bg-gray-100'>
                    <div className='text-center w-4/5 flex flex-col items-center'>
                        <h2 className='font-bold text-3xl mb-4 text-gray-800'>Our Work Process</h2>
                        <p className='w-10/12 text-gray-600 mb-8'>
                            Our systematic approach ensures transparency and accountability at every stage of the pharmaceutical supply chain.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 mt-8">
                            {workCard.map((card) => (
                                <div key={card.id} className="flex flex-col items-center bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                                    <img src={card.img} alt={card.title} className='h-20 mb-4' />
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{card.title}</h3>
                                    <p className="text-gray-600 text-center">{card.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* Call-to-Action Banner */}
                <section className='bg-blue-500 text-white py-10'>
                    <div className='flex flex-col items-center'>
                        <h2 className='text-3xl font-semibold mb-4'>Join PharmaChain Today</h2>
                        <p className='mb-6 max-w-xl text-center'>Experience transparency and security in your supply chain management.</p>
                        <Link to='/login' className='bg-blue-700 px-10 py-3 rounded-full shadow-md hover:bg-blue-600 transition-all'>
                            Sign Up Now
                        </Link>
                    </div>
                </section>

                {/* Newsletter Subscription */}
                <section className='py-16 bg-white'>
                    <div className='text-center w-4/5 mx-auto'>
                        <h2 className='font-semibold text-3xl mb-4 text-black'>Stay Updated</h2>
                        <p className='mb-8 text-gray-600 max-w-lg mx-auto'>Subscribe to our newsletter for the latest updates and insights on pharmaceutical supply chain management.</p>
                        <form className='flex flex-col sm:flex-row justify-center gap-4'>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' className='p-3 rounded-lg border border-gray-300 w-72 focus:outline-none focus:border-blue-500' />
                            <button type='submit' className='bg-blue-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all' onClick={handleSubscription}>
                                Subscribe
                            </button>
                        </form>
                    </div>
                </section>

                {/* Footer with Expanded Navigation */}
                <footer className='py-10 bg-gray-800 text-white'>
                    <div className='w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8'>
                        <div>
                            <h3 className='font-bold mb-3 text-gray-400'>Company</h3>
                            <ul>
                                <li><a href='#' className='hover:text-blue-400'>About Us</a></li>
                                <li><a href='#' className='hover:text-blue-400'>Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className='font-bold mb-3 text-gray-400'>Services</h3>
                            <ul>
                                <li><a href='#' className='hover:text-blue-400'>Blockchain Integration</a></li>
                                <li><a href='#' className='hover:text-blue-400'>Supply Chain Transparency</a></li>
                                <li><a href='#' className='hover:text-blue-400'>Regulatory Compliance</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className='font-bold mb-3 text-gray-400'>Contact</h3>
                            <ul>
                                <li><a href='#' className='hover:text-blue-400'>Email</a></li>
                                <li><a href='#' className='hover:text-blue-400'>Phone</a></li>
                                <li><a href='#' className='hover:text-blue-400'>Support</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        </>
    );
};

export default Home;
