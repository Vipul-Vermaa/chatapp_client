import React from 'react';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const username = localStorage.getItem('username')
    if (username) {
      localStorage.removeItem(`${username}_jwt`);
      localStorage.removeItem(`chatMessages_${username}`);
    } else {
      console.error("No username found in localStorage");
    }

    navigate('/');
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="bg-white hover:bg-red-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
