import React from 'react';
import Link from 'next/link';
import { FileText, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-12 md:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Grid Section - Mobile par 2 columns, Desktop par 4 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-12">
          
          {/* Brand Section - Mobile par full width le lega (col-span-2) */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <FileText className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Make <span className="text-blue-600">Your Resume</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Next-gen resume builder, Gemini AI ki accuracy ke saath.
            </p>
            <div className="flex gap-5">
              <a href="https://x.com/itsSrivastava_" className="text-gray-400 hover:text-blue-600 transition"><Twitter size={20} /></a>
              <a href="https://www.linkedin.com/in/kanxer/" className="text-gray-400 hover:text-blue-600 transition"><Linkedin size={20} /></a>
              <a href="https://github.com/kanXer" target="_blank" className="text-gray-400 hover:text-gray-900 transition"><Github size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-bold text-gray-900 mb-5">Product</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/builder" className="hover:text-blue-600 transition">Resume Builder</Link></li>
              <li><Link href="/templates" className="hover:text-blue-600 transition">AI Templates</Link></li>
              <li><Link href="/checker" className="hover:text-blue-600 transition">ATS Checker</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-600 transition">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="font-bold text-gray-900 mb-5">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/blog" className="hover:text-blue-600 transition">Career Blog</Link></li>
              <li><Link href="/guide" className="hover:text-blue-600 transition">Resume Guide</Link></li>
              <li><Link href="/tips" className="hover:text-blue-600 transition">Interview Tips</Link></li>
              <li><Link href="/support" className="hover:text-blue-600 transition">Support</Link></li>
            </ul>
          </div>

          {/* Newsletter Section - Mobile par full width */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold text-gray-900 mb-5 text-left">Stay Updated</h4>
            <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
              <Mail size={16} className="shrink-0" /> user.kanxer@gmail.com
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              />
              <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-md shadow-blue-100 active:scale-95">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          <p className="text-xs md:text-sm text-gray-400 text-center md:text-left leading-relaxed">
            © {currentYear} AI Resume Builder. All rights reserved. <br className="md:hidden" /> Made with ❤️ for job seekers.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs md:text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-gray-600 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-600 transition">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-gray-600 transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );

}
