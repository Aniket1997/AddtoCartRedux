// src/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';
import imageLeft from '../assets/LoginImage1.jpg'; // Import left image
import imageRight from '../assets/LoginImage2.png'; // Import right image

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="bg-cover bg-center min-h-screen flex justify-center items-center">
      <img src={imageLeft} alt="Left" className="hidden md:block absolute left-0 top-0 h-full w-1/2 z-0 object-cover" />
      <img src={imageRight} alt="Right" className="hidden md:block absolute right-0 top-0 h-full w-1/2 z-0 object-cover" />
      <div className="bg-white p-8 rounded-xl shadow-lg relative z-10 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 px-4 py-2 w-full"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 px-4 py-2 w-full"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
