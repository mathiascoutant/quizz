"use client";

import { ButtonLink } from "@/components/common/Button";
import { MENU_ITEMS_LINKS } from "@/constants/menu.items.constants";
import { useCartStore } from "@/store/cart.store";
import { cn } from "@/utils/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaChevronDown, FaShoppingCart, FaUser } from "react-icons/fa";
import { useSessionStore } from "../store/session.store";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { session, sessionLogOut } = useSessionStore();
  const { clearCart } = useCartStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    function handleClickOutside(event: React.MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const couponsCount = useMemo(() => {
    if (!cart) return 0;

    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-bold"
          style={{ fontFamily: "Comic Sans MS, cursive" }}
        >
          QuizzGo
        </Link>

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

        <nav className="hidden absolute left-1/2 -translate-x-1/2 lg:flex justify-center flex-grow">
          <div className="flex space-x-6">
            {MENU_ITEMS_LINKS.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "relative text-lg font-medium hover:text-purple-500 transition-colors duration-300 group",
                  {
                    "text-purple-500": pathname === item.href,
                    "text-gray-700": pathname !== item.href,
                  }
                )}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          {session && session.user ? (
            <div className="relative flex items-center" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className=" items-center flex gap-4 font-bold py-2 px-4 rounded-3xl transition duration-300"
              >
                <FaUser className="text-xl" />
                <span className="font-medium">{session.user.pseudo}</span>
                <FaChevronDown
                  className={`text-sm transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    variants={{
                      initial: { opacity: 0, y: -10, scale: 0.9 },
                      animate: { opacity: 1, y: 0, scale: 1 },
                      exit: { opacity: 0, y: -10, scale: 0.9 },
                    }}
                    animate="animate"
                    exit="exit"
                    initial="initial"
                    className="absolute inset-0 top-10 h-fit w-56 bg-white rounded-lg shadow-md py-2 z-10 border border-gray-200"
                  >
                    <div className="px-4 py-2 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          Mes Miams
                        </span>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-bold text-purple-600">
                            {new Intl.NumberFormat('fr-FR').format(session.user.coins)}
                          </span>
                          <Image
                            alt="Miam icon"
                            src="/assets/coin.png"
                            width={18}
                            height={18}
                          />
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 transition-colors duration-300"
                    >
                      Mon profil
                    </Link>
                    <Link
                      href="/mes-coupons"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 transition-colors duration-300"
                    >
                      Mes coupons
                    </Link>
                    <Link
                      href="/classement"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 transition-colors duration-300"
                    >
                      Classement
                    </Link>
                    <div className="px-4 pt-2">
                      <button
                        onClick={() => {
                          clearCart();
                          sessionLogOut();
                        }}
                        className="block w-full text-center px-4 py-2 text-sm text-white bg-purple-500 hover:bg-purple-600 rounded-md transition-colors duration-300"
                      >
                        Se déconnecter
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <Link href="/cart" className="flex items-center relative ml-4">
                <FaShoppingCart className="text-xl text-gray-700 hover:text-purple-500 transition-colors duration-300" />
                {couponsCount ? (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {couponsCount}
                  </span>
                ) : null}
              </Link>
            </div>
          ) : (
            <>
              <ButtonLink variant="outline" href={"/login"} className=" py-2 px-4">
                Se connecter
              </ButtonLink>
              <ButtonLink href={"/register"} className=" py-2 px-4">
                S&apos;inscrire
              </ButtonLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <MobileMenu isLoggedIn={!!session?.user} handleLogout={() => {
          clearCart();
          sessionLogOut();
        }} />
      )}
    </header>
  );
}

const MobileMenu = ({
  isLoggedIn,
  handleLogout,
}: {
  isLoggedIn: boolean;
  handleLogout: () => void;
}) => {
  const pathname = usePathname();
  return (
    <div className="lg:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {MENU_ITEMS_LINKS.map((item, index) => (
          <Link
            key={index}
            href={`/${item.href.toLowerCase()}`}
            className={cn("block px-3 py-2 rounded-md text-base font-medium", {
              "bg-purple-500 text-white": pathname === item.href,
              "text-gray-700 hover:bg-purple-100 hover:text-purple-500":
                pathname !== item.href,
            })}
          >
            {item.label}
          </Link>
        ))}
        {isLoggedIn ? (
          <>
            <Link
              href="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-500"
            >
              Profile
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
              href="/login"
              className="block px-3 py-2 rounded-md text-base font-medium bg-transparent text-purple-500 hover:bg-purple-100 border border-purple-500"
            >
              Se connecter
            </Link>
            <Link
              href="/register"
              className="block px-3 py-2 rounded-md text-base font-medium bg-purple-500 text-white hover:bg-purple-600 border border-purple-500"
            >
              S&apos;inscrire
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
