import React from 'react';

const Button = ({ onClick, text, disabled, buttonStyle, hoverStyle }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-3 rounded-lg transition duration-300 ${buttonStyle} ${hoverStyle} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {text}
    </button>
  );
};

export default Button;
