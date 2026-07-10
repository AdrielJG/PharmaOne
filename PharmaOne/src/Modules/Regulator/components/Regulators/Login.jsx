import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import socialMediaLogo1 from '../../assets/Social media logo 1.png';
import socialMediaLogo2 from '../../assets/Social media logo 2.png';
import hide from '../../assets/hide.png'; 
import open from '../../assets/eye 1.svg'; 
import icons from '../../assets/Icons.png';
import Logo from '../../assets/Logo.png';
import bgImg from '../../assets/Group 1171274989.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setErrorMessage('Please fill out all fields.');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="bg-cover bg-center min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${bgImg})` }}>
      <section className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto  flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-center items-center p-8">
          <div className="text-center mb-8">
            <div className="h-16 w-16 mx-auto bg-no-repeat bg-contain" style={{ backgroundImage: `url(${Logo})` }}></div>
            <h2 className="text-2xl font-semibold mt-4">Unlimited free access to our resources</h2>
          </div>
          <div className="flex flex-col items-center w-full">
            <div className="w-full mb-4">
              <button className="flex items-center justify-center bg-white border border-gray-300 rounded-lg py-2 px-4 shadow-md hover:bg-gray-100 transition duration-300 ease-in-out w-full">
                <img className="h-6 w-6 mr-2" alt="Google Logo" src={socialMediaLogo1} />
                <Link to='/registration2'>Continue with Google</Link>
              </button>
            </div>
            <div className="w-full mb-4">
              <button className="flex items-center justify-center bg-white border border-gray-300 rounded-lg py-2 px-4 shadow-md hover:bg-gray-100 transition duration-300 ease-in-out w-full">
                <img className="h-6 w-6 mr-2" alt="Facebook Logo" src={socialMediaLogo2} />
                <Link to='/registration2'>Continue with Facebook</Link>
              </button>
            </div>
            <div className="w-full mb-4 ">
              <button className="flex items-center justify-center  bg-black text-white rounded-lg py-2 px-4 shadow-md hover:bg-gray-800 transition duration-300 ease-in-out w-full">
                <img className="h-6 w-6 mr-2" alt="Email Icon" src={icons} />
                <Link to='/registration'>Sign up with email</Link>
              </button>
            </div>
            <p className="text-center text-sm text-gray-600 mb-4">
              By signing up, you agree to the <span className="text-blue-500 hover:underline">Terms of Service</span> and acknowledge you’ve read our <span className="text-blue-500 hover:underline">Privacy Policy</span>.
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center p-8">
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl font-semibold mb-4">Log in</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email address</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <img
                  className="absolute right-2 top-2 cursor-pointer"
                  src={showPassword ? hide : open}
                  alt="Toggle Password Visibility"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
              <div className="text-blue-500 text-sm mt-2 cursor-pointer hover:underline">Forget your password</div>
            </div>
            <div className="mb-4 mx-auto">
              <button className=" bg-blue-500 text-white rounded-full py-2 px-6 shadow-md hover:bg-blue-400" type="submit">
                
                <span>Log in</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
