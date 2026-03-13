"use client";
import { Layout, CheckCircle, MousePointer2 } from "lucide-react";

interface Template {
  id: string;
  name: string;
  color: string;
}

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: string;
  onSelect: (id: string) => void; // Prop to handle selection
}

const TemplateSelector = ({ templates, selectedTemplate, onSelect }: TemplateSelectorProps) => {
  return (
    <section className="mb-10 bg-white p-6 rounded-2xl shadow-md border-b-4 border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Layout className="text-blue-700" size={24} />
        <h2 className="text-xl font-black text-black uppercase tracking-tight italic">
          Select Your Style
        </h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {templates.map((t) => (
          <div 
            key={t.id}
            onClick={() => onSelect(t.id)} // Parent state update karega
            className={`cursor-pointer group relative rounded-2xl border-4 transition-all duration-300 overflow-hidden shadow-sm
              ${selectedTemplate === t.id 
                ? 'border-blue-600 ring-4 ring-blue-50 scale-[1.05]' 
                : 'border-white hover:border-gray-200 hover:shadow-lg'}`}
          >
            {/* Template Header/Preview Area */}
            <div className={`h-24 w-full ${t.color} flex items-center justify-center text-white relative`}>
              {selectedTemplate === t.id ? (
                <CheckCircle size={32} className="animate-in zoom-in-50 duration-300" />
              ) : (
                <MousePointer2 size={24} className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110" />
              )}
              {/* Abstract Design Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent"></div>
            </div>

            {/* Template Info Area */}
            <div className="p-4 bg-white text-center">
              <span className={`text-[12px] font-black uppercase tracking-widest block truncate
                ${selectedTemplate === t.id ? 'text-blue-700' : 'text-gray-500 group-hover:text-black'}`}>
                {t.name}
              </span>
            </div>

            {/* Active Indicator Pin */}
            {selectedTemplate === t.id && (
               <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full border-2 border-blue-600"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TemplateSelector;