import React, { useState } from "react";
import { Link } from "react-router-dom";


// ----------- Enhanced Card Component -----------
const Card = ({ title, bio, image, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  // Define routes for each button
  const linkTo = index === 0 ? "/resume" : "/hr-portal";

  return (
    <div 
      className="my-2 px-2 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article className="overflow-hidden rounded-2xl shadow-2xl bg-white transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-3xl relative">
        {/* Gradient overlay on image */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10"></div>
          <img 
            alt={title} 
            className="block w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" 
            src={image} 
          />
          
          {/* Floating badge */}
          <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            {index === 0 ? "FOR TALENT" : "FOR COMPANIES"}
          </div>
        </div>

        {/* Content section */}
        <div className="p-6">
          <header className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className={`h-2 w-8 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
            </div>
            <p className="text-gray-600 text-base leading-relaxed">{bio}</p>
          </header>

          {/* Feature list */}
          <ul className="space-y-2 mb-6">
            {index === 0 ? (
              <>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-sm text-gray-700">Professional templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-sm text-gray-700">Career guidance</span>
                </li>
                {/* <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-sm text-gray-700">AI-powered insights</span>
                </li> */}
              </>
            ) : (
              <>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  <span className="text-sm text-gray-700">Candidate management</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  <span className="text-sm text-gray-700">Smart filtering</span>
                </li>
                {/* <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  <span className="text-sm text-gray-700">Analytics dashboard</span>
                </li> */}
              </>
            )}
          </ul>

          {/* Animated CTA Button */}
    <Link to={linkTo} className="w-full">
      <button
        className={`group w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg ${
          index === 0
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {index === 0 ? "Start Your Journey" : "Find Top Talent"}
        <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
    </Link>
        </div>
              </article>
    </div>
  );
};

// ----------- Enhanced Main Component -----------
const Cards = () => {
  const cards = [
    {
      title: "Job Seekers",
      bio: "Improve your resume with smart suggestions, edit key sections, and create a professional resume that stands out to recruiters.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "For HR Professionals",
      bio: "Streamline your hiring process with intelligent candidate management, automated resume screening, and comprehensive analytics.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w-1200&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-5 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-sm font-semibold text-blue-700">PLATFORM FEATURES</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Designed for <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Every Career Journey</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful tools tailored for both job seekers and hiring professionals
          </p>
        </div>

        {/* Cards grid with enhanced layout */}
        <div className="flex flex-wrap justify-center gap-8">
          {cards.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              bio={item.bio}
              image={item.image}
              index={index}
            />
          ))}
        </div>

        {/* Stats section below cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-700 font-medium">Successful Hires</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold text-purple-600 mb-2">5K+</div>
            <div className="text-gray-700 font-medium">Companies Trust Us</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">98%</div>
            <div className="text-gray-700 font-medium">User Satisfaction</div>
          </div>
        </div>

        {/* CTA Banner */}
        {/* <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl transform hover:shadow-3xl transition-shadow duration-500">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Career Journey?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who have accelerated their careers with our platform
          </p>
          <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-lg">
            Get Started For Free
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Cards;