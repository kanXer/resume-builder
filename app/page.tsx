import React from 'react';
import Link from 'next/link';
import { Sparkles, FileText, Zap, ShieldCheck } from 'lucide-react';

// 1. Props interface define karein
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* --- Hero Section --- */}
      <section className="max-w-7xl mx-auto px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          <Sparkles size={16} />
          <span>Powered by Gemini AI</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Win your dream job with <br />
          <span className="text-blue-600">AI-powered</span> resumes.
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Humara AI aapke skills ko analyse karke perfect ATS-friendly objectives likhta hai. 
          Bas details daalo aur resume ready!
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/builder">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all w-full md:w-auto">
              Create with Simple Template Now
            </button>
          </Link>
          <Link href="/templates">
            <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-50 transition w-full md:w-auto">
              View Templates
            </button>
          </Link>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-16 italic">Smart Features for Modern Candidates</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<Zap className="text-yellow-500" />}
              title="Instant AI Generation"
              desc="Skills enter karo aur AI se professional objective paao sirf seconds mein."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-green-500" />}
              title="ATS-Friendly"
              desc="Aise keywords jo Applicant Tracking Systems ko pass karne mein madad karein."
            />
            <FeatureCard 
              icon={<FileText className="text-blue-500" />}
              title="Clean Export"
              desc="Bina kisi jhanjhat ke apna resume PDF format mein download karein."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// 2. Component with types
function FeatureCard({ icon, title, desc }: FeatureProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}