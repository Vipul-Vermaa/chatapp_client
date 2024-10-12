import React from 'react';
import Navbar from '../utils/Navbar';
import './style.css'

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-purple-400 to-blue-500 min-h-screen glow-effect">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Chat App!</h1>
          <p className="text-lg mb-2">Connect with your friends and start chatting!</p>
          <p className="text-sm mt-4">Please log in or register to get started.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
