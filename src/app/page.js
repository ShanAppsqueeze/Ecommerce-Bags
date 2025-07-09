"use client";
import React from "react";
import Navbar from "./Navbar/Nav";
import Footer from "./Footer/Foter";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
              Carry Confidence <br /> With Every Step 👜
            </h1>
            <p className="text-gray-100 text-lg mb-6">
              Explore our premium collection of handcrafted bags designed for style, comfort, and everyday utility.
            </p>
            <a
              href="#shop"
              className="px-6 py-3 bg-white text-blue-500 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 font-semibold"
            >
              Shop Now
            </a>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center">
            <div className="overflow-hidden rounded-lg">
              <img
                src="https://i.ibb.co/qMt7gzwL/depositphotos-153448550-stock-photo-kids-pink-schoolbag-removebg-preview.png"
                alt="Stylish Bag"
                className="w-full max-w-md transform transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trending Bags Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-10">Trending Bags 👜</h2>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                <img
                  src="https://images.unsplash.com/photo-1618354691373-1094d17b7435"
                  alt="Bag"
                  className="w-full h-64 object-cover transition-all duration-300 hover:scale-110"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Canvas Crossbody Bag</h3>
                  <p className="text-red-600 font-bold mt-2">$45.00</p>
                  <button className="mt-4 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white py-2 rounded-md transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Section */}
        {/* Carousel Section */}







        </div>
      </section>

      <Footer />
    </>
  );
}
