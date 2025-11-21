import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import google from "../../assets/google.png";
import microsoft from "../../assets/microsoft.png";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-8 min-h-screen"
    >
      <div className="relative w-full max-w-5xl">
        <Link
          to="/"
          className="fixed top-6 left-6 text-white text-2xl z-50 hover:text-gray-200 transition"
        >
          <FaArrowLeft />
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          {/* Left Panel */}
          <div className="relative">
            <div className={`rounded-[1rem] border-2 border-white absolute inset-0 p-10 text-white 
              bg-[rgba(0,0,255,0.6)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] 
              backdrop-blur-[20px] 
              flex flex-col items-center justify-center text-center 
              transition-opacity duration-700 ${
                isSignUp ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}>
              <h2 className="text-3xl font-bold mb-4">Revolutionize Your Hiring</h2>
              <p className="mb-4">AI-powered applicant tracking that finds the perfect candidates faster than ever before.</p>
              <div className="flex justify-center space-x-4 mb-4">
                {/* <button className="p-2 bg-gray-200 rounded-full"><img src={google} alt="Google Login" className="w-6 h-6" /></button> */}
                <button className="p-2 bg-gray-200 rounded-full"><img src={microsoft} alt="Microsoft Login" className="w-6 h-6" /></button>
              </div>
              <button
                onClick={() => setIsSignUp(false)}
                className="border border-white px-6 py-2 rounded-full bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                Sign In
              </button>
            </div>

            {/* Sign In Form */}
            <div className={`p-8 transition-transform duration-700 ${isSignUp ? '-translate-x-full opacity-0 absolute w-full' : 'opacity-100 static'}`}>
              <form>
                <h1 className="text-3xl font-bold mb-4 text-center">Sign In to Meridian 👋</h1>
                <div className="flex justify-center space-x-4 mb-4">
                  {/* <button className="p-2 bg-gray-200 rounded-full"><FaFacebookF /></button> */}
                  {/* <button className="p-2 bg-gray-200 rounded-full"><FaGooglePlusG /></button> */}
                  <button className="p-2 bg-gray-200 rounded-full"><FaLinkedinIn /></button>
                </div>
                <p className="text-sm text-center mb-4">or use your account</p>
                <input type="email" placeholder="Email" className="w-full p-3 mb-3 border rounded" />
                <input type="password" placeholder="Password" className="w-full p-3 mb-3 border rounded" />
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition">Sign In</button>
                <a href="#" className="mt-[2rem] flex justify-center text-sm text-indigo-600 mb-3 inline-block">Forgot your password?</a>
              </form>
            </div>
          </div>

          {/* Right Panel */}
          <div className="relative">
            <div className={`rounded-[1rem] border-2 border-white absolute inset-0 p-10 text-white 
              bg-[rgba(0,0,255,0.6)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] 
              backdrop-blur-[20px] 
              flex flex-col items-center justify-center text-center 
              transition-opacity duration-700 ${
                isSignUp ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}>
              <h2 className="text-3xl font-bold mb-4">Join Meridian Today!</h2>
              <p className="mb-4">Enter your personal details and start your journey with us.</p>
              <div className="flex justify-center space-x-4 mb-4">
                {/* <button className="p-2 bg-gray-200 rounded-full"><img src={google} alt="Google Login" className="w-6 h-6" /></button> */}
                <button className="p-2 bg-gray-200 rounded-full"><img src={microsoft} alt="Microsoft Login" className="w-6 h-6" /></button>
              </div>
              <button
                onClick={() => setIsSignUp(true)}
                className="border border-white px-6 py-2 rounded-full bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                Sign Up
              </button>
            </div>

            {/* Sign Up Form */}
            <div className={`p-8 transition-transform duration-700 absolute md:static w-full ${
              isSignUp ? 'opacity-100 static' : 'opacity-0 translate-x-full absolute'
            }`}>
              <form>
                <h1 className="text-3xl font-bold mb-4 text-center">Create a Meridian Account 🚀</h1>
                <div className="flex justify-center space-x-4 mb-4">
                  {/* <button className="p-2 bg-gray-200 rounded-full"><FaFacebookF /></button> */}
                  {/* <button className="p-2 bg-gray-200 rounded-full"><FaGooglePlusG /></button> */}
                  <button className="p-2 bg-gray-200 rounded-full"><FaLinkedinIn /></button>
                </div>
                <p className="text-sm text-center mb-4">or use your email for registration</p>
                <input type="text" placeholder="Full Name" className="w-full p-3 mb-3 border rounded" />
                <input type="email" placeholder="Email" className="w-full p-3 mb-3 border rounded" />
                <input type="password" placeholder="Password" className="w-full p-3 mb-3 border rounded" />
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white text-xs">
          <p>Meridian Solutions Pvt. Ltd. © 2025. All rights reserved</p>
          <p className="mt-1">Singapore • US • India • UAE</p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;