import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const displayName =
    currentUser?.displayName || currentUser?.email?.split("@")[0] || "";

  const handlePackageSelection = () => {
    // If not on home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/?scrollTo=services");
    } else {
      // If already on home page, scroll to services section
      const servicesSection = document.getElementById("services-section");
      servicesSection?.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile menu if open
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleSignIn = () => {
    navigate("/login", {
      state: {
        from: location.pathname,
        serviceId: location.state?.serviceId,
      },
    });
  };

  return (
    <nav className="bg-white fixed w-full z-50">
      {/* Top bar with contact info */}
      <div className="w-full bg-[#F7F7F7] py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center space-x-6">
            <div className="flex items-center text-sm">
              <span className="text-gray-500">Have any questions?</span>
              <a
                href="tel:+61383766284"
                className="ml-2 text-[#4C94FF] hover:text-[#4C94FF]/90"
              >
                +2519 465 64344
              </a>
              <span className="mx-2 text-gray-400">—</span>
              <a
                href="mailto:noreply@envato.com"
                className="text-[#4C94FF] hover:text-[#4C94FF]/90"
              >
                bereketmitiku@gmail.com
              </a>
            </div>
            {/* Social icons */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#4C94FF]">
                <i className="fab fa-skype"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4C94FF]">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4C94FF]">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4C94FF]">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4C94FF]">
                <i className="fab fa-google-plus"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4C94FF]">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4C94FF]">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-[80px]">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <div className="flex items-center">
                  <span className="flex items-center justify-center bg-[#4C94FF] text-white text-2xl font-bold w-12 h-12 rounded-full shadow-lg">
                    Care
                  </span>
                  <span className="ml-3 text-2xl font-semibold text-gray-900">
                    Car Wash
                  </span>
                </div>
              </Link>
              <div className="hidden md:ml-12 md:flex md:space-x-8">
                <Link
                  to="/"
                  className="text-[15px] text-gray-600 hover:text-[#4C94FF] px-3 py-2 font-medium border-b-2 border-transparent hover:border-[#4C94FF] transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/who-we-are"
                  className="text-[15px] text-gray-600 hover:text-[#4C94FF] px-3 py-2 font-medium border-b-2 border-transparent hover:border-[#4C94FF] transition-colors"
                >
                  Who we are
                </Link>
                <button
                  onClick={handlePackageSelection}
                  className="text-[15px] text-gray-600 hover:text-[#4C94FF] px-3 py-2 font-medium border-b-2 border-transparent hover:border-[#4C94FF] transition-colors"
                >
                  Order now
                </button>
              </div>
            </div>

            {/* Search icon and Auth buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {currentUser && (
                <Link
                  to="/bookings"
                  className="text-[15px] text-[#4C94FF] hover:text-[#4C94FF]/90 px-3 py-2 font-medium border-b-2 border-transparent hover:border-[#4C94FF] transition-colors"
                >
                  My Bookings
                </Link>
              )}
              {currentUser ? (
                <>
                  <span className="text-gray-600 text-[15px] font-medium">
                    {displayName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-[#4C94FF] text-white hover:bg-[#4C94FF]/90 px-4 py-2 rounded text-[15px] font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSignIn}
                    className="text-gray-600 hover:text-[#4C94FF] text-[15px] font-medium"
                  >
                    Sign In
                  </button>
                  <Link
                    to="/signup"
                    className="bg-[#4C94FF] text-white hover:bg-[#4C94FF]/90 px-4 py-2 rounded text-[15px] font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-[#4C94FF] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#4C94FF]"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#4C94FF] hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to="/who-we-are"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#4C94FF] hover:bg-gray-50"
            >
              Who we are
            </Link>
            <Link
              to="/cars"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#4C94FF] hover:bg-gray-50"
            >
              Cars
            </Link>
            <Link
              to="/special-offer"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#4C94FF] hover:bg-gray-50"
            >
              Special offer
            </Link>
            <Link
              to="/contact-us"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#4C94FF] hover:bg-gray-50"
            >
              Contact us
            </Link>
            <button
              onClick={handlePackageSelection}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-[#4C94FF] hover:bg-gray-50"
            >
              Order now
            </button>

            {/* Contact information for mobile */}
            <div className="px-3 py-3 border-t border-gray-200">
              <div className="flex flex-col space-y-2 text-sm">
                <span className="text-gray-500">Have any questions?</span>
                <a
                  href="tel:+61383766284"
                  className="text-[#4C94FF] hover:text-[#4C94FF]/90"
                >
                  +61 383 766 284
                </a>
                <a
                  href="mailto:noreply@envato.com"
                  className="text-[#4C94FF] hover:text-[#4C94FF]/90"
                >
                  noreply@envato.com
                </a>
              </div>

              {/* Social icons for mobile */}
              <div className="flex items-center space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-[#4C94FF]">
                  <i className="fab fa-skype"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#4C94FF]">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#4C94FF]">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#4C94FF]">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#4C94FF]">
                  <i className="fab fa-google-plus"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#4C94FF]">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#4C94FF]">
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>

            {/* Auth buttons for mobile */}
            <div className="px-3 py-3 border-t border-gray-200">
              {currentUser ? (
                <>
                  <span className="block px-3 py-2 text-gray-600 text-[15px]">
                    {displayName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-white bg-[#4C94FF] hover:bg-[#4C94FF]/90 rounded-md"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSignIn}
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#4C94FF] hover:bg-gray-50"
                  >
                    Sign In
                  </button>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 text-base font-medium text-white bg-[#4C94FF] hover:bg-[#4C94FF]/90 rounded-md text-center mt-2"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Show My Bookings in mobile menu when authenticated */}
            {currentUser && (
              <Link
                to="/bookings"
                className="block px-3 py-2 text-base font-medium text-[#4C94FF] hover:text-[#4C94FF]/90 hover:bg-gray-50"
              >
                My Bookings
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
