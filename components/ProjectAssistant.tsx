import React, { useState } from 'react';
import { APPROVED_COUNTRIES } from '../constants';
import { generateProjectOutline } from '../services/geminiService';
import { Sparkles, FileText, ChevronRight, Loader2 } from 'lucide-react';

const ProjectAssistant: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [interest, setInterest] = useState('');
  const [outline, setOutline] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!selectedCountry || !interest) return;
    setLoading(true);
    const result = await generateProjectOutline(selectedCountry, interest);
    setOutline(result || 'Error generating outline.');
    setLoading(false);
    setStep(3);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-uwm-gold">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Country Analysis Project Assistant</h2>
        <p className="text-gray-600">
          This tool helps you structure your final project (15% of grade). 
          It strictly follows the syllabus structure (Intro, History, Institutions, Assessment).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Steps */}
        <div className="md:col-span-1 space-y-4">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`p-4 rounded-lg border transition-all ${
                step === s 
                  ? 'bg-uwm-black text-white border-uwm-black shadow-md' 
                  : step > s 
                    ? 'bg-green-50 border-green-200 text-green-700' 
                    : 'bg-white border-gray-200 text-gray-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">Step {s}</span>
                {step === s && <ChevronRight className="w-4 h-4" />}
              </div>
              <div className="text-sm mt-1">
                {s === 1 && "Select Country"}
                {s === 2 && "Define Focus"}
                {s === 3 && "Get Outline"}
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xl font-bold text-gray-800">Choose an Approved Country</h3>
              <p className="text-sm text-gray-500">Per syllabus, you cannot choose the US or UK.</p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {APPROVED_COUNTRIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setSelectedCountry(c); setStep(2); }}
                    className="p-3 text-left border rounded hover:bg-amber-50 hover:border-uwm-gold transition-colors text-gray-700 font-medium"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold text-gray-800">What interests you about {selectedCountry}?</h3>
              <p className="text-sm text-gray-500">
                This helps the AI tailor the research questions for your specific analysis.
              </p>
              
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uwm-gold focus:border-transparent outline-none h-32"
                placeholder="e.g., I'm interested in how their federal system affects minority representation, or the stability of their coalition governments..."
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              />

              <button
                onClick={handleGenerate}
                disabled={!interest || loading}
                className="w-full bg-uwm-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generate Research Outline
              </button>
              
              <button 
                onClick={() => setStep(1)}
                className="text-sm text-gray-500 hover:text-gray-800 underline"
              >
                Back to Country Selection
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in h-full flex flex-col">
               <div className="flex justify-between items-center pb-4 border-b">
                 <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                   <FileText className="text-uwm-gold" /> Outline: {selectedCountry}
                 </h3>
                 <button 
                  onClick={() => {setStep(1); setOutline(''); setSelectedCountry(''); setInterest('');}}
                  className="text-sm text-blue-600 hover:underline"
                 >
                   Start Over
                 </button>
               </div>
               
               <div className="prose prose-sm max-w-none overflow-y-auto max-h-[500px] p-4 bg-gray-50 rounded-lg">
                 <div dangerouslySetInnerHTML={{ __html: outline.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
               </div>

               <div className="bg-blue-50 p-4 rounded text-xs text-blue-800 mt-auto">
                 <strong>Reminder:</strong> This outline adheres to the "Permitted Uses of AI" in your syllabus (Brainstorming & Outlining). You must cite the AI use in your final submission.
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectAssistant;