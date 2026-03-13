import React from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
            <FileText className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-black tracking-tight">
            Make <span className="text-blue-600">Your Resume</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 font-medium text-gray-600">
          <a href="/#features" className="hover:text-blue-600 transition-colors cursor-pointer">
            Features
          </a>
          <Link href="/templates" className="hover:text-blue-600 transition-colors">
            Templates
          </Link>
          <a href="/about" className="hover:text-blue-600 transition-colors">
            About
          </a>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          {/* <Link href="/login" className="hidden sm:block text-gray-600 font-medium hover:text-gray-900">
            Sign In
          </Link> */}
          <Link href="/builder">
            <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300">
              Start Building
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}