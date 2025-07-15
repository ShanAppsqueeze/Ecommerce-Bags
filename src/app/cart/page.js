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
  const router = useRouter();

  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      const parsed = JSON.parse(storedItems);
      setCartItems(parsed);
      calculateTotal(parsed);
    }
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

  return (
    <>  
      <Nav />
      <div className="min-h-screen px-4 py-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
        <h1 className="text-4xl font-bold text-center mb-8 text-red-600">Your Cart 🛒</h1>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-xl">Your cart is empty.</p>
            <Link href="/" className="text-blue-500 underline mt-4 inline-block">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <div className="relative w-full sm:w-48 h-48">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-contain rounded"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-red-600 font-bold">{item.price}</p>
                  <p className="text-sm">{item.description}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item._id, 'decrease')}
                      className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:opacity-80"
                    >
                      −
                    </button>
                    <span className="font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, 'increase')}
                      className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:opacity-80"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="ml-auto px-4 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-right text-xl font-bold text-green-600">
              Total: Rs {total.toFixed(2)}
            </div>

            <div className="text-right">

              <button
                onClick={() => router.push("/Checkout")}
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-bold inline-block"
              >
                Checkout
              </button>
            </div>

          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
