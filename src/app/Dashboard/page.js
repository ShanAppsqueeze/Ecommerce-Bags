'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FiHome, FiPieChart, FiDollarSign, FiBox, FiCalendar,
  FiChevronDown, FiChevronUp, FiCreditCard, FiSearch,
  FiBell, FiMenu, FiLogOut
} from 'react-icons/fi';
import Sidebar from './Sidebar/page';
import swal from 'sweetalert';

export default function ClientDashboard() {
  const [display, setDisplay] = useState('hide');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/Login");
      swal({
        title: "Logout successful!",
        icon: "success",
        timer: 1000,
      });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const transactions = [
    {name: 'Amazon', category: 'Electronic Devices', cashback: '+$2', amount: '-$242.00', date: 'Apr 24, 2021 at 1:40pm'},
    {name: 'Starbucks', category: 'Cafe and restaurant', cashback: '+$23', amount: '-$32.00', date: 'Apr 22, 2021 at 2:43pm'},
    {name: 'YouTube', category: 'Social Media', cashback: '+$4', amount: '-$112.00', date: 'Apr 13, 2021 at 11:23am'},
    ...(display === 'show' ? [
      {name: 'Amazon', category: 'Electronic Devices', cashback: '+$2', amount: '-$242.00', date: 'Apr 12, 2021 at 9:40pm'},
      {name: 'Starbucks', category: 'Cafe and restaurant', cashback: '+$23', amount: '-$32.00', date: 'Apr 10, 2021 at 2:10pm'},
      {name: 'YouTube', category: 'Social Media', cashback: '+$4', amount: '-$112.00', date: 'Apr 7, 2021 at 9:03am'}
    ] : [])
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-700 dark:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FiMenu size={24} />
        </button>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Left Panel - Transactions */}
        <div className="w-full lg:w-[55%] p-4 md:p-6 overflow-auto ml-0 lg:ml-64">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              Welcome back, <span className="font-bold text-pink-600 dark:text-pink-400">Admin</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">My Balance</p>
            <p className="text-2xl md:text-3xl font-bold text-purple-700 dark:text-purple-400">$5,750.20</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold">Transactions</h3>
                <p className="text-sm text-gray-400 mt-1 sm:mt-0 sm:ml-4 sm:inline-block">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 mt-2 sm:mt-0">
                <FiCalendar className="text-lg text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-500 dark:text-gray-400 border-b">
                    <th className="pb-3 text-left min-w-[160px]">Transaction</th>
                    <th className="pb-3 text-left hidden sm:table-cell">Category</th>
                    <th className="pb-3 text-right">Cashback</th>
                    <th className="pb-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn, idx) => (
                    <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3">
                        <div className="flex flex-col">
                          <span className="font-medium">{txn.name}</span>
                          <span className="text-xs text-gray-400">{txn.date}</span>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell">{txn.category}</td>
                      <td className="text-right text-green-500">{txn.cashback}</td>
                      <td className="text-right font-medium text-red-500">{txn.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-center mt-6 gap-4">
              <hr className="flex-1 border-gray-200 dark:border-gray-700" />
              <button 
                onClick={() => setDisplay(display === 'show' ? 'hide' : 'show')} 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                {display === 'show' ? 
                  <FiChevronUp className="text-xl text-gray-600 dark:text-gray-300" /> : 
                  <FiChevronDown className="text-xl text-gray-600 dark:text-gray-300" />
                }
              </button>
              <hr className="flex-1 border-gray-200 dark:border-gray-700" />
            </div>
          </div>
        </div>

        {/* Right Panel - Cards & Search */}
        <div className="w-full lg:w-[45%] bg-gray-50 dark:bg-gray-900 p-4 md:p-6 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-800">
          <div className="flex items-center mb-6 gap-3">
            <div className="relative flex-1">
              <input 
                type="text" 
                className="w-full p-2 pl-10 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Search" 
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button className="relative p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <FiBell className="text-gray-600 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-pink-600 text-white rounded-full flex items-center justify-center">2</span>
            </button>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">My Cards</h3>
            <div className="relative rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white p-5 md:p-6 shadow-lg overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
              <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <p className="text-xs text-gray-200 mb-1">Current Balance</p>
                  <p className="text-xl font-bold">$5,750.20</p>
                </div>
                <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-3 py-1">
                  <FiCreditCard className="mr-2" />
                  <p className="text-sm font-medium">Rise.</p>
                </div>
              </div>
              
              <p className="my-5 tracking-widest text-lg md:text-xl font-medium relative z-10">•••• •••• •••• 1289</p>
              
              <div className="flex justify-between text-sm relative z-10">
                <div>
                  <p className="text-xs text-gray-200 mb-1">Valid Thru</p>
                  <p>12/23</p>
                </div>
                <div>
                  <p className="text-xs text-gray-200 mb-1">CVV</p>
                  <p>•••</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition flex flex-col items-center">
                <FiDollarSign className="text-xl mb-2 text-purple-600 dark:text-purple-400" />
                <span className="text-sm">Transfer</span>
              </button>
              <button className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition flex flex-col items-center">
                <FiCreditCard className="text-xl mb-2 text-purple-600 dark:text-purple-400" />
                <span className="text-sm">Pay Bills</span>
              </button>
              <button className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition flex flex-col items-center">
                <FiPieChart className="text-xl mb-2 text-purple-600 dark:text-purple-400" />
                <span className="text-sm">Invest</span>
              </button>
              <button 
                onClick={handleLogout}
                className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition flex flex-col items-center"
              >
                <FiLogOut className="text-xl mb-2 text-purple-600 dark:text-purple-400" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}