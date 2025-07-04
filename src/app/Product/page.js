"use client";

import React, { useEffect, useState } from "react";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Foter";

export default function Page() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/productInsert");
      const data = await res.json();
      console.log("Fetched products:", data);
      
      if (data.success) setProductList(data.data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Nav />
      <section className="min-h-screen py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-red-600 mb-12">Our Products 👜</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {productList.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
              > 
                            
                <div className="overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{product.name}</h3>
                  <p className="text-red-600 font-bold mb-3">${product.price}</p>
                  <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white py-2 rounded-md transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14"
                      />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}