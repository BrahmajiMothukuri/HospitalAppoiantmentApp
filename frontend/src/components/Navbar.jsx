import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm h-[70px] flex items-center">
      <nav className="max-w-6xl mx-auto w-full px-4 flex items-center justify-between">
        <div className="text-xl font-semibold text-primary">OroGlee Dental</div>
        <div className="flex items-center gap-4 text-sm sm:text-base">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md transition ${
              location.pathname === '/'
                ? 'text-white bg-primary'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Home
          </Link>
          <Link
            to="/admin"
            className={`px-3 py-2 rounded-md transition ${
              location.pathname === '/admin'
                ? 'text-white bg-primary'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

