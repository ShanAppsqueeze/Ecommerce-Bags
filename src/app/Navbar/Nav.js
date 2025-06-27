"use client";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/Product" },
    { name: "About", href: "/About" },
    { name: "Contact", href: "/Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-red-600 tracking-tight">
          RSJ<span className="text-slate-800 dark:text-white">BAGS</span>
        </Link>

        {/* Mobile Toggle Button */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="text-slate-700 hover:text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8 items-center text-slate-700 dark:text-slate-200 text-lg font-medium">
          {navItems.map((item, i) => (
            <li key={i}>
              <Link href={item.href} className="hover:text-red-600 transition">
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <button className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md transition shadow-md focus:ring-4 focus:ring-red-200">
              Login
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out shadow-lg z-[9998] ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/" className="text-xl font-bold text-red-600">
            NEXTNEWS
          </Link>
          <button onClick={toggleMobileMenu} className="text-slate-700 hover:text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col gap-6 p-6 text-slate-700 dark:text-slate-200 text-lg">
          {navItems.map((item, i) => (
            <li key={i}>
              <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-600 transition">
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <button className="bg-red-600 hover:bg-red-500 text-white w-full py-2 rounded-md mt-4 shadow-md transition focus:ring-4 focus:ring-red-200">
              Login
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
