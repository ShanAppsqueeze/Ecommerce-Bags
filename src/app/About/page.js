// pages/about.js
"use client";

import Link from "next/link";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Foter";



export default function About() {

  return (

    <>
    <Nav />
    <div className="min-h-screen from-pink-50 to-purple-100 text-gray-800 py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-red-600 mb-8">About Us</h1>

        <p className="text-lg mb-6 text-center max-w-2xl mx-auto dark:text-white">
          Welcome to <span className="font-semibold text-red-500 dark:text-white">BagElegance</span> – your destination for premium, handcrafted bags made with care and creativity. We believe fashion meets function in every stitch.
        </p>

        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-bold dark:text-white mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside space-y-2 dark:text-white">
              <li>Unique and elegant bag collections</li>
              <li>Top-quality materials & craftsmanship</li>
              <li>Designed for comfort, durability & style</li>
              <li>Trusted by thousands of customers</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src="https://i.ibb.co/r2BWj4mN/pexels-bertellifotografia-2905238.jpg"
              alt="About BagElegance"
              className="rounded-xl shadow-lg max-w-sm hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-full shadow hover:bg-red-500 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>

    <Footer />
    </>
  );
}
