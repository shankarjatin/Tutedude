import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password)
      .then(() => navigate('/home'))
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-xl mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="block w-full p-2 mb-4 border border-gray-300"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="block w-full p-2 mb-4 border border-gray-300"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
