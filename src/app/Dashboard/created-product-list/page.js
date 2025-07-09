"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiBox,
  FiEdit,
  FiTrash2,
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
      if (data.success) fetchProducts();
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleDelete = async (productId) => {
    if (!confirm(`Are you sure you want to delete this product?`)) return;
    try {
      const res = await fetch(`/api/deleteProduct?id=${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        // swal({
        //   title: "✅ Product Deleted successfully!",
        //   icon: "success",
        //   timer: 1500,
        // });
        swal({
          position: "top-end",
          icon: "success",
          title: "Product Deleted successfully!",
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
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      <div
        className={`fixed lg:static top-0 left-0 z-50 h-full lg:h-auto flex-col items-center justify-between bg-black text-white py-8 shadow-xl transition-all duration-300 ${
          sidebarOpen ? "flex w-full sm:w-2/3" : "hidden"
        } lg:flex lg:w-[15%]`}
      >
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-between items-center w-full px-4 lg:hidden">
            <h1 className="text-2xl font-bold">Rise.</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white"
            >
              ✕
            </button>
          </div>
          <h1 className="text-4xl lg:text-3xl font-extrabold mb-12 hidden lg:block">
            Rise.
          </h1>
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

      <div className="w-full p-6 overflow-x-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>
          <table className="w-full text-sm text-left border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {productList.map((p, i) => (
                <tr
                  key={p._id}
                  className="border-t border-gray-300 dark:border-gray-700"
                >
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">
                    <Image 
                      src={p.imageUrl || "https://via.placeholder.com/40"}
                      alt={p.name}
                      width={80}
                      height={80}
                      loading="lazy"
                      className="w-10 h-10 rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">${p.price}</td>
                  <td className="px-4 py-2">
                    {/* <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        p.isActive
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {p.isActive ? "Active" : "Inactive"}
                    </span> */}

                    <span
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {p.isActive ? "Active" : "Inactive"}
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2 items-center">
                    <span
                      type="button"
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      {" "}
                      {p.isActive ? "Deactivate" : "Activate"}{" "}
                    </span>

                    <button
                      className="text-blue-600 dark:text-blue-400 cursor-pointer"
                      onClick={() => openEditModal(p)}
                    >
                      <FiEdit />
                    </button>

                    <button
                      className="text-red-600 dark:text-red-400 cursor-pointer"
                      onClick={() => handleDelete(p._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <input
              name="name"
              value={editProduct.name}
              onChange={handleEditChange}
              className="w-full p-2 mb-3 border rounded dark:bg-gray-700"
              placeholder="Product Name"
            />
            <input
              name="price"
              value={editProduct.price}
              onChange={handleEditChange}
              className="w-full p-2 mb-3 border rounded dark:bg-gray-700"
              placeholder="Product Price"
            />
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                name="isActive"
                checked={editProduct.isActive}
                onChange={handleEditChange}
              />
              <span>Active</span>
            </label>
            <div className="flex justify-end gap-2">

              <button
                onClick={closeEditModal}
                class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Cancel
              </button>

              <button
                onClick={handleEditSubmit}
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
