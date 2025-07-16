'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Foter";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      const parsed = JSON.parse(storedItems);
      setCartItems(parsed);
      calculateTotal(parsed);
    }
    setIsLoading(false);
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => {
      const priceNumber = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
      return acc + priceNumber * item.quantity;
    }, 0);
    setTotal(sum);
  };

  const updateQuantity = (id, type) => {
    const updated = cartItems.map((item) => {
      if (item._id === id) {
        const newQty = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(newQty, 1) };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
    calculateTotal(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
    calculateTotal(updated);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-pulse text-xl">Loading your cart...</div>
      </div>
    );
  }

  return (
    <>  
      <Nav />
      <div className="min-h-screen px-4 py-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-red-600 animate-fade-in mt-10">
            Your Cart 🛒
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😕</div>
              <p className="text-xl mb-6">Your cart is empty</p>
              <Link 
                href="/" 
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col md:flex-row gap-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="relative w-full md:w-40 h-40 flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain rounded-lg"
                        sizes="(max-width: 768px) 100vw, 160px"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                        <p className="text-red-600 font-bold text-lg mb-3">{item.price}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                          {item.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-auto">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item._id, 'decrease')}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="font-bold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, 'increase')}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-1 justify-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 sticky top-4">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>Rs {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-green-600">Rs {total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push("/Checkout")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-bold transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Proceed to Checkout
                  </button>

                  <div className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
                    or <Link href="/Product" className="text-blue-500 hover:underline">continue shopping</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}