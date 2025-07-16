"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiHome, FiPieChart, FiDollarSign, FiBox, FiUpload, FiImage } from "react-icons/fi";
import swal from "sweetalert";
import Sidebar from "../Sidebar/page";

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
    formData.append("description", product.description);
    formData.append("image", product.image);

    console.log("Form data:", product.description);

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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-auto flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <FiUpload className="text-blue-500 text-2xl mr-2" />
            <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Upload New Product
            </h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Product Name
              </label>
              <div className="relative">
                <input
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-3 pl-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter product name"
                  required
                />
                <FiBox className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price
              </label>
              <div className="relative">
                <input
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-3 pl-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter price"
                  required
                />
                <FiDollarSign className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                rows="4"
                placeholder="Enter product description"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Product Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                    <FiImage className="text-3xl text-blue-500 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {product.image ? product.image.name : "PNG, JPG, JPEG up to 5MB"}
                    </p>
                  </div>
                  <input
                    name="image"
                    onChange={handleChange}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    required
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center"
            >
              <FiUpload className="mr-2" />
              Submit Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}