"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiHome, FiPieChart, FiDollarSign, FiBox } from "react-icons/fi";
import swal from "sweetalert";

export default function ProductUploadPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", product.id);
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("image", product.image);

    console.log("Form data:", formData);

    try {
      const res = await fetch("/api/productUpload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        swal({
          title: "✅ Product uploaded successfully!",
          icon: "success",
          timer: 1500,
        });
        setProduct({ id: "", name: "", price: "", image: null });
      } else {
        alert("❌ Failed to upload product.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Error uploading product.");
    }
  };

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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="w-full p-6 overflow-x-auto flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Upload New Product
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                value={product.name}
                onChange={handleChange}
                type="text"
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                name="price"
                value={product.price}
                onChange={handleChange}
                type="text"
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Product Image
              </label>
              <input
                name="image"
                onChange={handleChange}
                type="file"
                accept="image/*"
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                required
                reset="true"
              />
            </div>

            <button
              type="submit"
              class="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer">
              Submit Product
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
// here is upload product code i want to add active and non active product list and make more enhance design
