import Link from 'next/link';
import { Scale, AlertCircle, Ban, CheckCircle, ArrowLeft, FileText, HelpCircle } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Hero Section */}
      <header className="py-16 px-6 bg-slate-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6">
            <Scale size={32} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            PDFTools use karne ke liye kuch basic rules aur guidelines. Humne ise simple rakha hai 
            taaki aap bina kisi uljhan ke hamari services ka fayda utha sakein.
          </p>
        </div>
      </header>

      {/* Terms Content */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="grid gap-12">
          
          {/* Section 1: Usage */}
          <div className="flex gap-6">
            <div className="hidden sm:flex w-10 h-10 bg-blue-50 text-blue-600 rounded-full items-center justify-center shrink-0 font-bold">1</div>
            <div>
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <CheckCircle size={24} className="text-blue-600" /> Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                PDFTools ka istemal karke aap hamari terms se agree karte hain. Yeh platform individual aur 
                professional use ke liye bilkul free hai. Hum bina kisi notice ke in terms ko update kar sakte hain.
              </p>
            </div>
          </div>

          {/* Section 2: Proper Use */}
          <div className="flex gap-6">
            <div className="hidden sm:flex w-10 h-10 bg-amber-50 text-amber-600 rounded-full items-center justify-center shrink-0 font-bold">2</div>
            <div>
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <Ban size={24} className="text-amber-600" /> Prohibited Activities
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Aap is tool ka galat istemal nahi karenge. Niche di gayi chizein strictly mana hain:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>System ko hack karne ki koshish ya APIs ka galat use.</li>
                <li>Illegal, harmful ya copyright protected content ka processing.</li>
                <li>Automated scripts ke zariye server par load dalna.</li>
              </ul>
            </div>
          </div>

          {/* Section 3: Disclaimer */}
          <div className="flex gap-6">
            <div className="hidden sm:flex w-10 h-10 bg-red-50 text-red-600 rounded-full items-center justify-center shrink-0 font-bold">3</div>
            <div>
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <AlertCircle size={24} className="text-red-600" /> Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Hum best quality service dene ki koshish karte hain, lekin PDFTools "As Is" basis par provide kiya jata hai. 
                Document processing ke waqt kisi bhi tarah ke data loss ya error ke liye hum zimmedar nahi honge. 
                Humesha apni important files ka backup rakhein.
              </p>
            </div>
          </div>

          {/* Section 4: AI Content */}
          <div className="flex gap-6">
            <div className="hidden sm:flex w-10 h-10 bg-purple-50 text-purple-600 rounded-full items-center justify-center shrink-0 font-bold">4</div>
            <div>
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <HelpCircle size={24} className="text-purple-600" /> AI-Generated Content
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Resume Builder mein Gemini AI dwara generate kiya gaya content ek suggestion hai. 
                Iski accuracy check karna aapki zimmedari hai. AI kabhi kabhi galat facts de sakta hai, 
                isliye download karne se pehle ise review zaroor karein.
              </p>
            </div>
          </div>

        </div>

        {/* Support CTA */}
        <div className="mt-20 border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Koi doubt hai?</h3>
          <p className="text-gray-500 mb-6">Agar kisi term ko samajhne mein dikkat ho rahi hai toh humse sampark karein.</p>
          <Link 
            href="/contact" 
            className="text-blue-600 font-bold hover:underline"
          >
            Support →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center text-gray-500 text-sm">
        <p>© 2026 PDFTools • Sahil Srivastava Project</p>
      </footer>
    </div>
  );
}