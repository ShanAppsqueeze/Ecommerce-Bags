"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Foter";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if user comes directly without completing checkout
    const timer = setTimeout(() => {
      router.push("/");
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <Image
              src="/success-icon.png" // Replace with your success icon
              alt="Order Successful"
              fill
              className="object-contain"
            />
          </div>

          <h1 className="text-4xl font-bold text-green-600 mb-4 animate-fade-in">
            Thank You For Your Order!
          </h1>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h2 className="text-lg font-semibold mb-2">
                  Your order is confirmed
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  We&apos;ve received your order and will begin processing it
                  shortly. You&apos;ll receive a WhatsApp message with order
                  details and updates.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <svg
                className="h-8 w-8 text-blue-500 mx-auto mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h3 className="font-semibold mb-1">Email Confirmation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Check your inbox for order details (including spam folder)
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <svg
                className="h-8 w-8 text-green-500 mx-auto mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <h3 className="font-semibold mb-1">WhatsApp Updates</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                You will receive order updates via WhatsApp on your provided
                number
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <svg
                className="h-8 w-8 text-purple-500 mx-auto mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="font-semibold mb-1">Delivery Time</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Most orders arrive within 3-5 business days
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* <Link
              href="/Order-Details" // Replace with your orders tracking page
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              View Order Details
            </Link> */}

            <Link
              href="/"
              className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Continue Shopping
            </Link>
          </div>

          <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
            <p>
              Need help?{" "}
              <Link href="/contact" className="text-blue-500 hover:underline">
                Contact our support team
              </Link>
            </p>
            <p className="mt-2">
              You will be automatically redirected to homepage in 10 seconds...
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
