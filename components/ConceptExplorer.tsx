import React, { useState } from 'react';
import { DEMOCRACY_DIMENSIONS } from '../constants';
import { ArrowRightLeft, Info, BookOpen } from 'lucide-react';

const ConceptExplorer: React.FC = () => {
  const [activeDimension, setActiveDimension] = useState<string | null>(null);

  const dimensionsParties = DEMOCRACY_DIMENSIONS.filter(d => d.category === 'executives-parties');
  const dimensionsFederal = DEMOCRACY_DIMENSIONS.filter(d => d.category === 'federal-unitary');

  const DimensionList = ({ title, dims }: { title: string, dims: typeof DEMOCRACY_DIMENSIONS }) => (
    <div className="mb-6 last:mb-0">
      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">{title}</h4>
      <div className="space-y-1">
        {dims.map((dim) => (
          <button
            key={dim.id}
            onClick={() => setActiveDimension(dim.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex justify-between items-center group ${
              activeDimension === dim.id 
                ? 'bg-uwm-black text-white shadow-md' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <span className="font-medium">{dim.name}</span>
            {activeDimension === dim.id && <ArrowRightLeft className="w-4 h-4 text-uwm-gold" />}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-uwm-gold">
        <h2 className="text-2xl font-serif font-bold text-uwm-black">The Two Dimensions of Democracy</h2>
        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
          Lijphart identifies ten variables that distinguish majoritarian from consensus democracy. 
          These variables cluster into two clear dimensions: the <strong>Executives-Parties</strong> dimension 
          (joint power) and the <strong>Federal-Unitary</strong> dimension (divided power).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
        {/* List of Dimensions */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 overflow-y-auto max-h-[700px]">
          <DimensionList title="Dimension I: Executives-Parties" dims={dimensionsParties} />
          <div className="border-t border-gray-100 my-4"></div>
          <DimensionList title="Dimension II: Federal-Unitary" dims={dimensionsFederal} />
        </div>

        {/* Comparison View */}
        <div className="lg:col-span-2">
          {activeDimension ? (
            (() => {
              const dim = DEMOCRACY_DIMENSIONS.find(d => d.id === activeDimension)!;
              return (
                <div className="space-y-6 animate-fade-in h-full flex flex-col">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">{dim.name}</h3>
                      <div className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        <BookOpen className="w-3 h-3" />
                        Chapter {dim.chapter}
                      </div>
                    </div>
                    <p className="text-gray-600 flex items-start gap-2">
                      <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      {dim.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                    {/* Westminster Card */}
                    <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-6 rounded-xl shadow-lg transform transition hover:scale-[1.02] flex flex-col">
                      <div className="flex items-center justify-between mb-6 border-b border-white/20 pb-4">
                        <h4 className="font-serif text-xl font-bold text-blue-200">Westminster</h4>
                        <span className="text-xs font-bold uppercase tracking-widest bg-blue-500/20 px-2 py-1 rounded text-blue-100">Majoritarian</span>
                      </div>
                      <div className="flex-grow flex items-center justify-center text-center">
                        <p className="text-xl font-medium leading-relaxed">{dim.westminster}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-white/10 text-xs text-blue-300 opacity-80 flex justify-between">
                         <span>Model Characteristics</span>
                         <span>Exclusive</span>
                      </div>
                    </div>

                    {/* Consensus Card */}
                    <div className="bg-gradient-to-br from-indigo-700 to-blue-800 text-white p-6 rounded-xl shadow-lg transform transition hover:scale-[1.02] flex flex-col">
                      <div className="flex items-center justify-between mb-6 border-b border-white/20 pb-4">
                        <h4 className="font-serif text-xl font-bold text-indigo-100">Consensus</h4>
                        <span className="text-xs font-bold uppercase tracking-widest bg-indigo-900/20 px-2 py-1 rounded text-indigo-50">Inclusive</span>
                      </div>
                      <div className="flex-grow flex items-center justify-center text-center">
                        <p className="text-xl font-medium leading-relaxed">{dim.consensus}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-white/10 text-xs text-indigo-200 opacity-80 flex justify-between">
                         <span>Model Characteristics</span>
                         <span>Power-Sharing</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <ArrowRightLeft className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium">Select a variable to compare models</p>
              <p className="text-sm mt-2 opacity-60 max-w-md text-center">Explore how the Westminster and Consensus models differ across the ten key institutional variables.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConceptExplorer;