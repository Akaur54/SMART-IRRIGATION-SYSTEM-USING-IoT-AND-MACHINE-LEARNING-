import Link from 'next/link';
import React from 'react';

export default function SupportPage() {
  return (
    <div>
      <header className="p-5 shadow-sm border-b-2 bg-white flex justify-between items-center">
        <img src={'/logo.svg'} alt="Logo" className="h-10" /> {/* Replace with your logo path */}
        <div className="flex gap-5 items-center">
        <div className='bg-primary p-1 rounded-full text-xs text-white px-2 flex items-center'>
              <img src={'/weather-icon.svg'} alt="Weather" className='h-5 mr-2' /> {/* Replace with weather icon path */}
              <span>Today's Weather: Sunny, 25°C</span> {/* Example weather info */}
            </div>
        </div>
      </header>

      <main className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white p-10 rounded-lg shadow-lg w-full">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
              24/7 Support
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We're here to help you anytime, any day. Our dedicated support team is available around the clock to ensure that you receive the assistance you need whenever you need it.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Whether you have questions about our services, need technical support, or require assistance with your account, our team is just a call or click away. We are committed to providing prompt and effective solutions to ensure your experience is seamless and enjoyable.
            </p>
            <ul className="text-left text-gray-600 mb-8 list-disc pl-5">
              <li className="mb-2">• 24/7 availability for all customer inquiries</li>
              <li className="mb-2">• Dedicated support team for quick resolution</li>
              <li className="mb-2">• Multiple channels of communication (phone, email, chat)</li>
              <li className="mb-2">• Comprehensive assistance for any issues or questions</li>
            </ul>
            <div className="text-center">
              <Link href="/support/contact" className="bg-primary text-white px-6 py-3 rounded-full text-lg hover:bg-primary-dark">
                Contact Support
              </Link>
            </div>
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
