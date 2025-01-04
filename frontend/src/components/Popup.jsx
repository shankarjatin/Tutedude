// src/components/Popup.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Popup = ({ message, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically close the popup and redirect to login after 2 seconds
    const timer = setTimeout(() => {
      onClose();
      navigate('/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate, onClose]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-50 bg-gray-500 z-50">
      <div className="p-4 bg-white rounded shadow-md">
        <h3>{message}</h3>
      </div>
    </div>
  );
};

export default Popup;
