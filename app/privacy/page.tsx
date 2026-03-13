import Link from 'next/link';
import { ShieldAlert, EyeOff, Trash2, Lock, ArrowLeft, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Hero Section */}
      <header className="py-16 px-6 bg-slate-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6">
            <ShieldAlert size={32} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Hum jaante hain ki aapke documents sensitive hote hain. Isliye PDFTools par humari policy 
            ekdum simple aur transparent hai: **Aapki files, sirf aapki hain.**
          </p>
        </div>
      </header>

      {/* Policy Content */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="space-y-16">
          
          {/* Policy Item 1 */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0">
              <EyeOff size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">No File Storage</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Jab aap koi PDF upload karte hain, toh hum use temporary folder mein rakhte hain sirf processing ke liye. 
                Hum aapki files ko permanent store nahi karte.
              </p>
              <div className="p-4 bg-slate-50 border-l-4 border-blue-600 italic text-gray-700">
                "Task poora hote hi ya session khatam hote hi, file system se file delete ho jati hai."
              </div>
            </div>
          </div>

          {/* Policy Item 2 */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">
              <Trash2 size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Automatic Deletion</h2>
              <p className="text-gray-600 leading-relaxed">
                Hamare server par ek automated script chalti hai jo har **1 ghante** mein purani processed files ko 
                humesha ke liye remove kar deti hai. Iska matlab hai ki agar aap download karna bhool bhi gaye, 
                toh bhi aapka data safe hai.
              </p>
            </div>
          </div>

          {/* Policy Item 3 */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
              <Lock size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Secure Processing</h2>
              <p className="text-gray-600 leading-relaxed">
                Aapki files encrypted tunnel (HTTPS) ke through transfer hoti hain. Processing ke waqt 
                koi bhi human aapka data nahi dekh sakta. Hum Gemini AI ka use tabhi karte hain jab aap 
                explicitly Resume Builder ya Analysis tool use karte hain.
              </p>
            </div>
          </div>

        </div>

        {/* Contact Info */}
        <div className="mt-20 p-10 bg-blue-600 rounded-3xl text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Sawalat hain?</h3>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">
            Agar aapko humari privacy handling ke baare mein kuch bhi puchna hai, toh aap directly mujhse contact kar sakte hain.
          </p>
          <Link 
            href="/contact" 
            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition shadow-lg inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-gray-100 text-center text-gray-500 text-sm">
        <p>© 2026 PDFTools • Last Updated: March 2026</p>
      </footer>
    </div>
  );
}