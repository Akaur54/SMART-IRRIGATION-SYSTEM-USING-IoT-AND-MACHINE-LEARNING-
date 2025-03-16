import Link from 'next/link';
import React from 'react';

export default function RemoteControlPage() {
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
              Remote Control
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Control your irrigation system from anywhere with our mobile app. Whether you’re at home or on the go, manage your watering schedules and monitor system performance with ease.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our mobile app provides real-time access and control, allowing you to make adjustments instantly. You can also receive notifications and alerts about your system’s status and performance.
            </p>
            <ul className="text-left text-gray-600 mb-8 list-disc pl-5">
              <li className="mb-2">• Remote access from your smartphone or tablet</li>
              <li className="mb-2">• Real-time monitoring and control</li>
              <li className="mb-2">• Customizable notifications and alerts</li>
              <li className="mb-2">• Easy setup and user-friendly interface</li>
            </ul>
            <div className="text-center">
              <Link href="/download-app" className="bg-primary text-white px-6 py-3 rounded-full text-lg hover:bg-primary-dark">
                Download the App
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
