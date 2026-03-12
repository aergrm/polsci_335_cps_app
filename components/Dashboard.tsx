
import React, { useState, useEffect } from 'react';
import { SCHEDULE, ASSIGNMENTS } from '../constants';
import { Week } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BookOpen, Calendar, AlertCircle, Clock, MapPin } from 'lucide-react';

const COLORS = ['#1e3a8a', '#2563eb', '#3b82f6', '#60a5fa', '#94a3b8', '#cbd5e1'];

const Dashboard: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<Week | null>(null);

  useEffect(() => {
    const calculateCurrentWeek = () => {
      const now = new Date();
      // Use YYYY, MM-1, DD format to avoid timezone parsing issues
      // Semester starts Tue Jan 27, 2026
      const semesterStart = new Date(2026, 0, 27); // Jan 27, 2026
      const semesterEnd = new Date(2026, 4, 15);   // May 15, 2026

      // If before semester starts, show Week 1
      if (now < semesterStart) {
        return SCHEDULE[0];
      }

      // If after semester ends, show Finals Week
      if (now > semesterEnd) {
        return SCHEDULE[SCHEDULE.length - 1];
      }

      // Calculate week difference
      const oneWeek = 1000 * 60 * 60 * 24 * 7;
      const diffInTime = now.getTime() - semesterStart.getTime();
      const weekIndex = Math.floor(diffInTime / oneWeek);

      // Return current week or last week if index out of bounds
      return SCHEDULE[weekIndex] || SCHEDULE[SCHEDULE.length - 1];
    };

    setCurrentWeek(calculateCurrentWeek());
  }, []);

  const gradeData = ASSIGNMENTS.map(a => ({ name: a.name, value: a.weight }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-uwm-black text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-2">POL SCI 335</h1>
            <p className="text-blue-200 text-lg mb-4">Comparative Political Systems</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-blue-100">
              <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10">Spring 2026</span>
              <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10">Ahmet Ergurum</span>
            </div>
          </div>
          
          <div className="bg-white/10 p-4 rounded-lg border border-white/10 backdrop-blur-sm text-sm space-y-2 min-w-[200px]">
             <div className="flex items-center gap-2">
               <Clock className="w-4 h-4 text-uwm-gold" />
               <span className="font-medium">TR 11:30 AM - 12:45 PM</span>
             </div>
             <div className="flex items-center gap-2">
               <MapPin className="w-4 h-4 text-uwm-gold" />
               <span className="font-medium">Bolton Hall B60</span>
             </div>
             <div className="flex items-center gap-2 text-blue-200 pt-1 border-t border-white/10 mt-1">
               <span className="text-xs uppercase font-bold">Office:</span>
               <span>Bolton 680 (Tue 1:30-3:30)</span>
             </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-uwm-gold/20 to-transparent pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Current Week Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-1 lg:col-span-2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-uwm-gold" />
                Current Week
              </h2>
              <span className="text-sm text-gray-500">{currentWeek?.dates} • {currentWeek?.title}</span>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Week {currentWeek?.id}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-uwm-black" /> Readings
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {currentWeek?.readings.map((r, i) => <li key={i}>{r}</li>) || <li>No readings</li>}
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Due This Week
              </h3>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                {currentWeek?.due && currentWeek.due.length > 0 ? (
                   currentWeek.due.map((d, i) => <li key={i} className="font-medium">{d}</li>)
                ) : (
                  <li className="italic opacity-70">Nothing due</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Grade Distribution Chart with Custom Legend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-[400px]">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Grade Weight</h2>
          <div className="flex flex-col h-full">
            {/* Chart Area */}
            <div className="h-[200px] w-full flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {gradeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Custom Legend Area */}
            <div className="flex-grow overflow-y-auto mt-4 pr-2">
               <div className="grid grid-cols-1 gap-2">
                 {gradeData.map((entry, index) => (
                   <div key={index} className="flex items-start text-sm">
                     <span 
                       className="w-3 h-3 rounded-full mt-1 mr-2 flex-shrink-0" 
                       style={{ backgroundColor: COLORS[index % COLORS.length] }}
                     />
                     <div className="flex flex-col leading-tight">
                       <span className="text-gray-700 font-medium">{entry.name}</span>
                       <span className="text-gray-400 text-xs">{entry.value}%</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links / Policies */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Key Course Policies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-red-50 rounded border border-red-200">
            <h4 className="font-bold text-red-800 mb-1">AI Policy</h4>
            <p className="text-red-700">
              Use of Generative AI is <strong>NOT allowed</strong> for assignment completion in part or in whole.
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded border border-blue-100">
            <h4 className="font-bold text-blue-800 mb-1">Attendance</h4>
            <p className="text-blue-700">Mandatory. Notify instructor in advance for absences. No make-ups for quizzes unless excused.</p>
          </div>
          <div className="p-3 bg-indigo-50 rounded border border-indigo-100">
            <h4 className="font-bold text-indigo-800 mb-1">Late Work</h4>
            <p className="text-indigo-700">Not accepted. Exceptions only for extraordinary circumstances.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
