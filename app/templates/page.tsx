"use client";
import { useState, useEffect } from "react";
import { ArrowRight, X, Loader2, Sparkles, Zap, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function TemplatesPage() {
  const router = useRouter();
  const [allTemplates, setAllTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false); 
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);

  useEffect(() => {
    async function loadTemplates() {
      try {
        const response = await fetch("/api/templates");
        const data = await response.json();
        setAllTemplates(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load templates", err);
      } finally {
        setLoading(false);
      }
    }
    loadTemplates();
  }, []);

  const handleSelectAndBuild = (templateId: string) => {
    setIsNavigating(true);
    setTimeout(() => router.push(`/builder?template=${templateId}`), 600);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfd]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-t-2 border-blue-600 rounded-full animate-spin"></div>
          <Sparkles className="absolute inset-0 m-auto text-blue-600 animate-pulse" size={24} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-900 py-12 md:py-20 px-4 md:px-6 relative selection:bg-blue-100">
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-16 md:mb-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm"
          >
            <Zap size={12} fill="currentColor" /> Premium Collection
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black tracking-tighter italic uppercase leading-[0.9] mb-6 text-slate-900"
          >
            Choose Your <span className="text-blue-600">Template</span>
          </motion.h1>
          <p className="text-slate-500 font-bold max-w-lg mx-auto text-[10px] md:text-xs uppercase tracking-[0.2em] leading-relaxed opacity-70">
            Selected Layouts • Built for the top 1% <br/>Choose your blueprint.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {allTemplates.map((t, index) => (
            <motion.div 
              key={t._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setPreviewTemplate(t)}
              className="group relative cursor-pointer"
            >
              <div className="relative bg-white border border-slate-100 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden transition-all duration-700 group-hover:border-blue-200 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]">
                <div className="relative aspect-[4/5] overflow-hidden p-3 md:p-4">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover rounded-[1.8rem] md:rounded-[2rem] transition-all duration-1000 group-hover:scale-105" />
                  {index === 0 && (
                    <div className="absolute top-8 left-8">
                      <div className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-black text-[8px] md:text-[9px] uppercase tracking-widest shadow-xl flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span> Hot
                      </div>
                    </div>
                  )}
                </div>
                <div className="px-8 pb-8 pt-2 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-slate-900">{t.name}</h3>
                    <p className="text-blue-600 text-[9px] font-black uppercase tracking-[0.2em]">{t.tag || "Standard"}</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {previewTemplate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !isNavigating && setPreviewTemplate(null)} 
              className="absolute inset-0 bg-white/90 backdrop-blur-xl"
            />
            
            <motion.div 
              layoutId={previewTemplate.id}
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative bg-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-[3rem] overflow-y-auto md:overflow-hidden border border-slate-100 shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button - Sticky on Mobile */}
              <button 
                onClick={() => setPreviewTemplate(null)} 
                className="fixed md:absolute top-6 right-6 z-[120] w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-md md:bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all border border-slate-100 shadow-sm"
              >
                <X size={18} />
              </button>

              {/* Left Column: Image */}
              <div className="w-full md:w-1/2 bg-[#f8fafc] p-8 md:p-12 flex items-center justify-center">
                <img src={previewTemplate.image} className="w-full max-w-[280px] md:max-w-full rounded-xl shadow-lg md:shadow-2xl" />
              </div>

              {/* Right Column: Content */}
              <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
                <div className="space-y-6 md:space-y-8">
                  <header>
                    <div className="text-blue-600 text-[9px] font-black uppercase tracking-[0.3em] mb-3">Blueprint Specs</div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase italic tracking-tighter leading-[0.9] mb-4 text-slate-900 pr-12 md:pr-0 break-words">
                      {previewTemplate.name}
                    </h2>
                    <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
                      {previewTemplate.description}
                    </p>
                  </header>

                  <div className="grid grid-cols-1 gap-3">
                    {previewTemplate.features?.slice(0, 4).map((f: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 text-[11px] md:text-xs font-bold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100/50">
                        <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    disabled={isNavigating}
                    onClick={() => handleSelectAndBuild(previewTemplate.id)}
                    className={`group w-full py-5 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-base md:text-lg transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95
                      ${isNavigating ? 'bg-slate-100 text-slate-400' : 'bg-slate-900 text-white hover:bg-blue-600'}`}
                  >
                    {isNavigating ? <Loader2 className="animate-spin" size={20} /> : (
                      <>
                        <span className="uppercase tracking-tight italic">Start Building</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}