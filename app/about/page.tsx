import Link from 'next/link';
import { ShieldCheck, Zap, Cpu, FileText, Github, Linkedin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Hero Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Making Document Management <span className="text-blue-600">Simpler.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            PDFTools is a robust suite of web utilities designed to handle your daily document tasks 
            with precision and speed. Built with modern technology, we ensure your files are 
            processed securely and efficiently.
          </p>
        </div>
      </section>

      {/* Core Values / Features */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Privacy First</h3>
            <p className="text-gray-600">
              Humari priority aapki privacy hai. Files server par sirf processing ke liye rehti hain 
              aur task khatam hote hi delete ho jati hain.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-6">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
            <p className="text-gray-600">
              Next.js aur optimized backend APIs ka use karke hum compression aur conversion ko 
              palkein jhapakte hi poora karte hain.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
              <Cpu size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Integration</h3>
            <p className="text-gray-600">
              Gemini AI ka use karke hum smart resume building aur document analysis jaise features 
              par kaam kar rahe hain.
            </p>
          </div>
        </div>
      </section>

      {/* The Story / Author Section */}
      <section className="py-20 px-6 bg-blue-600 text-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6">The Vision Behind PDFTools</h2>
            <p className="text-blue-100 text-lg mb-6 leading-relaxed">
              Mera mission document handling ko "Shahi Style" (Royalty) accuracy ke sath simple banana hai. 
              Chahe woh PDF compress karna ho ya AI-powered ATS friendly resume banana, PDFTools 
              har step par productivity badhane ke liye banaya gaya hai.
            </p>
            <div className="flex gap-4">
              <Link href="https://github.com/KanXer" className="p-2 bg-blue-700 rounded-full hover:bg-blue-800 transition">
                <Github size={20} />
              </Link>
              <Link href="#" className="p-2 bg-blue-700 rounded-full hover:bg-blue-800 transition">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-blue-500/30 p-8 rounded-xl backdrop-blur-sm text-center">
              <div className="text-4xl font-bold">100%</div>
              <div className="text-blue-100 text-sm mt-1 italic uppercase tracking-wider text-xs">Free to Use</div>
            </div>
            <div className="bg-blue-500/30 p-8 rounded-xl backdrop-blur-sm text-center">
              <div className="text-4xl font-bold">No Ads</div>
              <div className="text-blue-100 text-sm mt-1 italic uppercase tracking-wider text-xs">Clean Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center text-gray-500 text-sm">
        <p>© 2026 PDFTools. Crafted with passion by Sahil Srivastava.</p>
      </footer>
    </div>
  );
}