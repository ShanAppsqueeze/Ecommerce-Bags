"use client";
import React, { useState } from "react";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Foter";

export default function Page() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/hello", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ name: "", email: "", message: "" });
      setSuccess(true);
    }
  };

  return (
    <>
      <Nav />
      <section className="min-h-screen bg-white dark:bg-gray-900 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-red-600 mb-10">
            Contact Us 💌
          </h1>

          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 text-lg">
            We&apos;d love to hear from you! Fill out the form below and we&apos;ll get
            back to you as soon as possible.
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-6"
          >
            {success && (
              <div className="text-green-600 font-medium">
                Message sent successfully!
              </div>
            )}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 dark:text-white font-medium mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-white font-medium mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 dark:text-white font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-500 transition font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
