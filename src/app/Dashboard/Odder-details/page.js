'use client';
import { useEffect, useState } from 'react';
import { FiEdit, FiTrash2, FiDownload, FiChevronDown, FiX, FiMenu, FiSearch } from 'react-icons/fi';
import { FiHome, FiPieChart, FiDollarSign, FiBox, FiUsers, FiShoppingBag } from 'react-icons/fi';
import Link from 'next/link';
import Sidebar from '../Sidebar/page';
import Image from 'next/image';


export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [editingStatus, setEditingStatus] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success) setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    // Filter by status
    if (filter !== 'All' && order.status !== filter) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.name.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query) ||
        order.phone.includes(query) ||
        order._id.toLowerCase().includes(query) ||
        order.status.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const statusOptions = ['Pending', 'Complete', 'Cancelled'];

  const statusColor = {
    Complete: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const handleStatusUpdate = async (orderId) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
        setEditingStatus(null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (confirm('Are you sure you want to delete this order?')) {
      try {
        const res = await fetch(`/api/orders/${orderId}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success) {
          setOrders(orders.filter(order => order._id !== orderId));
        }
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const exportToCSV = () => {
    const headers = ['Order ID', 'Customer', 'Email', 'Phone', 'Address', 'Products', 'Total', 'Date', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredOrders.map(order => {
        const products = order.cartItems.map(item => `${item.name} (×${item.quantity})`).join('; ');
        return [
          `#${order._id.slice(-6)}`,
          order.name,
          order.email,
          order.phone,
          order.address,
          products,
          `Rs ${order.total.toFixed(2)}`,
          new Date(order.createdAt).toLocaleDateString(),
          order.status || 'Pending'
        ].map(field => `"${field}"`).join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `orders_${filter}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportDropdown(false);
  };

  const exportToPDF = () => {
    alert('PDF export functionality would be implemented here');
    setShowExportDropdown(false);
  };

  // Calculate order statistics
  const orderStats = {
    total: orders.length,
    completed: orders.filter(o => o.status === 'Complete').length,
    pending: orders.filter(o => o.status === 'Pending').length,
    cancelled: orders.filter(o => o.status === 'Cancelled').length,
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Toggle */}
    
      <Sidebar/>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">Order Management</h1>
            <p className="text-gray-600 dark:text-gray-400">View and manage customer orders</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 border-blue-500">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Orders</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{orderStats.total}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 border-green-500">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Completed</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{orderStats.completed}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 border-yellow-500">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pending</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{orderStats.pending}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 border-red-500">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Cancelled</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{orderStats.cancelled}</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex flex-wrap gap-2">
              {['All', 'Complete', 'Pending', 'Cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    filter === tab
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowExportDropdown(!showExportDropdown)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
                >
                  <FiDownload /> Export
                  <FiChevronDown className={`transition ${showExportDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showExportDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-600 overflow-hidden">
                    <button
                      onClick={exportToCSV}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    >
                      Export as CSV
                    </button>
                    <button
                      onClick={exportToPDF}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    >
                      Export as PDF
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                Loading orders...
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Customer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                          Products
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                          <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-400">
                              #{order._id.slice(-6)}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{order.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{order.email}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{order.phone}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 md:hidden mt-1">
                                {order.cartItems.length} item{order.cartItems.length !== 1 ? 's' : ''}
                              </div>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                              <div className="flex flex-col space-y-2">
                                {order.cartItems.slice(0, 3).map((item) => (
                                  <div key={item._id} className="flex items-center">
                                    <Image
                                      width={32}
                                      height={32}
                                      src={item.imageUrl}
                                      alt={item.name}
                                      className="w-8 h-8 object-cover rounded mr-2"
                                    />
                                    <div>
                                      <div className="text-sm text-gray-900 dark:text-white">{item.name}</div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {item.quantity} × Rs {order.total.toFixed(2)}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                {order.cartItems.length > 3 && (
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    +{order.cartItems.length - 3} more items
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600 dark:text-green-400">
                              Rs {order.total.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                              {new Date(order.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                {editingStatus === order._id ? (
                                  <>
                                    <select
                                      value={newStatus}
                                      onChange={(e) => setNewStatus(e.target.value)}
                                      className="text-xs p-1 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                    >
                                      {statusOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                      ))}
                                    </select>
                                    <button
                                      onClick={() => handleStatusUpdate(order._id)}
                                      className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => setEditingStatus(null)}
                                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                    >
                                      <FiX size={16} />
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <span
                                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        statusColor[order.status || 'Pending']
                                      }`}
                                    >
                                      {order.status || 'Pending'}
                                    </span>
                                    <button
                                      onClick={() => {
                                        setEditingStatus(order._id);
                                        setNewStatus(order.status || 'Pending');
                                      }}
                                      className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                                      title="Edit status"
                                    >
                                      <FiEdit size={14} />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleDeleteOrder(order._id)}
                                className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 transition"
                                title="Delete order"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                            {searchQuery ? (
                              `No orders found matching "${searchQuery}"`
                            ) : (
                              `No orders found for ${filter} status`
                            )}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}