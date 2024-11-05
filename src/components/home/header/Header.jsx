import React from 'react';
import Logo from './Logo';
import User from './User';
import Search from './Search';
import { FileText, KeyRound, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-primary shadow-md ">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Logo />
      </div>

      {/* Search Bar  */}
      <div className="flex-grow mx-4">
        <Search />
      </div>

      {/* Authentication Options */}
      <div className="flex items-center gap-4">
        {user ? (
          <div>
            <User />
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-200">
                <KeyRound className="text-gray-600" />
                <span className="text-gray-700">Login</span>
              </button>
            </Link>
            <Link to="/register-buyer">
              <button className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-lg shadow transition duration-200 hover:bg-gray-200 hover:text-primary"> {/* Áp dụng hover:text-primary cho toàn bộ nút */}
                <FileText className="text-gray-600 transition duration-200 group-hover:text-primary" /> {/* Chuyển đổi màu icon */}
                <span className="text-gray-700 transition duration-200">Register</span> {/* Chuyển đổi màu văn bản */}
              </button>
            </Link>
          </>

        )}
        <Link to="/cart">
          <button className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-200">
            <ShoppingCart className="text-gray-600" />
            <span className="text-gray-700">Cart</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
