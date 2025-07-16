'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  FiHome, 
  FiUsers, 
  FiShoppingBag, 
  FiBox, 
  FiDollarSign,
  FiX,
  FiMenu 
} from 'react-icons/fi';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', href: '/Dashboard' },
    { icon: FiUsers, label: 'Contact', href: '/Dashboard/Contact-dashboard' },
    { icon: FiShoppingBag, label: 'Products', href: '/Dashboard/Product-upload' },
    { icon: FiBox, label: "Inventory", href: "/Dashboard/created-product-list" },
    { icon: FiDollarSign, label: "Orders", href: "/Dashboard/Odder-details" },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <button 
          onClick={toggleSidebar}
          className="text-gray-700 dark:text-white"
          aria-label="Toggle sidebar"
        >
          <FiMenu size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
        <div className="w-6"></div> {/* Spacer for alignment */}
      </div>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 h-screen transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-gray-800 text-white`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h1 className="text-2xl font-bold">Rise.</h1>
            <button 
              onClick={closeSidebar}
              className="lg:hidden text-white hover:text-gray-300 transition"
              aria-label="Close sidebar"
            >
              <FiX size={24} />
            </button>
          </div>
          
          <nav className="flex-1 mt-6">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-lg transition ${
                      pathname === item.href 
                        ? 'bg-gray-700 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    onClick={closeSidebar}
                  >
                    <item.icon className="text-lg mr-3" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 text-center text-sm text-gray-400 border-t border-gray-700">
            RSJ Bag © {new Date().getFullYear()}
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      <div 
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } lg:hidden`}
        onClick={closeSidebar}
      />
    </>
  );
};

export default Sidebar;