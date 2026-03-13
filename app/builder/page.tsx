"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  User, GraduationCap, Plus, FileDown, Settings, 
  Briefcase, Award, Languages, Trash2, 
  Github, CheckCircle, Smartphone, MapPin, Mail, Calendar
} from "lucide-react";

function ResumeBuilderContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "template1";

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

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- HANDLERS ---------------- */

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field: "skills" | "strengths" | "certifications", index: number, value: string) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const addArrayItem = (field: "skills" | "strengths" | "certifications") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayItem = (field: "skills" | "strengths" | "certifications", index: number) => {
    const updated = [...formData[field]];
    updated.splice(index, 1);
    setFormData({ ...formData, [field]: updated });
  };

  const handleEduChange = (i: number, key: string, value: string) => {
    const updated = [...formData.education];
    (updated[i] as any)[key] = value;
    setFormData({ ...formData, education: updated });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: "", college: "", year: "", score: "" }]
    });
  };

  const removeEducation = (index: number) => {
    const updated = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updated });
  };

  const handleExpChange = (i: number, key: string, value: string) => {
    const updated = [...formData.experience];
    (updated[i] as any)[key] = value;
    setFormData({ ...formData, experience: updated });
  };

  const handlePointChange = (expIndex: number, pointIndex: number, value: string) => {
    const updated = [...formData.experience];
    updated[expIndex].points[pointIndex] = value;
    setFormData({ ...formData, experience: updated });
  };

  const addPoint = (i: number) => {
    const updated = [...formData.experience];
    updated[i].points.push("");
    setFormData({ ...formData, experience: updated });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: "", role: "", duration: "", points: [""] }]
    });
  };

  const removeExperience = (index: number) => {
    const updated = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updated });
  };

  async function generatePDF() {
    setLoading(true);
    let payload = { ...formData, template: templateId };
    
    if (payload.experience.length === 1 && !payload.experience[0].company) {
        payload.experience = [];
    }

    try {
      const res = await fetch("https://resume-builder-api-5isu.onrender.com/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const blob = await res.blob();
      setPdfUrl(URL.createObjectURL(blob));
    } catch {
      alert("Backend error! Please check if your server is running.");
    }
    setLoading(false);
  }

  /* ---------------- UI STYLES ---------------- */
  const InputStyle = "w-full px-4 py-2 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-black font-medium placeholder:text-gray-400";
  const LabelStyle = "flex items-center gap-1 text-sm font-bold text-gray-900 mb-1 ml-1";
  const Required = <span className="text-red-600">*</span>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8 font-sans pb-24">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER (Button removed from here) --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-black flex items-center gap-3">
              <Settings size={36} className="text-blue-700 animate-spin-slow" /> Resume Builder
            </h1>
            <p className="text-gray-700 font-bold mt-2">Selected Style: <span className="text-blue-700 uppercase px-3 py-1 bg-blue-50 rounded-lg border border-blue-200">{templateId}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-blue-700">
              <div className="flex items-center gap-3 mb-6">
                <User size={24} className="text-blue-700 font-bold"/>
                <h2 className="text-2xl font-black text-black uppercase tracking-tight">Personal Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={LabelStyle}><User size={14}/> Full Name {Required}</label>
                  <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Sahil Srivastava" className={InputStyle}/>
                </div>
                <div>
                  <label className={LabelStyle}>Father's Name</label>
                  <input name="father_name" value={formData.father_name} onChange={handleInputChange} placeholder="Father's Name" className={InputStyle}/>
                </div>
                <div>
                  <label className={LabelStyle}><Mail size={14}/> Email {Required}</label>
                  <input name="email" value={formData.email} onChange={handleInputChange} placeholder="sahil@example.com" className={InputStyle}/>
                </div>
                <div>
                  <label className={LabelStyle}><Smartphone size={14}/> Phone {Required}</label>
                  <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91..." className={InputStyle}/>
                </div>
                <div>
                  <label className={LabelStyle}><Github size={14}/> GitHub URL</label>
                  <input name="github" value={formData.github} onChange={handleInputChange} placeholder="github.com/yourprofile" className={InputStyle}/>
                </div>
                <div>
                  <label className={LabelStyle}><Calendar size={14}/> Date of Birth</label>
                  <input name="dob" value={formData.dob} onChange={handleInputChange} placeholder="DD/MM/YYYY" className={InputStyle}/>
                </div>
                <div className="md:col-span-2">
                  <label className={LabelStyle}><MapPin size={14}/> Address {Required}</label>
                  <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Your full address..." className={`${InputStyle} h-20`}/>
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-orange-600">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Briefcase size={24} className="text-orange-600"/>
                  <h2 className="text-2xl font-black text-black uppercase">Experience</h2>
                </div>
                <button onClick={addExperience} className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-black text-sm hover:bg-orange-200 transition-colors">+ ADD JOB</button>
              </div>
              {formData.experience.map((exp, i) => (
                <div key={i} className="mb-6 p-6 border-2 border-gray-100 rounded-xl bg-gray-50 relative group">
                  <button onClick={() => removeExperience(i)} className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={20}/></button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input value={exp.company} placeholder="Company" onChange={(e) => handleExpChange(i, "company", e.target.value)} className={InputStyle}/>
                    <input value={exp.role} placeholder="Role" onChange={(e) => handleExpChange(i, "role", e.target.value)} className={InputStyle}/>
                    <input value={exp.duration} placeholder="Duration" onChange={(e) => handleExpChange(i, "duration", e.target.value)} className={InputStyle}/>
                  </div>
                  <div className="space-y-2">
                    {exp.points.map((p, j) => (
                      <input key={j} value={p} placeholder="Key achievement..." onChange={(e) => handlePointChange(i, j, e.target.value)} className={`${InputStyle} text-sm`}/>
                    ))}
                    <button onClick={() => addPoint(i)} className="text-blue-700 font-black text-xs uppercase mt-1 hover:underline">+ Add Point</button>
                  </div>
                </div>
              ))}
            </section>

            <section className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-purple-700">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <GraduationCap size={24} className="text-purple-700"/>
                  <h2 className="text-2xl font-black text-black uppercase">Education</h2>
                </div>
                <button onClick={addEducation} className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-black text-sm hover:bg-purple-200 transition-colors">+ ADD EDU</button>
              </div>
              {formData.education.map((edu, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4 p-5 border-2 border-gray-50 rounded-xl relative">
                  <input value={edu.degree} placeholder="Degree" onChange={(e) => handleEduChange(i, "degree", e.target.value)} className={`${InputStyle} md:col-span-2`}/>
                  <input value={edu.college} placeholder="College" onChange={(e) => handleEduChange(i, "college", e.target.value)} className={InputStyle}/>
                  <input value={edu.year} placeholder="Year" onChange={(e) => handleEduChange(i, "year", e.target.value)} className={InputStyle}/>
                  <div className="flex items-center gap-2">
                    <input value={edu.score} placeholder="%" onChange={(e) => handleEduChange(i, "score", e.target.value)} className={InputStyle}/>
                    <button onClick={() => removeEducation(i)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-green-600">
              <h3 className="font-black text-black uppercase mb-4 flex items-center gap-2"><Settings size={20} className="text-green-600"/> Skills</h3>
              <div className="space-y-2">
                {formData.skills.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={s} onChange={(e) => handleArrayChange("skills", i, e.target.value)} placeholder="e.g. Next.js" className={InputStyle}/>
                    <button onClick={() => removeArrayItem("skills", i)} className="text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>
              <button onClick={() => addArrayItem("skills")} className="w-full mt-3 py-2 border-2 border-dashed text-black border-gray-300 rounded-xl text-xs font-black hover:bg-green-50 transition-colors">+ ADD SKILL</button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-yellow-500">
              <h3 className="font-black text-black uppercase mb-4 flex items-center gap-2"><Award size={20} className="text-yellow-600"/> Strengths</h3>
              <div className="space-y-2">
                {formData.strengths.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={s} onChange={(e) => handleArrayChange("strengths", i, e.target.value)} placeholder="e.g. Problem Solving" className={InputStyle}/>
                    <button onClick={() => removeArrayItem("strengths", i)} className="text-red-400"><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>
              <button onClick={() => addArrayItem("strengths")} className="w-full mt-3 py-2 border-2 border-dashed text-black border-gray-300 rounded-xl text-xs font-black hover:bg-yellow-50 transition-colors">+ ADD STRENGTH</button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-cyan-500">
              <h3 className="font-black text-black uppercase mb-4 flex items-center gap-2"><CheckCircle size={20} className="text-cyan-600"/> Certifications</h3>
              <div className="space-y-2">
                {formData.certifications.map((c, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={c} onChange={(e) => handleArrayChange("certifications", i, e.target.value)} placeholder="e.g. AWS" className={InputStyle}/>
                    <button onClick={() => removeArrayItem("certifications", i)} className="text-red-400"><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>
              <button onClick={() => addArrayItem("certifications")} className="w-full mt-3 py-2 border-2 border-dashed border-gray-300 text-black rounded-xl text-xs font-black hover:bg-cyan-50 transition-colors">+ ADD CERTIFICATE</button>
            </div>

            <div className="bg-black p-8 rounded-[2.5rem] shadow-2xl text-white border-b-8 border-blue-700">
              <h3 className="font-black text-xl mb-6 flex items-center gap-2 border-b border-gray-800 pb-3 uppercase tracking-tighter">
                <Plus size={24} className="text-blue-500"/> Other Details
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Languages</label>
                  <input name="languages" value={formData.languages} onChange={handleInputChange} placeholder="English, Hindi" className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 px-4 text-white font-bold outline-none focus:border-blue-500 transition-all"/>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Hobbies</label>
                  <input name="hobbies" value={formData.hobbies} onChange={handleInputChange} placeholder="Coding, Gaming" className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 px-4 text-white font-bold outline-none focus:border-blue-500 transition-all"/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- FLOATING GENERATE BUTTON --- */}
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100]">
          <button
            onClick={generatePDF}
            disabled={loading}
            className="bg-blue-700 hover:bg-black text-white px-8 py-4 md:px-12 md:py-5 rounded-full md:rounded-2xl font-black text-lg flex items-center gap-3 shadow-[0_15px_40px_rgba(29,78,216,0.4)] transition-all active:scale-90 hover:-translate-y-2 disabled:opacity-70 group"
          >
            {loading ? (
              <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FileDown size={28} className="group-hover:bounce" />
            )}
            <span className={loading ? "ml-2" : ""}>
              {loading ? "Generating..." : "GENERATE PDF"}
            </span>
          </button>
        </div>

        {/* LOADING MODAL */}
        {loading && (
          <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center">
            <div className="bg-white p-12 rounded-[3rem] text-center border-b-[10px] border-blue-700 shadow-2xl">
              <div className="w-24 h-24 border-[8px] border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-xl font-black text-blue-700 italic">Processing Data...</h2>
            </div>
          </div>
        )}

        {/* PREVIEW MODAL */}
        {pdfUrl && !loading && (
          <div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-5xl h-[92vh] rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl">
              <div className="p-6 bg-gray-50 flex justify-between items-center border-b-2">
                <div>
                  <h2 className="font-black text-2xl text-black flex items-center gap-2"><CheckCircle className="text-green-600"/> PDF READY</h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Style: {templateId}</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setPdfUrl(null)} className="font-black text-gray-400 hover:text-red-500 uppercase text-xs">Discard</button>
                  <a href={pdfUrl} download="Resume.pdf" className="bg-blue-700 hover:bg-black text-white px-8 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all">
                    <FileDown size={18}/> DOWNLOAD
                  </a>
                </div>
              </div>
              <div className="flex-1 bg-gray-300 relative">
                <iframe src={`${pdfUrl}#toolbar=0`} className="w-full h-full border-none" />
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .group-hover\:bounce { animation: bounce 0.6s infinite; }
      `}</style>
    </div>
  );
}

export default function ResumeBuilder() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-black text-2xl bg-gray-100 uppercase italic">Loading...</div>}>
      <ResumeBuilderContent />
    </Suspense>
  );
}
