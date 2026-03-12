
import React, { useState, useEffect, useMemo } from 'react';
import { SCHEDULE } from '../constants';
import { Week } from '../types';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, LabelList, Legend,
  BarChart, Bar, PieChart, Pie
} from 'recharts';
import { 
  ChevronRight, ArrowLeft, Microscope, Scale, 
  Variable, Globe, BookOpen, AlertTriangle, 
  CheckCircle2, Users, Split, Swords, Handshake,
  Crown, Beaker, PlayCircle, RefreshCw, BarChart3,
  Search, FileText, X, ArrowDown, Gavel, Landmark,
  Briefcase, Building2, Vote, MessageSquare, Map as MapIcon, Flag,
  Factory, Cross, Tractor, GraduationCap, Calculator
} from 'lucide-react';

const ScheduleView: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);

  if (selectedWeek) {
    return (
      <WeekDetailView 
        week={selectedWeek} 
        onBack={() => setSelectedWeek(null)} 
      />
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-uwm-black">
        <h2 className="text-2xl font-serif font-bold text-gray-900">Course Schedule</h2>
        <p className="text-gray-600">Spring 2026 • 15 Weeks • Click a week for details</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {SCHEDULE.map((week) => (
          <div 
            key={week.id} 
            onClick={() => setSelectedWeek(week)}
            className="group p-6 border-b border-gray-100 hover:bg-blue-50 transition-colors last:border-0 cursor-pointer relative"
          >
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
               <ChevronRight className="text-uwm-gold w-6 h-6" />
            </div>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pr-8">
              <div className="md:w-1/4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${
                   week.id === 1 || week.id === 2 || week.id === 3 ? 'bg-uwm-gold text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  Week {week.id}
                </span>
                <p className="font-bold text-uwm-black">{week.dates}</p>
              </div>
              
              <div className="md:w-1/2">
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-uwm-black transition-colors">{week.title}</h3>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold text-gray-400 uppercase text-xs">Topics:</span>
                  <ul className="ml-4 list-disc">
                    {week.topics.slice(0, 2).map((t, i) => <li key={i}>{t}</li>)}
                    {week.topics.length > 2 && <li className="text-gray-400 italic">...and more</li>}
                  </ul>
                </div>
              </div>

              <div className="md:w-1/4 flex flex-col items-start md:items-end">
                {week.due && week.due.map((item, i) => (
                  <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mb-1">
                    Due: {item.split('(')[0]}
                  </span>
                ))}
                <span className="text-xs text-blue-500 font-semibold mt-2 underline md:no-underline group-hover:underline">
                  View Resources & Visuals
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WeekDetailView: React.FC<{ week: Week, onBack: () => void }> = ({ week, onBack }) => {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-uwm-black transition-colors"
      >
        <ArrowLeft size={16} /> Back to Schedule
      </button>

      <div className="bg-uwm-black text-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-uwm-gold font-bold uppercase tracking-widest text-xs">Week {week.id}</span>
            <h2 className="text-3xl font-serif font-bold mt-2">{week.title}</h2>
            <p className="text-gray-300 mt-2">{week.dates}</p>
          </div>
          <div className="hidden md:block">
            <BookOpen className="w-12 h-12 text-white/10" />
          </div>
        </div>
      </div>

      {/* Conditional Content Rendering */}
      {week.id === 1 ? (
        <Week1Visuals />
      ) : week.id === 2 ? (
        <Week2Visuals />
      ) : week.id === 3 ? (
        <Week3Visuals />
      ) : week.id === 4 ? (
        <Week4Visuals />
      ) : week.id === 5 ? (
        <Week5Visuals />
      ) : (
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Visuals Coming Soon</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            The interactive diagrams and charts for <strong>{week.title}</strong> are currently being prepared. 
            Check back closer to the module start date.
          </p>
        </div>
      )}

      {/* Common Metadata Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-uwm-gold" /> Assigned Readings
          </h3>
          <ul className="space-y-3">
            {week.readings.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Variable className="w-4 h-4 text-uwm-gold" /> Key Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {week.topics.map((t, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- VISUALIZATION COMPONENTS ---

// ... (Week 1, 2, 3 components remain unchanged) ...

const MethodsMatrix: React.FC = () => {
  const [hoveredMethod, setHoveredMethod] = useState<'single' | 'few' | 'many' | null>(null);

  const methods = {
    single: {
      title: "Single-Country Studies",
      desc: "Intensive analysis of one country.",
      strengths: ["Contextual description", "Generating hypotheses", "Process tracing", "Understanding 'deviant' cases"],
      weaknesses: ["Cannot generalize (N=1)", "Selection bias", "No control"],
      example: "Tocqueville's Democracy in America, Putnam's Making Democracy Work (Italy)"
    },
    few: {
      title: "Comparing Few Countries (Small-N)",
      desc: "Intentional selection of 2-20 countries.",
      strengths: ["Control through selection (MSSD/MDSD)", "Cultural sensitivity", "Theory building"],
      weaknesses: ["Limited generalization", "Many variables, small N"],
      example: "Skocpol's States and Social Revolutions, Moore's Social Origins"
    },
    many: {
      title: "Comparing Many Countries (Large-N)",
      desc: "Statistical analysis of 50+ countries.",
      strengths: ["Statistical control", "Strong inferences", "Global generalizations"],
      weaknesses: ["Conceptual stretching", "Thin data", "Ignores context"],
      example: "Lipset (1959) Economic Development & Democracy, Gurr (1968) Civil Strife"
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Scale className="text-uwm-gold" /> The Trade-off: Scope vs. Abstraction
      </h3>
      <p className="text-gray-500 text-sm mb-6">
        Landman (Ch 2) argues there is a necessary trade-off between the level of abstraction (generality) and the scope of countries.
      </p>

      {/* Increased left margin significantly (ml-48) to prevent axis label overlap with Single Country box */}
      <div className="relative h-64 border-l-2 border-b-2 border-gray-300 ml-48 my-6 mr-4">
        {/* Y-Axis Label: Moved further left (-left-32) to ensure clearance */}
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
          Level of Abstraction
        </div>
        {/* X-Axis Label */}
        <div className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400 uppercase tracking-widest">
          Scope of Countries (N)
        </div>

        {/* Matrix Points */}
        <div 
          className="absolute top-4 right-4 cursor-pointer group"
          onMouseEnter={() => setHoveredMethod('many')}
          onMouseLeave={() => setHoveredMethod(null)}
        >
          <div className={`w-32 h-20 rounded-lg flex items-center justify-center text-center p-2 text-xs font-bold transition-all ${hoveredMethod === 'many' ? 'bg-blue-600 text-white scale-110 z-10 shadow-lg' : 'bg-blue-100 text-blue-800'}`}>
            Many Countries<br/>(Statistical)
          </div>
        </div>

        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          onMouseEnter={() => setHoveredMethod('few')}
          onMouseLeave={() => setHoveredMethod(null)}
        >
          <div className={`w-32 h-20 rounded-lg flex items-center justify-center text-center p-2 text-xs font-bold transition-all ${hoveredMethod === 'few' ? 'bg-indigo-600 text-white scale-110 z-10 shadow-lg' : 'bg-indigo-100 text-indigo-800'}`}>
            Few Countries<br/>(Comparative)
          </div>
        </div>

        <div 
          className="absolute bottom-4 left-4 cursor-pointer group"
          onMouseEnter={() => setHoveredMethod('single')}
          onMouseLeave={() => setHoveredMethod(null)}
        >
          <div className={`w-32 h-20 rounded-lg flex items-center justify-center text-center p-2 text-xs font-bold transition-all ${hoveredMethod === 'single' ? 'bg-slate-800 text-white scale-110 z-10 shadow-lg' : 'bg-slate-200 text-slate-700'}`}>
            Single Country<br/>(Case Study)
          </div>
        </div>
      </div>

      {/* Detail Panel: Reduced height and padding when empty */}
      <div className={`mt-8 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-300 ${hoveredMethod ? 'p-6 min-h-[160px]' : 'p-3 min-h-[50px] flex items-center justify-center'}`}>
        {hoveredMethod ? (
          <div className="animate-fade-in">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-bold text-gray-900">{methods[hoveredMethod].title}</h4>
              <span className="text-xs bg-white border px-2 py-1 rounded text-gray-500 font-mono">
                {hoveredMethod === 'single' ? 'N=1' : hoveredMethod === 'few' ? 'N=2-20' : 'N=50+'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{methods[hoveredMethod].desc}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-bold text-green-600 block mb-1">Strengths</span>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {methods[hoveredMethod].strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div>
                <span className="font-bold text-red-600 block mb-1">Weaknesses</span>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {methods[hoveredMethod].weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500 italic">
              <strong>Example:</strong> {methods[hoveredMethod].example}
            </div>
          </div>
        ) : (
          <div className="text-gray-400 text-xs italic">
            Hover over the boxes in the chart to explore different methods.
          </div>
        )}
      </div>
    </div>
  );
};

const ResearchDesignComparator: React.FC = () => {
  const [mode, setMode] = useState<'mssd' | 'mdsd'>('mssd');

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Microscope className="text-uwm-gold" /> Research Design Systems
          </h3>
          <p className="text-sm text-gray-500">Comparing Mill's Methods (Landman Ch 4)</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setMode('mssd')}
            className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${mode === 'mssd' ? 'bg-white shadow-sm text-uwm-black' : 'text-gray-500 hover:text-gray-700'}`}
          >
            MSSD (Similar)
          </button>
          <button 
            onClick={() => setMode('mdsd')}
            className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${mode === 'mdsd' ? 'bg-white shadow-sm text-uwm-black' : 'text-gray-500 hover:text-gray-700'}`}
          >
            MDSD (Different)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Definition Side */}
        <div className={`p-6 rounded-xl border-l-4 ${mode === 'mssd' ? 'bg-blue-50 border-blue-500' : 'bg-purple-50 border-purple-500'}`}>
          <h4 className={`text-lg font-bold mb-2 ${mode === 'mssd' ? 'text-blue-900' : 'text-purple-900'}`}>
            {mode === 'mssd' ? 'Most Similar Systems Design' : 'Most Different Systems Design'}
          </h4>
          <p className="text-sm text-gray-700 mb-4 leading-relaxed">
            {mode === 'mssd' 
              ? "Compares countries that are very similar (controlling for culture, history, region) but differ in the specific outcome. Based on J.S. Mill's 'Method of Difference'."
              : "Compares countries that are very different but share the same outcome. The goal is to find the one common factor amidst the diversity. Based on J.S. Mill's 'Method of Agreement'."
            }
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Classic Example</h5>
            {mode === 'mssd' ? (
              <div>
                <p className="font-bold text-gray-800">Regional Studies (e.g. Latin America)</p>
                <p className="text-xs text-gray-600 mt-1">Why did Costa Rica democratize while El Salvador plunged into civil war?</p>
                <div className="mt-2 text-xs flex gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Similar: Language, Religion</span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded">Different: Land Tenure</span>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-bold text-gray-800">Skocpol (1979): Social Revolutions</p>
                <p className="text-xs text-gray-600 mt-1">Why did France (1789), Russia (1917), and China (1911) all have social revolutions despite being totally different?</p>
                <div className="mt-2 text-xs flex gap-2">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded">Different: Time, Culture</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Same: State Breakdown</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Visual Logic Side */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-center">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center text-gray-400 text-xs font-bold uppercase tracking-widest pb-2 border-b">
              <span>Variable</span>
              <span>Case A</span>
              <span>Case B</span>
            </div>
            
            {/* Variable Rows */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Culture/History</span>
              {mode === 'mssd' ? (
                 <>
                   <span className="text-blue-600 font-bold bg-blue-50 px-2 rounded">Similar</span>
                   <span className="text-blue-600 font-bold bg-blue-50 px-2 rounded">Similar</span>
                 </>
              ) : (
                 <>
                   <span className="text-red-500 font-bold bg-red-50 px-2 rounded">Different</span>
                   <span className="text-red-500 font-bold bg-red-50 px-2 rounded">Different</span>
                 </>
              )}
            </div>

            <div className="flex justify-between items-center">
               <span className="text-gray-600">Economy</span>
               {mode === 'mssd' ? (
                 <>
                   <span className="text-blue-600 font-bold bg-blue-50 px-2 rounded">Similar</span>
                   <span className="text-blue-600 font-bold bg-blue-50 px-2 rounded">Similar</span>
                 </>
              ) : (
                 <>
                   <span className="text-red-500 font-bold bg-red-50 px-2 rounded">Different</span>
                   <span className="text-red-500 font-bold bg-red-50 px-2 rounded">Different</span>
                 </>
              )}
            </div>

            <div className="flex justify-between items-center py-2 border-t border-b border-gray-100 bg-gray-50 -mx-6 px-6">
               <span className="font-bold text-gray-800">Key Factor (X)</span>
               {mode === 'mssd' ? (
                 <>
                   <span className="text-red-500 font-bold">Present</span>
                   <span className="text-red-500 font-bold">Absent</span>
                 </>
              ) : (
                 <>
                   <span className="text-green-600 font-bold">Present</span>
                   <span className="text-green-600 font-bold">Present</span>
                 </>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
               <span className="font-black text-uwm-black">Outcome (Y)</span>
               {mode === 'mssd' ? (
                 <>
                   <span className="text-uwm-black font-bold">Outcome 1</span>
                   <span className="text-gray-400 font-bold">Outcome 2</span>
                 </>
              ) : (
                 <>
                   <span className="text-uwm-black font-bold">Same Outcome</span>
                   <span className="text-uwm-black font-bold">Same Outcome</span>
                 </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScientificMethodDiagram: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Microscope className="text-uwm-gold" /> The Scientific Method in Politics
      </h3>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-0"></div>

        {/* Step 1 */}
        <div className="relative z-10 bg-white p-4 rounded-lg border border-gray-200 w-full md:w-1/4 flex flex-col items-center text-center shadow-sm hover:border-uwm-gold transition-colors">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mb-3">1</div>
          <h4 className="font-bold text-gray-800 text-sm mb-1">Puzzle</h4>
          <p className="text-xs text-gray-500">"Why are some countries rich and others poor?"</p>
        </div>

        {/* Arrow Mobile */}
        <div className="md:hidden text-gray-300">▼</div>

        {/* Step 2 */}
        <div className="relative z-10 bg-white p-4 rounded-lg border border-gray-200 w-full md:w-1/4 flex flex-col items-center text-center shadow-sm hover:border-uwm-gold transition-colors">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold mb-3">2</div>
          <h4 className="font-bold text-gray-800 text-sm mb-1">Theory</h4>
          <p className="text-xs text-gray-500">"Democracy encourages economic growth."</p>
        </div>

        {/* Arrow Mobile */}
        <div className="md:hidden text-gray-300">▼</div>

        {/* Step 3 */}
        <div className="relative z-10 bg-white p-4 rounded-lg border border-gray-200 w-full md:w-1/4 flex flex-col items-center text-center shadow-sm hover:border-uwm-gold transition-colors">
          <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold mb-3">3</div>
          <h4 className="font-bold text-gray-800 text-sm mb-1">Hypothesis</h4>
          <p className="text-xs text-gray-500">"If X (Democracy) increases, then Y (GDP) increases."</p>
        </div>

        {/* Arrow Mobile */}
        <div className="md:hidden text-gray-300">▼</div>

        {/* Step 4 */}
        <div className="relative z-10 bg-white p-4 rounded-lg border border-gray-200 w-full md:w-1/4 flex flex-col items-center text-center shadow-sm hover:border-uwm-gold transition-colors">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold mb-3">4</div>
          <h4 className="font-bold text-gray-800 text-sm mb-1">Test (Data)</h4>
          <p className="text-xs text-gray-500">Compare GDP data across 50 countries (Large-N) or 2 cases (Small-N).</p>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-50 p-4 rounded-lg text-xs text-gray-600 border border-gray-100 flex gap-2">
         <div className="font-bold text-uwm-black">Note:</div>
         <div>Political science moves from specific puzzles to general theories (Inductive) or from general theories to specific tests (Deductive).</div>
      </div>
    </div>
  );
};

// --- WEEK 4 VISUALS (PARTY SYSTEMS) ---

const EnpCalculator: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
       <div className="mb-6 flex justify-between items-start">
         <div>
          <h4 className="text-lg font-bold text-gray-900">Effective Number of Parties (N)</h4>
          <p className="text-sm text-gray-600">
            The Laakso/Taagepera Index counts parties but weights them by size. 
          </p>
         </div>
         <div className="bg-violet-100 p-2 rounded-full text-violet-700">
            <Calculator className="w-6 h-6" />
         </div>
      </div>

      <div className="flex-grow flex flex-col gap-6">
         {/* Formula */}
         <div className="bg-slate-800 text-white p-4 rounded-lg text-center font-mono text-lg shadow-inner">
            N = 1 / Σ ( s<sub>i</sub><sup>2</sup> )
         </div>

         {/* Example: 2 Party */}
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded border border-blue-100">
               <h5 className="font-bold text-blue-900 text-xs uppercase mb-2">System A (2-Party)</h5>
               <div className="flex gap-1 h-2 mb-2">
                  <div className="w-1/2 bg-blue-500"></div>
                  <div className="w-1/2 bg-red-500"></div>
               </div>
               <div className="text-xs text-gray-600">50% + 50%</div>
               <div className="font-bold text-blue-800 mt-1">N = 2.0</div>
            </div>

            <div className="bg-indigo-50 p-3 rounded border border-indigo-100">
               <h5 className="font-bold text-indigo-900 text-xs uppercase mb-2">System B (Multiparty)</h5>
               <div className="flex gap-1 h-2 mb-2">
                  <div className="w-1/3 bg-blue-500"></div>
                  <div className="w-1/3 bg-red-500"></div>
                  <div className="w-1/3 bg-green-500"></div>
               </div>
               <div className="text-xs text-gray-600">33% + 33% + 33%</div>
               <div className="font-bold text-indigo-800 mt-1">N = 3.0</div>
            </div>
         </div>
         
         <div className="text-xs text-gray-500 italic mt-auto">
           A system with 10 parties where one party holds 90% of seats effectively behaves like a 1-party system (N ≈ 1.2).
         </div>
      </div>
    </div>
  );
}

const CleavageMap: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
       <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900">Lipset & Rokkan's 4 Cleavages</h4>
        <p className="text-sm text-gray-600">
          The "Frozen Cleavages" of 1920s Europe that still shape party systems today.
        </p>
      </div>

      <div className="flex-grow grid grid-cols-2 gap-4">
         {/* Cleavage 1 */}
         <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex flex-col items-center text-center">
            <div className="bg-white p-2 rounded-full mb-2 shadow-sm">
               <Cross className="w-5 h-5 text-amber-600" />
            </div>
            <h5 className="font-bold text-gray-800 text-sm">State vs. Church</h5>
            <p className="text-xs text-gray-500 mt-1">Secular Liberals vs. Religious Conservatives</p>
         </div>

         {/* Cleavage 2 */}
         <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 flex flex-col items-center text-center">
            <div className="bg-white p-2 rounded-full mb-2 shadow-sm">
               <Tractor className="w-5 h-5 text-emerald-600" />
            </div>
            <h5 className="font-bold text-gray-800 text-sm">Land vs. Industry</h5>
            <p className="text-xs text-gray-500 mt-1">Agrarian/Rural vs. Urban Industrialists</p>
         </div>

         {/* Cleavage 3 */}
         <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col items-center text-center">
            <div className="bg-white p-2 rounded-full mb-2 shadow-sm">
               <Factory className="w-5 h-5 text-blue-600" />
            </div>
            <h5 className="font-bold text-gray-800 text-sm">Owner vs. Worker</h5>
            <p className="text-xs text-gray-500 mt-1">Bourgeoisie vs. Proletariat (Class Conflict)</p>
         </div>

         {/* Cleavage 4 */}
         <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 flex flex-col items-center text-center">
            <div className="bg-white p-2 rounded-full mb-2 shadow-sm">
               <MapIcon className="w-5 h-5 text-purple-600" />
            </div>
            <h5 className="font-bold text-gray-800 text-sm">Center vs. Periphery</h5>
            <p className="text-xs text-gray-500 mt-1">National Culture vs. Regional Minorities</p>
         </div>
      </div>
    </div>
  );
}

const LeftRightSpectrum: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
       <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900">The Left-Right Spectrum</h4>
        <p className="text-sm text-gray-600">
          The dominant socioeconomic dimension in modern politics.
        </p>
      </div>

      <div className="flex-grow flex flex-col justify-center py-4">
         <div className="relative h-2 bg-gradient-to-r from-red-500 via-gray-300 to-blue-500 rounded-full w-full my-8">
            {/* Left */}
            <div className="absolute -top-8 left-0 text-center">
               <span className="font-bold text-red-600 text-xs uppercase">Left</span>
            </div>
            <div className="absolute top-4 left-0 text-center w-24">
               <span className="text-[10px] text-gray-500">State Intervention<br/>Equality</span>
            </div>

            {/* Right */}
            <div className="absolute -top-8 right-0 text-center">
               <span className="font-bold text-blue-600 text-xs uppercase">Right</span>
            </div>
             <div className="absolute top-4 right-0 text-center w-24">
               <span className="text-[10px] text-gray-500">Free Market<br/>Individualism</span>
            </div>

            {/* Parties */}
            <div className="absolute -top-3 left-[20%] w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-[8px] text-white font-bold">
               SOC
            </div>
            <div className="absolute -top-3 left-[45%] w-6 h-6 bg-yellow-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-[8px] text-white font-bold">
               LIB
            </div>
            <div className="absolute -top-3 left-[75%] w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-[8px] text-white font-bold">
               CON
            </div>
         </div>
      </div>
    </div>
  );
}

const Week4Visuals: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      <section>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="text-uwm-gold" /> Party Systems (Ch 5)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-8 max-w-3xl">
            A party system is defined not just by the number of parties, but by how they interact. 
            Lijphart focuses on the <strong>Effective Number of Parties</strong> to distinguish between 
            Two-Party (Westminster) and Multiparty (Consensus) systems.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <EnpCalculator />
             <CleavageMap />
             <LeftRightSpectrum />
          </div>
        </div>
      </section>
      
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
           <Globe className="text-uwm-gold" /> System Comparison
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Two Party */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-600">
             <h4 className="font-bold text-lg mb-2 text-blue-900">Two-Party System</h4>
             <p className="text-sm text-gray-600 mb-4">
               Dominance by two major parties. One party usually wins a majority of seats and governs alone.
             </p>
             <div className="flex gap-2 text-xs font-bold">
               <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">Example: USA, UK</span>
               <span className="bg-blue-100 px-2 py-1 rounded text-blue-600">Westminster</span>
             </div>
          </div>

          {/* Multiparty */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-indigo-600">
             <h4 className="font-bold text-lg mb-2 text-indigo-900">Multiparty System</h4>
             <p className="text-sm text-gray-600 mb-4">
               Three or more parties have significant legislative presence. Coalitions are necessary to govern.
             </p>
             <div className="flex gap-2 text-xs font-bold">
               <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">Example: Netherlands, Israel</span>
               <span className="bg-indigo-100 px-2 py-1 rounded text-indigo-600">Consensus</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const DhondtCalculator: React.FC = () => {
  const [votes, setVotes] = useState({ A: 10000, B: 6000, C: 3000, D: 1000 });
  const [seats, setSeats] = useState(5);

  const calculateDhondt = () => {
    let allocation = { A: 0, B: 0, C: 0, D: 0 };
    let rounds: { round: number, winner: string, maxVal: number, currentDivisors: any }[] = [];
    
    // Deep copy for calculation
    let currentVotes = { ...votes };
    
    for (let i = 0; i < seats; i++) {
      let maxVal = -1;
      let winner = '';
      
      // Find winner for this seat
      Object.keys(votes).forEach(party => {
        const key = party as keyof typeof votes;
        // D'Hondt formula: V / (s + 1)
        const val = votes[key] / (allocation[key] + 1);
        if (val > maxVal) {
          maxVal = val;
          winner = party;
        }
      });

      if (winner) {
        allocation[winner as keyof typeof allocation]++;
        rounds.push({
          round: i + 1,
          winner,
          maxVal,
          currentDivisors: {
            A: votes.A / (allocation.A + (winner === 'A' ? 0 : 1)), // Show value BEFORE increment for display? No, standard is V/(s+1)
            // Actually for display it's nicer to show the value that WON.
          } 
        });
      }
    }
    return allocation;
  };

  const allocation = calculateDhondt();
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h4 className="text-lg font-bold text-gray-900">D'Hondt Method Calculator</h4>
          <p className="text-sm text-gray-600">
            The most common PR formula (used in Spain, Belgium, etc.). It slightly favors large parties.
          </p>
        </div>
        <div className="bg-blue-100 p-2 rounded-full text-blue-700">
          <Calculator className="w-6 h-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-sm text-gray-700">District Seats (M): {seats}</label>
            <input 
              type="range" min="1" max="10" value={seats} 
              onChange={(e) => setSeats(parseInt(e.target.value))}
              className="w-32"
            />
          </div>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-blue-700">Party A Votes</span>
                <span>{votes.A.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="0" max="20000" step="100" value={votes.A} 
                onChange={(e) => setVotes({...votes, A: parseInt(e.target.value)})}
                className="w-full accent-blue-600"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-red-700">Party B Votes</span>
                <span>{votes.B.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="0" max="20000" step="100" value={votes.B} 
                onChange={(e) => setVotes({...votes, B: parseInt(e.target.value)})}
                className="w-full accent-red-600"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-green-700">Party C Votes</span>
                <span>{votes.C.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="0" max="20000" step="100" value={votes.C} 
                onChange={(e) => setVotes({...votes, C: parseInt(e.target.value)})}
                className="w-full accent-green-600"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-orange-700">Party D Votes</span>
                <span>{votes.D.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="0" max="20000" step="100" value={votes.D} 
                onChange={(e) => setVotes({...votes, D: parseInt(e.target.value)})}
                className="w-full accent-orange-600"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col justify-center">
          <h5 className="font-bold text-gray-800 mb-8 text-center">Seat Allocation</h5>
          <div className="flex items-end justify-center gap-4 h-40 border-b border-gray-200 pb-2 px-4">
             {Object.entries(allocation).map(([party, count]) => {
               const color = party === 'A' ? 'bg-blue-500' : party === 'B' ? 'bg-red-500' : party === 'C' ? 'bg-green-500' : 'bg-orange-500';
               const height = (count / seats) * 100;
               return (
                 <div key={party} className="flex flex-col items-center w-12 group relative">
                    <div className="absolute -top-6 font-bold text-gray-800">
                      {count}
                    </div>
                    <div 
                      className={`${color} w-full rounded-t-md transition-all duration-500 relative`}
                      style={{ height: `${Math.max(height, 2)}%` }}
                    >
                    </div>
                    <div className="mt-2 font-bold text-gray-600">{party}</div>
                 </div>
               );
             })}
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
             <div className="flex justify-between p-2 bg-gray-50 rounded">
               <span>Party A:</span>
               <span className="font-bold">{((votes.A / totalVotes) * 100).toFixed(1)}% Votes → {((allocation.A / seats) * 100).toFixed(1)}% Seats</span>
             </div>
             <div className="flex justify-between p-2 bg-gray-50 rounded">
               <span>Party B:</span>
               <span className="font-bold">{((votes.B / totalVotes) * 100).toFixed(1)}% Votes → {((allocation.B / seats) * 100).toFixed(1)}% Seats</span>
             </div>
             <div className="flex justify-between p-2 bg-gray-50 rounded">
               <span>Party C:</span>
               <span className="font-bold">{((votes.C / totalVotes) * 100).toFixed(1)}% Votes → {((allocation.C / seats) * 100).toFixed(1)}% Seats</span>
             </div>
             <div className="flex justify-between p-2 bg-gray-50 rounded">
               <span>Party D:</span>
               <span className="font-bold">{((votes.D / totalVotes) * 100).toFixed(1)}% Votes → {((allocation.D / seats) * 100).toFixed(1)}% Seats</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PluralityVsPr: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
       <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900">Plurality (FPTP) vs. PR</h4>
        <p className="text-sm text-gray-600">
          How the same vote distribution leads to different outcomes.
        </p>
      </div>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Plurality */}
         <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-3">
               <div className="p-1.5 bg-blue-100 rounded text-blue-700">
                 <Crown className="w-4 h-4" />
               </div>
               <h5 className="font-bold text-blue-900">Plurality (Winner-Take-All)</h5>
            </div>
            <p className="text-xs text-blue-800 mb-4">
               In a single-member district (M=1), the candidate with the most votes wins 100% of the power (the seat). All other votes are "wasted".
            </p>
            
            <div className="space-y-3">
               <div className="relative pt-4">
                  <div className="flex justify-between text-xs font-bold mb-1">
                     <span>Candidate A (40%)</span>
                     <span className="text-green-600">WINNER</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-600 w-[40%]"></div>
                  </div>
               </div>
               <div className="relative">
                  <div className="flex justify-between text-xs font-bold mb-1 text-gray-500">
                     <span>Candidate B (35%)</span>
                     <span>Loser</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden opacity-50">
                     <div className="h-full bg-red-500 w-[35%]"></div>
                  </div>
               </div>
               <div className="relative">
                  <div className="flex justify-between text-xs font-bold mb-1 text-gray-500">
                     <span>Candidate C (25%)</span>
                     <span>Loser</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden opacity-50">
                     <div className="h-full bg-green-500 w-[25%]"></div>
                  </div>
               </div>
            </div>
         </div>

         {/* PR */}
         <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <div className="flex items-center gap-2 mb-3">
               <div className="p-1.5 bg-indigo-100 rounded text-indigo-700">
                 <BarChart3 className="w-4 h-4" />
               </div>
               <h5 className="font-bold text-indigo-900">Proportional Representation</h5>
            </div>
            <p className="text-xs text-indigo-800 mb-4">
               In a multi-member district (e.g., M=10), seats are shared. 40% of votes ≈ 40% of seats. Fewer votes are wasted.
            </p>
            
            <div className="flex h-32 gap-1 items-end justify-center px-4">
               <div className="w-1/3 bg-blue-500 h-[40%] rounded-t flex items-center justify-center text-white text-xs font-bold">4 Seats</div>
               <div className="w-1/3 bg-red-500 h-[35%] rounded-t flex items-center justify-center text-white text-xs font-bold">3.5 Seats</div>
               <div className="w-1/3 bg-green-500 h-[25%] rounded-t flex items-center justify-center text-white text-xs font-bold">2.5 Seats</div>
            </div>
            <div className="text-center text-xs text-gray-500 mt-2">
               (Assuming 10 seat district)
            </div>
         </div>
      </div>
    </div>
  );
}

const Week5Visuals: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      <section>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Vote className="text-uwm-gold" /> Electoral Systems (Ch 8)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-8 max-w-3xl">
            Electoral systems are the "rules of the game" that determine how votes are translated into seats. 
            The two main families are <strong>Majoritarian</strong> (Plurality) and <strong>Proportional Representation</strong> (PR).
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <PluralityVsPr />
             <DhondtCalculator />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
           <MapIcon className="text-uwm-gold" /> District Magnitude (M)
        </h3>
        <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-uwm-gold">
           <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 text-center md:text-left">
                 <div className="text-6xl font-black text-gray-200 mb-2">M</div>
                 <h4 className="text-2xl font-bold text-gray-900 mb-2">District Magnitude</h4>
                 <p className="text-gray-600">
                   The number of seats elected from a single district. It is the <strong>most important</strong> variable determining proportionality.
                 </p>
              </div>
              
              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                       <span className="font-bold text-gray-800">Small M (e.g., M=1)</span>
                       <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Disproportional</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Used in US, UK, Canada.</p>
                    <div className="flex gap-1">
                       <div className="h-8 w-full bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">Winner</div>
                    </div>
                 </div>

                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                       <span className="font-bold text-gray-800">Large M (e.g., M=150)</span>
                       <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Proportional</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Used in Netherlands.</p>
                    <div className="flex gap-1">
                       <div className="h-8 w-1/4 bg-blue-500 rounded"></div>
                       <div className="h-8 w-1/4 bg-red-500 rounded"></div>
                       <div className="h-8 w-1/4 bg-green-500 rounded"></div>
                       <div className="h-8 w-1/4 bg-yellow-500 rounded"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

const Week1Visuals: React.FC = () => {
  return (
    <div className="space-y-12">
      <ScientificMethodDiagram />

      <section>
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
             <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-uwm-gold w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">The Problem</span>
             </div>
             <h4 className="text-2xl font-serif font-bold text-white mb-2">"Many Variables, Small N"</h4>
             <p className="text-slate-300 leading-relaxed">
               Lijphart (1971) identifies the core problem of comparative politics: we often have too many possible explanations (variables) and too few countries (cases) to test them on. 
               We cannot use experimental methods like chemists, so we must use logic and statistics to control our variables.
             </p>
          </div>
          
          <div className="md:w-1/2 bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20">
            <h5 className="font-bold text-uwm-gold mb-3 border-b border-white/10 pb-2">Lijphart's Solutions</h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                <span>Increase N (Add more countries)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                <span>Reduce the property space (Combine variables)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                <span><strong>Comparative Method</strong>: Focus on comparable cases.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Beaker className="text-uwm-gold" /> Methods of Political Inquiry
        </h3>
        <MethodsMatrix />
        <div className="mt-8"></div>
        <ResearchDesignComparator />
      </section>
      
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Scale className="text-uwm-gold" /> The Core Definition: Who Governs?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg border-t-8 border-blue-600 overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                   <h4 className="text-2xl font-serif font-bold text-gray-900">Majoritarian</h4>
                   <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">The Westminster Model</span>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Swords className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-bold text-gray-500 uppercase mb-1">Core Principle</h5>
                  <p className="text-gray-800 font-medium">"Government by the majority of the people."</p>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-gray-500 uppercase mb-1">Key Traits</h5>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Exclusive & Competitive</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Adversarial (Govt vs Opposition)</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Winner-takes-all</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-8 py-4 text-xs text-gray-500 border-t border-gray-100">
              Typical Example: United Kingdom
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-t-8 border-indigo-600 overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                   <h4 className="text-2xl font-serif font-bold text-gray-900">Consensus</h4>
                   <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">The Consensus Model</span>
                </div>
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Handshake className="w-8 h-8 text-indigo-600" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-bold text-gray-500 uppercase mb-1">Core Principle</h5>
                  <p className="text-gray-800 font-medium">"Government by as many people as possible."</p>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-gray-500 uppercase mb-1">Key Traits</h5>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>Inclusive & Bargaining</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>Compromise-oriented</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>Power-sharing</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-8 py-4 text-xs text-gray-500 border-t border-gray-100">
              Typical Example: Switzerland, Belgium
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ManufacturedMajorityChart: React.FC = () => {
  const data = [
    { name: 'Labour', votes: 35.2, seats: 55.2, fill: '#ef4444' },
    { name: 'Conservative', votes: 32.4, seats: 30.7, fill: '#3b82f6' },
    { name: 'Lib Dem', votes: 22.0, seats: 9.6, fill: '#eab308' },
    { name: 'Others', votes: 10.4, seats: 4.5, fill: '#94a3b8' }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900">The "Manufactured Majority"</h4>
        <p className="text-sm text-gray-600">
          How First-Past-The-Post (FPTP) creates parliamentary majorities from minority votes. 
          Notice how the winner (Labour) gets a "seat bonus" while smaller parties (Lib Dem) are punished.
        </p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" unit="%" domain={[0, 60]} />
            <YAxis dataKey="name" type="category" width={80} style={{ fontSize: '12px', fontWeight: 'bold' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="votes" name="Percent of Votes" fill="#9ca3af" barSize={15} radius={[0, 4, 4, 0]} />
            <Bar dataKey="seats" name="Percent of Seats" fill="#1e3a8a" barSize={15} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const FusionOfPowerDiagram: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900">Fusion of Power (UK)</h4>
        <p className="text-sm text-gray-600">
          Unlike the US Separation of Powers, the UK Executive is <strong>inside</strong> the Legislature.
        </p>
      </div>

      <div className="flex-grow flex items-center justify-center py-4">
        <div className="relative w-64 h-64">
           {/* Voters */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center">
             <div className="flex justify-center gap-1 mb-1">
               <Users className="w-5 h-5 text-gray-400" />
               <Users className="w-5 h-5 text-gray-400" />
               <Users className="w-5 h-5 text-gray-400" />
             </div>
             <span className="text-xs font-bold uppercase text-gray-500 tracking-widest">Voters</span>
             <ArrowDown className="w-6 h-6 text-gray-300 mx-auto mt-1" />
           </div>

           {/* Parliament Box */}
           <div className="absolute top-20 left-0 w-full h-40 border-4 border-slate-800 rounded-xl bg-slate-50 flex flex-col items-center pt-2">
              <span className="text-sm font-black text-slate-800 uppercase">Parliament</span>
              <span className="text-xs text-slate-500">(Legislature)</span>

              {/* Cabinet Box (Inside) */}
              <div className="mt-4 w-3/4 h-20 bg-uwm-gold rounded-lg shadow-lg flex flex-col items-center justify-center text-white relative">
                 <span className="font-bold">Cabinet</span>
                 <span className="text-xs opacity-80">(Executive)</span>
                 
                 {/* Connection Lines */}
                 <div className="absolute -top-4 w-0.5 h-4 bg-gray-400"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const AdversarialSeatingChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900">Adversarial Architecture</h4>
        <p className="text-sm text-gray-600">
          The physical layout of the House of Commons forces a "Government vs. Opposition" dynamic.
        </p>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center gap-8">
         {/* UK Layout */}
         <div className="relative w-48 h-32 border-2 border-slate-200 rounded-lg p-2 bg-slate-50">
            <span className="absolute top-1 left-1 text-[10px] font-bold text-slate-400">UK COMMONS</span>
            
            {/* Government Benches */}
            <div className="absolute left-2 top-8 bottom-8 w-8 bg-blue-100 border border-blue-300 rounded flex flex-col justify-center items-center">
               <span className="text-[8px] font-bold text-blue-800 -rotate-90">GOVT</span>
            </div>
            
            {/* Table */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-16 bg-uwm-gold rounded opacity-50"></div>

            {/* Opposition Benches */}
            <div className="absolute right-2 top-8 bottom-8 w-8 bg-red-100 border border-red-300 rounded flex flex-col justify-center items-center">
               <span className="text-[8px] font-bold text-red-800 rotate-90">OPPOSITION</span>
            </div>

            {/* Swords Line */}
            <div className="absolute bottom-2 w-full text-center text-[8px] text-slate-400 italic">
               "Two sword lengths apart"
            </div>
         </div>

         <div className="text-xs text-center text-gray-500 max-w-[200px]">
            <strong>Consequence:</strong> Debate is confrontational. You support the government or you oppose it.
         </div>
      </div>
    </div>
  );
};

const AsymmetricBicameralism: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
       <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900">Asymmetric Bicameralism</h4>
        <p className="text-sm text-gray-600">
          In the Westminster model, the two chambers are not equal. The Lower House reigns supreme.
        </p>
      </div>
      
      <div className="flex-grow flex items-end justify-center gap-4 pb-4 border-b border-gray-100 relative">
         {/* House of Lords */}
         <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-gray-400">House of Lords</span>
            <div className="w-16 h-24 bg-gray-200 rounded-t-lg flex items-center justify-center text-center p-2 text-xs text-gray-500">
               Delay Power Only
            </div>
            <div className="w-20 h-2 bg-gray-300 rounded-full"></div>
         </div>

         {/* Scale Fulcrum */}
         <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-gray-800"></div>

         {/* House of Commons */}
         <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-uwm-black">House of Commons</span>
            <div className="w-24 h-40 bg-uwm-black rounded-t-lg flex items-center justify-center text-center p-2 text-xs text-white shadow-xl">
               <div className="space-y-2">
                 <Crown className="w-6 h-6 mx-auto text-uwm-gold" />
                 <span>Supreme Authority</span>
               </div>
            </div>
            <div className="w-28 h-2 bg-gray-800 rounded-full"></div>
         </div>
      </div>
      <div className="pt-4 text-xs text-gray-500 text-center">
         The "Fusion of Power" resides almost entirely in the Commons.
      </div>
    </div>
  )
}

const Week2Visuals: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      <section>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Crown className="text-uwm-gold" /> The Westminster Model
          </h3>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
               <p className="text-gray-700 leading-relaxed mb-4">
                 The Westminster model is the "majoritarian" prototype of democracy. It is named after the Palace of Westminster in London. Its core principle is that the winner of an election should have the power to govern and enact their policy agenda without significant checks and balances, so voters can hold them accountable at the next election.
               </p>
               <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-2 text-sm uppercase">Key Philosophy</h4>
                  <p className="text-blue-800 text-sm italic">
                    "The majority of the people (50% + 1) should rule."
                  </p>
               </div>
            </div>

            <div className="md:w-1/2 bg-slate-50 p-6 rounded-lg border border-slate-100">
               <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase border-b border-slate-200 pb-2">10 Key Variables (Majoritarian)</h4>
               <ul className="space-y-2 text-sm text-slate-700">
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>One-party bare majority cabinets</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>Cabinet dominance</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>Two-party system</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>Majoritarian/Plurality elections</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>Pluralist interest groups</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>Unitary & centralized</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>Unicameralism (or asymmetric)</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>Flexible constitutions</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>No judicial review</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>Dependent central bank</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-1">
            <ManufacturedMajorityChart />
         </div>
         <div className="lg:col-span-1">
            <FusionOfPowerDiagram />
         </div>
         <div className="lg:col-span-1">
            <AdversarialSeatingChart />
         </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <AsymmetricBicameralism />
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
            <div className="bg-slate-900 text-white p-4 rounded-full mb-4">
               <Gavel className="w-8 h-8 text-uwm-gold" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">No Judicial Review</h4>
            <p className="text-sm text-gray-600 mb-4">
              Historically, the UK Parliament was sovereign. No court could strike down an Act of Parliament.
              <br/><span className="text-xs text-gray-400 italic">(Note: Changed slightly with UK Supreme Court in 2009, but principle remains strong)</span>
            </p>
         </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
           <Globe className="text-uwm-gold" /> Case Study: United Kingdom
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-2">
              <h4 className="font-bold text-gray-900 mb-2">Why is it the prototype?</h4>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                The UK combines nearly all the majoritarian features. The cabinet is usually composed of a single party that has a majority in the House of Commons. The executive (PM & Cabinet) dominates the legislature. The "First-Past-The-Post" electoral system manufactures majorities even when the winning party gets less than 50% of the vote.
              </p>
              <div className="bg-yellow-50 p-3 rounded border border-yellow-100 text-xs text-yellow-800">
                 <strong>Note:</strong> The UK has deviated recently with the creation of the Supreme Court (2009) and devolution to Scotland/Wales, moving slightly away from the pure model.
              </div>
           </div>
           
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="text-6xl font-black text-gray-100 mb-2">UK</div>
              <p className="text-sm font-bold text-gray-400">The Westminster Prototype</p>
           </div>
        </div>
      </section>
    </div>
  );
};

// --- WEEK 3 VISUALS ---

const SwissMagicFormula: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
       <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900">The "Magic Formula" (Zauberformel)</h4>
        <p className="text-sm text-gray-600">
          The Swiss Federal Council (Executive) is a Grand Coalition of the four major parties. 
          From 1959-2003, seats were fixed at 2:2:2:1.
        </p>
      </div>

      <div className="flex-grow flex items-center justify-center gap-2">
         {/* FDP */}
         <div className="flex flex-col items-center gap-1">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg border border-blue-200 flex flex-col items-center w-16">
               <Users className="w-5 h-5 mb-1" />
               <span className="font-bold text-lg">2</span>
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase">FDP</span>
         </div>
         <span className="text-gray-300 font-bold">+</span>
         {/* CVP */}
         <div className="flex flex-col items-center gap-1">
            <div className="bg-orange-100 text-orange-600 p-2 rounded-lg border border-orange-200 flex flex-col items-center w-16">
               <Users className="w-5 h-5 mb-1" />
               <span className="font-bold text-lg">2</span>
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase">CVP</span>
         </div>
         <span className="text-gray-300 font-bold">+</span>
         {/* SPS */}
         <div className="flex flex-col items-center gap-1">
            <div className="bg-red-100 text-red-600 p-2 rounded-lg border border-red-200 flex flex-col items-center w-16">
               <Users className="w-5 h-5 mb-1" />
               <span className="font-bold text-lg">2</span>
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase">SPS</span>
         </div>
         <span className="text-gray-300 font-bold">+</span>
         {/* SVP */}
         <div className="flex flex-col items-center gap-1">
            <div className="bg-green-100 text-green-600 p-2 rounded-lg border border-green-200 flex flex-col items-center w-16">
               <Users className="w-5 h-5 mb-1" />
               <span className="font-bold text-lg">1</span>
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase">SVP</span>
         </div>
      </div>
      
      <div className="mt-6 bg-slate-50 p-3 rounded-lg text-xs text-slate-600 text-center">
         This ensures 70-80% of voters are represented in the government at all times.
      </div>
    </div>
  );
}

const SwissDirectDemocracy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'referendum' | 'initiative'>('referendum');

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
       <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900">Direct Democracy</h4>
        <p className="text-sm text-gray-600">
          Switzerland allows citizens to challenge laws or propose amendments directly.
        </p>
      </div>

      <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
        <button 
          onClick={() => setActiveTab('referendum')}
          className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${activeTab === 'referendum' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500'}`}
        >
          Optional Referendum
        </button>
        <button 
          onClick={() => setActiveTab('initiative')}
          className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${activeTab === 'initiative' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
        >
          Popular Initiative
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
         {activeTab === 'referendum' ? (
           <div className="animate-fade-in space-y-4">
             <div className="flex justify-center mb-2">
               <Vote className="w-12 h-12 text-red-500" />
             </div>
             <h5 className="font-bold text-gray-800">Challenge a Law</h5>
             <p className="text-xs text-gray-600">
               If Parliament passes a law you dislike, you can stop it.
             </p>
             <div className="flex gap-2 justify-center text-xs font-mono bg-white p-2 rounded border">
                <span className="text-red-600 font-bold">50,000</span>
                <span>Signatures</span>
                <span className="text-gray-400">in 100 days</span>
             </div>
             <div className="text-[10px] text-gray-500 mt-2">
               Result: National vote (Simple Majority)
             </div>
           </div>
         ) : (
           <div className="animate-fade-in space-y-4">
             <div className="flex justify-center mb-2">
               <FileText className="w-12 h-12 text-blue-500" />
             </div>
             <h5 className="font-bold text-gray-800">Change Constitution</h5>
             <p className="text-xs text-gray-600">
               Propose a new amendment to the Federal Constitution.
             </p>
             <div className="flex gap-2 justify-center text-xs font-mono bg-white p-2 rounded border">
                <span className="text-blue-600 font-bold">100,000</span>
                <span>Signatures</span>
                <span className="text-gray-400">in 18 months</span>
             </div>
             <div className="text-[10px] text-gray-500 mt-2">
               Result: National vote (Double Majority: People + Cantons)
             </div>
           </div>
         )}
      </div>
    </div>
  );
}

const BelgiumFederalismPuzzle: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
       <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900">The Belgian "Layer Cake"</h4>
        <p className="text-sm text-gray-600">
          Belgium has "Incongruent Federalism" with two overlapping layers of government.
        </p>
      </div>

      <div className="flex-grow space-y-4">
         {/* Layer 1: Regions */}
         <div className="relative border-2 border-dashed border-emerald-200 rounded-lg p-3 bg-emerald-50">
            <span className="absolute -top-3 left-2 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
               Layer 1: Regions (Territory)
            </span>
            <div className="flex gap-2 mt-2">
               <div className="flex-1 bg-white p-2 rounded text-center shadow-sm border border-emerald-100">
                  <MapIcon className="w-4 h-4 mx-auto text-emerald-500 mb-1" />
                  <span className="text-[10px] font-bold text-emerald-900">Flanders</span>
               </div>
               <div className="flex-1 bg-white p-2 rounded text-center shadow-sm border border-emerald-100">
                  <MapIcon className="w-4 h-4 mx-auto text-emerald-500 mb-1" />
                  <span className="text-[10px] font-bold text-emerald-900">Brussels</span>
               </div>
               <div className="flex-1 bg-white p-2 rounded text-center shadow-sm border border-emerald-100">
                  <MapIcon className="w-4 h-4 mx-auto text-emerald-500 mb-1" />
                  <span className="text-[10px] font-bold text-emerald-900">Wallonia</span>
               </div>
            </div>
            <p className="text-[10px] text-emerald-700 mt-2 text-center">Powers: Economy, Transport, Environment</p>
         </div>

         {/* Layer 2: Communities */}
         <div className="relative border-2 border-dashed border-indigo-200 rounded-lg p-3 bg-indigo-50">
            <span className="absolute -top-3 left-2 bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
               Layer 2: Communities (People)
            </span>
            <div className="flex gap-2 mt-2">
               <div className="flex-1 bg-white p-2 rounded text-center shadow-sm border border-indigo-100">
                  <MessageSquare className="w-4 h-4 mx-auto text-indigo-500 mb-1" />
                  <span className="text-[10px] font-bold text-indigo-900">Dutch</span>
               </div>
               <div className="flex-1 bg-white p-2 rounded text-center shadow-sm border border-indigo-100">
                  <MessageSquare className="w-4 h-4 mx-auto text-indigo-500 mb-1" />
                  <span className="text-[10px] font-bold text-indigo-900">French</span>
               </div>
               <div className="flex-1 bg-white p-2 rounded text-center shadow-sm border border-indigo-100">
                  <MessageSquare className="w-4 h-4 mx-auto text-indigo-500 mb-1" />
                  <span className="text-[10px] font-bold text-indigo-900">German</span>
               </div>
            </div>
            <p className="text-[10px] text-indigo-700 mt-2 text-center">Powers: Language, Culture, Education</p>
         </div>
      </div>
    </div>
  );
}

const EuConsensusTriangle: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
       <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900">EU: The Consensus Machine</h4>
        <p className="text-sm text-gray-600">
          The EU functions as a super-consensus system requiring agreement among 3 bodies.
        </p>
      </div>

      <div className="flex-grow relative h-48">
         {/* Top: Commission */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="bg-blue-600 text-white p-2 rounded-lg shadow-lg mb-1">
               <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-blue-900 uppercase">Commission</span>
            <span className="text-[9px] text-gray-400">Union Interest</span>
         </div>

         {/* Left: Parliament */}
         <div className="absolute bottom-0 left-0 flex flex-col items-center">
            <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg mb-1">
               <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-blue-900 uppercase">Parliament</span>
            <span className="text-[9px] text-gray-400">Citizens' Interest</span>
         </div>

         {/* Right: Council */}
         <div className="absolute bottom-0 right-0 flex flex-col items-center">
            <div className="bg-blue-800 text-white p-2 rounded-lg shadow-lg mb-1">
               <Flag className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-blue-900 uppercase">Council</span>
            <span className="text-[9px] text-gray-400">States' Interest</span>
         </div>

         {/* Connecting Arrows */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none z-[-1]">
            <path d="M 130 40 L 50 140" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 170 40 L 250 140" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 60 150 L 240 150" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
         </svg>
         
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-uwm-gold text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-sm">
            Co-Decision
         </div>
      </div>
    </div>
  );
}

const CorporatismDiagram: React.FC = () => {
   return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
       <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900">Democratic Corporatism</h4>
        <p className="text-sm text-gray-600">
          Interest groups (unions, employers) are organized and integrated into the policy-making process ("Social Partnership").
        </p>
      </div>
       
       <div className="flex-grow relative flex items-center justify-center py-4">
          {/* Triangle Structure */}
          <div className="relative w-64 h-48">
             {/* Top: State */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                <div className="bg-slate-800 text-white p-3 rounded-full shadow-lg">
                   <Landmark className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800 mt-1 uppercase">State</span>
             </div>

             {/* Left: Labor */}
             <div className="absolute bottom-0 left-0 flex flex-col items-center z-10">
                <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg">
                   <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-blue-800 mt-1 uppercase">Labor</span>
             </div>

             {/* Right: Business */}
             <div className="absolute bottom-0 right-0 flex flex-col items-center z-10">
                <div className="bg-emerald-600 text-white p-3 rounded-full shadow-lg">
                   <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-emerald-800 mt-1 uppercase">Business</span>
             </div>

             {/* Connecting Lines */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* State to Labor */}
                <line x1="50%" y1="20%" x2="15%" y2="80%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                {/* State to Business */}
                <line x1="50%" y1="20%" x2="85%" y2="80%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                {/* Labor to Business (The Partnership) */}
                <line x1="15%" y1="80%" x2="85%" y2="80%" stroke="#3b82f6" strokeWidth="4" />
             </svg>
             
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-2 text-[10px] font-bold text-blue-500 border border-blue-200 rounded-full whitespace-nowrap">
                Collective Bargaining
             </div>
          </div>
       </div>
    </div>
   );
}

const PRAlignmentChart: React.FC = () => {
  const data = [
      { name: 'Party A', votes: 30, seats: 30, fill: '#3b82f6' },
      { name: 'Party B', votes: 25, seats: 25, fill: '#ef4444' },
      { name: 'Party C', votes: 20, seats: 20, fill: '#22c55e' },
      { name: 'Party D', votes: 15, seats: 15, fill: '#eab308' },
      { name: 'Small', votes: 10, seats: 10, fill: '#94a3b8' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h4 className="text-lg font-bold text-gray-900">Proportional Representation</h4>
          <p className="text-sm text-gray-600">
            In Consensus models, the goal is proportionality. If a party gets 10% of the vote, they should get ~10% of the seats.
          </p>
        </div>
        <div className="bg-green-100 p-2 rounded-full text-green-700">
           <Scale className="w-6 h-6" />
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" unit="%" domain={[0, 40]} />
            <YAxis dataKey="name" type="category" width={60} style={{ fontSize: '12px', fontWeight: 'bold' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="votes" name="Percent of Votes" fill="#9ca3af" barSize={15} radius={[0, 4, 4, 0]} />
            <Bar dataKey="seats" name="Percent of Seats" fill="#22c55e" barSize={15} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const Week3Visuals: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
       {/* Intro */}
       <section>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
             <Handshake className="text-uwm-gold" /> The Consensus Model
           </h3>
           <div className="flex flex-col md:flex-row gap-8">
             <div className="md:w-1/2">
                <p className="text-gray-700 leading-relaxed mb-4">
                  While the Westminster model concentrates power, the Consensus model <strong>shares, disperses, and limits power</strong>.
                  It is designed for plural societies (divided by religion, language, ethnicity) where majority rule would be dangerous.
                  Instead of "Government vs. Opposition", it emphasizes "Rule by Consensus".
                </p>
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                   <h4 className="font-bold text-indigo-900 mb-2 text-sm uppercase">Key Philosophy</h4>
                   <p className="text-indigo-800 text-sm italic">
                     "The majority should not rule alone; minorities must be included."
                   </p>
                </div>
             </div>
             
             <div className="md:w-1/2 bg-slate-50 p-6 rounded-lg border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase border-b border-slate-200 pb-2">10 Key Variables (Consensus)</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full"></div>Executive power-sharing (Coalitions)</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full"></div>Balance of power (Exec-Leg)</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full"></div>Multiparty system</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full"></div>Proportional Representation</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full"></div>Corporatism (Interest Groups)</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full"></div>Federal & Decentralized</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full"></div>Strong Bicameralism</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full"></div>Rigid Constitution</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full"></div>Judicial Review</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full"></div>Independent Central Bank</li>
                </ul>
             </div>
           </div>
         </div>
       </section>

       {/* Switzerland Section */}
       <section>
          <div className="flex items-center gap-2 mb-6">
             <Globe className="text-uwm-gold w-6 h-6" />
             <h3 className="text-xl font-bold text-gray-800">Case Study: Switzerland</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SwissMagicFormula />
            <SwissDirectDemocracy />
          </div>
       </section>

       {/* Belgium & EU Section */}
       <section>
          <div className="flex items-center gap-2 mb-6">
             <Globe className="text-uwm-gold w-6 h-6" />
             <h3 className="text-xl font-bold text-gray-800">Case Study: Belgium & The EU</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BelgiumFederalismPuzzle />
            <EuConsensusTriangle />
          </div>
       </section>

       {/* General Concepts */}
       <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
             <CorporatismDiagram />
          </div>
          <div className="md:col-span-2">
             <PRAlignmentChart />
          </div>
       </section>
    </div>
  )
}

export default ScheduleView;
