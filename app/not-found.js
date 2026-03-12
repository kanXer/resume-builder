"use client";
import { useState, useEffect } from 'react';
import { Rocket, Bell, Github, Twitter, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown Logic (Set your launch date here)
  useEffect(() => {
    const launchDate = new Date("2026-05-01T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden font-sans">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse"></div>

      <div className="max-w-4xl w-full text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-8 tracking-widest uppercase">
          <Rocket size={14} />
          <span>Under Construction</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-tight">
          Make<span className="text-blue-500">Your Resume</span> <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-purple-500">
            Is Launching Soon
          </span>
        </h1>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-4 md:gap-8 mb-12">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="flex flex-col items-center">
              <div className="text-3xl md:text-5xl font-mono font-bold bg-white/5 border border-white/10 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-2xl backdrop-blur-sm">
                {String(value).padStart(2, '0')}
              </div>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] mt-3 text-gray-500 font-bold">{label}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-md mx-auto">
          <form onSubmit={(e) => e.preventDefault()} className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl focus-within:border-blue-500/50 transition-all">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-transparent px-4 outline-none text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl font-bold transition-all flex items-center gap-2 active:scale-95 group">
              Join Waitlist
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          <p className="mt-6 text-sm text-gray-400">
            Aapka page abhi taiyar nahi hai, lekin hamara launch kareeb hai.
          </p>
        </div>
      </div>

      {/* Socials */}
      <footer className="absolute bottom-10 flex gap-8 text-gray-500">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <a href="#" className="hover:text-blue-400 transition-colors"><Github size={20} /></a>
        <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
      </footer>
    </div>
  );

}

