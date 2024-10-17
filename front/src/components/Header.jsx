import React, { useState } from 'react';
import { FaCoins, FaUser } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MENU_ITEMS_LINKS } from '../constants/menu.items.constants';
import TokenService from '../services/token.service';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   setIsLoggedIn(!!token);
  // }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    TokenService.handleLogout();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold"
          style={{ fontFamily: 'Comic Sans MS, cursive' }}
        >
          QuizzGo
        </Link>

        {/* Hamburger menu for mobile */}
        <button onClick={toggleMenu} className="lg:hidden">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop menu - Now centered */}
        <nav className="hidden absolute left-1/2 -translate-x-1/2 lg:flex justify-center flex-grow">
          <div className="flex space-x-6">
            {MENU_ITEMS_LINKS.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                className={({ isActive }) => `
                  relative text-lg font-medium
                  ${isActive ? 'text-purple-500' : 'text-gray-700'}
                  hover:text-purple-500 transition-colors duration-300
                  group
                `}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* User icons and login/register buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-purple-500"
              >
                <FaUser className="text-xl" />
              </Link>
              <Link
                to="/wallet"
                className="text-gray-700 hover:text-purple-500"
              >
                <FaCoins className="text-xl" />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-3xl transition duration-300"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-transparent hover:bg-purple-100 text-purple-500 font-bold py-2 px-4 rounded-3xl transition duration-300 border border-purple-500 hover:border-purple-600"
              >
                Se connecter
              </Link>
              <Link
                to="/register"
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-3xl transition duration-300 border border-purple-500"
              >
                S'inscrire
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <MobileMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      )}
    </header>
  );
}

const MobileMenu = ({ isLoggedIn, handleLogout }) => {
  return (
    <div className="lg:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {MENU_ITEMS_LINKS.map((item) => (
          <NavLink
            key={item}
            to={`/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-700 hover:bg-purple-100 hover:text-purple-500'
              }`
            }
          >
            {item}
          </NavLink>
        ))}
        {isLoggedIn ? (
          <>
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-500"
            >
              Profile
            </Link>
            <Link
              to="/wallet"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-500"
            >
              Wallet
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-purple-500 text-white hover:bg-purple-600"
            >
              Se déconnecter
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium bg-transparent text-purple-500 hover:bg-purple-100 border border-purple-500"
            >
              Se connecter
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 rounded-md text-base font-medium bg-purple-500 text-white hover:bg-purple-600 border border-purple-500"
            >
              S'inscrire
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
