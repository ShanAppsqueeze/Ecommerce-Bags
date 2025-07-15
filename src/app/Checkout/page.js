"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Foter";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      const parsed = JSON.parse(storedItems);
      setCartItems(parsed);
      calculateTotal(parsed);
    }
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => {
      const priceNumber = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return acc + priceNumber * item.quantity;
    }, 0);
    setTotal(sum);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!userInfo.name || !userInfo.phone || !userInfo.address) {
      alert("Please fill in all required fields.");
      return;
    }

    const orderData = {
      ...userInfo,
      cartItems,
      total,
    };

    try {
      const res = await fetch("/api/checkoutApi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Order saved to database!");

        // Optionally redirect or clear cart
        localStorage.removeItem("cartItems");
        // redirect to thank you page, etc.
      } else {
        alert("Order failed: " + data.message);
      }
    } catch (err) {
      console.error("Order error", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-8 text-gray-800 dark:text-white mt-10">
        <h1 className="text-4xl font-bold text-center mb-6 text-green-600">
          Checkout
        </h1>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* User Info Form */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Your Information</h2>
            <form className="space-y-4">
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full p-3 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                required
              />
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                placeholder="Email (optional)"
                className="w-full p-3 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
              />
              <input
                type="tel"
                name="phone"
                value={userInfo.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full p-3 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                required
              />
              <textarea
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
                placeholder="Shipping Address"
                rows="4"
                className="w-full p-3 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                required
              ></textarea>
            </form>
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm">
                        {item.quantity} × {item.price}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="text-right text-xl font-bold text-green-600 mt-4">
                  Total: Rs {total.toFixed(2)}
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full mt-4 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold"
                >
                  Place Order via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
