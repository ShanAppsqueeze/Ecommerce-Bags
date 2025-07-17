"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Foter";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { loadStripe } from "@stripe/stripe-js";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod' or 'stripe'
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const router = useRouter();

  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      const parsed = JSON.parse(storedItems);
      setCartItems(parsed);
      calculateTotal(parsed);
    }
    setIsLoading(false);
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

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleStripePayment = async () => {
    setIsSubmitting(true);

    try {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );

      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          customerInfo: userInfo,
        }),
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
        swal("Payment Error", result.error.message, "error");
      }
    } catch (error) {
      console.error("Stripe error:", error);
      swal(
        "Payment Error",
        "An error occurred during payment processing",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!userInfo.name || !userInfo.phone || !userInfo.address) {
      swal({
        title: "Please fill in all required fields.",
        timer: 1000,
        showClass: {
          popup: `animate__animated animate__fadeInUp animate__faster`,
        },
        hideClass: {
          popup: `animate__animated animate__fadeOutDown animate__faster`,
        },
      });
      return;
    }

    if (paymentMethod === "stripe") {
      await handleStripePayment();
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      ...userInfo,
      cartItems,
      total,
      paymentMethod,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/checkoutApi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.removeItem("cartItems");
        router.push("/thank-you");
      } else {
        swal("Order Failed", data.message || "Something went wrong", "error");
      }
    } catch (err) {
      console.error("Order error", err);
      swal("Error", "Something went wrong. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-pulse text-xl">Loading your order...</div>
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-8 text-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-green-600 mb-2 mt-10">
              Complete Your Order
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Please fill in your details to proceed with checkout
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Info Form */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Contact Information
                </h2>

                <form className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={userInfo.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-1"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleInputChange}
                      placeholder="+92 300 1234567"
                      className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium mb-1"
                    >
                      Shipping Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={userInfo.address}
                      onChange={handleInputChange}
                      placeholder="House #123, Street #45, City"
                      rows="4"
                      className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    ></textarea>
                  </div>
                </form>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Payment Method
                </h2>

                <div className="space-y-4">
                  <div
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-300 dark:border-gray-600 hover:border-green-400"
                    }`}
                    onClick={() => handlePaymentMethodChange("cod")}
                  >
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      checked={paymentMethod === "cod"}
                      onChange={() => {}}
                      className="h-5 w-5 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor="cod" className="ml-3 flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Cash on Delivery</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Pay when you receive
                        </span>
                      </div>
                    </label>
                  </div>

                  <div
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "stripe"
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-300 dark:border-gray-600 hover:border-green-400"
                    }`}
                    onClick={() => handlePaymentMethodChange("stripe")}
                  >
                    <input
                      type="radio"
                      id="stripe"
                      name="paymentMethod"
                      checked={paymentMethod === "stripe"}
                      onChange={() => {}}
                      className="h-5 w-5 text-green-600 focus:ring-green-500"
                    />
                    <label
                      htmlFor="stripe"
                      className="ml-3 flex-1 cursor-pointer"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Credit/Debit Card</span>
                        <div className="flex space-x-2">
                        
                          <Image
                            src="/stripe-logo.png"
                            alt="Payment Cards"
                            width={80}
                            height={25}
                            className="h-5 object-contain"
                          />
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Secure payment via Stripe
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Order Summary
                </h2>

                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-start gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-contain rounded-lg"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {item.quantity} × {item.price}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>Rs {total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      {paymentMethod === "stripe" && (
                        <div className="flex justify-between">
                          <span>Payment Fee</span>
                          <span>Rs {(total * 0.03).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg pt-2">
                        <span>Total</span>
                        <span className="text-green-600">
                          Rs{" "}
                          {paymentMethod === "stripe"
                            ? (total * 1.03).toFixed(2)
                            : total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting || cartItems.length === 0}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                  isSubmitting || cartItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 hover:shadow-md"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    {paymentMethod === "stripe" ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        Pay with Card
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Place Order
                      </>
                    )}
                  </>
                )}
              </button>

              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                By placing your order, you agree to our{" "}
                <a href="/terms" className="text-green-600 hover:underline">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
