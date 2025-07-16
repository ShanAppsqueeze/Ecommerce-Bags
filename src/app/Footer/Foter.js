"use strict";
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center">
              <span className="mr-2">BagHaven</span>
              <span className="text-red-500">👜</span>
            </h2>
            <p className="text-gray-400">
              Handcrafted bags made with love and premium quality for every occasion.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-red-500">
              Shop
            </h3>
            <ul className="space-y-3">
              {['All Bags', 'Tote Bags', 'Backpacks', 'Crossbody', 'Limited Edition'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-start"
                  >
                    <span className="mr-2 text-red-500">•</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-red-500">
              Help & Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2 text-red-500">•</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contact Us
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-red-500">•</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  FAQs
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-red-500">•</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Returns & Exchanges
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-red-500">•</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Shipping Policy
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-red-500">•</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-red-500">
              Stay Updated
            </h3>
            <p className="text-gray-400">
              Subscribe to our newsletter for exclusive offers and new arrivals.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors duration-300 font-medium"
              >
                Subscribe
              </button>
            </form>
            <div className="pt-2 space-y-2">
              <div className="flex items-center text-gray-400">
                <FiMail className="mr-2 text-red-500" />
                <span>support@baghaven.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <FiPhone className="mr-2 text-red-500" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BagHaven. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}