'use client';

import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1661818305309-dd2145095cb2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c21hcnQlMjBpcnJpZ2F0aW9uJTIwc3lzdGVtJTIwdXNpbmclMjB3ZWF0aGVyfGVufDB8fDB8fHww')", // Replace with the correct path to your image
      }}
    >
      <div className="bg-black bg-opacity-50 flex-1">
        <header className="p-5 shadow-sm border-b-2 bg-black bg-opacity-60 flex justify-between items-center">
          <img src={'/logo.svg'} alt="Logo" className='h-10' /> {/* Replace with your logo path */}
          <div className='flex gap-5 items-center'>
            <div className='bg-primary p-1 rounded-full text-xs text-white px-2 flex items-center'>
              <img src={'/weather-icon.svg'} alt="Weather" className='h-5 mr-2' /> {/* Replace with weather icon path */}
              <span>Today's Weather: Sunny, 25°C</span> {/* Example weather info */}
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-10 rounded-lg">
            <h1 className="text-5xl font-bold text-white mb-4">Smart Irrigation System</h1>
            <p className="text-xl text-gray-200 mb-8">Optimize your irrigation with our smart system, ensuring efficient water usage and healthier plants.</p>
            <Link href="/dashboard" className="bg-primary text-white px-6 py-3 rounded-full text-lg">
              Get Started
            </Link>
          </div>
        </main>

        <section className="py-20">
          <div className="container mx-auto text-center p-10 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="p-6 border rounded-lg bg-black bg-opacity-60 text-white">
                <h3 className="text-2xl font-bold mb-2">Automated Scheduling</h3>
                <p className="text-gray-200">Set and forget with our automated irrigation schedules.</p>
                <Link href="/features" className='text-primary hover:underline block mt-4'>Learn More</Link>
              </div>
              <div className="p-6 border rounded-lg bg-black bg-opacity-60 text-white">
                <h3 className="text-2xl font-bold mb-2">Remote Control</h3>
                <p className="text-gray-200">Control your irrigation system from anywhere with our mobile app.</p>
                <Link href="/remote-control" className='text-primary hover:underline block mt-4'>Learn More</Link>
              </div>
              <div className="p-6 border rounded-lg bg-black bg-opacity-60 text-white">
                <h3 className="text-2xl font-bold mb-2">Water Conservation</h3>
                <p className="text-gray-200">Save water with intelligent irrigation based on weather and soil moisture.</p>
                <Link href="/conservation" className='text-primary hover:underline block mt-4'>Learn More</Link>
              </div>
              <div className="p-6 border rounded-lg bg-black bg-opacity-60 text-white">
                <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
                <p className="text-gray-200">We're here to help you anytime, any day.</p>
                <Link href="/support" className='text-primary hover:underline block mt-4'>Learn More</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
