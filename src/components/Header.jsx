import React, { useState, useRef, useEffect } from 'react';
import FocusTimer from './FocusTimer'; 

const Header = ({ activePhase, phasesData, overallProgress, phaseProgress, onOpenSettings, onOpenAbout, isScrolled }) => {
  const currentPhase = phasesData.find(p => p.id === activePhase);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ${isScrolled ? 'py-3 shadow-sm' : 'pt-5 pb-4 md:pt-6 md:pb-5'} px-4 md:px-8`}>
      <div className="max-w-3xl mx-auto">
        
        {/* Top Row: Title & Action Menu */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors truncate">
              {currentPhase?.title || "SDE Blueprint"}
            </h2>
            
            {/* Morphing Subtitle / Compact Progress Bar */}
            <div className="relative mt-1">
              {/* Subtitle - Fades out on scroll */}
              <div className={`grid transition-all duration-500 ease-in-out ${isScrolled ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'}`}>
                <div className="overflow-hidden">
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium truncate">
                    {currentPhase?.subtitle}
                  </p>
                </div>
              </div>

              {/* Compact Active Phase Progress - Fades IN on scroll */}
              <div className={`grid transition-all duration-500 ease-in-out absolute top-0 left-0 w-full ${isScrolled ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden flex items-center gap-3 pt-1 w-full max-w-sm">
                  <span className="text-[10px] md:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest shrink-0">
                    {currentPhase?.title.split(':')[0]}
                  </span>
                  <div className="h-1.5 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${phaseProgress[activePhase] || 0}%` }} />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 tabular-nums shrink-0">
                    {Math.round(phaseProgress[activePhase] || 0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <FocusTimer />
            <div className="relative z-50" ref={menuRef}>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 md:p-2.5 rounded-full border border-transparent bg-slate-100/50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 dark:bg-slate-900 dark:hover:bg-blue-900/30 dark:text-slate-400 dark:hover:text-blue-400 transition-all active:scale-95">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl animate-fade-in-up origin-top-right overflow-hidden flex flex-col py-1 text-sm font-semibold">
                  <button onClick={() => { onOpenSettings(); setIsMenuOpen(false); }} className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left w-full"><svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> Settings & Data</button>
                  <div className="h-px bg-slate-100 dark:bg-slate-800 mx-3 my-0.5" />
                  <button onClick={() => { onOpenAbout(); setIsMenuOpen(false); }} className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left w-full"><svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> About Tracker</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expandable Dashboard (Fades & Collapses on Scroll) */}
        <div className={`grid transition-all duration-500 ease-in-out ${isScrolled ? 'grid-rows-[0fr] opacity-0 mt-0' : 'grid-rows-[1fr] opacity-100 mt-5 md:mt-6'}`}>
          <div className="overflow-hidden">
            
            <div className="space-y-2 mb-5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                <span>Overall Timeline</span>
                <span className="text-blue-600 dark:text-blue-400 tabular-nums">{Math.round(overallProgress)}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700 relative" style={{ width: `${overallProgress}%` }}>
                  <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4 mb-2">
              {phasesData.map(phase => (
                <div key={phase.id} className={`p-2.5 md:p-3 rounded-xl border transition-all duration-300 ${activePhase === phase.id ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800/50' : 'bg-slate-50 border-slate-100 dark:bg-slate-900/50 dark:border-slate-800/50'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider truncate pr-1 ${activePhase === phase.id ? 'text-blue-700 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                      {phase.title.split(':')[0]}
                    </span>
                    <span className={`text-[10px] font-bold tabular-nums ${activePhase === phase.id ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                      {Math.round(phaseProgress[phase.id] || 0)}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${activePhase === phase.id ? 'bg-blue-500 dark:bg-blue-400' : 'bg-slate-400 dark:bg-slate-600'}`} style={{ width: `${phaseProgress[phase.id] || 0}%` }} />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;