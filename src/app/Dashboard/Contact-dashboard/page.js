
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiPieChart, FiDollarSign, FiBox } from 'react-icons/fi';

export default function AdminPage() {
  const [contacts, setContacts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', href: '/Dashboard' },
    { icon: FiPieChart, label: 'Contact', href: '/Dashboard/Contact-dashboard' },
    { icon: FiDollarSign, label: 'Product-upload', href: '/Dashboard/Product-upload' },
    { icon: FiBox, label: 'Services', href: '/services' }
  ];

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await fetch("/api/admin");
      const data = await res.json();
      if (data.success) setContacts(data.data);
    };
    fetchContacts();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      {/* Sidebar with routing */}
      <div className={`fixed lg:static top-0 left-0 z-50 h-full lg:h-auto flex-col items-center justify-between bg-black text-white py-8 shadow-xl transition-all duration-300 ${sidebarOpen ? 'flex w-full sm:w-2/3' : 'hidden'} lg:flex lg:w-[15%]`}>
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-between items-center w-full px-4 lg:hidden">
            <h1 className="text-2xl font-bold">Rise.</h1>
            <button onClick={() => setSidebarOpen(false)} className="text-white">✕</button>
          </div>

          <h1 className="text-4xl lg:text-3xl font-extrabold mb-12 hidden lg:block">Rise.</h1>
          <div className="flex lg:flex-col items-center gap-6 mt-4 lg:mt-0">
            {menuItems.map(({ icon: Icon, label, href }, i) => (
              <Link key={i} href={href} legacyBehavior>
                <a className="flex flex-col items-center hover:text-pink-500 transition duration-300">
                  <Icon className="text-2xl" />
                  <p className="text-sm mt-1">{label}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center text-sm opacity-70 mt-6">RSJ Bag</div>
      </div>

      {/* Main Content */}
      <div className="w-full p-6 overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-center mx-auto">Contact Us</h1>
          <div className="flex gap-2 items-center">
            <input type="text" placeholder="Chercher dans les membres" className="text-sm px-2 py-1 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-white">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Your Name</th>
                <th className="p-3 text-left">Your Email</th>
                <th className="p-3 text-left">Your Message</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 dark:text-gray-200">
              {contacts.map((c, idx) => (
                <tr key={c._id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.message || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {/* <div className="flex justify-center items-center gap-2 mt-4">
          {[1, 2, 3, 4, 5].map((page) => (
            <button key={page} className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-purple-200 dark:hover:bg-purple-800">
              {page}
            </button>
          ))}
        </div> */}
      </div>
    </div>
  );
}
