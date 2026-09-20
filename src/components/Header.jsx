import React from 'react';

// NEW: Accept phaseProgress in props
const Header = ({ activePhase, phasesData, overallProgress, phaseProgress }) => {
  const currentPhase = phasesData.find(p => p.id === activePhase);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 pb-5 pt-6 px-4 md:px-8 shadow-sm dark:shadow-none transition-all">
      <div className="max-w-3xl mx-auto">
        
        {/* Phase Title & Subtitle */}
        <div className="mb-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">
            {currentPhase?.title || "SDE Blueprint"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1.5 text-sm md:text-base font-medium">
            {currentPhase?.subtitle || "Track your daily progress and master the concepts."}
          </p>
        </div>

        {/* Global Progress Module */}
        <div className="space-y-2 mb-5">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            <span>Overall Timeline</span>
            <span className="text-blue-600 dark:text-blue-400 tabular-nums">
              {Math.round(overallProgress)}%
            </span>
          </div>
          
          <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700 ease-out relative"
              style={{ width: `${overallProgress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </div>
          </div>
        </div>

        {/* NEW: Phase-by-Phase Micro Analytics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4">
          {phasesData.map(phase => (
            <div 
              key={phase.id} 
              className={`p-3 rounded-xl border transition-all duration-300 ${activePhase === phase.id ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800/50' : 'bg-slate-50 border-slate-100 dark:bg-slate-900/50 dark:border-slate-800/50'}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider truncate pr-2 ${activePhase === phase.id ? 'text-blue-700 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                  {/* Extracts just "Phase 1" from the title */}
                  {phase.title.split(':')[0]}
                </span>
                <span className={`text-[10px] font-bold tabular-nums ${activePhase === phase.id ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                  {Math.round(phaseProgress[phase.id] || 0)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ease-out ${activePhase === phase.id ? 'bg-blue-500 dark:bg-blue-400' : 'bg-slate-400 dark:bg-slate-600'}`}
                  style={{ width: `${phaseProgress[phase.id] || 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </header>
  );
};

export default Header;