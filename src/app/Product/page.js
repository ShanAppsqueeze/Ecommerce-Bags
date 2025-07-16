"use client";
import React, { useEffect, useState } from "react";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Foter";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
 
        const res = await fetch("/api/productInsert");
        const data = await res.json();
        console.log("Fetching products from API...",data);
        
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
    router.push("/cart");
  };

  const filteredProducts = productList
    .filter(product => 
      product.isActive && 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch(sortOption) {
        case "price-low":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high":
          return parseFloat(b.price) - parseFloat(a.price);
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <>
      <Nav />
      <section className="min-h-screen py-8 md:py-12 px-4 sm:px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-3 mt-10">
              Our Products 👜
            </h1>
            
            {/* Search and Sort Controls */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              
              <select
                className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-300">Loading products...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                No products found
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                {searchTerm ? "Try a different search term" : "We're currently out of stock"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-200 dark:border-gray-700"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image 
                      src={product.imageUrl}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                      priority={false}
                    />
                 
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {product.name}
                      </h3>
                      <span className="text-red-600 font-bold whitespace-nowrap ml-2">
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                    </div>

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