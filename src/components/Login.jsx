import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/AuthSlice';
import { useNavigate,Link } from 'react-router-dom';
import '../CSS/Login.css';
import { toast } from "react-hot-toast";
import imageLeft from '../assets/LoginImage1.jpg';
import imageRight from '../assets/LoginImage2.png';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user, loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  useEffect(() => {
    if (error) {
      toast(`${error}`, { icon: "👋" });
    }
  }, [error]);

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
          {error && <span>Error: {error}</span>}
          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300 w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
