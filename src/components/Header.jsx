import React from 'react';

const Header = ({ activePhase, phasesData, overallProgress }) => {
  // Find the details of the currently selected phase
  const currentPhase = phasesData.find(p => p.id === activePhase);

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 pb-4 pt-6 px-4 md:px-8">
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

        {/* Progress Bar Module */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            <span>Overall Completion</span>
            <span className="text-blue-600 dark:text-blue-400 tabular-nums">
              {Math.round(overallProgress)}%
            </span>
          </div>
          
          <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700 ease-out relative"
              style={{ width: `${overallProgress}%` }}
            >
              {/* Subtle animated shimmer inside the progress bar */}
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </div>
          </div>
        </div>
        
      </div>
    </header>
  );
};

export default Header;