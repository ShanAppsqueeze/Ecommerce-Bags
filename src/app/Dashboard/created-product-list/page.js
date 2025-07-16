"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import Sidebar from "../Sidebar/page";
import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiBox,
  FiEdit,
  FiTrash2,
  FiX,
  FiCheck,
} from "react-icons/fi";
import swal from "sweetalert";

export default function ProductListPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState({
    _id: "",
    name: "",
    price: "",
    description: "",
    isActive: true,
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/productInsert");
      const data = await res.json();
      if (data.success) setProductList(data.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const menuItems = [
    { icon: FiHome, label: "Dashboard", href: "/Dashboard" },
    {
      icon: FiPieChart,
      label: "Contact",
      href: "/Dashboard/Contact-dashboard",
    },
    {
      icon: FiDollarSign,
      label: "Product-upload",
      href: "/Dashboard/Product-upload",
    },
    {
      icon: FiBox,
      label: "View-Product",
      href: "/Dashboard/created-product-list",
    },
    { icon: FiBox, label: "View-Order", href: "/Dashboard/Odder-details" },
  ];

  const openEditModal = (product) => {
    setEditProduct(product);
    setEditModalOpen(true);
  };

  const closeEditModal = () => setEditModalOpen(false);

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      const res = await fetch(`/api/productUpdate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProduct),
      });

      const data = await res.json();
      if (data.success) {
        swal({
          position: "top-end",
          icon: "success",
          title: "Product updated successfully",
          showConfirmButton: false,
          timer: 1000,
        });
        closeEditModal();
        fetchProducts();
      } else {
        alert(data.message || "Failed to update");
      }
    } catch (error) {
      console.error("Edit error:", error);
      alert("Error updating product");
    }
  };

  const toggleActiveStatus = async (product) => {
    try {
      const res = await fetch("/api/productUpdate", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: product._id, isActive: !product.isActive }),
      });
      const data = await res.json();
      if (data.success) {
        swal({
          position: "top-end",
          icon: "success",
          title: `Product ${!product.isActive ? "activated" : "deactivated"}`,
          showConfirmButton: false,
          timer: 1000,
        });
        fetchProducts();
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleDelete = async (productId) => {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await fetch(`/api/deleteProduct?id=${productId}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.success) {
            swal({
              position: "top-end",
              icon: "success",
              title: "Product deleted successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchProducts();
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error("Delete error:", error);
          alert("Failed to delete product.");
        }
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6 overflow-x-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Product List</h1>
            {productList.length > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                {productList.length} products
              </span>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 font-medium">#</th>
                    <th className="px-4 py-3 font-medium">Image</th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Description</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {productList.length > 0 ? (
                    productList.map((p, i) => (
                      <tr
                        key={p._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="px-4 py-3">{i + 1}</td>
                        <td className="px-4 py-3">
                          <div className="w-10 h-10 rounded-md overflow-hidden">
                            <Image
                              src={p.imageUrl || "/placeholder-product.png"}
                              alt={p.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium">{p.name}</td>
                        <td className="px-4 py-3">${p.price}</td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          {p.description.length > 50
                            ? `${p.description.substring(0, 50)}...`
                            : p.description}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleActiveStatus(p)}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              p.isActive
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {p.isActive ? (
                              <>
                                <FiCheck className="mr-1" /> Active
                              </>
                            ) : (
                              <>
                                <FiX className="mr-1" /> Inactive
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => openEditModal(p)}
                              className="p-2 text-blue-600 hover:text-blue-900 dark:hover:text-blue-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50"
                              title="Edit"
                            >
                              <FiEdit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(p._id)}
                              className="p-2 text-red-600 hover:text-red-900 dark:hover:text-red-300 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"
                              title="Delete"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Edit Product</h2>
                <button
                  onClick={closeEditModal}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name</label>
                  <input
                    name="name"
                    value={editProduct.name}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Product Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input
                    name="price"
                    value={editProduct.price}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Product Price"
                    type="number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    value={editProduct.description}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Product Description"
                    rows="3"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={editProduct.isActive}
                    onChange={handleEditChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="ml-2 text-sm font-medium">
                    Active Product
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={closeEditModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}