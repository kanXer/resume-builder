"use client";
import { useState, useEffect } from "react";
import { CheckCircle, ArrowRight, Star, Zap, Shield, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const allTemplates = [
  { id: "template1", name: "Simple", color: "bg-blue-600", tag: "Popular", icon: <Zap size={16} />, image: "/template1.jpg" },
  { id: "template2", name: "Modern", color: "bg-gray-800", tag: "Senior", icon: <Shield size={16} />, image: "/template2.jpg" },
  { id: "template3", name: "Minimalist", color: "bg-purple-600", tag: "Designer", icon: <Sparkles size={16} />, image: "/template3.jpg" },
  { id: "template4", name: "Creative", color: "bg-amber-600", tag: "Premium", icon: <Star size={16} />, image: "/template4.jpg" },
  { id: "template5", name: "Executive", color: "bg-emerald-600", tag: "New", icon: <Zap size={16} />, image: "/template5.jpg" },
  { id: "template6", name: "Professional", color: "bg-emerald-600", tag: "New", icon: <Zap size={16} />, image: "/template7.jpg" },
  // Aap yahan aur 8-10 templates add kar sakte hain test karne ke liye
];

export default function TemplatesPage() {
  const [selected, setSelected] = useState("template1");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Default PC ke liye 8

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(4); // Mobile par 4
      } else {
        setItemsPerPage(8); // PC par 8
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(allTemplates.length / itemsPerPage);
  
  // Current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTemplates = allTemplates.slice(indexOfFirstItem, indexOfLastItem);

  // Page change hone par top par scroll karne ke liye
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-black text-black mb-3 italic uppercase tracking-tighter">
          Choose <span className="text-blue-700">Template</span>
        </h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] md:text-sm">
          Select an A4-optimized layout to start building.
        </p>
        <p className="inline-flex items-center content-center  gap-1 text-red-600 bg-red-50 px-2 py-0.5 rounded md:rounded-md font-bold uppercase tracking-widest text-[9px] md:text-[11px] border border-red-100">
          <span className="text-[12px]">⚠️</span> Simple Template is selected by default
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10 mb-12">
        {currentTemplates.map((t) => (
          <div 
            key={t.id}
            onClick={() => setSelected(t.id)}
            className={`group cursor-pointer bg-white rounded-2xl md:rounded-3xl overflow-hidden border-2 md:border-4 transition-all duration-500 shadow-lg md:shadow-2xl relative
              ${selected === t.id ? 'border-blue-600 scale-[1.02] md:scale-105 shadow-blue-100' : 'border-transparent hover:border-gray-200'}`}
          >
            <div className={`relative aspect-[1/1.41] w-full ${t.color} overflow-hidden border-b`}>
              <img src={t.image} alt={t.name} className="absolute inset-0 w-full h-full object-cover object-top" />
              {selected === t.id && (
                <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-blue-600 text-white p-1 md:p-2 rounded-full z-20 shadow-xl">
                  <CheckCircle size={18} className="md:w-6 md:h-6" />
                </div>
              )}
            </div>
            <div className="p-3 md:p-5 bg-white">
              <div className="flex items-center gap-2 mb-1 md:mb-3">
                <div className={`p-1 md:p-2 rounded md:rounded-lg text-white ${t.color}`}>{t.icon}</div>
                <span className="text-[8px] md:text-[10px] font-black text-blue-700 uppercase tracking-tighter">{t.tag}</span>
              </div>
              <h3 className="text-sm md:text-lg font-black text-black truncate">{t.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination UI - Only shows if more than 1 page exists */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mb-12">
          <button 
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className="p-2 rounded-full bg-white border shadow-sm disabled:opacity-30 hover:bg-gray-100 transition-all active:scale-90"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`h-2.5 rounded-full transition-all duration-300 ${currentPage === i + 1 ? 'w-8 bg-blue-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className="p-2 rounded-full bg-white border shadow-sm disabled:opacity-30 hover:bg-gray-100 transition-all active:scale-90"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      <div className="flex justify-center">
        <Link 
          href={`/builder?template=${selected}`}
          className="bg-black hover:bg-blue-700 text-white w-full md:w-auto md:px-20 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-lg md:text-xl flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-95 group"
        >
          Customize Template <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  );

}
