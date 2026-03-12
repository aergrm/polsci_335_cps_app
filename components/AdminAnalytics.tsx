
import React, { useState, useEffect } from 'react';
import { Activity, Clock, Monitor, Cpu, Wifi, Globe, AlertCircle, Database } from 'lucide-react';

const AdminAnalytics: React.FC = () => {
  // Real-time state
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Static real data (snapshot on load)
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const cores = navigator.hardwareConcurrency || 'Unknown';
  const platform = navigator.platform;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Connection info (Safe access for diverse browsers)
  // @ts-ignore
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const effectiveType = connection ? connection.effectiveType : 'Unknown';
  const downlink = connection ? connection.downlink : 'Unknown';

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Resize effect
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse effect (throttled visually by React render cycle)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="space-y-6 animate-fade-in font-mono">
      {/* System Status Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg border border-slate-800">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest">System Online</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Real-Time Telemetry</h2>
            <p className="text-slate-400 text-xs mt-1">
              Visualizing actual client-side session data. No historical database connected.
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">1</div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">Active User (You)</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Session Timer */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Current Session</span>
          </div>
          <div className="text-2xl font-bold text-uwm-black">{formatTime(timeOnPage)}</div>
        </div>

        {/* Viewport */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Monitor className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Viewport Size</span>
          </div>
          <div className="text-2xl font-bold text-uwm-black">{windowSize.width} x {windowSize.height}</div>
          <div className="text-xs text-gray-400 mt-1">px (Live Update)</div>
        </div>

        {/* Hardware */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Cpu className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Hardware</span>
          </div>
          <div className="text-lg font-bold text-uwm-black truncate">{platform}</div>
          <div className="text-xs text-gray-400 mt-1">{cores} Logical Cores</div>
        </div>

        {/* Network */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Wifi className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Network est.</span>
          </div>
          <div className="text-2xl font-bold text-uwm-black capitalize">{effectiveType}</div>
          <div className="text-xs text-gray-400 mt-1">~{downlink} Mbps Downlink</div>
        </div>
      </div>

      {/* Detailed Technical Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Environment Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" /> Environment Environment
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Browser Locale</span>
              <span className="font-medium">{language}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Timezone</span>
              <span className="font-medium">{timezone}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Cursor Position</span>
              <span className="font-medium">X: {mousePosition.x}, Y: {mousePosition.y}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-gray-500">User Agent</span>
            </div>
            <div className="text-xs text-gray-400 break-all bg-gray-50 p-2 rounded">
              {userAgent}
            </div>
          </div>
        </div>

        {/* Database Status (Honest View) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-gray-100 rounded-full">
               <Database className="w-6 h-6 text-gray-400" />
             </div>
             <div>
               <h3 className="font-bold text-gray-800">Historical Data</h3>
               <span className="text-xs text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded">DISCONNECTED</span>
             </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm text-gray-600 space-y-2">
             <p className="flex items-start gap-2">
               <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
               <span>
                 <strong>No Backend Detected:</strong> This application is currently running in a client-side prototype environment.
               </span>
             </p>
             <p className="pl-6 text-xs text-gray-500">
               To view real historical traffic (e.g., weekly visits, unique students), the application must be connected to an analytics service like Google Analytics or a SQL database.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;