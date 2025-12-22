import React from 'react';
import { Link } from 'react-router-dom'; // for routing eventually

/* 

Home page will have a how to play screen and a button to play!

css theme from leibniz (cool math website I found)

*/

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300">
            Spacecraft
          </span>
        </h1>

        <p className="text-lg text-gray-400 mb-12 max-w-md mx-auto">
          Make new space-elements by combining ones you know!
        </p>

        <div className="flex justify-center">
          <Link
            to="/play" // changes to the playscreen when implemented 
            className="group relative inline-flex items-center justify-center px-6 py-3 bg-transparent border border-gray-700
            text-gray-300 font-medium rounded-lg overflow-hidden transition-all duration-300
            hover:border-gray-500 hover:text-white"
          >
            <span className="absolute inset-0 w-full bg-gradient-to-r from-blue-900/20 to-purple-900/20 -z-10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            <span className="flex items-center">
              How to Play
              <svg
                className="ml-2 w-4 h-4 transition-transform group:hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 text-gray-600 text-sm">
        Made with love and stardust!
      </div>
    </div>
  );
};

export default HomePage;