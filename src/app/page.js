"use client";
import React from "react";
import Navbar from "./Navbar/Nav";
import Footer from "./Footer/Foter";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // Bag data
  const bagData = [
    {
      id: 1,
      name: "Canvas Crossbody Bag",
      price: "$45.00",
      image:
        "https://images.unsplash.com/photo-1622560481979-f5b0174242a0?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Leather Tote Bag",
      price: "$65.00",
      image:
        "https://images.unsplash.com/photo-1688591846152-207833503e76?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Mini Backpack",
      price: "$55.00",
      image:
        "https://images.unsplash.com/photo-1625060371499-8a01616c86f0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Designer Clutch",
      price: "$75.00",
      image:
        "https://images.unsplash.com/photo-1611915792328-d60035c6a255?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Travel Duffel",
      price: "$85.00",
      image:
        "https://images.unsplash.com/photo-1704124388679-f57f6cd9434d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      name: "Eco-Friendly Shopper",
      price: "$35.00",
      image:
        "https://images.unsplash.com/photo-1647541244097-3f9949492abb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      comment:
        "Absolutely love my new tote! The quality is exceptional and it fits all my daily essentials.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Michael Chen",
      comment:
        "Best backpack I've ever owned. Comfortable, stylish, and durable. Worth every penny!",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Emma Williams",
      comment:
        "The clutch is so elegant and versatile. I received so many compliments already!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    },
    {
      id: 4,
      name: "David Kim",
      comment:
        "Great customer service and fast shipping. The bag arrived in perfect condition.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      id: 5,
      name: "Olivia Martinez",
      comment:
        "The eco-friendly shopper is my new favorite. Lightweight yet sturdy, perfect for groceries.",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/women/25.jpg",
    },
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
            className={`w-5 h-5 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
          <div className="text-center md:text-left space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Elevate Your Style <br className="hidden md:block" /> With{" "}
              <span className="text-yellow-300">BagElegance</span>
            </h1>
            <p className="text-lg md:text-xl max-w-lg mx-auto md:mx-0 text-white/90">
              Discover our premium collection of handcrafted bags designed for
              the modern individual who values both style and functionality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#shop"
                className="px-8 py-3 bg-white text-purple-600 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Shop Collection
              </a>

              <Link
                href="/Contact"
                className="px-8 py-3 bg-white text-purple-600 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {" "}
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative h-64 md:h-96 lg:h-[500px]">
            <Image
              src="https://i.ibb.co/qMt7gzwL/depositphotos-153448550-stock-photo-kids-pink-schoolbag-removebg-preview.png"
              alt="Featured Bag"
              fill
              className="object-contain animate-float"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Bags Section */}
      <section id="shop" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Our <span className="text-purple-600">Featured</span> Collection
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Handpicked selection of our most popular and premium quality bags
            </p>
          </div>

          <div className="slider-container px-2">
            <Slider {...bagSliderSettings}>
              {bagData.map((bag) => (
                <div key={bag.id} className="px-2 focus:outline-none">
                  <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={bag.image}
                        alt={bag.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        quality={90}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                ),
                title: "Premium Quality",
                description:
                  "Crafted with the finest materials for lasting durability and style.",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                ),
                title: "Fast Shipping",
                description:
                  "Get your order delivered quickly with our express shipping options.",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    ></path>
                  </svg>
                ),
                title: "Secure Payment",
                description:
                  "Shop with confidence using our secure payment methods.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              What Our <span className="text-purple-600">Customers</span> Say
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </div>

          <div className="slider-container px-2">
            <Slider {...testimonialSliderSettings}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="px-2 focus:outline-none">
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm h-full">
                    {renderStars(testimonial.rating)}
                    <blockquote className="text-gray-600 dark:text-gray-300 italic mb-6">
                      "{testimonial.comment}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="font-bold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-purple-600">Verified Buyer</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your Style?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust BagElegance for
            their everyday carry needs.
          </p>

          <Link
            href="/Product"
            className="inline-block ml-4 px-8 py-3 bg-white text-purple-600 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Shop Now
          </Link>
          
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .slick-prev:before,
        .slick-next:before {
          color: #9333ea !important;
        }
        .slick-dots li button:before {
          color: #9333ea !important;
        }
        .slick-dots li.slick-active button:before {
          color: #9333ea !important;
        }
      `}</style>
    </>
  );
}
