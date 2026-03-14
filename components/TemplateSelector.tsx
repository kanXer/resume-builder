"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  User, GraduationCap, Plus, FileDown, Settings, 
  Briefcase, Award, Languages, Trash2, 
  CheckCircle, Layout, Sparkles, ChevronLeft, ChevronRight, ZoomIn, ZoomOut 
} from "lucide-react";

// --- REACT-PDF IMPORTS ---
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ResumeBuilderClient() {
  const searchParams = useSearchParams();
  // URL se ID lena (agar ?template=1 hai to "1" lega)
  const templateIdFromUrl = searchParams.get("template") || "1";

  const [templateName, setTemplateName] = useState("Loading...");
  const [formData, setFormData] = useState({
    name: "", father_name: "", address: "", phone: "", email: "",
    github: "", dob: "", languages: "", hobbies: "",
    skills: [""], strengths: [""], certifications: [""],
    education: [{ degree: "", college: "", year: "", score: "" }],
    experience: [{ company: "", role: "", duration: "", points: [""] }]
  });

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  // Effect to sync Template Name from DB
  useEffect(() => {
    async function fetchTemplateDetails() {
      try {
        const response = await fetch("/api/templates");
        const data = await response.json();
        // Database mein id "1" hai, URL mein bhi "1" aa raha hai
        const currentTemplate = data.find((t: any) => String(t.id) === String(templateIdFromUrl));
        
        if (currentTemplate) {
          setTemplateName(currentTemplate.name);
        } else {
          setTemplateName(`Template ${templateIdFromUrl}`);
        }
      } catch (err) {
        setTemplateName(`Template ${templateIdFromUrl}`);
      }
    }
    fetchTemplateDetails();
  }, [templateIdFromUrl]);

  // --- HANDLERS ---
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
    setFormData({ ...formData, education: [...formData.education, { degree: "", college: "", year: "", score: "" }] });
  };
  const removeEducation = (index: number) => {
    setFormData({ ...formData, education: formData.education.filter((_, i) => i !== index) });
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
    setFormData({ ...formData, experience: [...formData.experience, { company: "", role: "", duration: "", points: [""] }] });
  };
  const removeExperience = (index: number) => {
    setFormData({ ...formData, experience: formData.experience.filter((_, i) => i !== index) });
  };

  // --- PDF GENERATION ---
  async function generatePDF() {
    setLoading(true);

    // Backend FIX: "1" ko "template1" banana
    const finalTemplateId = templateIdFromUrl.startsWith("template") 
      ? templateIdFromUrl 
      : `template${templateIdFromUrl}`;

    let payload = { 
      ...formData, 
      template: finalTemplateId // Backend f"{template_id}.html" khud handle karega
    };

    if (payload.experience.length === 1 && !payload.experience[0].company) {
        payload.experience = [];
    }

    try {
      const res = await fetch("https://resume-builder-api-5isu.onrender.com/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      setPdfUrl(URL.createObjectURL(blob));
    } catch {
      alert("Backend server is not responding. Please try again later.");
    }
    setLoading(false);
  }

  // --- STYLES ---
  const InputStyle = "w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition-all text-black font-semibold placeholder:text-gray-400 shadow-sm text-sm";
  const LabelStyle = "flex items-center gap-1 text-[9px] md:text-[10px] font-black text-gray-400 mb-1 ml-1 uppercase tracking-widest";
  const SectionCard = "bg-white p-5 md:p-8 rounded-2xl md:rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100";
  const Required = <span className="text-red-500">*</span>;

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-10 px-4 md:px-8 font-sans pb-32">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-10 gap-4 text-center md:text-left">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-black tracking-tighter italic uppercase flex items-center justify-center md:justify-start gap-3">
               STUDIO <Sparkles className="text-blue-700" size={30} />
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                <Layout size={14} className="text-blue-700"/>
                <p className="text-gray-500 font-black text-[10px] uppercase tracking-widest">
                  Active Template: <span className="text-blue-700 italic">{templateName}</span>
                </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
          <div className="lg:col-span-8 space-y-6 md:space-y-10">
            {/* PERSONAL DETAILS SECTION */}
            <section className={SectionCard}>
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-700"><User size={18}/></div>
                <h2 className="text-xl md:text-2xl font-black text-black uppercase italic tracking-tight">Personal Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div><label className={LabelStyle}>Full Name {Required}</label><input name="name" value={formData.name} onChange={handleInputChange} placeholder="Sahil Srivastava" className={InputStyle}/></div>
                <div><label className={LabelStyle}>Father's Name</label><input name="father_name" value={formData.father_name} onChange={handleInputChange} placeholder="Manoj Srivastav" className={InputStyle}/></div>
                <div><label className={LabelStyle}>Email {Required}</label><input name="email" value={formData.email} onChange={handleInputChange} placeholder="mail@example.com" className={InputStyle}/></div>
                <div><label className={LabelStyle}>Phone {Required}</label><input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91..." className={InputStyle}/></div>
                <div><label className={LabelStyle}>GitHub URL</label><input name="github" value={formData.github} onChange={handleInputChange} placeholder="github.com/profile" className={InputStyle}/></div>
                <div><label className={LabelStyle}>DOB</label><input name="dob" value={formData.dob} onChange={handleInputChange} placeholder="DD/MM/YYYY" className={InputStyle}/></div>
                <div className="md:col-span-2"><label className={LabelStyle}>Address {Required}</label><textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Gorakhpur, UP..." className={`${InputStyle} h-20 pt-2`}/></div>
              </div>
            </section>

            {/* EXPERIENCE SECTION */}
            <section className={SectionCard}>
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600"><Briefcase size={18}/></div>
                  <h2 className="text-xl md:text-2xl font-black text-black uppercase italic tracking-tight">Experience</h2>
                </div>
                <button onClick={addExperience} className="cursor-pointer bg-orange-50 text-orange-600 px-3 py-1.5 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all">+ Add Job</button>
              </div>
              {formData.experience.map((exp, i) => (
                <div key={i} className="mb-6 p-4 md:p-6 border border-gray-100 rounded-2xl bg-gray-50/50 relative">
                  <button onClick={() => removeExperience(i)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <input value={exp.company} placeholder="Company" onChange={(e) => handleExpChange(i, "company", e.target.value)} className={InputStyle}/>
                    <input value={exp.role} placeholder="Role" onChange={(e) => handleExpChange(i, "role", e.target.value)} className={InputStyle}/>
                    <input value={exp.duration} placeholder="Duration" onChange={(e) => handleExpChange(i, "duration", e.target.value)} className={InputStyle}/>
                  </div>
                  <div className="space-y-2">
                    {exp.points.map((p, j) => (
                      <input key={j} value={p} placeholder="Key achievement..." onChange={(e) => handlePointChange(i, j, e.target.value)} className={`${InputStyle} text-sm font-medium`}/>
                    ))}
                    <button onClick={() => addPoint(i)} className="cursor-pointer text-blue-700 font-black text-[9px] uppercase tracking-widest ml-1">+ Add Point</button>
                  </div>
                </div>
              ))}
            </section>

            {/* EDUCATION SECTION */}
            <section className={SectionCard}>
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-700"><GraduationCap size={18}/></div>
                  <h2 className="text-xl md:text-2xl font-black text-black uppercase italic tracking-tight">Education</h2>
                </div>
                <button onClick={addEducation} className="cursor-pointer bg-purple-50 text-purple-700 px-3 py-1.5 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-purple-700 hover:text-white transition-all">+ Add Edu</button>
              </div>
              {formData.education.map((edu, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4 p-4 border border-gray-100 rounded-2xl bg-gray-50/50 relative">
                  <input value={edu.degree} placeholder="Degree" onChange={(e) => handleEduChange(i, "degree", e.target.value)} className={`${InputStyle} md:col-span-2`}/>
                  <input value={edu.college} placeholder="College" onChange={(e) => handleEduChange(i, "college", e.target.value)} className={InputStyle}/>
                  <input value={edu.year} placeholder="Year" onChange={(e) => handleEduChange(i, "year", e.target.value)} className={InputStyle}/>
                  <div className="flex items-center gap-2">
                    <input value={edu.score} placeholder="%" onChange={(e) => handleEduChange(i, "score", e.target.value)} className={InputStyle}/>
                    <button onClick={() => removeEducation(i)} className="cursor-pointer text-red-400 hover:text-red-600 transition-colors shrink-0"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="font-black text-black uppercase mb-4 flex items-center gap-2 italic tracking-tighter"><Settings size={18} className="text-green-600"/> Skills</h3>
              <div className="space-y-2">
                {formData.skills.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={s} onChange={(e) => handleArrayChange("skills", i, e.target.value)} placeholder="Next.js" className={InputStyle}/>
                    <button onClick={() => removeArrayItem("skills", i)} className="cursor-pointer text-gray-300 hover:text-red-500"><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>
              <button onClick={() => addArrayItem("skills")} className="cursor-pointer w-full mt-3 py-2 border-2 border-dashed border-gray-200 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all">+ Add Skill</button>
            </div>

            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="font-black text-black uppercase mb-4 flex items-center gap-2 italic tracking-tighter"><Award size={18} className="text-yellow-600"/> Strengths</h3>
              {formData.strengths.map((s, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={s} onChange={(e) => handleArrayChange("strengths", i, e.target.value)} placeholder="Problem Solving" className={InputStyle}/>
                  <button onClick={() => removeArrayItem("strengths", i)} className="cursor-pointer text-gray-300 hover:text-red-500"><Trash2 size={18}/></button>
                </div>
              ))}
              <button onClick={() => addArrayItem("strengths")} className="cursor-pointer w-full mt-3 py-2 border-2 border-dashed border-gray-200 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">+ Add Strength</button>
            </div>

            <div className="bg-black p-6 md:p-8 rounded-[2rem] shadow-2xl text-white border-b-[8px] border-blue-700">
              <h3 className="font-black text-lg md:text-xl mb-6 flex items-center gap-2 italic uppercase tracking-tighter"><Plus size={20} className="text-blue-500"/> Final Specs</h3>
              <div className="space-y-5">
                <div>
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-2">Languages</label>
                  <input name="languages" value={formData.languages} onChange={handleInputChange} placeholder="English, Hindi" className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white font-bold outline-none focus:border-blue-500 transition-all text-sm"/>
                </div>
                <div>
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-2">Hobbies</label>
                  <input name="hobbies" value={formData.hobbies} onChange={handleInputChange} placeholder="Cricket, Anime" className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white font-bold outline-none focus:border-blue-500 transition-all text-sm"/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING ACTION BUTTON */}
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100]">
          <button onClick={generatePDF} disabled={loading} className="cursor-pointer bg-blue-700 hover:bg-black text-white px-6 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-[2rem] font-black text-sm md:text-lg flex items-center gap-3 shadow-2xl transition-all active:scale-90 hover:-translate-y-2 uppercase italic">
            {loading ? <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin" /> : <FileDown size={24} />}
            <span>{loading ? "Building..." : "Generate PDF"}</span>
          </button>
        </div>

        {/* PDF PREVIEW MODAL */}
        {pdfUrl && !loading && (
          <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-0 md:p-6 backdrop-blur-md">
            <div className="bg-white w-full h-full md:h-[94vh] md:max-w-5xl md:rounded-[3rem] flex flex-col overflow-hidden shadow-2xl border border-white/10 text-black text-center">
              <div className="p-4 md:p-6 bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-200">
                <div className="text-center md:text-left hidden md:block text-black">
                  <h2 className="font-black text-xl md:text-2xl flex items-center gap-2 italic uppercase tracking-tighter text-black"><CheckCircle className="text-green-600"/> Resume Ready</h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Style: {templateName}</p>
                </div>
                
                {/* PDF CONTROLS */}
                <div className="flex items-center bg-white border border-gray-200 px-3 py-1.5 rounded-xl md:rounded-2xl gap-2 md:gap-4 shadow-sm scale-90 md:scale-100">
                  <div className="flex items-center gap-1 md:gap-2 text-black">
                    <button onClick={() => setScale(s => Math.max(s - 0.1, 0.4))} className="cursor-pointer p-1 hover:bg-gray-100 rounded-lg"><ZoomOut size={16}/></button>
                    <span className="text-[9px] md:text-[10px] font-black w-8 md:w-10 text-center">{Math.round(scale * 100)}%</span>
                    <button onClick={() => setScale(s => Math.min(s + 0.1, 2.0))} className="cursor-pointer p-1 hover:bg-gray-100 rounded-lg"><ZoomIn size={16}/></button>
                  </div>
                  <div className="w-px h-4 bg-gray-300" />
                  <div className="flex items-center gap-1 md:gap-2 text-black">
                    <button disabled={pageNumber <= 1} onClick={() => setPageNumber(p => p - 1)} className="cursor-pointer disabled:opacity-20"><ChevronLeft size={18}/></button>
                    <span className="text-[9px] md:text-[10px] font-black uppercase">Pg {pageNumber} / {numPages}</span>
                    <button disabled={pageNumber >= (numPages || 1)} onClick={() => setPageNumber(p => p + 1)} className="cursor-pointer disabled:opacity-20"><ChevronRight size={18}/></button>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end px-4 md:px-0">
                  <button onClick={() => setPdfUrl(null)} className="cursor-pointer font-black text-gray-400 hover:text-red-500 uppercase text-[10px] tracking-widest">Discard</button>
                  <a href={pdfUrl} download={`${formData.name || 'Resume'}_cv_${templateName}.pdf`} className="cursor-pointer bg-blue-700 hover:bg-black text-white px-6 py-2.5 rounded-xl font-black text-xs shadow-lg transition-all active:scale-95">DOWNLOAD PDF</a>
                </div>
              </div>
              
              <div className="flex-1 bg-zinc-800 overflow-auto flex justify-center p-2 md:p-6 scrollbar-hide">
                 <div className="shadow-2xl h-fit w-fit">
                    <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                      <Page 
                        pageNumber={pageNumber} 
                        scale={scale} 
                        renderAnnotationLayer={false} 
                        renderTextLayer={true}
                        width={typeof window !== 'undefined' && window.innerWidth < 768 ? window.innerWidth * 0.9 : undefined}
                      />
                    </Document>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
