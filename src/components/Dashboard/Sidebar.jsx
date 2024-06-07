// Sidebar.js or Sidebar.jsx
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NavLink } from 'react-router-dom';
import '../../CSS/Sidebar.css'; // Import the CSS file

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const matches = useMediaQuery('(max-width:400px)');
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`fixed lg:static z-20 inset-0 lg:translate-x-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out w-64 h-full bg-white shadow-md lg:shadow-none lg:block`}>
        <div className="p-6">
          {matches && (
            <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          )}
          <nav className="mt-5">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/customer" 
              className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
            >
              Customer
            </NavLink>
            <NavLink 
              to="/sales" 
              className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
            >
              Sales
            </NavLink>
            <NavLink 
              to="/products" 
              className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
            >
              Product
            </NavLink>
            <NavLink 
              to="/inventory" 
              className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
            >
              Inventory
            </NavLink>
            <NavLink 
              to="/report" 
              className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
            >
              Report
            </NavLink>
            <NavLink 
              to="/setting" 
              className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
            >
              Setting
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
