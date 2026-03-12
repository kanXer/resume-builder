import React from 'react';
import Link from 'next/link';
import { FileText, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <FileText className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Make<span className="text-blue-600">Your Resume</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Next-gen resume builder, Gemini AI ki accuracy ke saath.
            </p>
            <div className="flex gap-4">
              <a href="/notfound" className="text-gray-400 hover:text-blue-600 transition"><Twitter size={20} /></a>
              <a href="/notfound" className="text-gray-400 hover:text-blue-600 transition"><Linkedin size={20} /></a>
              <a href="https://github.com/kanXer" className="text-gray-400 hover:text-gray-900 transition"><Github size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/builder" className="hover:text-blue-600 transition">Resume Builder</Link></li>
              <li><Link href="/not-found" className="hover:text-blue-600 transition">AI Templates</Link></li>
              <li><Link href="/not-found" className="hover:text-blue-600 transition">ATS Checker</Link></li>
              <li><Link href="/not-found" className="hover:text-blue-600 transition">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/not-found" className="hover:text-blue-600 transition">Career Blog</Link></li>
              <li><Link href="/not-found" className="hover:text-blue-600 transition">How to Write a Resume</Link></li>
              <li><Link href="/not-found" className="hover:text-blue-600 transition">Interview Tips</Link></li>
              <li><Link href="/not-found" className="hover:text-blue-600 transition">Support Center</Link></li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Contact Us</h4>
            <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
              <Mail size={16} /> user.kanxer@gmail.com
            </p>
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Subscribe to Newsletter</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                  Join
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} AI Resume Builder. All rights reserved. Made with ❤️ for job seekers.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="/not-found" className="hover:text-gray-600 transition">Privacy Policy</a>
            <a href="/not-found" className="hover:text-gray-600 transition">Terms of Service</a>
            <a href="/not-found" className="hover:text-gray-600 transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}