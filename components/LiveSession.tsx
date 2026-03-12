
import React, { useState, useEffect } from 'react';
import { LIVE_QUIZZES } from '../constants';
import { LiveQuizSession } from '../types';
import { 
  Users, Smartphone, ArrowRight, Timer, Trophy, 
  Play, Crown, CheckCircle2, XCircle, Presentation, Lock
} from 'lucide-react';

interface LiveSessionProps {
  onBack: () => void;
}

type SessionState = 'lobby' | 'countdown' | 'question' | 'voting_closed' | 'results' | 'summary';

const COLORS = {
  red: '#ef4444',
  blue: '#3b82f6',
  yellow: '#eab308',
  green: '#22c55e'
};

const LiveSession: React.FC<LiveSessionProps> = ({ onBack }) => {
  const [selectedQuiz, setSelectedQuiz] = useState<LiveQuizSession | null>(null);
  const [gameState, setGameState] = useState<SessionState>('lobby');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  
  // Timer logic
  useEffect(() => {
    let interval: any;
    if (gameState === 'question' && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (gameState === 'question' && timer === 0) {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [gameState, timer]);

  const startQuiz = (quiz: LiveQuizSession) => {
    setSelectedQuiz(quiz);
    setGameState('lobby');
    setCurrentQuestionIndex(0);
  };

  const launchQuestion = () => {
    setGameState('countdown');
    setTimeout(() => {
      setGameState('question');
      setTimer(selectedQuiz!.questions[currentQuestionIndex].timeLimit);
    }, 3000);
  };

  const handleTimeUp = () => {
    setGameState('voting_closed');
  };

  const revealAnswer = () => {
    setGameState('results');
  };

  const nextSlide = () => {
    if (gameState === 'results') {
      if (currentQuestionIndex < selectedQuiz!.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        launchQuestion();
      } else {
        setGameState('summary');
      }
    }
  };

  if (!selectedQuiz) {
    return (
      <div className="max-w-4xl mx-auto p-8 animate-fade-in">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-uwm-black mb-6">← Exit Live Mode</button>
        <h2 className="text-3xl font-serif font-bold mb-2">Live Session Selector</h2>
        <p className="text-gray-600 mb-8">Game in class.</p>
        
        <div className="grid gap-4">
          {LIVE_QUIZZES.map(quiz => (
            <button 
              key={quiz.weekId}
              onClick={() => !quiz.isLocked && startQuiz(quiz)}
              disabled={quiz.isLocked}
              className={`p-6 rounded-xl shadow-sm border text-left flex justify-between items-center group transition-all ${
                quiz.isLocked 
                  ? 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed' 
                  : 'bg-white border-gray-100 hover:border-uwm-gold hover:shadow-md cursor-pointer'
              }`}
            >
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Week {quiz.weekId}</span>
                <h3 className={`text-xl font-bold transition-colors ${quiz.isLocked ? 'text-gray-500' : 'text-gray-900 group-hover:text-uwm-gold'}`}>
                  {quiz.title}
                </h3>
                <p className="text-sm text-gray-500">{quiz.questions.length} Questions</p>
              </div>
              
              {quiz.isLocked ? (
                <Lock className="w-8 h-8 text-gray-300" />
              ) : (
                <Play className="w-10 h-10 text-gray-200 group-hover:text-uwm-gold" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // GAME VISUALS

  if (gameState === 'lobby') {
    return (
      <div className="h-full flex flex-col bg-slate-900 text-white animate-fade-in">
        <div className="flex-grow flex flex-col items-center justify-center p-8">
          <div className="bg-slate-800 p-8 rounded-full mb-8 shadow-2xl border border-slate-700">
             <Presentation className="w-24 h-24 text-uwm-gold" />
          </div>

          <h2 className="text-xl font-bold uppercase tracking-widest text-slate-400 mb-2">Ready to Start</h2>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 text-center max-w-2xl leading-tight">
            {selectedQuiz.title}
          </h1>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700">
             <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-sm font-bold text-slate-300">System Online</span>
          </div>
        </div>

        <div className="p-6 bg-slate-800 flex justify-between items-center border-t border-slate-700">
           <button onClick={() => setSelectedQuiz(null)} className="text-slate-400 hover:text-white font-medium">Exit</button>
           <button 
             onClick={launchQuestion} 
             className="bg-uwm-gold hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center gap-3 transition-transform hover:scale-105"
           >
             Start Session <ArrowRight size={24} />
           </button>
        </div>
      </div>
    );
  }

  if (gameState === 'countdown') {
    return (
      <div className="h-full bg-slate-900 flex items-center justify-center">
         <div className="text-9xl font-black text-white animate-bounce">
           GET READY
         </div>
      </div>
    );
  }

  const currentQ = selectedQuiz.questions[currentQuestionIndex];

  // SHARED LAYOUT FOR QUESTION / VOTING CLOSED / RESULTS
  if (gameState === 'question' || gameState === 'voting_closed' || gameState === 'results') {
    return (
      <div className="h-full flex flex-col bg-slate-100 animate-fade-in">
        {/* Top Bar */}
        <div className="bg-white p-4 shadow-sm flex justify-between items-center">
           <div className="text-sm font-bold text-gray-500">Q{currentQuestionIndex + 1} of {selectedQuiz.questions.length}</div>
           <div className="font-bold text-xl text-uwm-black hidden md:block">{selectedQuiz.title}</div>
           <div className="flex items-center gap-2">
             <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl border-4 transition-colors duration-500 ${
               gameState === 'question' 
                ? (timer < 5 ? 'border-red-500 text-red-500 animate-pulse' : 'border-uwm-black text-uwm-black') 
                : 'border-gray-300 text-gray-300'
             }`}>
               {gameState === 'question' ? timer : 0}
             </div>
           </div>
        </div>

        {/* Question Area */}
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center max-w-5xl mx-auto w-full">
          <div className="bg-white p-12 rounded-2xl shadow-lg border-2 border-gray-100 mb-8 w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">{currentQ.text}</h2>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {currentQ.options.map((opt) => {
              // Determination of visual state for each card
              let cardStyle = { backgroundColor: COLORS[opt.color], opacity: 1, transform: 'scale(1)' };
              let icon = null;

              if (gameState === 'results') {
                if (opt.isCorrect) {
                  // Correct Answer State
                  cardStyle = { backgroundColor: '#22c55e', opacity: 1, transform: 'scale(1.05)' };
                  icon = <CheckCircle2 className="w-8 h-8 ml-auto text-white" />;
                } else {
                  // Incorrect Answer State
                  cardStyle = { backgroundColor: '#94a3b8', opacity: 0.3, transform: 'scale(0.95)' };
                }
              }

              return (
                <div 
                  key={opt.id}
                  className="rounded-xl flex items-center p-6 shadow-md text-white font-bold text-xl md:text-2xl transition-all duration-500"
                  style={cardStyle}
                >
                   <div className="bg-black/20 w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                     {opt.color === 'red' && '▲'}
                     {opt.color === 'blue' && '◆'}
                     {opt.color === 'yellow' && '●'}
                     {opt.color === 'green' && '■'}
                   </div>
                   <span className="text-left">{opt.text}</span>
                   {icon}
                </div>
              );
            })}
          </div>

          {/* Action Button & Explanation */}
          <div className="mt-8 w-full flex flex-col items-center">
            {gameState === 'voting_closed' && (
               <button onClick={revealAnswer} className="bg-uwm-black text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform animate-bounce">
                  Reveal Answer
               </button>
            )}
            {gameState === 'results' && (
               <div className="flex flex-col items-center w-full max-w-2xl">
                  <div className="mb-4 bg-green-100 text-green-800 px-6 py-2 rounded-full font-bold">
                    Correct: {currentQ.options.find(o => o.isCorrect)?.text}
                  </div>
                  
                  {/* Explanation Block */}
                  <div className="mb-6 w-full bg-blue-50 border-l-4 border-uwm-black p-4 text-left rounded-r-lg shadow-sm animate-fade-in">
                    <h4 className="text-xs font-bold text-uwm-black uppercase tracking-wide mb-1">Explanation</h4>
                    <p className="text-gray-700 leading-relaxed text-lg">{currentQ.explanation}</p>
                  </div>

                  <button onClick={nextSlide} className="bg-uwm-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800">
                    Next Question <ArrowRight className="inline ml-2" />
                  </button>
               </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'summary') {
    return (
      <div className="h-full flex flex-col bg-slate-900 text-white animate-fade-in items-center justify-center relative overflow-hidden">
        <Trophy className="w-24 h-24 text-uwm-gold mb-6" />
        <h2 className="text-5xl font-black mb-4 text-white tracking-tight">Session Complete</h2>
        <p className="text-xl text-slate-400 mb-12">Great discussion!</p>

        <button onClick={() => setSelectedQuiz(null)} className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
          Back to Menu
        </button>
      </div>
    );
  }

  return <div>Unknown State</div>;
};

export default LiveSession;
