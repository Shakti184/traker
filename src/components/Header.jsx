import React, { useState, useRef, useEffect } from 'react';
import FocusTimer from './FocusTimer'; 

const Header = ({ activePhase, setActivePhase, phasesData, overallProgress, phaseProgress, onOpenSettings, onOpenAbout, isScrolled }) => {
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
    <header className={`sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl transition-all duration-500 px-4 md:px-8 w-full border-b ${
      isScrolled 
        ? 'border-slate-200/60 dark:border-slate-800/60 py-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]' 
        : 'border-transparent py-4 md:py-6'
    }`}>
      <div className="max-w-3xl mx-auto w-full">
        
        {/* Top Action Row */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            
            {/* Premium Gradient Title */}
            <h2 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 tracking-tight transition-colors truncate pb-0.5">
              {currentPhase?.title || "SDE Blueprint"}
            </h2>
            
            {/* COMPACT STATE: Smooth Morphing Phase Bar */}
            <div className={`grid transition-all duration-500 ease-out ${isScrolled ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
              <div className="overflow-hidden flex items-center gap-3 w-full max-w-sm">
                <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest shrink-0">
                  {currentPhase?.title.split(':')[0]}
                </span>
                <div className="h-1.5 flex-1 bg-slate-200/80 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700 ease-out" style={{ width: `${phaseProgress[activePhase] || 0}%` }} />
                </div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tabular-nums shrink-0">
                  {Math.round(phaseProgress[activePhase] || 0)}%
                </span>
              </div>
            </div>
            
          </div>

          {/* Top Right Controls */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <FocusTimer />
            
            <div className="relative z-50" ref={menuRef}>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-2 md:p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow transition-all active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-48 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-2xl animate-fade-in-up origin-top-right overflow-hidden flex flex-col py-1 text-sm font-semibold">
                  <button onClick={() => { onOpenSettings(); setIsMenuOpen(false); }} className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-left w-full"><svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> Settings & Data</button>
                  <div className="h-px bg-slate-100 dark:bg-slate-800 mx-3 my-0.5" />
                  <button onClick={() => { onOpenAbout(); setIsMenuOpen(false); }} className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-left w-full"><svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> About Tracker</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FULL DASHBOARD STATE: Shows ONLY when at top */}
        <div className={`grid transition-all duration-500 ease-out ${isScrolled ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'}`}>
          <div className="overflow-hidden">
            
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium truncate mt-1.5 mb-6">
              {currentPhase?.subtitle}
            </p>

            {/* Premium Overall Timeline */}
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2.5">
                <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">
                  Overall Timeline
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 tabular-nums">
                  {Math.round(overallProgress)}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800/60 rounded-full overflow-hidden shadow-inner ring-1 ring-slate-200/50 dark:ring-slate-700/50">
                {/* 3-Stop Gradient with Pulse Effect */}
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out relative shadow-[0_0_12px_rgba(99,102,241,0.4)]" 
                  style={{ width: `${overallProgress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-pulse rounded-full" />
                </div>
              </div>
            </div>

            {/* Premium Phase Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-2">
              {phasesData.map(phase => {
                const isActive = activePhase === phase.id;
                const prog = Math.round(phaseProgress[phase.id] || 0);
                
                return (
                  <div 
                    key={phase.id} 
                    onClick={() => setActivePhase(phase.id)} 
                    className={`relative p-3 md:p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group
                      ${isActive 
                        ? 'bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border-blue-200/80 dark:from-blue-900/20 dark:to-indigo-900/10 dark:border-blue-700/50 shadow-sm shadow-blue-500/5 scale-[1.02]' 
                        : 'bg-slate-50/50 border-slate-200/60 hover:bg-slate-100/80 hover:border-slate-300/60 dark:bg-slate-900/30 dark:border-slate-800/60 dark:hover:bg-slate-800/50'
                      }`}
                  >
                    {/* Subtle active glow orb */}
                    {isActive && (
                      <div className="absolute -top-6 -right-6 w-16 h-16 bg-blue-500/10 dark:bg-blue-400/10 blur-xl rounded-full pointer-events-none" />
                    )}

                    <div className="flex justify-between items-center mb-2.5 relative z-10">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider truncate pr-1 transition-colors ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300'}`}>
                        {phase.title.split(':')[0]}
                      </span>
                      <span className={`text-[10px] font-bold tabular-nums transition-colors ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                        {prog}%
                      </span>
                    </div>
                    
                    <div className="h-1.5 w-full bg-slate-200/80 dark:bg-slate-800/80 rounded-full overflow-hidden relative z-10 shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ease-out ${isActive ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-slate-400 dark:bg-slate-600'}`} 
                        style={{ width: `${prog}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;