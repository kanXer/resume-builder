"use client";
import { useState } from "react";
import { Layout, CheckCircle, ArrowRight, Star, Zap, Shield, Sparkles, MousePointer2 } from "lucide-react";
import Link from "next/link";

const allTemplates = [
  { 
    id: "template1", 
    name: "Modern Professional", 
    color: "bg-blue-600", 
    description: "Clean, ATS-friendly design for corporate jobs.",
    tag: "Most Popular",
    icon: <Zap size={18} />,
    image: "/template1.jpg" 
  },
  { 
    id: "template2", 
    name: "Minimalist Slate", 
    color: "bg-gray-800", 
    description: "Simple and elegant layout for experienced pros.",
    tag: "Best for Senior Roles",
    icon: <Shield size={18} />,
    image: "/template2.jpg"
  },
  // { 
  //   id: "template3", 
  //   name: "Creative Bold", 
  //   color: "bg-purple-600", 
  //   description: "Stand out with vibrant colors and unique typography.",
  //   tag: "Designer Choice",
  //   icon: <Sparkles size={18} />,
  //   image: "/template3.jpg"
  // },
  // { 
  //   id: "template4", 
  //   name: "Executive Gold", 
  //   color: "bg-amber-600", 
  //   description: "Premium feel for leadership and management roles.",
  //   tag: "Premium",
  //   icon: <Star size={18} />,
  //   image: "/template4.jpg"
  // },
];

export default function TemplatesPage() {
  const [selected, setSelected] = useState("template1");

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-black text-black mb-4 italic uppercase tracking-tighter">
          Choose Your <span className="text-blue-700">Template</span>
        </h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
          Select an A4-optimized template to start building.
        </p>
      </div>
      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
        {allTemplates.map((t) => (
          <div 
            key={t.id}
            onClick={() => setSelected(t.id)}
            className={`group cursor-pointer bg-white rounded-3xl overflow-hidden border-4 transition-all duration-500 shadow-2xl relative
              ${selected === t.id ? 'border-blue-600 scale-105 shadow-blue-200' : 'border-transparent hover:border-gray-200'}`}
          >
            {/* A4 PAPER PREVIEW AREA (Aspect Ratio 1/1.41) */}
            <div className={`relative aspect-[1/1.41] w-full ${t.color} overflow-hidden border-b`}>
              
              {/* The Actual Template Image (A4 Look) */}
              <img 
                src={t.image} 
                alt={t.name}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />

              {/* Selection Badge */}
              {selected === t.id && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-full z-20 animate-in zoom-in-50 shadow-xl">
                  <CheckCircle size={24} />
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300"></div>
              
              {/* Paper Texture Overlay (Optional for realistic look) */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
            </div>

            {/* Info Area */}
            <div className="p-5 bg-white">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg text-white shadow-md ${t.color}`}>
                  {t.icon}
                </div>
                <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">{t.tag}</span>
              </div>

              <h3 className="text-lg font-black text-black mb-1 truncate">{t.name}</h3>
              <p className="text-gray-500 text-xs font-semibold line-clamp-2">
                {t.description}
              </p>
            </div>

            {/* Selected Indicator Bar */}
            <div className={`absolute bottom-0 left-0 h-2 bg-blue-600 transition-all duration-500
              ${selected === t.id ? 'w-full' : 'w-0'}`}></div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="flex flex-col items-center gap-6">
        <Link 
          href={`/builder?template=${selected}`}
          className="bg-black hover:bg-blue-700 text-white px-16 py-5 rounded-2xl font-black text-xl flex items-center gap-3 shadow-2xl transition-all active:scale-95 group"
        >
          Customize This Template <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  );
}