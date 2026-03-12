
import React, { useState, useEffect, useRef } from 'react';
import { DEMOCRACY_DIMENSIONS, CONCEPT_FLASHCARDS, QUIZ_LEVELS, APPROVED_COUNTRIES } from '../constants';
import { Flashcard, QuizLevel, QuizQuestion } from '../types';
import { 
  Layers, Brain, ChevronLeft, ChevronRight, Trophy, Lock, Unlock, 
  CheckCircle, XCircle, RotateCcw, Timer, Zap, Map, Info, HelpCircle,
  Presentation, Users, Shuffle, Copy, Edit3, Trash2, UserMinus, UserCheck
} from 'lucide-react';
import LiveSession from './LiveSession'; // Import the new component

type Mode = 'menu' | 'flashcards' | 'quiz' | 'mania' | 'profiler' | 'live' | 'randomizer';

const CLASS_ROSTER = [
  "Blakeman, Ellyn Mary",
  "Bosetski, Paige Elizabeth",
  "Charles, Dominique Alakeh",
  "Clark-Bailey, Constance G",
  "Czaplewski, Layla Grace",
  "Fatayer, Salam",
  "Gerber, Skylar Jean",
  "Grajkowski, Sydney Grace",
  "Kipfer, Jay",
  "Krause, Daniel Carl",
  "Lane, William Ishaq",
  "Marin, Aiden Nathaniel",
  "May, Bri",
  "Montenegro Nevarez, Suheidy",
  "Pangerc, Colby",
  "Roop, Robert Walker",
  "Sanchez, Jurgen Javier",
  "Simonova, Sara",
  "Spivey, Jonathan",
  "Steffen, Cade Martin",
  "Tackett, Ethan Robert",
  "Wagner, Kaylyn Rae",
  "Wery-Trejo, Jacqueline Rosa",
  "Zavala, Natalie"
];

const StudyCenter: React.FC = () => {
  const [mode, setMode] = useState<Mode>('menu');

  return (
    <div className="h-full flex flex-col animate-fade-in">
      {mode === 'menu' && <StudyMenu onSelect={setMode} />}
      {mode === 'flashcards' && <FlashcardDeckSelection onBack={() => setMode('menu')} />}
      {mode === 'quiz' && <QuizLevelSelect onBack={() => setMode('menu')} />}
      {mode === 'mania' && <ModelMania onBack={() => setMode('menu')} />}
      {mode === 'profiler' && <CountryProfiler onBack={() => setMode('menu')} />}
      {mode === 'live' && <LiveSession onBack={() => setMode('menu')} />}
      {mode === 'randomizer' && <GroupRandomizer onBack={() => setMode('menu')} />}
    </div>
  );
};

const StudyMenu: React.FC<{ onSelect: (mode: Mode) => void }> = ({ onSelect }) => (
  <div className="max-w-6xl mx-auto w-full space-y-8 p-4">
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-serif font-bold text-uwm-black">Study Center</h2>
      <p className="text-gray-600">Master the Lijphart Framework through interactive gameplay.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      <MenuCard 
        title="Flashcards" 
        desc="Core dimensions and key terminology review." 
        icon={<Layers size={28} />}
        color="bg-blue-50 text-blue-600"
        onClick={() => onSelect('flashcards')}
      />
      <MenuCard 
        title="Tiered Quiz" 
        desc="Novice to Expert. Unlock levels by scoring 70%." 
        icon={<Brain size={28} />}
        color="bg-indigo-50 text-indigo-600"
        onClick={() => onSelect('quiz')}
      />
      <MenuCard 
        title="Model Mania" 
        desc="Sort traits into buckets in a race against time." 
        icon={<Zap size={28} />}
        color="bg-amber-50 text-amber-600"
        onClick={() => onSelect('mania')}
      />
      <MenuCard 
        title="Country Profiler" 
        desc="Identify countries based on their institutions." 
        icon={<Map size={28} />}
        color="bg-emerald-50 text-emerald-600"
        onClick={() => onSelect('profiler')}
      />
      <MenuCard 
        title="Live Session" 
        desc="Game in class" 
        icon={<Presentation size={28} />}
        color="bg-rose-50 text-rose-600"
        onClick={() => onSelect('live')}
      />
      <MenuCard 
        title="Group Randomizer" 
        desc="Instantly organize class into random groups." 
        icon={<Users size={28} />}
        color="bg-violet-50 text-violet-600"
        onClick={() => onSelect('randomizer')}
      />
    </div>
  </div>
);

const MenuCard = ({ title, desc, icon, color, onClick }: any) => (
  <button 
    onClick={onClick}
    className="group bg-white p-6 rounded-xl shadow-sm border-2 border-transparent hover:border-uwm-gold transition-all flex flex-col items-center text-center space-y-4 h-full"
  >
    <div className={`w-14 h-14 ${color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-900 leading-tight">{title}</h3>
      <p className="text-xs text-gray-500 mt-2">{desc}</p>
    </div>
  </button>
);

// --- NEW TOOL: GROUP RANDOMIZER ---

const GroupRandomizer: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [students, setStudents] = useState<{name: string, isPresent: boolean}[]>(
    CLASS_ROSTER.map(name => ({ name, isPresent: true }))
  );
  const [numGroups, setNumGroups] = useState(6);
  const [groups, setGroups] = useState<string[][]>([]);
  const [generated, setGenerated] = useState(false);

  const togglePresence = (index: number) => {
    const newStudents = [...students];
    newStudents[index].isPresent = !newStudents[index].isPresent;
    setStudents(newStudents);
  };

  const handleGenerate = () => {
    const activeNames = students.filter(s => s.isPresent).map(s => s.name);
    
    if (activeNames.length === 0) return;

    // Fisher-Yates Shuffle
    const names = [...activeNames];
    for (let i = names.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [names[i], names[j]] = [names[j], names[i]];
    }

    // Distribute into groups (Round Robin to ensure even distribution)
    const newGroups: string[][] = Array.from({ length: numGroups }, () => []);
    
    names.forEach((name, index) => {
      newGroups[index % numGroups].push(name);
    });

    // Remove empty groups if names < numGroups
    setGroups(newGroups.filter(g => g.length > 0));
    setGenerated(true);
  };

  const handleCopyToClipboard = (groupIndex: number, groupMembers: string[]) => {
    const text = `Group ${groupIndex + 1}: ${groupMembers.join(', ')}`;
    navigator.clipboard.writeText(text);
  };

  const presentCount = students.filter(s => s.isPresent).length;

  return (
    <div className="max-w-6xl mx-auto w-full p-4 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-uwm-black">← Back to Menu</button>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="text-violet-600" /> Class Group Generator
        </h2>
      </div>

      {!generated ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-100 pb-4 gap-4">
               <div>
                  <h3 className="font-bold text-gray-800 text-lg">Daily Attendance</h3>
                  <p className="text-sm text-gray-500">
                    Click the icon to mark students absent before generating groups.
                  </p>
               </div>
               <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg">
                  <span className="text-sm font-bold text-gray-600">Present: {presentCount} / {students.length}</span>
                  <button 
                    onClick={() => setStudents(students.map(s => ({ ...s, isPresent: true })))}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Reset All
                  </button>
               </div>
            </div>

            {/* Student Roster Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto pr-2">
              {students.map((student, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                    student.isPresent 
                      ? 'bg-white border-gray-200 hover:border-violet-300' 
                      : 'bg-gray-100 border-gray-200 opacity-60'
                  }`}
                >
                  <span className={`text-sm font-medium ${student.isPresent ? 'text-gray-800' : 'text-gray-400 line-through'}`}>
                    {student.name}
                  </span>
                  <button
                    onClick={() => togglePresence(idx)}
                    className={`p-1.5 rounded-full transition-colors ${
                      student.isPresent 
                        ? 'text-gray-400 hover:bg-red-100 hover:text-red-500' 
                        : 'text-gray-400 hover:bg-green-100 hover:text-green-500'
                    }`}
                    title={student.isPresent ? "Mark Absent" : "Mark Present"}
                  >
                    {student.isPresent ? <UserMinus size={16} /> : <UserCheck size={16} />}
                  </button>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-6 items-center bg-gray-50 p-4 rounded-lg mt-6 border border-gray-100">
              <div className="flex-1 w-full">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Number of Groups: <span className="text-violet-600 text-lg">{numGroups}</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={numGroups}
                  onChange={(e) => setNumGroups(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
              </div>
              <div className="flex-shrink-0">
                 <button
                  onClick={handleGenerate}
                  disabled={presentCount < 2}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Shuffle size={20} /> Generate Groups
                </button>
              </div>
            </div>
            
            <div className="flex justify-center text-xs text-gray-400">
               <span>Algorithm: Fisher-Yates Shuffle (Unbiased)</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm sticky top-0 z-10">
             <div className="text-sm text-gray-500 font-bold">
               {groups.flat().length} Students • {groups.length} Groups
             </div>
             <div className="flex gap-2">
               <button 
                 onClick={() => setGenerated(false)} 
                 className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-black flex items-center gap-2"
               >
                 <Edit3 size={16} /> Adjust Attendance
               </button>
               <button 
                 onClick={handleGenerate} 
                 className="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg text-sm font-bold hover:bg-violet-200 flex items-center gap-2"
               >
                 <RotateCcw size={16} /> Re-Shuffle
               </button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-50">
                  <h3 className="font-bold text-gray-800 text-lg">Group {idx + 1}</h3>
                  <button 
                    onClick={() => handleCopyToClipboard(idx, group)}
                    className="text-gray-400 hover:text-violet-600 p-1 rounded hover:bg-violet-50 transition-colors"
                    title="Copy group list"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <ul className="space-y-2">
                  {group.map((student, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2 text-gray-600 text-sm">
                      <div className="w-6 h-6 rounded-full bg-violet-50 text-violet-500 text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {student.charAt(0).toUpperCase()}
                      </div>
                      {student}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- NEW GAME: MODEL MANIA (SORTING) ---

const ModelMania: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentTrait, setCurrentTrait] = useState<{ text: string, type: 'W' | 'C' } | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const traits = [
    { text: "Single-party majority cabinets", type: 'W' },
    { text: "Executive power-sharing", type: 'C' },
    { text: "Two-party system", type: 'W' },
    { text: "Multiparty system", type: 'C' },
    { text: "Proportional Representation", type: 'C' },
    { text: "Plurality elections", type: 'W' },
    { text: "Unitary & Centralized", type: 'W' },
    { text: "Federal & Decentralized", type: 'C' },
    { text: "Unicameral legislature", type: 'W' },
    { text: "Strong bicameralism", type: 'C' },
    { text: "Flexible constitution", type: 'W' },
    { text: "Rigid constitution", type: 'C' },
    { text: "Judicial Review", type: 'C' },
    { text: "Central Bank Independence", type: 'C' },
    { text: "Corporatism", type: 'C' },
    { text: "Pluralism", type: 'W' },
    { text: "Parliamentary Sovereignty", type: 'W' },
    { text: "Inclusive", type: 'C' },
    { text: "Exclusive", type: 'W' },
    { text: "Executive Dominance", type: 'W' }
  ] as const;

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(30);
    setNextTrait();
  };

  const setNextTrait = () => {
    const random = traits[Math.floor(Math.random() * traits.length)];
    setCurrentTrait(random);
  };

  useEffect(() => {
    let timer: any;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setGameState('end');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleSort = (choice: 'W' | 'C') => {
    if (!currentTrait) return;
    if (choice === currentTrait.type) {
      setScore(s => s + 10);
      setFeedback('correct');
    } else {
      setScore(s => Math.max(0, s - 5));
      setFeedback('wrong');
    }
    setTimeout(() => {
      setFeedback(null);
      setNextTrait();
    }, 400);
  };

  if (gameState === 'start') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
        <Zap className="w-16 h-16 text-amber-500 mb-6" />
        <h2 className="text-3xl font-bold mb-2">Model Mania</h2>
        <p className="text-gray-500 mb-8 max-w-md">Sort as many institutional traits as you can into Westminster vs. Consensus in 30 seconds!</p>
        <button onClick={startGame} className="bg-uwm-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 shadow-lg">Start Game</button>
        <button onClick={onBack} className="mt-4 text-sm text-gray-500">Back to Menu</button>
      </div>
    );
  }

  if (gameState === 'end') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
        <Trophy className="w-20 h-20 text-uwm-gold mb-6" />
        <h2 className="text-4xl font-black mb-2">{score} Points!</h2>
        <p className="text-gray-500 mb-8">Great job sorting those institutional variables.</p>
        <div className="flex gap-4">
          <button onClick={startGame} className="bg-uwm-black text-white px-8 py-3 rounded-xl font-bold">Play Again</button>
          <button onClick={onBack} className="bg-white border px-8 py-3 rounded-xl font-bold">Back to Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full p-4 flex flex-col items-center h-full">
      <div className="w-full flex justify-between items-center mb-12">
        <div className="flex items-center gap-2 text-uwm-black font-bold">
          <Timer className="w-5 h-5" /> {timeLeft}s
        </div>
        <div className="text-2xl font-black text-uwm-gold">{score}</div>
      </div>

      <div className={`w-full aspect-video bg-white rounded-2xl shadow-xl border-4 flex items-center justify-center p-8 transition-all duration-200 ${
        feedback === 'correct' ? 'border-green-500 bg-green-50 scale-105' : 
        feedback === 'wrong' ? 'border-red-500 bg-red-50 shake' : 'border-gray-100'
      }`}>
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-center text-gray-800">
          {currentTrait?.text}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full mt-12">
        <button 
          onClick={() => handleSort('W')}
          className="bg-uwm-black hover:bg-slate-800 text-white py-6 rounded-2xl font-bold text-xl shadow-lg transition-transform active:scale-95"
        >
          Westminster
        </button>
        <button 
          onClick={() => handleSort('C')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-bold text-xl shadow-lg transition-transform active:scale-95"
        >
          Consensus
        </button>
      </div>
    </div>
  );
};

// --- NEW GAME: COUNTRY PROFILER ---

const CountryProfiler: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const countryChallenges = [
    {
      country: "Switzerland",
      clues: ["The magic formula for cabinets", "Extreme multiparty system", "Symmetric bicameralism", "Federal & Decentralized"],
      explanation: "Switzerland is the prototype of Consensus democracy across all dimensions."
    },
    {
      country: "Germany",
      clues: ["Constructive vote of no confidence", "Strong Federalism", "Symmetric Bicameralism", "Independent Central Bank (Bundesbank heritage)"],
      explanation: "Germany is a prime example of a consensus-oriented federal system in Europe."
    },
    {
      country: "Israel",
      clues: ["Extreme PR with low thresholds", "Unicameral legislature", "No written constitution", "Unitary state"],
      explanation: "Israel is highly consensual on the executives-parties dimension but majoritarian on the federal-unitary dimension."
    },
    {
      country: "New Zealand",
      clues: ["Shifted from FPP to MMP in 1996", "Abolished its upper house in 1950", "Unitary and centralized", "Historically a 'purer' Westminster case than the UK"],
      explanation: "New Zealand's electoral reform (1996) significantly moved it toward the consensus model."
    },
    {
      country: "Belgium",
      clues: ["Incongruent Federalism", "Segmented cleavages", "Consociational power-sharing", "Judicial Review established in 1980s"],
      explanation: "Belgium's federalism is designed specifically to manage its deep linguistic and cultural divisions."
    }
  ];

  const current = countryChallenges[currentLevel];

  const handleGuess = (choice: string) => {
    setSelectedCountry(choice);
    if (choice === current.country) {
      setCorrectCount(c => c + 1);
    }
    setShowResult(true);
  };

  const next = () => {
    if (currentLevel < countryChallenges.length - 1) {
      setCurrentLevel(l => l + 1);
      setSelectedCountry(null);
      setShowResult(false);
    } else {
      setShowResult(true); // Final score screen logic
    }
  };

  if (currentLevel === countryChallenges.length - 1 && showResult && selectedCountry) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
        <Trophy className="w-20 h-20 text-emerald-500 mb-6" />
        <h2 className="text-3xl font-bold mb-2">Profiler Complete!</h2>
        <p className="text-gray-500 mb-8">You identified {correctCount} out of {countryChallenges.length} country profiles correctly.</p>
        <button onClick={onBack} className="bg-uwm-black text-white px-8 py-3 rounded-xl font-bold">Return to Menu</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full p-4 flex flex-col h-full animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-black">← Exit Game</button>
        <div className="text-sm font-bold text-gray-400">PROFILE {currentLevel + 1} OF {countryChallenges.length}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Clues Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="text-emerald-500 w-6 h-6" />
            <h3 className="text-xl font-bold text-gray-800">Identify the Country:</h3>
          </div>
          <ul className="space-y-4">
            {current.clues.map((clue, i) => (
              <li key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-100 text-slate-700 font-medium">
                <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs flex-shrink-0">{i+1}</span>
                {clue}
              </li>
            ))}
          </ul>
        </div>

        {/* Guess Card */}
        <div className="space-y-6">
          {!showResult ? (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Select Country</h4>
              <div className="grid grid-cols-2 gap-2">
                {APPROVED_COUNTRIES.map(c => (
                  <button 
                    key={c}
                    onClick={() => handleGuess(c)}
                    className="p-3 text-sm text-left border rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition-all font-medium"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className={`p-8 rounded-2xl shadow-lg border-l-8 animate-fade-in ${
              selectedCountry === current.country ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                {selectedCountry === current.country ? (
                  <CheckCircle className="text-green-600 w-8 h-8" />
                ) : (
                  <XCircle className="text-red-600 w-8 h-8" />
                )}
                <h4 className="text-2xl font-bold">{selectedCountry === current.country ? 'Correct!' : 'Not Quite'}</h4>
              </div>
              <p className="text-lg mb-4">The answer is <strong>{current.country}</strong>.</p>
              <div className="bg-white/50 p-4 rounded-lg border border-current/10 text-sm leading-relaxed mb-6">
                <strong>Why?</strong> {current.explanation}
              </div>
              <button 
                onClick={next}
                className="w-full py-3 bg-uwm-black text-white font-bold rounded-xl hover:bg-gray-800 flex items-center justify-center gap-2"
              >
                Next Challenge <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- EXISTING FLASHCARDS & QUIZ COMPONENTS (Updated with blue/navy theme) ---

const FlashcardDeckSelection: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedDeck, setSelectedDeck] = useState<Flashcard[] | null>(null);

  const dimensionCards: Flashcard[] = DEMOCRACY_DIMENSIONS.map(d => ({
    id: d.id,
    category: 'Dimension',
    front: d.name,
    back: `Westminster: ${d.westminster}\n\nConsensus: ${d.consensus}`
  }));

  if (selectedDeck) {
    return <FlashcardPlayer cards={selectedDeck} onBack={() => setSelectedDeck(null)} />;
  }

  return (
    <div className="max-w-2xl mx-auto w-full p-4 space-y-6">
      <button onClick={onBack} className="text-sm text-gray-500 hover:text-uwm-black mb-4">← Back to Menu</button>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Select a Deck</h2>
      
      <div className="grid gap-4">
        <button 
          onClick={() => setSelectedDeck(dimensionCards)}
          className="p-6 bg-white border rounded-xl hover:shadow-md transition-all text-left flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold text-lg">Core Dimensions</h3>
            <p className="text-sm text-gray-500">The 10 institutional variables (Ch 4-13)</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">{dimensionCards.length} Cards</span>
        </button>

        <button 
          onClick={() => setSelectedDeck(CONCEPT_FLASHCARDS)}
          className="p-6 bg-white border rounded-xl hover:shadow-md transition-all text-left flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold text-lg">Key Concepts</h3>
            <p className="text-sm text-gray-500">Specific terminology (e.g., Magic Formula, Corporatism)</p>
          </div>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded">{CONCEPT_FLASHCARDS.length} Cards</span>
        </button>
      </div>
    </div>
  );
};

const FlashcardPlayer: React.FC<{ cards: Flashcard[], onBack: () => void }> = ({ cards, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[currentIndex];

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => (prev + 1) % cards.length), 200);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length), 200);
  };

  return (
    <div className="max-w-2xl mx-auto w-full h-full flex flex-col items-center justify-center p-4">
      <div className="w-full flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-uwm-black font-medium">← Back to Decks</button>
        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Card {currentIndex + 1} of {cards.length}</span>
      </div>

      <div 
        className="w-full aspect-[16/10] cursor-pointer group perspective-1000"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className="relative w-full h-full transition-all duration-500"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          
          {/* Front Face */}
          <div 
            className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col items-center justify-center backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden' 
            }}
          >
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-4 bg-blue-50 px-3 py-1 rounded-full">
              {currentCard.category}
            </span>
            <h3 className="text-3xl font-serif font-bold text-gray-900 text-center">{currentCard.front}</h3>
            <p className="text-xs text-gray-400 absolute bottom-6">Click to flip</p>
          </div>

          {/* Back Face */}
          <div 
            className="absolute inset-0 w-full h-full bg-uwm-black rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-white text-center backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)' 
            }}
          >
             <p className="text-lg leading-relaxed whitespace-pre-wrap">{currentCard.back}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <button onClick={(e) => { e.stopPropagation(); prevCard(); }} className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 border border-gray-200 text-gray-600">
          <ChevronLeft size={20} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }} className="px-6 py-3 bg-uwm-gold text-white font-bold rounded-lg shadow-sm hover:bg-blue-600 transition-colors min-w-[140px]">
          {isFlipped ? 'Show Term' : 'Show Definition'}
        </button>
        <button onClick={(e) => { e.stopPropagation(); nextCard(); }} className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 border border-gray-200 text-gray-600">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};


// --- QUIZ COMPONENTS ---

const QuizLevelSelect: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]);
  const [activeLevel, setActiveLevel] = useState<QuizLevel | null>(null);

  const handleLevelComplete = (level: number, scorePercent: number) => {
    if (scorePercent >= 70) {
      if (!unlockedLevels.includes(level + 1)) {
        setUnlockedLevels([...unlockedLevels, level + 1]);
      }
    }
  };

  if (activeLevel) {
    return (
      <QuizEngine 
        level={activeLevel} 
        onComplete={(score) => handleLevelComplete(activeLevel.level, score)}
        onExit={() => setActiveLevel(null)} 
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full p-4 space-y-6">
      <button onClick={onBack} className="text-sm text-gray-500 hover:text-uwm-black mb-4">← Back to Menu</button>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Challenge Levels</h2>
        <p className="text-gray-500">Score 70% or higher to unlock the next level.</p>
      </div>

      <div className="grid gap-4">
        {QUIZ_LEVELS.map((lvl) => {
          const isUnlocked = unlockedLevels.includes(lvl.level);
          return (
            <button
              key={lvl.level}
              disabled={!isUnlocked}
              onClick={() => setActiveLevel(lvl)}
              className={`p-6 rounded-xl border-2 transition-all flex items-center justify-between text-left ${
                isUnlocked 
                  ? 'bg-white border-gray-200 hover:border-uwm-gold hover:shadow-md cursor-pointer' 
                  : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  isUnlocked ? 'bg-uwm-black text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {lvl.level}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{lvl.title}</h3>
                  <p className="text-sm text-gray-500">{lvl.description}</p>
                </div>
              </div>
              <div className="text-gray-400">
                {isUnlocked ? <Unlock size={20} className="text-green-500" /> : <Lock size={20} />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const QuizEngine: React.FC<{ level: QuizLevel, onComplete: (score: number) => void, onExit: () => void }> = ({ level, onComplete, onExit }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const question = level.questions[currentQIndex];

  const handleAnswer = (option: string) => {
    if (selectedOption) return;
    
    const correct = option === question.correctAnswer;
    setSelectedOption(option);
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
  };

  const next = () => {
    if (currentQIndex < level.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      const finalScore = score + (isCorrect ? 1 : 0); // Calculate final score properly
      const finalScorePercent = (finalScore / level.questions.length) * 100;
      setShowResults(true);
      onComplete(finalScorePercent);
    }
  };

  if (showResults) {
    const displayScore = isCorrect ? score + 1 : score;
    const percentage = Math.round((displayScore / level.questions.length) * 100);
    const passed = percentage >= level.minScoreToUnlock;

    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-fade-in">
        <div className={`p-10 rounded-2xl shadow-lg max-w-md w-full border-t-8 ${passed ? 'border-green-500 bg-white' : 'border-red-500 bg-white'}`}>
          {passed ? <Trophy className="w-16 h-16 text-blue-500 mx-auto mb-4" /> : <RotateCcw className="w-16 h-16 text-gray-400 mx-auto mb-4" />}
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{passed ? 'Level Complete!' : 'Try Again'}</h2>
          <p className="text-gray-500 mb-6">You scored</p>
          
          <div className="text-6xl font-black text-uwm-black mb-6">
            {percentage}%
          </div>

          <p className="text-sm text-gray-600 mb-8">
            {passed 
              ? level.level === 3 ? "You are a master of comparative politics!" : "Next level unlocked."
              : `You need ${level.minScoreToUnlock}% to advance.`}
          </p>

          <button onClick={onExit} className="w-full py-3 rounded-lg bg-uwm-black text-white font-bold hover:bg-gray-800">
            Return to Levels
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full p-6 flex flex-col h-full justify-center">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Level {level.level}: {level.title}</span>
          <span className="text-xs font-bold text-gray-400">Q{currentQIndex + 1}/{level.questions.length}</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-uwm-gold transition-all duration-500 ease-out"
            style={{ width: `${((currentQIndex) / level.questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-8 leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={selectedOption !== null}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                selectedOption === null 
                  ? 'border-gray-100 hover:border-blue-200 hover:bg-blue-50' 
                  : option === question.correctAnswer 
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : selectedOption === option 
                      ? 'border-red-500 bg-red-50 text-red-800'
                      : 'border-gray-100 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {selectedOption && option === question.correctAnswer && <CheckCircle size={20} className="text-green-600" />}
                {selectedOption === option && option !== question.correctAnswer && <XCircle size={20} className="text-red-600" />}
              </div>
            </button>
          ))}
        </div>

        <div className={`mt-6 overflow-hidden transition-all duration-300 ${selectedOption ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 border-l-4 border-uwm-black">
            <span className="font-bold block mb-1 text-uwm-black">Explanation:</span>
            {question.explanation}
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={next} className="px-6 py-2 bg-uwm-black text-white font-bold rounded-lg hover:bg-gray-800">
              {currentQIndex < level.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyCenter;
