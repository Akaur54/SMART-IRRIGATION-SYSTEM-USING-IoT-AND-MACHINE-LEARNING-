import Link from 'next/link';
import React from 'react';

export default function ContactPage() {
  return (
    <div>
      <header className='p-5 shadow-sm border-b-2 bg-white flex justify-between items-center'>
        <img src={'/logo.svg'} alt="Logo" className='h-10' /> {/* Replace with your logo path */}
        <div className='flex gap-5 items-center'>
        <div className='bg-primary p-1 rounded-full text-xs text-white px-2 flex items-center'>
              <img src={'/weather-icon.svg'} alt="Weather" className='h-5 mr-2' /> {/* Replace with weather icon path */}
              <span>Today's Weather: Sunny, 25°C</span> {/* Example weather info */}
            </div>
        </div>
      </header>

      <main className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Contact Us</h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
              We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us using the form below.
            </p>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    placeholder="Your Email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Your Message"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-3 rounded-full text-lg hover:bg-primary-dark"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="bg-white py-10">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
