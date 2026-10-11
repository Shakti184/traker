import React from 'react';

const TodayWidget = ({ tasks, activePhase, phasesData, onToggleTask, onOpenFocusWrite }) => {
  const currentPhase = phasesData.find(p => p.id === activePhase);
  const phaseTasks = tasks.filter(t => t.phaseId === activePhase);
  const upNextTask = phaseTasks.find(t => !t.isCompleted);

  if (!upNextTask) return null;

  const handleComplete = (e) => {
    e.stopPropagation(); 
    onToggleTask(upNextTask.id);
  };

  return (
    <div 
      onClick={() => onOpenFocusWrite(upNextTask)}
      className="group relative overflow-hidden rounded-[24px] md:rounded-[32px] bg-gradient-to-br from-indigo-900 via-slate-900 to-black dark:from-indigo-950 dark:via-slate-950 dark:to-black p-6 md:p-8 shadow-2xl shadow-indigo-900/20 dark:shadow-black/40 border border-white/10 cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.3)] active:translate-y-0 active:scale-[0.98]"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-[80px] transition-transform duration-700 group-hover:scale-110 group-hover:bg-indigo-500/30" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[80px] transition-transform duration-700 group-hover:scale-110" />
      
      <div className="relative z-10 flex flex-col items-start w-full h-full">
        
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between w-full gap-3 mb-5">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-sm">
            {/* Live pulsing heartbeat indicator */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
            </span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-indigo-100">
              Up Next in {currentPhase?.title.split(':')[0]}
            </span>
          </div>
          
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm">
            {upNextTask.dayLabel}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-3 tracking-tight">
          {upNextTask.topic}
        </h3>
        
        <p className="text-slate-300/90 text-sm md:text-base leading-relaxed max-w-2xl mb-8 line-clamp-2 md:line-clamp-3 font-medium">
          {upNextTask.directive}
        </p>

        {/* Action Row */}
        <div className="flex flex-wrap items-center gap-4 w-full mt-auto">
          {/* Primary Complete Button */}
          <button 
            onClick={handleComplete}
            className="flex-1 md:flex-none relative z-20 flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white hover:bg-slate-100 text-indigo-950 text-sm font-bold rounded-xl shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
          >
            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            Complete Task
          </button>
          
          {/* Subtle Focus Write Indicator (Desktop) */}
          <div className="hidden md:flex items-center gap-2.5 text-indigo-200/50 font-semibold text-sm transition-all duration-300 group-hover:text-indigo-200 ml-2">
            <span>Click card to Focus</span>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TodayWidget;