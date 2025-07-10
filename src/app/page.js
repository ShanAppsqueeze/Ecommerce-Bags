"use client";
import React from "react";
import Navbar from "./Navbar/Nav";
import Footer from "./Footer/Foter";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function Home() {
  // Bag data
  const bagData = [
    {
      id: 1,
      name: "Canvas Crossbody Bag",
      price: "$45.00",
      image: "https://images.unsplash.com/photo-1622560481979-f5b0174242a0?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Leather Tote Bag",
      price: "$65.00",
      image: "https://images.unsplash.com/photo-1688591846152-207833503e76?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Mini Backpack",
      price: "$55.00",
      image: "https://images.unsplash.com/photo-1625060371499-8a01616c86f0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Designer Clutch",
      price: "$75.00",
      image: "https://images.unsplash.com/photo-1611915792328-d60035c6a255?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Travel Duffel",
      price: "$85.00",
      image: "https://images.unsplash.com/photo-1704124388679-f57f6cd9434d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      name: "Eco-Friendly Shopper",
      price: "$35.00",
      image: "https://images.unsplash.com/photo-1647541244097-3f9949492abb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      comment: "Absolutely love my new tote! The quality is exceptional and it fits all my daily essentials.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      comment: "Best backpack I've ever owned. Comfortable, stylish, and durable. Worth every penny!",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Emma Williams",
      comment: "The clutch is so elegant and versatile. I've received so many compliments already!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    },
    {
      id: 4,
      name: "David Kim",
      comment: "Great customer service and fast shipping. The bag arrived in perfect condition.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
      id: 5,
      name: "Olivia Martinez",
      comment: "The eco-friendly shopper is my new favorite. Lightweight yet sturdy, perfect for groceries.",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/women/25.jpg"
    }
  ];

  // Slider settings for bags
  const bagSliderSettings = {
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

  // Slider settings for testimonials
  const testimonialSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "30px",
        },
      },
    ],
  };

  // Render star ratings
  const renderStars = (rating) => {
    return (
      <div className="flex justify-center mb-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar />

      {/* Hero Section - Optimized for Mobile */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div className="text-center md:text-left order-2 md:order-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-3 md:mb-6">
              Carry Confidence <br /> With Every Step 👜
            </h1>
            <p className="text-gray-100 text-sm sm:text-base md:text-lg mb-4 md:mb-6 px-2 md:px-0">
              Explore our premium collection of handcrafted bags designed for
              style, comfort, and everyday utility.
            </p>
            <a
              href="#shop"
              className="inline-block px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-white text-blue-500 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 font-semibold text-sm sm:text-base"
            >
              Shop Now
            </a>
          </div>

          <div className="flex justify-center order-1 md:order-2">
            <div className="w-4/5 sm:w-3/4 md:w-full overflow-hidden rounded-lg">
              <Image
                width={400}
                height={400}
                src="https://i.ibb.co/qMt7gzwL/depositphotos-153448550-stock-photo-kids-pink-schoolbag-removebg-preview.png"
                alt="Stylish Bag"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md transform transition-transform duration-500 hover:scale-110"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trending Bags Section - Mobile Optimized */}
      <section className="py-8 sm:py-10 md:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-8 md:mb-10 text-center">
            Trending Bags 👜
          </h2>

          <div className="slider-container px-1 sm:px-2">
            <Slider {...bagSliderSettings}>
              {bagData.map((bag) => (
                <div key={bag.id} className="px-1 sm:px-2 focus:outline-none">
                  <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md overflow-hidden hover:shadow-xl transition h-full mx-0 sm:mx-1">
                    
                    <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                      <Image
                        width={300}
                        height={400}
                        src={bag.image}
                        alt={bag.name}
                        className="w-full h-100 sm:h-56 md:h-100 object-cover transition-all duration-300 hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section - Mobile Optimized */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center">
            What Our Customers Say
          </h2>
          
          <div className="slider-container px-1 sm:px-2">
            <Slider {...testimonialSliderSettings}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="px-1 sm:px-2 focus:outline-none">
                  <div className="bg-white dark:bg-gray-700 p-4 sm:p-5 md:p-6 rounded-lg shadow-md h-full">
                    {renderStars(testimonial.rating)}
                    <p className="text-gray-600 dark:text-gray-300 italic mb-3 sm:mb-4 text-center text-xs sm:text-sm md:text-base">
                      "{testimonial.comment}"
                    </p>
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                      <Image
                        width={40}
                        height={40}
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-gray-800 dark:text-white font-medium text-sm sm:text-base">
                          {testimonial.name}
                        </p>
                      </div>
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