import React from 'react';

const ResponsiveNavigation = ({ activePhase, setActivePhase, phases }) => {
  // Helper to render distinct icons for each phase safely
  const renderIcon = (phaseId, isActive) => {
    const iconClass = `w-6 h-6 transition-all duration-300 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`;
    
    switch(phaseId) {
      case 'phase1': // Core & LLD
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'phase2': // Backend & Systems
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
        );
      case 'phase3': // Cloud & Resiliency
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        );
      case 'phase4': // GenAI & Mock
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 bg-slate-50/50 dark:bg-slate-900/50 border-r border-slate-200 dark:border-slate-800 backdrop-blur-xl">
        {/* Profile & Goal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            SDE-2 Blueprint
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium tracking-wide">
            TCS → Product Company
          </p>
          
          <div className="mt-6 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold text-lg shadow-sm border border-blue-200 dark:border-blue-800">
              SM
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Shakti M.</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">2 YOE • Backend Eng.</span>
            </div>
          </div>
        </div>

        {/* Phase Navigation List */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 px-2">
            Learning Tracks
          </div>
          
          {phases.map((phase) => {
            const isActive = activePhase === phase.id;
            return (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={`group flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 active:scale-[0.98]
                  ${isActive 
                    ? 'bg-white shadow-sm border border-slate-200 dark:bg-slate-800 dark:border-slate-700' 
                    : 'border border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/50'}
                `}
              >
                <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-transparent group-hover:bg-white dark:group-hover:bg-slate-700'}`}>
                  {renderIcon(phase.id, isActive)}
                </div>
                <div className="text-left flex-1">
                  <p className={`text-sm font-bold ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'}`}>
                    {phase.title.split(':')[0]}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 truncate w-36">
                    {phase.title.split(':')[1]?.trim() || phase.title}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 pb-safe z-50">
        <div className="flex items-center justify-around p-2">
          {phases.map((phase) => {
            const isActive = activePhase === phase.id;
            return (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className="group relative flex flex-col items-center p-2 min-w-[72px] active:scale-95 transition-transform"
              >
                <div className={`p-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-transparent'}`}>
                  {renderIcon(phase.id, isActive)}
                </div>
                <span className={`text-[10px] mt-1 font-semibold transition-colors ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                  Phase {phase.id.replace('phase', '')}
                </span>
                
                {/* Active Indicator Dot */}
                {isActive && (
                  <span className="absolute -top-1 w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default ResponsiveNavigation;