import React, { useState, useRef, useEffect } from 'react';
import { FaCoins, FaUser, FaChevronDown, FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MENU_ITEMS_LINKS } from '../constants/menu.items.constants';
import { useSessionStore } from '../store/session.store';
import { Button } from './common/Button';
import coinIcon from '../assets/coin.png'; // Assurez-vous que le chemin est correct

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { session, sessionLogOut } = useSessionStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const savedCart = document.cookie.split("; ").find((row) => row.startsWith("cart="))?.split("=")[1];
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      setCartCount(cartItems.length);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
          {session && session.user ? (
            <div className="relative flex items-start" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className=" items-center flex gap-4 font-bold py-2 px-4 rounded-3xl transition duration-300"
              >
                <FaUser className="text-xl" />
                <span className="font-medium">{session.user.pseudo}</span>
                <FaChevronDown className={`text-sm transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-7 w-56 bg-white rounded-lg shadow-md py-2 z-10 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Mes Miams</span>
                      <div className="flex items-center space-x-1">
                        <img src={coinIcon} alt="Miam" className="w-4 h-4" />
                        <span className="text-sm font-bold text-purple-600">{session.user.coins}</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 transition-colors duration-300"
                  >
                    Mon profil
                  </Link>
                  <Link
                    to="/coupons"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 transition-colors duration-300"
                  >
                    Mes coupons
                  </Link>
                  <div className="px-4 pt-2">
                    <button
                      onClick={sessionLogOut}
                      className="block w-full text-center px-4 py-2 text-sm text-white bg-purple-500 hover:bg-purple-600 rounded-md transition-colors duration-300"
                    >
                      Se déconnecter
                    </button>
                  </div>
                </div>
              )}
              <Link to="/cart" className="flex items-center relative ml-4">
                <FaShoppingCart className="text-xl text-gray-700 hover:text-purple-500 transition-colors duration-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          ) : (
            <>
              <Button variant="outline" href={'/login'}>
                Se connecter
              </Button>
              <Button href={'/register'}>S'inscrire</Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <MobileMenu isLoggedIn={session} handleLogout={sessionLogOut} />
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
