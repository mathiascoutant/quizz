import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import userIcon from '../assets/userBlack.png';
import cartIcon from '../assets/cart.png';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = ['Home', 'Quizz', 'About'];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          QuizzGo
        </Link>
        
        {/* Hamburger menu for mobile */}
        <button onClick={toggleMenu} className="lg:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        
        {/* Desktop menu */}
        <nav className="hidden lg:flex space-x-6">
          {menuItems.map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase()}`}
              className={({ isActive }) => `
                relative text-lg font-medium
                ${isActive ? 'text-purple-500' : 'text-gray-700'}
                hover:text-purple-500 transition-colors duration-300
                group
              `}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
            </NavLink>
          ))}
        </nav>
        
        {/* User icons and login button */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/profile">
            <img src={userIcon} alt="Profil" className="w-6 h-6" />
          </Link>
          <Link to="/profile">
            <img src={cartIcon} alt="Profil" className="w-6 h-6" />
          </Link>
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-3xl transition duration-300">
            Log In
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4 bg-white">
            {menuItems.map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) => `
                  text-lg font-medium
                  ${isActive ? 'text-purple-500' : 'text-gray-700'}
                  hover:text-purple-500 transition-colors duration-300
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </NavLink>
            ))}
            <Link to="/profile" className="flex items-center space-x-2">
              <img src={userIcon} alt="Profil" className="w-6 h-6" />
              <span>Profile</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-2">
              <img src={cartIcon} alt="Cart" className="w-6 h-6" />
              <span>Cart</span>
            </Link>
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-3xl transition duration-300">
              Log In
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
