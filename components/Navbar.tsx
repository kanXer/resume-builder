'use client'; // State use karne ke liye zaruri hai
import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-1.5 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-200">
            <FileText className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-slate-900">
              MAKE<span className="text-blue-600"> YOUR RESUME</span>
            </span>
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mt-0.5">
              Powering your next big move.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 font-medium text-gray-600">
          <Link href="/#features" className="hover:text-blue-600 transition-colors">Features</Link>
          <Link href="/templates" className="hover:text-blue-600 transition-colors">Templates</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
        </div>

        {/* Desktop & Mobile CTA */}
        <div className="flex items-center gap-2">
          <Link href="/templates" className="md:block xs:block hidden">
            <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-all cursor-pointer">
              Start Building
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full left-0 p-4 space-y-4 shadow-xl">
          <Link href="/#features" onClick={() => setIsOpen(false)} className="block font-medium text-gray-600 hover:text-blue-600">Features</Link>
          <Link href="/templates" onClick={() => setIsOpen(false)} className="block font-medium text-gray-600 hover:text-blue-600">Templates</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block font-medium text-gray-600 hover:text-blue-600">About</Link>
          <Link href="/templates" onClick={() => setIsOpen(false)} className="block">
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
              Start Building Free
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
