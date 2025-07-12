"use client";
import React, { useEffect, useState } from "react";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Foter";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cachedData = localStorage.getItem('productData');
        const cachedTime = localStorage.getItem('productDataTime');
        
        if (cachedData && cachedTime) {
          const currentTime = new Date().getTime();
          const cacheExpiryTime = parseInt(cachedTime) + (60);
          
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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

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
        description : product.description,
        quantity: 1
      });
    }
    console.log("Image URL:", product.imageUrl);
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${product.name} added to cart!`);
    setShowModal(false);
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
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group cursor-pointer"
                    onClick={() => handleProductClick(product)}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(product);
                        }}
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

      {/* Product Detail Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 rounded-full p-2 z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="grid md:grid-cols-2 gap-8 p-6">
                <div className="relative h-96">
                  <Image
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-2xl text-red-600 font-bold mb-6">
                    {selectedProduct.price}
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Description</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedProduct.description || "No description available."}
                    </p>
                  </div>
                  
            
                  
                  <a
                    href={`https://wa.me/03096953920?text=I%27m%20interested%20in%20${selectedProduct.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold text-lg transition p-4 flex items-center justify-center gap-2"
                  >
                    Whatsapp {selectedProduct.price}
                  </a>
               
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}