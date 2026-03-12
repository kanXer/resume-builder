"use client";
import { useState } from "react";
import { 
  User, GraduationCap, Plus, FileDown, Settings, 
  Briefcase, Award, Languages, Heart, Trash2, 
  MapPin, Github, Phone, Mail, Calendar, BookOpen, CheckCircle
} from "lucide-react";

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: "",
    father_name: "",
    address: "",
    phone: "",
    email: "",
    github: "",
    dob: "",
    languages: "",
    hobbies: "",
    skills: [""],
    strengths: [""],
    certifications: [""],
    education: [{ degree: "", college: "", year: "", score: "" }],
    experience: [{ company: "", role: "", duration: "", points: [""] }]
  });

  const [enabled, setEnabled] = useState({
    father_name: true,
    github: true,
    dob: true,
    languages: true,
    hobbies: true,
    skills: true,
    strengths: true,
    certifications: true,
    education: true,
    experience: true
  });

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- HANDLERS ---------------- */

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleArrayChange(field: any, index: number, value: string) {
    const updated = [...formData[field as keyof typeof formData] as string[]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  }

  function addArrayItem(field: any) {
    setFormData({ ...formData, [field]: [...formData[field as keyof typeof formData] as string[], ""] });
  }

  function removeArrayItem(field: any, index: number) {
    const updated = [...formData[field as keyof typeof formData] as string[]];
    updated.splice(index, 1);
    setFormData({ ...formData, [field]: updated });
  }

  function handleEduChange(i: number, key: string, value: string) {
    const updated = [...formData.education];
    (updated[i] as any)[key] = value;
    setFormData({ ...formData, education: updated });
  }

  function addEducation() {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: "", college: "", year: "", score: "" }]
    });
  }

  function handleExpChange(i: number, key: string, value: string) {
    const updated = [...formData.experience];
    (updated[i] as any)[key] = value;
    setFormData({ ...formData, experience: updated });
  }

  function handlePointChange(expIndex: number, pointIndex: number, value: string) {
    const updated = [...formData.experience];
    updated[expIndex].points[pointIndex] = value;
    setFormData({ ...formData, experience: updated });
  }

  function addPoint(i: number) {
    const updated = [...formData.experience];
    updated[i].points.push("");
    setFormData({ ...formData, experience: updated });
  }

  function addExperience() {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: "", role: "", duration: "", points: [""] }]
    });
  }

  async function generatePDF() {
    setLoading(true);
    let payload = { ...formData };
    
    // Agar experience empty hai toh backend ko clean data bhejein
    if (payload.experience.length === 1 && !payload.experience[0].company) {
        (payload as any).experience = [];
    }

    try {
      const res = await fetch("http://localhost:8000/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const blob = await res.blob();
      setPdfUrl(URL.createObjectURL(blob));
    } catch {
      alert("Backend start karo http://localhost:8000/generate-resume");
    }
    setLoading(false);
  }

  /* ---------------- UI STYLES ---------------- */

  const InputStyle = "w-full px-4 py-2 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-black font-medium placeholder:text-gray-400";
  const LabelStyle = "block text-sm font-bold text-gray-900 mb-1 ml-1";
  const Required = <span className="text-red-600 ml-1">*</span>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-black flex items-center gap-3">
              <Settings size={36} className="text-blue-700" /> Resume Builder
            </h1>
            <p className="text-gray-700 font-bold mt-2">Create professional resumes in minutes.</p>
          </div>
          
          <button
            onClick={generatePDF}
            disabled={loading}
            className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-xl font-black text-lg flex items-center gap-3 shadow-2xl transition-all active:scale-95 disabled:opacity-70"
          >
            {loading ? <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin" /> : <FileDown size={24} />}
            {loading ? "Generating..." : "Generate PDF"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE (Form Sections) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* PERSONAL INFO */}
            <section className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-blue-700">
              <div className="flex items-center gap-3 mb-6">
                <User size={24} className="text-blue-700 font-bold"/>
                <h2 className="text-2xl font-black text-black uppercase tracking-tight">Personal Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={LabelStyle}>Full Name {Required}</label>
                  <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Sahil Srivastava" className={InputStyle}/>
                </div>
                <div>
                  <label className={LabelStyle}>Father's Name</label>
                  <input name="father_name" value={formData.father_name} onChange={handleInputChange} placeholder="Father's Full Name" className={InputStyle}/>
                </div>
                <div>
                  <label className={LabelStyle}>Email Address {Required}</label>
                  <input name="email" value={formData.email} onChange={handleInputChange} placeholder="sahil@example.com" className={InputStyle}/>
                </div>
                <div>
                  <label className={LabelStyle}>Phone Number {Required}</label>
                  <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 0000000000" className={InputStyle}/>
                </div>
                <div>
                  <label className={LabelStyle}>Github URL</label>
                  <input name="github" value={formData.github} onChange={handleInputChange} placeholder="github.com/your-username" className={InputStyle}/>
                </div>
                <div>
                  <label className={LabelStyle}>Date of Birth</label>
                  <input name="dob" value={formData.dob} onChange={handleInputChange} placeholder="DD/MM/YYYY" className={InputStyle}/>
                </div>
                <div className="md:col-span-2">
                  <label className={LabelStyle}>Address {Required}</label>
                  <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Full Address with Pincode" className={`${InputStyle} h-24`}/>
                </div>
              </div>
            </section>

            {/* EXPERIENCE (Optional) */}
            <section className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-orange-600">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Briefcase size={24} className="text-orange-600"/>
                  <h2 className="text-2xl font-black text-black uppercase tracking-tight">Experience</h2>
                  <span className="text-[10px] bg-gray-100 text-gray-400 px-2 py-1 rounded-full font-bold">OPTIONAL</span>
                </div>
                <button onClick={addExperience} className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-black text-sm hover:bg-orange-200">+ ADD NEW</button>
              </div>
              {formData.experience.map((exp, i) => (
                <div key={i} className="mb-8 p-6 border-2 border-gray-100 rounded-xl bg-gray-50 space-y-4 relative">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input value={exp.company} placeholder="Company Name" onChange={(e) => handleExpChange(i, "company", e.target.value)} className={InputStyle}/>
                    <input value={exp.role} placeholder="Job Role" onChange={(e) => handleExpChange(i, "role", e.target.value)} className={InputStyle}/>
                    <input value={exp.duration} placeholder="Duration" onChange={(e) => handleExpChange(i, "duration", e.target.value)} className={InputStyle}/>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700">Key Responsibilities</label>
                    {exp.points.map((p, j) => (
                      <input key={j} value={p} placeholder="Describe achievement..." onChange={(e) => handlePointChange(i, j, e.target.value)} className={InputStyle}/>
                    ))}
                    <button onClick={() => addPoint(i)} className="text-blue-700 font-black text-xs uppercase tracking-widest">+ Add Point</button>
                  </div>
                </div>
              ))}
            </section>

            {/* EDUCATION */}
            <section className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-purple-700">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <GraduationCap size={24} className="text-purple-700"/>
                  <h2 className="text-2xl font-black text-black uppercase tracking-tight">Education {Required}</h2>
                </div>
                <button onClick={addEducation} className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-black text-sm hover:bg-purple-200">+ ADD NEW</button>
              </div>
              <div className="space-y-4">
                {formData.education.map((edu, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 border-2 border-gray-100 rounded-xl">
                    <input value={edu.degree} placeholder="Degree *" onChange={(e) => handleEduChange(i, "degree", e.target.value)} className={InputStyle}/>
                    <input value={edu.college} placeholder="College *" onChange={(e) => handleEduChange(i, "college", e.target.value)} className={InputStyle}/>
                    <input value={edu.year} placeholder="Year *" onChange={(e) => handleEduChange(i, "year", e.target.value)} className={InputStyle}/>
                    <input value={edu.score} placeholder="Score *" onChange={(e) => handleEduChange(i, "score", e.target.value)} className={InputStyle}/>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDE (Skills, Certs, Others) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* SKILLS */}
            <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-green-600">
              <div className="flex items-center gap-3 mb-5">
                <Settings size={22} className="text-green-600"/>
                <h3 className="font-black text-black uppercase">Skills</h3>
              </div>
              <div className="space-y-3">
                {formData.skills.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={s} onChange={(e) => handleArrayChange("skills", i, e.target.value)} placeholder="e.g. Next.js" className={InputStyle}/>
                    {formData.skills.length > 1 && (
                      <button onClick={() => removeArrayItem("skills", i)} className="text-red-600"><Trash2 size={20}/></button>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={() => addArrayItem("skills")} className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-black font-black hover:bg-gray-50 transition-all">+ ADD SKILL</button>
            </div>

            {/* CERTIFICATIONS (Naya Tab) */}
            <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-cyan-500">
              <div className="flex items-center gap-3 mb-5">
                <CheckCircle size={22} className="text-cyan-600"/>
                <h3 className="font-black text-black uppercase">Certifications</h3>
              </div>
              <div className="space-y-3">
                {formData.certifications.map((cert, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={cert} onChange={(e) => handleArrayChange("certifications", i, e.target.value)} placeholder="e.g. AWS Certified" className={InputStyle}/>
                    {formData.certifications.length > 1 && (
                      <button onClick={() => removeArrayItem("certifications", i)} className="text-red-500"><Trash2 size={18}/></button>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={() => addArrayItem("certifications")} className="mt-4 w-full py-2 bg-cyan-50 text-cyan-700 rounded-lg font-bold text-xs uppercase hover:bg-cyan-100 transition-all">+ Add Certification</button>
            </div>

            {/* STRENGTHS */}
            <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-yellow-500">
              <div className="flex items-center gap-3 mb-5">
                <Award size={22} className="text-yellow-600"/>
                <h3 className="font-black text-black uppercase">Strengths</h3>
              </div>
              {formData.strengths.map((s, i) => (
                <div key={i} className="mb-2">
                  <input value={s} onChange={(e) => handleArrayChange("strengths", i, e.target.value)} placeholder="e.g. Team Leadership" className={InputStyle}/>
                </div>
              ))}
              <button onClick={() => addArrayItem("strengths")} className="text-blue-700 font-black text-xs mt-2 uppercase tracking-tighter">+ Add more</button>
            </div>

            {/* LANGUAGES & HOBBIES */}
            <div className="bg-black p-8 rounded-3xl shadow-2xl text-white">
              <h3 className="font-black text-xl mb-6 flex items-center gap-2 border-b border-gray-800 pb-2">
                <Plus size={24} className="text-blue-500"/> OTHERS
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[2px]">Languages</label>
                  <input name="languages" value={formData.languages} onChange={handleInputChange} placeholder="Hindi, English" className="w-full bg-gray-900 border border-gray-700 rounded-lg mt-2 py-3 px-4 text-white font-bold outline-none focus:border-blue-500"/>
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[2px]">Hobbies</label>
                  <input name="hobbies" value={formData.hobbies} onChange={handleInputChange} placeholder="Coding, Music" className="w-full bg-gray-900 border border-gray-700 rounded-lg mt-2 py-3 px-4 text-white font-bold outline-none focus:border-blue-500"/>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* PDF PREVIEW AREA */}
{/* PDF PREVIEW MODAL (POPUP) */}
        {/* --- PROGRESS LOADER OVERLAY --- */}
        {loading && (
          <div className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-[40px] p-12 max-w-sm w-full shadow-2xl text-center border-b-8 border-blue-700 animate-in zoom-in-95 duration-300">
              <div className="relative w-28 h-28 mx-auto mb-8">
                <div className="absolute inset-0 border-[10px] border-gray-100 rounded-full"></div>
                <div className="absolute inset-0 border-[10px] border-blue-700 rounded-full border-t-transparent animate-spin"></div>
                <Settings className="absolute inset-0 m-auto text-blue-700 animate-pulse" size={40} />
              </div>
              <h2 className="text-3xl font-black text-black mb-2 italic tracking-tighter uppercase">Crafting...</h2>
              <p className="text-gray-500 font-bold text-[10px] tracking-[4px] mb-8 uppercase">AI is building your resume</p>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden shadow-inner">
                <div className="bg-blue-700 h-full animate-loader-run"></div>
              </div>
            </div>
          </div>
        )}

        {/* --- PDF PREVIEW MODAL --- */}
        {pdfUrl && !loading && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-5xl h-[92vh] rounded-[30px] shadow-2xl flex flex-col overflow-hidden border-4 border-gray-200">
              <div className="p-6 border-b-2 border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50">
                <div>
                  <h2 className="text-2xl font-black text-black tracking-tight flex items-center gap-2">
                    <CheckCircle className="text-green-600" /> PREVIEW READY
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setPdfUrl(null)} className="px-5 py-2.5 text-gray-500 font-black uppercase text-xs hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">Close</button>
                  <a href={pdfUrl} download="Resume.pdf" className="bg-blue-700 hover:bg-black text-white px-8 py-3 rounded-xl font-black text-sm shadow-lg flex items-center gap-2 transition-all active:scale-95">
                    <FileDown size={18} /> DOWNLOAD PDF
                  </a>
                </div>
              </div>
              <div className="flex-1 bg-gray-200">
                <iframe src={`${pdfUrl}#toolbar=0`} className="w-full h-full border-none" title="Resume Preview" />
              </div>
            </div>
          </div>
        )}

      </div>

      <style jsx global>{`
        @keyframes loader-run {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-loader-run {
          animation: loader-run 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}