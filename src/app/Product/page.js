"use client";
import React, { useEffect, useState } from "react";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Foter";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cachedData = localStorage.getItem('productData');
        const cachedTime = localStorage.getItem('productDataTime');
        
        if (cachedData && cachedTime) {
          const currentTime = new Date().getTime();
          const cacheExpiryTime = parseInt(cachedTime) + 60; // 60 ms?

          if (currentTime < cacheExpiryTime) {
            setProductList(JSON.parse(cachedData));
            setIsLoading(false);
            return;
          }
        }

        const res = await fetch("/api/productInsert");
        const data = await res.json();

        if (data.success) {
          setProductList(data.data);
          localStorage.setItem('productData', JSON.stringify(data.data));
          localStorage.setItem('productDataTime', new Date().getTime().toString());
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item._id === product._id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        _id: product._id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        description: product.description,
        quantity: 1,
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    router.push("/cart"); // Redirect to cart page
  };

  return (
    <>
      <Nav />
      <section className="min-h-screen py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-red-600 mb-12">
            Our Products 👜
          </h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {productList
                .filter((product) => product.isActive)
                .map((product) => (
                  <div
                    key={product._id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
                  >
                    <div className="overflow-hidden">
                      <Image 
                        src={product.imageUrl}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="w-full h-100 object-cover transform group-hover:scale-110 transition duration-500"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                        {product.name.split(" ").slice(0, 3).join(" ")}
                      </h3>
                      <p className="text-red-600 font-bold mb-3">
                        {product.price}
                      </p>

                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white py-2 rounded-md transition"
                      >
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
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
