"use client";
import React from "react";
import Navbar from "./Navbar/Nav";
import Footer from "./Footer/Foter";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function Home() {
  const bagData = [
    {
      id: 1,
      name: "Canvas Crossbody Bag",
      price: "$45.00",
      image: "https://images.unsplash.com/photo-1618354691373-1094d17b7435",
    },
    {
      id: 2,
      name: "Leather Tote Bag",
      price: "$65.00",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
    },
    {
      id: 3,
      name: "Mini Backpack",
      price: "$55.00",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    },
    {
      id: 4,
      name: "Designer Clutch",
      price: "$75.00",
      image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08",
    },
    {
      id: 5,
      name: "Travel Duffel",
      price: "$85.00",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
    },
    {
      id: 6,
      name: "Eco-Friendly Shopper",
      price: "$35.00",
      image: "https://images.unsplash.com/photo-1591561954555-607968c989ab",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4 md:mb-6">
              Carry Confidence <br /> With Every Step 👜
            </h1>
            <p className="text-gray-100 text-base sm:text-lg mb-4 md:mb-6 px-2 md:px-0">
              Explore our premium collection of handcrafted bags designed for
              style, comfort, and everyday utility.
            </p>
            <a
              href="#shop"
              className="inline-block px-6 py-3 bg-white text-blue-500 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 font-semibold"
            >
              Shop Now
            </a>
          </div>

          <div className="flex justify-center mt-6 md:mt-0">
            <div className="w-3/4 md:w-full overflow-hidden rounded-lg">
              <img
                src="https://i.ibb.co/qMt7gzwL/depositphotos-153448550-stock-photo-kids-pink-schoolbag-removebg-preview.png"
                alt="Stylish Bag"
                className="w-full max-w-md transform transition-transform duration-500 hover:scale-110"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trending Bags Section */}
      <section className="py-10 md:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8 md:mb-10 text-center">
            Trending Bags 👜
          </h2>

          <div className="slider-container px-2 sm:px-0">
            <Slider {...settings}>
              {bagData.map((bag) => (
                <div key={bag.id} className="px-2 focus:outline-none">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition h-full mx-1">
                    <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                      <Image
                        width={300}
                        height={400}
                        src={bag.image}
                        alt={bag.name}
                        className="w-full h-100 object-cover transition-all duration-300 hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-white line-clamp-2">
                        {bag.name}
                      </h3>
                   
                   
                      
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}