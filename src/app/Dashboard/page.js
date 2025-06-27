"use client";

// import { useEffect, useState } from "react";

// export default function AdminPage() {
//   const [contacts, setContacts] = useState([]);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       const res = await fetch("/api2/admin");
//       const data = await res.json();
//       if (data.success) setContacts(data.data);
//     };
//     fetchContacts();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Panel - Contacts</h1>
//       <div className="space-y-4">
        
//         {contacts.map((c) => (
//           <div key={c._id} className="border p-4 rounded shadow">
//             <p><strong>Name:</strong> {c.name}</p>
//             <p><strong>Email:</strong> {c.email}</p>
//             <p><strong>Message:</strong> {c.message}</p>
//             <p className="text-sm text-gray-500"><strong>Submitted:</strong> {new Date(c.createdAt).toLocaleString()}</p>
//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiPieChart, FiDollarSign, FiBox, FiCalendar, FiChevronDown, FiChevronUp, FiCreditCard, FiSearch, FiBell, FiMenu } from 'react-icons/fi';

export default function Dashboard() {
  const [display, setDisplay] = useState('hide');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: FiHome, label: 'Home', href: '/' },
    { icon: FiPieChart, label: 'Contact', href: '/Contact-dashboard' },
    { icon: FiDollarSign, label: 'Wallet', href: '/wallet' },
    { icon: FiBox, label: 'Services', href: '/services' }
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden flex justify-between items-center bg-black text-white px-4 py-3">
        <h1 className="text-2xl font-bold">Rise.</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu className="text-2xl" />
        </button>
      </div>

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
        <div className="text-center text-sm opacity-70 mt-6">Calvin West</div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-[55%] p-6 overflow-auto">
        <h2 className="text-3xl font-semibold mb-2">Welcome back, <span className="font-bold text-pink-600">Calvin</span></h2>
        <p className="text-sm text-gray-500 mb-1">My Balance</p>
        <p className="text-3xl font-bold text-purple-700">$5,750.20</p>

        <div className="flex justify-between items-end mt-10">
          <div className="flex items-end">
            <h3 className="text-2xl font-bold">Transactions</h3>
            <p className="text-sm text-gray-400 ml-4">Apr 2021</p>
          </div>
          <FiCalendar className="text-2xl text-gray-500" />
        </div>

        <div className="overflow-auto mt-4 bg-white dark:bg-gray-800 shadow rounded-xl p-4">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="pb-2">Name of transaction</th>
                <th className="pb-2">Category</th>
                <th className="pb-2 text-right">Cashback</th>
                <th className="pb-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-200">
              {[{name: 'Amazon', category: 'Electronic Devices', cashback: '+$2', amount: '-$242.00', date: 'Apr 24, 2021 at 1:40pm'},
                {name: 'Starbucks', category: 'Cafe and restaurant', cashback: '+$23', amount: '-$32.00', date: 'Apr 22, 2021 at 2:43pm'},
                {name: 'YouTube', category: 'Social Media', cashback: '+$4', amount: '-$112.00', date: 'Apr 13, 2021 at 11:23am'}
              ].concat(display === 'show' ? [
                {name: 'Amazon', category: 'Electronic Devices', cashback: '+$2', amount: '-$242.00', date: 'Apr 12, 2021 at 9:40pm'},
                {name: 'Starbucks', category: 'Cafe and restaurant', cashback: '+$23', amount: '-$32.00', date: 'Apr 10, 2021 at 2:10pm'},
                {name: 'YouTube', category: 'Social Media', cashback: '+$4', amount: '-$112.00', date: 'Apr 7, 2021 at 9:03am'}
              ] : []).map((txn, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2">
                    <div className="flex flex-col">
                      <span className="font-semibold">{txn.name}</span>
                      <span className="text-xs text-gray-400">{txn.date}</span>
                    </div>
                  </td>
                  <td>{txn.category}</td>
                  <td className="text-right">{txn.cashback}</td>
                  <td className="text-right font-bold">{txn.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-center mt-6 gap-4">
            <hr className="flex-1 border-gray-300" />
            <button onClick={() => setDisplay(display === 'show' ? 'none' : 'show')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {display === 'show' ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
            </button>
            <hr className="flex-1 border-gray-300" />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-[30%] bg-gray-100 dark:bg-gray-900 p-6 overflow-auto min-w-[300px] shadow-inner">
        <div className="flex items-center mb-6">
          <div className="relative w-full mr-2">
            <input type="text" className="w-full p-2 pl-10 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-400 border border-gray-300 dark:border-gray-700" placeholder="Search" />
            <div className="absolute top-2.5 left-3 text-gray-500 dark:text-gray-400">
              <FiSearch className="w-4 h-4" />
            </div>
          </div>
          <button className="relative p-2 bg-white dark:bg-gray-700 rounded-full">
            <FiBell className="w-5 h-5 text-gray-600 dark:text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-pink-600 text-white rounded-full flex items-center justify-center">2</span>
          </button>
        </div>

        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">My Cards</h3>
        <div className="rounded-2xl bg-gradient-to-t from-[#B57295] to-[#29259A] text-white p-6 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-300">Current Balance</p>
              <p className="text-xl font-bold">$5,750.20</p>
            </div>
            <div className="flex items-center">
              <FiCreditCard className="mr-2" />
              <p className="text-sm">Rise.</p>
            </div>
          </div>
          <p className="my-4 tracking-widest text-lg">**** **** **** 1289</p>
          <div className="flex justify-between text-sm">
            <div>
              <p className="uppercase text-xs text-gray-300">Valid Thru</p>
              <p>12/23</p>
            </div>
            <div>
              <p className="uppercase text-xs text-gray-300">CVV</p>
              <p>***</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
