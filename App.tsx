
import React, { useState } from 'react';
import { ViewState } from './types';
import Dashboard from './components/Dashboard';
import ConceptExplorer from './components/ConceptExplorer';
import ScheduleView from './components/ScheduleView';
import StudyCenter from './components/StudyCenter';
import { LayoutDashboard, Calendar, BookOpen, Brain } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // These keys force components to re-render (reset to main view) when the nav item is clicked
  const [studyCenterKey, setStudyCenterKey] = useState(0);
  const [scheduleKey, setScheduleKey] = useState(0);

  const handleNavClick = (id: ViewState) => {
    if (id === 'study') {
      setStudyCenterKey(prev => prev + 1);
    }
    if (id === 'schedule') {
      setScheduleKey(prev => prev + 1);
    }
    setView(id);
    setIsMobileMenuOpen(false);
  };

  const NavItem = ({ id, label, icon: Icon }: { id: ViewState, label: string, icon: any }) => (
    <button
      onClick={() => handleNavClick(id)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        view === id 
          ? 'bg-uwm-gold text-uwm-black font-bold shadow-md' 
          : 'text-gray-300 hover:bg-white/10 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 font-sans text-gray-900">
      {/* Sidebar Navigation */}
      <aside className={`fixed md:sticky top-0 h-screen w-64 bg-uwm-black z-50 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6">
          <h1 className="text-2xl font-serif text-white font-bold tracking-tight">POL SCI 335</h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Comp. Politics</p>
        </div>
        
        <nav className="px-4 space-y-2">
          <NavItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
          <NavItem id="schedule" label="Schedule" icon={Calendar} />
          <NavItem id="concepts" label="Concept Explorer" icon={BookOpen} />
          <NavItem id="study" label="Study Center" icon={Brain} />
        </nav>

        <div className="absolute bottom-0 w-full p-6 text-xs text-gray-500 border-t border-gray-800">
          <div>
            <p>© 2026 UWM / Ahmet Ergurum</p>
            <p className="mt-2 text-uwm-gold/50">App by React Engineer</p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-uwm-black text-white p-4 flex justify-between items-center sticky top-0 z-40">
        <span className="font-serif font-bold">POL SCI 335</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto h-full">
          {view === 'dashboard' && <Dashboard />}
          {view === 'schedule' && <ScheduleView key={scheduleKey} />}
          {view === 'concepts' && <ConceptExplorer />}
          {view === 'study' && <StudyCenter key={studyCenterKey} />}
        </div>
      </main>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
