import React from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../redux/slices/SearchSlice";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import Logo from '../assets/logo.png';
import '../CSS/Navbar.css';
import { IoIosHeartEmpty } from "react-icons/io";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="flex flex-col lg:flex-row justify-between items-center py-3 mx-6 mb-10 navbar_main">
      <div className="brand flex items-center gap-2">
        <h1 className="text-2xl font-bold brand_name">Shop Bee</h1>
        <img src={Logo} alt="Logo" className="brand_img" />
      </div>
      <div className="flex items-center gap-4">
        <div className="search_field flex items-center gap-2">
          <GoSearch size={25} />
          <input
            type="search"
            name="search"
            id=""
            placeholder="Search here"
            autoComplete="off"
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="p-3 border border-gray-400 text-sm rounded-lg w-full lg:w-[25vw] search_input"
          />
        </div>
        <Link to="/cart">
          <FaShoppingCart size={25} className="cursor-pointer" />
        </Link>
        <Link to="/wishlist">
          <IoIosHeartEmpty size={25} className="cursor-pointer" />
        </Link>
        <div className="relative">
          <MdAccountCircle size={25} className="cursor-pointer" />
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg hidden profile_dropdown">
            <div className="p-2 border-b flex items-center">
              {/* <img src={Avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-2" /> */}
              <span className="font-bold">Username</span>
            </div>
            <div className="p-2">
              <Link to="/profile" className="block py-1">Profile</Link>
              <Link to="/logout" className="block py-1">Logout</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
