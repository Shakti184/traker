import React, { useState, useRef, useEffect } from 'react';
import FocusTimer from './FocusTimer'; // NEW: Imported the timer directly to the header

const Header = ({ activePhase, phasesData, overallProgress, phaseProgress, onOpenSettings, onOpenAbout }) => {
  const currentPhase = phasesData.find(p => p.id === activePhase);
  
  // State for the Dropdown Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 pb-5 pt-6 px-4 md:px-8 shadow-sm dark:shadow-none transition-all">
      <div className="max-w-3xl mx-auto">
        
        {/* Top Row: Title & Action Menu */}
        <div className="flex justify-between items-start mb-5 gap-4">
          
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">
              {currentPhase?.title || "SDE Blueprint"}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1.5 text-sm md:text-base font-medium line-clamp-1 md:line-clamp-none">
              {currentPhase?.subtitle || "Track your daily progress and master the concepts."}
            </p>
          </div>

          {/* NEW: Top Right Control Center */}
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            
            {/* The Timer Pill */}
            <FocusTimer />

            {/* The Dropdown Menu */}
            <div className="relative z-50" ref={menuRef}>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 md:p-2.5 rounded-full border transition-all active:scale-95 ${
                  isMenuOpen 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800' 
                    : 'bg-slate-100/50 hover:bg-blue-50 dark:bg-slate-900 dark:hover:bg-blue-900/30 border-transparent dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                title="More Options"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>

              {/* Dropdown Items */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl animate-fade-in-up origin-top-right overflow-hidden flex flex-col py-1 text-sm font-semibold">
                  
                  <button 
                    onClick={() => { onOpenSettings(); setIsMenuOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full text-left"
                  >
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Settings & Data
                  </button>
                  
                  <div className="h-px bg-slate-100 dark:bg-slate-800 mx-3 my-0.5" />
                  
                  <button 
                    onClick={() => { onOpenAbout(); setIsMenuOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full text-left"
                  >
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    About Tracker
                  </button>

                </div>
              )}
            </div>

          </div>
        </div>

        {/* ... Global Progress & Phase Dashboard remain exactly the same ... */}
        <div className="space-y-2 mb-5">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            <span>Overall Timeline</span>
            <span className="text-blue-600 dark:text-blue-400 tabular-nums">{Math.round(overallProgress)}%</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700 ease-out relative" style={{ width: `${overallProgress}%` }}>
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4">
          {phasesData.map(phase => (
            <div key={phase.id} className={`p-3 rounded-xl border transition-all duration-300 ${activePhase === phase.id ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800/50' : 'bg-slate-50 border-slate-100 dark:bg-slate-900/50 dark:border-slate-800/50'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider truncate pr-2 ${activePhase === phase.id ? 'text-blue-700 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                  {phase.title.split(':')[0]}
                </span>
                <span className={`text-[10px] font-bold tabular-nums ${activePhase === phase.id ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                  {Math.round(phaseProgress[phase.id] || 0)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ease-out ${activePhase === phase.id ? 'bg-blue-500 dark:bg-blue-400' : 'bg-slate-400 dark:bg-slate-600'}`} style={{ width: `${phaseProgress[phase.id] || 0}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;