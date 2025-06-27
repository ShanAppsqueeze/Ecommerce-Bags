"use strict";
export default function foter() {
  return (
    <footer class="bg-gray-900 text-white py-12 ">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* <!-- Logo and Description --> */}
        <div>
          <h2 class="text-2xl font-bold mb-4">BagHaven 👜</h2>
          <p class="text-gray-400">
            Handcrafted bags made with love and premium quality for every
            occasion.
          </p>
        </div>

        {/* <!-- Shop Links --> */}
        <div>
          <h3 class="text-lg font-semibold mb-4">Shop</h3>
          <ul class="space-y-2 text-gray-400">
            <li>
              <a href="#" class="hover:text-white transition">
                All Bags
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition">
                Tote Bags
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition">
                Backpacks
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition">
                Crossbody
              </a>
            </li>
          </ul>
        </div>

        {/* <!-- Customer Service --> */}
        <div>
          <h3 class="text-lg font-semibold mb-4">Customer Service</h3>
          <ul class="space-y-2 text-gray-400">
            <li>
              <a href="#" class="hover:text-white transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition">
                Returns
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition">
                Shipping
              </a>
            </li>
          </ul>
        </div>

        {/* <!-- Newsletter --> */}
        <div>
          <h3 class="text-lg font-semibold mb-4">Subscribe</h3>
          <p class="text-gray-400 mb-4">
            Get updates about new arrivals and special offers.
          </p>
          <form class="flex items-center">
            <input
              type="email"
              placeholder="Your email"
              class="w-full px-3 py-2 rounded-l-md text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              class="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-r-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* <!-- Bottom --> */}
      <div class="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © 2025 BagHaven. All rights reserved.
      </div>
    </footer>
  );
}
