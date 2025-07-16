"use client";

import Link from "next/link";
import Image from "next/image";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Foter";

export default function About() {
  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 text-gray-800 py-12 md:py-20 px-4 sm:px-6 lg:px-8 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 mb-4 dark:from-red-400 dark:to-pink-500">
              About Us
            </h1>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-6 dark:bg-red-400"></div>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto dark:text-gray-300">
              Welcome to{" "}
              <span className="font-semibold text-red-600 dark:text-red-400">
                BagElegance
              </span>{" "}
              – your destination for premium, handcrafted bags where fashion
              meets function in every stitch.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-white p-6 rounded-xl shadow-lg dark:bg-gray-800">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                  Why Choose{" "}
                  <span className="text-red-600 dark:text-red-400">
                    BagElegance
                  </span>
                  ?
                </h2>
                <ul className="space-y-4">
                  {[
                    "Unique and elegant bag collections designed for modern lifestyles",
                    "Premium quality materials & meticulous craftsmanship",
                    "Ergonomic designs for comfort without compromising style",
                    "Sustainable and ethical production practices",
                    "Trusted by thousands of satisfied customers worldwide",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center dark:bg-red-900">
                          <svg
                            className="w-3 h-3 text-red-600 dark:text-red-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <span className="ml-3 text-gray-700 dark:text-gray-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 text-center md:text-left">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:from-red-500 dark:to-pink-500"
                >
                  Contact Us
                  <svg
                    className="ml-2 -mr-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 hover:shadow-2xl">
                <Image
                  src="https://i.ibb.co/r2BWj4mN/pexels-bertellifotografia-2905238.jpg"
                  alt="Luxury handcrafted bags from BagElegance"
                  layout="fill"
                  objectFit="cover"
                  quality={90}
                  className="hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 dark:bg-gray-800">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              Our <span className="text-red-600 dark:text-red-400">Story</span>
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  The Beginning
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Founded in 2015, BagElegance started as a small workshop with
                  a passion for creating beautiful, functional bags. Our
                  founder, a master craftsman with 20 years of experience,
                  wanted to bring artisanal quality to everyday accessories.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Our Mission
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We&apos;re committed to sustainable fashion that doesn&apos;t
                  compromise on style or quality. Each bag is designed to be
                  timeless, durable, and environmentally conscious - a piece
                  you&apos;ll love for years to come.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
