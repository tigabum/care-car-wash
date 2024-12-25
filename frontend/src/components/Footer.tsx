import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-950 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo Column */}
          <div className="flex flex-col items-start">
            <img
              src="/images/wow-logo-white.png"
              alt="CARE Logo"
              className="h-10 mb-2"
            />
            <div className="space-y-1 text-sm text-gray-300">
              <div className="flex items-center">
                <span className="font-semibold">WASH HOURS:</span>
              </div>
              <div className="flex items-center">
                <span>7:00am - 9:00pm</span>
              </div>
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-base font-semibold mb-2">Contact</h3>
            <div className="space-y-1 text-sm text-gray-300">
              <p>📞 833.CARE.WASH</p>
              <p>(+251946565344)</p>
              <button className="text-white hover:text-blue-300">
                Contact
              </button>
              <button className="block text-white hover:text-blue-300">
                Join Text Club
              </button>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-base font-semibold mb-2">Navigation</h3>
            <ul className="space-y-1 text-sm text-gray-300 grid grid-cols-2">
              <li>
                <Link to="/services" className="hover:text-blue-300">
                  Wash Services
                </Link>
              </li>
              <li>
                <Link to="/membership" className="hover:text-blue-300">
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-blue-300">
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-blue-300">
                  News Room
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-blue-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-blue-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations Column */}
          <div>
            <h3 className="text-base font-semibold mb-2">Locations</h3>
            <ul className="space-y-0 text-sm text-gray-300 grid grid-cols-2">
              <li>S. Buffalo Dr.</li>
              <li>N. Durango</li>
              <li>S. Fort Apache Rd.</li>
              <li>E. Lake Mead Blvd.</li>
              <li>W. Lake Mead Blvd.</li>
              <li>S. Maryland Pkwy.</li>
            </ul>
          </div>
        </div>

        {/* Social Media and Bottom Section */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-4">
              <a href="#" className="text-white hover:text-blue-300">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-white hover:text-blue-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-blue-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-blue-300">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>

            <div className="text-gray-400 text-xs">
              <span>© Copyright {currentYear}, All Rights Reserved.</span>
              <span className="mx-2">|</span>
              <Link to="/privacy" className="hover:text-blue-300">
                Privacy Policy
              </Link>
              <span className="mx-2">|</span>
              <Link to="/terms" className="hover:text-blue-300">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
