import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, User, Bot, AlertTriangle } from 'lucide-react';

const AiTutor: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm your Pol Sci 335 tutor. I can explain concepts from Lijphart's textbook or help clarify the syllabus. I cannot write your essays for you. How can I help?", timestamp: new Date() }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await getChatResponse(history, userMsg.text);
    
    setMessages(prev => [...prev, {
      role: 'model',
      text: responseText || "Sorry, I couldn't process that.",
      timestamp: new Date()
    }]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-uwm-black p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-uwm-gold" />
          <div>
            <h2 className="font-bold">Course Tutor</h2>
            <p className="text-xs text-gray-400">Powered by Gemini • Strictly follows syllabus policy</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-uwm-black text-white' : 'bg-uwm-gold text-black'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-3 rounded-lg text-sm shadow-sm ${msg.role === 'user' ? 'bg-white border border-gray-200 text-gray-800' : 'bg-white border border-gray-200 text-gray-800'}`}>
                 <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </div>
            </div>
          </div>
        ))}
        {loading && (
           <div className="flex justify-start">
             <div className="bg-gray-200 p-3 rounded-lg text-xs animate-pulse text-gray-500">
               Thinking...
             </div>
           </div>
        )}
      </div>

      {/* Warning/disclaimer */}
      <div className="bg-amber-50 px-4 py-2 border-t border-amber-100 flex items-center gap-2 text-xs text-amber-800">
        <AlertTriangle size={12} />
        <span>AI may make mistakes. Verify critical dates/facts with the official PDF syllabus.</span>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="relative">
          <input
            type="text"
            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-uwm-gold shadow-sm"
            placeholder="Ask about Westminster vs Consensus, Assignment due dates..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1.5 p-1.5 bg-uwm-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiTutor;